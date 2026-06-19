// Study Circle Academy — JS Logic Engine
// Dynamic single-page routing, floating particle canvas simulation, countdown clocks,
// filters for results/courses/gallery/resources, form validations and WhatsApp redirections,
// FAQ accordions, expand-collapse speed dial FAB, and ACF admin settings simulation.

// ----------------------------------------------------
// 1. Data Stores (Dynamically editable via admin panel)
// ----------------------------------------------------
let appState = {
  isAdmissionOpen: true,
  countdownTarget: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
  notices: [
    "🎉 Admission Open for Session 2025–26",
    "📝 Free Demo Class — Register Now",
    "🏆 Our student Priya Sharma scored 98% in Board Exams!",
    "📚 New batch for Class 11 Non-Medical starting 1st July",
    "📄 Weekly PDF notes now available in Resources section"
  ],
  resources: [
    { id: 1, type: 'notes', title: 'Physics Chapter 1 — Motion Notes', meta: 'Class 9 • Science', date: '18th June 2026' },
    { id: 2, type: 'notes', title: 'Accounts Journal & Ledger Sheets', meta: 'Class 11 • Commerce', date: '15th June 2026' },
    { id: 3, type: 'assignments', title: 'Organic Chemistry Weekly Sheet', meta: 'Class 12 • Chemistry', date: '12th June 2026' },
    { id: 4, type: 'assignments', title: 'Matrices & Determinants Board practice', meta: 'Class 12 • Maths', date: '10th June 2026' },
    { id: 5, type: 'samples', title: 'CBSE Physics Class 12 Sample Paper', meta: 'Class 12 • CBSE Board', date: '08th June 2026' },
    { id: 6, type: 'samples', title: 'Commerce Economics Model Paper 2026', meta: 'Class 12 • Board', date: '05th June 2026' },
    { id: 7, type: 'pdfs', title: 'Weekly Biology Diagram Practice PDF', meta: 'Class 11 • Medical', date: '01th June 2026' },
    { id: 8, type: 'pdfs', title: 'SST History Map Pointers PDF', meta: 'Class 10 • General', date: '28th May 2026' }
  ],
  gallery: [
    { category: 'classrooms', title: 'Smart Study Classroom', desc: 'Equipped with modern visual whiteboard setups', image: '/classroom_smart.png' },
    { category: 'classrooms', title: 'Physics Laboratory Class', desc: 'Doing hands-on organic and mechanics builds', image: '/lab_science.png' },
    { category: 'events', title: 'Annual Session Orientation', desc: 'Inducting parents and students into batch schedules', image: '/seminar_event.png' },
    { category: 'events', title: 'Student Career Mentorship Workshop', desc: 'Experienced guidance panels for future pathways', image: '/seminar_event.png' },
    { category: 'achievements', title: 'Board Toppers Ceremony', desc: 'Celebrating Priya, Rahul and distinction holders', image: '/classroom_smart.png' },
    { category: 'achievements', title: 'Weekly Test Reward Distribution', desc: 'Acknowledging highest subject scores of the week', image: '/academy_about.png' },
    { category: 'activities', title: 'Mental Wellness & Focus Seminar', desc: 'Scientific relaxation habits during examination phases', image: '/seminar_event.png' },
    { category: 'activities', title: 'Ludhiana Inter-School Science Exhibit', desc: 'Academy students presenting mechanical models', image: '/lab_science.png' }
  ]
};

// ----------------------------------------------------
// 2. Initialize Routing & Views
// ----------------------------------------------------
function handleRoute() {
  const hash = window.location.hash || '#home';
  const pageId = hash.substring(1);

  // Deactivate all nav links
  document.querySelectorAll('.nav-links a, .footer-links a').forEach(el => {
    if (el.getAttribute('data-page') === pageId) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });

  // Display targeted page block
  const views = ['home', 'about', 'courses', 'results', 'resources', 'gallery', 'contact'];
  views.forEach(view => {
    const pageEl = document.getElementById(`${view}Page`);
    if (pageEl) {
      if (view === pageId) {
        pageEl.classList.add('active-page');
        window.scrollTo(0, 0);
      } else {
        pageEl.classList.remove('active-page');
      }
    }
  });

  // Smooth mobile drawer close
  document.getElementById('navLinks').classList.remove('active');
}

