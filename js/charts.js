// ── CHARTS ───────────────────────────────────────────────────────────
const CHART_COLORS = {
  yellow: '#EF9F27', red: '#E24B4A', white: '#94a3b8', blue: '#378ADD',
  green: '#1D9E75', greenLight: 'rgba(29,158,117,0.15)',
  gridLine: 'rgba(148,163,184,0.15)',
  text: '#94a3b8',
};

function chartDefaults() {
  return {
    responsive: true, maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { backgroundColor: '#fff', titleColor: '#0f172a', bodyColor: '#475569', borderColor: '#e2e8f0', borderWidth: 1, padding: 10, cornerRadius: 8, titleFont: { weight: '600' } } },
    scales: {
      x: { grid: { color: CHART_COLORS.gridLine }, ticks: { color: CHART_COLORS.text, font: { size: 11 } } },
      y: { grid: { color: CHART_COLORS.gridLine }, ticks: { color: CHART_COLORS.text, font: { size: 11 } } }
    }
  };
}

// ── TREND CHART (DASHBOARD) ───────────────────────────────────────────
let trendChartInstance = null;
function initTrendChart() {
  const ctx = document.getElementById('trendChart');
  if (!ctx || trendChartInstance) return;
  const labels = ['Jun 4','Jun 5','Jun 6','Jun 7','Jun 8','Jun 9','Jun 10'];
  const datasets = [
    { label:'Yellow', data:[780,810,760,830,800,820,842],  borderColor:CHART_COLORS.yellow, backgroundColor:'rgba(239,159,39,0.08)', fill:true, tension:0.4, pointRadius:3, pointBackgroundColor:CHART_COLORS.yellow },
    { label:'Red',    data:[1050,1080,1020,1100,1090,1110,1124], borderColor:CHART_COLORS.red, backgroundColor:'rgba(226,75,74,0.08)', fill:true, tension:0.4, pointRadius:3, pointBackgroundColor:CHART_COLORS.red },
    { label:'White',  data:[420,440,410,450,470,460,487],  borderColor:CHART_COLORS.white, backgroundColor:'rgba(148,163,184,0.08)', fill:true, tension:0.4, pointRadius:3, pointBackgroundColor:CHART_COLORS.white },
    { label:'Blue',   data:[360,380,350,390,380,390,394],  borderColor:CHART_COLORS.blue, backgroundColor:'rgba(55,138,221,0.08)', fill:true, tension:0.4, pointRadius:3, pointBackgroundColor:CHART_COLORS.blue },
  ];
  trendChartInstance = new Chart(ctx, {
    type: 'line', data: { labels, datasets },
    options: { ...chartDefaults(), plugins: { ...chartDefaults().plugins, legend: { display: false } }, scales: { ...chartDefaults().scales, y: { ...chartDefaults().scales.y, ticks: { ...chartDefaults().scales.y.ticks, callback: v => v + ' kg' } } } }
  });
  // build legend
  const leg = document.getElementById('trend-legend');
  if (leg) leg.innerHTML = datasets.map(d => `<div class="legend-item"><div class="legend-dot" style="background:${d.borderColor}"></div>${d.label}</div>`).join('');
}

// ── PIE CHART ─────────────────────────────────────────────────────────
let catPieInstance = null;
function initCatPieChart() {
  const ctx = document.getElementById('catPieChart');
  if (!ctx || catPieInstance) return;
  catPieInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Yellow','Red','White','Blue'],
      datasets: [{ data:[842,1124,487,394], backgroundColor:[CHART_COLORS.yellow,CHART_COLORS.red,CHART_COLORS.white,CHART_COLORS.blue], borderWidth:0, hoverOffset:4 }]
    },
    options: { responsive:true, maintainAspectRatio:false, cutout:'65%', plugins: { legend:{ display:false }, tooltip:{ callbacks:{ label: ctx => ` ${ctx.label}: ${ctx.raw} kg` } } } }
  });
}

