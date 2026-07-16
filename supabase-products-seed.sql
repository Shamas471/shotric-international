-- ============================================================
-- Shotric International — Full Product Seed (All 11 Products)
-- Run in: Supabase Dashboard → SQL Editor → New Query → Run
-- ============================================================

-- Clear existing product data first (safe to re-run)
DELETE FROM products;

-- Reset sequence
ALTER SEQUENCE products_id_seq RESTART WITH 1;

-- ── INSERT ALL PRODUCTS ──────────────────────────────────────
INSERT INTO products (
  art_number, name, slug, category, subcategory,
  tags, short_desc, long_desc,
  materials, sizes, colors, weight_options,
  moq, lead_time_days,
  is_oem, is_private_label, is_wholesale, is_custom,
  image_url, gallery_urls,
  is_featured, sort_order
) VALUES

-- ════════════════════════════════════════════
-- COMBAT SPORTS
-- ════════════════════════════════════════════

-- 1. Boxing Gloves
(
  'SI-BG-001', 'Pro Boxing Gloves', 'boxing-gloves',
  'combat-sports', 'boxing-gloves',
  ARRAY['oem','private-label','bestseller','custom-logo','wholesale','export-ready'],
  'Premium full-grain leather boxing gloves engineered for training and competition. Custom logo embossing available.',
  'Our flagship boxing gloves are crafted from premium full-grain cowhide leather with multi-layer foam padding system engineered for maximum protection. Reinforced thumb attachment, velcro wrist support, and moisture-wicking inner lining. Available in 7 colour options. Used by gyms and fight brands in 35+ countries. Full OEM, private label and white-label manufacturing available — custom logo, colours, lining, and retail packaging.',
  ARRAY['Full-grain Cowhide Leather','Multi-layer Foam','Velcro Wrist Strap','Cotton Lining'],
  ARRAY['8oz','10oz','12oz','14oz','16oz','18oz'],
  ARRAY['Black/Red','Red/White','Royal Blue','White/Gold','Forest Green','Gold/Black','Purple/Silver'],
  ARRAY['8oz','10oz','12oz','14oz','16oz','18oz'],
  25, 35,
  true, true, true, true,
  '/boxing-gloves-shotric.png',
  ARRAY[
    '/boxing-gloves-shotric.png',
    '/boxing-gloves-red.png',
    '/boxing-gloves-blue.png',
    '/boxing-gloves-white-gold.png',
    '/boxing-gloves-green.png',
    '/boxing-gloves-gold.png',
    '/boxing-gloves-purple.png'
  ],
  true, 1
),

-- 2. MMA Gloves
(
  'SI-MMA-001', 'MMA Sparring Gloves', 'mma-gloves',
  'combat-sports', 'mma-gloves',
  ARRAY['oem','private-label','mma','grappling','custom-sizes'],
  'Open-palm MMA grappling gloves with reinforced knuckle protection. 4oz–7oz. Full custom branding.',
  'Hybrid open-palm MMA gloves engineered for both striking and grappling. High-density foam knuckle guard with breathable mesh palm panel. Velcro wrist closure with hook-and-loop adjustment. Available in 4 colour options. OEM and private label orders welcome — custom logo, weight, colour, and packaging.',
  ARRAY['Full-grain Leather','High-density Foam','Mesh Palm Panel','Velcro Closure'],
  ARRAY['S/M','L/XL'],
  ARRAY['Black/Red','Deep Red','Royal Blue','Gold/Black'],
  ARRAY['4oz','5oz','6oz','7oz'],
  25, 35,
  true, true, false, true,
  '/mma-gloves-shotric.png',
  ARRAY[
    '/mma-gloves-shotric.png',
    '/mma-gloves-red.png',
    '/mma-gloves-blue.png',
    '/mma-gloves-gold.png'
  ],
  true, 2
),

-- 3. Head Guards
(
  'SI-HG-001', 'Professional Head Guard', 'head-guards',
  'combat-sports', 'head-guards',
  ARRAY['oem','boxing','muay-thai','custom','protection'],
  'Multi-layer foam head guard with cheek and chin protection. Open-face and full-face designs available.',
  'Premium boxing head guard offering full protection — extended cheek guards, chin bar, and padded forehead panel. EVA foam core with genuine leather shell. Available in open-face and full-face configurations. 4 colour options available. OEM and private label manufacturing with custom logo placement, colour, and padding density.',
  ARRAY['Genuine Leather','EVA Foam','Adjustable Velcro Straps'],
  ARRAY['S','M','L','XL'],
  ARRAY['Black/Red','Bold Red','Royal Blue','Gold/Black'],
  ARRAY[],
  30, 35,
  true, true, false, true,
  '/head-guard-shotric.png',
  ARRAY[
    '/head-guard-shotric.png',
    '/head-guard-red.png',
    '/head-guard-blue.png',
    '/head-guard-gold.png'
  ],
  false, 3
),

