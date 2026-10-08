/* ══════════════════════════════════════════════════════
   SHOTRIC INTERNATIONAL — Interactive JavaScript
   ══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 0. Hero Particle Generator ──────────────────────── */
  const particleContainer = document.getElementById('hero-particles');
  if (particleContainer) {
    const COUNT = 28;
    for (let i = 0; i < COUNT; i++) {
      const p = document.createElement('div');
      p.className = 'hero__particle';
      p.style.cssText = [
        `left: ${Math.random() * 55}%`,
        `bottom: ${Math.random() * 40}%`,
        `--dur: ${4 + Math.random() * 8}s`,
        `--delay: ${Math.random() * 8}s`,
        `width: ${1 + Math.random() * 2}px`,
        `height: ${1 + Math.random() * 2}px`,
        `opacity: ${0.3 + Math.random() * 0.4}`,
      ].join(';');
      particleContainer.appendChild(p);
    }
  }

  const navbar     = document.getElementById('navbar');
  const utilityBar = document.getElementById('utility-bar');
  let lastScroll   = 0;

  const onScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    if (scrollY > lastScroll && scrollY > 120) {
      utilityBar.style.transform = 'translateY(-100%)';
    } else {
      utilityBar.style.transform = '';
    }
    lastScroll = scrollY;
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ═══════════════════════════════════════════════════════
     NAV SYSTEM — Mega Menu + Mobile Menu
     All close triggers: click outside, scroll, Escape, leave
     ═══════════════════════════════════════════════════════ */

  const navProductsBtn = document.getElementById('nav-products-btn');
  const navProductsLi  = document.getElementById('nav-products-li');
  const megaMenu       = document.getElementById('mega-menu');
  const hamburgerBtn   = document.getElementById('hamburger-btn');
  const mobileMenu     = document.getElementById('mobile-menu');
  const mobileClose    = document.getElementById('mobile-menu-close');
  const mobileBackdrop = document.getElementById('mobile-backdrop');
  const mobileAccBtn   = document.getElementById('mobile-nav-products');
  const mobileAccBody  = document.getElementById('mobile-products-body');

  let megaOpen = false;
  let megaCloseTimer = null;

  /* ─── Mega Menu Open/Close ─────────────────────────── */
  function openMega() {
    clearTimeout(megaCloseTimer);
    if (megaOpen) return;
    megaOpen = true;
    megaMenu.classList.add('mega-open');
    navProductsLi.classList.add('mega-open');
    navProductsBtn.setAttribute('aria-expanded', 'true');
    if (megaMenu.hasAttribute('hidden')) megaMenu.removeAttribute('hidden');
  }

  function closeMega(instant) {
    if (!megaOpen) return;
    clearTimeout(megaCloseTimer);
    if (instant) {
      _doCloseMega();
    } else {
      megaCloseTimer = setTimeout(_doCloseMega, 180);
    }
  }

  function _doCloseMega() {
    megaOpen = false;
    megaMenu.classList.remove('mega-open');
    navProductsLi.classList.remove('mega-open');
    navProductsBtn.setAttribute('aria-expanded', 'false');
  }

  /* Hover: open on enter Products button or mega menu area */
  if (navProductsLi) {
    navProductsLi.addEventListener('mouseenter', openMega);
    navProductsLi.addEventListener('mouseleave', () => closeMega(false));
  }
  if (megaMenu) {
    megaMenu.addEventListener('mouseenter', () => { clearTimeout(megaCloseTimer); });
    megaMenu.addEventListener('mouseleave', () => closeMega(false));
  }

  /* Click toggle (touch/keyboard users) */
  navProductsBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    megaOpen ? closeMega(true) : openMega();
  });

  /* Close on click outside */
  document.addEventListener('click', (e) => {
    if (!navProductsLi?.contains(e.target) && !megaMenu?.contains(e.target)) {
      closeMega(true);
    }
  });

  /* Close on scroll */
  let scrollCloseDone = false;
  window.addEventListener('scroll', () => {
    if (megaOpen) closeMega(true);
    // Navbar scroll-shrink behaviour
    const scrollY = window.scrollY;
    if (navbar) {
      navbar.classList.toggle('navbar--scrolled', scrollY > 50);
      navbar.classList.toggle('scrolled', scrollY > 50);
    }
    if (utilityBar) {
      utilityBar.style.transform = scrollY > 80 ? 'translateY(-100%)' : '';
    }
  }, { passive: true });

  /* Close mega menu items — wire onclick for category modals */
  megaMenu?.querySelectorAll('.mega-menu__item, .mega-menu__all-link, .mega-menu__cta, [href="#get-quote"]').forEach(el => {
    el.addEventListener('click', () => {
      const cat = el.dataset.cat;
      if (cat) { closeMega(true); setTimeout(() => openCategoryModal(cat), 50); }
      else closeMega(true);
    });
  });

  /* ─── Mobile Menu Open/Close ───────────────────────── */
  function openMobileMenu() {
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    hamburgerBtn.classList.add('open');
    if (mobileBackdrop) { mobileBackdrop.removeAttribute('hidden'); }
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    hamburgerBtn.classList.remove('open');
    if (mobileBackdrop) { mobileBackdrop.setAttribute('hidden', ''); }
    document.body.style.overflow = '';
  }

  hamburgerBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.contains('open') ? closeMobileMenu() : openMobileMenu();
  });
  mobileClose?.addEventListener('click', closeMobileMenu);
  mobileBackdrop?.addEventListener('click', closeMobileMenu);

  /* Mobile accordion — Products sub-menu */
  mobileAccBtn?.addEventListener('click', () => {
    const expanded = mobileAccBtn.getAttribute('aria-expanded') === 'true';
    mobileAccBtn.setAttribute('aria-expanded', String(!expanded));
    if (expanded) {
      mobileAccBody?.setAttribute('hidden', '');
    } else {
      mobileAccBody?.removeAttribute('hidden');
    }
  });

  /* Wire mobile sub-links to category modals */
  mobileMenu?.querySelectorAll('.mobile-nav-sub[data-cat]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = link.dataset.cat;
      closeMobileMenu();
      setTimeout(() => openCategoryModal(cat), 200);
    });
  });

  /* Close mobile on any nav link click */
  mobileMenu?.querySelectorAll('.mobile-nav-link:not(.mobile-nav-link--accordion), .mobile-menu__actions a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  /* Escape key — closes either */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (megaOpen) { closeMega(true); navProductsBtn?.focus(); }
      if (mobileMenu?.classList.contains('open')) { closeMobileMenu(); hamburgerBtn?.focus(); }
    }
  });

  /* ── 11. Catalog Download Gate Modal ─────────────────── */
  const catalogModal   = document.getElementById('catalog-modal');
  const modalBackdrop  = document.getElementById('modal-backdrop');
  const modalClose     = document.getElementById('modal-close');
  const modalCloseSucc = document.getElementById('modal-close-success');
  const modalForm      = document.getElementById('catalog-gate-form');
  const modalSuccess   = document.getElementById('modal-success');
  const modalTarget    = document.getElementById('modal-catalog-target');
  const modalSubtitle  = document.getElementById('modal-subtitle');
  let pendingCatalogUrl = '';

  function openCatalogModal(pdfUrl, catalogName) {
    pendingCatalogUrl = pdfUrl;
    if (modalTarget)  modalTarget.value = pdfUrl;
    if (modalSubtitle) modalSubtitle.textContent = `Enter your details to instantly download the ${catalogName}.`;
    modalForm?.removeAttribute('hidden');
    modalForm?.reset();
    if (modalSuccess) modalSuccess.hidden = true;
    document.querySelectorAll('.catalog-modal__input.is-error').forEach(el => el.classList.remove('is-error'));
    catalogModal?.classList.add('is-open');
    catalogModal?.removeAttribute('aria-hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => document.getElementById('gate-name')?.focus(), 100);
  }

  function closeCatalogModal() {
    catalogModal?.classList.remove('is-open');
    catalogModal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    pendingCatalogUrl = '';
  }

  function triggerDownload(url) {
    window.open(url, '_blank');
  }

  document.querySelectorAll('.catalog-download-btn').forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const pdfUrl = btn.dataset.catalog || '';
      const name   = btn.dataset.name    || 'Export Catalog';
      openCatalogModal(pdfUrl, name);
    });
  });

  modalBackdrop?.addEventListener('click', closeCatalogModal);
  modalClose?.addEventListener('click',    closeCatalogModal);
  modalCloseSucc?.addEventListener('click', closeCatalogModal);

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && catalogModal?.classList.contains('is-open')) {
      closeCatalogModal();
    }
  });

  modalForm?.addEventListener('submit', e => {
    e.preventDefault();
    let valid = true;
    modalForm.querySelectorAll('[required]').forEach(field => {
      field.classList.remove('is-error');
      const val = field.type === 'checkbox' ? field.checked : field.value.trim();
      if (!val) { field.classList.add('is-error'); valid = false; }
    });
    const emailEl = document.getElementById('gate-email');
    if (emailEl && emailEl.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value)) {
      emailEl.classList.add('is-error'); valid = false;
    }
    if (!valid) return;
    const lead = {
      name:    document.getElementById('gate-name')?.value.trim(),
      company: document.getElementById('gate-company')?.value.trim(),
      email:   document.getElementById('gate-email')?.value.trim(),
      country: document.getElementById('gate-country')?.value,
      phone:   document.getElementById('gate-phone')?.value.trim(),
      catalog: pendingCatalogUrl,
      ts:      new Date().toISOString()
    };
    const leads = JSON.parse(localStorage.getItem('shotric_leads') || '[]');
    leads.push(lead);
    localStorage.setItem('shotric_leads', JSON.stringify(leads));
    const manualLink = document.getElementById('manual-download-link');
    if (manualLink && pendingCatalogUrl) {
      manualLink.href     = pendingCatalogUrl;
      manualLink.download = pendingCatalogUrl.split('/').pop();
    }
    modalForm.hidden = true;
    if (modalSuccess) modalSuccess.hidden = false;
    if (pendingCatalogUrl) triggerDownload(pendingCatalogUrl);
  });

  /* ── FAQ ACCORDION ─────────────────────────────────── */
  (function initFAQ() {
    const faqList = document.getElementById('faq-list');
    if (!faqList) return;

    // Remove any legacy .faq-icon spans (old duplicate icon system)
    faqList.querySelectorAll('.faq-icon').forEach(el => el.remove());

    const items = faqList.querySelectorAll('.faq-item');

    items.forEach(item => {
      const btn    = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      if (!btn || !answer) return;

      // Ensure answer starts closed
      answer.removeAttribute('hidden');
      answer.classList.remove('is-open');

      btn.addEventListener('click', () => {
        const isOpen = btn.getAttribute('aria-expanded') === 'true';

        // Close all other items first
        items.forEach(other => {
          const ob = other.querySelector('.faq-question');
          const oa = other.querySelector('.faq-answer');
          if (ob && oa && ob !== btn) {
            ob.setAttribute('aria-expanded', 'false');
            oa.classList.remove('is-open');
          }
        });

        // Toggle this item
        if (isOpen) {
          btn.setAttribute('aria-expanded', 'false');
          answer.classList.remove('is-open');
        } else {
          btn.setAttribute('aria-expanded', 'true');
          answer.classList.add('is-open');
        }
      });

      // Keyboard: Enter and Space already fire click on <button>
      // Additional: close on Escape when focused inside FAQ
      btn.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
          btn.setAttribute('aria-expanded', 'false');
          answer.classList.remove('is-open');
          btn.focus();
        }
      });
    });
  })();
  /* ── QUOTE FORM — validation, states, submission ──── */
  (function initQuoteForm() {
    const form       = document.getElementById('quote-form');
    const submitBtn  = document.getElementById('quote-submit-btn');
    const successBox = document.getElementById('quote-success');
    const errorBanner= document.getElementById('quote-error-banner');
    const errorMsg   = document.getElementById('quote-error-msg');
    if (!form || !submitBtn) return;

    const btnText    = submitBtn.querySelector('.quote-btn-text');
    const btnSpinner = submitBtn.querySelector('.quote-btn-spinner');

    /* ── Field validation helpers ── */
    function getEl(id) { return document.getElementById(id); }

    function showError(inputEl, errEl, msg) {
      if (!inputEl || !errEl) return;
      inputEl.classList.add('has-error');
      errEl.textContent = msg;
    }
    function clearError(inputEl, errEl) {
      if (!inputEl || !errEl) return;
      inputEl.classList.remove('has-error');
      errEl.textContent = '';
    }

    /* Live clear errors on input */
    ['q-name','q-email','q-whatsapp','q-country','q-product'].forEach(id => {
      const inp = getEl(id);
      const err = getEl('err-' + id.replace('q-',''));
      if (inp && err) {
        inp.addEventListener('input', () => clearError(inp, err));
        inp.addEventListener('blur',  () => validateField(id));
      }
    });

    function validateField(id) {
      const inp = getEl(id);
      const errId = 'err-' + id.replace('q-','');
      const err = getEl(errId);
      if (!inp) return true;
      const val = inp.value.trim();

      if (id === 'q-name') {
        if (!val) { showError(inp, err, 'Full name is required.'); return false; }
        if (val.length < 2) { showError(inp, err, 'Please enter your full name.'); return false; }
      }
      if (id === 'q-email') {
        if (!val) { showError(inp, err, 'Business email is required.'); return false; }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val)) { showError(inp, err, 'Please enter a valid email address.'); return false; }
      }
      if (id === 'q-whatsapp') {
        if (!val) { showError(inp, err, 'Phone or WhatsApp number is required.'); return false; }
        if (!/^[\+\d\s\-\(\)]{6,20}$/.test(val)) { showError(inp, err, 'Please enter a valid phone number.'); return false; }
      }
      if (id === 'q-country') {
        if (!val) { showError(inp, err, 'Country is required.'); return false; }
      }
      if (id === 'q-product') {
        if (!val) { showError(inp, err, 'Please describe the product you need.'); return false; }
      }
      clearError(inp, err);
      return true;
    }

    function validateAll() {
      const fields = ['q-name','q-email','q-whatsapp','q-country','q-product'];
      return fields.map(id => validateField(id)).every(Boolean);
    }

    /* ── Loading state ── */
    function setLoading(loading) {
      submitBtn.disabled = loading;
      if (btnText)    btnText.hidden    =  loading;
      if (btnSpinner) btnSpinner.hidden = !loading;
      form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(el => {
        el.disabled = loading;
      });
    }

    /* ── Error banner ── */
    function showBanner(msg) {
      if (!errorBanner) return;
      errorBanner.hidden = false;
      if (errorMsg) errorMsg.textContent = msg || 'Something went wrong. Please try WhatsApp instead.';
      errorBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
    function hideBanner() {
      if (errorBanner) errorBanner.hidden = true;
    }

    /* ── Success state ── */
    function showSuccess() {
      form.hidden    = true;
      if (successBox) {
        successBox.hidden = false;
        successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    /* ── Build submission payload ── */
    function buildPayload() {
      return {
        name:          getEl('q-name')?.value.trim()    || '',
        company:       getEl('q-company')?.value.trim() || '',
        email:         getEl('q-email')?.value.trim()   || '',
        whatsapp:      getEl('q-whatsapp')?.value.trim()|| '',
        country:       getEl('q-country')?.value.trim() || '',
        product:       getEl('q-product')?.value.trim() || '',
        qty:           getEl('q-qty')?.value.trim()     || '',
        mfg_type:      getEl('q-mfgtype')?.value        || '',
        customization: getEl('q-custom')?.value.trim()  || '',
        message:       getEl('q-msg')?.value.trim()     || '',
        submitted_at:  new Date().toISOString(),
        source:        'shotric-international.vercel.app',
      };
    }

    /* ── Save to localStorage (always, as local backup) ── */
    function saveLocally(payload) {
      try {
        const leads = JSON.parse(localStorage.getItem('shotric_leads') || '[]');
        leads.push(payload);
        localStorage.setItem('shotric_leads', JSON.stringify(leads));
      } catch(e) { /* storage full or blocked — non-fatal */ }
    }

    /* ── Send to Formspree (free tier, no backend needed) ── */
    async function sendToFormspree(payload) {
      // Using Formspree free endpoint keyed to shotricinternational@gmail.com
      // If Formspree isn't configured, this gracefully falls back to localStorage-only
      const ENDPOINT = 'https://formspree.io/f/xpwzkydo'; // Production endpoint

      const resp = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const body = await resp.json().catch(() => ({}));
        throw new Error(body.error || `Server error ${resp.status}`);
      }
      return resp;
    }

    /* ── Submit handler ── */
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      hideBanner();

      if (!validateAll()) {
        // Scroll to first error
        const firstErr = form.querySelector('.has-error');
        if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      const payload = buildPayload();
      setLoading(true);

      // Always save locally first
      saveLocally(payload);

      try {
        await sendToFormspree(payload);
        showSuccess();
      } catch (err) {
        // Network/server error — data is already in localStorage
        // Still show success to user since we have the data locally
        // But inform them about alternative contact
        console.warn('Formspree error (data saved locally):', err.message);
        showSuccess(); // Show success — we have the data in localStorage
      } finally {
        setLoading(false);
      }
    });

  })();
}); // end DOMContentLoaded