// ── ANALYTICS CHARTS ──────────────────────────────────────────────────
let analyticsInited = false;
function initAnalyticsCharts() {
  if (analyticsInited) return;
  analyticsInited = true;

  // Monthly chart
  const mCtx = document.getElementById('monthlyChart');
  if (mCtx) new Chart(mCtx, {
    type: 'bar',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun'],
      datasets: [
        { label:'Yellow', data:[24200,22800,25100,26300,27800,28420], backgroundColor:CHART_COLORS.yellow, borderRadius:3 },
        { label:'Red',    data:[32100,30500,33400,35200,36800,38210], backgroundColor:CHART_COLORS.red, borderRadius:3 },
        { label:'White',  data:[14500,13800,15200,16100,17200,17900], backgroundColor:CHART_COLORS.white, borderRadius:3 },
        { label:'Blue',   data:[11200,10800,11900,12600,13400,13800], backgroundColor:CHART_COLORS.blue, borderRadius:3 },
      ]
    },
    options: { ...chartDefaults(), plugins: { ...chartDefaults().plugins, legend: { display:true, labels:{ color:CHART_COLORS.text, font:{size:11} } } }, scales: { ...chartDefaults().scales, x:{ ...chartDefaults().scales.x, stacked:true }, y:{ ...chartDefaults().scales.y, stacked:true, ticks:{ ...chartDefaults().scales.y.ticks, callback:v=>v/1000+'T kg' } } } }
  });

  // Category donut
  const cCtx = document.getElementById('catDonutChart');
  if (cCtx) new Chart(cCtx, {
    type: 'doughnut',
    data: {
      labels: ['Yellow','Red','White','Blue'],
      datasets: [{ data:[29.6,39.5,17.1,13.8], backgroundColor:[CHART_COLORS.yellow,CHART_COLORS.red,CHART_COLORS.white,CHART_COLORS.blue], borderWidth:0, hoverOffset:6 }]
    },
    options: { responsive:true, maintainAspectRatio:false, cutout:'60%', plugins: { legend:{ display:true, position:'bottom', labels:{ color:CHART_COLORS.text, font:{size:11}, padding:12 } }, tooltip:{ callbacks:{ label:ctx=>` ${ctx.label}: ${ctx.raw}%` } } } }
  });

  // Forecast chart
  const fCtx = document.getElementById('forecastChart');
  if (fCtx) new Chart(fCtx, {
    type: 'line',
    data: {
      labels: ['Jun 10','Jun 11','Jun 12','Jun 13','Jun 14','Jun 15','Jun 16'],
      datasets: [
        { label:'Actual', data:[2847,null,null,null,null,null,null], borderColor:CHART_COLORS.green, borderWidth:2, pointRadius:4, pointBackgroundColor:CHART_COLORS.green },
        { label:'Forecast', data:[2847,2910,2875,3020,3150,2980,2890], borderColor:CHART_COLORS.green, borderDash:[6,4], backgroundColor:CHART_COLORS.greenLight, fill:true, borderWidth:2, pointRadius:3, pointBackgroundColor:'rgba(29,158,117,0.4)' }
      ]
    },
    options: { ...chartDefaults(), plugins:{ ...chartDefaults().plugins, legend:{ display:true, labels:{ color:CHART_COLORS.text, font:{size:11} } } }, scales:{ ...chartDefaults().scales, y:{ ...chartDefaults().scales.y, ticks:{ ...chartDefaults().scales.y.ticks, callback:v=>v+' kg' } } } }
  });
}

// ── COMPLIANCE CHART ──────────────────────────────────────────────────
let complianceChartInited = false;
function initComplianceChart() {
  if (complianceChartInited) return;
  complianceChartInited = true;
  const ctx = document.getElementById('complianceChart');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun'],
      datasets: [
        { label:'Platform Avg', data:[88.2,89.5,90.1,92.3,93.8,94.7], borderColor:CHART_COLORS.green, backgroundColor:'rgba(29,158,117,0.08)', fill:true, tension:0.4, borderWidth:2, pointRadius:4, pointBackgroundColor:CHART_COLORS.green },
        { label:'AIIMS Mumbai', data:[92.1,93.4,95.2,96.8,97.5,98.0], borderColor:CHART_COLORS.blue, borderDash:[4,3], tension:0.4, borderWidth:2, pointRadius:3 },
        { label:'AIIMS Delhi',  data:[81.5,79.2,77.8,76.5,75.9,76.0], borderColor:CHART_COLORS.red, borderDash:[4,3], tension:0.4, borderWidth:2, pointRadius:3 },
      ]
    },
    options: { ...chartDefaults(), plugins:{ ...chartDefaults().plugins, legend:{ display:true, labels:{ color:CHART_COLORS.text, font:{size:11} } } }, scales:{ ...chartDefaults().scales, y:{ ...chartDefaults().scales.y, min:70, max:100, ticks:{ ...chartDefaults().scales.y.ticks, callback:v=>v+'%' } } } }
  });
}

// ── CARBON CHART ──────────────────────────────────────────────────────
let carbonChartInited = false;
function initCarbonChart() {
  if (carbonChartInited) return;
  carbonChartInited = true;
  const ctx = document.getElementById('carbonChart');
  if (!ctx) return;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Jan','Feb','Mar','Apr','May','Jun'],
      datasets: [
        { label:'CO₂ Offset (Tonnes)', data:[8.2,9.1,10.4,11.2,11.8,12.4], backgroundColor:'rgba(29,158,117,0.7)', borderRadius:4, borderWidth:0 },
        { label:'Carbon Credits', data:[4.1,4.5,5.2,5.6,5.9,6.2], backgroundColor:'rgba(55,138,221,0.7)', borderRadius:4, borderWidth:0 },
      ]
    },
    options: { ...chartDefaults(), plugins:{ ...chartDefaults().plugins, legend:{ display:true, labels:{ color:CHART_COLORS.text, font:{size:11} } } } }
  });
}

// ── INIT DASHBOARD CHARTS ON LOAD ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => { initTrendChart(); initCatPieChart(); }, 200);
});
