// Pure pricing helpers for the cart view.
//
// Imported by the React component below, and — deliberately — importing
// NOTHING itself, so `node --test` can exercise it whether or not the
// install step got react in place. A fixture suite that can fail for install
// reasons cannot tell "the gate never ran it" from "it ran and the
// environment was wrong", and that ambiguity is what j131 must not have.

/** Total of every line in the cart, in cents. */
export function cartTotal(lines) {
  return lines.reduce((sum, line) => sum + line.priceCents * line.quantity, 0);
}

/**
 * Apply an order-level discount.
 *
 * The discount is subtracted once from the order total, and the result is
 * floored at zero so a discount larger than the cart never goes negative.
 */
export function applyDiscount(lines, discountCents) {
  return Math.max(0, cartTotal(lines) - discountCents);
}
