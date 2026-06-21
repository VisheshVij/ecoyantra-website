// ── ECOYANTRA APP.JS ─────────────────────────────────────────────────

// ── INIT ──────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  loadUser();
  startClock();
  loadNotifications();
  loadAlerts();
  loadRankings();
  loadWasteTable();
  loadHistoryTable();
  loadScanHistory();
  loadFullScanHistory();
  loadLifecycleTable();
  loadFleet();
  loadViolations();
  loadAuditTable();
  loadReports();
  loadHospitals();
  loadUsers();
  loadESG();
  populateQRSelect();
  setWasteFormDefaults();
  navigate('dashboard', document.querySelector('[data-page=dashboard]'));
});

// ── USER ─────────────────────────────────────────────────────────────
function loadUser() {
  const u = JSON.parse(localStorage.getItem('ey_user') || '{"name":"Super Admin","initials":"SA","hospital":"All Hospitals","role":"Super Admin"}');
  document.getElementById('user-name').textContent   = u.name;
  document.getElementById('user-role').textContent   = u.hospital + ' · Live';
  document.getElementById('user-avatar').textContent = u.initials || u.name.slice(0,2).toUpperCase();
}

// ── CLOCK ─────────────────────────────────────────────────────────────
function startClock() {
  const el = document.getElementById('clock');
  function tick() {
    const now = new Date();
    el.textContent = now.toLocaleTimeString('en-IN', { hour:'2-digit', minute:'2-digit', second:'2-digit' }) + ' IST';
  }
  tick(); setInterval(tick, 1000);
}

// ── NAVIGATION ────────────────────────────────────────────────────────
function navigate(pageId, el) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const page = document.getElementById('page-' + pageId);
  if (page) page.classList.add('active');
  if (el) el.classList.add('active');
  const titles = {
    dashboard:'Executive Dashboard', analytics:'Analytics Center',
    waste:'Waste Registry', qr:'QR Management', lifecycle:'Lifecycle Tracking',
    transport:'Transport & GPS', compliance:'Compliance Center',
    audit:'Audit Trail', reports:'Reports', hospitals:'Hospital Management',
    users:'Users & RBAC', esg:'ESG & Carbon Tracking'
  };
  document.getElementById('page-title').textContent = titles[pageId] || pageId;
  if (pageId === 'analytics') { setTimeout(initAnalyticsCharts, 100); }
  if (pageId === 'compliance') { setTimeout(initComplianceChart, 100); }
  if (pageId === 'esg') { setTimeout(initCarbonChart, 100); }
  closeNotifPanel();
}

// ── SIDEBAR TOGGLE ────────────────────────────────────────────────────
function toggleSidebar() {
  document.getElementById('sidebar').classList.toggle('collapsed');
}

// ── TAB SWITCHING ─────────────────────────────────────────────────────
function switchTab(btn, contentId) {
  const parent = btn.closest('.page') || btn.closest('.card') || document;
  parent.querySelectorAll('.ptab').forEach(t => t.classList.remove('active'));
  parent.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  const target = document.getElementById(contentId);
  if (target) target.classList.add('active');
}

// ── NOTIFICATIONS ─────────────────────────────────────────────────────
function loadNotifications() {
  const list = document.getElementById('notif-list');
  list.innerHTML = EY.notifications.map(n => `
    <div class="notif-item ${n.read ? '' : 'unread'}">
      <div class="notif-icon" style="background:${n.type==='err'?'var(--red-light)':n.type==='warn'?'var(--amber-light)':'var(--green-light)'}; color:${n.type==='err'?'var(--red-dark)':n.type==='warn'?'var(--amber-dark)':'var(--green-dark)'}">
        <i class="fa ${n.icon}"></i>
      </div>
      <div>
        <div class="notif-msg">${n.msg}</div>
        <div class="notif-time">${n.time}</div>
      </div>
    </div>
  `).join('');
}

function toggleNotifPanel() {
  document.getElementById('notif-panel').classList.toggle('open');
}
function closeNotifPanel() {
  document.getElementById('notif-panel').classList.remove('open');
}

