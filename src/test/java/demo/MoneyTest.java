package demo;

import static org.junit.Assert.assertEquals;

import org.junit.Test;

/**
 * The JAVA suite. Green on main and expected to stay green: j131 asserts that
 * BOTH suites ran; the order-level discount logic lives on the JavaScript
 * side (web/src/pricing.js).
 */
public class MoneyTest {
    @Test
    public void sumsAmounts() {
        assertEquals(400, Money.sum(new int[] {150, 250}));
    }

    @Test
    public void emptyIsZero() {
        assertEquals(0, Money.sum(new int[] {}));
    }

    @Test
    public void clampsNegativeTotals() {
        assertEquals(0, Money.floorAtZero(-50));
        assertEquals(25, Money.floorAtZero(25));
    }
}
