// ============================================================
//  lib/products.js — product card renderer
//  Each product in Supabase should have a "whop_plan_id" field
//  like "plan_XXXXXXXXX" — get this from your Whop dashboard.
// ============================================================

export function renderProductCard(p) {
  const hasPlan = p.whop_plan_id && p.whop_plan_id.startsWith('plan_');
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
          ${hasPlan
            ? `<button class="buy-now-btn" data-plan="${p.whop_plan_id}" data-name="${p.name}" onclick="openWhopCheckout('${p.whop_plan_id}','${p.name}')">Buy Now</button>`
            : `<button class="add-btn" data-id="${p.id}" title="Add to bag">+</button>`
          }
        </div>
      </div>
    </div>
  `;
}
