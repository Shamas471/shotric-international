// Product Card component

// Map subcategories to their stock images
const subcategoryImages = {
  'professional': ['/assets/products/boxing-gloves-hero.jpg', '/assets/products/boxing-gloves-2.jpg', '/assets/products/boxing-gloves-3.jpg'],
  'training': ['/assets/products/boxing-gloves-2.jpg', '/assets/products/boxing-gloves-hero.jpg', '/assets/products/boxing-gloves-3.jpg'],
  'breathable': ['/assets/products/boxing-gloves-3.jpg', '/assets/products/boxing-gloves-hero.jpg', '/assets/products/boxing-gloves-2.jpg'],
  'head-guards': ['/assets/products/head-guard.jpg'],
  'shin-pads': ['/assets/products/shin-guard.jpg'],
  'mouth-guards': ['/assets/products/mouth-guard.jpg'],
  'groin-guards': ['/assets/products/groin-guard.jpg'],
  'thigh-pads': ['/assets/products/thigh-pad.jpg'],
  'punching-bags': ['/assets/products/punching-bag.jpg'],
  'focus-pads': ['/assets/products/focus-pads.jpg'],
  'speed-balls': ['/assets/products/speed-ball.jpg'],
  'fighting-sticks': ['/assets/products/fighting-stick.jpg'],
  'kick-shields': ['/assets/products/kick-shield.jpg'],
  'tracksuits': ['/assets/products/tracksuit.jpg'],
  'hoodies': ['/assets/products/hoodie.jpg'],
  'training-wear': ['/assets/products/training-wear.jpg'],
};

function getProductImage(product) {
  // Use uploaded image if available (data URL or external URL)
  let firstImg = product.image; try { const p = JSON.parse(product.image); if (Array.isArray(p) && p.length > 0) firstImg = p[0]; } catch(e) {} if (firstImg && (firstImg.startsWith('data:') || firstImg.startsWith('http'))) {
    return firstImg;
  }
  const images = subcategoryImages[product.subcategory];
  if (!images || images.length === 0) return '/assets/products/boxing-gloves-hero.jpg';
  // Cycle through available images using a hash of the product ID
  const hash = product.id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return images[hash % images.length];
}

export function renderProductCard(product) {
  const imgSrc = getProductImage(product);
  const isGlove = product.category === 'boxing-gloves';

  return `
    <a href="#/product/${product.id}" class="product-card float-card float-in" data-product-id="${product.id}">
      <div class="product-card__image-wrap">
        <img
          class="product-card__image"
          src="${imgSrc}"
          alt="${product.name}"
          loading="lazy"
          width="400"
          height="400"
        />
        ${isGlove ? '<span class="product-card__badge">Shotric Logo</span>' : ''}
      </div>
      <div class="product-card__body">
        <div class="product-card__category">${formatSubcategory(product.subcategory)}</div>
        <h3 class="product-card__name">${product.name}</h3>
        <div class="product-card__art">Art # ${product.artNumber}</div>
        <span class="product-card__material">${product.material}</span>
      </div>
    </a>
  `;
}

function formatSubcategory(sub) {
  return sub.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
}
