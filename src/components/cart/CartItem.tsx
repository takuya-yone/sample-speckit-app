import type { CartItem as CartItemType } from "../../types/cart";
import type { Product } from "../../types/product";
import { useCartStore } from "../../stores/useCartStore";

interface CartItemProps {
  item: CartItemType;
  product: Product;
}

export function CartItem({ item, product }: CartItemProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  const subtotal = product.price * item.quantity;
  const formattedPrice = new Intl.NumberFormat("ja-JP").format(product.price);
  const formattedSubtotal = new Intl.NumberFormat("ja-JP").format(subtotal);

  const handleDecrement = () => {
    if (item.quantity <= 1) {
      removeItem(item.productId);
    } else {
      updateQuantity(item.productId, item.quantity - 1);
    }
  };

  const handleIncrement = () => {
    updateQuantity(item.productId, item.quantity + 1);
  };

  return (
    <div className="flex gap-3 py-3 border-b border-gray-200 last:border-b-0">
      <img
        src={product.imageUrl}
        alt={`${product.name}の商品画像`}
        className="w-16 h-16 object-cover rounded-md flex-shrink-0"
      />
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-gray-900 truncate">
          {product.name}
        </h4>
        <p className="text-xs text-gray-500">¥{formattedPrice}</p>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleDecrement}
              className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors text-sm"
              aria-label={`${product.name}の数量を減らす`}
            >
              -
            </button>
            <span className="w-8 text-center text-sm font-medium">
              {item.quantity}
            </span>
            <button
              type="button"
              onClick={handleIncrement}
              className="w-7 h-7 flex items-center justify-center rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100 transition-colors text-sm"
              aria-label={`${product.name}の数量を増やす`}
            >
              +
            </button>
          </div>
          <span className="text-sm font-bold text-gray-900">
            ¥{formattedSubtotal}
          </span>
        </div>
      </div>
      <button
        type="button"
        onClick={() => removeItem(item.productId)}
        className="self-start p-1 text-gray-400 hover:text-red-500 transition-colors"
        aria-label={`${product.name}をカートから削除`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
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
  );
}
