// ============================================================
//  lib/products.js — product card HTML renderer
// ============================================================

export function renderProductCard(p) {
  return `
    <div class="product-card">
      <div class="product-img">
        ${p.image_url
          ? `<img src="${p.image_url}" alt="${p.name}" style="width:100%;height:100%;object-fit:cover"/>`
          : `<span style="font-size:72px">${p.emoji || '📦'}</span>`
        }
        <div class="p-badge p-badge-${p.badge === 'NEW' ? 'new' : 'hot'}">${p.badge || 'HOT'}</div>
      </div>
      <div class="product-info">
        <div class="product-name">${p.name}</div>
        <div class="product-desc">${p.description || ''}</div>
        <div class="product-footer">
          <div>
            <span class="price">$${parseFloat(p.price).toFixed(2)}</span>
            ${p.orig_price ? `<span class="price-orig">$${parseFloat(p.orig_price).toFixed(2)}</span>` : ''}
          </div>
          <button class="add-btn" data-id="${p.id}" title="Add to bag">+</button>
        </div>
      </div>
    </div>
  `;
}
