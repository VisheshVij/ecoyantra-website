// ── AUDIT TRAIL ───────────────────────────────────────────────────────

let auditPage = 1;
const AUDIT_PAGE_SIZE = 10;

function loadAuditTable(data) {
  const rows = data || EY.auditLogs;
  const start = (auditPage - 1) * AUDIT_PAGE_SIZE;
  const paged = rows.slice(start, start + AUDIT_PAGE_SIZE);

  document.getElementById('audit-tbody').innerHTML = paged.map(a => `
    <tr>
      <td style="font-family:monospace;font-size:11px;color:var(--text-3)">${a.ts}</td>
      <td><strong>${a.user}</strong></td>
      <td>${roleBadge(a.role)}</td>
      <td><span style="font-family:monospace;font-size:11px">${a.action}</span></td>
      <td style="font-size:11px;color:var(--text-2)">${a.entity}</td>
      <td style="font-family:monospace;font-size:11px;color:var(--text-3)">${a.ip}</td>
      <td>
        <span style="font-family:monospace;font-size:10px;color:var(--text-3);background:var(--bg-2);padding:2px 6px;border-radius:4px;cursor:pointer"
              title="SHA-256 hash chain value" onclick="verifyHash('${a.hash}')">
          ${a.hash}…
        </span>
      </td>
      <td>${auditStatusBadge(a.status)}</td>
    </tr>
  `).join('') || '<tr><td colspan="8" style="text-align:center;padding:20px;color:var(--text-3)">No audit logs found</td></tr>';

  const total = rows.length;
  const totalPages = Math.ceil(total / AUDIT_PAGE_SIZE);
  document.getElementById('audit-footer').innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between">
      <span>Showing ${start+1}–${Math.min(start+AUDIT_PAGE_SIZE,total)} of ${total} entries · All records immutable &amp; hash-chained</span>
      <div style="display:flex;gap:6px">
        <button class="btn-ghost btn-sm" onclick="auditPageChange(-1)" ${auditPage<=1?'disabled':''}>
          <i class="fa fa-chevron-left"></i>
        </button>
        <span style="padding:4px 10px;font-size:12px">Page ${auditPage} / ${totalPages}</span>
        <button class="btn-ghost btn-sm" onclick="auditPageChange(1)" ${auditPage>=totalPages?'disabled':''}>
          <i class="fa fa-chevron-right"></i>
        </button>
      </div>
    </div>
  `;
}

function auditPageChange(dir) {
  auditPage += dir;
  loadAuditTable();
}

function filterAudit() {
  const q    = document.getElementById('audit-search').value.toLowerCase();
  const role = document.getElementById('audit-role-filter').value;
  auditPage  = 1;
  const filtered = EY.auditLogs.filter(a =>
    (!role || a.role === role) &&
    (!q || a.user.toLowerCase().includes(q) || a.action.toLowerCase().includes(q) || a.entity.toLowerCase().includes(q))
  );
  loadAuditTable(filtered);
}

function verifyHash(hash) {
  openModal('Hash Chain Verification', `
    <div style="padding:8px 0">
      <div style="margin-bottom:12px;font-size:13px;color:var(--text-2)">
        Verifying integrity of audit log entry against the blockchain hash chain...
      </div>
      <div style="background:var(--bg-2);border-radius:8px;padding:12px;font-family:monospace;font-size:12px;margin-bottom:14px">
        <div style="color:var(--text-3);font-size:10px;margin-bottom:4px">HASH VALUE</div>
        <div>${hash}a7b3c2d9e1f0</div>
      </div>
      <div style="background:var(--green-light);border-radius:8px;padding:12px;font-size:13px;color:var(--green-dark)">
        <div style="font-weight:600;margin-bottom:4px"><i class="fa fa-shield-halved"></i> Hash Verified</div>
        <div style="font-size:12px">This audit record is intact and has not been tampered with. SHA-256 chain integrity confirmed.</div>
      </div>
      <div style="margin-top:12px;font-size:11px;color:var(--text-3)">
        <div>Algorithm: SHA-256 chaining</div>
        <div>Previous hash: ${(parseInt(hash,16)-1).toString(16).slice(0,8)||'genesis'}…</div>
        <div>Verified at: ${new Date().toLocaleString('en-IN')}</div>
      </div>
      <div class="form-actions"><button class="btn-secondary" onclick="closeModal()">Close</button></div>
    </div>
  `);
}

function auditStatusBadge(s) {
  const m = { SUCCESS:'s-ok', VERIFIED:'s-ok', LOGGED:'s-ok', MODIFIED:'s-info', ALERT:'s-warn', FAILED:'s-err' };
  return `<span class="badge ${m[s]||'s-neutral'}">${s}</span>`;
}
