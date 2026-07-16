// Full product catalog
// Load any saved overrides from localStorage
const OVERRIDES_KEY = 'shotric_product_overrides';
function loadOverrides() {
    try {
        return JSON.parse(localStorage.getItem(OVERRIDES_KEY) || '{}');
    } catch { return {}; }
}
function saveOverrides(overrides) {
    localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides));
}

const products = [
    // ====== BOXING GLOVES — PROFESSIONAL ======
    { id: 'SI-013', artNumber: 'SI-013', name: 'Pro Elite Boxing Gloves', category: 'boxing-gloves', subcategory: 'professional', material: 'Hand-molded Cowhide Leather', sizes: '4oz, 6oz, 8oz, 10oz, 12oz, 14oz, 16oz, 18oz, 20oz', description: 'Championship-grade hand-molded cowhide leather gloves with multi-layered foam padding, reinforced wrist strap with Shotric logo, and ergonomic hand compartment for superior punch mechanics.', image: '/assets/products/pro-gloves-1.jpg' },
    { id: 'SI-014', artNumber: 'SI-014', name: 'Pro Sparring Gloves', category: 'boxing-gloves', subcategory: 'professional', material: 'Hand-molded Cowhide Leather', sizes: '4oz, 6oz, 8oz, 10oz, 12oz, 14oz, 16oz, 18oz, 20oz', description: 'Premium sparring gloves crafted from hand-molded cowhide with extra padding for partner training. Reinforced wrist strap with Shotric logo, breathable inner lining.', image: '/assets/products/pro-gloves-2.jpg' },
    { id: 'SI-015', artNumber: 'SI-015', name: 'Pro Competition Gloves', category: 'boxing-gloves', subcategory: 'professional', material: 'Hand-molded Cowhide Leather', sizes: '4oz, 6oz, 8oz, 10oz, 12oz', description: 'Competition-approved professional gloves with hand-molded cowhide shell, compact padding design for speed and precision. Shotric logo on wrist strap.', image: '/assets/products/pro-gloves-3.jpg' },

    // ====== BOXING GLOVES — TRAINING / INJECTION MOLD ======
    { id: 'SI-001', artNumber: 'SI-001', name: 'Strike Training Gloves', category: 'boxing-gloves', subcategory: 'training', material: 'Artificial Leather', sizes: '4oz, 6oz, 8oz, 10oz, 12oz, 14oz, 16oz, 18oz, 20oz', description: 'Durable injection-molded training gloves made from premium artificial leather. Pre-shaped padding absorbs impact evenly. Shotric logo on wrist strap with secure velcro closure.', image: '/assets/products/train-gloves-1.jpg' },
    { id: 'SI-002', artNumber: 'SI-002', name: 'Power Training Gloves', category: 'boxing-gloves', subcategory: 'training', material: 'Artificial Leather', sizes: '4oz, 6oz, 8oz, 10oz, 12oz, 14oz, 16oz, 18oz, 20oz', description: 'Heavy-duty training gloves with injection mold construction. Triple-density foam padding and artificial leather shell. Shotric logo on wrist strap.', image: '/assets/products/train-gloves-2.jpg' },
    { id: 'SI-003', artNumber: 'SI-003', name: 'All-Round Training Gloves', category: 'boxing-gloves', subcategory: 'training', material: 'Artificial Leather', sizes: '4oz, 6oz, 8oz, 10oz, 12oz, 14oz, 16oz, 18oz, 20oz', description: 'Versatile training gloves suitable for bag work and pad work. Artificial leather with reinforced stitching. Shotric logo wrist strap with full wrap-around closure.', image: '/assets/products/train-gloves-3.jpg' },
    { id: 'SI-004', artNumber: 'SI-004', name: 'Contour Fit Training Gloves', category: 'boxing-gloves', subcategory: 'training', material: 'Artificial Leather', sizes: '4oz, 6oz, 8oz, 10oz, 12oz, 14oz, 16oz, 18oz, 20oz', description: 'Contoured fit injection mold gloves for comfortable extended training sessions. Moisture-wicking lining with secure hook-and-loop wrist strap. Shotric logo printed on strap.', image: '/assets/products/train-gloves-4.jpg' },
    { id: 'SI-005', artNumber: 'SI-005', name: 'Junior Training Gloves', category: 'boxing-gloves', subcategory: 'training', material: 'Artificial Leather', sizes: '4oz, 6oz, 8oz, 10oz', description: 'Youth-sized injection mold training gloves with lighter padding for developing fighters. Artificial leather shell and secure fit. Shotric logo on wrist strap.', image: '/assets/products/train-gloves-5.jpg' },
    { id: 'SI-006', artNumber: 'SI-006', name: 'Endurance Training Gloves', category: 'boxing-gloves', subcategory: 'training', material: 'Artificial Leather', sizes: '4oz, 6oz, 8oz, 10oz, 12oz, 14oz, 16oz, 18oz, 20oz', description: 'Long-session training gloves built for endurance training. Extra wrist support with wide strap bearing the Shotric logo. Injection mold artificial leather construction.', image: '/assets/products/train-gloves-6.jpg' },

    // ====== BOXING GLOVES — BREATHABLE MESH PALM ======
    { id: 'SI-007', artNumber: 'SI-007', name: 'AirFlow Mesh Gloves', category: 'boxing-gloves', subcategory: 'breathable', material: 'Artificial Leather / Mesh Palm', sizes: '4oz, 6oz, 8oz, 10oz, 12oz, 14oz, 16oz, 18oz, 20oz', description: 'Advanced ventilation mesh palm design for superior airflow during intense sessions. Lightweight construction with Shotric logo on wrist strap.', image: '/assets/products/mesh-gloves-1.jpg' },
    { id: 'SI-008', artNumber: 'SI-008', name: 'CoolBreeze Mesh Gloves', category: 'boxing-gloves', subcategory: 'breathable', material: 'Artificial Leather / Mesh Palm', sizes: '4oz, 6oz, 8oz, 10oz, 12oz, 14oz, 16oz, 18oz, 20oz', description: 'Cool-touch mesh palm technology keeps hands dry and comfortable. Multi-layer impact foam with Shotric wrist strap branding.', image: '/assets/products/mesh-gloves-2.jpg' },
    { id: 'SI-009', artNumber: 'SI-009', name: 'Ventilated Pro Mesh Gloves', category: 'boxing-gloves', subcategory: 'breathable', material: 'Artificial Leather / Mesh Palm', sizes: '4oz, 6oz, 8oz, 10oz, 12oz, 14oz, 16oz, 18oz, 20oz', description: 'Professional-grade breathable mesh palm gloves with anatomical fit and enhanced padding. Shotric logo on wrist strap.', image: '/assets/products/mesh-gloves-3.jpg' },
    { id: 'SI-010', artNumber: 'SI-010', name: 'LightStrike Mesh Gloves', category: 'boxing-gloves', subcategory: 'breathable', material: 'Artificial Leather / Mesh Palm', sizes: '4oz, 6oz, 8oz, 10oz, 12oz, 14oz, 16oz, 18oz, 20oz', description: 'Ultra-light mesh palm gloves for speed training. Open palm ventilation design with durable outer shell. Shotric branded wrist strap.', image: '/assets/products/mesh-gloves-4.jpg' },
    { id: 'SI-011', artNumber: 'SI-011', name: 'HyperCool Mesh Gloves', category: 'boxing-gloves', subcategory: 'breathable', material: 'Artificial Leather / Mesh Palm', sizes: '4oz, 6oz, 8oz, 10oz, 12oz, 14oz, 16oz, 18oz, 20oz', description: 'Maximum breathability with HyperCool mesh palm panels. Reinforced thumb lock and splint padding. Shotric logo wrist strap.', image: '/assets/products/mesh-gloves-5.jpg' },
    { id: 'SI-012', artNumber: 'SI-012', name: 'DryFit Mesh Gloves', category: 'boxing-gloves', subcategory: 'breathable', material: 'Artificial Leather / Mesh Palm', sizes: '4oz, 6oz, 8oz, 10oz, 12oz, 14oz, 16oz, 18oz, 20oz', description: 'DryFit moisture management mesh gloves with quick-dry lining and breathable palm. Shotric logo on reinforced wrist strap.', image: '/assets/products/mesh-gloves-6.jpg' },

    // ====== HEAD GUARDS ======
    { id: 'SI-016', artNumber: 'SI-016', name: 'Pro Full-Face Head Guard', category: 'protection-gear', subcategory: 'head-guards', material: 'PU Flex', sizes: 'Small, Medium, Large, Extra Large, Double Extra Large', description: 'Full-face protection head guard with PU Flex outer shell and adjustable lace-up closing system. Multi-density impact foam.', image: '/assets/products/head-guard-1.jpg' },
    { id: 'SI-017', artNumber: 'SI-017', name: 'Open-Face Head Guard', category: 'protection-gear', subcategory: 'head-guards', material: 'PU Flex', sizes: 'Small, Medium, Large, Extra Large, Double Extra Large', description: 'Open-face design head guard for better visibility. PU Flex material with adjustable lace-up rear closing. Cheek and chin protection.', image: '/assets/products/head-guard-2.jpg' },
    { id: 'SI-018', artNumber: 'SI-018', name: 'Sparring Head Guard', category: 'protection-gear', subcategory: 'head-guards', material: 'PU Flex', sizes: 'Small, Medium, Large, Extra Large, Double Extra Large', description: 'Competition sparring head guard with increased temple coverage. PU Flex construction, lace-up adjustable fit.', image: '/assets/products/head-guard-3.jpg' },
    { id: 'SI-019', artNumber: 'SI-019', name: 'Training Head Guard', category: 'protection-gear', subcategory: 'head-guards', material: 'PU Flex', sizes: 'Small, Medium, Large, Extra Large, Double Extra Large', description: 'Everyday training head guard with thick PU Flex padding. Rear lace-up closure for secure customizable fit.', image: '/assets/products/head-guard-4.jpg' },
    { id: 'SI-020', artNumber: 'SI-020', name: 'Youth Head Guard', category: 'protection-gear', subcategory: 'head-guards', material: 'PU Flex', sizes: 'Small, Medium, Large', description: 'Junior-sized head guard with extra padding for developing athletes. PU Flex with lace-up closing.', image: '/assets/products/head-guard-5.jpg' },
    { id: 'SI-021', artNumber: 'SI-021', name: 'Mexican Style Head Guard', category: 'protection-gear', subcategory: 'head-guards', material: 'PU Flex', sizes: 'Small, Medium, Large, Extra Large, Double Extra Large', description: 'Mexican-style head guard with bar nose protection. PU Flex material with adjustable lace-up system.', image: '/assets/products/head-guard-6.jpg' },

    // ====== SHIN PADS ======
    { id: 'SI-028', artNumber: 'SI-028', name: 'Pro Shin Guards', category: 'protection-gear', subcategory: 'shin-pads', material: 'PU Leather', sizes: 'Small, Medium, Large, Extra Large, Double Extra Large', description: 'Pre-curved handmade mold shin guards with hook-and-loop strap closure. Multi-layer impact foam for full shin and instep coverage.', image: '/assets/products/shin-pad-1.jpg' },
    { id: 'SI-029', artNumber: 'SI-029', name: 'Muay Thai Shin Guards', category: 'protection-gear', subcategory: 'shin-pads', material: 'PU Leather', sizes: 'Small, Medium, Large, Extra Large, Double Extra Large', description: 'Muay Thai style pre-curved shin guards with extended instep protection. Handmade mold with secure hook-and-loop straps.', image: '/assets/products/shin-pad-2.jpg' },
    { id: 'SI-030', artNumber: 'SI-030', name: 'Training Shin Guards', category: 'protection-gear', subcategory: 'shin-pads', material: 'PU Leather', sizes: 'Small, Medium, Large, Extra Large, Double Extra Large', description: 'Lightweight training shin guards with pre-curved mold for natural fit. Hook-and-loop strap fastening system.', image: '/assets/products/shin-pad-3.jpg' },
    { id: 'SI-031', artNumber: 'SI-031', name: 'Elite Shin Guards', category: 'protection-gear', subcategory: 'shin-pads', material: 'PU Leather', sizes: 'Small, Medium, Large, Extra Large, Double Extra Large', description: 'Elite-level pre-curved shin guards with reinforced padding zones. Handmade mold construction with dual hook-and-loop straps.', image: '/assets/products/shin-pad-4.jpg' },
    { id: 'SI-032', artNumber: 'SI-032', name: 'Contour Shin Guards', category: 'protection-gear', subcategory: 'shin-pads', material: 'PU Leather', sizes: 'Small, Medium, Large, Extra Large, Double Extra Large', description: 'Contoured design shin guards for close body fit. Pre-curved handmade mold with padded hook-and-loop straps.', image: '/assets/products/shin-pad-5.jpg' },
    { id: 'SI-033', artNumber: 'SI-033', name: 'Junior Shin Guards', category: 'protection-gear', subcategory: 'shin-pads', material: 'PU Leather', sizes: 'Small, Medium, Large', description: 'Youth-sized contour shin pads for junior athletes. Pre-curved and lightweight for growing fighters. Hook-and-loop strap closure.', image: '/assets/products/shin-pad-6.jpg' },
    { id: 'SI-034', artNumber: 'SI-034', name: 'Impact Shin Guards', category: 'protection-gear', subcategory: 'shin-pads', material: 'PU Leather', sizes: 'Small, Medium, Large, Extra Large, Double Extra Large', description: 'High-impact shin guards with thick foam core and pre-curved handmade mold. Secure hook-and-loop fasteners.', image: '/assets/products/shin-pad-7.jpg' },
    { id: 'SI-035', artNumber: 'SI-035', name: 'Sparring Shin Guards', category: 'protection-gear', subcategory: 'shin-pads', material: 'PU Leather', sizes: 'Small, Medium, Large, Extra Large, Double Extra Large', description: 'Sparring-specific shin guards with extra padding on contact zones. Pre-curved mold and adjustable hook-and-loop straps.', image: '/assets/products/shin-pad-8.jpg' },
    { id: 'SI-036', artNumber: 'SI-036', name: 'Flex Shin Guards', category: 'protection-gear', subcategory: 'shin-pads', material: 'PU Leather', sizes: 'Small, Medium, Large, Extra Large, Double Extra Large', description: 'Flexible shin guards with articulated padding sections. Pre-curved mold with dual hook-and-loop straps for mobility.', image: '/assets/products/shin-pad-9.jpg' },
    { id: 'SI-037', artNumber: 'SI-037', name: 'Classic Shin Guards', category: 'protection-gear', subcategory: 'shin-pads', material: 'PU Leather', sizes: 'Small, Medium, Large, Extra Large, Double Extra Large', description: 'Classic design shin guards with proven pre-curved mold construction. Reliable hook-and-loop strap closure system.', image: '/assets/products/shin-pad-10.jpg' },
    { id: 'SI-038', artNumber: 'SI-038', name: 'Defender Shin Guards', category: 'protection-gear', subcategory: 'shin-pads', material: 'PU Leather', sizes: 'Small, Medium, Large, Extra Large, Double Extra Large', description: 'Maximum defense shin guards with triple-layer foam. Handmade pre-curved mold and extra-wide hook-and-loop straps.', image: '/assets/products/shin-pad-11.jpg' },
    { id: 'SI-039', artNumber: 'SI-039', name: 'Lightweight Shin Guards', category: 'protection-gear', subcategory: 'shin-pads', material: 'PU Leather', sizes: 'Small, Medium, Large', description: 'Ultra-lightweight shin guards for speed-focused fighters. Pre-curved mold with minimalist hook-and-loop strap design.', image: '/assets/products/shin-pad-12.jpg' },

    // ====== MOUTH GUARDS / GUMSHIELDS ======
    { id: 'SI-046', artNumber: 'SI-046', name: 'Pro Mouth Guard', category: 'protection-gear', subcategory: 'mouth-guards', material: 'Medical-grade Silicone', sizes: 'Youth, Adult', description: 'Professional-grade boil-and-bite mouth guard with shock-absorbing gel core. Available in all colors.', image: '/assets/products/mouth-guard-1.jpg' },
    { id: 'SI-047', artNumber: 'SI-047', name: 'Double Mouth Guard', category: 'protection-gear', subcategory: 'mouth-guards', material: 'Medical-grade Silicone', sizes: 'Youth, Adult', description: 'Double-sided mouth guard for upper and lower jaw protection. Multi-color options available.', image: '/assets/products/mouth-guard-2.jpg' },
    { id: 'SI-048', artNumber: 'SI-048', name: 'Custom Fit Gumshield', category: 'protection-gear', subcategory: 'mouth-guards', material: 'Medical-grade Silicone', sizes: 'Youth, Adult', description: 'Custom-moldable gumshield with breathing channels. Available in all colors with case included.', image: '/assets/products/mouth-guard-3.jpg' },
    { id: 'SI-049', artNumber: 'SI-049', name: 'Junior Gumshield', category: 'protection-gear', subcategory: 'mouth-guards', material: 'Medical-grade Silicone', sizes: 'Youth', description: 'Junior-specific gumshield with softer material for young athletes. All colors available.', image: '/assets/products/mouth-guard-4.jpg' },
    { id: 'SI-050', artNumber: 'SI-050', name: 'Gel Comfort Gumshield', category: 'protection-gear', subcategory: 'mouth-guards', material: 'Medical-grade Silicone / Gel', sizes: 'Adult', description: 'Ultra-comfort gel core gumshield with enhanced shock absorption. Available in all colors.', image: '/assets/products/mouth-guard-5.jpg' },
    { id: 'SI-051', artNumber: 'SI-051', name: 'Max Protect Gumshield', category: 'protection-gear', subcategory: 'mouth-guards', material: 'Medical-grade Silicone', sizes: 'Adult', description: 'Maximum protection gumshield with reinforced bite zones. Full color range available.', image: '/assets/products/mouth-guard-6.jpg' },

    // ====== THIGH PADS ======
    { id: 'SI-085', artNumber: 'SI-085', name: 'Pro Thigh Pads', category: 'protection-gear', subcategory: 'thigh-pads', material: 'Shock-absorbing PU', sizes: 'Small, Medium, Large, Extra Large, Double Extra Large', description: 'Professional thigh pads with multi-density shock-absorbing PU material. Anatomical design with secure strapping.', image: '/assets/products/thigh-pad-1.jpg' },
    { id: 'SI-086', artNumber: 'SI-086', name: 'Training Thigh Pads', category: 'protection-gear', subcategory: 'thigh-pads', material: 'Shock-absorbing PU', sizes: 'Small, Medium, Large, Extra Large, Double Extra Large', description: 'Everyday training thigh pads with shock-absorbing PU outer and high-density inner foam.', image: '/assets/products/thigh-pad-2.jpg' },
    { id: 'SI-087', artNumber: 'SI-087', name: 'Sparring Thigh Pads', category: 'protection-gear', subcategory: 'thigh-pads', material: 'Shock-absorbing PU', sizes: 'Small, Medium, Large, Extra Large, Double Extra Large', description: 'Sparring-grade thigh pads with extra coverage and shock-absorbing PU construction.', image: '/assets/products/thigh-pad-3.jpg' },
    { id: 'SI-088', artNumber: 'SI-088', name: 'Lightweight Thigh Pads', category: 'protection-gear', subcategory: 'thigh-pads', material: 'Shock-absorbing PU', sizes: 'Small, Medium, Large', description: 'Lightweight thigh pads ideal for mobility while maintaining shock-absorbing PU protection.', image: '/assets/products/thigh-pad-4.jpg' },
    { id: 'SI-089', artNumber: 'SI-089', name: 'Contour Thigh Pads', category: 'protection-gear', subcategory: 'thigh-pads', material: 'Shock-absorbing PU', sizes: 'Small, Medium, Large, Extra Large, Double Extra Large', description: 'Contoured thigh pads for a close body fit. Shock-absorbing PU material with breathable backing.', image: '/assets/products/thigh-pad-5.jpg' },
    { id: 'SI-090', artNumber: 'SI-090', name: 'Elite Thigh Pads', category: 'protection-gear', subcategory: 'thigh-pads', material: 'Shock-absorbing PU', sizes: 'Small, Medium, Large, Extra Large, Double Extra Large', description: 'Elite series thigh pads with triple-density shock-absorbing PU and extra-wide coverage.', image: '/assets/products/thigh-pad-6.jpg' },

    // ====== GROIN GUARDS ======
    { id: 'SI-091', artNumber: 'SI-091', name: 'Pro Groin Guard', category: 'protection-gear', subcategory: 'groin-guards', material: 'PU Leather / Steel Cup', sizes: 'Small, Medium, Large, Extra Large, Double Extra Large', description: 'Professional groin guard with steel cup and shock-absorbing PU leather shell. Wide elastic waistband with hook-and-loop closure for secure adjustable fit.', image: '/assets/products/groin-guard.jpg' },
    { id: 'SI-092', artNumber: 'SI-092', name: 'Training Groin Protector', category: 'protection-gear', subcategory: 'groin-guards', material: 'PU Leather / Reinforced Foam', sizes: 'Small, Medium, Large, Extra Large, Double Extra Large', description: 'Everyday training groin protector with reinforced foam cup and PU leather outer. Adjustable elastic waistband for comfort during extended sessions.', image: '/assets/products/groin-guard.jpg' },
    { id: 'SI-093', artNumber: 'SI-093', name: 'Competition Groin Guard', category: 'protection-gear', subcategory: 'groin-guards', material: 'Genuine Leather / Steel Cup', sizes: 'Small, Medium, Large, Extra Large, Double Extra Large', description: 'Competition-approved groin guard with genuine leather shell and polished steel cup. Low-profile design with secure lace-up and elastic waistband.', image: '/assets/products/groin-guard.jpg' },
    { id: 'SI-094', artNumber: 'SI-094', name: 'Female Groin Protector', category: 'protection-gear', subcategory: 'groin-guards', material: 'PU Leather / High-density Foam', sizes: 'Small, Medium, Large, Extra Large', description: 'Anatomically designed female groin protector with high-density foam padding and PU leather shell. Wide elastic waistband for secure fit.', image: '/assets/products/groin-guard.jpg' },
    { id: 'SI-095', artNumber: 'SI-095', name: 'Junior Groin Guard', category: 'protection-gear', subcategory: 'groin-guards', material: 'PU Leather / Foam Cup', sizes: 'Small, Medium, Large', description: 'Youth-sized groin guard with foam cup for developing athletes. PU leather shell with adjustable elastic waistband.', image: '/assets/products/groin-guard.jpg' },

    // ====== PUNCHING BAGS ======
    { id: 'SI-052', artNumber: 'SI-052', name: 'Heavy Punching Bag 4ft', category: 'training-equipment', subcategory: 'punching-bags', material: 'Premium Cowhide Leather', sizes: '4ft', description: 'Premium cowhide leather heavy bag with water-resistant nylon lining. Triple stitched seams, D-ring chain attachment.', image: '/assets/products/punch-bag-1.jpg' },
    { id: 'SI-053', artNumber: 'SI-053', name: 'Heavy Punching Bag 5ft', category: 'training-equipment', subcategory: 'punching-bags', material: 'Premium Cowhide Leather', sizes: '5ft', description: 'Full-size 5ft heavy bag in premium cowhide leather with water-resistant nylon inner lining. Professional D-ring chain system.', image: '/assets/products/punch-bag-2.jpg' },
    { id: 'SI-054', artNumber: 'SI-054', name: 'Heavy Punching Bag 6ft', category: 'training-equipment', subcategory: 'punching-bags', material: 'Premium Cowhide Leather', sizes: '6ft', description: 'Extra-tall 6ft heavy bag for full-body strike training. Cowhide leather with water-resistant nylon lining and heavy-duty chain.', image: '/assets/products/punch-bag-3.jpg' },
    { id: 'SI-055', artNumber: 'SI-055', name: 'Angle Punching Bag', category: 'training-equipment', subcategory: 'punching-bags', material: 'Premium Cowhide Leather', sizes: '4ft', description: 'Angled heavy bag for uppercut and body shot training. Cowhide leather with water-resistant nylon lining.', image: '/assets/products/punch-bag-4.jpg' },
    { id: 'SI-056', artNumber: 'SI-056', name: 'Banana Bag', category: 'training-equipment', subcategory: 'punching-bags', material: 'Premium Cowhide Leather', sizes: '6ft', description: 'Banana-style hanging bag for Muay Thai low kicks and knee strikes. Cowhide leather with nylon lining.', image: '/assets/products/punch-bag-5.jpg' },
    { id: 'SI-057', artNumber: 'SI-057', name: 'Tear Drop Bag', category: 'training-equipment', subcategory: 'punching-bags', material: 'Premium Cowhide Leather', sizes: '3.5ft', description: 'Tear drop shaped bag for uppercut combinations. Premium cowhide with water-resistant interior lining.', image: '/assets/products/punch-bag-6.jpg' },
    { id: 'SI-058', artNumber: 'SI-058', name: 'Maize Bag', category: 'training-equipment', subcategory: 'punching-bags', material: 'Premium Cowhide Leather', sizes: '2.5ft', description: 'Maize-shaped bag for head movement and slip training. Cowhide leather with water-resistant nylon lining.', image: '/assets/products/punch-bag-7.jpg' },
    { id: 'SI-059', artNumber: 'SI-059', name: 'Wall Mounted Bag', category: 'training-equipment', subcategory: 'punching-bags', material: 'Premium Cowhide Leather', sizes: 'Standard', description: 'Space-saving wall-mounted punching bag. Cowhide leather face with commercial-grade mounting bracket.', image: '/assets/products/punch-bag-8.jpg' },
    { id: 'SI-060', artNumber: 'SI-060', name: 'Free Standing Bag', category: 'training-equipment', subcategory: 'punching-bags', material: 'Premium Cowhide Leather', sizes: '5.5ft', description: 'Free-standing heavy bag with water-fillable base. Premium cowhide leather cover with nylon lining.', image: '/assets/products/punch-bag-9.jpg' },

    // ====== FOCUS PADS ======
    { id: 'SI-022', artNumber: 'SI-022', name: 'Pro Focus Mitts', category: 'training-equipment', subcategory: 'focus-pads', material: 'Full-grain Leather', sizes: 'Standard', description: 'Professional focus mitts with full-grain leather and integrated air channels for shock dispersion. Curved striking surface.', image: '/assets/products/focus-pad-1.jpg' },
    { id: 'SI-023', artNumber: 'SI-023', name: 'Precision Focus Pads', category: 'training-equipment', subcategory: 'focus-pads', material: 'Full-grain Leather', sizes: 'Standard', description: 'Precision-targeting focus pads with compact hitting zone. Full-grain leather with air channel ventilation.', image: '/assets/products/focus-pad-2.jpg' },
    { id: 'SI-024', artNumber: 'SI-024', name: 'Coach Focus Pads', category: 'training-equipment', subcategory: 'focus-pads', material: 'Full-grain Leather', sizes: 'Standard', description: 'Coach-grade focus pads with wrist support strap. Full-grain leather face with integrated air channels for comfort.', image: '/assets/products/focus-pad-3.jpg' },
    { id: 'SI-025', artNumber: 'SI-025', name: 'Speed Focus Mitts', category: 'training-equipment', subcategory: 'focus-pads', material: 'Full-grain Leather', sizes: 'Standard', description: 'Lightweight speed focus mitts for rapid combination drills. Full-grain leather with air channel technology.', image: '/assets/products/focus-pad-4.jpg' },
    { id: 'SI-026', artNumber: 'SI-026', name: 'Thai Pads', category: 'training-equipment', subcategory: 'focus-pads', material: 'Full-grain Leather', sizes: 'Standard', description: 'Long Thai-style kick pads with full-grain leather cover. Integrated air channels and double forearm straps.', image: '/assets/products/focus-pad-5.jpg' },
    { id: 'SI-027', artNumber: 'SI-027', name: 'Curved Focus Pads', category: 'training-equipment', subcategory: 'focus-pads', material: 'Full-grain Leather', sizes: 'Standard', description: 'Ergonomically curved focus pads for natural catching angle. Full-grain leather with air channel ventilation.', image: '/assets/products/focus-pad-6.jpg' },

    // ====== SPEED BALLS ======
    { id: 'SI-061', artNumber: 'SI-061', name: 'Classic Speed Ball', category: 'training-equipment', subcategory: 'speed-balls', material: 'PVC / Fabric Lining', sizes: 'Small, Medium, Large', description: 'Classic speed ball with durable PVC outer and fabric lining interior. Balanced weight for consistent rebound.', image: '/assets/products/speed-ball-1.jpg' },
    { id: 'SI-062', artNumber: 'SI-062', name: 'Pro Speed Ball', category: 'training-equipment', subcategory: 'speed-balls', material: 'PVC / Fabric Lining', sizes: 'M, L', description: 'Professional speed ball with premium PVC shell and reinforced fabric lining. Tournament-grade rebound.', image: '/assets/products/speed-ball-2.jpg' },
    { id: 'SI-063', artNumber: 'SI-063', name: 'Floor-to-Ceiling Ball', category: 'training-equipment', subcategory: 'speed-balls', material: 'PVC / Fabric Lining', sizes: 'Standard', description: 'Double-end floor-to-ceiling ball with PVC outer and fabric lining. Includes elastic cords.', image: '/assets/products/speed-ball-3.jpg' },
    { id: 'SI-064', artNumber: 'SI-064', name: 'Reflex Speed Ball', category: 'training-equipment', subcategory: 'speed-balls', material: 'PVC / Fabric Lining', sizes: 'Standard', description: 'Reflex training speed ball with PVC construction and fabric interior lining. Develops timing and accuracy.', image: '/assets/products/speed-ball-4.jpg' },
    { id: 'SI-065', artNumber: 'SI-065', name: 'Double End Ball', category: 'training-equipment', subcategory: 'speed-balls', material: 'PVC / Fabric Lining', sizes: 'S, M', description: 'Double-end striking ball with PVC shell and fabric lining. Perfect for combination and accuracy training.', image: '/assets/products/speed-ball-5.jpg' },
    { id: 'SI-066', artNumber: 'SI-066', name: 'Mini Speed Ball', category: 'training-equipment', subcategory: 'speed-balls', material: 'PVC / Fabric Lining', sizes: 'XS, S', description: 'Compact mini speed ball for advanced reflex training. PVC material with fabric lining.', image: '/assets/products/speed-ball-6.jpg' },
    { id: 'SI-067', artNumber: 'SI-067', name: 'Heavy Speed Ball', category: 'training-equipment', subcategory: 'speed-balls', material: 'PVC / Fabric Lining', sizes: 'Small, Medium, Large, Extra Large, Double Extra Large', description: 'Weighted heavy speed ball for power and endurance training. Durable PVC with reinforced fabric lining.', image: '/assets/products/speed-ball-7.jpg' },
    { id: 'SI-068', artNumber: 'SI-068', name: 'Swivel Speed Ball', category: 'training-equipment', subcategory: 'speed-balls', material: 'PVC / Fabric Lining', sizes: 'M, L', description: 'Speed ball with premium swivel mount system. PVC construction with fabric lining for true response.', image: '/assets/products/speed-ball-8.jpg' },
    { id: 'SI-069', artNumber: 'SI-069', name: 'Reaction Ball', category: 'training-equipment', subcategory: 'speed-balls', material: 'PVC / Fabric Lining', sizes: 'Standard', description: 'Irregular bounce reaction ball for unpredictable reflex training. PVC outer with fabric interior.', image: '/assets/products/speed-ball-9.jpg' },

    // ====== FIGHTING STICKS ======
    { id: 'SI-079', artNumber: 'SI-079', name: 'Training Fighting Stick', category: 'training-equipment', subcategory: 'fighting-sticks', material: 'PU Flex', sizes: 'Standard', description: 'PU Flex training fighting stick with machine mold construction for uniform density and consistent feel.', image: '/assets/products/fighting-stick-1.jpg' },
    { id: 'SI-080', artNumber: 'SI-080', name: 'Pro Fighting Stick', category: 'training-equipment', subcategory: 'fighting-sticks', material: 'PU Flex', sizes: 'Standard', description: 'Professional-grade fighting stick with PU Flex machine mold. Ergonomic grip with wrist strap.', image: '/assets/products/fighting-stick-2.jpg' },
    { id: 'SI-081', artNumber: 'SI-081', name: 'Speed Stick', category: 'training-equipment', subcategory: 'fighting-sticks', material: 'PU Flex', sizes: 'Standard', description: 'Lightweight speed stick for reflex and dodge training. PU Flex machine mold for consistent performance.', image: '/assets/products/fighting-stick-3.jpg' },
    { id: 'SI-082', artNumber: 'SI-082', name: 'Dual Fighting Sticks', category: 'training-equipment', subcategory: 'fighting-sticks', material: 'PU Flex', sizes: 'Standard (Pair)', description: 'Dual fighting sticks sold as a pair. PU Flex machine mold with foam-padded striking zones.', image: '/assets/products/fighting-stick-4.jpg' },
    { id: 'SI-083', artNumber: 'SI-083', name: 'Kali Training Stick', category: 'training-equipment', subcategory: 'fighting-sticks', material: 'PU Flex', sizes: 'Standard', description: 'Kali/Arnis style training stick with PU Flex machine mold. Padded for safe contact drills.', image: '/assets/products/fighting-stick-5.jpg' },
    { id: 'SI-084', artNumber: 'SI-084', name: 'Coaching Stick', category: 'training-equipment', subcategory: 'fighting-sticks', material: 'PU Flex', sizes: 'Long', description: 'Extended coaching stick for footwork and positioning drills. PU Flex machine mold with comfort grip.', image: '/assets/products/fighting-stick-6.jpg' },

    // ====== KICK SHIELDS ======
    { id: 'SI-040', artNumber: 'SI-040', name: 'Pro Kick Shield', category: 'training-equipment', subcategory: 'kick-shields', material: 'PU Leather / Shock-absorbing Foam', sizes: 'Standard', description: 'Professional kick shield with multi-layer shock-absorbing padding. Dual arm straps and reinforced handle grip.', image: '/assets/products/kick-shield-1.jpg' },
    { id: 'SI-041', artNumber: 'SI-041', name: 'Curved Kick Shield', category: 'training-equipment', subcategory: 'kick-shields', material: 'PU Leather / Shock-absorbing Foam', sizes: 'Standard', description: 'Curved kick shield for natural catching angle. Shock-absorbing foam core with reinforced arm straps.', image: '/assets/products/kick-shield-2.jpg' },
    { id: 'SI-042', artNumber: 'SI-042', name: 'Body Shield', category: 'training-equipment', subcategory: 'kick-shields', material: 'PU Leather / Shock-absorbing Foam', sizes: 'Large', description: 'Full-body protective shield for heavy kick and knee training. Extra-thick shock-absorbing construction.', image: '/assets/products/kick-shield-3.jpg' },
    { id: 'SI-043', artNumber: 'SI-043', name: 'Low Kick Shield', category: 'training-equipment', subcategory: 'kick-shields', material: 'PU Leather / Shock-absorbing Foam', sizes: 'Standard', description: 'Leg-mounted low kick shield for checking and catching leg kicks. Shock-absorbing padding with straps.', image: '/assets/products/kick-shield-4.jpg' },
    { id: 'SI-044', artNumber: 'SI-044', name: 'Tombstone Shield', category: 'training-equipment', subcategory: 'kick-shields', material: 'PU Leather / Shock-absorbing Foam', sizes: 'Large', description: 'Tombstone-style rectangular kick shield with maximum striking surface. Heavy-duty shock-absorbing foam.', image: '/assets/products/kick-shield-5.jpg' },
    { id: 'SI-045', artNumber: 'SI-045', name: 'Belly Pad', category: 'training-equipment', subcategory: 'kick-shields', material: 'PU Leather / Shock-absorbing Foam', sizes: 'Standard', description: 'Belly protection pad for body shot training. Lightweight shock-absorbing foam with adjustable straps.', image: '/assets/products/kick-shield-6.jpg' },

    // ====== TRACKSUITS & FLEECE ======
    ...generateApparelRange('RS-CA-056', 'RS-CA-082', 'tracksuits', 'Tracksuits & Fleece Suits', [
        'Classic Track Jacket', 'Slim Fit Tracksuit', 'Fleece Suit Set', 'Zip-Up Track Pants', 'Hooded Tracksuit',
        'Performance Fleece Jacket', 'Training Track Set', 'Windbreaker Tracksuit', 'Tapered Track Pants',
        'Poly Tracksuit', 'Warm-Up Suit', 'Full Zip Fleece', 'Jogger Track Set', 'Micro Fleece Suit',
        'Elite Track Set', 'Side Stripe Tracksuit', 'Fleece Hoodie Set', 'Retro Track Jacket',
        'Relaxed Fit Tracksuit', 'Brushed Fleece Set', 'Tech Track Pants', 'Quarter-Zip Fleece Top',
        'Colorblock Tracksuit', 'Softshell Track Jacket', 'Premium Track Set', 'Polar Fleece Suit', 'Essential Tracksuit'
    ]),

    // ====== HOODIES & SWEATSHIRTS ======
    ...generateApparelRange('RS-CA-151', 'RS-CA-209', 'hoodies', 'Hoodies & Sweatshirts', [
        'Classic Pullover Hoodie', 'Zip-Up Hoodie', 'Oversized Hoodie', 'Cropped Hoodie', 'Performance Hoodie',
        'Fleece Lined Hoodie', 'Crew Neck Sweatshirt', 'Tech Hoodie', 'Heavyweight Hoodie', 'French Terry Sweatshirt',
        'Raglan Sleeve Hoodie', 'Kangaroo Pocket Hoodie', 'Acid Wash Hoodie', 'Sleeveless Hoodie',
        'Colorblock Hoodie', 'Half-Zip Sweatshirt', 'Drop Shoulder Hoodie', 'Mock Neck Sweatshirt',
        'Embroidered Hoodie', 'Mesh Panel Hoodie', 'Longline Hoodie', 'Boxy Fit Hoodie', 'Striped Hoodie',
        'Thumbhole Hoodie', 'Sherpa Lined Hoodie', 'Graphic Sweatshirt', 'Slim Fit Hoodie',
        'Crewneck Pullover', 'Waffle Knit Hoodie', 'Track Hoodie', 'Side Zip Hoodie',
        'Funnel Neck Sweatshirt', 'Tie-Dye Hoodie', 'Essential Hoodie', 'Athletic Hoodie',
        'Urban Hoodie', 'Premium Pullover', 'Tech Fleece Hoodie', 'Split Hem Hoodie',
        'Panel Hoodie', 'Training Hoodie', 'Street Hoodie', 'Signature Hoodie',
        'Blank Canvas Hoodie', 'Utility Hoodie', 'Drawstring Hoodie', 'Relaxed Hoodie',
        'Pro Team Hoodie', 'Heritage Hoodie', 'Campus Hoodie', 'Vintage Sweatshirt',
        'Double Layered Hoodie', 'Ribbed Hoodie', 'Tonal Hoodie', 'Reverse Weave Hoodie',
        'Club Hoodie', 'Stadium Hoodie', 'Icon Hoodie', 'Core Pullover'
    ]),

    // ====== TRAINING WEAR ======
    { id: 'TW-001', artNumber: 'TW-001', name: 'Compression Pants', category: 'apparel', subcategory: 'training-wear', material: '87% Polyester, 13% Spandex', sizes: 'Small, Medium, Large, Extra Large, Double Extra Large', description: 'High-performance compression pants with moisture-wicking technology. Four-way stretch for unrestricted movement.', image: '/assets/products/training-wear-1.jpg' },
    { id: 'TW-002', artNumber: 'TW-002', name: 'Sports Bra — High Support', category: 'apparel', subcategory: 'training-wear', material: '80% Nylon, 20% Spandex', sizes: 'Small, Medium, Large, Extra Large, Double Extra Large', description: 'High-support sports bra with encapsulated design and adjustable racerback straps. Moisture-wicking fabric.', image: '/assets/products/training-wear-2.jpg' },
    { id: 'TW-003', artNumber: 'TW-003', name: 'Muscle Tank Top', category: 'apparel', subcategory: 'training-wear', material: '100% Polyester DRY-FIT', sizes: 'Small, Medium, Large, Extra Large, Double Extra Large', description: 'Lightweight muscle tank top with DRY-FIT moisture management. Deep arm holes for full range of motion.', image: '/assets/products/training-wear-3.jpg' },
    { id: 'TW-004', artNumber: 'TW-004', name: 'Training Shorts', category: 'apparel', subcategory: 'training-wear', material: '100% Polyester', sizes: 'Small, Medium, Large, Extra Large, Double Extra Large', description: 'Lightweight training shorts with side slits for mobility. Internal drawstring waistband and side pockets.', image: '/assets/products/training-wear-4.jpg' },
    { id: 'TW-005', artNumber: 'TW-005', name: 'Compression Long Sleeve', category: 'apparel', subcategory: 'training-wear', material: '87% Polyester, 13% Spandex', sizes: 'Small, Medium, Large, Extra Large, Double Extra Large', description: 'Long-sleeve compression top with targeted ventilation zones. Flatlock seams for chafe-free comfort.', image: '/assets/products/training-wear-5.jpg' },
    { id: 'TW-006', artNumber: 'TW-006', name: 'Sports Bra — Medium Support', category: 'apparel', subcategory: 'training-wear', material: '75% Nylon, 25% Spandex', sizes: 'Small, Medium, Large, Extra Large, Double Extra Large', description: 'Medium-support sports bra with cross-back strap design. Removable pads and breathable mesh panels.', image: '/assets/products/training-wear-6.jpg' },
    { id: 'TW-007', artNumber: 'TW-007', name: 'Performance Leggings', category: 'apparel', subcategory: 'training-wear', material: '77% Polyester, 23% Spandex', sizes: 'Small, Medium, Large, Extra Large, Double Extra Large', description: 'High-waist performance leggings with side pocket and reflective details. Squat-proof fabric construction.', image: '/assets/products/training-wear-7.jpg' },
    { id: 'TW-008', artNumber: 'TW-008', name: 'Stringer Tank Top', category: 'apparel', subcategory: 'training-wear', material: '100% Cotton Blend', sizes: 'Small, Medium, Large, Extra Large, Double Extra Large', description: 'Classic stringer tank top for bodybuilding and gym training. Deep cut sides with reinforced neckline.', image: '/assets/products/training-wear-8.jpg' },
];

