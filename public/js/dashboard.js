// Dashboard Script
document.addEventListener('DOMContentLoaded', () => {
  // Protect Page
  Auth.protectPage();
  const currentUser = Auth.getCurrentUser();
  const profile = DB.getProfile();
  const scholarships = DB.getScholarships();
  const savedIds = DB.getSavedScholarshipIds();
  const notifications = DB.getNotifications();
  const apps = DB.getApplications();
  // 1. Populate User Display
  if (currentUser) {
    document.getElementById('user-display-name').textContent = currentUser.name;
    document.getElementById('user-display-email').textContent = currentUser.email;
    document.getElementById('welcome-name').textContent = currentUser.name.split(' ')[0];
    
    const initials = currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    document.getElementById('user-avatar-initials').textContent = initials;
  }
  // 2. Unread notifications counter badge
  const unreadCount = notifications.filter(n => !n.read).length;
  const badge = document.getElementById('unread-count');
  if (unreadCount > 0 && badge) {
    badge.textContent = unreadCount;
    badge.classList.remove('hidden');
  }
  // 3. Compute Metrics
  let totalFound = scholarships.length;
  let eligibleCount = 0;
  let upcomingDeadlines = 0;
  let savedCount = savedIds.length;
  const today = new Date();
  const evaluatedScholarships = scholarships.map(sch => {
    const matchAnalysis = DB.calculateMatchScore(sch, profile);
    
    // Check if deadline is future
    const dlDate = new Date(sch.deadline);
    const isFuture = dlDate >= today;
    
    if (matchAnalysis.eligible) eligibleCount++;
    if (isFuture) upcomingDeadlines++;
    return {
      ...sch,
      matchScore: matchAnalysis.score,
      eligible: matchAnalysis.eligible,
      reasons: matchAnalysis.reasons
    };
  });
  document.getElementById('stat-total').textContent = totalFound;
  document.getElementById('stat-eligible').textContent = eligibleCount;
  document.getElementById('stat-deadlines').textContent = upcomingDeadlines;
  document.getElementById('stat-saved').textContent = savedCount;
  // 4. Render Top recommendations (max 3, sorted by matchScore)
  const recommendationsContainer = document.getElementById('recommendations-container');
  
  // Sort by match score descending
  const sortedMatches = [...evaluatedScholarships].sort((a, b) => b.matchScore - a.matchScore);
  const topMatches = sortedMatches.slice(0, 3);
  if (topMatches.length > 0) {
    recommendationsContainer.innerHTML = '';
    topMatches.forEach(sch => {
      const isSaved = savedIds.includes(sch.id);
      const isApplied = apps.find(a => a.scholarshipId === sch.id && a.status === 'Applied');
      
      const card = document.createElement('div');
      card.className = `glass-panel p-6 rounded-2xl border ${sch.eligible ? 'border-indigo-500/10' : 'border-red-500/15'} card-glow transition flex flex-col md:flex-row justify-between gap-6 relative overflow-hidden`;
      
      // Eligibility Indicator Tag
      const statusTag = sch.eligible 
        ? `<span class="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-semibold"><i class="fa-solid fa-circle-check mr-1"></i> Eligible</span>`
        : `<span class="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-2.5 py-1 rounded-full font-semibold"><i class="fa-solid fa-circle-xmark mr-1"></i> Ineligible</span>`;
      card.innerHTML = `
        <div class="space-y-4 flex-grow">
          <div class="flex items-center space-x-2.5 flex-wrap gap-y-2">
            ${statusTag}
            <span class="bg-slate-900 border border-white/5 text-gray-400 text-[10px] px-2.5 py-1 rounded-full font-mono"><i class="fa-solid fa-building mr-1"></i> ${sch.provider}</span>
            <span class="bg-indigo-950/40 text-indigo-300 text-xs px-2.5 py-1 rounded-full font-bold ml-auto">${sch.matchScore}% Match</span>
          </div>
          <div>
            <h4 class="text-lg font-bold text-white mb-1">${sch.name}</h4>
            <p class="text-gray-400 text-sm line-clamp-2 leading-relaxed">${sch.description}</p>
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 border-t border-white/5 pt-4">
            <div>
              <div class="text-xs text-gray-500">Amount</div>
              <div class="text-sm font-bold text-emerald-400 font-mono">${sch.amount}</div>
            </div>
            <div>
              <div class="text-xs text-gray-500">Deadline</div>
              <div class="text-sm font-semibold text-white font-mono">${sch.deadline}</div>
            </div>
            <div class="col-span-2 sm:col-span-1">
              <div class="text-xs text-gray-500">Match score strength</div>
              <div class="w-full bg-slate-800 rounded-full h-2 mt-1.5 overflow-hidden">
                <div class="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full" style="width: ${sch.matchScore}%"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-row md:flex-col justify-end items-center gap-3 shrink-0 md:border-l md:border-white/5 md:pl-6">
          <button onclick="handleDetails('${sch.id}')" class="flex-1 md:flex-initial bg-indigo-950 border border-indigo-500/20 hover:bg-indigo-900/50 text-indigo-300 text-xs font-semibold px-4 py-2.5 rounded-xl transition w-full text-center">
            View Details
          </button>
          <button onclick="toggleSave('${sch.id}')" class="p-2.5 rounded-xl border border-white/10 hover:border-pink-500/30 text-gray-400 hover:text-pink-500 hover:bg-pink-500/5 transition">
            <i class="${isSaved ? 'fa-solid' : 'fa-regular'} fa-bookmark text-base"></i>
          </button>
        </div>
      `;
      recommendationsContainer.appendChild(card);
    });
  } else {
    recommendationsContainer.innerHTML = '<div class="glass-panel p-8 rounded-2xl text-center text-gray-400 text-sm">No scholarships match your profile setup yet. Try relaxing your filters or updating your profile!</div>';
  }
  // 5. Render Deadline Alerts (Sorted by date, filtering eligible ones)
  const alertsContainer = document.getElementById('dashboard-alerts');
  const eligibleFutureScholarships = evaluatedScholarships
    .filter(s => s.eligible && new Date(s.deadline) >= today)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
  if (eligibleFutureScholarships.length > 0) {
    alertsContainer.innerHTML = '';
    eligibleFutureScholarships.slice(0, 2).forEach(sch => {
      const daysLeft = Math.ceil((new Date(sch.deadline) - today) / (1000 * 60 * 60 * 24));
      
      const alertBox = document.createElement('div');
      alertBox.className = "flex items-start space-x-3 p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-xl";
      alertBox.innerHTML = `
        <i class="fa-solid fa-clock text-yellow-500 mt-0.5"></i>
        <div class="min-w-0 flex-grow">
          <div class="text-xs font-bold text-white truncate">${sch.name}</div>
          <div class="text-[10px] text-yellow-400 font-semibold font-mono mt-0.5">Closes in ${daysLeft} days (${sch.deadline})</div>
        </div>
      `;
      alertsContainer.appendChild(alertBox);
    });
  } else {
    alertsContainer.innerHTML = '<p class="text-xs text-gray-500">No active critical deadlines.</p>';
  }
  // 6. Draw Chart.js Doughnut Graph
  const ctx = document.getElementById('eligibilityChart');
  if (ctx) {
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Eligible', 'Ineligible'],
        datasets: [{
          data: [eligibleCount, totalFound - eligibleCount],
          backgroundColor: ['#6366f1', 'rgba(255, 255, 255, 0.05)'],
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.1)'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#9ca3af',
              font: { size: 10, family: 'Inter' }
            }
          }
        },
        cutout: '75%'
      }
    });
  }
  // Global callback functions
  window.handleDetails = (id) => {
    DB.setSelectedScholarshipId(id);
    window.location.href = "scholarship-details.html";
  };
  window.toggleSave = (id) => {
    DB.toggleSaveScholarship(id);
    // Refresh stats and recommendations
    window.location.reload();
  };
  // Responsive Sidebar Menu Toggle Handler
  const sidebar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('sidebar-toggle-btn');
  const closeBtn = document.getElementById('sidebar-close-btn');
  if (toggleBtn && sidebar) {
    toggleBtn.addEventListener('click', () => {
      sidebar.classList.remove('hidden');
      sidebar.classList.add('fixed', 'inset-y-0', 'left-0', 'z-50');
    });
  }
  if (closeBtn && sidebar) {
    closeBtn.addEventListener('click', () => {
      sidebar.classList.add('hidden');
      sidebar.classList.remove('fixed', 'inset-y-0', 'left-0', 'z-50');
    });
  }
});