// ── ALERTS (DASHBOARD) ────────────────────────────────────────────────
function loadAlerts() {
  document.getElementById('alert-list').innerHTML = EY.alerts.map(a => `
    <div class="alert-item alert-${a.type}">
      <div class="alert-icon"><i class="fa ${a.icon}"></i></div>
      <div>
        <div class="alert-msg">${a.msg}</div>
        <div class="alert-time">${a.time}</div>
      </div>
    </div>
  `).join('');
}

function markAllRead() {
  EY.notifications.forEach(n => n.read = true);
  document.getElementById('notif-dot').style.display = 'none';
  showToast('All notifications marked as read', 'success');
}

// ── RANKINGS ─────────────────────────────────────────────────────────
function loadRankings() {
  document.getElementById('hospital-rankings').innerHTML = EY.rankings.map(r => `
    <div class="rank-row">
      <div class="rank-num">${r.rank}</div>
      <div class="rank-name">${r.name}</div>
      <div class="rank-bar-wrap"><div class="rank-bar" style="width:${r.score}%;background:${r.color}"></div></div>
      <div class="rank-score" style="color:${r.score>=90?'var(--green-dark)':r.score>=80?'var(--amber-dark)':'var(--red-dark)'}">${r.score}%</div>
    </div>
  `).join('');
}

// ── WASTE TABLE ───────────────────────────────────────────────────────
function loadWasteTable(data) {
  const rows = data || EY.wasteRecords.filter(w => w.status !== 'DISPOSED');
  document.getElementById('waste-tbody').innerHTML = rows.map(w => `
    <tr>
      <td><span style="font-family:monospace;font-size:11px">${w.id}</span></td>
      <td>${catBadge(w.category)}</td>
      <td>${w.dept}</td>
      <td><strong>${w.weight} kg</strong></td>
      <td>${w.by}</td>
      <td>${statusBadge(w.status)}</td>
      <td>${w.date.split(' ')[0]}</td>
      <td>
        <button class="btn-icon" onclick="viewLifecycle('${w.id}')" title="Track"><i class="fa fa-timeline"></i></button>
        <button class="btn-icon" onclick="viewQR('${w.id}')" title="QR"><i class="fa fa-qrcode"></i></button>
        <button class="btn-icon" onclick="advanceStatus('${w.id}')" title="Advance status"><i class="fa fa-arrow-right"></i></button>
      </td>
    </tr>
  `).join('') || '<tr><td colspan="8" style="text-align:center;padding:24px;color:var(--text-3)">No records found</td></tr>';
}

function filterWasteTable() {
  const q   = document.getElementById('waste-search').value.toLowerCase();
  const cat = document.getElementById('waste-cat-filter').value;
  const filtered = EY.wasteRecords.filter(w =>
    w.status !== 'DISPOSED' &&
    (!cat || w.category === cat) &&
    (!q || w.id.toLowerCase().includes(q) || w.dept.toLowerCase().includes(q) || w.by.toLowerCase().includes(q))
  );
  loadWasteTable(filtered);
}

function loadHistoryTable() {
  document.getElementById('history-tbody').innerHTML = EY.disposedHistory.map(w => `
    <tr>
      <td><span style="font-family:monospace;font-size:11px">${w.id}</span></td>
      <td>${catBadge(w.category)}</td>
      <td>${w.weight} kg</td>
      <td>${w.disposedAt}</td>
      <td>${w.cbwtf}</td>
      <td><span class="${w.wdi < 3 ? 's-ok' : w.wdi < 5 ? 's-warn' : 's-err'} badge">${w.wdi}%</span></td>
      <td>${statusBadge(w.status)}</td>
    </tr>
  `).join('');
}

function advanceStatus(id) {
  const flow = ['GENERATED','STORED','COLLECTED','IN_TRANSIT','RECEIVED','PROCESSING','DISPOSED'];
  const rec = EY.wasteRecords.find(w => w.id === id);
  if (!rec) return;
  const idx = flow.indexOf(rec.status);
  if (idx < flow.length - 1) {
    rec.status = flow[idx + 1];
    loadWasteTable();
    showToast(`${id} advanced to ${rec.status.replace('_',' ')}`, 'success');
  }
}