// Helper: generate apparel range
function generateApparelRange(startArt, endArt, subcategory, subcategoryName, names) {
    const startNum = parseInt(startArt.split('-').pop());
    const endNum = parseInt(endArt.split('-').pop());
    const prefix = startArt.substring(0, startArt.lastIndexOf('-') + 1);
    const result = [];
    let nameIdx = 0;
    for (let i = startNum; i <= endNum && nameIdx < names.length; i++, nameIdx++) {
        const artNum = `${prefix}${String(i).padStart(3, '0')}`;
        result.push({
            id: artNum,
            artNumber: artNum,
            name: names[nameIdx],
            category: 'apparel',
            subcategory: subcategory,
            material: subcategory === 'tracksuits' ? '100% Polyester warmth / Fleece' : '80% Cotton, 20% Polyester',
            sizes: 'Small, Medium, Large, Extra Large, Double Extra Large',
            description: `Premium ${names[nameIdx].toLowerCase()} from the Shotric ${subcategoryName} collection. Custom designs and colors available for wholesale orders.`,
            image: `/assets/products/${subcategory}-${nameIdx + 1}.jpg`
        });
    }
    return result;
}

export default products;

// Apply saved overrides on load
(function applyOverrides() {
    const overrides = loadOverrides();
    for (const [id, fields] of Object.entries(overrides)) {
        const product = products.find(p => p.id === id);
        if (product) Object.assign(product, fields);
    }
})();

export function getProductById(id) {
    return products.find(p => p.id === id);
}

export function getProductsByCategory(categoryId) {
    return products.filter(p => p.category === categoryId);
}

export function getProductsBySubcategory(categoryId, subcategory) {
    return products.filter(p => p.category === categoryId && p.subcategory === subcategory);
}

export function searchProducts(query) {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return products.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.artNumber.toLowerCase().includes(q) ||
        p.material.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subcategory.toLowerCase().includes(q)
    ).slice(0, 20);
}

export function updateProduct(id, updates) {
    const product = products.find(p => p.id === id);
    if (!product) return false;
    Object.assign(product, updates);
    // Persist to localStorage
    const overrides = loadOverrides();
    overrides[id] = { ...overrides[id], ...updates };
    saveOverrides(overrides);
    return true;
}
