/* ══════════════════════════════════════════════════════════════
   SHOTRIC INTERNATIONAL — Admin Panel JavaScript
   Connects to Supabase, manages products, leads & inquiries
   ══════════════════════════════════════════════════════════════ */

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL      = 'https://wsliasfayrewbnrmlopq.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndzbGlhc2ZheXJld2Jucm1sb3BxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE4ODMzODUsImV4cCI6MjA5NzQ1OTM4NX0._sna3QfXKygeVv65hRkq_CmCteCkDlVWRmzChI-p5Y0';

const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

/* ── State ──────────────────────────────────────────────────── */
let allProducts   = [];
let allLeads      = [];
let allInquiries  = [];
let editingId     = null;
let deleteTargetId = null;

/* ── DOM refs ──────────────────────────────────────────────── */
const $  = id => document.getElementById(id);
const dbStatus     = $('db-status');
const dbStatusText = $('db-status-text');

/* ══════════════════════════════════════════════════════════════
   INIT
══════════════════════════════════════════════════════════════ */
async function init() {
  setStatus('connecting');
  try {
    await loadProducts();
    await loadLeads();
    await loadInquiries();
    setStatus('connected');
  } catch (e) {
    setStatus('error', e.message);
  }
}

/* ── Status indicator ─────────────────────────────────────── */
function setStatus(state, msg = '') {
  const dot  = dbStatus.querySelector('.admin-status__dot');
  const map  = {
    connecting: ['#f59e0b', 'Connecting…'],
    connected:  ['#22c55e', 'Supabase Connected'],
    error:      ['#ef4444', 'Connection Error'],
  };
  const [color, label] = map[state] || ['#888', msg];
  dot.style.background   = color;
  dot.style.boxShadow    = `0 0 6px ${color}`;
  dbStatusText.textContent = msg || label;
}

/* ══════════════════════════════════════════════════════════════
   TAB SWITCHING
══════════════════════════════════════════════════════════════ */
window.switchTab = function(tab) {
  document.querySelectorAll('.sidebar__link').forEach(l => l.classList.remove('active'));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelector(`[data-tab="${tab}"]`)?.classList.add('active');
  $(`panel-${tab}`)?.classList.add('active');
  const titles = {
    products:    ['Products',  'Manage your product catalog'],
    'add-product':['Add Product','Fill in the form to add a new product'],
    leads:       ['Leads',     'Catalog download leads from your website'],
    inquiries:   ['Inquiries', 'Quote requests from potential buyers'],
  };
  const [title, sub] = titles[tab] || ['Admin', ''];
  $('page-title').textContent = title;
  $('page-sub').textContent   = sub;
};

document.querySelectorAll('.sidebar__link').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

/* ══════════════════════════════════════════════════════════════
   PRODUCTS
══════════════════════════════════════════════════════════════ */
async function loadProducts() {
  const { data, error } = await db
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true });

  if (error) throw error;
  allProducts = data || [];
  renderProducts(allProducts);
  updateStats();
}

function updateStats() {
  $('stat-total').textContent   = allProducts.length;
  $('stat-featured').textContent = allProducts.filter(p => p.is_featured).length;
  $('stat-combat').textContent  = allProducts.filter(p => p.category === 'combat-sports').length;
  $('stat-apparel').textContent = allProducts.filter(p => p.category === 'apparel').length;
}

