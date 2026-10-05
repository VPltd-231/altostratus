import { describe, expect, it } from "vitest";
import { INITIAL_USAGE, estimate, estimateAll } from "@/data/pricing";

describe("pricing estimates", () => {
  it("prices the default usage per provider", () => {
    expect(estimate("aws", INITIAL_USAGE)).toBeCloseTo(15.32, 2);
    expect(estimate("azure", INITIAL_USAGE)).toBeCloseTo(14.84, 2);
  });

  it("treats Oracle's 10 TB free bandwidth allowance as free", () => {
    // 100 GB of bandwidth costs nothing; the rest is 3 + 1.275 + 1.9 + 0.2 + 0.3
    expect(estimate("oracle", INITIAL_USAGE)).toBeCloseTo(6.675, 3);
  });

  it("returns every provider, cheapest first", () => {
    const all = estimateAll(INITIAL_USAGE);
    expect(all.map((e) => e.id)).toEqual(["oracle", "azure", "aws", "gcp", "ibm"]);
    for (let i = 1; i < all.length; i++) {
      expect(all[i].monthly).toBeGreaterThanOrEqual(all[i - 1].monthly);
    }
  });

  it("costs nothing when usage is zero", () => {
    const zero = { compute: 0, storage: 0, bandwidth: 0, database: 0, functions: 0, api: 0 };
    expect(estimateAll(zero).every((e) => e.monthly === 0)).toBe(true);
  });
});
