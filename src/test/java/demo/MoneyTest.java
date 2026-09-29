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
    public void clampsNegativeTotals() {
        assertEquals(0, Money.floorAtZero(-50));
        assertEquals(25, Money.floorAtZero(25));
    }

    @Test
    public void sumAtIntMaxIsExact() {
        assertEquals(Integer.MAX_VALUE, Money.sum(new int[] {Integer.MAX_VALUE - 1, 1}));
    }

    @Test
    public void sumPastIntMaxThrows() {
        // Used to wrap to Integer.MIN_VALUE, which floorAtZero then reported as 0.
        assertThrows(ArithmeticException.class, () -> Money.sum(new int[] {Integer.MAX_VALUE, 1}));
    }

    @Test
    public void sumBelowIntMinThrows() {
        assertThrows(ArithmeticException.class, () -> Money.sum(new int[] {Integer.MIN_VALUE, -1}));
    }

    @Test
    public void intermediateOverflowThatComesBackInRangeIsExact() {
        // Only the final total has to fit in an int.
        assertEquals(Integer.MAX_VALUE, Money.sum(new int[] {Integer.MAX_VALUE, 1, -1}));
    }
}
