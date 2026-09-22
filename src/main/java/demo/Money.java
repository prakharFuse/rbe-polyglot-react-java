package demo;

/** Cent arithmetic for the order service. ASCII only, deliberately. */
public final class Money {
    private Money() {
    }

    /**
     * Sum of every amount, in cents. Amounts are accumulated in a wider type
     * so intermediate values cannot wrap.
     *
     * @throws ArithmeticException if the total cannot be represented as an int
     */
    public static int sum(int[] amounts) {
        long total = 0;
        for (int amount : amounts) {
            total += amount;
        }
        return Math.toIntExact(total);
    }

    /** Never let a computed total fall below zero. */
    public static int floorAtZero(int amount) {
        return Math.max(0, amount);
    }
}
