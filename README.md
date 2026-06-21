# EcoYantra — AI-Powered Biomedical Waste Tracking & Compliance Platform

> "Healing the Planet, One Byte at a Time."
> BMW Rules 2016 Compliant · CPCB API Ready · Blockchain Audit Trail

---

## 🚀 Quick Start (3 steps)

### Option 1 — Node.js server (recommended)
```bash
# 1. Make sure Node.js is installed (any version ≥ 14)
node -v

# 2. Run the server from this folder
node server.js

# 3. Open browser
http://localhost:8080
```

### Option 2 — Python server
```bash
# Python 3
python3 -m http.server 8080

# Python 2
python -m SimpleHTTPServer 8080

# Then open: http://localhost:8080
```

### Option 3 — VS Code Live Server
- Install the "Live Server" extension in VS Code
- Right-click `index.html` → "Open with Live Server"

### Option 4 — Direct file (limited)
- Open `index.html` directly in your browser
- Some features (camera QR scanning) require a server due to browser security

---

## 🔑 Demo Login

On the login page, click **"Demo Access"** tab and choose any role:

| Role | Description |
|---|---|
| Super Admin | Full platform access — all hospitals, all data |
| Hospital Admin | AIIMS Mumbai — hospital-level management |
| Compliance Officer | CPCB reports, audit trail, violations |
| Ward Nurse | Waste registration & QR generation |

Or use the **Sign In** tab with any email/password (demo accepts all credentials).

---

## 📁 File Structure

```
ecoyantra/
├── index.html          ← Login page
├── dashboard.html      ← Main platform (all modules)
├── server.js           ← Local dev server (Node.js)
│
├── css/
│   ├── main.css        ← Global styles, components, utilities
│   ├── auth.css        ← Login page styles
│   └── dashboard.css   ← Sidebar, topbar, layout styles
│
└── js/
    ├── data.js         ← All mock data (waste records, hospitals, users...)
    ├── app.js          ← Navigation, tables, modals, toasts, utilities
    ├── charts.js       ← Chart.js chart initializers
    ├── waste.js        ← Waste registration form & QR modal
    ├── qr.js           ← QR scanner, lookup, label generation
    ├── compliance.js   ← Report generation with progress animation
    └── audit.js        ← Audit trail table, pagination, hash verification
```

---

## 🖥️ Platform Modules

| Module | What you can do |
|---|---|
| **Dashboard** | KPI cards, waste trend chart, category pie, alerts, hospital rankings |
| **Waste Registry** | Create waste records, view active/history, filter, export CSV |
| **QR Management** | Manual QR lookup, generate printable labels, scan history |
| **Lifecycle Tracking** | Track any waste code through 7 stages with event history |
| **Transport & GPS** | Fleet status, vehicle details, route monitoring |
| **Compliance Center** | Violations log, report generation (PDF/Excel/CSV/ESG), CPCB push |
| **Audit Trail** | Immutable paginated log, hash verification, role filtering |
| **Reports** | Full report listing with download simulation |
| **Hospitals** | Onboarded facilities, compliance scores, add/view hospitals |
| **Users & RBAC** | User management, role assignment, MFA status |
| **Analytics** | Monthly charts, forecasting, AI prediction |
| **ESG & Carbon** | Eco-Score, carbon offset, NABH points, sustainability breakdown |

---

## 🎯 Key Interactions to Try

1. **Register waste** → Dashboard → New Record button (or Waste Registry → New Record tab)
   - Select category → see segregation guidance appear
   - Submit → QR label modal with real QR code generated

2. **Look up a QR code** → QR Management → type `BMW-2026-06-08471` → Verify

3. **Track lifecycle** → Lifecycle Tracking → type `BMW-2026-06-08471` → Track

4. **Generate a report** → Compliance Center → click any report button → watch progress bar

5. **Verify audit hash** → Audit Trail → click any hash value → verification modal

6. **Export CSV** → Waste Registry → Active Records tab → Export CSV

---

## 🏗️ Production Stack (for real deployment)

See the full **EcoYantra_Technical_Architecture.md** document for:
- Next.js 15 + NestJS + PostgreSQL + Prisma full stack
- Complete Prisma database schema
- All REST API endpoints with request/response examples
- GitHub Actions CI/CD pipeline
- Docker + AWS ECS deployment guide
- Monitoring (Grafana + Prometheus + ELK)

---

## ⚙️ Configuration

To enable live Mapbox GPS tracking, open `js/app.js` and add your key:
```js
const MAPBOX_TOKEN = 'pk.eyJ1...your-token-here';
```

To enable real AI waste classification via Claude API, the backend NestJS service
calls the Anthropic API — see Technical Architecture document for the integration code.

---

## 📋 Compliance Notes

This platform is designed for:
- **BMW Rules 2016** (Biomedical Waste Management Rules, India)
- **CPCB CMS API** integration (daily data push)
- **State SPCB** monthly manifest submission
- **NABH** hospital accreditation tracking
- **WDI** (Waste Discrepancy Index) monitoring — target < 5%

---

*EcoYantra · Designed by TIET Innovators · contact@ecoyantra.com*
