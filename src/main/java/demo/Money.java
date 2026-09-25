package demo;

import java.math.BigDecimal;
import java.math.RoundingMode;

/** Cent arithmetic for the order service. ASCII only, deliberately. */
public final class Money {
    private static final int CENT_SCALE = 2;

    private final BigDecimal amount;

    private Money(BigDecimal amount) {
        this.amount = amount;
    }

    /** Wrap an already-parsed decimal amount. */
    public static Money of(BigDecimal amount) {
        return new Money(amount);
    }

    /** Parse a decimal amount from its exact textual form. */
    public static Money of(String amount) {
        return new Money(new BigDecimal(amount));
    }

    /**
     * Wrap a double amount. Goes through {@link BigDecimal#valueOf(double)}
     * rather than {@code new BigDecimal(double)} so the decimal reflects what
     * the double prints as, not its raw binary value.
     */
    public static Money of(double amount) {
        return new Money(BigDecimal.valueOf(amount));
    }

    public BigDecimal amount() {
        return amount;
    }

    /** Round to two decimal places, ties rounding away from zero. */
    public Money roundToCents() {
        return new Money(amount.setScale(CENT_SCALE, RoundingMode.HALF_UP));
    }

    /** Sum of every amount, in cents. */
    public static int sum(int[] amounts) {
        int total = 0;
        for (int amount : amounts) {
            total += amount;
        }
        return total;
    }

    /** Never let a computed total fall below zero. */
    public static int floorAtZero(int amount) {
        return Math.max(0, amount);
    }
}