function viewLifecycle(id) {
  navigate('lifecycle', document.querySelector('[data-page=lifecycle]'));
  document.getElementById('track-input').value = id;
  setTimeout(() => trackWaste(), 100);
}

function viewQR(id) {
  navigate('qr', document.querySelector('[data-page=qr]'));
  document.getElementById('manual-qr-input').value = id;
  setTimeout(() => lookupQR(), 100);
}

// ── LIFECYCLE ─────────────────────────────────────────────────────────
function loadLifecycleTable() {
  document.getElementById('lifecycle-tbody').innerHTML = EY.wasteRecords.slice(0,8).map(w => {
    const stages = ['GENERATED','STORED','COLLECTED','IN_TRANSIT','RECEIVED','PROCESSING','DISPOSED'];
    const idx = stages.indexOf(w.status);
    return `
      <tr>
        <td><span style="font-family:monospace;font-size:11px">${w.id}</span></td>
        <td>${catBadge(w.category)}</td>
        <td>${statusBadge(w.status)}</td>
        <td>${w.date}</td>
        <td>${w.by}</td>
        <td>${w.date}</td>
        <td><button class="btn-ghost btn-sm" onclick="viewLifecycle('${w.id}')"><i class="fa fa-timeline"></i> Track</button></td>
      </tr>
    `;
  }).join('');
}

function trackWaste() {
  const code = document.getElementById('track-input').value.trim().toUpperCase();
  const result = document.getElementById('lifecycle-result');
  const data = EY.lifecycleData[code];
  const rec  = EY.wasteRecords.find(w => w.id === code);

  if (!data && !rec) {
    result.innerHTML = `<div class="empty-state"><i class="fa fa-search"></i><div>No record found for <strong>${code}</strong></div></div>`;
    return;
  }

  const stages = data ? data.stages : ['GENERATED','STORED','COLLECTED','IN_TRANSIT','RECEIVED','PROCESSING','DISPOSED'];
  const stageIcons = { GENERATED:'fa-plus', STORED:'fa-box-archive', COLLECTED:'fa-box', IN_TRANSIT:'fa-truck', RECEIVED:'fa-building', PROCESSING:'fa-fire', DISPOSED:'fa-check' };
  const currentStage = data ? data.currentStage : Math.max(0, ['GENERATED','STORED','COLLECTED','IN_TRANSIT','RECEIVED','PROCESSING','DISPOSED'].indexOf(rec.status));

  result.innerHTML = `
    <div class="lifecycle-track">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
        ${catBadge((data||rec).category)}
        <span style="font-family:monospace;font-weight:600">${code}</span>
        <span style="color:var(--text-3)">·</span>
        <span>${data ? data.weight : rec.weight + ' kg'}</span>
        <span style="color:var(--text-3)">·</span>
        <span>${data ? data.dept : rec.dept}</span>
      </div>
      <div class="lc-steps">
        ${stages.map((s,i) => `
          <div class="lc-step ${i < currentStage ? 'lc-done' : i === currentStage ? 'lc-active' : 'lc-pending'}">
            <div class="lc-dot"><i class="fa ${stageIcons[s]||'fa-circle'}"></i></div>
            <div class="lc-label">${s.replace('_',' ')}</div>
          </div>
        `).join('')}
      </div>
      <div class="lc-info-grid">
        <div class="lc-info-item"><div class="lc-info-label">Current Stage</div><div class="lc-info-val">${stages[currentStage].replace('_',' ')}</div></div>
        <div class="lc-info-item"><div class="lc-info-label">Last Updated</div><div class="lc-info-val">${data ? '09:31 IST, 10 Jun 2026' : rec.date}</div></div>
        <div class="lc-info-item"><div class="lc-info-label">Hash (Chain)</div><div class="lc-info-val" style="font-family:monospace;font-size:10px;color:var(--text-3)">a3f4b2c1…</div></div>
      </div>
      ${data && data.events ? `
        <div style="margin-top:16px">
          <div style="font-size:11px;color:var(--text-3);text-transform:uppercase;letter-spacing:0.5px;margin-bottom:8px">Event History</div>
          <table class="data-table">
            <thead><tr><th>Time</th><th>Event</th><th>Actor</th><th>Location</th><th>Status</th></tr></thead>
            <tbody>
              ${data.events.map(e=>`<tr><td>${e.ts}</td><td>${e.event}</td><td>${e.actor}</td><td>${e.loc}</td><td><span class="badge ${e.status==='VERIFIED'||e.status==='LOGGED'||e.status==='DONE'?'success':'info'}">${e.status}</span></td></tr>`).join('')}
            </tbody>
          </table>
        </div>
      ` : ''}
    </div>
  `;
}

