import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { products } from "../data/products";
import ProductImage from "./ProductImage";

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStart = useRef(null);
  const product = products[active];

  useEffect(() => {
    if (paused) return undefined;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % products.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [paused]);

  function move(direction) {
    setActive((current) => (current + direction + products.length) % products.length);
  }

  function handleTouchStart(event) {
    touchStart.current = event.touches[0].clientX;
  }

  function handleTouchEnd(event) {
    if (touchStart.current === null) return;
    const distance = event.changedTouches[0].clientX - touchStart.current;
    if (Math.abs(distance) > 45) move(distance > 0 ? -1 : 1);
    touchStart.current = null;
  }

  return (
    <section
      className="overflow-hidden bg-cream"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      aria-roledescription="carousel"
      aria-label="Featured products"
    >
      <div className="container-page py-6 sm:py-10">
        <div className="relative grid min-h-[520px] grid-cols-1 overflow-hidden border border-line bg-white md:min-h-[560px] md:grid-cols-[1.05fr_0.95fr]">
          <div className="relative flex items-center justify-center bg-[#f2eee4] p-8 sm:p-12 md:p-16">
            <div key={product.slug} className="h-full w-full animate-fade-in">
              <ProductImage image={product.image} alt={product.name} className="h-full min-h-[300px] w-full md:min-h-[440px]" />
            </div>
            <span className="absolute bottom-5 left-5 text-[10px] tracking-[0.28em] text-forest/60 sm:bottom-8 sm:left-8">
              ARIKA / {String(active + 1).padStart(2, "0")}
            </span>
          </div>

          <div className="flex flex-col justify-center bg-forest px-7 py-10 text-cream sm:px-12 sm:py-14 md:px-14">
            <span className="text-xs uppercase tracking-[0.22em] text-fresh">{product.eyebrow}</span>
            <h1 className="mt-5 max-w-lg text-4xl leading-[1.04] sm:text-5xl lg:text-6xl">{product.heroTitle}</h1>
            <p className="mt-6 max-w-md text-sm leading-7 text-cream/75 sm:text-base">{product.heroDescription}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to={`/shop/${product.slug}`} className="interactive-button rounded-md bg-cream px-5 py-3 text-sm text-forest">Shop {product.name}</Link>
              <Link to="/about" className="interactive-button rounded-md border border-cream/40 px-5 py-3 text-sm text-cream hover:border-cream hover:bg-primary">Our story</Link>
            </div>
            <div className="mt-12 flex items-center gap-4">
              <button type="button" onClick={() => move(-1)} aria-label="Previous featured product" className="interactive-button flex h-10 w-10 items-center justify-center rounded-md border border-cream/30 hover:border-cream hover:bg-primary"><ArrowLeft size={17} /></button>
              <button type="button" onClick={() => move(1)} aria-label="Next featured product" className="interactive-button flex h-10 w-10 items-center justify-center rounded-md border border-cream/30 hover:border-cream hover:bg-primary"><ArrowRight size={17} /></button>
              <div className="ml-2 flex gap-2" role="tablist" aria-label="Featured products">
                {products.map((item, index) => (
                  <button key={item.slug} type="button" role="tab" aria-selected={active === index} aria-label={`Show ${item.name}`} onClick={() => setActive(index)} className={`h-1.5 transition-all ${active === index ? "w-8 bg-cream" : "w-3 bg-cream/35"}`} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
