// Scholarship Roadmap Script
document.addEventListener('DOMContentLoaded', () => {
  // Protect Page
  Auth.protectPage();
  const currentUser = Auth.getCurrentUser();
  // Populate Header User Info
  if (currentUser) {
    document.getElementById('user-display-name').textContent = currentUser.name;
    document.getElementById('user-display-email').textContent = currentUser.email;
    
    const initials = currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    document.getElementById('user-avatar-initials').textContent = initials;
  }
  const timelineContainer = document.getElementById('timeline-container');
  const addGoalForm = document.getElementById('add-goal-form');
  // Render routine
  function renderRoadmap() {
    timelineContainer.innerHTML = '';
    const tasks = DB.getRoadmapTasks();
    if (tasks.length === 0) {
      timelineContainer.innerHTML = '<div class="glass-panel p-8 text-center text-gray-500 rounded-3xl">No milestones listed. Create one using the form!</div>';
      updateProgress(0, 0);
      return;
    }
    let completedCount = 0;
    tasks.forEach(task => {
      if (task.completed) completedCount++;
      const item = document.createElement('div');
      item.className = "timeline-item flex items-start space-x-4 relative pb-8";
      item.innerHTML = `
        <!-- Checkbox / Marker -->
        <button onclick="handleToggleTask('${task.id}')" class="w-10 h-10 rounded-full shrink-0 border-2 ${task.completed ? 'bg-indigo-600 border-indigo-500 text-white' : 'bg-slate-900 border-white/10 text-transparent'} flex items-center justify-center transition shadow-lg relative z-10">
          <i class="fa-solid fa-check text-xs"></i>
        </button>
        <!-- Task Info Box -->
        <div class="flex-grow bg-indigo-950/25 glass-panel p-5 rounded-2xl border ${task.completed ? 'border-indigo-500/10 opacity-70' : 'border-white/5'}">
          <div class="flex justify-between items-start gap-2 flex-wrap mb-2">
            <span class="bg-indigo-950/50 border border-indigo-500/20 text-indigo-300 text-[10px] px-2.5 py-1 rounded-full font-semibold font-mono uppercase">${task.month}</span>
            <span class="text-[10px] text-gray-500 font-semibold font-mono">${task.completed ? 'COMPLETED' : 'PENDING'}</span>
          </div>
          <h4 class="text-base font-bold ${task.completed ? 'text-gray-400 line-through' : 'text-white'} mb-1">${task.title}</h4>
          <p class="text-xs ${task.completed ? 'text-gray-500' : 'text-gray-400'} leading-relaxed">${task.desc}</p>
        </div>
      `;
      timelineContainer.appendChild(item);
    });
    updateProgress(completedCount, tasks.length);
  }
  // Helper to update progress widgets
  function updateProgress(completed, total) {
    const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
    document.getElementById('roadmap-percentage').textContent = `${pct}%`;
    document.getElementById('roadmap-bar').style.width = `${pct}%`;
  }
  // Toggle checklist states
  window.handleToggleTask = (id) => {
    DB.toggleRoadmapTask(id);
    renderRoadmap(); // Refresh renders
  };
  // Add custom milestones
  addGoalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const month = document.getElementById('goal-month').value;
    const title = document.getElementById('goal-title').value.trim();
    const desc = document.getElementById('goal-desc').value.trim();
    DB.addRoadmapTask(month, title, desc);
    
    // Clear forms
    document.getElementById('goal-title').value = '';
    document.getElementById('goal-desc').value = '';
    renderRoadmap();
  });
  // Run initial renders
  renderRoadmap();
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
