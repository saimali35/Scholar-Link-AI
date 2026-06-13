// Profile Setup Script
document.addEventListener('DOMContentLoaded', () => {
  // Protect page
  Auth.protectPage();
  const currentUser = Auth.getCurrentUser();
  const profile = DB.getProfile();
  // Populate header user info
  if (currentUser) {
    document.getElementById('user-display-name').textContent = currentUser.name;
    document.getElementById('user-display-email').textContent = currentUser.email;
    
    const initials = currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    document.getElementById('user-avatar-initials').textContent = initials;
  }
  // Populate form fields
  if (profile) {
    document.getElementById('fullName').value = profile.fullName || currentUser.name || '';
    document.getElementById('email-field').value = profile.email || currentUser.email || '';
    document.getElementById('age').value = profile.age || '';
    document.getElementById('gender').value = profile.gender || 'Male';
    document.getElementById('state').value = profile.state || 'Maharashtra';
    document.getElementById('collegeName').value = profile.collegeName || '';
    document.getElementById('course').value = profile.course || 'B.Tech';
    document.getElementById('currentYear').value = profile.currentYear || '1st Year';
    document.getElementById('cgpa').value = profile.cgpa || '';
    document.getElementById('income').value = profile.income || '';
    document.getElementById('category').value = profile.category || 'General';
    document.getElementById('minority').value = profile.minority || 'No';
    document.getElementById('disability').value = profile.disability || 'No';
  } else if (currentUser) {
    document.getElementById('fullName').value = currentUser.name;
    document.getElementById('email-field').value = currentUser.email;
  }
  // Form Submission
  const form = document.getElementById('profile-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const profileData = {
      fullName: document.getElementById('fullName').value.trim(),
      email: document.getElementById('email-field').value.trim(),
      age: document.getElementById('age').value,
      gender: document.getElementById('gender').value,
      state: document.getElementById('state').value,
      collegeName: document.getElementById('collegeName').value.trim(),
      course: document.getElementById('course').value,
      currentYear: document.getElementById('currentYear').value,
      cgpa: document.getElementById('cgpa').value,
      income: document.getElementById('income').value,
      category: document.getElementById('category').value,
      minority: document.getElementById('minority').value,
      disability: document.getElementById('disability').value
    };
    // Save profile to database
    DB.saveProfile(profileData);
    // Show success alert & redirect
    const successAlert = document.getElementById('success-alert');
    successAlert.classList.remove('hidden');
    form.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1500);
  });
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