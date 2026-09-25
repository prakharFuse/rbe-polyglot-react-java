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
 * Round a dollar amount to two decimal places, half-up (half away from zero).
 *
 * Shifts the absolute value's decimal point via exponential notation rather
 * than a plain `Math.round(amount * 100) / 100`, since multiplying first can
 * push values like 1.005 to the wrong side of .5 due to binary
 * floating-point error. Mirrors `Money.roundToCents()` in
 * src/main/java/demo/Money.java.
 */
export function roundToCents(amount) {
  if (!Number.isFinite(amount)) {
    throw new TypeError('roundToCents requires a finite number');
  }

  const sign = amount < 0 ? -1 : 1;
  const shiftedUp = shiftDecimal(Math.abs(amount), 2);
  const rounded = shiftDecimal(Math.round(shiftedUp), -2);
  const result = sign * rounded;

  return Object.is(result, -0) ? 0 : result;
}

function shiftDecimal(value, exponent) {
  const [digits, exp] = value.toString().split('e');
  return Number(`${digits}e${exp ? Number(exp) + exponent : exponent}`);
}
