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
 * Shift the decimal point of `value` by `places` digits without multiplying,
 * so the shift can't introduce the rounding error a `* 10**places` would.
 */
function shiftDecimalPoint(value, places) {
  const [digits, exponent] = value.toExponential().split('e');
  return Number(`${digits}e${Number(exponent) + places}`);
}

/** Round a dollar amount to two decimal places, half-up (ties away from zero). */
export function roundToCents(amount) {
  if (typeof amount !== 'number' || !Number.isFinite(amount)) {
    throw new TypeError('roundToCents expects a finite number');
  }

  const shifted = shiftDecimalPoint(amount, 2);
  const rounded = shifted < 0 ? -Math.round(-shifted) : Math.round(shifted);
  return shiftDecimalPoint(rounded, -2);
}
