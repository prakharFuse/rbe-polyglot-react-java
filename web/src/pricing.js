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

const CENTS_PER_UNIT = 100;

/**
 * Round to two decimal places, ties rounding away from zero — the same
 * half-up rule as demo.Money#roundToCents, so the Java and JS paths agree
 * on the same inputs.
 *
 * The sign is stripped before scaling and reapplied after because HALF_UP
 * rounds ties away from zero in both directions (-0.005 -> -0.01), which
 * `Math.round` alone does not do (it always rounds -0.5 ties toward
 * +Infinity). The scaled value is passed through `toPrecision(12)` before
 * `Math.round` because floating point amounts like 1.005 are actually
 * stored as slightly less than the decimal they print as, so multiplying
 * by CENTS_PER_UNIT can land just under the next integer (100.49999...)
 * and round down instead of up; correcting to 12 significant digits
 * removes that binary noise without discarding real precision.
 */
export function roundToCents(amount) {
  const sign = amount < 0 ? -1 : 1;
  const scaled = Number((Math.abs(amount) * CENTS_PER_UNIT).toPrecision(12));
  return (sign * Math.round(scaled)) / CENTS_PER_UNIT;
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
