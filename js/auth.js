// ── AUTH JS ──────────────────────────────────────────────────────────

function switchAuthTab(tab, btn) {
  document.querySelectorAll('.auth-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-login').style.display = tab === 'login' ? 'block' : 'none';
  document.getElementById('tab-demo').style.display  = tab === 'demo'  ? 'block' : 'none';
}

function doLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-password').value.trim();
  const errEl = document.getElementById('login-error');

  if (!email || !pass) {
    errEl.textContent = 'Please enter your email and password.';
    errEl.style.display = 'block'; return;
  }
  errEl.style.display = 'none';

  // Demo shortcut – accept any credentials
  const roleMap = {
    'admin@ecoyantra.com': 'super_admin',
    'nurse@aiims.com':     'nurse',
    'compliance@aiims.com':'compliance',
    'hospital@aiims.com':  'hospital_admin'
  };
  const role = roleMap[email] || 'hospital_admin';
  saveSession(role);
  window.location.href = 'dashboard.html';
}

function loginAs(role) {
  saveSession(role);
  window.location.href = 'dashboard.html';
}

function saveSession(role) {
  const profiles = {
    super_admin:    { name: 'Super Admin',     initials: 'SA', hospital: 'All Hospitals',  role: 'Super Admin' },
    hospital_admin: { name: 'Dr. R. Sharma',   initials: 'RS', hospital: 'AIIMS Mumbai',   role: 'Hospital Admin' },
    compliance:     { name: 'A. Mehta',        initials: 'AM', hospital: 'AIIMS Mumbai',   role: 'Compliance Officer' },
    nurse:          { name: 'Nurse N. Patil',  initials: 'NP', hospital: 'AIIMS Mumbai',   role: 'Waste Generator' }
  };
  const p = profiles[role] || profiles['hospital_admin'];
  localStorage.setItem('ey_user', JSON.stringify({ role, ...p }));
}
