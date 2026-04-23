import { useState } from "react";
import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { HeroSection } from "./components/hero/HeroSection";
import { ProductGrid } from "./components/product/ProductGrid";
import { CartDrawer } from "./components/cart/CartDrawer";
import { Toaster } from "./components/ui/sonner";
import { products } from "./data/products";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header onCartClick={() => setIsCartOpen(!isCartOpen)} />
      <main className="flex-1">
        <HeroSection />
        <ProductGrid products={products} />
      </main>
      <Footer />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
      <Toaster position="top-right" visibleToasts={3} duration={5000} />
    </div>
  );
}

export default App;