// ── FLEET ─────────────────────────────────────────────────────────────
function loadFleet() {
  document.getElementById('fleet-tbody').innerHTML = EY.vehicles.map(v => `
    <tr>
      <td><strong style="font-family:monospace">${v.reg}</strong></td>
      <td>${v.driver}</td>
      <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis">${v.route}</td>
      <td>${v.load}</td>
      <td>
        <span style="color:${v.gps==='On-route'?'var(--green-dark)':v.gps==='Off-route'?'var(--red-dark)':'var(--text-3)'}">
          <i class="fa ${v.gps==='Off-route'?'fa-map-pin-slash':v.gps==='Base'?'fa-location-dot':'fa-map-location-dot'}"></i> ${v.gps}
        </span>
      </td>
      <td>${v.eta}</td>
      <td>${vehicleStatusBadge(v.status)}</td>
      <td>
        <button class="btn-icon" onclick="showVehicleDetails('${v.reg}')"><i class="fa fa-eye"></i></button>
        <button class="btn-icon"><i class="fa fa-map-location-dot"></i></button>
      </td>
    </tr>
  `).join('');

  // Map vehicles summary
  document.getElementById('map-vehicles').innerHTML = EY.vehicles.map(v => `
    <div style="display:inline-flex;align-items:center;gap:6px;margin:4px 6px;padding:4px 10px;background:rgba(255,255,255,0.1);border-radius:20px;font-size:11px">
      <span style="width:8px;height:8px;border-radius:50%;background:${v.status==='OK'?'#1D9E75':v.status==='ALERT'?'#E24B4A':'#94a3b8'};display:inline-block"></span>
      ${v.reg}
    </div>
  `).join('');
}

function vehicleStatusBadge(s) {
  const m = { OK:'s-ok', ALERT:'s-err', IDLE:'s-neutral' };
  const l = { OK:'On Track', ALERT:'Alert', IDLE:'Idle' };
  return `<span class="badge ${m[s]||'s-neutral'}">${l[s]||s}</span>`;
}

function addVehicle() {
  openModal('Add Vehicle', `
    <div class="form-grid-2">
      <div class="form-field"><label>Registration No.</label><input type="text" placeholder="MH-XX-XX-XXXX" /></div>
      <div class="form-field"><label>Driver Name</label><input type="text" placeholder="Driver name" /></div>
      <div class="form-field"><label>Driver Phone</label><input type="tel" placeholder="+91 XXXXX XXXXX" /></div>
      <div class="form-field"><label>Capacity (kg)</label><input type="number" placeholder="500" /></div>
    </div>
    <div class="form-actions"><button class="btn-primary" onclick="closeModal();showToast('Vehicle registered','success')">Register Vehicle</button></div>
  `);
}

