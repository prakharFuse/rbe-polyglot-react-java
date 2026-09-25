import assert from 'node:assert/strict';
import { test } from 'node:test';
import { applyDiscount, cartTotal, roundToCents } from '../src/pricing.js';

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

test('roundToCents rounds a half cent up', () => {
  assert.equal(roundToCents(2.345), 2.35);
});

test('roundToCents rounds below a half cent down', () => {
  assert.equal(roundToCents(2.344), 2.34);
});

test('roundToCents rounds a tie that binary scaling would otherwise round down', () => {
  assert.equal(roundToCents(1.005), 1.01);
  assert.equal(roundToCents(10.555), 10.56);
});

test('roundToCents rounds negative ties and non-ties away from zero', () => {
  assert.equal(roundToCents(-0.005), -0.01);
  assert.equal(roundToCents(-2.344), -2.34);
});

test('roundToCents leaves already-rounded amounts unchanged', () => {
  assert.equal(roundToCents(19.99), 19.99);
  assert.equal(roundToCents(0), 0);
});
