// ── WASTE FORM ────────────────────────────────────────────────────────
const SEG_GUIDE = {
  YELLOW: { text:'Yellow bags are for anatomical, pharmaceutical, and chemical waste only. Treatment: <strong>Incineration ONLY</strong>. Do NOT mix with recyclables.', color:'#FAEEDA', border:'#FAC775', textColor:'#854F0B' },
  RED:    { text:'Red bags are for contaminated plastic and recyclable items. Treatment: <strong>Autoclaving or microwave treatment</strong>. Remove sharps first.', color:'#FCEBEB', border:'#F09595', textColor:'#A32D2D' },
  WHITE:  { text:'White (translucent) containers for sharps: needles, blades, glass pieces. Treatment: <strong>Autoclaving + shredding</strong>. Seal when 3/4 full.', color:'#f1f5f9', border:'#cbd5e1', textColor:'#475569' },
  BLUE:   { text:'Blue bags/containers for glassware and metallic implants. Treatment: <strong>Autoclaving + sterilization</strong> before disposal or recycling.', color:'#E6F1FB', border:'#b5d4f4', textColor:'#185FA5' },
};

function updateCategoryGuidance() {
  const cat = document.getElementById('wf-category').value;
  const guide = document.getElementById('seg-guide');
  const guideText = document.getElementById('seg-guide-text');
  if (!cat) { guide.style.display = 'none'; return; }
  const g = SEG_GUIDE[cat];
  guide.style.display = 'flex';
  guide.style.background = g.color;
  guide.style.borderColor = g.border;
  guide.style.color = g.textColor;
  guideText.innerHTML = g.text;
}

function submitWasteForm(e) {
  e.preventDefault();
  const id       = document.getElementById('wf-id').value;
  const category = document.getElementById('wf-category').value;
  const dept     = document.getElementById('wf-dept').value;
  const by       = document.getElementById('wf-by').value;
  const weight   = parseFloat(document.getElementById('wf-weight').value);
  const qty      = parseInt(document.getElementById('wf-qty').value) || 1;
  const dt       = document.getElementById('wf-datetime').value;
  const location = document.getElementById('wf-location').value;
  const remarks  = document.getElementById('wf-remarks').value;

  if (!category) { showToast('Please select a waste category', 'error'); return; }
  if (!dept)     { showToast('Please select a department', 'error'); return; }
  if (!weight || weight <= 0) { showToast('Please enter a valid weight', 'error'); return; }
  if (weight > 500) { showToast('Weight cannot exceed 500 kg for a single record', 'error'); return; }

  // Add to data store
  EY.wasteRecords.unshift({ id, category, dept, weight, qty, by, status:'GENERATED', date: dt.replace('T',' '), location, remarks });

  // Show success with QR modal
  showQRModal(id, category, weight, dept, by, dt);

  // Reset form
  resetWasteForm();
  loadWasteTable();
  populateQRSelect();
  updateBadge('waste', EY.wasteRecords.filter(w => w.status !== 'DISPOSED').length);

  // Log to audit
  EY.auditLogs.unshift({
    ts: new Date().toLocaleTimeString('en-IN',{hour:'2-digit',minute:'2-digit',second:'2-digit'}),
    user: JSON.parse(localStorage.getItem('ey_user')||'{}').name || 'User',
    role: 'Waste Generator',
    action: 'CREATE_WASTE_RECORD',
    entity: id,
    ip: '10.0.1.' + Math.floor(Math.random()*200+10),
    hash: Math.random().toString(36).substr(2,8),
    status: 'LOGGED'
  });
}

function showQRModal(id, category, weight, dept, by, dt) {
  const catColors = { YELLOW:'#EF9F27', RED:'#E24B4A', WHITE:'#94a3b8', BLUE:'#378ADD' };
  const catLabels = { YELLOW:'🟡 YELLOW — INCINERATION ONLY', RED:'🔴 RED — AUTOCLAVING', WHITE:'⬜ WHITE — SHARPS', BLUE:'🔵 BLUE — STERILIZATION' };
  const shortDate  = dt.split('T').join(' ');

  openModal('Waste Registered — QR Label Generated', `
    <div style="display:flex;gap:20px;align-items:flex-start">
      <div>
        <div class="qr-label">
          <div class="qr-label-header">
            <span>ECOYANTRA</span>
            <span style="color:${catColors[category]};font-size:12px">${category}</span>
          </div>
          <div class="qr-label-code">${id}</div>
          <div id="qr-canvas-${id}" style="margin:8px auto;width:100px"></div>
          <div class="qr-label-details">
            <div>Dept: ${dept.split('—')[0].trim()}</div>
            <div>Wt: ${weight} kg</div>
            <div>By: ${by || 'Staff'}</div>
            <div>Date: ${shortDate}</div>
          </div>
          <div class="qr-label-footer" style="color:${catColors[category]}">${catLabels[category]}</div>
        </div>
      </div>
      <div style="flex:1">
        <div style="padding:12px;background:var(--green-light);border-radius:8px;margin-bottom:12px">
          <div style="color:var(--green-dark);font-weight:600;font-size:13px"><i class="fa fa-check-circle"></i> Waste record created successfully</div>
          <div style="font-size:12px;color:var(--green-dark);margin-top:4px">Waste ID: <strong>${id}</strong></div>
        </div>
        <div style="font-size:12px;color:var(--text-2);line-height:1.7">
          <div><i class="fa fa-check" style="color:var(--green);width:16px"></i> QR label generated</div>
          <div><i class="fa fa-check" style="color:var(--green);width:16px"></i> Audit log created</div>
          <div><i class="fa fa-check" style="color:var(--green);width:16px"></i> Added to collection queue</div>
          <div><i class="fa fa-clock" style="color:var(--amber);width:16px"></i> Awaiting collection</div>
        </div>
        <div style="margin-top:14px;display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn-primary btn-sm" onclick="printQRFromModal()"><i class="fa fa-print"></i> Print Label</button>
          <button class="btn-secondary btn-sm" onclick="viewLifecycle('${id}');closeModal()"><i class="fa fa-timeline"></i> Track</button>
          <button class="btn-secondary btn-sm" onclick="closeModal()">Done</button>
        </div>
      </div>
    </div>
  `);

  // Generate actual QR code
  setTimeout(() => {
    const el = document.getElementById(`qr-canvas-${id}`);
    if (el && typeof QRCode !== 'undefined') {
      new QRCode(el, { text: id, width: 100, height: 100, colorDark:'#000', colorLight:'#fff', correctLevel: QRCode.CorrectLevel.M });
    }
  }, 100);
}

function printQRFromModal() {
  showToast('Sent to print queue', 'success');
  closeModal();
}

function resetWasteForm() {
  document.getElementById('waste-form').reset();
  document.getElementById('seg-guide').style.display = 'none';
  setWasteFormDefaults();
}

function updateBadge(key, count) {
  const el = document.getElementById('badge-' + key);
  if (el) el.textContent = count;
}
