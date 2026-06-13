// Scholarships Explorer Script
document.addEventListener('DOMContentLoaded', () => {
  // Protect Page
  Auth.protectPage();
  const currentUser = Auth.getCurrentUser();
  const profile = DB.getProfile();
  const scholarships = DB.getScholarships();
  const savedIds = DB.getSavedScholarshipIds();
  // Populate Header User Info
  if (currentUser) {
    document.getElementById('user-display-name').textContent = currentUser.name;
    document.getElementById('user-display-email').textContent = currentUser.email;
    
    const initials = currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    document.getElementById('user-avatar-initials').textContent = initials;
  }
  // DOM Elements
  const searchInput = document.getElementById('search-input');
  const sortSelect = document.getElementById('sort-select');
  const incomeFilter = document.getElementById('filter-income');
  const categoryFilter = document.getElementById('filter-category');
  const stateFilter = document.getElementById('filter-state');
  const eligibilityFilter = document.getElementById('filter-eligibility');
  const gridContainer = document.getElementById('scholarships-grid');
  
  const toggleFiltersBtn = document.getElementById('toggle-filters-btn');
  const advancedFiltersPanel = document.getElementById('advanced-filters');
  const filtersChevron = document.getElementById('filters-chevron');
  const clearFiltersBtn = document.getElementById('clear-filters-btn');
  // Toggle Filters Panel View
  toggleFiltersBtn.addEventListener('click', () => {
    const isHidden = advancedFiltersPanel.classList.contains('hidden');
    if (isHidden) {
      advancedFiltersPanel.classList.remove('hidden');
      filtersChevron.className = "fa-solid fa-chevron-up";
    } else {
      advancedFiltersPanel.classList.add('hidden');
      filtersChevron.className = "fa-solid fa-chevron-down";
    }
  });
  // Clear Filters
  clearFiltersBtn.addEventListener('click', () => {
    searchInput.value = '';
    sortSelect.value = 'matchScore-desc';
    incomeFilter.value = 'all';
    categoryFilter.value = 'all';
    stateFilter.value = 'all';
    eligibilityFilter.value = 'all';
    applyFiltersAndSort();
  });
  // Calculate scores for all scholarships once
  let evaluatedList = scholarships.map(sch => {
    const analysis = DB.calculateMatchScore(sch, profile);
    return {
      ...sch,
      matchScore: analysis.score,
      eligible: analysis.eligible,
      reasons: analysis.reasons
    };
  });
  // Main Filter and Render routine
  function applyFiltersAndSort() {
    let list = [...evaluatedList];
    // 1. Text Search Filter
    const query = searchInput.value.toLowerCase().trim();
    if (query) {
      list = list.filter(sch => 
        sch.name.toLowerCase().includes(query) ||
        sch.provider.toLowerCase().includes(query) ||
        sch.description.toLowerCase().includes(query) ||
        sch.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }
    // 2. Family Income Cap Filter
    const maxIncomeVal = incomeFilter.value;
    if (maxIncomeVal !== 'all') {
      const incomeLimit = Number(maxIncomeVal);
      // Show scholarships with max income limit larger than filter, or no limit
      list = list.filter(sch => !sch.maxIncome || sch.maxIncome <= incomeLimit);
    }
    // 3. Category Filter
    const categoryVal = categoryFilter.value;
    if (categoryVal !== 'all') {
      list = list.filter(sch => sch.categories.includes(categoryVal));
    }
    // 4. Domicile State Filter
    const stateVal = stateFilter.value;
    if (stateVal !== 'all') {
      list = list.filter(sch => sch.state === 'All' || sch.state.toLowerCase() === stateVal.toLowerCase());
    }
    // 5. Eligibility filter
    const eligVal = eligibilityFilter.value;
    if (eligVal === 'eligible') {
      list = list.filter(sch => sch.eligible);
    } else if (eligVal === 'ineligible') {
      list = list.filter(sch => !sch.eligible);
    }
    // 6. Sorting Logic
    const sortVal = sortSelect.value;
    if (sortVal === 'matchScore-desc') {
      list.sort((a, b) => b.matchScore - a.matchScore);
    } else if (sortVal === 'deadline-asc') {
      list.sort((a, b) => new Date(a.deadline) - new Date(b.deadline));
    } else if (sortVal === 'amount-desc') {
      list.sort((a, b) => b.amountNumeric - a.amountNumeric);
    }
    renderList(list);
  }
  // Render cards to grid
  function renderList(list) {
    gridContainer.innerHTML = '';
    
    if (list.length === 0) {
      gridContainer.innerHTML = `
        <div class="lg:col-span-2 glass-panel p-16 text-center text-gray-500 rounded-3xl border border-white/5">
          <i class="fa-solid fa-folder-open text-4xl mb-4 text-gray-600"></i>
          <p class="text-base font-semibold text-white">No scholarships match your filters</p>
          <p class="text-sm text-gray-400 mt-1">Try resetting the search parameters or check your academic profile details.</p>
        </div>
      `;
      return;
    }
    const currentSavedIds = DB.getSavedScholarshipIds();
    list.forEach(sch => {
      const isSaved = currentSavedIds.includes(sch.id);
      
      const card = document.createElement('div');
      card.className = `glass-panel p-6 rounded-2xl border ${sch.eligible ? 'border-indigo-500/10' : 'border-red-500/15'} card-glow transition flex flex-col justify-between h-full relative overflow-hidden`;
      
      const statusTag = sch.eligible 
        ? `<span class="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-semibold"><i class="fa-solid fa-circle-check mr-1"></i> Eligible</span>`
        : `<span class="bg-red-500/10 border border-red-500/20 text-red-400 text-xs px-2.5 py-1 rounded-full font-semibold"><i class="fa-solid fa-circle-xmark mr-1"></i> Ineligible</span>`;
      card.innerHTML = `
        <div class="space-y-4 mb-6">
          <div class="flex items-center justify-between gap-2">
            ${statusTag}
            <span class="bg-indigo-950/40 text-indigo-300 text-xs px-2.5 py-1 rounded-full font-bold">${sch.matchScore}% Match</span>
          </div>
          <div>
            <span class="text-gray-500 text-xs font-semibold uppercase tracking-wider block mb-1">${sch.provider}</span>
            <h4 class="text-xl font-bold text-white mb-2 leading-snug">${sch.name}</h4>
            <p class="text-gray-400 text-xs line-clamp-3 leading-relaxed">${sch.description}</p>
          </div>
          <div class="flex flex-wrap gap-1.5 pt-1">
            ${sch.tags.map(tag => `<span class="bg-slate-900 border border-white/5 text-gray-400 text-[10px] px-2 py-0.5 rounded-md">${tag}</span>`).join('')}
          </div>
        </div>
        <div class="space-y-4 pt-4 border-t border-white/5 mt-auto">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <div class="text-[10px] text-gray-500 font-semibold uppercase">Amount</div>
              <div class="text-base font-bold text-emerald-400 font-mono">${sch.amount}</div>
            </div>
            <div>
              <div class="text-[10px] text-gray-500 font-semibold uppercase">Deadline</div>
              <div class="text-sm font-semibold text-white font-mono">${sch.deadline}</div>
            </div>
          </div>
          <div class="flex items-center gap-2 pt-2">
            <button onclick="handleDetails('${sch.id}')" class="flex-grow bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-bold py-3 rounded-xl transition shadow-md shadow-indigo-600/10">
              View Details
            </button>
            <button onclick="toggleSave('${sch.id}')" class="p-3 rounded-xl border border-white/10 hover:border-pink-500/30 text-gray-400 hover:text-pink-500 hover:bg-pink-500/5 transition">
              <i class="${isSaved ? 'fa-solid' : 'fa-regular'} fa-bookmark text-sm"></i>
            </button>
          </div>
        </div>
      `;
      gridContainer.appendChild(card);
    });
  }
  // Bind Input Event Listeners
  searchInput.addEventListener('input', applyFiltersAndSort);
  sortSelect.addEventListener('change', applyFiltersAndSort);
  incomeFilter.addEventListener('change', applyFiltersAndSort);
  categoryFilter.addEventListener('change', applyFiltersAndSort);
  stateFilter.addEventListener('change', applyFiltersAndSort);
  eligibilityFilter.addEventListener('change', applyFiltersAndSort);
  // Global callbacks
  window.handleDetails = (id) => {
    localStorage.setItem('selectedScholarshipId', id);
    window.location.href = "scholarship-details.html";
  };
  window.toggleSave = (id) => {
    DB.toggleSaveScholarship(id);
    applyFiltersAndSort(); // refresh renders
  };
  // Run initial load
  applyFiltersAndSort();
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
