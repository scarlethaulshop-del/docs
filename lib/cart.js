// ============================================================
//  lib/cart.js — shared cart logic across all pages
// ============================================================

export function getCart() {
  try { return JSON.parse(localStorage.getItem('sh_cart') || '[]'); } catch { return []; }
}

export function saveCart(cart) {
  localStorage.setItem('sh_cart', JSON.stringify(cart));
}

export function addToCart(product) {
  const cart = getCart();
  const existing = cart.find(x => x.id === product.id);
  if (existing) { existing.qty += 1; }
  else { cart.push({ ...product, qty: 1 }); }
  saveCart(cart);
}

export function removeFromCart(id) {
  const cart = getCart().filter(x => x.id !== id);
  saveCart(cart);
}

export function changeQty(id, delta) {
  const cart = getCart();
  const item = cart.find(x => x.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart(cart);
}

export function renderCartCount() {
  const el = document.getElementById('cart-count');
  if (!el) return;
  const count = getCart().reduce((a, x) => a + x.qty, 0);
  el.textContent = count;
}

export function renderCart() {
  const cartBody = document.getElementById('cart-body');
  const cartTotal = document.getElementById('cart-total');
  if (!cartBody) return;

  const cart = getCart();
  const total = cart.reduce((a, x) => a + x.price * x.qty, 0);
  if (cartTotal) cartTotal.textContent = '$' + total.toFixed(2);

  if (!cart.length) {
    cartBody.innerHTML = `<div class="cart-empty">Your bag is empty.<br>Start your haul.</div>`;
    return;
  }

  cartBody.innerHTML = cart.map(x => `
    <div class="cart-item">
      <div class="ci-img">${x.emoji || '📦'}</div>
      <div class="ci-info">
        <div class="ci-name">${x.name}</div>
        <div class="ci-price">$${(x.price * x.qty).toFixed(2)}</div>
        <div class="ci-qty">
          <button onclick="window._cartChangeQty('${x.id}', -1)">−</button>
          <span>${x.qty}</span>
          <button onclick="window._cartChangeQty('${x.id}', 1)">+</button>
        </div>
      </div>
      <button class="ci-rm" onclick="window._cartRemove('${x.id}')">✕</button>
    </div>
  `).join('');

  // expose handlers
  window._cartRemove = (id) => { removeFromCart(id); renderCart(); renderCartCount(); };
  window._cartChangeQty = (id, d) => { changeQty(id, d); renderCart(); renderCartCount(); };
}