function renderProducts(products) {
  const tbody = $('products-tbody');
  if (!products.length) {
    tbody.innerHTML = `<tr><td colspan="8" class="table-loading">
      No products found. <button class="btn-link" onclick="switchTab('add-product')">Add one →</button>
    </td></tr>`;
    return;
  }

  tbody.innerHTML = products.map(p => {
    const galleryCount = (p.gallery_urls || []).length;
    const tags = (p.tags || []).slice(0,3).map(t =>
      `<span class="tag-pill">${t}</span>`).join('');
    const img = p.image_url
      ? `<img src="${p.image_url}" class="product-thumb" alt="${p.name}" onerror="this.style.display='none'" />`
      : `<div class="product-thumb product-thumb--empty">📦</div>`;

    return `<tr>
      <td><code class="art-num">${p.art_number}</code></td>
      <td>
        <div class="product-cell">
          ${img}
          <div>
            <strong>${p.name}</strong>
            <span class="product-cell__sub">${galleryCount} image${galleryCount !== 1 ? 's' : ''} · ${(p.colors||[]).length} colours</span>
          </div>
        </div>
      </td>
      <td>
        <span class="cat-badge cat-badge--${p.category}">${p.category === 'combat-sports' ? '🥊 Combat' : '👕 Apparel'}</span>
      </td>
      <td><strong>${p.moq}</strong> <small>units</small></td>
      <td class="price-cell">
        <span class="price-lock" title="Internal only — not shown on website">
          🔒 $${Number(p.price_usd_from).toFixed(2)}–$${Number(p.price_usd_to).toFixed(2)}
        </span>
      </td>
      <td><div class="tags-cell">${tags}</div></td>
      <td>${p.is_featured
        ? '<span class="featured-yes">⭐ Yes</span>'
        : '<span class="featured-no">–</span>'}</td>
      <td>
        <div class="action-btns">
          <button class="btn-icon btn-icon--edit" title="Edit" onclick="editProduct(${p.id})">✏️</button>
          <button class="btn-icon btn-icon--delete" title="Delete" onclick="confirmDelete(${p.id})">🗑️</button>
        </div>
      </td>
    </tr>`;
  }).join('');
}

/* ── Filters ─────────────────────────────────────────────── */
$('search-products').addEventListener('input', applyFilters);
$('filter-category').addEventListener('change', applyFilters);
$('filter-featured').addEventListener('change', applyFilters);

function applyFilters() {
  const q    = $('search-products').value.toLowerCase();
  const cat  = $('filter-category').value;
  const feat = $('filter-featured').value;

  const filtered = allProducts.filter(p => {
    const matchQ    = !q   || p.name.toLowerCase().includes(q) || p.art_number.toLowerCase().includes(q);
    const matchCat  = !cat || p.category === cat;
    const matchFeat = !feat|| String(p.is_featured) === feat;
    return matchQ && matchCat && matchFeat;
  });
  renderProducts(filtered);
}

/* ══════════════════════════════════════════════════════════════
   ADD / EDIT PRODUCT FORM
══════════════════════════════════════════════════════════════ */
const subcats = {
  'combat-sports': ['boxing-gloves','mma-gloves','head-guards','hand-wraps','punch-mitts','heavy-bag','shin-guards'],
  'apparel':       ['tracksuits','hoodies','compression-wear','fight-shorts','custom-sportswear'],
};

window.updateSubcategories = function() {
  const cat = $('f-category').value;
  const sel = $('f-subcategory');
  sel.innerHTML = (subcats[cat] || []).map(s =>
    `<option value="${s}">${s}</option>`).join('') || '<option value="">Select category first</option>';
};

window.autoSlug = function(val) {
  if (editingId) return; // don't overwrite slug when editing
  $('f-slug').value = val.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
};

