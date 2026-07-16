// Product Detail Page
import { getProductById, getProductsBySubcategory } from '../data/products.js';
import { getCategoryById } from '../data/categories.js';
import { renderProductCard } from '../components/productCard.js';

// Map subcategories to their stock images (same as productCard.js)
const subcategoryImages = {
  'professional': ['/assets/products/boxing-gloves-hero.jpg', '/assets/products/boxing-gloves-2.jpg', '/assets/products/boxing-gloves-3.jpg'],
  'training': ['/assets/products/boxing-gloves-2.jpg', '/assets/products/boxing-gloves-hero.jpg', '/assets/products/boxing-gloves-3.jpg'],
  'breathable': ['/assets/products/boxing-gloves-3.jpg', '/assets/products/boxing-gloves-hero.jpg', '/assets/products/boxing-gloves-2.jpg'],
  'head-guards': ['/assets/products/head-guard.jpg'],
  'shin-pads': ['/assets/products/shin-guard.jpg'],
  'mouth-guards': ['/assets/products/mouth-guard.jpg'],
  'groin-guards': ['/assets/products/groin-guard.jpg'],
  'thigh-pads': ['/assets/products/thigh-pad.jpg'],
  'punching-bags': ['/assets/products/punching-bag.jpg'],
  'focus-pads': ['/assets/products/focus-pads.jpg'],
  'speed-balls': ['/assets/products/speed-ball.jpg'],
  'fighting-sticks': ['/assets/products/fighting-stick.jpg'],
  'kick-shields': ['/assets/products/kick-shield.jpg'],
  'tracksuits': ['/assets/products/tracksuit.jpg'],
  'hoodies': ['/assets/products/hoodie.jpg'],
  'training-wear': ['/assets/products/training-wear.jpg'],
};

function getProductImage(product) {
  // Use uploaded image if available (data URL or external URL)
  let firstImg = product.image; try { const p = JSON.parse(product.image); if (Array.isArray(p) && p.length > 0) firstImg = p[0]; } catch(e) {} if (firstImg && (firstImg.startsWith('data:') || firstImg.startsWith('http'))) {
    return firstImg;
  }
  const images = subcategoryImages[product.subcategory];
  if (!images || images.length === 0) return '/assets/products/boxing-gloves-hero.jpg';
  const hash = product.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return images[hash % images.length];
}

export function renderProduct(productId) {
  const product = getProductById(productId);
  if (!product) {
    return `
      <div class="container section">
        <div class="empty-state">
          <div class="empty-state__icon">🔍</div>
          <h2 class="empty-state__title">Product Not Found</h2>
          <p class="empty-state__desc">Art # ${productId} doesn't exist in our catalog.</p>
          <a href="#/" class="btn btn-primary" style="margin-top:1rem;">Go Home</a>
        </div>
      </div>
    `;
  }

  const category = getCategoryById(product.category);
  const related = getProductsBySubcategory(product.category, product.subcategory)
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  const whatsappMsg = encodeURIComponent(`Hi Shotric International, I'm interested in:\n\nProduct: ${product.name}\nArt #: ${product.artNumber}\nMaterial: ${product.material}\n\nPlease send me pricing and availability.`);
  const imgSrc = getProductImage(product);
  const isGlove = product.category === 'boxing-gloves';

  return `
    <section class="section" style="padding-top: var(--space-2xl);">
      <div class="container">
        <!-- Breadcrumbs -->
        <div class="breadcrumbs float-in">
          <a href="#/">Home</a>
          <span class="breadcrumbs__sep">›</span>
          <a href="#/category/${product.category}">${category?.name || ''}</a>
          <span class="breadcrumbs__sep">›</span>
          <span>${product.name}</span>
        </div>

        <!-- Product Detail Grid -->
        <div class="product-detail float-in">
          <!-- Product Image -->
          <div class="product-detail__image-wrap">
            <div class="product-detail__image-container">
              <img class="product-detail__main-image" src="${imgSrc}" alt="${product.name}" loading="lazy" />
              ${isGlove ? `
                <div class="product-detail__logo-overlay">
                  <img src="/assets/logo.png" alt="Shotric Logo on Wrist Strap" class="product-detail__logo-img" />
                  <span>Logo on Wrist Strap</span>
                </div>
              ` : ''}
            </div>
          </div>

          <!-- Product Info -->
          <div class="product-detail__info">
            <span class="product-detail__category">${formatSubcategory(product.subcategory)}</span>
            <h1 class="product-detail__name">${product.name}</h1>

            <div class="moq-badge" style="margin:var(--space-lg) 0;">
              📦 Minimum Order Quantity: 10 Pieces
            </div>

            <p class="product-detail__desc">${product.description}</p>

            <!-- Specs Table -->
            <table class="spec-table">
              <tr><td>Art Number</td><td>${product.artNumber}</td></tr>
              <tr><td>Material</td><td>${product.material}</td></tr>
              <tr><td>Available Sizes</td><td>${product.sizes}</td></tr>
              <tr><td>Category</td><td>${category?.name || ''}</td></tr>
              <tr><td>Subcategory</td><td>${formatSubcategory(product.subcategory)}</td></tr>
              <tr><td>Customization</td><td>Custom logos, colors & designs available</td></tr>
              <tr><td>MOQ</td><td>10 Pieces per design</td></tr>
            </table>

            <!-- CTA Buttons -->
            <div class="product-detail__actions">
              <a href="https://wa.me/923266849167?text=${whatsappMsg}" target="_blank" class="btn btn-whatsapp btn-lg" rel="noopener">
                💬 WhatsApp Inquiry
              </a>
              <a href="#/contact" class="btn btn-outline btn-lg">
                📧 Email Inquiry
              </a>
            </div>

            <div class="product-detail__shipping float-in">
              <p>🌍 International Shipping Available: 🇪🇸 Spain · 🇬🇧 UK · 🇫🇷 France · 🇺🇸 USA · 🇨🇦 Canada</p>
            </div>
          </div>
        </div>

        ${related.length > 0 ? `
          <!-- Related Products -->
          <div class="section" style="padding-bottom:0;">
            <div class="section-header float-in">
              <span class="section-header__label">Related</span>
              <h2 class="section-header__title">You May Also Like</h2>
            </div>
            <div class="product-grid stagger-children">
              ${related.map(p => renderProductCard(p)).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    </section>
  `;
}

function getCategoryIcon(category) {
  const icons = { 'boxing-gloves': '🥊', 'protection-gear': '🛡️', 'training-equipment': '🏋️', 'apparel': '👕' };
  return icons[category] || '📦';
}

function formatSubcategory(sub) {
  return sub.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}
