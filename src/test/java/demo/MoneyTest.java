package demo;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertThrows;

import org.junit.Test;

/**
 * The JAVA suite. Green on main and expected to stay green: j131 asserts that
 * BOTH suites ran, and the defect it asks an agent to fix lives on the
 * JavaScript side on purpose.
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
    public void sumAtIntMaxBoundaryIsExact() {
        assertEquals(Integer.MAX_VALUE, Money.sum(new int[] {Integer.MAX_VALUE - 1, 1}));
    }

    @Test
    public void sumPastIntMaxThrows() {
        assertThrows(ArithmeticException.class, () -> Money.sum(new int[] {Integer.MAX_VALUE, 1}));
    }

    @Test
    public void clampsNegativeTotals() {
        assertEquals(0, Money.floorAtZero(-50));
        assertEquals(25, Money.floorAtZero(25));
    }
}