function showVehicleDetails(reg) {
  const v = EY.vehicles.find(x => x.reg === reg);
  if (!v) return;
  openModal(`Vehicle: ${v.reg}`, `
    <div class="form-grid-2">
      <div class="lc-info-item"><div class="lc-info-label">Driver</div><div class="lc-info-val">${v.driver}</div></div>
      <div class="lc-info-item"><div class="lc-info-label">Status</div><div class="lc-info-val">${vehicleStatusBadge(v.status)}</div></div>
      <div class="lc-info-item"><div class="lc-info-label">Route</div><div class="lc-info-val">${v.route}</div></div>
      <div class="lc-info-item"><div class="lc-info-label">Load</div><div class="lc-info-val">${v.load}</div></div>
      <div class="lc-info-item"><div class="lc-info-label">GPS</div><div class="lc-info-val">${v.gps}</div></div>
      <div class="lc-info-item"><div class="lc-info-label">ETA</div><div class="lc-info-val">${v.eta}</div></div>
    </div>
    <div style="margin-top:12px;padding:10px;background:var(--bg-2);border-radius:8px;font-size:12px;color:var(--text-3)">
      <i class="fa fa-map-location-dot"></i> Live GPS map will display here once Mapbox API key is configured in js/config.js
    </div>
  `);
}

// ── VIOLATIONS ────────────────────────────────────────────────────────
function loadViolations() {
  document.getElementById('violations-tbody').innerHTML = EY.violations.map(v => `
    <tr>
      <td><span style="font-family:monospace;font-size:11px">${v.id}</span></td>
      <td>${v.hospital}</td>
      <td><span style="font-size:11px">${v.type.replace(/_/g,' ')}</span></td>
      <td>${severityBadge(v.severity)}</td>
      <td>${v.detected}</td>
      <td>${violationStatusBadge(v.status)}</td>
      <td>
        <button class="btn-ghost btn-sm" onclick="resolveViolation('${v.id}')"><i class="fa fa-check"></i> Resolve</button>
      </td>
    </tr>
  `).join('');
}

function resolveViolation(id) {
  const v = EY.violations.find(x => x.id === id);
  if (v) { v.status = 'RESOLVED'; loadViolations(); showToast(`Violation ${id} marked resolved`, 'success'); }
}

function addViolation() {
  openModal('Log Violation', `
    <div class="form-grid-2">
      <div class="form-field"><label>Hospital</label><select>${EY.hospitals.map(h=>`<option>${h.name}</option>`).join('')}</select></div>
      <div class="form-field"><label>Type</label><select><option>MISSED_COLLECTION</option><option>SEGREGATION_ERROR</option><option>WEIGHT_DISCREPANCY</option><option>COMPLIANCE_DEADLINE</option></select></div>
      <div class="form-field"><label>Severity</label><select><option>LOW</option><option>MEDIUM</option><option>HIGH</option><option>CRITICAL</option></select></div>
    </div>
    <div class="form-field" style="margin-top:12px"><label>Description</label><textarea rows="3" placeholder="Describe the violation..."></textarea></div>
    <div class="form-actions"><button class="btn-primary" onclick="closeModal();showToast('Violation logged','success')"><i class="fa fa-check"></i> Log Violation</button></div>
  `);
}

function severityBadge(s) {
  const m = { CRITICAL:'s-err', HIGH:'s-err', MEDIUM:'s-warn', LOW:'s-info' };
  return `<span class="badge ${m[s]||'s-neutral'}">${s}</span>`;
}
function violationStatusBadge(s) {
  const m = { OPEN:'s-err', REVIEW:'s-warn', RESOLVED:'s-ok', ESCALATED:'s-err' };
  return `<span class="badge ${m[s]||'s-neutral'}">${s}</span>`;
}

// ── HOSPITALS ─────────────────────────────────────────────────────────
function loadHospitals(data) {
  const rows = data || EY.hospitals;
  document.getElementById('hospitals-tbody').innerHTML = rows.map(h => `
    <tr>
      <td><strong>${h.name}</strong></td>
      <td>${h.city}, ${h.state}</td>
      <td>${h.beds.toLocaleString()}</td>
      <td>${h.depts}</td>
      <td>${h.waste}</td>
      <td><span style="color:${h.compliance>=90?'var(--green-dark)':h.compliance>=80?'var(--amber-dark)':'var(--red-dark)'};font-weight:600">${h.compliance}%</span></td>
      <td style="color:${new Date(h.expiry) < new Date('2026-12-31') ? 'var(--amber-dark)' : 'var(--text-2)'}">${h.expiry}</td>
      <td>${hospitalStatusBadge(h.status)}</td>
      <td>
        <button class="btn-icon" onclick="viewHospital('${h.name}')"><i class="fa fa-eye"></i></button>
        <button class="btn-icon"><i class="fa fa-pen"></i></button>
      </td>
    </tr>
  `).join('');
}

