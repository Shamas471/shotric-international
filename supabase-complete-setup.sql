-- ============================================================
-- SHOTRIC INTERNATIONAL — Complete Setup + All 11 Products
-- 
-- HOW TO RUN:
--   1. Go to https://supabase.com/dashboard
--   2. Open your project: wsliasfayrewbnrmlopq
--   3. Click "SQL Editor" in left sidebar
--   4. Click "New query"
--   5. Copy ALL of this file and paste it in
--   6. Click "Run" (Ctrl+Enter)
--   7. You should see: "11 products inserted ✅"
-- ============================================================

-- ── STEP 1: Drop & recreate tables (safe to re-run) ─────────
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS catalog_leads CASCADE;
DROP TABLE IF EXISTS inquiries CASCADE;

-- ── STEP 2: Products table ───────────────────────────────────
CREATE TABLE products (
  id              BIGSERIAL PRIMARY KEY,
  art_number      TEXT UNIQUE NOT NULL,
  name            TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  category        TEXT NOT NULL,
  subcategory     TEXT NOT NULL,
  tags            TEXT[] DEFAULT '{}',
  short_desc      TEXT DEFAULT '',
  long_desc       TEXT DEFAULT '',
  materials       TEXT[] DEFAULT '{}',
  sizes           TEXT[] DEFAULT '{}',
  colors          TEXT[] DEFAULT '{}',
  weight_options  TEXT[] DEFAULT '{}',
  price_usd_from  NUMERIC(10,2) DEFAULT 0,
  price_usd_to    NUMERIC(10,2) DEFAULT 0,
  moq             INTEGER DEFAULT 25,
  lead_time_days  INTEGER DEFAULT 30,
  is_oem          BOOLEAN DEFAULT true,
  is_private_label BOOLEAN DEFAULT true,
  is_wholesale    BOOLEAN DEFAULT true,
  is_custom       BOOLEAN DEFAULT false,
  image_url       TEXT DEFAULT '',
  gallery_urls    TEXT[] DEFAULT '{}',
  is_featured     BOOLEAN DEFAULT false,
  is_active       BOOLEAN DEFAULT true,
  sort_order      INTEGER DEFAULT 0,
  created_at      TIMESTAMPTZ DEFAULT NOW(),
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- ── STEP 3: Catalog leads table ──────────────────────────────
CREATE TABLE catalog_leads (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  company     TEXT NOT NULL,
  email       TEXT NOT NULL,
  country     TEXT DEFAULT '',
  phone       TEXT DEFAULT '',
  catalog     TEXT DEFAULT '',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── STEP 4: Inquiries table ───────────────────────────────────
CREATE TABLE inquiries (
  id          BIGSERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  company     TEXT DEFAULT '',
  product     TEXT DEFAULT '',
  message     TEXT DEFAULT '',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- ── STEP 5: Row Level Security ────────────────────────────────
ALTER TABLE products      ENABLE ROW LEVEL SECURITY;
ALTER TABLE catalog_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries     ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read products"    ON products FOR SELECT USING (is_active = true);
CREATE POLICY "Admin full products"     ON products FOR ALL   USING (true) WITH CHECK (true);
CREATE POLICY "Public insert leads"     ON catalog_leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin read leads"        ON catalog_leads FOR SELECT USING (true);
CREATE POLICY "Public insert inquiries" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read inquiries"   ON inquiries FOR SELECT USING (true);
CREATE POLICY "Admin delete inquiries"  ON inquiries FOR DELETE USING (true);

-- ── STEP 6: Indexes ───────────────────────────────────────────
CREATE INDEX idx_products_category    ON products(category);
CREATE INDEX idx_products_subcategory ON products(subcategory);
CREATE INDEX idx_products_featured    ON products(is_featured);
CREATE INDEX idx_leads_email          ON catalog_leads(email);

-- ── STEP 7: Insert ALL 11 Products ───────────────────────────
INSERT INTO products (
  art_number, name, slug, category, subcategory,
  tags, short_desc, long_desc, materials, sizes, colors, weight_options,
  moq, lead_time_days, is_oem, is_private_label, is_wholesale, is_custom,
  image_url, gallery_urls, is_featured, sort_order
) VALUES

-- 1. Boxing Gloves (7 colour variants)
('SI-BG-001','Pro Boxing Gloves','boxing-gloves','combat-sports','boxing-gloves',
 ARRAY['oem','private-label','bestseller','custom-logo','wholesale','export-ready'],
 'Premium full-grain leather boxing gloves engineered for training and competition. Custom logo embossing available.',
 'Our flagship boxing gloves are crafted from premium full-grain cowhide leather with multi-layer foam padding. Reinforced thumb attachment, velcro wrist support, moisture-wicking inner lining. Available in 7 colour options. Used by gyms and fight brands in 35+ countries. Full OEM, private label and white-label manufacturing available.',
 ARRAY['Full-grain Cowhide Leather','Multi-layer Foam','Velcro Wrist Strap','Cotton Lining'],
 ARRAY['8oz','10oz','12oz','14oz','16oz','18oz'],
 ARRAY['Black/Red','Red/White','Royal Blue','White/Gold','Forest Green','Gold/Black','Purple/Silver'],
 ARRAY['8oz','10oz','12oz','14oz','16oz','18oz'],
 25, 35, true, true, true, true,
 '/boxing-gloves-shotric.png',
 ARRAY['/boxing-gloves-shotric.png','/boxing-gloves-red.png','/boxing-gloves-blue.png',
       '/boxing-gloves-white-gold.png','/boxing-gloves-green.png',
       '/boxing-gloves-gold.png','/boxing-gloves-purple.png'],
 true, 1),

-- 2. MMA Gloves (4 colour variants)
('SI-MMA-001','MMA Sparring Gloves','mma-gloves','combat-sports','mma-gloves',
 ARRAY['oem','private-label','mma','grappling','custom-sizes'],
 'Open-palm MMA grappling gloves with reinforced knuckle protection. 4oz–7oz. Full custom branding.',
 'Hybrid open-palm MMA gloves for both striking and grappling. High-density foam knuckle guard with breathable mesh palm panel. Velcro wrist closure. Available in 4 colour options. OEM and private label orders welcome.',
 ARRAY['Full-grain Leather','High-density Foam','Mesh Palm Panel','Velcro Closure'],
 ARRAY['S/M','L/XL'],
 ARRAY['Black/Red','Deep Red','Royal Blue','Gold/Black'],
 ARRAY['4oz','5oz','6oz','7oz'],
 25, 35, true, true, false, true,
 '/mma-gloves-shotric.png',
 ARRAY['/mma-gloves-shotric.png','/mma-gloves-red.png','/mma-gloves-blue.png','/mma-gloves-gold.png'],
 true, 2),

-- 3. Head Guards (4 colour variants)
('SI-HG-001','Professional Head Guard','head-guards','combat-sports','head-guards',
 ARRAY['oem','boxing','muay-thai','custom','protection'],
 'Multi-layer foam head guard with cheek and chin protection. Open-face and full-face designs available.',
 'Premium boxing head guard — extended cheek guards, chin bar, padded forehead. EVA foam core with genuine leather shell. Open-face and full-face configurations. 4 colour options with OEM logo and custom padding density.',
 ARRAY['Genuine Leather','EVA Foam','Adjustable Velcro Straps'],
 ARRAY['S','M','L','XL'],
 ARRAY['Black/Red','Bold Red','Royal Blue','Gold/Black'],
 ARRAY[]::TEXT[],
 30, 35, true, true, false, true,
 '/head-guard-shotric.png',
 ARRAY['/head-guard-shotric.png','/head-guard-red.png','/head-guard-blue.png','/head-guard-gold.png'],
 false, 3),

-- 4. Hand Wraps (3 colour variants)
('SI-HW-001','Premium Hand Wraps','hand-wraps','combat-sports','hand-wraps',
 ARRAY['wholesale','private-label','custom-label','all-colours','boxing','muay-thai'],
 'Professional 180" semi-elastic hand wraps with thumb loop. Custom woven labels available.',
 'Semi-elastic 180" cotton hand wraps with reinforced thumb loop and hook-and-loop closure. Machine washable. 3 colour options. Custom woven brand labels and retail packaging for private label bulk orders.',
 ARRAY['Semi-elastic Cotton','Hook-and-loop Closure'],
 ARRAY['180" (4.5m)'],
 ARRAY['Red','Royal Blue','Black/Red'],
 ARRAY[]::TEXT[],
 100, 25, false, true, true, false,
 '/hand-wraps-shotric.png',
 ARRAY['/hand-wraps-shotric.png','/hand-wraps-blue.png','/hand-wraps-black.png'],
 false, 4),

-- 5. Punch Mitts (3 colour variants)
('SI-PM-001','Punch Mitts / Focus Pads','punch-mitts','combat-sports','punch-mitts',
 ARRAY['oem','boxing','muay-thai','custom-logo','wholesale'],
 'Curved focus pads with shock-absorbing multi-layer foam. Full-grain leather. Custom logo available.',
 'Professional curved focus pads with shock-absorbing multi-layer foam core. Full-grain leather outer shell with padded wrist support strap. 3 colour options with OEM logo and custom colour manufacturing.',
 ARRAY['Full-grain Leather','Multi-layer Foam','Padded Wrist Strap'],
 ARRAY['Standard'],
 ARRAY['Black/Red','Royal Blue','Bold Red'],
 ARRAY[]::TEXT[],
 25, 35, true, true, true, true,
 '/punch-mitts-shotric.png',
 ARRAY['/punch-mitts-shotric.png','/punch-mitts-blue.png','/punch-mitts-red.png'],
 false, 5),

-- 6. Heavy Bag (2 colour variants)
('SI-HB-001','Heavy Punching Bag','heavy-bag','combat-sports','heavy-bag',
 ARRAY['wholesale','gym-equipment','custom-branding','oem'],
 'Commercial-grade heavy bags in 3ft–5ft. Custom branding embossed or printed on all sides.',
 'Commercial-grade hanging heavy bag in 3ft, 4ft, and 5ft. Shredded leather and sand fill. Reinforced leather outer shell with heavy-duty chain. Full custom logo via embossing or screen printing. 2 colour options.',
 ARRAY['Leather Outer Shell','Shredded Leather & Sand Fill','Heavy-duty Chain'],
 ARRAY['3ft (25kg)','4ft (35kg)','5ft (45kg)'],
 ARRAY['Black/Red','Royal Blue'],
 ARRAY[]::TEXT[],
 10, 40, false, false, true, true,
 '/heavy-bag-shotric.png',
 ARRAY['/heavy-bag-shotric.png','/heavy-bag-blue.png'],
 false, 6),

-- 7. Shin Guards (4 colour variants)
('SI-SHG-001','Muay Thai Shin Guards','shin-guards','combat-sports','shin-guards',
 ARRAY['oem','muay-thai','mma','custom','kickboxing'],
 'Full-length shin and instep protection for Muay Thai, kickboxing and MMA. 4 colour options.',
 'Full-length shin and instep guards for Muay Thai, Kickboxing, and MMA. Pre-curved EVA foam with genuine leather shell. Double velcro closure. 4 colour options with OEM logo and custom packaging.',
 ARRAY['Genuine Leather','EVA Foam','Double Velcro Closure'],
 ARRAY['S','M','L','XL'],
 ARRAY['Black/Red','Bold Red','Royal Blue','Gold/Black'],
 ARRAY[]::TEXT[],
 25, 35, true, true, false, true,
 '/shin-guards-shotric.png',
 ARRAY['/shin-guards-shotric.png','/shin-guards-red.png','/shin-guards-blue.png','/shin-guards-gold.png'],
 false, 7),

-- 8. Tracksuits (5 colour variants)
('SI-TS-001','Custom Tracksuit Set','tracksuits','apparel','tracksuits',
 ARRAY['full-custom','sublimation','private-label','team-kit','oem','bestseller'],
 'Premium polyester tracksuit — jacket and pants. Sublimation or embroidery. Any colour, any design.',
 'Complete combat sports tracksuit — full-zip jacket and matching jogger pants. 100% premium polyester, moisture-wicking. Full sublimation printing or embroidery. 5 stock colour options + unlimited custom. Ideal for gym teams, fight camps, and private label sportswear brands.',
 ARRAY['100% Polyester','Moisture-wicking','YKK Zip','Elastic Waistband'],
 ARRAY['XS','S','M','L','XL','2XL','3XL','4XL'],
 ARRAY['Black/Red','Royal Blue','Bold Red','White/Navy','Gold/Black','Custom (Any Color)'],
 ARRAY[]::TEXT[],
 50, 30, true, true, true, true,
 '/tracksuit-shotric.png',
 ARRAY['/tracksuit-shotric.png','/tracksuit-blue.png','/tracksuit-red.png',
       '/tracksuit-white.png','/tracksuit-gold.png'],
 true, 8),

-- 9. Hoodie (3 colour variants)
('SI-HD-001','Heavyweight Boxing Hoodie','hoodie','apparel','hoodies',
 ARRAY['private-label','embroidery','custom-colour','heavyweight'],
 '380gsm fleece boxing hoodie. Custom embroidery or print on chest, back and sleeves.',
 'Premium 380gsm cotton-fleece combat sports hoodie with kangaroo pocket, double-lined hood, reinforced seams. 3 colour options. Custom branding via embroidery, screen printing, or DTG. Custom colour, fit, and retail packaging for private label brands.',
 ARRAY['380gsm Cotton Fleece','Polyester Lining','Ribbed Cuffs & Hem'],
 ARRAY['S','M','L','XL','2XL','3XL'],
 ARRAY['Black/Red','Bold Red','Royal Blue'],
 ARRAY[]::TEXT[],
 50, 28, false, true, false, true,
 '/hoodie-shotric.png',
 ARRAY['/hoodie-shotric.png','/hoodie-red.png','/hoodie-blue.png'],
 false, 9),

-- 10. Rash Guard (3 colour variants)
('SI-RG-001','Compression Rash Guard','rash-guard','apparel','compression-wear',
 ARRAY['oem','sublimation','mma','bjj','compression'],
 '4-way stretch compression rash guard. Full sublimation print. Anti-microbial, moisture-wicking.',
 'High-performance long sleeve compression rash guard — 88% polyester / 12% spandex 4-way stretch. Flatlock stitching. Anti-microbial, moisture-wicking. UPF 50+. Full sublimation for any team or brand graphic. 3 colour options.',
 ARRAY['88% Polyester','12% Spandex','4-way Stretch','Flatlock Stitching'],
 ARRAY['XS','S','M','L','XL','2XL'],
 ARRAY['Black/Red','Royal Blue','Bold Red','Custom (Full Sublimation)'],
 ARRAY[]::TEXT[],
 50, 28, true, true, false, true,
 '/rash-guard-shotric.png',
 ARRAY['/rash-guard-shotric.png','/rash-guard-blue.png','/rash-guard-red.png'],
 false, 10),

-- 11. Fight Shorts (3 colour variants)
('SI-FS-001','MMA Fight Shorts','fight-shorts','apparel','fight-shorts',
 ARRAY['full-custom','mma','boxing','sublimation','wholesale'],
 'Lightweight MMA fight shorts with 4-way stretch. Full sublimation. Custom logo, name and flag prints.',
 'Professional MMA fight shorts — polyester/satin blend, 4-way stretch, split side panels. Elastic waistband with velcro fly. Full sublimation — custom logo, fighter name, country flag, and sponsor branding. 3 colour options.',
 ARRAY['Polyester / Satin Blend','4-way Stretch','Elastic Waistband','Velcro Fly'],
 ARRAY['XS','S','M','L','XL','2XL','3XL'],
 ARRAY['Black/Red','Royal Blue','Gold/Black','Custom (Any Color)'],
 ARRAY[]::TEXT[],
 50, 28, true, true, true, true,
 '/fight-shorts-shotric.png',
 ARRAY['/fight-shorts-shotric.png','/fight-shorts-blue.png','/fight-shorts-gold.png'],
 true, 11);

-- ── VERIFY ────────────────────────────────────────────────────
SELECT
  sort_order  AS "#",
  art_number,
  name,
  category,
  array_length(colors, 1)       AS colours,
  array_length(gallery_urls, 1) AS images,
  moq,
  is_featured AS featured
FROM products
ORDER BY sort_order;

SELECT '✅ ' || COUNT(*) || ' products inserted into Shotric International database!' AS result
FROM products;