window.editProduct = function(id) {
  const p = allProducts.find(x => x.id === id);
  if (!p) return;
  editingId = id;

  $('edit-product-id').value = id;
  $('form-panel-title').textContent = 'Edit Product';
  $('f-art-number').value   = p.art_number   || '';
  $('f-name').value         = p.name         || '';
  $('f-slug').value         = p.slug         || '';
  $('f-category').value     = p.category     || '';
  updateSubcategories();
  $('f-subcategory').value  = p.subcategory  || '';
  $('f-tags').value         = (p.tags        || []).join(', ');
  $('f-short-desc').value   = p.short_desc   || '';
  $('f-long-desc').value    = p.long_desc    || '';
  $('f-materials').value    = (p.materials   || []).join(', ');
  $('f-sizes').value        = (p.sizes       || []).join(', ');
  $('f-colors').value       = (p.colors      || []).join(', ');
  $('f-price-from').value   = p.price_usd_from || '';
  $('f-price-to').value     = p.price_usd_to   || '';
  $('f-moq').value          = p.moq            || 25;
  $('f-lead-time').value    = p.lead_time_days || 30;
  $('f-is-oem').checked     = p.is_oem;
  $('f-is-pl').checked      = p.is_private_label;
  $('f-is-ws').checked      = p.is_wholesale;
  $('f-is-custom').checked  = p.is_custom;
  $('f-is-featured').checked= p.is_featured;
  $('f-is-active').checked  = p.is_active;
  $('f-image-url').value    = p.image_url    || '';
  $('f-sort-order').value   = p.sort_order   || 0;

  if (p.image_url) {
    $('preview-img').src      = p.image_url;
    $('image-preview').hidden = false;
  }

  switchTab('add-product');
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

window.resetForm = function() {
  editingId = null;
  $('product-form').reset();
  $('edit-product-id').value = '';
  $('form-panel-title').textContent = 'Add New Product';
  $('image-preview').hidden = true;
  switchTab('products');
};

/* ── Form submit ─────────────────────────────────────────── */
$('product-form').addEventListener('submit', async e => {
  e.preventDefault();
  const btn = $('submit-btn');
  btn.disabled = true;
  btn.textContent = 'Saving…';

  const payload = {
    art_number:      $('f-art-number').value.trim(),
    name:            $('f-name').value.trim(),
    slug:            $('f-slug').value.trim(),
    category:        $('f-category').value,
    subcategory:     $('f-subcategory').value,
    tags:            $('f-tags').value.split(',').map(s=>s.trim()).filter(Boolean),
    short_desc:      $('f-short-desc').value.trim(),
    long_desc:       $('f-long-desc').value.trim(),
    materials:       $('f-materials').value.split(',').map(s=>s.trim()).filter(Boolean),
    sizes:           $('f-sizes').value.split(',').map(s=>s.trim()).filter(Boolean),
    colors:          $('f-colors').value.split(',').map(s=>s.trim()).filter(Boolean),
    price_usd_from:  parseFloat($('f-price-from').value) || 0,
    price_usd_to:    parseFloat($('f-price-to').value)   || 0,
    moq:             parseInt($('f-moq').value)           || 25,
    lead_time_days:  parseInt($('f-lead-time').value)     || 30,
    is_oem:          $('f-is-oem').checked,
    is_private_label:$('f-is-pl').checked,
    is_wholesale:    $('f-is-ws').checked,
    is_custom:       $('f-is-custom').checked,
    is_featured:     $('f-is-featured').checked,
    is_active:       $('f-is-active').checked,
    image_url:       $('f-image-url').value.trim(),
    sort_order:      parseInt($('f-sort-order').value) || 0,
  };

  let error;
  if (editingId) {
    ({ error } = await db.from('products').update(payload).eq('id', editingId));
  } else {
    ({ error } = await db.from('products').insert(payload));
  }

  btn.disabled = false;
  btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> Save Product`;

  if (error) {
    showToast('❌ Error: ' + error.message, 'error');
  } else {
    showToast(editingId ? '✅ Product updated!' : '✅ Product added!', 'success');
    await loadProducts();
    resetForm();
  }
});

/* ── Delete ──────────────────────────────────────────────── */
window.confirmDelete = function(id) {
  deleteTargetId = id;
  $('confirm-modal').hidden = false;
};
window.closeConfirm = function() {
  deleteTargetId = null;
  $('confirm-modal').hidden = true;
};
$('confirm-delete-btn').addEventListener('click', async () => {
  if (!deleteTargetId) return;
  const { error } = await db.from('products')
    .update({ is_active: false })
    .eq('id', deleteTargetId);
  closeConfirm();
  if (error) {
    showToast('❌ ' + error.message, 'error');
  } else {
    showToast('🗑️ Product hidden from website', 'success');
    await loadProducts();
  }
});

/* ── Image preview ─────────────────────────────────────────── */
$('f-image-url').addEventListener('input', function() {
  if (this.value) {
    $('preview-img').src      = this.value;
    $('image-preview').hidden = false;
  } else {
    $('image-preview').hidden = true;
  }
});
$('remove-image').addEventListener('click', () => {
  $('f-image-url').value    = '';
  $('preview-img').src      = '';
  $('image-preview').hidden = true;
});

/* ══════════════════════════════════════════════════════════════
   LEADS
══════════════════════════════════════════════════════════════ */
async function loadLeads() {
  const { data, error } = await db
    .from('catalog_leads')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  allLeads = data || [];
  $('leads-count').textContent = allLeads.length || '';

  const tbody = $('leads-tbody');
  if (!allLeads.length) {
    tbody.innerHTML = `<tr><td colspan="8" class="table-loading">No leads yet. Leads appear when visitors download your catalog.</td></tr>`;
    return;
  }
  tbody.innerHTML = allLeads.map((l, i) => `
    <tr>
      <td>${i + 1}</td>
      <td><strong>${esc(l.name)}</strong></td>
      <td>${esc(l.company)}</td>
      <td><a href="mailto:${esc(l.email)}" class="email-link">${esc(l.email)}</a></td>
      <td>${esc(l.country) || '–'}</td>
      <td><span class="cat-pill">${esc(l.catalog?.split('/').pop()) || '–'}</span></td>
      <td>${esc(l.phone) || '–'}</td>
      <td>${new Date(l.created_at).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}</td>
    </tr>`).join('');
}

window.exportLeads = function() {
  if (!allLeads.length) { showToast('No leads to export', 'error'); return; }
  const headers = ['Name','Company','Email','Country','Phone','Catalog','Date'];
  const rows    = allLeads.map(l => [
    l.name, l.company, l.email, l.country, l.phone,
    l.catalog?.split('/').pop() || '',
    new Date(l.created_at).toLocaleDateString()
  ]);
  const csv = [headers, ...rows].map(r => r.map(v => `"${(v||'').replace(/"/g,'""')}"`).join(',')).join('\n');
  const a   = document.createElement('a');
  a.href    = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
  a.download = `shotric-leads-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  showToast('✅ CSV exported!', 'success');
};

/* ══════════════════════════════════════════════════════════════
   INQUIRIES
══════════════════════════════════════════════════════════════ */
async function loadInquiries() {
  const { data, error } = await db
    .from('inquiries')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  allInquiries = data || [];

  const tbody = $('inquiries-tbody');
  if (!allInquiries.length) {
    tbody.innerHTML = `<tr><td colspan="8" class="table-loading">No inquiries yet. Inquiries appear when visitors submit the quote form.</td></tr>`;
    return;
  }
  tbody.innerHTML = allInquiries.map((inq, i) => `
    <tr>
      <td>${i + 1}</td>
      <td><strong>${esc(inq.name)}</strong></td>
      <td>${esc(inq.company) || '–'}</td>
      <td><a href="mailto:${esc(inq.email)}" class="email-link">${esc(inq.email)}</a></td>
      <td>${esc(inq.product) || '–'}</td>
      <td class="msg-cell" title="${esc(inq.message)}">${esc(inq.message?.substring(0,60))}${inq.message?.length > 60 ? '…' : ''}</td>
      <td>${new Date(inq.created_at).toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'})}</td>
      <td>
        <button class="btn-icon btn-icon--delete" title="Delete" onclick="deleteInquiry(${inq.id})">🗑️</button>
      </td>
    </tr>`).join('');
}

window.deleteInquiry = async function(id) {
  if (!confirm('Delete this inquiry?')) return;
  const { error } = await db.from('inquiries').delete().eq('id', id);
  if (error) { showToast('❌ ' + error.message, 'error'); return; }
  showToast('🗑️ Inquiry deleted', 'success');
  await loadInquiries();
};

/* ══════════════════════════════════════════════════════════════
   TOAST
══════════════════════════════════════════════════════════════ */
let toastTimer;
function showToast(msg, type = 'success') {
  const toast = $('toast');
  toast.textContent = msg;
  toast.className   = `toast toast--${type} toast--visible`;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('toast--visible'), 3500);
}

/* ── Utility ──────────────────────────────────────────────── */
function esc(str) {
  return String(str ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ── Start ────────────────────────────────────────────────── */
init();