window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', () => {
  handleRoute();
  initTicker();
  initCountdown();
  initCounters();
  initHeroCanvas();
  renderResources('notes');
  renderGallery('all');
  initHeaderScroll();
  checkAdminAccess();
});

// Mobile Hamburger Toggle
document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('active');
});

// Footer / Link Navigations Hash Handler
document.body.addEventListener('click', (e) => {
  if (e.target.classList.contains('footer-nav-link') || e.target.classList.contains('to-contact-page')) {
    const page = e.target.getAttribute('data-page') || 'contact';
    window.location.hash = `#${page}`;
  }
});

// ----------------------------------------------------
// 3. Floating Hero Particles & Twinkling Stars DOM Engine
// ----------------------------------------------------
function initHeroCanvas() {
  const container = document.getElementById('animation-bg');
  if (!container) return;

  container.innerHTML = ''; // Clear previous elements

  // Floating symbols database
  const symbols = [
    '📚', '🎓', '🧪', '📐',
    '∑', '∫', 'π', '√', 'Δ', '∞', '⚛', '✎', '★', '✦', '÷', '×', 'α', 'β', 'λ',
    '∑', '∫', 'π', '√', 'Δ', '∞', '⚛', '✎', '★', '✦', '÷', '×'
  ];

  // 1. Generate 35 Floating Study Elements
  for (let i = 0; i < 35; i++) {
    const el = document.createElement('span');
    el.classList.add('floating-icon');
    el.innerText = symbols[Math.floor(Math.random() * symbols.length)];
    
    const size = Math.random() * 28 + 16; // 16px to 44px
    const opacity = Math.random() * 0.27 + 0.08; // 0.08 to 0.35
    const duration = Math.random() * 37 + 18; // 18s to 55s
    const delay = Math.random() * 40; // 0s to 40s
    const color = Math.random() > 0.5 ? '#FFFFFF' : '#F59E0B'; // White or Gold

    el.style.cssText = `
      left: ${Math.random() * 100}%;
      bottom: -60px;
      font-size: ${size}px;
      opacity: ${opacity};
      color: ${color};
      animation: floatUp ${duration}s linear ${delay}s infinite, driftSide ${Math.random() * 6 + 6}s ease-in-out infinite;
    `;
    container.appendChild(el);
  }

  // 2. Generate 20 Twinkling Tiny Star Dots
  for (let j = 0; j < 20; j++) {
    const dot = document.createElement('div');
    dot.classList.add('twinkle-dot');
    
    const size = Math.random() * 2 + 2; // 2px to 4px
    const duration = Math.random() * 3 + 2; // 2s to 5s
    const delay = Math.random() * 5;

    dot.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      width: ${size}px;
      height: ${size}px;
      animation: twinkle ${duration}s ease-in-out ${delay}s infinite;
    `;
    container.appendChild(dot);
  }
}


// ----------------------------------------------------
// 4. Notice Board Ticker Ticker Controller
// ----------------------------------------------------
function initTicker() {
  const tickerContent = document.getElementById('tickerContent');
  if (!tickerContent) return;

  tickerContent.innerHTML = '';
  
  let formattedList = [...appState.notices];
  if (appState.isAdmissionOpen) {
    formattedList.unshift("🔥 ADMISSION OPEN FOR SESSION 2025–26 — SUBMIT ENQUIRY NOW!");
  }
  
  formattedList.forEach(notice => {
    const item = document.createElement('span');
    item.className = 'ticker-item';
    item.innerText = notice;
    tickerContent.appendChild(item);
  });
}

// ----------------------------------------------------
// 5. Next Batch Countdown Timer (30-day target)
// ----------------------------------------------------
let countdownInterval;
function initCountdown() {
  const daysNum = document.getElementById('daysNum');
  const hoursNum = document.getElementById('hoursNum');
  const minsNum = document.getElementById('minsNum');
  const secsNum = document.getElementById('secsNum');
  
  if (!daysNum) return;

  if (countdownInterval) clearInterval(countdownInterval);

  function updateClock() {
    const t = Date.parse(appState.countdownTarget) - Date.parse(new Date());
    if (t >= 0) {
      const seconds = Math.floor((t / 1000) % 60);
      const minutes = Math.floor((t / 1000 / 60) % 60);
      const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      const days = Math.floor(t / (1000 * 60 * 60 * 24));
      
      daysNum.innerText = days < 10 ? '0' + days : days;
      hoursNum.innerText = hours < 10 ? '0' + hours : hours;
      minsNum.innerText = minutes < 10 ? '0' + minutes : minutes;
      secsNum.innerText = seconds < 10 ? '0' + seconds : seconds;
    } else {
      // Countdown ended fallback
      daysNum.innerText = '00';
      hoursNum.innerText = '00';
      minsNum.innerText = '00';
      secsNum.innerText = '00';
    }
  }

  updateClock();
  countdownInterval = setInterval(updateClock, 1000);
}

// ----------------------------------------------------
// 6. Scroll Count-up Animation
// ----------------------------------------------------
function initCounters() {
  const stats = document.querySelectorAll('.stat-num');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetVal = parseInt(target.getAttribute('data-target') || '0');
        if (targetVal === 0) return; // For static percentage results which do not need intersection increments
        
        let current = 0;
        const duration = 2000; // 2s
        const steps = 50;
        const stepTime = duration / steps;
        const increment = Math.ceil(targetVal / steps);

        const counterInterval = setInterval(() => {
          current += increment;
          if (current >= targetVal) {
            target.innerText = targetVal + (targetVal === 500 ? '+' : (targetVal === 98 ? '%' : (targetVal === 10 ? '+' : '+')));
            clearInterval(counterInterval);
          } else {
            target.innerText = current;
          }
        }, stepTime);
        
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });

  stats.forEach(stat => observer.observe(stat));
}

// ----------------------------------------------------
// 7. Filters & Render Lists
// ----------------------------------------------------

// Course Filters
const courseFilters = document.querySelectorAll('#courseFilterContainer .tab-btn');
courseFilters.forEach(btn => {
  btn.addEventListener('click', (e) => {
    courseFilters.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    
    const filter = e.target.getAttribute('data-filter');
    document.querySelectorAll('#coursesList .course-card').forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Toppers Showcase Filters
const resultsFilters = document.querySelectorAll('#resultsFilterContainer .tab-btn');
resultsFilters.forEach(btn => {
  btn.addEventListener('click', (e) => {
    resultsFilters.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    
    const year = e.target.getAttribute('data-year');
    document.querySelectorAll('#toppersContainer .topper-card').forEach(card => {
      if (year === 'all' || card.getAttribute('data-year') === year) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});

// Testimonials Carousel
let testimonialIndex = 0;
const track = document.getElementById('testimonialTrack');
const prevBtn = document.getElementById('prevTestimonial');
const nextBtn = document.getElementById('nextTestimonial');

function updateTestimonialSlide() {
  if (!track) return;
  const slideCount = document.querySelectorAll('.testimonial-slide').length;
  track.style.transform = `translateX(-${testimonialIndex * 100}%)`;
}

if (prevBtn && nextBtn) {
  prevBtn.addEventListener('click', () => {
    testimonialIndex = testimonialIndex > 0 ? testimonialIndex - 1 : 2;
    updateTestimonialSlide();
  });
  nextBtn.addEventListener('click', () => {
    testimonialIndex = testimonialIndex < 2 ? testimonialIndex + 1 : 0;
    updateTestimonialSlide();
  });
}

// Render Resources
function renderResources(selectedCat) {
  const grid = document.getElementById('resourcesGrid');
  if (!grid) return;

  grid.innerHTML = '';
  const filtered = appState.resources.filter(r => r.type === selectedCat);
  
  filtered.forEach(res => {
    const card = document.createElement('div');
    card.className = 'resource-card';
    card.innerHTML = `
      <div class="resource-type-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
      </div>
      <h3>${res.title}</h3>
      <p class="text-muted" style="margin-bottom: 24px; font-family: var(--font-label); font-weight:600; font-size:12px;">${res.meta}</p>
      <div class="resource-meta">
        <span>Uploaded: ${res.date}</span>
        <button class="btn btn-outline-blue download-btn" data-title="${res.title}" style="padding: 6px 12px; font-size: 13px;">Download PDF</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

const resourceBtns = document.querySelectorAll('#resourceTabs .tab-btn');
resourceBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    resourceBtns.forEach(b => b.classList.remove('active'));
    // Handle inner elements
    const button = e.target.closest('.tab-btn');
    button.classList.add('active');
    renderResources(button.getAttribute('data-res'));
  });
});