-- 4. Hand Wraps
(
  'SI-HW-001', 'Premium Hand Wraps', 'hand-wraps',
  'combat-sports', 'hand-wraps',
  ARRAY['wholesale','private-label','custom-label','all-colours','boxing','muay-thai'],
  'Professional 180" semi-elastic hand wraps with thumb loop. Custom woven labels available.',
  'Semi-elastic 180" cotton hand wraps with reinforced thumb loop and hook-and-loop closure. Machine washable. Available in 3 colours. Custom woven brand labels and retail packaging available for private label bulk orders. Ideal for gym brands and sports retailers.',
  ARRAY['Semi-elastic Cotton','Hook-and-loop Closure'],
  ARRAY['180" (4.5m)'],
  ARRAY['Red','Royal Blue','Black/Red'],
  ARRAY[],
  100, 25,
  false, true, true, false,
  '/hand-wraps-shotric.png',
  ARRAY[
    '/hand-wraps-shotric.png',
    '/hand-wraps-blue.png',
    '/hand-wraps-black.png'
  ],
  false, 4
),

-- 5. Punch Mitts
(
  'SI-PM-001', 'Punch Mitts / Focus Pads', 'punch-mitts',
  'combat-sports', 'punch-mitts',
  ARRAY['oem','boxing','muay-thai','custom-logo','wholesale'],
  'Curved focus pads with shock-absorbing multi-layer foam. Full-grain leather. Custom logo available.',
  'Professional curved focus pads with shock-absorbing multi-layer foam core engineered to protect the trainer''s hand during heavy bag combinations. Full-grain leather outer shell with padded wrist support strap. Available in 3 colour options with OEM logo and custom colour manufacturing.',
  ARRAY['Full-grain Leather','Multi-layer Foam','Padded Wrist Strap'],
  ARRAY['Standard'],
  ARRAY['Black/Red','Royal Blue','Bold Red'],
  ARRAY[],
  25, 35,
  true, true, true, true,
  '/punch-mitts-shotric.png',
  ARRAY[
    '/punch-mitts-shotric.png',
    '/punch-mitts-blue.png',
    '/punch-mitts-red.png'
  ],
  false, 5
),

-- 6. Heavy Bag
(
  'SI-HB-001', 'Heavy Punching Bag', 'heavy-bag',
  'combat-sports', 'heavy-bag',
  ARRAY['wholesale','gym-equipment','custom-branding','oem'],
  'Commercial-grade heavy bags in 3ft–5ft. Custom branding embossed or printed on all sides.',
  'Commercial-grade hanging heavy bag available in 3ft, 4ft, and 5ft versions. Filled with shredded leather and sand blend for professional weight distribution. Reinforced leather outer shell with heavy-duty hanging chain. Full custom logo and colour branding available via embossing or screen printing. 2 colour options.',
  ARRAY['Leather Outer Shell','Shredded Leather & Sand Fill','Heavy-duty Chain'],
  ARRAY['3ft (25kg)','4ft (35kg)','5ft (45kg)'],
  ARRAY['Black/Red','Royal Blue'],
  ARRAY[],
  10, 40,
  false, false, true, true,
  '/heavy-bag-shotric.png',
  ARRAY[
    '/heavy-bag-shotric.png',
    '/heavy-bag-blue.png'
  ],
  false, 6
),

-- 7. Shin Guards
(
  'SI-SG-001', 'Muay Thai Shin Guards', 'shin-guards',
  'combat-sports', 'shin-guards',
  ARRAY['oem','muay-thai','mma','custom','kickboxing'],
  'Full-length shin and instep protection for Muay Thai, kickboxing and MMA. 4 colour options.',
  'Full-length shin and instep guards for Muay Thai, Kickboxing, and MMA. Anatomical pre-curved design with EVA foam core and genuine leather shell. Double velcro closure for secure fit. Available in 4 colour options with OEM logo, custom colour, and packaging.',
  ARRAY['Genuine Leather','EVA Foam','Double Velcro Closure'],
  ARRAY['S','M','L','XL'],
  ARRAY['Black/Red','Bold Red','Royal Blue','Gold/Black'],
  ARRAY[],
  25, 35,
  true, true, false, true,
  '/shin-guards-shotric.png',
  ARRAY[
    '/shin-guards-shotric.png',
    '/shin-guards-red.png',
    '/shin-guards-blue.png',
    '/shin-guards-gold.png'
  ],
  false, 7
),

-- ════════════════════════════════════════════
-- APPAREL
-- ════════════════════════════════════════════