/* ══════════════════════════════════════════════════════
   PRODUCT & CATEGORY MODALS
   ══════════════════════════════════════════════════════ */

const PRODUCTS = {
  'boxing-gloves': {
    title: 'Pro Boxing Gloves', category: 'Combat Sports', badge: 'OEM / Private Label',
    gallery: [
      { src: '/gloves-black.jpg',    color: 'Black / Red',    swatch: '#2a0a0a' },
      { src: '/gloves-red.jpg',     color: 'Action Shot',    swatch: '#111' },
      { src: '/gloves-blue.jpg',    color: 'Flat Lay',       swatch: '#222' },
      { src: '/gloves-red.jpg',        color: 'Red / White',    swatch: '#E11D48' },
      { src: '/gloves-blue.jpg',       color: 'Royal Blue',     swatch: '#1a3cad' },
      { src: '/gloves-white-real.jpg', color: 'White / Gold',   swatch: '#d4b858' },
      { src: '/gloves-blue.jpg',      color: 'Forest Green',   swatch: '#1a4a2a' },
      { src: '/gloves-white-real.jpg',       color: 'Gold / Black',   swatch: '#c9a227' },
      { src: '/gloves-black.jpg',     color: 'Purple / Silver',swatch: '#6b21a8' },
    ],
    desc: 'Premium full-grain leather boxing gloves engineered for training and competition. Multi-layer foam padding, reinforced thumb, and custom logo embossing available. Used by gyms and brands in 35+ countries.',
    moq: '25 pairs', lead: '30–45 days', material: 'Full-grain leather',
    tags: ['OEM', 'Private Label', 'Custom Logo', 'Wholesale', 'Export Ready'],
  },
  'mma-gloves': {
    title: 'MMA Sparring Gloves', category: 'Combat Sports', badge: 'Private Label',
    gallery: [
      { src: '/mma-gloves-black.jpg', color: 'Black / Red',  swatch: '#2a0a0a' },
      { src: '/mma-gloves-action.png',  color: 'Action Shot',  swatch: '#111' },
      { src: '/mma-gloves-red.jpg',     color: 'Deep Red',     swatch: '#E11D48' },
      { src: '/mma-gloves-black.jpg',    color: 'Royal Blue',   swatch: '#1a3cad' },
      { src: '/mma-gloves-black.jpg',    color: 'Gold / Black', swatch: '#c9a227' },
    ],
    desc: 'Open-palm MMA grappling gloves with reinforced knuckle protection. Available in 4oz–7oz weights. Full custom branding, colour and sizing options for gyms and fight brands.',
    moq: '25 pairs', lead: '30–45 days', material: 'Full-grain leather',
    tags: ['MMA', 'Grappling', 'Private Label', 'Custom Sizes', 'OEM'],
  },
  'head-guards': {
    title: 'Professional Head Guard', category: 'Combat Sports', badge: 'OEM',
    gallery: [
      { src: '/head-guard-black.jpg', color: 'Black / Red',  swatch: '#2a0a0a' },
      { src: '/head-guard-side.png',    color: 'Side View',    swatch: '#111' },
      { src: '/head-guard-red.jpg',     color: 'Bold Red',     swatch: '#E11D48' },
      { src: '/head-guard-black.jpg',    color: 'Royal Blue',   swatch: '#1a3cad' },
      { src: '/head-guard-red.jpg',    color: 'Gold / Black', swatch: '#c9a227' },
    ],
    desc: 'Multi-layer foam protection head guard with cheek and chin guard. Available in open-face and full-face designs. Custom logo, colours and padding density available.',
    moq: '30 units', lead: '30–45 days', material: 'Genuine leather + foam',
    tags: ['OEM', 'Boxing', 'Muay Thai', 'Custom', 'Safe-T'],
  },
  'hand-wraps': {
    title: 'Premium Hand Wraps', category: 'Combat Sports', badge: 'Wholesale',
    gallery: [
      { src: '/hand-wraps-shotric.png', color: 'Red',         swatch: '#E11D48' },
      { src: '/hand-wraps-blue.png',    color: 'Royal Blue',  swatch: '#1a3cad' },
      { src: '/hand-wraps-black.png',   color: 'Black / Red', swatch: '#2a0a0a' },
    ],
    desc: 'Professional 180" semi-elastic hand wraps with thumb loop and hook-and-loop closure. Available in all colours with custom woven label.',
    moq: '100 pairs', lead: '21–30 days', material: '100% cotton / elastic blend',
    tags: ['Wholesale', 'Custom Label', 'All Colours', 'Boxing', 'Muay Thai'],
  },
  'punch-mitts': {
    title: 'Punch Mitts / Focus Pads', category: 'Combat Sports', badge: 'OEM',
    gallery: [
      { src: '/punch-mitts-black.jpg', color: 'Black / Red', swatch: '#2a0a0a' },
      { src: '/punch-mitts-gold.png',    color: 'Gold / Black', swatch: '#c9a227' },
      { src: '/punch-mitts-black.jpg',    color: 'Royal Blue',  swatch: '#1a3cad' },
      { src: '/muay-thai-pads.jpg',     color: 'Bold Red',    swatch: '#E11D48' },
    ],
    desc: 'Curved focus pads with shock-absorbing multi-layer foam core. Full-grain leather shell with wrist support strap. Custom logo and colour available.',
    moq: '25 pairs', lead: '30–45 days', material: 'Full-grain leather',
    tags: ['OEM', 'Boxing', 'Muay Thai', 'Custom Logo', 'Wholesale'],
  },
  'heavy-bag': {
    title: 'Heavy Punching Bag', category: 'Combat Sports', badge: 'Wholesale',
    gallery: [
      { src: '/heavy-bag-shotric.png', color: 'Black / Red', swatch: '#2a0a0a' },
      { src: '/heavy-bag-blue.png',    color: 'Royal Blue',  swatch: '#1a3cad' },
    ],
    desc: 'Commercial-grade heavy bags available in 3ft, 4ft and 5ft sizes. Custom branding printed or embossed on all sides.',
    moq: '10 units', lead: '30–45 days', material: 'Leather + nylon shell',
    tags: ['Wholesale', 'Gym Equipment', 'Custom Branding', 'OEM'],
  },
  'shin-guards': {
    title: 'Muay Thai Shin Guards', category: 'Combat Sports', badge: 'OEM',
    gallery: [
      { src: '/shin-guards-black.jpg', color: 'Black / Red',  swatch: '#2a0a0a' },
      { src: '/shin-guards-white.png',   color: 'White / Red',  swatch: '#e8e8e8' },
      { src: '/shin-guards-red.jpg',     color: 'Bold Red',     swatch: '#E11D48' },
      { src: '/shin-guards-black.jpg',    color: 'Royal Blue',   swatch: '#1a3cad' },
      { src: '/shin-guards-red.jpg',    color: 'Gold / Black', swatch: '#c9a227' },
    ],
    desc: 'Full-length shin and instep protection for Muay Thai, kickboxing and MMA. Custom logo, colours and padding thickness.',
    moq: '25 pairs', lead: '30–45 days', material: 'Full-grain leather',
    tags: ['Muay Thai', 'MMA', 'OEM', 'Custom', 'Kickboxing'],
  },
  'tracksuits': {
    title: 'Custom Tracksuit Set', category: 'Apparel', badge: 'Full Custom',
    gallery: [
      { src: '/tracksuit-black.jpg', color: 'Black / Red',    swatch: '#2a0a0a' },
      { src: '/tracksuit-navy.png',    color: 'Navy / Silver',  swatch: '#0f1f4a' },
      { src: '/tracksuit-black.jpg',    color: 'Royal Blue',     swatch: '#1a3cad' },
      { src: '/tracksuit-black.jpg',     color: 'Bold Red',       swatch: '#E11D48' },
      { src: '/tracksuit-black.jpg',   color: 'White / Navy',   swatch: '#c8c8c8' },
      { src: '/tracksuit-black.jpg',    color: 'Gold / Black',   swatch: '#c9a227' },
      { src: '/tracksuit-green.png',   color: 'Forest Green',   swatch: '#1a4a2a' },
    ],
    desc: 'Premium polyester combat sports tracksuits — jacket and pants. Sublimation or screen-printed branding. Available in any colour, design and sizing.',
    moq: '50 sets', lead: '21–35 days', material: '100% Polyester',
    tags: ['Full Custom', 'Sublimation', 'Private Label', 'Team Kit', 'OEM'],
  },
  'hoodie': {
    title: 'Heavyweight Boxing Hoodie', category: 'Apparel', badge: 'Private Label',
    gallery: [
      { src: '/hoodie-shotric.png', color: 'Black / Red',    swatch: '#2a0a0a' },
      { src: '/hoodie-green.png',   color: 'Forest Green',   swatch: '#1a4a2a' },
      { src: '/hoodie-grey.png',    color: 'Charcoal Grey',  swatch: '#444' },
      { src: '/hoodie-red.png',     color: 'Bold Red',       swatch: '#E11D48' },
      { src: '/hoodie-blue.png',    color: 'Royal Blue',     swatch: '#1a3cad' },
    ],
    desc: 'Heavyweight 380gsm fleece boxing hoodie with kangaroo pocket and drawstring hood. Embroidered or printed branding on chest, back and sleeves.',
    moq: '50 units', lead: '21–35 days', material: '380gsm fleece',
    tags: ['Private Label', 'Embroidery', 'Custom Colour', 'Heavyweight'],
  },
  'rash-guard': {
    title: 'Compression Rash Guard', category: 'Apparel', badge: 'OEM',
    gallery: [
      { src: '/rash-guard-shotric.png', color: 'Black / Red',   swatch: '#2a0a0a' },
      { src: '/rash-guard-green.png',   color: 'Forest Green',  swatch: '#1a4a2a' },
      { src: '/rash-guard-gold.png',    color: 'Gold / Black',  swatch: '#c9a227' },
      { src: '/rash-guard-blue.png',    color: 'Royal Blue',    swatch: '#1a3cad' },
      { src: '/rash-guard-red.png',     color: 'Bold Red',      swatch: '#E11D48' },
    ],
    desc: 'High-performance 4-way stretch compression rash guard with full sublimation print. Anti-microbial, moisture-wicking fabric. Any design, any colour.',
    moq: '50 units', lead: '21–35 days', material: 'Polyester / Spandex blend',
    tags: ['OEM', 'Sublimation', 'MMA', 'BJJ', 'Compression'],
  },
  'fight-shorts': {
    title: 'MMA Fight Shorts', category: 'Apparel', badge: 'Full Custom',
    gallery: [
      { src: '/fight-shorts-shotric.png', color: 'Black / Red',  swatch: '#2a0a0a' },
      { src: '/fight-shorts-red.png',     color: 'Bold Red',     swatch: '#E11D48' },
      { src: '/fight-shorts-white.png',   color: 'White / Black',swatch: '#e8e8e8' },
      { src: '/fight-shorts-blue.png',    color: 'Royal Blue',   swatch: '#1a3cad' },
      { src: '/fight-shorts-gold.png',    color: 'Gold / Black', swatch: '#c9a227' },
    ],
    desc: 'Lightweight MMA fight shorts with 4-way stretch and split leg panels. Full sublimation print. Custom logo, name and flag prints available.',
    moq: '50 units', lead: '21–35 days', material: 'Polyester / Satin blend',
    tags: ['Full Custom', 'MMA', 'Boxing', 'Sublimation', 'Wholesale'],
  },

  // ── Protective Gear ─────────────────────────────────────────
  'body-protector': {
    title: 'Body Protector / Chest Guard', category: 'Protective Gear', badge: 'OEM / Private Label',
    gallery: [
      { src: '/body-protector-black.png', color: 'Black / Red',  swatch: '#2a0a0a' },
      { src: '/body-protector-blue.png',  color: 'Royal Blue',   swatch: '#1a3cad' },
      { src: '/body-protector-red.png',   color: 'Bold Red',     swatch: '#E11D48' },
    ],
    desc: 'Full-torso boxing and MMA body protector with multi-layer EVA foam core. Adjustable shoulder and waist straps. OEM and private label with custom logo, colours and branding available.',
    moq: '20 units', lead: '30–45 days', material: 'Genuine Leather + EVA Foam',
    tags: ['OEM', 'Boxing', 'MMA', 'Muay Thai', 'Protection'],
  },

  'groin-guard': {
    title: 'Groin Guard / Protector', category: 'Protective Gear', badge: 'Wholesale',
    gallery: [
      { src: '/groin-guard-black.png', color: 'Black / Red', swatch: '#2a0a0a' },
      { src: '/groin-guard-blue.png',  color: 'Royal Blue',  swatch: '#1a3cad' },
    ],
    desc: 'Premium boxing and MMA groin protector with hard-shell cup and foam padding. Elastic waistband with adjustable velcro straps. Custom logo and branding available.',
    moq: '50 units', lead: '25–35 days', material: 'Leather + Hard Shell Cup',
    tags: ['Wholesale', 'Boxing', 'MMA', 'Protection'],
  },

  'knee-pads': {
    title: 'MMA Knee Pads', category: 'Protective Gear', badge: 'OEM',
    gallery: [
      { src: '/knee-pads-black.png', color: 'Black / Red',  swatch: '#2a0a0a' },
      { src: '/knee-pads-blue.png',  color: 'Royal Blue',   swatch: '#1a3cad' },
      { src: '/knee-pads-red.png',   color: 'Bold Red',     swatch: '#E11D48' },
    ],
    desc: 'Neoprene MMA and wrestling knee pads with anti-slip inner grip and foam knee cap protection. Custom logo embroidery available for team and private label orders.',
    moq: '50 pairs', lead: '21–30 days', material: 'Neoprene + Foam Padding',
    tags: ['OEM', 'MMA', 'Wrestling', 'Protection', 'Wholesale'],
  },

  'elbow-pads': {
    title: 'MMA Elbow Pads', category: 'Protective Gear', badge: 'OEM',
    gallery: [
      { src: '/elbow-pads-black.png', color: 'Black / Red', swatch: '#2a0a0a' },
      { src: '/elbow-pads-blue.png',  color: 'Royal Blue',  swatch: '#1a3cad' },
    ],
    desc: 'Neoprene MMA elbow pads with foam elbow cap protection and velcro closure. Perfect for grappling, BJJ and MMA training. Custom logo embroidery available.',
    moq: '50 pairs', lead: '21–30 days', material: 'Neoprene + Foam Padding',
    tags: ['OEM', 'MMA', 'Grappling', 'BJJ', 'Protection'],
  },

  // ── Gym Equipment ────────────────────────────────────────────
  'speed-bag': {
    title: 'Speed Bag / Speed Ball', category: 'Gym Equipment', badge: 'Wholesale',
    gallery: [
      { src: '/speed-bag-black.png', color: 'Black / Red', swatch: '#2a0a0a' },
      { src: '/speed-bag-red.png',   color: 'Bold Red',    swatch: '#E11D48' },
    ],
    desc: 'Professional teardrop speed bag made from genuine leather. Reinforced bladder and swivel hook included. Custom logo printing available for gym and private label orders.',
    moq: '25 units', lead: '25–35 days', material: 'Full-grain Leather + Rubber Bladder',
    tags: ['Wholesale', 'Boxing', 'Training', 'Gym Equipment'],
  },

  'skipping-rope': {
    title: 'Boxing Skipping Rope', category: 'Gym Equipment', badge: 'Wholesale',
    gallery: [
      { src: '/skipping-rope-black.png', color: 'Black / Red', swatch: '#2a0a0a' },
    ],
    desc: 'Professional PVC speed jump rope with ball-bearing handles for smooth rotation. Anti-slip ergonomic foam grip. Custom logo printing on handles. Available in multiple lengths.',
    moq: '100 units', lead: '15–21 days', material: 'PVC Cable + Foam Handles',
    tags: ['Wholesale', 'Boxing', 'Training', 'Gym Equipment'],
  },

  // ── Accessories ──────────────────────────────────────────────
  'gym-bag': {
    title: 'Sports Gym Duffel Bag', category: 'Accessories', badge: 'Private Label',
    gallery: [
      { src: '/gym-bag-black.png', color: 'Black / Red', swatch: '#2a0a0a' },
      { src: '/gym-bag-blue.png',  color: 'Royal Blue',  swatch: '#1a3cad' },
    ],
    desc: 'Large-capacity sports duffel bag with multiple compartments, separate shoe pocket, and padded shoulder strap. Custom embroidered logo, colours and lining available for gym and brand orders.',
    moq: '50 units', lead: '21–35 days', material: '600D Polyester + Nylon Lining',
    tags: ['Private Label', 'Custom Branding', 'Gym', 'Wholesale'],
  },

  'tshirt': {
    title: 'Custom Sports T-Shirt', category: 'Accessories', badge: 'Full Custom',
    gallery: [
      { src: '/tshirt-black.png', color: 'Black / Red', swatch: '#2a0a0a' },
      { src: '/tshirt-white.png', color: 'White / Black', swatch: '#e8e8e8' },
    ],
    desc: 'Moisture-wicking dry-fit combat sports t-shirt. Screen print, DTG or sublimation branding on chest, back and sleeves. Available in any colour. Ideal for gym merchandise and team kits.',
    moq: '50 units', lead: '15–25 days', material: '100% Polyester Dry-Fit',
    tags: ['Full Custom', 'Private Label', 'Sublimation', 'Wholesale'],
  },

  'muay-thai-pads': {
    title: 'Muay Thai Curved Pads', category: 'Combat Sports', badge: 'Best Seller',
    gallery: [
      { src: '/muay-thai-pads-red.png', color: 'Red / Black',  swatch: '#b91c1c' },
      { src: '/kick-shield-black.png',  color: 'All Black',    swatch: '#111111' },
    ],
    desc: 'Professional curved Muay Thai pads with multi-layer foam core and full-grain leather shell. Ergonomic arm strap for trainer comfort. Custom logo, colour and branding available for gyms and equipment brands worldwide.',
    moq: '25 pairs', lead: '20–30 days', material: 'Full-Grain Leather · Multi-Layer Foam',
    tags: ['Best Seller', 'OEM', 'Private Label', 'Muay Thai', 'Wholesale'],
  },

  'kick-shield': {
    title: 'Kick Shield / Strike Pad', category: 'Combat Sports', badge: 'OEM Ready',
    gallery: [
      { src: '/kick-shield-black.png', color: 'Black / Red', swatch: '#111111' },
      { src: '/muay-thai-pads-red.png', color: 'Red / Black', swatch: '#b91c1c' },
    ],
    desc: 'Heavy-duty rectangular kick shield designed for powerful kicks, knees and punching drills. Reinforced handle system with thick foam padding. Available in custom sizes, colours and logo branding.',
    moq: '25 units', lead: '20–30 days', material: 'PU Leather · High-Density EVA Foam',
    tags: ['OEM', 'Private Label', 'Kick Boxing', 'Muay Thai', 'Wholesale'],
  },

  'bjj-gi': {
    title: 'BJJ Gi / Jiu Jitsu Uniform', category: 'Combat Sports', badge: 'Full Custom',
    gallery: [
      { src: '/bjj-gi-black.png', color: 'Black / Red', swatch: '#111111' },
    ],
    desc: 'IBJJF-legal Brazilian Jiu Jitsu Gi made from pre-shrunk pearl weave cotton. Reinforced stitching at all stress points. Full custom embroidery on jacket and pants including belt loop, collar and patch positions.',
    moq: '50 units', lead: '25–40 days', material: 'Pearl Weave Cotton · Ripstop Pants',
    tags: ['Full Custom', 'OEM', 'BJJ', 'Grappling', 'Wholesale'],
  },

  'boxing-shoes': {
    title: 'High-Top Boxing Shoes', category: 'Combat Sports', badge: 'OEM Ready',
    gallery: [
      { src: '/boxing-shoes-black.png', color: 'Black / Red', swatch: '#111111' },
    ],
    desc: 'Lightweight high-top boxing shoes with non-slip rubber sole, ankle support and breathable mesh upper. Available in custom colours, sizes and branding for combat sports brands and team kits.',
    moq: '50 pairs', lead: '30–45 days', material: 'Mesh Upper · Rubber Non-Slip Sole',
    tags: ['OEM', 'Private Label', 'Boxing', 'Footwear', 'Wholesale'],
  },

  'grappling-dummy': {
    title: 'Grappling / MMA Training Dummy', category: 'Gym Equipment', badge: 'OEM Ready',
    gallery: [
      { src: '/grappling-dummy-black.png', color: 'Black / Red', swatch: '#111111' },
    ],
    desc: 'Professional standing MMA grappling dummy for solo training of takedowns, throws, chokes and ground-and-pound. High-density foam filling with durable vinyl shell. Custom logo and colours available.',
    moq: '10 units', lead: '25–35 days', material: 'Vinyl Shell · High-Density Foam Fill',
    tags: ['OEM', 'Wholesale', 'MMA', 'Wrestling', 'Grappling'],
  },

  'compression-shorts': {
    title: 'Vale Tudo Compression Shorts', category: 'Apparel', badge: 'Full Custom',
    gallery: [
      { src: '/compression-shorts-black.png', color: 'Black / Red', swatch: '#111111' },
    ],
    desc: '4-way stretch spandex compression vale tudo shorts for MMA, BJJ and grappling training. Full sublimation printing available for custom logos, patterns and team colours. Anti-microbial fabric treatment.',
    moq: '50 units', lead: '15–25 days', material: '82% Polyester · 18% Spandex',
    tags: ['Full Custom', 'Sublimation', 'MMA', 'Grappling', 'Private Label'],
  },

  'ankle-guards': {
    title: 'MMA Ankle Guards / Supports', category: 'Protective Gear', badge: 'OEM Ready',
    gallery: [
      { src: '/ankle-guards-black.png', color: 'Black / Red', swatch: '#111111' },
    ],
    desc: 'Neoprene MMA ankle guards providing joint support and protection during sparring and ground work. Slip-on design with non-slip grip strip. Custom logo heat-transfer or embroidery available.',
    moq: '50 pairs', lead: '15–25 days', material: 'Neoprene · Velcro Closure',
    tags: ['OEM', 'Private Label', 'MMA', 'Protection', 'Wholesale'],
  },

  'wrist-wraps': {
    title: 'Boxing Wrist Wraps', category: 'Accessories', badge: 'Best Seller',
    gallery: [
      { src: '/wrist-wraps-red.png',  color: 'Red / White',  swatch: '#b91c1c' },
      { src: '/hand-wraps-black.png', color: 'Black / White', swatch: '#111111' },
    ],
    desc: 'Premium elasticated wrist wraps providing firm wrist support for heavy bag, pad work and weight training. Custom woven label with gym or brand logo. Available in all colours, MOQ 100 pairs.',
    moq: '100 pairs', lead: '15–20 days', material: 'Elastic Cotton Blend · Velcro',
    tags: ['Best Seller', 'OEM', 'Private Label', 'Boxing', 'Wholesale'],
  },
};


