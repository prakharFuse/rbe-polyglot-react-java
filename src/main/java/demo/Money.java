package demo;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Objects;

/** Cent arithmetic for the order service. ASCII only, deliberately. */
public final class Money {
    private final BigDecimal amount;

    private Money(BigDecimal amount) {
        this.amount = amount;
    }

    /** Wrap an exact decimal amount. */
    public static Money of(BigDecimal amount) {
        return new Money(amount);
    }

    /** Wrap a double amount, converting via BigDecimal.valueOf. */
    public static Money of(double amount) {
        return of(BigDecimal.valueOf(amount));
    }

    /** The wrapped decimal amount. */
    public BigDecimal amount() {
        return amount;
    }

    /** Round the amount to two decimal places, half-up. */
    public Money roundToCents() {
        return new Money(amount.setScale(2, RoundingMode.HALF_UP));
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
        return Objects.hash(amount);
    }

    @Override
    public String toString() {
        return "Money(" + amount + ")";
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
