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

  /* ── 2. Mobile Menu Toggle ───────────────────────────── */
  const hamburger  = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  const toggleMobileMenu = () => {
    const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!isOpen));
    hamburger.classList.toggle('open', !isOpen);
    mobileMenu.classList.toggle('open', !isOpen);
    mobileMenu.setAttribute('aria-hidden', String(isOpen));
    document.body.style.overflow = isOpen ? '' : 'hidden';
  };

  hamburger?.addEventListener('click', toggleMobileMenu);
  mobileMenu?.addEventListener('click', e => {
    if (e.target === mobileMenu) toggleMobileMenu();
  });
  mobileMenu?.querySelectorAll('.mobile-nav-link:not(.mobile-accordion__trigger), .mobile-sub-link, .btn--full').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileMenu.classList.contains('open')) toggleMobileMenu();
    });
  });

  /* ── 3. Mobile Accordion (Products) ─────────────────── */
  const accordionTrigger = document.getElementById('mobile-nav-products');
  const accordionBody    = document.getElementById('mobile-products-body');
  accordionTrigger?.addEventListener('click', () => {
    const expanded = accordionTrigger.getAttribute('aria-expanded') === 'true';
    accordionTrigger.setAttribute('aria-expanded', String(!expanded));
    if (expanded) {
      accordionBody.setAttribute('hidden', '');
    } else {
      accordionBody.removeAttribute('hidden');
    }
  });

  /* ── 4. Stat Counter Animation ───────────────────────── */
  const animateCounter = (el, target) => {
    const duration = 2000;
    const start    = performance.now();
    const isFloat  = target % 1 !== 0;
    const step = now => {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const value = isFloat ? (target * ease).toFixed(1) : Math.round(target * ease);
      el.textContent = value;
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  /* ── 5. Intersection Observer ────────────────────────── */
  const observerOptions = { threshold: 0.15, rootMargin: '0px 0px -60px 0px' };
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  ['.service-card', '.product-category', '.mfg-feature', '.stat-item', '.section-header', '.hero__badge', '.cert-badge'].forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.08}s`;
      revealObserver.observe(el);
    });
  });

  const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const numEl  = entry.target.querySelector('.stat-number');
        const target = parseFloat(numEl?.dataset.target || '0');
        if (numEl && !numEl.dataset.animated) {
          numEl.dataset.animated = 'true';
          animateCounter(numEl, target);
        }
        statObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-item').forEach(el => statObserver.observe(el));

  /* ── 6. Quote Form ───────────────────────────────────── */
  const quoteForm = document.getElementById('quote-form');
  const submitBtn = document.getElementById('quote-submit-btn');

  quoteForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const required = quoteForm.querySelectorAll('[required]');
    let valid = true;
    required.forEach(field => {
      if (!field.value.trim()) {
        valid = false;
        field.style.borderColor = 'var(--clr-red)';
        field.style.boxShadow = '0 0 0 3px rgba(225,29,72,0.25)';
        const handler = () => {
          field.style.borderColor = '';
          field.style.boxShadow = '';
          field.removeEventListener('input', handler);
        };
        field.addEventListener('input', handler);
      }
    });
    if (!valid) {
      quoteForm.querySelector('[required]:placeholder-shown, [required]:not(:valid)')?.focus();
      return;
    }
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg> Sending...`;
    submitBtn.style.opacity = '0.7';
    await new Promise(r => setTimeout(r, 1800));
    submitBtn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Quote Sent! We'll be in touch within 24h`;
    submitBtn.style.background = 'linear-gradient(135deg, #059669, #047857)';
    submitBtn.style.opacity = '1';
    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
      quoteForm.reset();
    }, 5000);
  });

  /* ── 7. Smooth Anchor Scrolling ──────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) + 40 || 120;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── 8. Active Nav Link Highlighting ─────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('nav-link--active',
            link.getAttribute('href') === `/${id}` || link.getAttribute('href') === `#${id}`
          );
        });
      }
    });
  }, { threshold: 0.4, rootMargin: '-80px 0px -50% 0px' });
  sections.forEach(s => navObserver.observe(s));

  /* ── 9. Input Focus Effects ──────────────────────────── */
  document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('focus', () => input.closest('.form-group')?.classList.add('focused'));
    input.addEventListener('blur',  () => input.closest('.form-group')?.classList.remove('focused'));
  });

  /* ── 10. Keyboard Trap for Mobile Menu ───────────────── */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobileMenu?.classList.contains('open')) {
      toggleMobileMenu();
      hamburger?.focus();
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

}); // end DOMContentLoaded

/* ══════════════════════════════════════════════════════
   PRODUCT & CATEGORY MODALS
   ══════════════════════════════════════════════════════ */