// Simulated file download click triggers Enquiry Form Modal
document.body.addEventListener('click', (e) => {
  if (e.target.classList.contains('download-btn')) {
    const title = e.target.getAttribute('data-title');
    document.getElementById('mMessage').value = `Please provide the download link and password for resource: "${title}"`;
    document.getElementById('enquiryModal').classList.add('active');
  }
});

// Render Gallery Elements
function renderGallery(filterVal) {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  grid.innerHTML = '';
  appState.gallery.forEach(item => {
    if (filterVal === 'all' || item.category === filterVal) {
      const card = document.createElement('div');
      card.className = 'gallery-card';
      card.setAttribute('data-category', item.category);
      card.setAttribute('data-title', item.title);
      card.setAttribute('data-image', item.image);
      card.innerHTML = `
        <img class="gallery-img" src="${item.image}" alt="${item.title}" />
        <div class="gallery-overlay">
          <div class="gallery-info">
            <h4>${item.title}</h4>
            <span>${item.category.toUpperCase()}</span>
          </div>
        </div>
      `;
      grid.appendChild(card);
    }
  });
}

const galleryBtns = document.querySelectorAll('#galleryTabs .tab-btn');
galleryBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    galleryBtns.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');
    renderGallery(e.target.getAttribute('data-gal'));
  });
});

