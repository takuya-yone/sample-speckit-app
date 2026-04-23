import { Header } from "./components/layout/Header";
import { Footer } from "./components/layout/Footer";
import { HeroSection } from "./components/hero/HeroSection";
import { ProductGrid } from "./components/product/ProductGrid";
import { products } from "./data/products";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProductGrid products={products} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