const PRODUCTS = {
  'boxing-gloves': {
    title: 'Pro Boxing Gloves', category: 'Combat Sports', badge: 'OEM / Private Label',
    gallery: [
      { src: '/boxing-gloves-shotric.png',    color: 'Black / Red',    swatch: '#2a0a0a' },
      { src: '/boxing-gloves-action.png',     color: 'Action Shot',    swatch: '#111' },
      { src: '/boxing-gloves-flatlay.png',    color: 'Flat Lay',       swatch: '#222' },
      { src: '/boxing-gloves-red.png',        color: 'Red / White',    swatch: '#E11D48' },
      { src: '/boxing-gloves-blue.png',       color: 'Royal Blue',     swatch: '#1a3cad' },
      { src: '/boxing-gloves-white-gold.png', color: 'White / Gold',   swatch: '#d4b858' },
      { src: '/boxing-gloves-green.png',      color: 'Forest Green',   swatch: '#1a4a2a' },
      { src: '/boxing-gloves-gold.png',       color: 'Gold / Black',   swatch: '#c9a227' },
      { src: '/boxing-gloves-purple.png',     color: 'Purple / Silver',swatch: '#6b21a8' },
    ],
    desc: 'Premium full-grain leather boxing gloves engineered for training and competition. Multi-layer foam padding, reinforced thumb, and custom logo embossing available. Used by gyms and brands in 35+ countries.',
    moq: '25 pairs', lead: '30–45 days', material: 'Full-grain leather',
    tags: ['OEM', 'Private Label', 'Custom Logo', 'Wholesale', 'Export Ready'],
  },
  'mma-gloves': {
    title: 'MMA Sparring Gloves', category: 'Combat Sports', badge: 'Private Label',
    gallery: [
      { src: '/mma-gloves-shotric.png', color: 'Black / Red',  swatch: '#2a0a0a' },
      { src: '/mma-gloves-action.png',  color: 'Action Shot',  swatch: '#111' },
      { src: '/mma-gloves-red.png',     color: 'Deep Red',     swatch: '#E11D48' },
      { src: '/mma-gloves-blue.png',    color: 'Royal Blue',   swatch: '#1a3cad' },
      { src: '/mma-gloves-gold.png',    color: 'Gold / Black', swatch: '#c9a227' },
    ],
    desc: 'Open-palm MMA grappling gloves with reinforced knuckle protection. Available in 4oz–7oz weights. Full custom branding, colour and sizing options for gyms and fight brands.',
    moq: '25 pairs', lead: '30–45 days', material: 'Full-grain leather',
    tags: ['MMA', 'Grappling', 'Private Label', 'Custom Sizes', 'OEM'],
  },
  'head-guards': {
    title: 'Professional Head Guard', category: 'Combat Sports', badge: 'OEM',
    gallery: [
      { src: '/head-guard-shotric.png', color: 'Black / Red',  swatch: '#2a0a0a' },
      { src: '/head-guard-side.png',    color: 'Side View',    swatch: '#111' },
      { src: '/head-guard-red.png',     color: 'Bold Red',     swatch: '#E11D48' },
      { src: '/head-guard-blue.png',    color: 'Royal Blue',   swatch: '#1a3cad' },
      { src: '/head-guard-gold.png',    color: 'Gold / Black', swatch: '#c9a227' },
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
      { src: '/punch-mitts-shotric.png', color: 'Black / Red', swatch: '#2a0a0a' },
      { src: '/punch-mitts-gold.png',    color: 'Gold / Black', swatch: '#c9a227' },
      { src: '/punch-mitts-blue.png',    color: 'Royal Blue',  swatch: '#1a3cad' },
      { src: '/punch-mitts-red.png',     color: 'Bold Red',    swatch: '#E11D48' },
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
      { src: '/shin-guards-shotric.png', color: 'Black / Red',  swatch: '#2a0a0a' },
      { src: '/shin-guards-white.png',   color: 'White / Red',  swatch: '#e8e8e8' },
      { src: '/shin-guards-red.png',     color: 'Bold Red',     swatch: '#E11D48' },
      { src: '/shin-guards-blue.png',    color: 'Royal Blue',   swatch: '#1a3cad' },
      { src: '/shin-guards-gold.png',    color: 'Gold / Black', swatch: '#c9a227' },
    ],
    desc: 'Full-length shin and instep protection for Muay Thai, kickboxing and MMA. Custom logo, colours and padding thickness.',
    moq: '25 pairs', lead: '30–45 days', material: 'Full-grain leather',
    tags: ['Muay Thai', 'MMA', 'OEM', 'Custom', 'Kickboxing'],
  },
  'tracksuits': {
    title: 'Custom Tracksuit Set', category: 'Apparel', badge: 'Full Custom',
    gallery: [
      { src: '/tracksuit-shotric.png', color: 'Black / Red',    swatch: '#2a0a0a' },
      { src: '/tracksuit-navy.png',    color: 'Navy / Silver',  swatch: '#0f1f4a' },
      { src: '/tracksuit-blue.png',    color: 'Royal Blue',     swatch: '#1a3cad' },
      { src: '/tracksuit-red.png',     color: 'Bold Red',       swatch: '#E11D48' },
      { src: '/tracksuit-white.png',   color: 'White / Navy',   swatch: '#c8c8c8' },
      { src: '/tracksuit-gold.png',    color: 'Gold / Black',   swatch: '#c9a227' },
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
    img: '/boxing-gloves-shotric.png',
    desc: 'Factory-direct manufacturing of premium boxing, MMA and combat sports equipment. All products available in OEM, private label and wholesale.',
    products: ['boxing-gloves', 'mma-gloves', 'head-guards', 'hand-wraps', 'punch-mitts', 'heavy-bag', 'shin-guards', 'muay-thai-pads', 'kick-shield', 'bjj-gi', 'boxing-shoes'],
  },
  'apparel': {
    title: 'Combat Sports Apparel', eyebrow: 'Category 02',
    img: '/tracksuit-shotric.png',
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

/* ── Global exports — must be assigned FIRST so onclick= attrs always work ─── */
window.openProductModal  = openProductModal;
window.openCategoryModal = openCategoryModal;
window.closePdModal      = closePdModal;
window.closeCatModal     = closeCatModal;

/* ── Event wiring (null-safe) ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  const pdClose    = document.getElementById('pd-close');
  const pdBackdrop = document.getElementById('pd-backdrop');
  const catClose   = document.getElementById('cat-close');
  const catBackdrop= document.getElementById('cat-backdrop');

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
