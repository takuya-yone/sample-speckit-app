import { describe, it, expect, beforeEach } from "vitest";
import { useCartStore } from "./useCartStore";

beforeEach(() => {
  useCartStore.setState({ items: [] });
});

describe("useCartStore", () => {
  it("adds an item to the cart", () => {
    useCartStore.getState().addItem("rice-1");
    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0]).toEqual({ productId: "rice-1", quantity: 1 });
  });

  it("increments quantity when adding the same item", () => {
    useCartStore.getState().addItem("rice-1");
    useCartStore.getState().addItem("rice-1");
    const items = useCartStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(2);
  });

  it("does not exceed max quantity of 99", () => {
    useCartStore.setState({ items: [{ productId: "rice-1", quantity: 99 }] });
    useCartStore.getState().addItem("rice-1");
    expect(useCartStore.getState().items[0].quantity).toBe(99);
  });

  it("removes an item from the cart", () => {
    useCartStore.getState().addItem("rice-1");
    useCartStore.getState().removeItem("rice-1");
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("updates quantity with clamping", () => {
    useCartStore.getState().addItem("rice-1");
    useCartStore.getState().updateQuantity("rice-1", 5);
    expect(useCartStore.getState().items[0].quantity).toBe(5);

    useCartStore.getState().updateQuantity("rice-1", 0);
    expect(useCartStore.getState().items[0].quantity).toBe(1);

    useCartStore.getState().updateQuantity("rice-1", 200);
    expect(useCartStore.getState().items[0].quantity).toBe(99);
  });

  it("clears the cart", () => {
    useCartStore.getState().addItem("rice-1");
    useCartStore.getState().addItem("rice-2");
    useCartStore.getState().clearCart();
    expect(useCartStore.getState().items).toHaveLength(0);
  });

  it("calculates total items", () => {
    useCartStore.getState().addItem("rice-1");
    useCartStore.getState().addItem("rice-1");
    useCartStore.getState().addItem("rice-2");
    expect(useCartStore.getState().totalItems()).toBe(3);
  });

  it("calculates total price", () => {
    useCartStore.setState({
      items: [
        { productId: "rice-1", quantity: 2 },
        { productId: "rice-2", quantity: 1 },
      ],
    });
    const getPrice = (id: string) => (id === "rice-1" ? 1000 : 2000);
    expect(useCartStore.getState().totalPrice(getPrice)).toBe(4000);
  });
});