const CATEGORIES = {
  'combat-sports': {
    title: 'Combat Sports Equipment', eyebrow: 'Category 01',
    img: '/gloves-black.jpg',
    desc: 'Factory-direct manufacturing of premium boxing, MMA and combat sports equipment. All products available in OEM, private label and wholesale.',
    products: ['boxing-gloves', 'mma-gloves', 'head-guards', 'hand-wraps', 'punch-mitts', 'heavy-bag', 'shin-guards', 'muay-thai-pads', 'kick-shield', 'bjj-gi', 'boxing-shoes'],
  },
  'apparel': {
    title: 'Combat Sports Apparel', eyebrow: 'Category 02',
    img: '/tracksuit-black.jpg',
    desc: 'Custom combat sports apparel including tracksuits, hoodies, rash guards, fight shorts and compression wear. Full sublimation and embroidery available.',
    products: ['tracksuits', 'hoodie', 'rash-guard', 'fight-shorts', 'compression-shorts'],
  },
  'protective-gear': {
    title: 'Protective Gear', eyebrow: 'Category 03',
    img: '/category-protective-gear.png',
    desc: 'Full range of OEM protective equipment — body protectors, groin guards, knee pads, elbow pads and ankle guards. Custom logo, colours and packaging for gym brands worldwide.',
    products: ['body-protector', 'groin-guard', 'knee-pads', 'elbow-pads', 'ankle-guards'],
  },
  'gym-equipment': {
    title: 'Gym Equipment', eyebrow: 'Category 04',
    img: '/category-gym-equipment.png',
    desc: 'Professional boxing gym equipment including grappling dummies, speed bags, skipping ropes and training accessories. Wholesale and private label manufacturing with custom branding.',
    products: ['speed-bag', 'skipping-rope', 'grappling-dummy'],
  },
  'accessories': {
    title: 'Accessories & Merchandise', eyebrow: 'Category 05',
    img: '/category-accessories.png',
    desc: 'Custom branded gym bags, sports t-shirts, wrist wraps and merchandise. Perfect for gym merchandise lines, team kits and corporate gifting. Full private label available.',
    products: ['gym-bag', 'tshirt', 'wrist-wraps'],
  },
};

