// Categories tree
export const categories = [
  {
    id: 'boxing-gloves',
    name: 'Boxing Gloves',
    icon: '🥊',
    description: 'The Signature Line — Professional, Training & Breathable Series',
    image: '/assets/products/boxing-gloves.jpg',
    subcategories: [
      { id: 'professional', name: 'Professional Gloves', desc: 'Hand-molded Cowhide Leather' },
      { id: 'training', name: 'Training / Injection Mold Gloves', desc: 'Artificial Leather' },
      { id: 'breathable', name: 'Breathable Mesh Palm Series', desc: 'Mesh palm ventilation' }
    ]
  },
  {
    id: 'protection-gear',
    name: 'Protection Gear',
    icon: '🛡️',
    description: 'Head Guards, Shin Pads, Groin Guards, Mouth Guards & Thigh Pads',
    image: '/assets/products/protection-gear.jpg',
    subcategories: [
      { id: 'head-guards', name: 'Head Guards', desc: 'PU Flex with adjustable lace-up closing' },
      { id: 'shin-pads', name: 'Shin Pads', desc: 'Pre-curved handmade mold with hook-and-loop straps' },
      { id: 'groin-guards', name: 'Groin Guards', desc: 'Shock-absorbing cup with adjustable waistband' },
      { id: 'mouth-guards', name: 'Mouth Guards / Gumshields', desc: 'Available in all colors' },
      { id: 'thigh-pads', name: 'Thigh Pads', desc: 'Shock-absorbing PU material' }
    ]
  },
  {
    id: 'training-equipment',
    name: 'Training Equipment',
    icon: '🏋️',
    description: 'Punching Bags, Focus Pads, Speed Balls, Fighting Sticks & Kick Shields',
    image: '/assets/products/training-equipment.jpg',
    subcategories: [
      { id: 'punching-bags', name: 'Punching Bags', desc: 'Premium Cowhide Leather, water-resistant nylon lining' },
      { id: 'focus-pads', name: 'Focus Pads', desc: 'Full-grain leather with integrated air channels' },
      { id: 'speed-balls', name: 'Speed Balls', desc: 'PVC material with fabric lining' },
      { id: 'fighting-sticks', name: 'Fighting Sticks', desc: 'PU Flex material with machine mold' },
      { id: 'kick-shields', name: 'Kick Shields', desc: 'Shock-absorbing padding' }
    ]
  },
  {
    id: 'apparel',
    name: 'Apparel & Fitness Wear',
    icon: '👕',
    description: 'Tracksuits, Hoodies, Compression Wear & Training Apparel',
    image: '/assets/products/apparel.jpg',
    subcategories: [
      { id: 'tracksuits', name: 'Tracksuits & Fleece Suits', desc: 'Premium warmth and comfort' },
      { id: 'hoodies', name: 'Hoodies & Sweatshirts', desc: 'Custom designs available' },
      { id: 'training-wear', name: 'Training Wear', desc: 'Compression pants, sports bras & tank tops' }
    ]
  }
];

export function getCategoryById(id) {
  return categories.find(c => c.id === id);
}

export function getSubcategory(categoryId, subId) {
  const cat = getCategoryById(categoryId);
  return cat ? cat.subcategories.find(s => s.id === subId) : null;
}
