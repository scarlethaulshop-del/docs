// ============================================================
//  lib/utils.js — shared utility functions
// ============================================================

// Generates order IDs like SH-2025-00042
export function generateOrderId() {
  const year = new Date().getFullYear();
  const rand = Math.floor(Math.random() * 90000) + 10000;
  return `SH-${year}-${rand}`;
}

// Format currency
export function formatMoney(amount) {
  return '$' + parseFloat(amount).toFixed(2);
}

// Format date nicely
export function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric'
  });
}
