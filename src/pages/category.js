// Category Page
import { getCategoryById } from '../data/categories.js';
import { getProductsByCategory, getProductsBySubcategory } from '../data/products.js';
import { renderProductCard } from '../components/productCard.js';

export function renderCategory(categoryId, activeSubcategory) {
    const category = getCategoryById(categoryId);
    if (!category) {
        return `
      <div class="container section">
        <div class="empty-state">
          <div class="empty-state__icon">🔍</div>
          <h2 class="empty-state__title">Category Not Found</h2>
          <p class="empty-state__desc">The category you're looking for doesn't exist.</p>
          <a href="#/" class="btn btn-primary" style="margin-top:1rem;">Go Home</a>
        </div>
      </div>
    `;
    }

    const activeProducts = activeSubcategory
        ? getProductsBySubcategory(categoryId, activeSubcategory)
        : getProductsByCategory(categoryId);

    return `
    <section class="section" style="padding-top: var(--space-2xl);">
      <div class="container">
        <!-- Breadcrumbs -->
        <div class="breadcrumbs float-in">
          <a href="#/">Home</a>
          <span class="breadcrumbs__sep">›</span>
          <span>${category.name}</span>
          ${activeSubcategory ? `
            <span class="breadcrumbs__sep">›</span>
            <span>${category.subcategories.find(s => s.id === activeSubcategory)?.name || ''}</span>
          ` : ''}
        </div>

        <!-- Category Header -->
        <div class="category-header float-in">
          <div class="category-header__icon">${category.icon}</div>
          <div>
            <h1 class="category-header__title">${category.name}</h1>
            <p class="category-header__desc">${category.description}</p>
          </div>
        </div>

        <!-- Subcategory Pills -->
        <div class="pills-row float-in" style="margin-bottom: var(--space-2xl);">
          <button class="pill ${!activeSubcategory ? 'active' : ''}" data-subcategory="" onclick="window.navigateSubcategory('${categoryId}', '')">All</button>
          ${category.subcategories.map(s => `
            <button class="pill ${activeSubcategory === s.id ? 'active' : ''}" data-subcategory="${s.id}" onclick="window.navigateSubcategory('${categoryId}', '${s.id}')">
              ${s.name}
            </button>
          `).join('')}
        </div>

        <!-- Products Count -->
        <div class="products-count float-in">
          <span>${activeProducts.length} products</span>
        </div>

        <!-- Product Grid -->
        <div class="product-grid stagger-children">
          ${activeProducts.length > 0
            ? activeProducts.map(p => renderProductCard(p)).join('')
            : `<div class="empty-state" style="grid-column:1/-1;">
                <div class="empty-state__icon">📦</div>
                <h3 class="empty-state__title">No products in this subcategory</h3>
              </div>`
        }
        </div>
      </div>
    </section>
  `;
}
