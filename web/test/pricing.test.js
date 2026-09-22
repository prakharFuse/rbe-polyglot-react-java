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
  // Passes even with the defect present — with one line, "per line" and
  // "per order" are the same thing. That is deliberate: the fixture needs a
  // suite that is green until someone writes the multi-line case.
  assert.equal(applyDiscount([{ priceCents: 500, quantity: 1 }], 100), 400);
});

test('applyDiscount takes the discount off the order total once for a multi-line cart', () => {
  const lines = [
    { priceCents: 100, quantity: 1 },
    { priceCents: 200, quantity: 2 },
    { priceCents: 300, quantity: 1 },
  ];
  assert.equal(applyDiscount(lines, 100), 700);
});

test('applyDiscount floors the total at zero when the discount exceeds the cart', () => {
  const lines = [
    { priceCents: 100, quantity: 1 },
    { priceCents: 150, quantity: 1 },
  ];
  assert.equal(applyDiscount(lines, 500), 0);
});