// Lightbox controller for Gallery items
const lightbox = document.getElementById('galleryLightbox');
const lightboxImg = document.getElementById('lightboxImage');
const lightboxTitle = document.getElementById('lightboxTitle');
const lightboxClose = document.getElementById('lightboxClose');

document.body.addEventListener('click', (e) => {
  const card = e.target.closest('.gallery-card');
  if (card) {
    const title = card.getAttribute('data-title');
    const category = card.getAttribute('data-category');
    const imageUrl = card.getAttribute('data-image');
    lightboxTitle.innerText = `${title} (${category.toUpperCase()})`;
    lightboxImg.innerHTML = `<img src="${imageUrl}" alt="${title}" style="max-width:100%; max-height:80vh; border-radius:8px;" />`;
    lightbox.style.display = 'flex';
  }
});

if (lightboxClose) {
  lightboxClose.addEventListener('click', () => {
    lightbox.style.display = 'none';
  });
}

// ----------------------------------------------------
// 8. FAQ Accordion Controls
// ----------------------------------------------------
const faqHeaders = document.querySelectorAll('.faq-header');
faqHeaders.forEach(header => {
  header.addEventListener('click', () => {
    const item = header.parentElement;
    const isActive = item.classList.contains('active');
    
    // Close other FAQ items
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
    
    if (!isActive) {
      item.classList.add('active');
    }
  });
});

// ----------------------------------------------------
// 9. Floating Action Speed Dial Stack (FAB)
// ----------------------------------------------------
const fabMain = document.getElementById('fabMainBtn');
const fabList = document.getElementById('fabList');
if (fabMain) {
  fabMain.addEventListener('click', () => {
    fabList.classList.toggle('active');
    fabMain.style.transform = fabList.classList.contains('active') ? 'rotate(45deg)' : 'rotate(0deg)';
  });
}

// ----------------------------------------------------
// 10. Forms Validation & WhatsApp Redirect Trigger (CF7 API emulation)
// ----------------------------------------------------
function formatWhatsAppText(data) {
  let text = `*New Study Circle Academy Enquiry*\n\n`;
  for (const key in data) {
    text += `• *${key}*: ${data[key]}\n`;
  }
  return encodeURIComponent(text);
}

// Modal enquiry trigger
const modalOverlay = document.getElementById('enquiryModal');
document.body.addEventListener('click', (e) => {
  if (e.target.classList.contains('open-enquiry-modal')) {
    e.preventDefault();
    modalOverlay.classList.add('active');
  }
});

document.getElementById('modalCloseBtn').addEventListener('click', () => {
  modalOverlay.classList.remove('active');
});

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    modalOverlay.classList.remove('active');
  }
});

// General CF7 Submit Action
const handleFormSubmit = (formId, mapFields, waAPIPhone = "917947420680") => {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = {};
    for (const key in mapFields) {
      const input = document.getElementById(mapFields[key]);
      if (input) formData[key] = input.value;
    }

    const waText = formatWhatsAppText(formData);
    const waUrl = `https://wa.me/${waAPIPhone}?text=${waText}`;
    
    alert(`Enquiry Form Submitted Successfully! Redirecting to WhatsApp for Academy confirmation...`);
    window.open(waUrl, '_blank');
    
    form.reset();
    modalOverlay.classList.remove('active');
  });
};

