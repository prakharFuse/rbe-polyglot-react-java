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
  // With one line, "per line" and "per order" are the same thing, so this
  // case alone can't distinguish the two — the multi-line test below does.
  assert.equal(applyDiscount([{ priceCents: 500, quantity: 1 }], 100), 400);
});

test('applyDiscount takes an order-level discount off a multi-line cart once', () => {
  assert.equal(
    applyDiscount(
      [
        { priceCents: 200, quantity: 1 },
        { priceCents: 300, quantity: 1 },
        { priceCents: 500, quantity: 1 },
      ],
      100
    ),
    900
  );
});

test('applyDiscount floors the payable total at zero', () => {
  assert.equal(applyDiscount([{ priceCents: 100, quantity: 1 }], 500), 0);
});
