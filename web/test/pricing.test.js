import assert from 'node:assert/strict';
import { test } from 'node:test';
import { applyDiscount, cartTotal } from '../src/pricing.js';

// The JAVASCRIPT suite. This is the one a single-slot gate would never have
// run: the repo's obvious command is the Gradle one.

test('cartTotal multiplies price by quantity', () => {
  assert.equal(cartTotal([{ priceCents: 250, quantity: 3 }]), 750);
});

test('cartTotal of an empty cart is zero', () => {
  assert.equal(cartTotal([]), 0);
});

test('applyDiscount takes the discount off a single-line cart once', () => {
  // With one line, "per line" and "per order" arithmetic coincide, so this
  // case is kept alongside the multi-line test below rather than in place of it.
  assert.equal(applyDiscount([{ priceCents: 500, quantity: 1 }], 100), 400);
});

test('applyDiscount takes the discount off the order total once for a multi-line cart', () => {
  const threeLineCart = [
    { priceCents: 500, quantity: 1 },
    { priceCents: 300, quantity: 2 },
    { priceCents: 100, quantity: 4 },
  ];
  assert.equal(applyDiscount(threeLineCart, 100), 1400);
});

test('applyDiscount floors the result at zero when the discount exceeds the subtotal', () => {
  assert.equal(applyDiscount([{ priceCents: 500, quantity: 1 }], 900), 0);
});

test('applyDiscount floors a multi-line cart at zero when the discount exceeds the order total', () => {
  const threeLineCart = [
    { priceCents: 500, quantity: 1 },
    { priceCents: 300, quantity: 2 },
    { priceCents: 100, quantity: 4 },
  ];
  assert.equal(applyDiscount(threeLineCart, 2000), 0);
});
