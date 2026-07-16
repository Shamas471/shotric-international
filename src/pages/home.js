// Home Page
import { categories } from '../data/categories.js';
import products from '../data/products.js';
import { renderProductCard } from '../components/productCard.js';

export function renderHome() {
  const featured = products.slice(0, 8);

  return `
    <!-- Hero Section -->
    <section class="hero">
      <div class="gradient-orb gradient-orb-red" style="width:600px;height:600px;top:-200px;right:-100px;"></div>
      <div class="gradient-orb gradient-orb-dark" style="width:500px;height:500px;bottom:-150px;left:-100px;"></div>

      <div class="container hero__inner">
        <div class="hero__content float-in">
          <span class="hero__label">Premium Fight Gear Manufacturer</span>
          <h1 class="hero__title">Elevate Your <span class="hero__title-accent">Fighting Spirit</span></h1>
          <p class="hero__subtitle">Shotric International — crafting championship-grade boxing gloves, protection gear, training equipment, and performance apparel for fighters worldwide.</p>
          <div class="hero__actions">
            <a href="#/category/boxing-gloves" class="btn btn-primary btn-lg">Explore Collection</a>
            <a href="#/contact" class="btn btn-outline btn-lg">Wholesale Inquiry</a>
          </div>
          <div class="hero__moq">
            <span class="moq-badge">📦 Minimum Order: 10 Pieces · Worldwide Shipping</span>
          </div>
        </div>
        <div class="hero__visual float-in" style="transition-delay: 0.2s">
          <div class="hero__card animate-float">
            <div class="hero__card-icon">🥊</div>
            <div class="hero__card-text">Hand-Molded<br/>Cowhide Leather</div>
          </div>
          <div class="hero__card hero__card--2 animate-float-slow">
            <div class="hero__card-icon">🛡️</div>
            <div class="hero__card-text">PU Flex<br/>Protection</div>
          </div>
          <div class="hero__card hero__card--3 animate-float">
            <div class="hero__card-icon">🌍</div>
            <div class="hero__card-text">Global<br/>Shipping</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="section">
      <div class="container">
        <div class="section-header float-in">
          <span class="section-header__label">Our Range</span>
          <h2 class="section-header__title">Product Categories</h2>
          <p class="section-header__desc">From professional boxing gloves to complete training setups — everything a fighter needs, manufactured to the highest standards.</p>
        </div>

        <div class="category-grid stagger-children">
          ${categories.map(c => `
            <a href="#/category/${c.id}" class="category-card float-card">
              <span class="category-card__icon">${c.icon}</span>
              <h3 class="category-card__title">${c.name}</h3>
              <p class="category-card__count">${c.description}</p>
            </a>
          `).join('')}
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="section" style="background: var(--color-bg-elevated);">
      <div class="container">
        <div class="section-header float-in">
          <span class="section-header__label">Featured</span>
          <h2 class="section-header__title">Signature Products</h2>
          <p class="section-header__desc">Our best-selling products trusted by fighters and gyms around the world.</p>
        </div>

        <div class="product-grid stagger-children">
          ${featured.map(p => renderProductCard(p)).join('')}
        </div>
      </div>
    </section>

    <!-- Why Shotric Section -->
    <section class="section">
      <div class="container">
        <div class="section-header float-in">
          <span class="section-header__label">Why Choose Us</span>
          <h2 class="section-header__title">The Shotric Advantage</h2>
        </div>

        <div class="advantages-grid stagger-children">
          <div class="advantage-card float-card glass-light">
            <div class="advantage-card__icon">🏭</div>
            <h3 class="advantage-card__title">Own Manufacturing</h3>
            <p class="advantage-card__desc">In-house production ensures quality control at every step, from raw materials to finished goods.</p>
          </div>
          <div class="advantage-card float-card glass-light">
            <div class="advantage-card__icon">✋</div>
            <h3 class="advantage-card__title">Hand-Crafted Quality</h3>
            <p class="advantage-card__desc">Our professional gloves are hand-molded by skilled artisans using premium cowhide leather.</p>
          </div>
          <div class="advantage-card float-card glass-light">
            <div class="advantage-card__icon">🎨</div>
            <h3 class="advantage-card__title">Full Customization</h3>
            <p class="advantage-card__desc">Custom logos, colors, and designs available on all products for brand personalization.</p>
          </div>
          <div class="advantage-card float-card glass-light">
            <div class="advantage-card__icon">🌍</div>
            <h3 class="advantage-card__title">Global Delivery</h3>
            <p class="advantage-card__desc">Shipping to Spain, UK, France, USA, Canada and beyond with reliable logistics partners.</p>
          </div>
          <div class="advantage-card float-card glass-light">
            <div class="advantage-card__icon">💰</div>
            <h3 class="advantage-card__title">Wholesale Pricing</h3>
            <p class="advantage-card__desc">Competitive factory pricing with MOQ as low as 10 pieces per design for startups and brands.</p>
          </div>
          <div class="advantage-card float-card glass-light">
            <div class="advantage-card__icon">🏆</div>
            <h3 class="advantage-card__title">Certified Materials</h3>
            <p class="advantage-card__desc">All products made with certified, tested materials meeting international safety and quality standards.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section cta-section">
      <div class="gradient-orb gradient-orb-red" style="width:400px;height:400px;top:50%;left:50%;transform:translate(-50%,-50%);"></div>
      <div class="container cta-section__inner float-in">
        <h2 class="cta-section__title">Ready to Partner With Us?</h2>
        <p class="cta-section__desc">Start your wholesale order today. Custom branding, competitive pricing, and worldwide shipping available.</p>
        <div class="cta-section__actions">
          <a href="https://wa.me/923266849167?text=Hi%20Shotric%2C%20I%27m%20interested%20in%20wholesale%20ordering." target="_blank" class="btn btn-whatsapp btn-lg" rel="noopener">💬 WhatsApp Inquiry</a>
          <a href="#/contact" class="btn btn-outline btn-lg">Contact Form</a>
        </div>
      </div>
    </section>
  `;
}