// Bind Forms
handleFormSubmit('cf7Form', {
  'Type': 'General Contact Enquiry',
  'Name': 'cf7Name',
  'Phone': 'cf7Phone',
  'Email': 'cf7Email',
  'Class': 'cf7Class',
  'Message': 'cf7Message'
});

handleFormSubmit('modalEnquiryForm', {
  'Type': 'Quick Modal Admission Enquiry',
  'Name': 'mName',
  'Phone': 'mPhone',
  'Class': 'mClass',
  'Message': 'mMessage'
});

handleFormSubmit('demoForm', {
  'Type': 'FREE Demo Class Registration',
  'Name': 'demoName',
  'Phone': 'demoPhone',
  'Class': 'demoClass',
  'Time Slot': 'demoTime'
});

// ----------------------------------------------------
// 11. Admin Panel Controller Widget (ACF Simulation)
// ----------------------------------------------------
const adminBadge = document.getElementById('adminBadge');
const adminModal = document.getElementById('adminPanelModal');
const adminCloseBtn = document.getElementById('adminCloseBtn');
const adminSaveBtn = document.getElementById('adminSaveSettingsBtn');

adminBadge.addEventListener('click', () => adminModal.classList.add('active'));
adminCloseBtn.addEventListener('click', () => adminModal.classList.remove('active'));

adminModal.addEventListener('click', (e) => {
  if (e.target === adminModal) adminModal.classList.remove('active');
});

// Load admin defaults
document.getElementById('adminDateInput').value = appState.countdownTarget;

// Save Admin Panel Settings (Re-renders page dynamically)
adminSaveBtn.addEventListener('click', () => {
  appState.isAdmissionOpen = document.getElementById('adminAdmissionOpen').checked;
  appState.countdownTarget = document.getElementById('adminDateInput').value + "T00:00:00";
  
  const noticesRaw = document.getElementById('adminNoticeInput').value;
  appState.notices = noticesRaw.split('\n').filter(line => line.trim() !== '');

  initTicker();
  initCountdown();
  
  adminModal.classList.remove('active');
  alert("WordPress Admin Dashboard Saved! Notice ticker, admissions banner and countdown timer have been updated.");
});

// ACF Resource Card Adder
document.getElementById('adminAddResourceBtn').addEventListener('click', () => {
  const title = document.getElementById('adminResTitle').value;
  const category = document.getElementById('adminResCategory').value;
  const classVal = document.getElementById('adminResClass').value;
  
  if (!title || !classVal) {
    alert("Please fill in the Title and Class details.");
    return;
  }

  const newId = appState.resources.length + 1;
  const today = new Date();
  const dateStr = today.getDate() + 'th ' + today.toLocaleString('default', { month: 'long' }) + ' ' + today.getFullYear();
  
  appState.resources.push({
    id: newId,
    type: category,
    title: title,
    meta: classVal,
    date: dateStr
  });

  // Re-render resources tab
  const activeTabBtn = document.querySelector('#resourceTabs .tab-btn.active');
  if (activeTabBtn) {
    renderResources(activeTabBtn.getAttribute('data-res'));
  }

  document.getElementById('adminResTitle').value = '';
  document.getElementById('adminResClass').value = '';
  
  alert(`Resource card added to the ${category.toUpperCase()} tab successfully!`);
});

// ----------------------------------------------------
// 12. Premium Fixed Header Scroll Effect
// ----------------------------------------------------
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  function checkScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Trigger immediately to handle loaded scroll state
}

// ----------------------------------------------------
// 13. Admin Widget Access Control
// ----------------------------------------------------
function checkAdminAccess() {
  const urlParams = new URLSearchParams(window.location.search);
  const adminBadge = document.getElementById('adminBadge');
  
  if (urlParams.get('admin') === '1') {
    if (adminBadge) adminBadge.style.display = 'flex';
  }
}

// Key combination Ctrl+Alt+A to summon/toggle simulated admin widget
window.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.altKey && e.key.toLowerCase() === 'a') {
    const adminBadge = document.getElementById('adminBadge');
    if (adminBadge) {
      const isHidden = window.getComputedStyle(adminBadge).display === 'none';
      adminBadge.style.display = isHidden ? 'flex' : 'none';
    }
  }
});
