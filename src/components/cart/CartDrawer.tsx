import { useEffect, useRef } from "react";
import { useCartStore } from "../../stores/useCartStore";
import { products } from "../../data/products";
import { CartItem } from "./CartItem";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const items = useCartStore((state) => state.items);
  const totalPrice = useCartStore((state) =>
    state.totalPrice((id) => {
      const product = products.find((p) => p.id === id);
      return product?.price ?? 0;
    }),
  );
  const clearCart = useCartStore((state) => state.clearCart);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      drawerRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const formattedTotal = new Intl.NumberFormat("ja-JP").format(totalPrice);

  const scrollToProducts = () => {
    onClose();
    const el = document.getElementById("products");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label="ショッピングカート"
        tabIndex={-1}
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">
              ショッピングカート
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="カートを閉じる"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <p className="text-gray-500 text-lg mb-4">
                  カートは空です
                </p>
                <button
                  type="button"
                  onClick={scrollToProducts}
                  className="text-green-700 font-semibold hover:text-green-800 transition-colors"
                >
                  商品を見る
                </button>
              </div>
            ) : (
              <div>
                {items.map((item) => {
                  const product = products.find(
                    (p) => p.id === item.productId,
                  );
                  if (!product) return null;
                  return (
                    <CartItem
                      key={item.productId}
                      item={item}
                      product={product}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold text-gray-900">合計</span>
                <span className="text-xl font-bold text-green-700">
                  ¥{formattedTotal}
                </span>
              </div>
              <button
                type="button"
                onClick={clearCart}
                className="w-full py-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
              >
                カートを空にする
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
