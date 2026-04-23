import { describe, it, expect } from "vitest";
import { products } from "./products";

describe("products", () => {
  it("contains 6 products", () => {
    expect(products).toHaveLength(6);
  });

  it("each product has all required fields", () => {
    for (const product of products) {
      expect(product.id).toBeTruthy();
      expect(product.name).toBeTruthy();
      expect(product.origin).toBeTruthy();
      expect(product.price).toBeGreaterThan(0);
      expect(product.description).toBeTruthy();
      expect(product.imageUrl).toBeTruthy();
    }
  });

  it("all product ids are unique", () => {
    const ids = products.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("all prices are reasonable numbers", () => {
    for (const product of products) {
      expect(Number.isInteger(product.price)).toBe(true);
      expect(product.price).toBeGreaterThanOrEqual(1000);
      expect(product.price).toBeLessThanOrEqual(10000);
    }
  });

  it("all image URLs follow expected pattern", () => {
    for (const product of products) {
      expect(product.imageUrl).toMatch(/^\/images\/.+\.webp$/);
    }
  });
});
