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
 * Subtracts `discountCents` once from the total of all lines, rather than
 * from each line individually, and floors the result at zero so a discount
 * larger than the cart total never produces a negative amount.
 */
export function applyDiscount(lines, discountCents) {
  return Math.max(0, cartTotal(lines) - discountCents);
}

/**
 * Round to two decimal places, half-up, matching Money.roundToCents() in the
 * Java service exactly.
 *
 * Floating-point multiplication (`amount * 100`) can land a hair below the
 * intended integer (e.g. 1.005 * 100 === 100.49999999999999), which would
 * flip Math.round from HALF_UP to HALF_DOWN on exact halves. Requantising
 * through toPrecision(12) first strips that noise before rounding, and the
 * sign is split out and reapplied so negative halves round away from zero
 * (HALF_UP on the absolute value) rather than toward positive infinity.
 */
export function roundToCents(amount) {
  if (typeof amount !== 'number' || !Number.isFinite(amount)) {
    throw new TypeError('roundToCents requires a finite number');
  }
  const sign = amount < 0 ? -1 : 1;
  const scaled = Number((Math.abs(amount) * 100).toPrecision(12));
  return (sign * Math.round(scaled)) / 100;
}
