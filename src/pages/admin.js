// Admin Panel Page — Full CRUD with Supabase
import { supabase } from '../lib/supabase.js';
import { categories } from '../data/categories.js';
import products, { getProductsByCategory, updateProduct } from '../data/products.js';

// ---- Admin Credentials ----
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'shotric2026';
const AUTH_KEY = 'shotric_admin_auth';

function isAuthenticated() {
  return sessionStorage.getItem(AUTH_KEY) === 'true';
}

function setAuthenticated(val) {
  if (val) {
    sessionStorage.setItem(AUTH_KEY, 'true');
  } else {
    sessionStorage.removeItem(AUTH_KEY);
  }
}

// ---- Supabase Data Functions ----

async function getInquiries() {
  try {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (e) {
    console.warn('Inquiries fetch failed:', e.message);
    return [];
  }
}

export async function saveInquiry(inquiry) {
  try {
    const { error } = await supabase.from('inquiries').insert([{
      name: inquiry.name,
      email: inquiry.email,
      company: inquiry.company || '',
      product: inquiry.product || '',
      message: inquiry.message || ''
    }]);
    if (error) throw error;
  } catch (e) {
    console.warn('Inquiry save failed, using localStorage:', e.message);
    const list = JSON.parse(localStorage.getItem('shotric_inquiries') || '[]');
    list.unshift({ ...inquiry, id: Date.now(), created_at: new Date().toISOString() });
    localStorage.setItem('shotric_inquiries', JSON.stringify(list));
  }
}

async function deleteInquiry(id) {
  const { error } = await supabase.from('inquiries').delete().eq('id', id);
  if (error) console.error('Error deleting inquiry:', error);
}

async function getCustomProducts() {
  try {
    const { data, error } = await supabase
      .from('custom_products')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (e) {
    console.warn('Custom products fetch failed:', e.message);
    return [];
  }
}

async function saveCustomProduct(product) {
  const { error } = await supabase.from('custom_products').insert([{
    art_number: product.artNumber,
    name: product.name,
    category: product.category,
    subcategory: product.subcategory,
    material: product.material || '',
    sizes: product.sizes || '',
    description: product.description || '',
    image: product.image || ''
  }]);
  if (error) console.error('Error saving custom product:', error);
  return !error;
}

async function updateCustomProduct(id, product) {
  const { error } = await supabase.from('custom_products').update({
    art_number: product.artNumber,
    name: product.name,
    category: product.category,
    subcategory: product.subcategory,
    material: product.material || '',
    sizes: product.sizes || '',
    description: product.description || '',
    image: product.image || ''
  }).eq('id', id);
  if (error) console.error('Error updating custom product:', error);
  return !error;
}

async function deleteCustomProduct(id) {
  const { error } = await supabase.from('custom_products').delete().eq('id', id);
  if (error) console.error('Error deleting custom product:', error);
}

export function getAllProducts() {
  return products;
}

// ---- Image Compression Helper ----
// Resizes and compresses images to keep them small for database storage
function compressImage(file, maxWidth = 600, quality = 0.6) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const compressed = canvas.toDataURL('image/jpeg', quality);
        resolve(compressed);
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ---- Render Login Screen ----

function renderLoginScreen() {
  return `
    <section class="section" style="padding-top: var(--space-2xl);">
      <div class="container" style="max-width: 440px;">
        <div class="section-header float-in" style="text-align:center;">
          <span class="section-header__label">Restricted Area</span>
          <h1 class="section-header__title">🔐 Admin Login</h1>
          <p class="section-header__desc">Enter your credentials to access the admin panel.</p>
        </div>
        <div class="contact-form-wrap float-in glass-light" style="margin-top:var(--space-xl);">
          <form id="admin-login-form" class="contact-form">
            <div class="form-group">
              <label class="form-label" for="admin-username">Username</label>
              <input type="text" class="form-input" id="admin-username" name="username" required placeholder="Enter username" autocomplete="username" />
            </div>
            <div class="form-group">
              <label class="form-label" for="admin-password">Password</label>
              <input type="password" class="form-input" id="admin-password" name="password" required placeholder="Enter password" autocomplete="current-password" />
            </div>
            <div id="login-error" style="color:#ef4444;font-size:var(--fs-sm);margin-bottom:var(--space-md);display:none;">❌ Invalid username or password</div>
            <button type="submit" class="btn btn-primary btn-lg" style="width:100%;">🔓 Sign In</button>
          </form>
        </div>
      </div>
    </section>
  `;
}

// ---- Render Admin Page (non-async, renders immediately) ----

export function renderAdmin() {
  if (!isAuthenticated()) {
    return renderLoginScreen();
  }

  const totalCatalog = products.length;

  return `
    <section class="section" style="padding-top: var(--space-2xl);">
      <div class="container">
        <div class="admin-header float-in">
          <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:var(--space-md);">
            <div>
              <h1 class="admin-header__title">🛡️ Admin Panel</h1>
              <p class="admin-header__desc">Manage inquiries, products, and overview for Shotric International</p>
            </div>
            <button class="btn btn-outline btn-sm" id="admin-logout-btn" style="white-space:nowrap;">🚪 Logout</button>
          </div>
          <div style="margin-top: var(--space-sm); display: flex; align-items: center; gap: var(--space-sm);">
            <span class="supabase-badge" id="supabase-status">⏳ Connecting to Supabase...</span>
          </div>
        </div>

        <!-- Tab Navigation -->
        <div class="admin-tabs float-in">
          <button class="admin-tab active" data-tab="overview">📊 Overview</button>
          <button class="admin-tab" data-tab="inquiries">📩 Inquiries <span class="admin-tab__badge" id="inquiry-count">0</span></button>
          <button class="admin-tab" data-tab="products">📦 Products <span class="admin-tab__badge" id="product-count">${totalCatalog}</span></button>
        </div>

        <!-- OVERVIEW TAB -->
        <div class="admin-panel" id="tab-overview">
          <div class="admin-stats">
            <div class="stat-card stat-card--clickable glass float-card" data-action="switch-tab" data-target="products">
              <div class="stat-card__icon">📦</div>
              <div class="stat-card__value" id="stat-total">${totalCatalog}</div>
              <div class="stat-card__label">Total Products</div>
            </div>
            <div class="stat-card stat-card--clickable glass float-card" data-action="switch-tab" data-target="inquiries">
              <div class="stat-card__icon">📩</div>
              <div class="stat-card__value" id="stat-inquiries">0</div>
              <div class="stat-card__label">Total Inquiries</div>
            </div>
            <div class="stat-card stat-card--clickable glass float-card" data-action="switch-tab" data-target="products">
              <div class="stat-card__icon">📂</div>
              <div class="stat-card__value">${categories.length}</div>
              <div class="stat-card__label">Categories</div>
            </div>
            <div class="stat-card stat-card--clickable glass float-card" data-action="switch-tab" data-target="products">
              <div class="stat-card__icon">☁️</div>
              <div class="stat-card__value" id="stat-cloud">0</div>
              <div class="stat-card__label">Cloud Products</div>
            </div>
          </div>

          <div class="admin-stats" style="margin-top:var(--space-xl);">
            ${categories.map(c => `
              <div class="stat-card stat-card--clickable glass float-card" data-action="navigate" data-href="#/category/${c.id}">
                <div class="stat-card__icon">${c.icon}</div>
                <div class="stat-card__value">${getProductsByCategory(c.id).length}</div>
                <div class="stat-card__label">${c.name}</div>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- INQUIRIES TAB -->
        <div class="admin-panel" id="tab-inquiries" style="display:none;">
          <div id="inquiries-content">
            <div class="page-loader"><div class="spinner"></div></div>
          </div>
        </div>

        <!-- PRODUCTS TAB -->
        <div class="admin-panel" id="tab-products" style="display:none;">
          <div class="admin-products-header">
            <h3>Products</h3>
            <button class="btn btn-primary" id="add-product-btn">➕ Add Product</button>
          </div>

          <!-- Add Product Form (hidden by default) -->
          <div class="admin-add-form glass" id="add-product-form" style="display:none;">
            <h3 class="contact-form__heading">➕ Add New Product</h3>
            <form id="new-product-form">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-md);">
                <div class="form-group">
                  <label class="form-label">Product Name *</label>
                  <input type="text" class="form-input" name="name" required placeholder="e.g. Pro Boxing Gloves" />
                </div>
                <div class="form-group">
                  <label class="form-label">Art Number *</label>
                  <input type="text" class="form-input" name="artNumber" required placeholder="e.g. SI-100" />
                </div>
                <div class="form-group">
                  <label class="form-label">Category *</label>
                  <select class="form-select" name="category" required>
                    <option value="">Select Category</option>
                    ${categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Subcategory *</label>
                  <select class="form-select" name="subcategory" required>
                    <option value="">Select subcategory after choosing category</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Material *</label>
                  <input type="text" class="form-input" name="material" required placeholder="e.g. Cowhide Leather" />
                </div>
                <div class="form-group">
                  <label class="form-label">Sizes *</label>
                  <input type="text" class="form-input" name="sizes" required placeholder="e.g. 4oz, 6oz, 8oz or Small, Medium, Large" />
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Description *</label>
                <textarea class="form-textarea" name="description" required placeholder="Product description..."></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">Product Images (up to 6)</label>
                <div class="multi-image-grid" id="add-images-grid">
                  ${[1, 2, 3, 4, 5, 6].map(i => `
                    <div class="image-slot" data-slot="${i}">
                      <input type="file" accept="image/*" class="image-slot-input" id="add-img-${i}" data-index="${i}" />
                      <div class="image-slot-placeholder">
                        <span class="image-slot-icon">📷</span>
                        <span class="image-slot-num">${i}</span>
                      </div>
                      <div class="image-slot-preview" style="display:none;">
                        <img class="image-slot-thumb" alt="Photo ${i}" />
                        <button type="button" class="image-slot-remove" data-index="${i}">&times;</button>
                      </div>
                    </div>
                  `).join('')}
                </div>
                <span class="image-upload-hint">JPG, PNG, WebP — each image auto-compressed</span>
              </div>
              <div style="display:flex;gap:var(--space-md);">
                <button type="submit" class="btn btn-primary">💾 Save to Supabase</button>
                <button type="button" class="btn btn-outline" id="cancel-add-product">Cancel</button>
              </div>
            </form>
          </div>

          <!-- Cloud Products (loaded dynamically) -->
          <div id="cloud-products-section"></div>

          <!-- Catalog Products -->
          <h4 style="margin: var(--space-xl) 0 var(--space-md);">📋 Catalog Products (${totalCatalog})</h4>
          <div class="admin-table-wrap">
            <table class="admin-table">
              <thead>
                <tr><th>Art #</th><th>Name</th><th>Category</th><th>Material</th><th>Sizes</th><th>Actions</th></tr>
              </thead>
              <tbody>
                ${products.slice(0, 50).map(p => `
                  <tr>
                    <td><code>${p.artNumber}</code></td>
                    <td><a href="#/product/${p.id}">${p.name}</a></td>
                    <td>${p.category} / ${p.subcategory}</td>
                    <td>${p.material}</td>
                    <td style="max-width:200px;">${p.sizes}</td>
                    <td>
                      <button class="btn btn-sm btn-outline admin-edit-catalog"
                        data-id="${p.id}"
                        data-name="${encodeURIComponent(p.name)}"
                        data-art="${encodeURIComponent(p.artNumber)}"
                        data-category="${encodeURIComponent(p.category)}"
                        data-subcategory="${encodeURIComponent(p.subcategory)}"
                        data-material="${encodeURIComponent(p.material)}"
                        data-sizes="${encodeURIComponent(p.sizes)}"
                        data-description="${encodeURIComponent(p.description || '')}">✏️</button>
                    </td>
                  </tr>
                `).join('')}
                ${products.length > 50 ? `<tr><td colspan="6" style="text-align:center;color:var(--color-text-muted);">... and ${products.length - 50} more catalog products</td></tr>` : ''}
              </tbody>
            </table>
          </div>
        </div>

        <!-- Edit Product Modal -->
        <div class="admin-modal-overlay" id="edit-modal" style="display:none;">
          <div class="admin-modal glass">
            <div class="admin-modal__header">
              <h3>✏️ Edit Product</h3>
              <button class="admin-modal__close" id="close-edit-modal">&times;</button>
            </div>
            <form id="edit-product-form">
              <input type="hidden" name="editId" />
              <input type="hidden" name="editSource" value="cloud" />
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:var(--space-md);">
                <div class="form-group">
                  <label class="form-label">Product Name *</label>
                  <input type="text" class="form-input" name="editName" required />
                </div>
                <div class="form-group">
                  <label class="form-label">Art Number *</label>
                  <input type="text" class="form-input" name="editArtNumber" required />
                </div>
                <div class="form-group">
                  <label class="form-label">Category *</label>
                  <select class="form-select" name="editCategory" required>
                    <option value="">Select Category</option>
                    ${categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Subcategory *</label>
                  <select class="form-select" name="editSubcategory" required>
                    <option value="">Select subcategory</option>
                  </select>
                </div>
                <div class="form-group">
                  <label class="form-label">Material *</label>
                  <input type="text" class="form-input" name="editMaterial" required />
                </div>
                <div class="form-group">
                  <label class="form-label">Sizes *</label>
                  <input type="text" class="form-input" name="editSizes" required />
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Description *</label>
                <textarea class="form-textarea" name="editDescription" required></textarea>
              </div>
              <div class="form-group">
                <label class="form-label">Product Images (up to 6)</label>
                <div class="multi-image-grid" id="edit-images-grid">
                  ${[1, 2, 3, 4, 5, 6].map(i => `
                    <div class="image-slot" data-slot="${i}">
                      <input type="file" accept="image/*" class="image-slot-input" id="edit-img-${i}" data-index="${i}" />
                      <div class="image-slot-placeholder">
                        <span class="image-slot-icon">📷</span>
                        <span class="image-slot-num">${i}</span>
                      </div>
                      <div class="image-slot-preview" style="display:none;">
                        <img class="image-slot-thumb" alt="Photo ${i}" />
                        <button type="button" class="image-slot-remove" data-index="${i}">&times;</button>
                      </div>
                    </div>
                  `).join('')}
                </div>
                <span class="image-upload-hint">JPG, PNG, WebP — each image auto-compressed</span>
              </div>
              <div style="display:flex;gap:var(--space-md);">
                <button type="submit" class="btn btn-primary">💾 Update Product</button>
                <button type="button" class="btn btn-outline" id="cancel-edit-product">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;
}

// ---- Load Supabase data after page renders ----

async function loadSupabaseData() {
  const statusBadge = document.getElementById('supabase-status');

  try {
    const [inquiries, customProducts] = await Promise.all([
      getInquiries(),
      getCustomProducts()
    ]);

    // Update status badge
    if (statusBadge) {
      statusBadge.textContent = '🟢 Connected to Supabase';
      statusBadge.classList.add('connected');
    }

    // Update overview stats
    const el = (id) => document.getElementById(id);
    if (el('stat-total')) el('stat-total').textContent = products.length + customProducts.length;
    if (el('stat-inquiries')) el('stat-inquiries').textContent = inquiries.length;
    if (el('stat-cloud')) el('stat-cloud').textContent = customProducts.length;
    if (el('inquiry-count')) el('inquiry-count').textContent = inquiries.length;
    if (el('product-count')) el('product-count').textContent = products.length + customProducts.length;

    // Render inquiries
    const inquiriesContent = document.getElementById('inquiries-content');
    if (inquiriesContent) {
      inquiriesContent.innerHTML = inquiries.length === 0 ? `
        <div class="empty-state">
          <div class="empty-state__icon">📩</div>
          <h2 class="empty-state__title">No Inquiries Yet</h2>
          <p class="empty-state__desc">When customers submit the contact form, inquiries will appear here — stored in Supabase.</p>
        </div>
      ` : `
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Email</th>
                <th>Company</th>
                <th>Product Interest</th>
                <th>Message</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${inquiries.map(inq => `
                <tr>
                  <td><span class="admin-table__date">${new Date(inq.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span></td>
                  <td><strong>${inq.name || '-'}</strong></td>
                  <td>${inq.email || '-'}</td>
                  <td>${inq.company || '-'}</td>
                  <td>${inq.product || '-'}</td>
                  <td class="admin-table__message">${(inq.message || '').substring(0, 80)}${(inq.message || '').length > 80 ? '…' : ''}</td>
                  <td><button class="btn btn-sm btn-outline admin-delete-inquiry" data-id="${inq.id}">🗑️</button></td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      bindDeleteInquiries();
    }

    // Render cloud products
    const cloudSection = document.getElementById('cloud-products-section');
    if (cloudSection && customProducts.length > 0) {
      cloudSection.innerHTML = `
        <h4 style="margin: var(--space-xl) 0 var(--space-md); color: var(--color-primary);">☁️ Cloud Products (${customProducts.length})</h4>
        <div class="admin-table-wrap">
          <table class="admin-table">
            <thead>
              <tr><th>Art #</th><th>Name</th><th>Category</th><th>Material</th><th>Sizes</th><th>Actions</th></tr>
            </thead>
            <tbody>
              ${customProducts.map(p => `
                <tr>
                  <td><code>${p.art_number}</code></td>
                  <td><strong>${p.name}</strong></td>
                  <td>${p.category} / ${p.subcategory}</td>
                  <td>${p.material}</td>
                  <td>${p.sizes}</td>
                  <td>
                    <div class="admin-actions">
                      <button class="btn btn-sm btn-outline admin-edit-product"
                        data-id="${p.id}"
                        data-name="${encodeURIComponent(p.name)}"
                        data-art="${encodeURIComponent(p.art_number)}"
                        data-category="${encodeURIComponent(p.category)}"
                        data-subcategory="${encodeURIComponent(p.subcategory)}"
                        data-material="${encodeURIComponent(p.material)}"
                        data-sizes="${encodeURIComponent(p.sizes)}"
                        data-description="${encodeURIComponent(p.description || '')}"
                        data-image="${encodeURIComponent(p.image || '')}">✏️</button>
                      <button class="btn btn-sm btn-outline admin-delete-product" data-id="${p.id}">🗑️</button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `;
      bindCloudProductActions();
    }

  } catch (err) {
    console.error('Supabase load error:', err);
    if (statusBadge) {
      statusBadge.textContent = '🔴 Supabase Offline';
      statusBadge.classList.add('error');
    }
    const inquiriesContent = document.getElementById('inquiries-content');
    if (inquiriesContent) {
      inquiriesContent.innerHTML = `
        <div class="empty-state">
          <div class="empty-state__icon">⚠️</div>
          <h2 class="empty-state__title">Supabase Not Connected</h2>
          <p class="empty-state__desc">Could not connect to Supabase. Make sure you've run the SQL schema in your Supabase SQL Editor.</p>
          <p class="empty-state__desc" style="font-size:var(--fs-xs);color:var(--color-text-muted);margin-top:var(--space-sm);">${err.message || ''}</p>
        </div>
      `;
    }
  }
}

// ---- Bind Delete Inquiries ----
function bindDeleteInquiries() {
  document.querySelectorAll('.admin-delete-inquiry').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (confirm('Delete this inquiry?')) {
        btn.textContent = '⏳';
        await deleteInquiry(parseInt(btn.dataset.id));
        await loadSupabaseData();
      }
    });
  });
}

// ---- Bind Cloud Product Actions (Edit + Delete) ----
function bindCloudProductActions() {
  // Edit
  document.querySelectorAll('.admin-edit-product').forEach(btn => {
    btn.addEventListener('click', () => {
      const editModal = document.getElementById('edit-modal');
      const editForm = document.getElementById('edit-product-form');

      const id = btn.dataset.id;
      const name = decodeURIComponent(btn.dataset.name);
      const artNumber = decodeURIComponent(btn.dataset.art);
      const category = decodeURIComponent(btn.dataset.category);
      const subcategory = decodeURIComponent(btn.dataset.subcategory);
      const material = decodeURIComponent(btn.dataset.material);
      const sizes = decodeURIComponent(btn.dataset.sizes);
      const description = decodeURIComponent(btn.dataset.description);

      editForm.querySelector('[name="editId"]').value = id;
      editForm.querySelector('[name="editSource"]').value = 'cloud';
      editForm.querySelector('[name="editName"]').value = name;
      editForm.querySelector('[name="editArtNumber"]').value = artNumber;
      editForm.querySelector('[name="editMaterial"]').value = material;
      editForm.querySelector('[name="editSizes"]').value = sizes;
      editForm.querySelector('[name="editDescription"]').value = description;

      const catSelect = editForm.querySelector('[name="editCategory"]');
      catSelect.value = category;
      const cat = categories.find(c => c.id === category);
      const subSelect = editForm.querySelector('[name="editSubcategory"]');
      if (cat) {
        subSelect.innerHTML = cat.subcategories.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
        subSelect.value = subcategory;
      }

      // Show existing images in multi-image grid
      const image = decodeURIComponent(btn.dataset.image || '');
      showExistingImages('edit', image);

      editModal.style.display = 'flex';
    });
  });

  // Delete
  document.querySelectorAll('.admin-delete-product').forEach(btn => {
    btn.addEventListener('click', async () => {
      if (confirm('Delete this custom product?')) {
        btn.textContent = '⏳';
        await deleteCustomProduct(parseInt(btn.dataset.id));
        await loadSupabaseData();
      }
    });
  });
}

// ---- Bind Catalog Product Edit Buttons ----
function bindCatalogEditButtons() {
  document.querySelectorAll('.admin-edit-catalog').forEach(btn => {
    btn.addEventListener('click', () => {
      const editModal = document.getElementById('edit-modal');
      const editForm = document.getElementById('edit-product-form');

      const id = btn.dataset.id;
      const name = decodeURIComponent(btn.dataset.name);
      const artNumber = decodeURIComponent(btn.dataset.art);
      const category = decodeURIComponent(btn.dataset.category);
      const subcategory = decodeURIComponent(btn.dataset.subcategory);
      const material = decodeURIComponent(btn.dataset.material);
      const sizes = decodeURIComponent(btn.dataset.sizes);
      const description = decodeURIComponent(btn.dataset.description);

      editForm.querySelector('[name="editId"]').value = id;
      editForm.querySelector('[name="editSource"]').value = 'catalog';
      editForm.querySelector('[name="editName"]').value = name;
      editForm.querySelector('[name="editArtNumber"]').value = artNumber;
      editForm.querySelector('[name="editMaterial"]').value = material;
      editForm.querySelector('[name="editSizes"]').value = sizes;
      editForm.querySelector('[name="editDescription"]').value = description;

      const catSelect = editForm.querySelector('[name="editCategory"]');
      catSelect.value = category;
      const cat = categories.find(c => c.id === category);
      const subSelect = editForm.querySelector('[name="editSubcategory"]');
      if (cat) {
        subSelect.innerHTML = cat.subcategories.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
        subSelect.value = subcategory;
      }

      // Show existing images in multi-image grid
      const product = products.find(p => p.id === id);
      const existingImage = product?.image || '';
      showExistingImages('edit', existingImage);

      editModal.style.display = 'flex';
    });
  });
}

// ---- Init (called after renderAdmin) ----

export function initAdmin() {
  // If not authenticated, bind login form
  if (!isAuthenticated()) {
    const loginForm = document.getElementById('admin-login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('admin-username').value.trim();
        const password = document.getElementById('admin-password').value;
        const errorEl = document.getElementById('login-error');

        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
          setAuthenticated(true);
          // Re-render admin page
          const pageContent = document.getElementById('page-content');
          pageContent.innerHTML = renderAdmin();
          initAdmin();
        } else {
          errorEl.style.display = 'block';
          document.getElementById('admin-password').value = '';
          // Shake animation
          loginForm.style.animation = 'none';
          loginForm.offsetHeight; // force reflow
          loginForm.style.animation = 'shake 0.4s ease';
        }
      });
    }
    return;
  }

  // Logout button
  const logoutBtn = document.getElementById('admin-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      setAuthenticated(false);
      window.location.hash = '#/admin';
      const pageContent = document.getElementById('page-content');
      pageContent.innerHTML = renderAdmin();
      initAdmin();
    });
  }
  // Tab switching
  function switchToTab(tabName) {
    document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.admin-panel').forEach(p => p.style.display = 'none');
    const targetTab = document.querySelector(`.admin-tab[data-tab="${tabName}"]`);
    if (targetTab) targetTab.classList.add('active');
    const panel = document.getElementById(`tab-${tabName}`);
    if (panel) panel.style.display = 'block';
  }

  document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => switchToTab(tab.dataset.tab));
  });

  // Clickable stat cards
  document.querySelectorAll('.stat-card--clickable').forEach(card => {
    card.addEventListener('click', () => {
      const action = card.dataset.action;
      if (action === 'switch-tab') {
        switchToTab(card.dataset.target);
      } else if (action === 'navigate') {
        window.location.hash = card.dataset.href;
      }
    });
  });

  // Add Product toggle
  const addBtn = document.getElementById('add-product-btn');
  const addForm = document.getElementById('add-product-form');
  const cancelBtn = document.getElementById('cancel-add-product');

  if (addBtn) addBtn.addEventListener('click', () => {
    addForm.style.display = addForm.style.display === 'none' ? 'block' : 'none';
  });
  if (cancelBtn) cancelBtn.addEventListener('click', () => { addForm.style.display = 'none'; });

  // Category → Subcategory (Add form)
  setupCategoryLink('[name="category"]', '[name="subcategory"]');
  // Category → Subcategory (Edit form)
  setupCategoryLink('[name="editCategory"]', '[name="editSubcategory"]');

  // Multi-image grid handlers
  setupMultiImageGrid('add');
  setupMultiImageGrid('edit');

  // Add product form submission
  const productForm = document.getElementById('new-product-form');
  if (productForm) {
    productForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = productForm.querySelector('button[type="submit"]');
      btn.textContent = '⏳ Saving...';
      btn.disabled = true;

      const images = await collectImages('add');
      const fd = new FormData(productForm);
      const ok = await saveCustomProduct({
        artNumber: fd.get('artNumber'),
        name: fd.get('name'),
        category: fd.get('category'),
        subcategory: fd.get('subcategory'),
        material: fd.get('material'),
        sizes: fd.get('sizes'),
        description: fd.get('description'),
        image: images.length > 0 ? JSON.stringify(images) : ''
      });
      if (ok) {
        btn.textContent = '✅ Saved!';
        productForm.reset();
        clearAllSlots('add');
        addForm.style.display = 'none';
        await loadSupabaseData();
      } else {
        btn.textContent = '❌ Save Failed';
      }
      btn.disabled = false;
      setTimeout(() => { btn.textContent = '💾 Save to Supabase'; }, 3000);
    });
  }

  // Edit modal close
  const editModal = document.getElementById('edit-modal');
  const closeEditBtn = document.getElementById('close-edit-modal');
  const cancelEditBtn = document.getElementById('cancel-edit-product');
  const closeModal = () => { if (editModal) editModal.style.display = 'none'; };
  if (closeEditBtn) closeEditBtn.addEventListener('click', closeModal);
  if (cancelEditBtn) cancelEditBtn.addEventListener('click', closeModal);
  if (editModal) editModal.addEventListener('click', (e) => { if (e.target === editModal) closeModal(); });

  // Edit form submission (handles both cloud and catalog products)
  const editForm = document.getElementById('edit-product-form');
  if (editForm) {
    editForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = editForm.querySelector('button[type="submit"]');
      btn.textContent = '⏳ Updating...';
      btn.disabled = true;

      const source = editForm.querySelector('[name="editSource"]').value;
      const images = await collectImages('edit');

      const editedData = {
        artNumber: editForm.querySelector('[name="editArtNumber"]').value,
        name: editForm.querySelector('[name="editName"]').value,
        category: editForm.querySelector('[name="editCategory"]').value,
        subcategory: editForm.querySelector('[name="editSubcategory"]').value,
        material: editForm.querySelector('[name="editMaterial"]').value,
        sizes: editForm.querySelector('[name="editSizes"]').value,
        description: editForm.querySelector('[name="editDescription"]').value,
        image: images.length > 0 ? JSON.stringify(images) : ''
      };

      let ok = false;
      if (source === 'catalog') {
        // Update catalog product in-memory + localStorage
        const id = editForm.querySelector('[name="editId"]').value;
        ok = updateProduct(id, editedData);
      } else {
        // Update cloud product in Supabase
        const id = parseInt(editForm.querySelector('[name="editId"]').value);
        ok = await updateCustomProduct(id, editedData);
      }

      btn.textContent = ok ? '✅ Updated!' : '❌ Error';
      btn.disabled = false;
      if (ok) {
        closeModal();
        if (source === 'catalog') {
          // Re-render admin page to reflect changes
          const pageContent = document.getElementById('page-content');
          pageContent.innerHTML = renderAdmin();
          initAdmin();
        } else {
          await loadSupabaseData();
        }
      }
      setTimeout(() => { btn.textContent = '💾 Update Product'; }, 2000);
    });
  }

  // Load data from Supabase
  loadSupabaseData();

  // Bind catalog product edit buttons
  bindCatalogEditButtons();
}

// ---- Helpers ----

function setupCategoryLink(catSelector, subSelector) {
  const catSelect = document.querySelector(catSelector);
  const subSelect = document.querySelector(subSelector);
  if (catSelect && subSelect) {
    catSelect.addEventListener('change', () => {
      const cat = categories.find(c => c.id === catSelect.value);
      subSelect.innerHTML = cat
        ? cat.subcategories.map(s => `<option value="${s.id}">${s.name}</option>`).join('')
        : '<option value="">Select category first</option>';
    });
  }
}

// ---- Multi-Image Grid ----

function setupMultiImageGrid(prefix) {
  for (let i = 1; i <= 6; i++) {
    const input = document.getElementById(prefix + '-img-' + i);
    if (!input) continue;
    const slot = input.closest('.image-slot');
    const preview = slot.querySelector('.image-slot-preview');
    const thumb = slot.querySelector('.image-slot-thumb');
    const placeholder = slot.querySelector('.image-slot-placeholder');
    const removeBtn = slot.querySelector('.image-slot-remove');

    input.addEventListener('change', async () => {
      const file = input.files[0];
      if (file) {
        try {
          const compressed = await compressImage(file);
          thumb.src = compressed;
          thumb.dataset.imageData = compressed;
          preview.style.display = 'flex';
          placeholder.style.display = 'none';
        } catch (err) {
          console.warn('Image compression failed:', err);
          alert('Failed to process image.');
        }
      }
    });

    if (removeBtn) {
      removeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        input.value = '';
        thumb.src = '';
        thumb.dataset.imageData = '';
        preview.style.display = 'none';
        placeholder.style.display = 'flex';
      });
    }
  }
}

async function collectImages(prefix) {
  const images = [];
  for (let i = 1; i <= 6; i++) {
    const slot = document.querySelector('#' + prefix + '-images-grid .image-slot[data-slot="' + i + '"]');
    if (!slot) continue;
    const thumb = slot.querySelector('.image-slot-thumb');
    if (thumb && thumb.dataset.imageData) {
      images.push(thumb.dataset.imageData);
    }
  }
  return images;
}

function clearAllSlots(prefix) {
  for (let i = 1; i <= 6; i++) {
    const input = document.getElementById(prefix + '-img-' + i);
    if (input) input.value = '';
    const slot = input ? input.closest('.image-slot') : null;
    if (!slot) continue;
    const preview = slot.querySelector('.image-slot-preview');
    const thumb = slot.querySelector('.image-slot-thumb');
    const placeholder = slot.querySelector('.image-slot-placeholder');
    if (preview) preview.style.display = 'none';
    if (thumb) { thumb.src = ''; thumb.dataset.imageData = ''; }
    if (placeholder) placeholder.style.display = 'flex';
  }
}

function showExistingImages(prefix, imageData) {
  let images = [];
  if (imageData) {
    try {
      const parsed = JSON.parse(imageData);
      if (Array.isArray(parsed)) images = parsed;
      else images = [imageData];
    } catch (e) {
      if (typeof imageData === 'string' && imageData.startsWith('data:')) {
        images = [imageData];
      }
    }
  }

  clearAllSlots(prefix);

  images.forEach((imgUrl, idx) => {
    const i = idx + 1;
    if (i > 6) return;
    const slot = document.querySelector('#' + prefix + '-images-grid .image-slot[data-slot="' + i + '"]');
    if (!slot) return;
    const preview = slot.querySelector('.image-slot-preview');
    const thumb = slot.querySelector('.image-slot-thumb');
    const placeholder = slot.querySelector('.image-slot-placeholder');
    if (thumb && imgUrl) {
      thumb.src = imgUrl;
      thumb.dataset.imageData = imgUrl;
      if (preview) preview.style.display = 'flex';
      if (placeholder) placeholder.style.display = 'none';
    }
  });
}
