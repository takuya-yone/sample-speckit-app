import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current || !heroRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      heroRef.current.style.opacity = "1";
      return;
    }

    hasAnimated.current = true;

    animate(heroRef.current.querySelectorAll("[data-animate]"), {
      opacity: [0, 1],
      translateY: [30, 0],
      ease: "outCubic",
      duration: 800,
      delay: stagger(200),
    });
  }, []);

  const scrollToProducts = () => {
    const el = document.getElementById("products");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative bg-green-900 text-white overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-green-800 to-amber-900 opacity-90" />
      <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32 text-center">
        <h2
          data-animate
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight opacity-0"
        >
          日本の大地が育む
          <br />
          最高のお米を食卓へ
        </h2>
        <p
          data-animate
          className="mt-6 text-lg md:text-xl text-green-100 max-w-2xl mx-auto opacity-0"
        >
          全国各地から厳選した銘柄米を、産地直送でお届けします。
        </p>
        <button
          type="button"
          data-animate
          onClick={scrollToProducts}
          className="mt-10 inline-flex items-center gap-2 bg-white text-green-900 font-semibold px-8 py-3 rounded-full transition-colors hover:bg-green-50 opacity-0"
          aria-label="商品一覧を見る"
        >
          商品を見る
          <span aria-hidden="true">↓</span>
        </button>
      </div>
    </section>
  );
}
