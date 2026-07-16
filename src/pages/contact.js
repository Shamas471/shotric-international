// Contact Page
import { categories } from '../data/categories.js';
import { saveInquiry } from './admin.js';

export function renderContact() {
  return `
    <section class="section" style="padding-top: var(--space-2xl);">
      <div class="container">
        <!-- Breadcrumbs -->
        <div class="breadcrumbs float-in">
          <a href="#/">Home</a>
          <span class="breadcrumbs__sep">›</span>
          <span>Contact</span>
        </div>

        <div class="section-header float-in">
          <span class="section-header__label">Get In Touch</span>
          <h1 class="section-header__title">Contact & Wholesale Inquiry</h1>
          <p class="section-header__desc">Ready to place a wholesale order or have questions about our products? We'd love to hear from you.</p>
        </div>

        <div class="contact-grid">
          <!-- Contact Form -->
          <div class="contact-form-wrap float-in glass-light">
            <h3 class="contact-form__heading">Send Us a Message</h3>
            <form id="contact-form" class="contact-form" onsubmit="return false;">
              <div class="form-group">
                <label class="form-label" for="cf-name">Full Name *</label>
                <input type="text" class="form-input" id="cf-name" name="name" required placeholder="Your name" />
              </div>
              <div class="form-group">
                <label class="form-label" for="cf-email">Email Address *</label>
                <input type="email" class="form-input" id="cf-email" name="email" required placeholder="you@company.com" />
              </div>
              <div class="form-group">
                <label class="form-label" for="cf-company">Company Name</label>
                <input type="text" class="form-input" id="cf-company" name="company" placeholder="Your company" />
              </div>
              <div class="form-group">
                <label class="form-label" for="cf-product">Product Interest</label>
                <select class="form-select" id="cf-product" name="product">
                  <option value="">Select a category...</option>
                  ${categories.map(c => `<option value="${c.id}">${c.icon} ${c.name}</option>`).join('')}
                  <option value="custom">Custom / Other</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label" for="cf-message">Message *</label>
                <textarea class="form-textarea" id="cf-message" name="message" required placeholder="Tell us about your requirements, quantities, customization needs..."></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-lg" style="width:100%;">Send Inquiry</button>
              <p class="contact-form__note">Form submissions are sent to <strong>shotricinternational@gmail.com</strong></p>
            </form>
          </div>

          <!-- Contact Info Sidebar -->
          <div class="contact-sidebar">
            <!-- WhatsApp Card -->
            <div class="contact-card float-card float-in glass-light animate-pulse-glow">
              <div class="contact-card__icon">💬</div>
              <h3 class="contact-card__title">WhatsApp — Fastest Response</h3>
              <p class="contact-card__desc">Get instant quotes and product information directly via WhatsApp.</p>
              <a href="https://wa.me/923266849167?text=Hi%20Shotric%2C%20I%27m%20interested%20in%20your%20products.%20Please%20send%20catalog%20and%20pricing." target="_blank" class="btn btn-whatsapp" rel="noopener" style="width:100%;">
                Chat on WhatsApp
              </a>
              <span class="contact-card__number">+92 326 684 9167</span>
            </div>

            <!-- Email Card -->
            <div class="contact-card float-card float-in glass-light">
              <div class="contact-card__icon">📧</div>
              <h3 class="contact-card__title">Email</h3>
              <p class="contact-card__desc">For detailed inquiries, bulk quotations, and formal correspondence.</p>
              <a href="mailto:shotricinternational@gmail.com" class="btn btn-outline" style="width:100%;">
                shotricinternational@gmail.com
              </a>
            </div>

            <!-- Wholesale Info Card -->
            <div class="contact-card float-card float-in glass-light">
              <div class="contact-card__icon">📦</div>
              <h3 class="contact-card__title">Wholesale Information</h3>
              <ul class="contact-card__list">
                <li>✅ Minimum Order: 10 Pieces per design</li>
                <li>✅ Custom branding & logo placement</li>
                <li>✅ OEM & ODM services available</li>
                <li>✅ Sample orders accepted</li>
              </ul>
            </div>

            <!-- Shipping Card -->
            <div class="contact-card float-card float-in glass-light">
              <div class="contact-card__icon">🌍</div>
              <h3 class="contact-card__title">International Shipping</h3>
              <p class="contact-card__desc">We proudly ship to:</p>
              <div class="contact-card__flags">
                <span>🇪🇸 Spain</span>
                <span>🇬🇧 United Kingdom</span>
                <span>🇫🇷 France</span>
                <span>🇺🇸 United States</span>
                <span>🇨🇦 Canada</span>
                <span>🌐 And more...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cf-name').value;
    const email = document.getElementById('cf-email').value;
    const company = document.getElementById('cf-company').value;
    const product = document.getElementById('cf-product').value;
    const message = document.getElementById('cf-message').value;

    // Create mailto link
    const subject = encodeURIComponent(`Wholesale Inquiry from ${name}${company ? ' — ' + company : ''}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nCompany: ${company || 'N/A'}\nProduct Interest: ${product || 'General'}\n\nMessage:\n${message}`);

    // Save inquiry to localStorage (for admin panel)
    saveInquiry({ name, email, company, product, message });

    window.open(`mailto:shotricinternational@gmail.com?subject=${subject}&body=${body}`, '_self');

    // Show success state
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '✓ Opening Email Client...';
    btn.style.background = 'linear-gradient(135deg, #25d366, #128c7e)';
    setTimeout(() => {
      btn.textContent = 'Send Inquiry';
      btn.style.background = '';
    }, 3000);
  });
}
