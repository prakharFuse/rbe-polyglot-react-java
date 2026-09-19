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
  // Kept as a single-line cart because that is the shape where per-line and
  // per-order discount math coincide, unlike the multi-line cases below.
  assert.equal(applyDiscount([{ priceCents: 500, quantity: 1 }], 100), 400);
});

test('applyDiscount takes the discount off the order total once for a multi-line cart', () => {
  const lines = [
    { priceCents: 500, quantity: 1 },
    { priceCents: 300, quantity: 2 },
    { priceCents: 200, quantity: 1 },
  ];
  assert.equal(applyDiscount(lines, 100), 1200);
});

test('applyDiscount floors the payable total at zero when the discount exceeds the subtotal', () => {
  const lines = [
    { priceCents: 500, quantity: 1 },
    { priceCents: 200, quantity: 1 },
  ];
  assert.equal(applyDiscount(lines, 900), 0);
});

test('applyDiscount on an empty cart stays at zero', () => {
  assert.equal(applyDiscount([], 100), 0);
});
