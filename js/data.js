// ── ECOYANTRA DATA STORE ─────────────────────────────────────────────
// All platform data. In production this comes from the NestJS API.

const EY = {

  // ── WASTE RECORDS ──────────────────────────────────────────────────
  wasteRecords: [
    { id:'BMW-2026-06-08471', category:'YELLOW', dept:'ICU — Intensive Care Unit',    weight:2.4,  qty:1, by:'Nurse N. Patil',  status:'IN_TRANSIT',  date:'2026-06-10 06:14', location:'Storage A, Floor 3', remarks:'' },
    { id:'BMW-2026-06-08470', category:'RED',    dept:'Operation Theatre',            weight:1.8,  qty:2, by:'Staff #NS-224',   status:'COLLECTED',   date:'2026-06-10 05:55', location:'Storage B, Floor 2', remarks:'Post-surgical' },
    { id:'BMW-2026-06-08469', category:'WHITE',  dept:'Pathology Lab',                weight:0.6,  qty:3, by:'Dr. K. Singh',    status:'GENERATED',   date:'2026-06-10 08:30', location:'Lab Storage',        remarks:'Sharps container' },
    { id:'BMW-2026-06-08468', category:'BLUE',   dept:'Radiology',                    weight:1.2,  qty:1, by:'Staff #NS-189',   status:'GENERATED',   date:'2026-06-10 07:45', location:'Rad Storage',        remarks:'' },
    { id:'BMW-2026-06-08467', category:'RED',    dept:'Emergency',                    weight:3.1,  qty:4, by:'Nurse R. Gupta',  status:'STORED',      date:'2026-06-10 04:20', location:'Emergency Storage',  remarks:'High priority' },
    { id:'BMW-2026-06-08466', category:'YELLOW', dept:'Ward 7B',                      weight:1.5,  qty:2, by:'Nurse P. Rao',    status:'COLLECTED',   date:'2026-06-09 22:10', location:'Ward 7B Storage',    remarks:'' },
    { id:'BMW-2026-06-08465', category:'WHITE',  dept:'Operation Theatre',            weight:0.9,  qty:5, by:'Staff #NS-301',   status:'DISPOSED',    date:'2026-06-09 18:00', location:'OT Storage',         remarks:'' },
    { id:'BMW-2026-06-08464', category:'YELLOW', dept:'Maternity Ward',               weight:2.2,  qty:3, by:'Nurse S. Verma',  status:'IN_TRANSIT',  date:'2026-06-09 16:40', location:'Mat Storage',        remarks:'' },
    { id:'BMW-2026-06-08463', category:'RED',    dept:'ICU — Intensive Care Unit',    weight:1.7,  qty:2, by:'Staff #NS-411',   status:'STORED',      date:'2026-06-10 09:05', location:'ICU Storage',        remarks:'' },
    { id:'BMW-2026-06-08462', category:'BLUE',   dept:'Pathology Lab',                weight:0.8,  qty:4, by:'Dr. M. Nair',     status:'GENERATED',   date:'2026-06-10 09:22', location:'Lab Storage B',      remarks:'Glass vials' },
    { id:'BMW-2026-06-08461', category:'YELLOW', dept:'Emergency',                    weight:4.0,  qty:2, by:'Nurse T. Khanna', status:'COLLECTED',   date:'2026-06-10 08:50', location:'ER Storage',         remarks:'' },
    { id:'BMW-2026-06-08460', category:'RED',    dept:'Ward 7B',                      weight:2.0,  qty:2, by:'Nurse N. Patil',  status:'DISPOSED',    date:'2026-06-09 14:30', location:'Ward 7B Storage',    remarks:'' },
  ],

  disposedHistory: [
    { id:'BMW-2026-05-07901', category:'YELLOW', weight:3.2, disposedAt:'2026-05-30 14:22', cbwtf:'CBWTF Thane',    wdi:1.2, status:'DISPOSED' },
    { id:'BMW-2026-05-07855', category:'RED',    weight:2.1, disposedAt:'2026-05-29 11:10', cbwtf:'CBWTF Pune',     wdi:0.8, status:'DISPOSED' },
    { id:'BMW-2026-05-07800', category:'WHITE',  weight:0.7, disposedAt:'2026-05-28 09:45', cbwtf:'CBWTF Navi Mumbai', wdi:0.0, status:'DISPOSED' },
    { id:'BMW-2026-05-07750', category:'BLUE',   weight:1.1, disposedAt:'2026-05-27 16:30', cbwtf:'CBWTF Thane',    wdi:2.1, status:'DISPOSED' },
    { id:'BMW-2026-05-07700', category:'YELLOW', weight:2.8, disposedAt:'2026-05-26 13:00', cbwtf:'CBWTF Pune',     wdi:3.5, status:'DISPOSED' },
  ],

  // ── QR SCAN HISTORY ────────────────────────────────────────────────
  scanHistory: [
    { code:'BMW-2026-06-08471', category:'YELLOW', weight:'2.4 kg', by:'Staff #CS-112',  action:'COLLECTED', location:'Ward 7B, AIIMS Mumbai', time:'09:31' },
    { code:'BMW-2026-06-08469', category:'WHITE',  weight:'0.6 kg', by:'Dr. K. Singh',   action:'GENERATED', location:'Pathology Lab',         time:'08:30' },
    { code:'BMW-2026-06-08468', category:'BLUE',   weight:'1.2 kg', by:'Staff #NS-189',  action:'GENERATED', location:'Radiology',             time:'07:45' },
    { code:'BMW-2026-06-08465', category:'WHITE',  weight:'0.9 kg', by:'Staff #DI-021',  action:'DISPOSED',  location:'CBWTF Thane',           time:'06:15' },
    { code:'BMW-2026-06-08460', category:'RED',    weight:'2.0 kg', by:'Staff #DI-021',  action:'DISPOSED',  location:'CBWTF Thane',           time:'06:10' },
    { code:'BMW-2026-06-08471', category:'YELLOW', weight:'2.4 kg', by:'Nurse N. Patil', action:'GENERATED', location:'ICU, Floor 3',          time:'06:14' },
  ],

  // ── VEHICLES ──────────────────────────────────────────────────────
  vehicles: [
    { reg:'MH-04-Z-9921', driver:'Rajan Kumar',  route:'AIIMS → CBWTF Thane',         load:'420 kg', gps:'Off-route', eta:'10:45', status:'ALERT' },
    { reg:'MH-12-AB-4432',driver:'Suresh Pal',   route:'Apollo → CBWTF Pune',         load:'310 kg', gps:'On-route',  eta:'11:20', status:'OK' },
    { reg:'DL-8C-EF-0091', driver:'Mohit Singh', route:'Fortis Gurgaon → CBWTF Faridabad', load:'198 kg', gps:'On-route', eta:'10:55', status:'OK' },
    { reg:'KA-05-MN-7721', driver:'Rajesh Nair', route:'Manipal → CBWTF Bangalore',   load:'0 kg',   gps:'Base',      eta:'—',     status:'IDLE' },
    { reg:'MH-01-KK-3322', driver:'Amit Desai',  route:'Kokilaben → CBWTF Thane',     load:'264 kg', gps:'On-route',  eta:'11:50', status:'OK' },
    { reg:'TN-09-BC-8811', driver:'K. Sundaram', route:'Apollo Chennai → CBWTF Chennai', load:'185 kg', gps:'On-route', eta:'12:10', status:'OK' },
  ],

  // ── VIOLATIONS ────────────────────────────────────────────────────
  violations: [
    { id:'VIO-441', hospital:'AIIMS Delhi',    type:'MISSED_COLLECTION',   severity:'CRITICAL', detected:'10 Jun 09:00', status:'OPEN' },
    { id:'VIO-439', hospital:'Apollo Chennai', type:'SEGREGATION_ERROR',   severity:'CRITICAL', detected:'10 Jun 07:30', status:'OPEN' },
    { id:'VIO-437', hospital:'Fortis Gurugram',type:'WEIGHT_DISCREPANCY',  severity:'MEDIUM',   detected:'09 Jun 18:20', status:'REVIEW' },
    { id:'VIO-435', hospital:'AIIMS Mumbai',   type:'COMPLIANCE_DEADLINE', severity:'LOW',      detected:'09 Jun 12:00', status:'RESOLVED' },
    { id:'VIO-433', hospital:'Kokilaben Mumbai',type:'MISSED_COLLECTION',  severity:'HIGH',     detected:'08 Jun 15:00', status:'RESOLVED' },
  ],

  // ── AUDIT LOGS ────────────────────────────────────────────────────
  auditLogs: [
    { ts:'09:42:11', user:'Dr. R. Sharma',    role:'Compliance Officer', action:'EXPORT_CPCB_REPORT',  entity:'Jun 2026 Report',    ip:'10.0.1.42',  hash:'a3f4b2c1', status:'SUCCESS' },
    { ts:'09:38:04', user:'Staff #CS-112',    role:'Collection Staff',   action:'QR_SCAN_COLLECTED',   entity:'BMW-2026-06-08471',  ip:'10.0.2.18',  hash:'d7e2a591', status:'VERIFIED' },
    { ts:'09:31:55', user:'Nurse N. Patil',   role:'Waste Generator',    action:'CREATE_WASTE_RECORD', entity:'BMW-2026-06-08472',  ip:'10.0.1.77',  hash:'f1c8b340', status:'LOGGED' },
    { ts:'09:18:23', user:'Admin A. Mehta',   role:'Hospital Admin',     action:'UPDATE_USER_ROLE',    entity:'User #U-229',        ip:'10.0.1.5',   hash:'22ea7f91', status:'MODIFIED' },
    { ts:'08:55:12', user:'Driver #D-077',    role:'Transport Team',     action:'GPS_LOG_ENTRY',       entity:'MH-04-Z-9921',       ip:'172.16.0.9', hash:'bb4192c3', status:'SUCCESS' },
    { ts:'08:44:01', user:'System',           role:'AI Module',          action:'COMPLIANCE_ALERT',    entity:'VIO-441',            ip:'system',     hash:'9c3d8e12', status:'ALERT' },
    { ts:'08:32:09', user:'Nurse P. Rao',     role:'Waste Generator',    action:'CREATE_WASTE_RECORD', entity:'BMW-2026-06-08466',  ip:'10.0.1.88',  hash:'5a7f2b44', status:'LOGGED' },
    { ts:'08:20:44', user:'Staff #CS-095',    role:'Collection Staff',   action:'QR_SCAN_COLLECTED',   entity:'BMW-2026-06-08460',  ip:'10.0.2.22',  hash:'73cd1e90', status:'VERIFIED' },
    { ts:'08:10:33', user:'Dr. R. Sharma',    role:'Compliance Officer', action:'VIEW_AUDIT_TRAIL',    entity:'Audit Log #2026-06', ip:'10.0.1.42',  hash:'1bf8a221', status:'SUCCESS' },
    { ts:'07:58:17', user:'Admin A. Mehta',   role:'Hospital Admin',     action:'ONBOARD_DEPARTMENT',  entity:'Dept: Radiology',    ip:'10.0.1.5',   hash:'c0e34ab7', status:'SUCCESS' },
    { ts:'07:45:01', user:'Nurse R. Gupta',   role:'Waste Generator',    action:'CREATE_WASTE_RECORD', entity:'BMW-2026-06-08467',  ip:'10.0.1.91',  hash:'8f11d455', status:'LOGGED' },
    { ts:'07:30:55', user:'System',           role:'System',             action:'DAILY_WDI_CALC',      entity:'AIIMS Mumbai',       ip:'system',     hash:'2aa71bc8', status:'SUCCESS' },
  ],

  // ── HOSPITALS ─────────────────────────────────────────────────────
  hospitals: [
    { name:'AIIMS Mumbai',      city:'Mumbai',    state:'MH', beds:2400, depts:18, waste:'340 kg', compliance:98, expiry:'2027-03-15', status:'ACTIVE' },
    { name:'Fortis Gurugram',   city:'Gurugram',  state:'HR', beds:1200, depts:14, waste:'210 kg', compliance:96, expiry:'2027-06-01', status:'ACTIVE' },
    { name:'Apollo Chennai',    city:'Chennai',   state:'TN', beds:1800, depts:16, waste:'285 kg', compliance:91, expiry:'2026-12-20', status:'ALERT' },
    { name:'Kokilaben Mumbai',  city:'Mumbai',    state:'MH', beds:950,  depts:12, waste:'164 kg', compliance:88, expiry:'2027-09-10', status:'ACTIVE' },
    { name:'AIIMS Delhi',       city:'New Delhi', state:'DL', beds:3100, depts:22, waste:'490 kg', compliance:76, expiry:'2026-08-31', status:'CRITICAL' },
    { name:'Manipal Bangalore', city:'Bangalore', state:'KA', beds:800,  depts:10, waste:'138 kg', compliance:93, expiry:'2027-01-05', status:'ACTIVE' },
    { name:'Max Saket Delhi',   city:'New Delhi', state:'DL', beds:500,  depts:9,  waste:'95 kg',  compliance:89, expiry:'2027-04-22', status:'ACTIVE' },
  ],

  // ── USERS ─────────────────────────────────────────────────────────
  users: [
    { name:'Dr. R. Sharma',    email:'rsharma@aiims.com',    role:'Compliance Officer', hospital:'AIIMS Mumbai',  lastActive:'9 min ago',  mfa:true,  status:'ACTIVE' },
    { name:'Nurse N. Patil',   email:'npatil@aiims.com',     role:'Waste Generator',    hospital:'AIIMS Mumbai',  lastActive:'2 min ago',  mfa:true,  status:'ACTIVE' },
    { name:'Rajan Kumar',      email:'rajan@cbwtf.com',      role:'Transport Team',     hospital:'CBWTF Thane',   lastActive:'38 min ago', mfa:false, status:'ALERT' },
    { name:'Admin A. Mehta',   email:'amehta@apollo.com',    role:'Hospital Admin',     hospital:'Apollo Chennai',lastActive:'1h ago',     mfa:true,  status:'ACTIVE' },
    { name:'Staff #CS-112',    email:'cs112@aiims.com',      role:'Collection Staff',   hospital:'AIIMS Mumbai',  lastActive:'12 min ago', mfa:false, status:'ACTIVE' },
    { name:'Dr. K. Singh',     email:'ksingh@aiims.com',     role:'Department Manager', hospital:'AIIMS Mumbai',  lastActive:'3h ago',     mfa:true,  status:'ACTIVE' },
    { name:'Super Admin',      email:'admin@ecoyantra.com',  role:'Super Admin',        hospital:'All Hospitals', lastActive:'Just now',   mfa:true,  status:'ACTIVE' },
  ],

  // ── REPORTS ───────────────────────────────────────────────────────
  reports: [
    { name:'CPCB Monthly Report — Jun 2026',   type:'CPCB',   period:'Jun 2026', hospital:'AIIMS Mumbai',   generated:'10 Jun 09:42', size:'2.4 MB', status:'READY' },
    { name:'BMWM Manifest — May 2026',         type:'BMWM',   period:'May 2026', hospital:'All Hospitals',  generated:'01 Jun 08:00', size:'8.1 MB', status:'READY' },
    { name:'ESG Sustainability Report Q2 2026',type:'ESG',    period:'Q2 2026',  hospital:'AIIMS Mumbai',   generated:'01 Jun 07:30', size:'3.2 MB', status:'READY' },
    { name:'Audit Trail Export — May 2026',    type:'AUDIT',  period:'May 2026', hospital:'All Hospitals',  generated:'01 Jun 07:00', size:'1.1 MB', status:'READY' },
    { name:'CPCB Monthly Report — May 2026',   type:'CPCB',   period:'May 2026', hospital:'Apollo Chennai', generated:'01 Jun 06:55', size:'2.1 MB', status:'READY' },
    { name:'Violation Report Q2 2026',         type:'VIOLATIONS', period:'Q2 2026', hospital:'All Hospitals', generated:'30 May 10:00', size:'0.8 MB', status:'READY' },
  ],

  // ── NOTIFICATIONS ─────────────────────────────────────────────────
  notifications: [
    { type:'err',  icon:'fa-circle-exclamation', msg:'Ward 7B Yellow bin overflow — AIIMS Delhi',          time:'4 min ago',    read:false },
    { type:'err',  icon:'fa-clock',              msg:'Collection missed >4h — Apollo Chennai OT',          time:'1h 22m ago',   read:false },
    { type:'warn', icon:'fa-truck',              msg:'Vehicle MH-04-Z-9921 off-route detected',            time:'38 min ago',   read:false },
    { type:'info', icon:'fa-file-text',          msg:'Monthly CPCB report due in 2 days',                  time:'Scheduled',    read:false },
    { type:'warn', icon:'fa-triangle-exclamation',msg:'WDI exceeded 5% threshold — AIIMS Delhi',          time:'3h ago',       read:false },
    { type:'info', icon:'fa-leaf',               msg:'ESG Eco-Score updated: 82/100 (+5 pts)',             time:'Yesterday',    read:true  },
  ],

  // ── ALERTS FOR DASHBOARD ──────────────────────────────────────────
  alerts: [
    { type:'crit', icon:'fa-circle-exclamation', msg:'Ward 7B Yellow bin overflow — AIIMS Delhi',   time:'4 min ago' },
    { type:'crit', icon:'fa-clock',              msg:'Collection missed >4h — Apollo Chennai OT',   time:'1h 22m ago' },
    { type:'warn', icon:'fa-truck',              msg:'Vehicle MH-04-Z-9921 off-route',              time:'38 min ago' },
    { type:'info', icon:'fa-file-lines',         msg:'Monthly CPCB report due in 2 days',           time:'Scheduled' },
    { type:'warn', icon:'fa-triangle-exclamation',msg:'WDI >5% detected — AIIMS Delhi',           time:'3h ago' },
  ],

  // ── RANKINGS ─────────────────────────────────────────────────────
  rankings: [
    { rank:1, name:'AIIMS Mumbai',      score:98, color:'#1D9E75' },
    { rank:2, name:'Fortis Gurugram',   score:96, color:'#1D9E75' },
    { rank:3, name:'Apollo Chennai',    score:91, color:'#5DCAA5' },
    { rank:4, name:'Kokilaben Mumbai',  score:88, color:'#5DCAA5' },
    { rank:5, name:'AIIMS Delhi',       score:76, color:'#EF9F27' },
  ],

  // ── LIFECYCLE STAGES ──────────────────────────────────────────────
  lifecycleData: {
    'BMW-2026-06-08471': {
      code: 'BMW-2026-06-08471', category:'YELLOW', weight:'2.4 kg', dept:'ICU, AIIMS Mumbai',
      currentStage: 2, // 0-indexed
      stages: ['GENERATED','STORED','COLLECTED','IN_TRANSIT','RECEIVED','PROCESSING','DISPOSED'],
      events: [
        { ts:'09:31 IST', event:'Collection scan',  actor:'Staff #CS-112',   loc:'Ward 7B, AIIMS Mumbai', status:'VERIFIED' },
        { ts:'09:18 IST', event:'QR label printed', actor:'Nurse N. Patil',  loc:'Ward 7B Nursing Station', status:'DONE' },
        { ts:'06:14 IST', event:'Waste registered', actor:'Nurse N. Patil',  loc:'Ward 7B, AIIMS Mumbai', status:'LOGGED' },
      ]
    },
    'BMW-2026-06-08470': {
      code: 'BMW-2026-06-08470', category:'RED', weight:'1.8 kg', dept:'Operation Theatre, AIIMS Mumbai',
      currentStage: 1,
      stages: ['GENERATED','STORED','COLLECTED','IN_TRANSIT','RECEIVED','PROCESSING','DISPOSED'],
      events: [
        { ts:'05:55 IST', event:'Waste registered', actor:'Staff #NS-224',   loc:'OT, AIIMS Mumbai', status:'LOGGED' },
      ]
    }
  },
};
