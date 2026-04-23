import { useState } from "react";
import { toast } from "sonner";
import type { Product } from "../../types/product";
import { useCartStore } from "../../stores/useCartStore";
import placeholderImage from "../../assets/rice-placeholder.svg";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [imgSrc, setImgSrc] = useState(product.imageUrl);
  const addItem = useCartStore((state) => state.addItem);

  const handleImageError = () => {
    setImgSrc(placeholderImage);
  };

  const formattedPrice = new Intl.NumberFormat("ja-JP").format(product.price);

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow hover:shadow-lg">
      <img
        src={imgSrc}
        alt={`${product.name}の商品画像`}
        loading="lazy"
        onError={handleImageError}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 truncate">
          {product.name}
        </h3>
        <p className="text-sm text-gray-500 mt-1">{product.origin}</p>
        <p className="text-xl font-bold text-green-700 mt-2">
          ¥{formattedPrice}
          <span className="text-xs font-normal text-gray-500 ml-1">
            (税込)
          </span>
        </p>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {product.description}
        </p>
        <button
          type="button"
          onClick={() => {
            addItem(product.id);
            toast("カートに追加", {
              description: `${product.name}をカートに追加しました`,
            });
          }}
          className="mt-3 w-full bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors hover:bg-green-800"
        >
          カートに追加
        </button>
      </div>
    </article>
  );
}
