import type { Product } from "../../types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <section id="products" className="max-w-7xl mx-auto px-4 py-16">
        <p className="text-center text-gray-500 text-lg">
          現在お取り扱い中の商品はありません
        </p>
      </section>
    );
  }

  return (
    <section id="products" className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
        お米のラインナップ
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
