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
 * DEFECT (this is what j131 asks an agent to fix): the discount is subtracted
 * from EVERY line rather than once from the order total, so a 100-cent
 * discount on a three-line cart takes off 300 cents. It also has no floor, so
 * a large discount can drive the total negative.
 *
 * The single-line case in the test below passes, which is why only a test
 * covering a multi-line cart catches it.
 */
export function applyDiscount(lines, discountCents) {
  return lines.reduce(
    (sum, line) => sum + (line.priceCents * line.quantity - discountCents),
    0,
  );
}