function hospitalStatusBadge(s) {
  const m = { ACTIVE:'s-ok', ALERT:'s-warn', CRITICAL:'s-err' };
  return `<span class="badge ${m[s]||'s-neutral'}">${s}</span>`;
}

function filterHospitals() {
  const q = document.getElementById('hosp-search').value.toLowerCase();
  loadHospitals(EY.hospitals.filter(h => h.name.toLowerCase().includes(q) || h.city.toLowerCase().includes(q)));
}

function showAddHospital() {
  openModal('Add Hospital', `
    <div class="form-grid-2">
      <div class="form-field"><label>Hospital Name</label><input type="text" placeholder="e.g. AIIMS Mumbai" /></div>
      <div class="form-field"><label>Registration No.</label><input type="text" placeholder="CPCB Registration" /></div>
      <div class="form-field"><label>City</label><input type="text" placeholder="Mumbai" /></div>
      <div class="form-field"><label>State</label><select><option>Maharashtra</option><option>Delhi</option><option>Tamil Nadu</option><option>Karnataka</option><option>Haryana</option></select></div>
      <div class="form-field"><label>Phone</label><input type="tel" /></div>
      <div class="form-field"><label>Email</label><input type="email" /></div>
      <div class="form-field"><label>Bed Count</label><input type="number" /></div>
      <div class="form-field"><label>CPCB License No.</label><input type="text" /></div>
    </div>
    <div class="form-actions"><button class="btn-primary" onclick="closeModal();showToast('Hospital onboarded','success')"><i class="fa fa-plus"></i> Onboard Hospital</button></div>
  `);
}

function viewHospital(name) {
  const h = EY.hospitals.find(x => x.name === name);
  if (!h) return;
  openModal(h.name, `
    <div class="form-grid-2">
      <div class="lc-info-item"><div class="lc-info-label">City / State</div><div class="lc-info-val">${h.city}, ${h.state}</div></div>
      <div class="lc-info-item"><div class="lc-info-label">Bed Count</div><div class="lc-info-val">${h.beds.toLocaleString()}</div></div>
      <div class="lc-info-item"><div class="lc-info-label">Departments</div><div class="lc-info-val">${h.depts}</div></div>
      <div class="lc-info-item"><div class="lc-info-label">Daily Waste</div><div class="lc-info-val">${h.waste}</div></div>
      <div class="lc-info-item"><div class="lc-info-label">Compliance Score</div><div class="lc-info-val" style="color:${h.compliance>=90?'var(--green-dark)':'var(--amber-dark)'}">${h.compliance}%</div></div>
      <div class="lc-info-item"><div class="lc-info-label">License Expiry</div><div class="lc-info-val">${h.expiry}</div></div>
    </div>
    <div style="margin-top:12px">
      <button class="btn-primary btn-sm" onclick="navigate('waste',document.querySelector('[data-page=waste]'));closeModal()"><i class="fa fa-trash-can"></i> View Waste Records</button>
    </div>
  `);
}

// ── USERS ─────────────────────────────────────────────────────────────
function loadUsers(data) {
  const rows = data || EY.users;
  document.getElementById('users-tbody').innerHTML = rows.map(u => `
    <tr>
      <td><strong>${u.name}</strong></td>
      <td style="color:var(--text-3);font-size:11px">${u.email}</td>
      <td>${roleBadge(u.role)}</td>
      <td>${u.hospital}</td>
      <td>${u.lastActive}</td>
      <td>${u.mfa ? '<span style="color:var(--green-dark)"><i class="fa fa-shield-halved"></i> On</span>' : '<span style="color:var(--red-dark)"><i class="fa fa-shield"></i> Off</span>'}</td>
      <td>${u.status === 'ACTIVE' ? '<span class="badge s-ok">Active</span>' : '<span class="badge s-warn">Alert</span>'}</td>
      <td>
        <button class="btn-icon"><i class="fa fa-pen"></i></button>
        <button class="btn-icon"><i class="fa fa-ellipsis"></i></button>
      </td>
    </tr>
  `).join('');
}

