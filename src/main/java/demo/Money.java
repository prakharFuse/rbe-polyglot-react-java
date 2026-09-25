package demo;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Objects;

/** Cent arithmetic for the order service. ASCII only, deliberately. */
public final class Money {
    private static final int CENT_SCALE = 2;

    private final BigDecimal amount;

    private Money(BigDecimal amount) {
        this.amount = amount;
    }

    /** Wraps an arbitrary-precision amount as a Money value. */
    public static Money of(BigDecimal amount) {
        return new Money(Objects.requireNonNull(amount, "amount"));
    }

    public BigDecimal amount() {
        return amount;
    }

    /**
     * Rounds to two decimals, half away from zero. Mirrors {@code roundToCents}
     * in web/src/pricing.js.
     */
    public Money roundToCents() {
        return new Money(amount.setScale(CENT_SCALE, RoundingMode.HALF_UP));
    }

    @Override
    public boolean equals(Object other) {
        if (this == other) {
            return true;
        }
        if (!(other instanceof Money)) {
            return false;
        }
        Money that = (Money) other;
        return amount.equals(that.amount);
    }

    @Override
    public int hashCode() {
        return amount.hashCode();
    }

    @Override
    public String toString() {
        return amount.toString();
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
