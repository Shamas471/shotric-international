-- ============================================================
-- Shotric International — Full Products Schema
-- Run in: Supabase Dashboard → SQL Editor → New Query → Run
-- ============================================================

-- ── 1. DROP old table if re-running ────────────────────────
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS catalog_leads CASCADE;

-- ── 2. PRODUCTS TABLE ──────────────────────────────────────
CREATE TABLE products (
  id              BIGSERIAL PRIMARY KEY,

  -- Identity
  art_number      TEXT UNIQUE NOT NULL,          -- e.g. "SB-BG-001"
  name            TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,          -- URL-friendly name

  -- Classification
  category        TEXT NOT NULL,                 -- 'combat-sports' | 'apparel'
  subcategory     TEXT NOT NULL,                 -- 'boxing-gloves' | 'tracksuits' …
  tags            TEXT[] DEFAULT '{}',           -- ['oem', 'private-label', 'bestseller']

  -- Description
  short_desc      TEXT DEFAULT '',
  long_desc       TEXT DEFAULT '',

  -- Specs
  materials       TEXT[] DEFAULT '{}',           -- ['Genuine Leather', 'Foam Padding']
  sizes           TEXT[] DEFAULT '{}',           -- ['8oz','10oz','12oz','14oz','16oz']
  colors          TEXT[] DEFAULT '{}',           -- ['Red', 'Black', 'Blue', 'Custom']
  weight_options  TEXT[] DEFAULT '{}',           -- for gloves: ['8oz','10oz'...]

  -- Pricing & MOQ
  price_usd_from  NUMERIC(10,2) DEFAULT 0,       -- starting price per unit
  price_usd_to    NUMERIC(10,2) DEFAULT 0,       -- upper range
  moq             INTEGER DEFAULT 25,            -- minimum order quantity
  lead_time_days  INTEGER DEFAULT 30,            -- production lead time

  -- Manufacturing
  is_oem          BOOLEAN DEFAULT true,
  is_private_label BOOLEAN DEFAULT true,
  is_wholesale    BOOLEAN DEFAULT true,
  is_custom       BOOLEAN DEFAULT false,

  -- Media
  image_url       TEXT DEFAULT '',               -- primary image
  gallery_urls    TEXT[] DEFAULT '{}',           -- additional images

  -- Status
  is_featured     BOOLEAN DEFAULT false,
  is_active       BOOLEAN DEFAULT true,
  sort_order      INTEGER DEFAULT 0,

  -- Timestamps
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── 3. CATALOG LEADS TABLE ─────────────────────────────────
CREATE TABLE catalog_leads (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  company     TEXT NOT NULL,
  email       TEXT NOT NULL,
  country     TEXT DEFAULT '',
  phone       TEXT DEFAULT '',
  catalog     TEXT DEFAULT '',              -- which catalog they downloaded
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── 4. INQUIRIES TABLE (enhanced) ──────────────────────────
CREATE TABLE IF NOT EXISTS inquiries (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  company     TEXT DEFAULT '',
  product     TEXT DEFAULT '',
  message     TEXT DEFAULT '',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── 5. AUTO-UPDATE updated_at TRIGGER ──────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ── 6. ROW LEVEL SECURITY ──────────────────────────────────
ALTER TABLE products       ENABLE ROW LEVEL SECURITY;
ALTER TABLE catalog_leads  ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries      ENABLE ROW LEVEL SECURITY;

-- Products: public read, admin write
CREATE POLICY "Public read products"
  ON products FOR SELECT USING (is_active = true);

CREATE POLICY "Admin full access products"
  ON products FOR ALL USING (true) WITH CHECK (true);

-- Leads: insert only for public
CREATE POLICY "Public insert leads"
  ON catalog_leads FOR INSERT WITH CHECK (true);

CREATE POLICY "Admin read leads"
  ON catalog_leads FOR SELECT USING (true);

-- Inquiries: public insert + read
CREATE POLICY "Public insert inquiries"
  ON inquiries FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read inquiries"
  ON inquiries FOR SELECT USING (true);

CREATE POLICY "Admin delete inquiries"
  ON inquiries FOR DELETE USING (true);

-- ── 7. INDEXES for performance ─────────────────────────────
CREATE INDEX idx_products_category    ON products(category);
CREATE INDEX idx_products_subcategory ON products(subcategory);
CREATE INDEX idx_products_featured    ON products(is_featured);
CREATE INDEX idx_products_active      ON products(is_active);
CREATE INDEX idx_leads_email          ON catalog_leads(email);
CREATE INDEX idx_leads_created        ON catalog_leads(created_at);

-- ── 8. SEED DATA — Sample Products ─────────────────────────
INSERT INTO products (art_number, name, slug, category, subcategory, tags, short_desc, long_desc, materials, sizes, colors, moq, price_usd_from, price_usd_to, is_oem, is_private_label, is_featured, sort_order) VALUES

-- Combat Sports
('SB-BG-001', 'Pro Training Boxing Gloves', 'pro-training-boxing-gloves',
 'combat-sports', 'boxing-gloves',
 ARRAY['oem','private-label','bestseller'],
 'Premium OEM boxing gloves for professional training. Full custom branding available.',
 'Our best-selling OEM boxing gloves are crafted from premium genuine leather with multi-layered foam padding. Available in all weights and fully customisable — logo, colors, lining, and packaging.',
 ARRAY['Genuine Leather','Multi-layer Foam','Velcro Wrist Strap'],
 ARRAY['8oz','10oz','12oz','14oz','16oz','18oz'],
 ARRAY['Black','Red','Blue','White','Custom'],
 25, 12.00, 28.00, true, true, true, 1),

('SB-BG-002', 'Competition Boxing Gloves', 'competition-boxing-gloves',
 'combat-sports', 'boxing-gloves',
 ARRAY['oem','competition'],
 'WBC/AIBA-spec competition boxing gloves. Approved for amateur and professional bouts.',
 'Competition-grade boxing gloves built to international boxing standards. Thumb-attached design, pre-curved palm, and durable lace-up closure.',
 ARRAY['Genuine Cowhide Leather','Horsehair Padding','Cotton Lining'],
 ARRAY['10oz','12oz'],
 ARRAY['Red','Blue'],
 50, 18.00, 35.00, true, false, false, 2),

('SB-MMA-001', 'MMA Sparring Gloves', 'mma-sparring-gloves',
 'combat-sports', 'mma-gloves',
 ARRAY['oem','private-label','mma'],
 'Open-palm MMA gloves for grappling and sparring. OEM & private label available.',
 'Hybrid MMA gloves designed for both striking and grappling. Engineered with cut-resistant stitching and high-density foam for knuckle protection.',
 ARRAY['Synthetic Leather','High-density Foam','Mesh Palm'],
 ARRAY['S/M','L/XL'],
 ARRAY['Black','Red','Blue','Custom'],
 25, 8.00, 18.00, true, true, false, 3),

('SB-HG-001', 'Pro Head Guard', 'pro-head-guard',
 'combat-sports', 'head-guards',
 ARRAY['oem','private-label','protection'],
 'Full-face head guard with cheek and chin protection. Custom branding available.',
 'Premium boxing head guard with extended cheek, chin, and ear protection. Adjustable velcro straps for a secure fit. Ideal for sparring and training.',
 ARRAY['PU Leather','EVA Foam','Velcro Adjustable Straps'],
 ARRAY['S','M','L','XL'],
 ARRAY['Black','Red','Blue','Custom'],
 25, 14.00, 30.00, true, true, false, 4),

('SB-HW-001', 'Premium Hand Wraps', 'premium-hand-wraps',
 'combat-sports', 'hand-wraps',
 ARRAY['wholesale','private-label'],
 'Semi-elastic cotton hand wraps with thumb loop. Custom labels available.',
 '4.5m semi-elastic cotton hand wraps with reinforced thumb loop. Machine washable. Custom printed labels and packaging available for private label orders.',
 ARRAY['Semi-elastic Cotton'],
 ARRAY['4.5m'],
 ARRAY['Black','Red','White','Custom'],
 100, 1.50, 4.00, false, true, false, 5),

-- Apparel
('SB-TS-001', 'Custom Tracksuit Set', 'custom-tracksuit-set',
 'apparel', 'tracksuits',
 ARRAY['oem','private-label','custom','bestseller'],
 'Full custom tracksuit with jacket and pants. Sublimation or embroidery branding.',
 'Premium combat sports tracksuit available in polyester or poly-cotton blend. Full sublimation printing or embroidery for logos. Custom zipper pulls, drawstrings, and packaging.',
 ARRAY['100% Polyester','Poly-Cotton Blend'],
 ARRAY['XS','S','M','L','XL','2XL','3XL'],
 ARRAY['Custom (Any Color)'],
 25, 15.00, 40.00, true, true, true, 6),

('SB-HD-001', 'Heavyweight Boxing Hoodie', 'heavyweight-boxing-hoodie',
 'apparel', 'hoodies',
 ARRAY['private-label','custom'],
 '380gsm fleece hoodie with custom embroidery or screen print. Combat sports branding.',
 'Premium 380gsm cotton-fleece hoodie with kangaroo pocket, reinforced seams, and double-lined hood. Available with custom embroidery, screen print, or DTG printing.',
 ARRAY['380gsm Cotton Fleece','Polyester Lining'],
 ARRAY['S','M','L','XL','2XL','3XL'],
 ARRAY['Black','Navy','Grey','Custom'],
 25, 14.00, 32.00, false, true, false, 7),

('SB-CW-001', 'Compression Rash Guard', 'compression-rash-guard',
 'apparel', 'compression-wear',
 ARRAY['oem','private-label','mma'],
 'UPF50+ spandex rash guard for MMA, BJJ, and wrestling. Full sublimation print.',
 'Performance compression rash guard made from 4-way stretch spandex. Flatlock stitching prevents chafing. Full sublimation printing for vibrant, long-lasting team or brand graphics.',
 ARRAY['88% Polyester','12% Spandex'],
 ARRAY['XS','S','M','L','XL','2XL'],
 ARRAY['Custom (Full Sublimation)'],
 25, 10.00, 22.00, true, true, false, 8),

('SB-SW-001', 'Custom Sportswear Set', 'custom-sportswear-set',
 'apparel', 'custom-sportswear',
 ARRAY['oem','private-label','custom','full-custom'],
 'Complete custom sportswear set — shorts, top, and rash guard. Full brand packaging.',
 'Design your complete team or brand sportswear line. We handle everything from pattern development and fabric sourcing to custom packaging and export documentation.',
 ARRAY['Custom Fabric Options'],
 ARRAY['Custom Sizing Available'],
 ARRAY['Custom (Any Color / Print)'],
 25, 20.00, 60.00, true, true, true, 9);

-- ── Done ────────────────────────────────────────────────────
SELECT 'Schema created & ' || COUNT(*) || ' products seeded ✅' AS result FROM products;