-- 8. Tracksuits
(
  'SI-TS-001', 'Custom Tracksuit Set', 'tracksuits',
  'apparel', 'tracksuits',
  ARRAY['full-custom','sublimation','private-label','team-kit','oem','bestseller'],
  'Premium polyester tracksuit — jacket and pants. Sublimation or embroidery. Any colour, any design.',
  'Complete combat sports tracksuit set — full-zip jacket and matching jogger pants. Made from 100% premium polyester with moisture-wicking performance fabric. Full sublimation printing allows any colour and design. Embroidery option also available. 5 colour options in stock + unlimited custom. Ideal for gym teams, fight camps, and private label sportswear brands.',
  ARRAY['100% Polyester','Moisture-wicking','YKK Zip','Elastic Waistband'],
  ARRAY['XS','S','M','L','XL','2XL','3XL','4XL'],
  ARRAY['Black/Red','Royal Blue','Bold Red','White/Navy','Gold/Black','Custom (Any Color)'],
  ARRAY[],
  50, 30,
  true, true, true, true,
  '/tracksuit-shotric.png',
  ARRAY[
    '/tracksuit-shotric.png',
    '/tracksuit-blue.png',
    '/tracksuit-red.png',
    '/tracksuit-white.png',
    '/tracksuit-gold.png'
  ],
  true, 8
),

-- 9. Hoodie
(
  'SI-HD-001', 'Heavyweight Boxing Hoodie', 'hoodie',
  'apparel', 'hoodies',
  ARRAY['private-label','embroidery','custom-colour','heavyweight'],
  '380gsm fleece boxing hoodie. Custom embroidery or print on chest, back and sleeves.',
  'Premium 380gsm cotton-fleece combat sports hoodie with kangaroo front pocket, double-lined hood, and reinforced seams. Available in 3 colour options. Full custom branding via embroidery (chest/back), screen printing, or DTG. Custom colour, fit, and retail packaging available for private label brands.',
  ARRAY['380gsm Cotton Fleece','Polyester Lining','Ribbed Cuffs & Hem'],
  ARRAY['S','M','L','XL','2XL','3XL'],
  ARRAY['Black/Red','Bold Red','Royal Blue'],
  ARRAY[],
  50, 28,
  false, true, false, true,
  '/hoodie-shotric.png',
  ARRAY[
    '/hoodie-shotric.png',
    '/hoodie-red.png',
    '/hoodie-blue.png'
  ],
  false, 9
),

-- 10. Rash Guard
(
  'SI-RG-001', 'Compression Rash Guard', 'rash-guard',
  'apparel', 'compression-wear',
  ARRAY['oem','sublimation','mma','bjj','compression'],
  '4-way stretch compression rash guard. Full sublimation print. Anti-microbial, moisture-wicking.',
  'High-performance long sleeve compression rash guard made from 88% polyester / 12% spandex 4-way stretch fabric. Flatlock stitching prevents skin irritation. Anti-microbial and moisture-wicking. UPF 50+ sun protection. Full sublimation printing enables any team or brand graphic. Available in 3 colour options.',
  ARRAY['88% Polyester','12% Spandex','4-way Stretch','Flatlock Stitching'],
  ARRAY['XS','S','M','L','XL','2XL'],
  ARRAY['Black/Red','Royal Blue','Bold Red','Custom (Full Sublimation)'],
  ARRAY[],
  50, 28,
  true, true, false, true,
  '/rash-guard-shotric.png',
  ARRAY[
    '/rash-guard-shotric.png',
    '/rash-guard-blue.png',
    '/rash-guard-red.png'
  ],
  false, 10
),

-- 11. Fight Shorts
(
  'SI-FS-001', 'MMA Fight Shorts', 'fight-shorts',
  'apparel', 'fight-shorts',
  ARRAY['full-custom','mma','boxing','sublimation','wholesale'],
  'Lightweight MMA fight shorts with 4-way stretch. Full sublimation. Custom logo, name and flag prints.',
  'Professional MMA fight shorts featuring 4-way stretch satin/polyester blend fabric with split side panels for unrestricted kicking range. Elastic waistband with velcro fly closure. Full sublimation print for vibrant team or brand graphics — custom logo, fighter name, country flag, and sponsor branding available. 3 colour options.',
  ARRAY['Polyester / Satin Blend','4-way Stretch','Elastic Waistband','Velcro Fly'],
  ARRAY['XS','S','M','L','XL','2XL','3XL'],
  ARRAY['Black/Red','Royal Blue','Gold/Black','Custom (Any Color)'],
  ARRAY[],
  50, 28,
  true, true, true, true,
  '/fight-shorts-shotric.png',
  ARRAY[
    '/fight-shorts-shotric.png',
    '/fight-shorts-blue.png',
    '/fight-shorts-gold.png'
  ],
  true, 11
);

-- ── Verify ────────────────────────────────────────────────────
SELECT
  id,
  art_number,
  name,
  category,
  array_length(gallery_urls, 1) AS gallery_count,
  moq,
  is_featured
FROM products
ORDER BY sort_order;
