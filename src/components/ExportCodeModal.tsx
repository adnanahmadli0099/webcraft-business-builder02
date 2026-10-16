import { useState } from 'react';
import { X, Copy, Check, Download, FileCode, ExternalLink, Code2 } from 'lucide-react';

interface ExportCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ExportCodeModal({ isOpen, onClose }: ExportCodeModalProps) {
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js'>('html');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const copyCurrentCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden relative max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#0A2540] text-white p-6 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Code2 className="w-4 h-4" />
            <span>Pure Static HTML5, CSS3 & Vanilla JavaScript</span>
          </div>
          <h3 className="text-xl font-bold">Download or Copy HTML, CSS & JavaScript Code</h3>
          <p className="text-xs text-slate-300 mt-1">
            Complete standalone files ready to host on cPanel, Apache, Nginx, GitHub Pages, or any shared hosting without Node.js or React!
          </p>

          {/* Action Row */}
          <div className="flex flex-wrap items-center gap-3 pt-4">
            <a
              href="/housecalls-html-css-js.zip"
              download="housecalls-homecare-html-css-js.zip"
              className="px-4 py-2 bg-[#00A3C4] hover:bg-[#008ba8] text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2 shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>Download Complete ZIP Package (9.8 MB)</span>
            </a>

            <a
              href="/html-version/index.html"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-2 border border-white/20"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Preview Pure HTML Site in New Tab</span>
            </a>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-slate-200 bg-slate-50 shrink-0">
          <div className="flex items-center gap-2">
            {[
              { id: 'html', label: 'index.html (HTML5 Structure)', path: 'html-version/index.html' },
              { id: 'css', label: 'css/style.css (Styling & Responsive)', path: 'html-version/css/style.css' },
              { id: 'js', label: 'js/app.js (Vanilla JavaScript)', path: 'html-version/js/app.js' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-[#0A2540] text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <FileCode className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              if (activeTab === 'html') copyCurrentCode(HTML_SNIPPET);
              if (activeTab === 'css') copyCurrentCode(CSS_SNIPPET);
              if (activeTab === 'js') copyCurrentCode(JS_SNIPPET);
            }}
            className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-1.5"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy Code'}</span>
          </button>
        </div>

        {/* Code Content */}
        <div className="p-6 overflow-y-auto flex-1 font-mono text-xs bg-slate-900 text-slate-200">
          <pre className="whitespace-pre-wrap leading-relaxed">
            {activeTab === 'html' && HTML_SNIPPET}
            {activeTab === 'css' && CSS_SNIPPET}
            {activeTab === 'js' && JS_SNIPPET}
          </pre>
        </div>
      </div>
    </div>
  );
}

const HTML_SNIPPET = `<!-- HouseCalls Home Care - Standalone index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HouseCalls Home Care | NY Licensed In-Home Health Agency</title>
  <meta name="description" content="NYS-licensed home care agency in Brooklyn, NY providing compassionate personal care, CDPAP, skilled nursing, and NHTD waiver services.">
  <link rel="icon" type="image/png" href="assets/cropped-favi-192x192.png">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <!-- Top Utility Bar -->
  <div class="top-utility-bar">
    <div class="container utility-container">
      <div class="utility-left">
        <span class="badge-lic">✓ NYS Department of Health Licensed LHCSA</span>
        <span>·</span>
        <span>Serving Brooklyn, Queens, Manhattan, Bronx & Staten Island</span>
      </div>
      <div class="utility-right">
        <a href="tel:17189229200">📞 Call Intake: (718) 922-9200</a>
      </div>
    </div>
  </div>

  <!-- Header -->
  <header class="main-header">
    <div class="container nav-container">
      <a href="#home" class="brand-logo">
        <img src="assets/logo-housecalls.svg" alt="HouseCalls Home Care">
      </a>
      <nav class="nav-links">
        <a href="#services">Services</a>
        <a href="#about">About Us</a>
        <a href="#cdpap">CDPAP Program</a>
        <a href="#gallery">Care Stories</a>
        <a href="#reviews">Reviews</a>
        <a href="#locations">Locations</a>
        <a href="#contact">Contact</a>
      </nav>
      <div class="nav-actions">
        <a href="https://wa.me/17189229200" class="btn-whatsapp-sm">WhatsApp Us</a>
        <button class="btn-primary-cta open-booking-modal">Request Free Assessment</button>
      </div>
    </div>
  </header>

  <!-- Hero Section -->
  <section id="home" class="hero-section">
    <div class="container hero-grid">
      <div>
        <div class="hero-tag">🛡️ NYS Regulated LHCSA · Founded 2010</div>
        <h1 class="hero-title">Quality Home Care for Your Loved One, <span>Right at Home.</span></h1>
        <p class="hero-desc">Certified Home Health Aides, CDPAP paid family caregiving, skilled nursing and waiver diversion across NYC.</p>
        <div class="hero-actions">
          <button class="btn-primary-cta open-booking-modal">Request Free Assessment</button>
          <a href="tel:17189229200" class="btn-call-outline">📞 Call: (718) 922-9200</a>
        </div>
      </div>
      <div class="hero-visual">
        <div class="hero-img-box">
          <img src="assets/20762.jpg" alt="HouseCalls Caregiver">
        </div>
      </div>
    </div>
  </section>

  <!-- Interactive CDPAP Calculator -->
  <section id="cdpap" class="container">
    <div class="calc-box">
      <div class="calc-grid">
        <div>
          <h3>CDPAP Caregiver Pay Calculator</h3>
          <p>Children, relatives, and friends can be hired and paid directly to care for family members under NY Medicaid.</p>
          <div class="slider-container">
            <span id="cdpapHoursVal">30 hrs/wk</span>
            <input type="range" id="cdpapHoursSlider" min="10" max="56" value="30">
          </div>
        </div>
        <div class="calc-result-card">
          <p>Estimated Weekly Pay</p>
          <div id="cdpapWeeklyPay" class="calc-big-num">$632.70</div>
          <button class="btn-primary-cta open-booking-modal">Enroll in CDPAP →</button>
        </div>
      </div>
    </div>
  </section>

  <!-- App Script -->
  <script src="js/app.js"></script>
</body>
</html>`;

const CSS_SNIPPET = `/* HouseCalls Home Care - css/style.css */
:root {
  --primary-navy: #0A2540;
  --secondary-navy: #0F2D59;
  --accent-cyan: #00A3C4;
  --text-main: #1E293B;
  --bg-light: #F8FAFC;
}
* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; background: var(--bg-light); color: var(--text-main); }
.container { max-width: 1240px; margin: 0 auto; padding: 0 1.25rem; }
.btn-primary-cta { background: var(--accent-cyan); color: #fff; padding: 0.65rem 1.25rem; border-radius: 0.5rem; font-weight: 600; cursor: pointer; }
.btn-primary-cta:hover { background: #008ba8; }
.calc-box { background: linear-gradient(135deg, #0A2540, #0F2D59); color: #fff; border-radius: 1.5rem; padding: 2.5rem; }
.calc-big-num { font-size: 2.5rem; font-weight: 800; color: #38BDF8; }
/* ... (See html-version/css/style.css for complete stylesheet) ... */`;

const JS_SNIPPET = `// HouseCalls Home Care - js/app.js
(function () {
  'use strict';
  // CDPAP Calculator
  const slider = document.getElementById('cdpapHoursSlider');
  const hoursVal = document.getElementById('cdpapHoursVal');
  const weeklyVal = document.getElementById('cdpapWeeklyPay');
  if (slider && hoursVal) {
    slider.addEventListener('input', () => {
      const h = parseInt(slider.value, 10);
      hoursVal.textContent = h + ' hrs/wk';
      if (weeklyVal) weeklyVal.textContent = (h * 21.09).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    });
  }
  // Modal handlers
  document.querySelectorAll('.open-booking-modal').forEach(b => {
    b.addEventListener('click', () => document.getElementById('bookingModal')?.classList.add('active'));
  });
  document.querySelectorAll('.close-modal-btn').forEach(b => {
    b.addEventListener('click', () => b.closest('.modal-overlay')?.classList.remove('active'));
  });
})();`;