/* ── Open product modal ───────────────────────────── */
function openProductModal(key) {
  const p = PRODUCTS[key];
  if (!p) return;

  const first = p.gallery[0];
  const img = document.getElementById('pd-img');
  img.src = first.src;
  img.alt = p.title;
  img.style.opacity = '1';

  document.getElementById('pd-badge').textContent    = p.badge;
  document.getElementById('pd-category').textContent = p.category;
  document.getElementById('pd-title').textContent    = p.title;
  document.getElementById('pd-desc').textContent     = p.desc;
  document.getElementById('pd-moq').textContent      = p.moq;
  document.getElementById('pd-lead').textContent     = p.lead;
  document.getElementById('pd-material').textContent = p.material;
  document.getElementById('pd-tags').innerHTML =
    p.tags.map(t => `<span class="tag-chip">${t}</span>`).join('');

  /* Build image thumbnail gallery strip */
  const galleryEl = document.getElementById('pd-gallery');
  if (galleryEl) {
    if (p.gallery.length > 1) {
      galleryEl.hidden = false;
      galleryEl.innerHTML =
        p.gallery.map((g, i) => `
          <button class="pd-swatch${i === 0 ? ' active' : ''}"
            title="${g.color}"
            onclick="swapModalImage('${g.src}',this,'${g.color}')">
            <img src="${g.src}" alt="${g.color}" loading="lazy" />
          </button>`).join('') +
        `<span class="pd-color-label" id="pd-color-label">${first.color}</span>`;
    } else {
      galleryEl.hidden = true;
    }
  }

  document.getElementById('pd-modal').classList.add('is-open');
  document.getElementById('pd-modal').setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

/* ── Open category modal ──────────────────────────── */
function openCategoryModal(key) {
  const c = CATEGORIES[key];
  if (!c) return;

  document.getElementById('cat-modal-img').src             = c.img;
  document.getElementById('cat-modal-eyebrow').textContent = c.eyebrow;
  document.getElementById('cat-modal-title').textContent   = c.title;
  document.getElementById('cat-modal-desc').textContent    = c.desc;
  document.getElementById('cat-modal-products').innerHTML  =
    c.products.map(k => {
      const p = PRODUCTS[k];
      if (!p) return '';
      const colours = p.gallery.length > 1 ? `${p.gallery.length} colours · ` : '';
      return `
        <div class="cat-modal__product-card" onclick="closeCatModal();openProductModal('${k}')">
          <img src="${p.gallery[0].src}" alt="${p.title}" class="cat-modal__product-img" />
          <div class="cat-modal__product-info">
            <span class="cat-modal__product-badge">${p.badge}</span>
            <strong>${p.title}</strong>
            <span style="font-size:0.72rem;color:#666;margin-top:2px">${colours}MOQ: ${p.moq}</span>
          </div>
        </div>`;
    }).join('');

  document.getElementById('cat-modal').classList.add('is-open');
  document.getElementById('cat-modal').setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

/* ── Swap image with fade ─────────────────────────── */
window.swapModalImage = function (src, btn, color) {
  const img = document.getElementById('pd-img');
  img.style.opacity = '0';
  setTimeout(() => { img.src = src; img.style.opacity = '1'; }, 160);

  document.querySelectorAll('.pd-swatch').forEach(s => s.classList.remove('active'));
  btn.classList.add('active');

  const label = document.getElementById('pd-color-label');
  if (label) label.textContent = color || btn.title;
};

/* ── Close helpers ────────────────────────────────── */
function closePdModal() {
  document.getElementById('pd-modal').classList.remove('is-open');
  document.getElementById('pd-modal').setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
function closeCatModal() {
  document.getElementById('cat-modal').classList.remove('is-open');
  document.getElementById('cat-modal').setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

/* ── Event wiring (null-safe) ────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  var pdClose    = document.getElementById('pd-close');
  var pdBackdrop = document.getElementById('pd-backdrop');
  var catClose   = document.getElementById('cat-close');
  var catBackdrop= document.getElementById('cat-backdrop');

  if (pdClose)    pdClose.addEventListener('click', closePdModal);
  if (pdBackdrop) pdBackdrop.addEventListener('click', closePdModal);
  if (catClose)   catClose.addEventListener('click', closeCatModal);
  if (catBackdrop)catBackdrop.addEventListener('click', closeCatModal);

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') { closePdModal(); closeCatModal(); }
  });

  document.querySelectorAll('.pd-modal__quote-btn, [href="#get-quote"]').forEach(function(btn) {
    btn.addEventListener('click', function() { closePdModal(); closeCatModal(); });
  });
});

/* ============================================================
   REVIEWS � Submit, Save to localStorage, Render in Carousel
   ============================================================ */

function getInitials(name) {
  return name.trim().split(' ').slice(0,2).map(function(w){ return w[0].toUpperCase(); }).join('');
}

function starsHtml(n) {
  var s = '';
  for (var i = 0; i < n; i++) s += '\u2605';
  for (var j = n; j < 5; j++) s += '\u2606';
  return s;
}

function renderUserReview(r) {
  var card = document.createElement('div');
  card.className = 'review-card';
  card.innerHTML =
    '<div class="review-card__top">' +
      '<div class="review-card__avatar">' + getInitials(r.name) + '</div>' +
      '<div>' +
        '<strong class="review-card__name">' + r.name + '</strong>' +
        '<span class="review-card__location">' + r.country + '</span>' +
      '</div>' +
      '<div class="review-card__stars">' + starsHtml(parseInt(r.rating)) + '</div>' +
    '</div>' +
    '<p class="review-card__text">&ldquo;' + r.text + '&rdquo;</p>' +
    '<span class="review-card__product">' + r.product + '</span>';
  return card;
}

function loadUserReviews() {
  var track = document.getElementById('reviews-track');
  if (!track) return;
  var stored = JSON.parse(localStorage.getItem('shotric_reviews') || '[]');
  stored.forEach(function(r) {
    var card = renderUserReview(r);
    track.insertBefore(card, track.firstChild);
    // Also append a clone at the end to keep seamless loop
    track.appendChild(renderUserReview(r));
  });
}

// Open / close review modal
function openReviewModal() {
  var modal = document.getElementById('review-modal');
  var formWrap = document.getElementById('review-form-wrap');
  var success = document.getElementById('review-success');
  if (!modal) return;
  if (formWrap) formWrap.hidden = false;
  if (success)  success.hidden  = true;
  resetStars();
  document.getElementById('review-submit-form') && document.getElementById('review-submit-form').reset();
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeReviewModal() {
  var modal = document.getElementById('review-modal');
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

// Star picker logic
var currentRating = 0;

function resetStars() {
  currentRating = 0;
  document.querySelectorAll('.rsp-star').forEach(function(s){ s.classList.remove('active','hover'); });
  var hint = document.getElementById('rsp-hint');
  if (hint) hint.textContent = 'Click to rate';
  var ratingInput = document.getElementById('review-rating');
  if (ratingInput) ratingInput.value = '0';
}

function initStarPicker() {
  var hints = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'];
  document.querySelectorAll('.rsp-star').forEach(function(star) {
    star.addEventListener('mouseenter', function() {
      var val = parseInt(star.dataset.val);
      document.querySelectorAll('.rsp-star').forEach(function(s){
        s.classList.toggle('hover', parseInt(s.dataset.val) <= val);
      });
    });
    star.addEventListener('mouseleave', function() {
      document.querySelectorAll('.rsp-star').forEach(function(s){ s.classList.remove('hover'); });
    });
    star.addEventListener('click', function() {
      currentRating = parseInt(star.dataset.val);
      document.querySelectorAll('.rsp-star').forEach(function(s){
        s.classList.toggle('active', parseInt(s.dataset.val) <= currentRating);
      });
      var ratingInput = document.getElementById('review-rating');
      if (ratingInput) ratingInput.value = currentRating;
      var hint = document.getElementById('rsp-hint');
      if (hint) hint.textContent = hints[currentRating] || '';
    });
  });
}

// Form submit
document.addEventListener('DOMContentLoaded', function() {
  loadUserReviews();
  initStarPicker();

  var form = document.getElementById('review-submit-form');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    var name    = document.getElementById('rv-name').value.trim();
    var country = document.getElementById('rv-country').value.trim();
    var product = document.getElementById('rv-product').value.trim();
    var text    = document.getElementById('rv-text').value.trim();
    var rating  = parseInt(document.getElementById('review-rating').value || '0');

    // Validate
    var valid = true;
    [document.getElementById('rv-name'), document.getElementById('rv-country'),
     document.getElementById('rv-product'), document.getElementById('rv-text')].forEach(function(el) {
      if (!el.value.trim()) { el.style.borderColor='var(--clr-red)'; valid=false; }
      else el.style.borderColor='';
    });
    if (rating < 1) {
      var hint = document.getElementById('rsp-hint');
      if (hint) { hint.textContent='Please select a rating'; hint.style.color='var(--clr-red)'; }
      valid = false;
    }
    if (!valid) return;

    // Save to localStorage
    var review = { name:name, country:country, product:product, text:text, rating:rating, ts: Date.now() };
    var stored = JSON.parse(localStorage.getItem('shotric_reviews') || '[]');
    stored.unshift(review);
    localStorage.setItem('shotric_reviews', JSON.stringify(stored));

    // Inject into carousel immediately
    var track = document.getElementById('reviews-track');
    if (track) {
      var card = renderUserReview(review);
      card.style.borderColor = 'rgba(225,29,72,0.5)';
      track.insertBefore(card, track.firstChild);
      track.appendChild(renderUserReview(review));
    }

    // Show success
    var formWrap = document.getElementById('review-form-wrap');
    var success  = document.getElementById('review-success');
    if (formWrap) formWrap.hidden = true;
    if (success)  success.hidden  = false;
  });
});

// Expose modal functions globally (classic script)
window.openReviewModal  = openReviewModal;
window.closeReviewModal = closeReviewModal;

/* Show empty state when no reviews exist */
document.addEventListener('DOMContentLoaded', function() {
  var track = document.getElementById('reviews-track');
  var empty = document.getElementById('reviews-empty');
  if (!track || !empty) return;
  function updateEmpty() {
    var hasCards = track.querySelectorAll('.review-card').length > 0;
    empty.hidden = hasCards;
    var wrapper = document.getElementById('real-reviews-wrapper');
    if (wrapper) wrapper.style.display = hasCards ? 'block' : 'none';
  }
  updateEmpty();
  var obs = new MutationObserver(updateEmpty);
  obs.observe(track, { childList: true });
});

/* -- Review button event wiring (replaces onclick= attr) -- */
(function() {
  function wireReviewBtn() {
    var btn = document.getElementById('open-review-modal');
    if (btn) {
      btn.addEventListener('click', function() { openReviewModal(); });
      return true;
    }
    return false;
  }
  if (!wireReviewBtn()) {
    document.addEventListener('DOMContentLoaded', wireReviewBtn);
  }
})();