function roleBadge(r) {
  const m = {
    'Super Admin':        'background:#EEEDFE;color:#534AB7',
    'Hospital Admin':     'background:var(--blue-light);color:var(--blue-dark)',
    'Compliance Officer': 'background:var(--green-light);color:var(--green-dark)',
    'Waste Generator':    'background:var(--amber-light);color:var(--amber-dark)',
    'Collection Staff':   'background:var(--bg-3);color:var(--text-2)',
    'Transport Team':     'background:#E1F5EE;color:#085041',
    'Department Manager': 'background:var(--blue-light);color:var(--blue-dark)',
  };
  return `<span class="badge" style="${m[r]||''}">${r}</span>`;
}

function filterUsers() {
  const q = document.getElementById('user-search').value.toLowerCase();
  loadUsers(EY.users.filter(u => u.name.toLowerCase().includes(q) || u.role.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)));
}

function showInviteUser() {
  openModal('Invite User', `
    <div class="form-grid-2">
      <div class="form-field"><label>Full Name</label><input type="text" placeholder="Dr. / Nurse / Staff name" /></div>
      <div class="form-field"><label>Email</label><input type="email" placeholder="user@hospital.com" /></div>
      <div class="form-field"><label>Role</label><select><option>Waste Generator</option><option>Collection Staff</option><option>Transport Team</option><option>Compliance Officer</option><option>Department Manager</option><option>Hospital Admin</option></select></div>
      <div class="form-field"><label>Hospital</label><select>${EY.hospitals.map(h=>`<option>${h.name}</option>`).join('')}</select></div>
    </div>
    <div class="form-actions"><button class="btn-primary" onclick="closeModal();showToast('Invitation sent','success')"><i class="fa fa-paper-plane"></i> Send Invite</button></div>
  `);
}

// ── REPORTS ───────────────────────────────────────────────────────────
function loadReports() {
  document.getElementById('reports-tbody').innerHTML = EY.reports.map(r => `
    <tr>
      <td><strong>${r.name}</strong></td>
      <td><span class="badge info">${r.type}</span></td>
      <td>${r.period}</td>
      <td>${r.hospital}</td>
      <td>${r.generated}</td>
      <td>${r.size}</td>
      <td><span class="badge s-ok">${r.status}</span></td>
      <td>
        <button class="btn-ghost btn-sm" onclick="downloadReport('${r.name}')"><i class="fa fa-download"></i> Download</button>
        <button class="btn-icon"><i class="fa fa-eye"></i></button>
      </td>
    </tr>
  `).join('');
}

function downloadReport(name) { showToast(`Downloading: ${name}`, 'success'); }

// ── ESG ───────────────────────────────────────────────────────────────
function loadESG() {
  const items = [
    { label:'Waste Segregation Accuracy', score:98, max:100 },
    { label:'Zero Landfill Compliance',   score:100,max:100 },
    { label:'Carbon Footprint Reduction', score:72, max:100 },
    { label:'Water Usage in Autoclaving', score:65, max:100 },
    { label:'Renewable Energy Use',       score:40, max:100 },
    { label:'Community Health Impact',    score:87, max:100 },
  ];
  document.getElementById('esg-breakdown').innerHTML = items.map(i => `
    <div class="esg-item">
      <div class="esg-label">${i.label}</div>
      <div class="esg-bar-wrap"><div class="esg-bar" style="width:${i.score}%;background:${i.score>=80?'var(--green)':i.score>=60?'var(--amber)':'var(--red)'}"></div></div>
      <div class="esg-score" style="color:${i.score>=80?'var(--green-dark)':i.score>=60?'var(--amber-dark)':'var(--red-dark)'}">${i.score}</div>
    </div>
  `).join('');
}

