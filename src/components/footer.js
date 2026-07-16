// Footer component
import { categories } from '../data/categories.js';

export function renderFooter() {
  const year = new Date().getFullYear();
  return `
    <div class="footer">
      <div class="container">
        <div class="footer__grid">
          <div class="footer__brand">
            <img src="/assets/logo.png" alt="Shotric International" class="footer__logo" width="200" height="56" />
            <p class="footer__description">
              Leading manufacturer and wholesale supplier of premium boxing equipment, protection gear, training accessories, and sports apparel. Serving customers worldwide.
            </p>
            <div class="footer__shipping">
              <span class="footer__shipping-label">🌍 We ship worldwide</span>
              <div class="footer__flags">
                <span title="Spain">🇪🇸</span>
                <span title="United Kingdom">🇬🇧</span>
                <span title="France">🇫🇷</span>
                <span title="United States">🇺🇸</span>
                <span title="Canada">🇨🇦</span>
              </div>
            </div>
          </div>

          <div class="footer__column">
            <h4 class="footer__heading">Categories</h4>
            ${categories.map(c => `
              <a href="#/category/${c.id}" class="footer__link">${c.icon} ${c.name}</a>
            `).join('')}
          </div>

          <div class="footer__column">
            <h4 class="footer__heading">Quick Links</h4>
            <a href="#/" class="footer__link">Home</a>
            <a href="#/contact" class="footer__link">Contact Us</a>
            <a href="https://wa.me/923266849167" target="_blank" class="footer__link" rel="noopener">💬 WhatsApp</a>
          </div>

          <div class="footer__column">
            <h4 class="footer__heading">Contact</h4>
            <a href="mailto:shotricinternational@gmail.com" class="footer__link">📧 shotricinternational@gmail.com</a>
            <a href="https://wa.me/923266849167" target="_blank" class="footer__link" rel="noopener">📱 +92 326 684 9167</a>
            <div class="footer__moq">
              <span class="moq-badge">📦 MOQ: 10 Pieces</span>
            </div>
          </div>
        </div>

        <div class="footer__bottom">
          <p>&copy; ${year} Shotric International. All rights reserved.</p>
        </div>
      </div>
    </div>
  `;
}
