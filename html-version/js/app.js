/**
 * HouseCalls Home Care - Standalone Vanilla JavaScript
 * NYS Licensed Home Care Services Agency (LHCSA)
 * Brooklyn, New York
 */

(function () {
  'use strict';

  // 1. CDPAP Calculator
  const cdpapSlider = document.getElementById('cdpapHoursSlider');
  const cdpapDisplay = document.getElementById('cdpapHoursVal');
  const weeklyPayDisplay = document.getElementById('cdpapWeeklyPay');
  const monthlyPayDisplay = document.getElementById('cdpapMonthlyPay');

  if (cdpapSlider && cdpapDisplay) {
    const hourlyRate = 21.09;
    const updateCalculator = () => {
      const hours = parseInt(cdpapSlider.value, 10);
      cdpapDisplay.textContent = hours + ' hrs/wk';
      const weekly = (hours * hourlyRate).toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      const monthly = (hours * hourlyRate * 4.33).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
      if (weeklyPayDisplay) weeklyPayDisplay.textContent = weekly;
      if (monthlyPayDisplay) monthlyPayDisplay.textContent = monthly;
    };
    cdpapSlider.addEventListener('input', updateCalculator);
    updateCalculator();
  }

  // 2. Booking Assessment Modal
  const bookingModal = document.getElementById('bookingModal');
  const bookingTriggers = document.querySelectorAll('.open-booking-modal');
  const modalCloseButtons = document.querySelectorAll('.close-modal-btn');

  bookingTriggers.forEach((btn) => {
    btn.addEventListener('click', () => {
      const serviceAttr = btn.getAttribute('data-service');
      const serviceSelect = document.getElementById('modalServiceSelect');
      if (serviceSelect && serviceAttr) {
        serviceSelect.value = serviceAttr;
      }
      if (bookingModal) bookingModal.classList.add('active');
    });
  });

  modalCloseButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const parentModal = btn.closest('.modal-overlay');
      if (parentModal) parentModal.classList.remove('active');
    });
  });

  // Close modals on overlay background click
  document.querySelectorAll('.modal-overlay').forEach((overlay) => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) overlay.classList.remove('active');
    });
  });

  // 3. Assessment Form Submission
  const bookingForm = document.getElementById('bookingForm');
  const bookingSuccess = document.getElementById('bookingSuccess');

  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fullName = document.getElementById('bookName')?.value;
      const phone = document.getElementById('bookPhone')?.value;
      const email = document.getElementById('bookEmail')?.value;

      if (!fullName || !phone || !email) {
        alert('Please complete all required fields.');
        return;
      }

      // Store in localStorage
      const existing = JSON.parse(localStorage.getItem('housecalls_consultations') || '[]');
      existing.unshift({
        id: 'req-' + Date.now(),
        fullName,
        phone,
        email,
        date: new Date().toISOString(),
      });
      localStorage.setItem('housecalls_consultations', JSON.stringify(existing));

      if (bookingSuccess) {
        bookingForm.style.display = 'none';
        bookingSuccess.style.display = 'block';
      }
    });
  }

  // 4. Care Program Finder Quiz
  let quizStep = 1;
  const quizAnswers = { medicaid: '', preference: '', level: '' };

  window.handleQuizChoice = function (key, value) {
    quizAnswers[key] = value;
    quizStep++;
    renderQuiz();
  };

  window.resetQuiz = function () {
    quizStep = 1;
    quizAnswers.medicaid = '';
    quizAnswers.preference = '';
    quizAnswers.level = '';
    renderQuiz();
  };

  function renderQuiz() {
    const step1 = document.getElementById('quizStep1');
    const step2 = document.getElementById('quizStep2');
    const step3 = document.getElementById('quizStep3');
    const stepResult = document.getElementById('quizResult');

    if (!step1 || !stepResult) return;

    step1.style.display = quizStep === 1 ? 'block' : 'none';
    if (step2) step2.style.display = quizStep === 2 ? 'block' : 'none';
    if (step3) step3.style.display = quizStep === 3 ? 'block' : 'none';
    stepResult.style.display = quizStep === 4 ? 'block' : 'none';

    if (quizStep === 4) {
      const recTitle = document.getElementById('quizRecTitle');
      const recDesc = document.getElementById('quizRecDesc');
      if (quizAnswers.preference === 'family' && quizAnswers.medicaid !== 'none') {
        recTitle.textContent = 'Consumer Directed Personal Assistance Program (CDPAP)';
        recDesc.textContent = 'Because you have a loved one or friend willing to provide care, CDPAP allows them to receive competitive hourly pay directly through HouseCalls as fiscal intermediary.';
      } else if (quizAnswers.level === 'nursing') {
        recTitle.textContent = 'Skilled Nursing & NHTD Medicaid Waiver';
        recDesc.textContent = 'Our Registered Nurses and waiver coordinators provide specialized clinical management and community living assistance.';
      } else {
        recTitle.textContent = 'Certified Home Health Aide (HHA / PCA)';
        recDesc.textContent = 'Our NYS certified, background-checked caregivers deliver personal bathing, dressing, meal prep, and bilingual companionship.';
      }
    }
  }

  // 5. Lightbox for Photo Gallery
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const galleryItems = document.querySelectorAll('.gallery-thumb');

  galleryItems.forEach((thumb) => {
    thumb.addEventListener('click', () => {
      const src = thumb.getAttribute('data-img');
      const caption = thumb.getAttribute('data-caption');
      if (lightboxImg && src) lightboxImg.src = src;
      if (lightboxCaption && caption) lightboxCaption.textContent = caption;
      if (lightboxModal) lightboxModal.classList.add('active');
    });
  });

  // 6. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavMenu = document.getElementById('mobileNavMenu');
  if (mobileMenuBtn && mobileNavMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isVisible = mobileNavMenu.style.display === 'block';
      mobileNavMenu.style.display = isVisible ? 'none' : 'block';
    });
  }

  // 7. Contact Form
  const contactForm = document.getElementById('contactForm');
  const contactSuccess = document.getElementById('contactSuccess');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      if (contactSuccess) {
        contactForm.style.display = 'none';
        contactSuccess.style.display = 'block';
      }
    });
  }

  // 8. Staff Portal Login (PIN: housecalls2026)
  const staffPortalModal = document.getElementById('staffPortalModal');
  const staffTriggers = document.querySelectorAll('.open-staff-portal');
  const staffLoginForm = document.getElementById('staffLoginForm');
  const staffDashboard = document.getElementById('staffDashboard');
  const staffPassInput = document.getElementById('staffPassInput');
  const staffInquiryList = document.getElementById('staffInquiryList');

  staffTriggers.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (staffPortalModal) staffPortalModal.classList.add('active');
    });
  });

  if (staffLoginForm) {
    staffLoginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const val = staffPassInput?.value;
      if (val === 'housecalls2026' || val === '718922' || val === 'admin') {
        staffLoginForm.style.display = 'none';
        if (staffDashboard) staffDashboard.style.display = 'block';
        renderStaffInquiries();
      } else {
        alert('Invalid passkey. Use housecalls2026');
      }
    });
  }

  function renderStaffInquiries() {
    if (!staffInquiryList) return;
    const items = JSON.parse(localStorage.getItem('housecalls_consultations') || '[]');
    if (items.length === 0) {
      staffInquiryList.innerHTML = '<p style="color:#64748B; font-size:0.8rem;">No inquiries recorded yet. Test submissions will appear here.</p>';
      return;
    }
    staffInquiryList.innerHTML = items
      .map(
        (i) =>
          `<div style="padding:0.75rem; border:1px solid #E2E8F0; border-radius:0.5rem; margin-bottom:0.5rem; font-size:0.75rem;">
          <strong>${i.fullName}</strong> - ${i.phone} (${i.email})<br>
          <span style="color:#64748B;">Date: ${new Date(i.date).toLocaleDateString()}</span>
        </div>`
      )
      .join('');
  }

  // Export CSV
  const exportCsvBtn = document.getElementById('exportCsvBtn');
  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', () => {
      const items = JSON.parse(localStorage.getItem('housecalls_consultations') || '[]');
      const csv = 'Name,Phone,Email,Date\n' + items.map((i) => `"${i.fullName}","${i.phone}","${i.email}","${i.date}"`).join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'housecalls_leads.csv';
      a.click();
    });
  }
})();