// ── MODAL ─────────────────────────────────────────────────────────────
function openModal(title, body) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-body').innerHTML = body;
  document.getElementById('modal').classList.add('active');
  document.getElementById('modal-overlay').classList.add('active');
}
function closeModal() {
  document.getElementById('modal').classList.remove('active');
  document.getElementById('modal-overlay').classList.remove('active');
}

// ── TOAST ─────────────────────────────────────────────────────────────
function showToast(msg, type = 'success', duration = 3000) {
  const icons = { success:'fa-check-circle', error:'fa-circle-xmark', warn:'fa-triangle-exclamation', info:'fa-circle-info' };
  const colors = { success:'var(--green-dark)', error:'var(--red-dark)', warn:'var(--amber-dark)', info:'var(--blue-dark)' };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<i class="fa ${icons[type]||'fa-circle-info'}" style="color:${colors[type]}"></i><span>${msg}</span>`;
  document.getElementById('toast-container').appendChild(el);
  setTimeout(() => el.remove(), duration);
}

// ── HELPERS ───────────────────────────────────────────────────────────
function catBadge(cat) {
  const m = {
    YELLOW: 'background:#FAEEDA;color:#854F0B',
    RED:    'background:#FCEBEB;color:#A32D2D',
    WHITE:  'background:#f1f5f9;color:#475569;border:1px solid #cbd5e1',
    BLUE:   'background:#E6F1FB;color:#185FA5',
  };
  const icons = { YELLOW:'🟡', RED:'🔴', WHITE:'⬜', BLUE:'🔵' };
  return `<span class="badge" style="${m[cat]||''}">${icons[cat]||''} ${cat}</span>`;
}

function statusBadge(s) {
  const m = {
    GENERATED:'s-info', STORED:'s-neutral', COLLECTED:'s-ok',
    IN_TRANSIT:'s-warn', RECEIVED:'s-ok', PROCESSING:'s-warn', DISPOSED:'s-neutral'
  };
  return `<span class="badge ${m[s]||'s-neutral'}">${s.replace('_',' ')}</span>`;
}

function exportWasteCSV() {
  const rows = [['Waste Code','Category','Department','Weight (kg)','Generated By','Status','Date']];
  EY.wasteRecords.forEach(w => rows.push([w.id,w.category,w.dept,w.weight,w.by,w.status,w.date]));
  downloadCSV(rows, 'EcoYantra_Waste_Records.csv');
}

function exportAuditCSV() {
  const rows = [['Timestamp','User','Role','Action','Entity','IP','Hash','Status']];
  EY.auditLogs.forEach(a => rows.push([a.ts,a.user,a.role,a.action,a.entity,a.ip,a.hash,a.status]));
  downloadCSV(rows, 'EcoYantra_Audit_Trail.csv');
}

function downloadCSV(rows, filename) {
  const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
  const a = document.createElement('a');
  a.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  a.download = filename;
  a.click();
  showToast(`Exported ${filename}`, 'success');
}

function pushCPCB() {
  showToast('Pushing to CPCB CMS API...', 'info', 1500);
  setTimeout(() => showToast('CPCB CMS sync successful — 2,847 kg logged', 'success'), 1800);
}

function exportChart() { showToast('Chart exported as PNG', 'success'); }

function populateQRSelect() {
  const sel = document.getElementById('qr-gen-select');
  if (!sel) return;
  EY.wasteRecords.forEach(w => {
    const opt = document.createElement('option');
    opt.value = w.id; opt.textContent = `${w.id} — ${w.category} — ${w.weight}kg`;
    sel.appendChild(opt);
  });
}

function setWasteFormDefaults() {
  const dtEl = document.getElementById('wf-datetime');
  if (dtEl) dtEl.value = new Date().toISOString().slice(0,16);
  const idEl = document.getElementById('wf-id');
  if (idEl) {
    const pad = n => String(n).padStart(5,'0');
    const d   = new Date();
    idEl.value = `BMW-${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${pad(EY.wasteRecords.length+1)}`;
  }
}
