// ============================================================
// Shotric International — Products API
// Wrapper around Supabase for clean product operations
// ============================================================

import { supabase } from './supabase.js';

// ── Fetch all active products (PUBLIC — no pricing) ─────────
export async function getProducts({ category, subcategory, featured } = {}) {
  let query = supabase
    .from('products')
    .select(
      'id, art_number, name, slug, category, subcategory, tags, ' +
      'short_desc, long_desc, materials, sizes, colors, moq, ' +
      'lead_time_days, is_oem, is_private_label, is_wholesale, ' +
      'is_custom, is_featured, image_url, gallery_urls, sort_order'
      // ⚠️  price_usd_from / price_usd_to deliberately omitted
    )
    .eq('is_active', true)
    .order('sort_order', { ascending: true });

  if (category)    query = query.eq('category', category);
  if (subcategory) query = query.eq('subcategory', subcategory);
  if (featured)    query = query.eq('is_featured', true);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

// ── Fetch all products (ADMIN — includes pricing) ────────────
export async function getProductsAdmin({ category, subcategory } = {}) {
  let query = supabase
    .from('products')
    .select('*')
    .order('sort_order', { ascending: true });

  if (category)    query = query.eq('category', category);
  if (subcategory) query = query.eq('subcategory', subcategory);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

// ── Fetch single product by slug ─────────────────────────────
export async function getProductBySlug(slug) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single();
  if (error) throw error;
  return data;
}

// ── Create product ───────────────────────────────────────────
export async function createProduct(productData) {
  const { data, error } = await supabase
    .from('products')
    .insert([productData])
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ── Update product ───────────────────────────────────────────
export async function updateProduct(id, updates) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ── Delete product (soft delete) ─────────────────────────────
export async function deleteProduct(id) {
  const { error } = await supabase
    .from('products')
    .update({ is_active: false })
    .eq('id', id);
  if (error) throw error;
}

// ── Upload product image to Supabase Storage ─────────────────
export async function uploadProductImage(file, artNumber) {
  const ext      = file.name.split('.').pop();
  const filePath = `products/${artNumber}-${Date.now()}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(filePath, file, { upsert: true });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(filePath);

  return data.publicUrl;
}

// ── Save catalog lead ────────────────────────────────────────
export async function saveCatalogLead(lead) {
  const { data, error } = await supabase
    .from('catalog_leads')
    .insert([lead])
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ── Get all leads ────────────────────────────────────────────
export async function getLeads() {
  const { data, error } = await supabase
    .from('catalog_leads')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

// ── Save inquiry ─────────────────────────────────────────────
export async function saveInquiry(inquiry) {
  const { data, error } = await supabase
    .from('inquiries')
    .insert([inquiry])
    .select()
    .single();
  if (error) throw error;
  return data;
}

// ── Helper: generate slug from name ─────────────────────────
export function generateSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// ── Helper: generate art number ─────────────────────────────
export function generateArtNumber(category, subcategory, count) {
  const catMap = { 'combat-sports': 'CS', 'apparel': 'AP' };
  const subMap = {
    'boxing-gloves':    'BG',
    'mma-gloves':       'MMA',
    'head-guards':      'HG',
    'hand-wraps':       'HW',
    'tracksuits':       'TS',
    'hoodies':          'HD',
    'compression-wear': 'CW',
    'custom-sportswear':'SW',
  };
  const cat = catMap[category] || 'XX';
  const sub = subMap[subcategory] || 'XX';
  return `SB-${cat}-${sub}-${String(count).padStart(3,'0')}`;
}
