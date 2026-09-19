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
 * The discount applies once to the order as a whole, not once per line — a
 * cart is one order, not N independent purchases. The result is floored at
 * zero because a payable total can never be negative.
 */
export function applyDiscount(lines, discountCents) {
  return Math.max(0, cartTotal(lines) - discountCents);
}
