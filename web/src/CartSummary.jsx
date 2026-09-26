import React from 'react';
import { applyDiscount, cartTotal, roundToCents } from './pricing.js';

/**
 * The cart summary. Rendering is not under test — the pure helpers are — so
 * this file exists to make the repository genuinely a React application
 * rather than to be exercised by the suite.
 */
export function CartSummary({ lines, discountCents }) {
  const total = roundToCents(cartTotal(lines) / 100);
  const payable = applyDiscount(lines, discountCents);
  return (
    <section className="cart-summary">
      <p>Subtotal: {total}</p>
      <p>Payable: {payable}</p>
    </section>
  );
}
