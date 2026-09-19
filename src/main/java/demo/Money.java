package demo;

/** Cent arithmetic for the order service. ASCII only, deliberately. */
public final class Money {
    private Money() {
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
