// SPA Router + App initialization
import { renderHeader, initHeader } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { renderHome } from './pages/home.js';
import { renderCategory } from './pages/category.js';
import { renderProduct } from './pages/product.js';
import { renderContact, initContactForm } from './pages/contact.js';
import { renderAdmin, initAdmin } from './pages/admin.js';

// Mount layout
function mountLayout() {
  document.getElementById('site-header').innerHTML = renderHeader();
  document.getElementById('site-footer').innerHTML = renderFooter();
  initHeader();
}

// Router
function route() {
  const hash = window.location.hash || '#/';
  const pageContent = document.getElementById('page-content');

  // Parse route
  let html = '';
  let afterRender = null;

  if (hash === '#/' || hash === '' || hash === '#') {
    html = renderHome();
  } else if (hash.startsWith('#/category/')) {
    const parts = hash.replace('#/category/', '').split('/');
    const categoryId = parts[0];
    const sub = parts[1] || null;
    html = renderCategory(categoryId, sub);
  } else if (hash.startsWith('#/product/')) {
    const productId = hash.replace('#/product/', '');
    html = renderProduct(productId);
  } else if (hash === '#/contact') {
    html = renderContact();
    afterRender = initContactForm;
  } else if (hash === '#/admin') {
    html = renderAdmin();
    afterRender = initAdmin;
  } else {
    html = `
      <div class="container section">
        <div class="empty-state">
          <div class="empty-state__icon">🔍</div>
          <h2 class="empty-state__title">Page Not Found</h2>
          <p class="empty-state__desc">The page you're looking for doesn't exist.</p>
          <a href="#/" class="btn btn-primary" style="margin-top:1rem;">Go Home</a>
        </div>
      </div>
    `;
  }

  pageContent.innerHTML = html;
  if (afterRender) afterRender();

  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });

  // Initialize intersection observer for animations
  initScrollAnimations();
}

// Subcategory navigation helper (used by category page onclick)
window.navigateSubcategory = function (categoryId, subId) {
  if (subId) {
    window.location.hash = `#/category/${categoryId}/${subId}`;
  } else {
    window.location.hash = `#/category/${categoryId}`;
  }
};

// Scroll-triggered animations
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.float-in, .float-in-left, .float-in-right, .stagger-children').forEach(el => {
    observer.observe(el);
  });
}

// Initialize app
function init() {
  mountLayout();
  route();
  window.addEventListener('hashchange', route);
}

// Boot
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
