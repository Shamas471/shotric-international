// Header component
import { categories } from '../data/categories.js';
import { searchProducts } from '../data/products.js';

export function renderHeader() {
  return `
    <div class="header glass" id="main-header">
      <div class="container header__inner">
        <a href="#/" class="header__logo" aria-label="Shotric International Home">
          <img src="/assets/logo.png" alt="Shotric International" class="header__logo-img" width="220" height="60" />
        </a>

        <nav class="header__nav" aria-label="Main navigation">
          <a href="#/" class="header__link">Home</a>
          <div class="header__dropdown">
            <button class="header__link header__dropdown-trigger" aria-expanded="false">
              Categories <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor"><path d="M2 4l4 4 4-4"/></svg>
            </button>
            <div class="header__dropdown-menu glass">
              ${categories.map(c => `
                <a href="#/category/${c.id}" class="header__dropdown-item">
                  <span class="header__dropdown-icon">${c.icon}</span>
                  <span>${c.name}</span>
                </a>
              `).join('')}
            </div>
          </div>
          <a href="#/contact" class="header__link">Contact</a>
          <a href="#/admin" class="header__link" style="color:var(--color-primary-light);">⚙ Admin</a>
        </nav>

        <div class="header__search">
          <div class="search-bar" id="header-search">
            <svg class="search-bar__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input type="text" class="search-bar__input" placeholder="Search products, art numbers..." id="search-input" autocomplete="off" />
            <div class="search-bar__results" id="search-results"></div>
          </div>
        </div>

        <button class="header__hamburger" id="hamburger-btn" aria-label="Open menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>

    <!-- Mobile Nav Overlay -->
    <div class="mobile-nav" id="mobile-nav">
      <div class="mobile-nav__header">
        <img src="/assets/logo.png" alt="Shotric International" width="180" height="50" style="mix-blend-mode:lighten;filter:brightness(1.1);" />
        <button class="mobile-nav__close" id="mobile-nav-close" aria-label="Close menu">&times;</button>
      </div>
      <div class="mobile-search">
        <div class="search-bar">
          <svg class="search-bar__icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
          <input type="text" class="search-bar__input" placeholder="Search..." id="mobile-search-input" autocomplete="off" />
          <div class="search-bar__results" id="mobile-search-results"></div>
        </div>
      </div>
      <nav class="mobile-nav__links">
        <a href="#/" class="mobile-nav__link">Home</a>
        <div class="mobile-nav__section-title">Categories</div>
        ${categories.map(c => `<a href="#/category/${c.id}" class="mobile-nav__link">${c.icon} ${c.name}</a>`).join('')}
        <a href="#/contact" class="mobile-nav__link">Contact Us</a>
        <a href="#/admin" class="mobile-nav__link" style="color:var(--color-primary-light);">⚙ Admin Panel</a>
      </nav>
      <div class="mobile-nav__footer">
        <a href="https://wa.me/923266849167" target="_blank" class="btn btn-whatsapp btn-sm" rel="noopener">💬 WhatsApp Inquiry</a>
      </div>
    </div>
  `;
}

export function initHeader() {
  const header = document.getElementById('main-header');
  const hamburger = document.getElementById('hamburger-btn');
  const mobileNav = document.getElementById('mobile-nav');
  const mobileClose = document.getElementById('mobile-nav-close');

  // Sticky header scroll effect
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
    lastScroll = scrollY;
  }, { passive: true });

  // Hamburger toggle
  hamburger?.addEventListener('click', () => {
    mobileNav.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  mobileClose?.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    document.body.style.overflow = '';
  });

  // Close mobile nav on link click
  mobileNav?.querySelectorAll('.mobile-nav__link').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Categories dropdown
  const trigger = document.querySelector('.header__dropdown-trigger');
  const dropdownMenu = document.querySelector('.header__dropdown-menu');
  trigger?.addEventListener('click', (e) => {
    e.stopPropagation();
    const expanded = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', !expanded);
    dropdownMenu.classList.toggle('show');
  });

  document.addEventListener('click', () => {
    trigger?.setAttribute('aria-expanded', 'false');
    dropdownMenu?.classList.remove('show');
  });

  // Search functionality
  initSearch('search-input', 'search-results');
  initSearch('mobile-search-input', 'mobile-search-results');
}

function initSearch(inputId, resultsId) {
  const input = document.getElementById(inputId);
  const results = document.getElementById(resultsId);
  if (!input || !results) return;

  let debounceTimer;
  input.addEventListener('input', () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      const query = input.value;
      if (query.length < 2) {
        results.classList.remove('active');
        results.innerHTML = '';
        return;
      }
      const matches = searchProducts(query);
      if (matches.length === 0) {
        results.innerHTML = '<div class="search-result-item"><span class="search-result-item__name">No products found</span></div>';
        results.classList.add('active');
        return;
      }
      results.innerHTML = matches.map(p => `
        <a href="#/product/${p.id}" class="search-result-item">
          <div class="search-result-item__image skeleton"></div>
          <div>
            <div class="search-result-item__name">${p.name}</div>
            <div class="search-result-item__art">${p.artNumber} · ${p.material}</div>
          </div>
        </a>
      `).join('');
      results.classList.add('active');

      // Close on click
      results.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
          results.classList.remove('active');
          input.value = '';
          // Close mobile nav if open
          document.getElementById('mobile-nav')?.classList.remove('open');
          document.body.style.overflow = '';
        });
      });
    }, 250);
  });

  // Close results on outside click
  document.addEventListener('click', (e) => {
    if (!input.contains(e.target) && !results.contains(e.target)) {
      results.classList.remove('active');
    }
  });
}
