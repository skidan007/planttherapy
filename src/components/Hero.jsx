import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { products } from "../data/products";

const SWIPE_THRESHOLD = 50;

export default function Hero() {
  const slideCount = products.length;
  const [active, setActive] = useState(0);
  const [trackIndex, setTrackIndex] = useState(slideCount > 1 ? 1 : 0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [slideMetrics, setSlideMetrics] = useState({ width: 0, gap: 0, offset: 0 });
  const carouselRef = useRef(null);
  const pointerStart = useRef(null);
  const resetFrame = useRef(null);

  const slides = slideCount > 1
    ? [products[slideCount - 1], ...products, products[0]]
    : products;

  useEffect(() => {
    if (isPaused || slideCount < 2) return undefined;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % slideCount);
      setTrackIndex((current) => current + 1);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [active, isPaused, slideCount]);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return undefined;

    function updateSlideMetrics() {
      const isMobile = window.matchMedia("(max-width: 767px)").matches;
      const slide = carousel.querySelector(".hero-carousel-slide");
      const track = carousel.querySelector(".hero-carousel-track");
      const slideWidth = slide?.getBoundingClientRect().width ?? carousel.clientWidth;
      const gap = Number.parseFloat(window.getComputedStyle(track).gap) || 0;
      setSlideMetrics({
        width: slideWidth,
        gap: isMobile ? gap : 0,
        offset: isMobile ? (carousel.clientWidth - slideWidth) / 2 : 0,
      });
    }

    updateSlideMetrics();
    const observer = new ResizeObserver(updateSlideMetrics);
    observer.observe(carousel);
    window.addEventListener("resize", updateSlideMetrics);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateSlideMetrics);
    };
  }, []);

  useEffect(() => () => window.cancelAnimationFrame(resetFrame.current), []);

  function goTo(index) {
    if (slideCount < 2) return;
    setActive(index);
    setTrackIndex(index + 1);
  }

  function move(direction) {
    if (slideCount < 2) return;
    const next = (active + direction + slideCount) % slideCount;
    setActive(next);
    setTrackIndex((current) => current + direction);
  }

  function handleTransitionEnd() {
    if (slideCount < 2 || (trackIndex !== 0 && trackIndex !== slideCount + 1)) return;
    const realIndex = trackIndex === 0 ? slideCount : 1;
    setTransitionEnabled(false);
    setTrackIndex(realIndex);
    resetFrame.current = window.requestAnimationFrame(() => {
      resetFrame.current = window.requestAnimationFrame(() => setTransitionEnabled(true));
    });
  }

  function handlePointerDown(event) {
    if (event.target.closest("button, a")) return;
    pointerStart.current = event.clientX;
    setIsDragging(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }

  function handlePointerUp(event) {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    if (Math.abs(distance) >= SWIPE_THRESHOLD) move(distance < 0 ? 1 : -1);
    pointerStart.current = null;
    setIsDragging(false);
  }

  function handlePointerCancel() {
    pointerStart.current = null;
    setIsDragging(false);
  }

  return (
    <section className="hero-carousel-section" aria-roledescription="carousel" aria-label="Featured products">
      <div
        ref={carouselRef}
        className={`hero-carousel ${isDragging ? "hero-carousel-dragging" : ""}`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerCancel}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft") move(-1);
          if (event.key === "ArrowRight") move(1);
        }}
        tabIndex={0}
      >
        <div
          className="hero-carousel-track"
          style={{
            transform: `translate3d(${slideMetrics.offset - (trackIndex * (slideMetrics.width + slideMetrics.gap))}px, 0, 0)`,
            transition: transitionEnabled ? undefined : "none",
            visibility: slideMetrics.width ? "visible" : "hidden",
          }}
          onTransitionEnd={handleTransitionEnd}
        >
          {slides.map((product, index) => {
            const realIndex = ((index - 1) + slideCount) % slideCount;
            const isCurrent = realIndex === active && (slideCount === 1 || index === trackIndex);
            return (
              <article className="hero-carousel-slide" key={`${product.slug}-${index}`} aria-hidden={!isCurrent}>
                <img src={product.image} alt="" className="hero-carousel-image" draggable="false" loading={isCurrent ? "eager" : "lazy"} />
                <div className="hero-carousel-shade" />
                <div className="hero-carousel-content">
                  <span className="text-xs uppercase tracking-[0.22em] text-fresh">{product.eyebrow}</span>
                  <h1 className="mt-3 max-w-xl text-3xl leading-[1.05] text-cream sm:text-5xl lg:text-6xl">{product.heroTitle}</h1>
                  <p className="mt-4 max-w-md text-sm leading-6 text-cream/80 sm:text-base sm:leading-7">{product.heroDescription}</p>
                  <Link to={`/shop/${product.slug}`} className="interactive-button mt-6 inline-flex rounded-md bg-cream px-5 py-3 text-sm text-forest hover:bg-white">Shop {product.name}</Link>
                </div>
              </article>
            );
          })}
        </div>

        {slideCount > 1 && (
          <div className="hero-carousel-pagination" role="tablist" aria-label="Featured product slides">
            {products.map((product, index) => (
              <button key={product.slug} type="button" role="tab" aria-selected={active === index} aria-label={`Show ${product.name}`} className={`hero-carousel-dot ${active === index ? "hero-carousel-dot-active" : ""}`} onClick={(event) => { event.stopPropagation(); goTo(index); }} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
