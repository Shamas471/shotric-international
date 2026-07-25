/* ═══════════════════════════════════════════════════════════════
   SHOTRIC INTERNATIONAL — LANDING PAGE ANIMATION ENGINE
   ═══════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── 1. SCROLL-REVEAL OBSERVER ──────────────────────────────── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('sr-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  function initScrollReveal() {
    const selectors = [
      '.hero__badge', '.hero__heading', '.hero__subheading',
      '.hero__feature-pill', '.hero__cta-group', '.stats-bar__inner',
      '.stat-card', '.section-header', '.cat-card', '.product-card',
      '.about__img', '.about__content', '.trust-badge',
      '.testimonial-card', '.process-step', '.categories__footer',
      'form', '.footer__col',
    ];
    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el, i) => {
        if (!el.classList.contains('sr-init')) {
          el.classList.add('sr-init');
          el.style.transitionDelay = `${i * 0.07}s`;
          revealObserver.observe(el);
        }
      });
    });
  }

  /* ── 2. HERO TYPING EFFECT ──────────────────────────────────── */
  function initTypingEffect() {
    const heading = document.getElementById('hero-heading');
    if (!heading) return;
    const words = ['Boxing Gloves.', 'MMA Gear.', 'Combat Apparel.', 'Private Label.', 'Your Brand.'];
    let wordIdx = 0, charIdx = 0, deleting = false;

    let span = heading.querySelector('.hero__typed');
    if (!span) {
      span = document.createElement('span');
      span.className = 'hero__typed';
      heading.appendChild(span);
    }

    function tick() {
      const word = words[wordIdx % words.length];
      if (deleting) { charIdx--; span.textContent = word.substring(0, charIdx); }
      else          { charIdx++; span.textContent = word.substring(0, charIdx); }
      let delay = deleting ? 50 : 90;
      if (!deleting && charIdx === word.length) { delay = 1800; deleting = true; }
      else if (deleting && charIdx === 0)       { deleting = false; wordIdx++; delay = 350; }
      setTimeout(tick, delay);
    }
    setTimeout(tick, 1400);
  }

  /* ── 3. ANIMATED STAT COUNTERS ──────────────────────────────── */
  function animateCounter(el) {
    const target = parseInt(el.dataset.target || el.textContent, 10);
    if (isNaN(target)) return;
    const suffix   = el.dataset.suffix || (el.textContent.includes('+') ? '+' : '');
    const duration = 1800;
    const startTime = performance.now();
    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  function initCounters() {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          /* Match both old and new stat number patterns */
          entry.target.querySelectorAll('.stat-number, .stat-card__number, [data-counter]').forEach((n) => {
            const target = parseInt(n.dataset.target || n.textContent, 10);
            if (isNaN(target) || target === 0) return;
            const suffix = n.nextElementSibling ? n.nextElementSibling.textContent : (n.dataset.suffix || '');
            const duration = 1800;
            const startTime = performance.now();
            function update(now) {
              const progress = Math.min((now - startTime) / duration, 1);
              const eased    = 1 - Math.pow(1 - progress, 3);
              n.textContent  = Math.floor(eased * target);
              if (progress < 1) requestAnimationFrame(update);
            }
            requestAnimationFrame(update);
          });
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    const statsBar = document.getElementById('stats-bar');
    if (statsBar) counterObserver.observe(statsBar);
  }


  /* ── 4. FLOATING PARTICLE SYSTEM ────────────────────────────── */
  function initParticles() {
    const container = document.getElementById('hero-particles');
    if (!container) return;
    const COUNT = 28;
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < COUNT; i++) {
      const p = document.createElement('span');
      p.className = 'hero__particle';
      const size = Math.random() * 4 + 1.5;
      Object.assign(p.style, {
        width: `${size}px`, height: `${size}px`,
        left: `${Math.random() * 100}%`, bottom: `-${size}px`,
        animationDelay: `${Math.random() * 8}s`,
        animationDuration: `${Math.random() * 12 + 10}s`,
        opacity: Math.random() * 0.35 + 0.05,
      });
      fragment.appendChild(p);
    }
    container.appendChild(fragment);
  }

  /* ── 5. MAGNETIC BUTTON EFFECT ──────────────────────────────── */
  function initMagneticButtons() {
    document.querySelectorAll('.btn--primary, .btn--ghost, .cat-card__cta').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px) scale(1.04)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ── 6. HERO ORB PARALLAX ───────────────────────────────────── */
  function initOrbParallax() {
    const orb1 = document.querySelector('.hero__orb--1');
    const orb2 = document.querySelector('.hero__orb--2');
    if (!orb1 || !orb2) return;
    document.addEventListener('mousemove', (e) => {
      const dx = (e.clientX - window.innerWidth  / 2) / window.innerWidth;
      const dy = (e.clientY - window.innerHeight / 2) / window.innerHeight;
      orb1.style.transform = `translate(${dx * 30}px, ${dy * 20}px)`;
      orb2.style.transform = `translate(${-dx * 20}px, ${-dy * 15}px)`;
    });
  }

  /* ── 7. NAV SCROLL SHRINK ───────────────────────────────────── */
  function initNavScroll() {
    const nav = document.querySelector('.navbar') || document.querySelector('nav');
    if (!nav) return;
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          nav.classList.toggle('navbar--scrolled', window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── 8. CATEGORY CARD 3D TILT ───────────────────────────────── */
  function initCardTilt() {
    document.querySelectorAll('.cat-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg) scale(1.02)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.5s ease';
        setTimeout(() => (card.style.transition = ''), 500);
      });
    });
  }

  /* ── 9. STAGGERED SECTION HEADINGS ─────────────────────────── */
  function initSplitText() {
    document.querySelectorAll('.section-title').forEach((el) => {
      if (el.dataset.split) return;
      el.dataset.split = 'true';
      const words = el.textContent.trim().split(' ');
      el.innerHTML = words
        .map((w, i) => `<span class="word-wrap"><span class="word" style="transition-delay:${0.05 * i}s">${w}</span></span>`)
        .join(' ');
    });
  }

  /* ── 10. SCROLL PROGRESS BAR ────────────────────────────────── */
  function initScrollProgress() {
    const bar = document.createElement('div');
    bar.id = 'scroll-progress';
    bar.style.cssText = `
      position:fixed; top:0; left:0; height:2px; width:0%;
      background:linear-gradient(90deg,#E11D48,#ff6b8a,#E11D48);
      background-size:200% 100%;
      animation: progress-shimmer 2s linear infinite;
      z-index:9999; transition:width 0.1s linear;
      box-shadow: 0 0 8px rgba(225,29,72,0.6);
    `;
    document.body.prepend(bar);
    const style = document.createElement('style');
    style.textContent = `@keyframes progress-shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }`;
    document.head.appendChild(style);
    window.addEventListener('scroll', () => {
      const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      bar.style.width = `${pct}%`;
    }, { passive: true });
  }

  /* ── 11. HERO IMAGE PARALLAX ────────────────────────────────── */
  function initHeroParallax() {
    const img = document.querySelector('.hero__bg-image img');
    if (!img) return;
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        img.style.transform = `translateY(${y * 0.25}px) scale(1.08)`;
      }
    }, { passive: true });
  }

  /* ── 12. CURSOR GLOW ────────────────────────────────────────── */
  function initCursorGlow() {
    const dot = document.createElement('div');
    dot.id = 'cursor-glow';
    dot.style.cssText = `
      position:fixed; width:200px; height:200px; border-radius:50%;
      background:radial-gradient(circle, rgba(225,29,72,0.08) 0%, transparent 70%);
      pointer-events:none; z-index:0; transform:translate(-50%,-50%);
      transition:opacity 0.3s ease;
    `;
    document.body.appendChild(dot);
    document.addEventListener('mousemove', (e) => {
      dot.style.left = e.clientX + 'px';
      dot.style.top  = e.clientY + 'px';
    });
    document.addEventListener('mouseleave', () => { dot.style.opacity = '0'; });
    document.addEventListener('mouseenter', () => { dot.style.opacity = '1'; });
  }

  /* ── INIT ALL ───────────────────────────────────────────────── */
  function init() {
    initScrollReveal();
    initParticles();
    initCounters();
    initNavScroll();
    initOrbParallax();
    initMagneticButtons();
    initCardTilt();
    initSplitText();
    initScrollProgress();
    initHeroParallax();
    initCursorGlow();
    setTimeout(initTypingEffect, 600);
    document.addEventListener('click', () => setTimeout(initScrollReveal, 300));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


/* ═══════════════════════════════════════════════════════════════
   PRODUCT SHOWCASE SLIDER ENGINE
   ═══════════════════════════════════════════════════════════════ */
(function () {
  const INTERVAL = 3500;

  function initProductSlider() {
    const slides   = Array.from(document.querySelectorAll('.ps-slide'));
    const thumbs   = Array.from(document.querySelectorAll('.ps-thumb'));
    const dotsWrap = document.getElementById('ps-dots');
    const prevBtn  = document.getElementById('ps-prev');
    const nextBtn  = document.getElementById('ps-next');
    if (!slides.length) return;

    let current = 0;
    let timer   = null;

    /* Build dot indicators */
    if (dotsWrap) {
      slides.forEach((_, i) => {
        const d = document.createElement('button');
        d.className = 'ps-dot' + (i === 0 ? ' active' : '');
        d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        d.addEventListener('click', () => { goTo(i); restartTimer(); });
        dotsWrap.appendChild(d);
      });
    }

    function getDots() {
      return dotsWrap ? Array.from(dotsWrap.querySelectorAll('.ps-dot')) : [];
    }

    /* ── Only scrolls the thumbs strip horizontally — NEVER the page ── */
    function scrollThumbStrip(idx) {
      const bar   = document.getElementById('ps-thumbs');
      const thumb = thumbs[idx];
      if (!bar || !thumb) return;
      const barRect   = bar.getBoundingClientRect();
      const thumbRect = thumb.getBoundingClientRect();
      const offset    = thumbRect.left - barRect.left;
      const ideal     = bar.scrollLeft + offset - barRect.width / 2 + thumbRect.width / 2;
      bar.scrollTo({ left: ideal, behavior: 'smooth' });
    }

    function goTo(idx) {
      const prev = current;
      current = (idx + slides.length) % slides.length;
      if (prev === current) return;

      slides[prev].classList.add('exit');
      slides[prev].classList.remove('active');
      setTimeout(() => slides[prev].classList.remove('exit'), 600);

      slides[current].classList.add('active');
      getDots().forEach((d, i) => d.classList.toggle('active', i === current));
      thumbs.forEach((t, i) => t.classList.toggle('active', i === current));

      /* Scroll ONLY the thumbnail strip — never the page scroll position */
      scrollThumbStrip(current);
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startTimer()   { timer = setInterval(next, INTERVAL); }
    function stopTimer()    { clearInterval(timer); timer = null; }
    function restartTimer() { stopTimer(); startTimer(); }

    /* ── Pause auto-play while user is scrolling the page ────────
       Resumes automatically 1.5 s after scrolling stops.          */
    let scrollPauseId = null;
    window.addEventListener('scroll', () => {
      stopTimer();
      clearTimeout(scrollPauseId);
      scrollPauseId = setTimeout(startTimer, 1500);
    }, { passive: true });

    /* Arrow buttons */
    if (prevBtn) prevBtn.addEventListener('click', () => { prev(); restartTimer(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { next(); restartTimer(); });

    /* Global for thumbnail onclick attributes in HTML */
    window.psGoTo = (idx) => { goTo(idx); restartTimer(); };

    /* Touch swipe — only fires on clear horizontal swipes */
    const track = document.getElementById('ps-track');
    if (track) {
      let sx = 0, sy = 0;
      track.addEventListener('touchstart', (e) => {
        sx = e.changedTouches[0].clientX;
        sy = e.changedTouches[0].clientY;
      }, { passive: true });
      track.addEventListener('touchend', (e) => {
        const dx = sx - e.changedTouches[0].clientX;
        const dy = sy - e.changedTouches[0].clientY;
        /* Only treat as slide if horizontal movement dominates vertical */
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
          dx > 0 ? next() : prev();
          restartTimer();
        }
      }, { passive: true });
    }

    /* Keyboard — only fires when slider panel is actually visible */
    document.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      const slider = document.getElementById('ps-slider');
      if (!slider) return;
      const r = slider.getBoundingClientRect();
      if (r.top >= window.innerHeight || r.bottom <= 0) return;
      e.preventDefault();
      e.key === 'ArrowLeft' ? prev() : next();
      restartTimer();
    });

    startTimer();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProductSlider);
  } else {
    initProductSlider();
  }
})();
