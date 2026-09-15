import { useEffect, useState } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { Check, ChevronRight, Star } from "lucide-react";
import ProductImage from "../components/ProductImage";
import QuantitySelector from "../components/QuantitySelector";
import ProductGrid from "../components/ProductGrid";
import Reveal from "../components/Reveal";
import { getProductBySlug, formatNaira, products } from "../data/products";
import { useCart } from "../context/CartContext";

const TABS = ["Ingredients", "How to Use", "Storage"];

function Intro({ product }) {
  if (product.slug === "ginger-powder") {
    return "ARIKA Ginger Powder is a premium-quality ginger product made from natural ginger and suitable for everyday use. It can be prepared as a drink or used as part of a massage routine.";
  }
  if (product.slug === "ginger-tea") {
    return "ARIKA Ginger Tea is a premium, 100% natural ginger tea crafted for those who want to support their wellbeing the simple, wholesome way. Made from pure dried ginger with no additives or preservatives, every cup delivers the real, warming kick of ginger exactly as nature intended.";
  }
  return product.longDescription;
}

function Preparation({ product }) {
  const usage = product.usage;
  if (!usage) return null;
  const sections = usage.prepare
    ? [{ label: "HOW TO USE", title: "How to use", steps: usage.prepare }]
    : [
        {
          label: "DAILY DRINK",
          title: "A simple ginger drink",
          steps: usage.drink,
        },
        {
          label: "MASSAGE",
          title: "Prepare a warming paste",
          steps: usage.massage,
        },
      ];

  return (
    <section className="border-y border-line bg-cream">
      <div className="container-page py-16 sm:py-20">
        <div className="max-w-xl">
          <span className="text-xs uppercase tracking-[0.2em] text-fresh">
            The daily ritual
          </span>
          <h2 className="mt-3 text-3xl text-forest sm:text-4xl">
            Prepare it your way.
          </h2>
        </div>
        <div
          className={`mt-10 grid gap-5 ${sections.length > 1 ? "md:grid-cols-2" : "max-w-3xl"}`}
        >
          {sections.map((section, index) => (
            <Reveal key={section.label} delay={index * 80}>
              <div className="rounded-[10px] border border-line bg-white p-6 shadow-(--shadow-sm) sm:p-8">
                <span className="text-xs font-medium tracking-[0.18em] text-fresh">
                  {section.label}
                </span>
                <h3 className="mt-3 text-2xl text-forest">{section.title}</h3>
                <ol className="mt-6 space-y-4">
                  {section.steps.map((step, index) => (
                    <li
                      key={step}
                      className="flex gap-4 text-sm leading-relaxed text-muted"
                    >
                      <span className="font-serif text-lg text-fresh">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          ))}
        </div>
        {product.slug === "ginger-powder" && (
          <p className="mt-6 border-l-2 border-primary px-4 text-sm leading-relaxed text-muted">
            Avoid applying to broken or irritated skin. Stop use if irritation
            occurs.
          </p>
        )}
        {product.slug === "ginger-tea" && (
          <p className="mt-6 text-sm italic text-muted">
            Best enjoyed daily as part of a balanced wellness routine.
          </p>
        )}
      </div>
    </section>
  );
}

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = getProductBySlug(slug);
  const { addItem } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState("Ingredients");

  useEffect(() => {
    setActiveImage(0);
  }, [product?.slug]);

  if (!product) return <Navigate to="/shop" replace />;

  const related = products.filter((item) => item.id !== product.id);
  function handleBuyNow() {
    addItem(product, quantity);
    navigate("/cart");
  }

  return (
    <div className="bg-white">
      <div className="sticky top-16 z-40 border-b border-line bg-white/95 backdrop-blur md:top-18">
        <div className="container-page py-4 sm:py-5">
          <nav
            className="flex items-center gap-1.5 text-xs text-muted"
            aria-label="Breadcrumb"
          >
            <Link to="/" className="hover:text-forest">
              Home
            </Link>
            <ChevronRight size={12} />
            <Link to="/shop" className="hover:text-forest">
              Shop
            </Link>
            <ChevronRight size={12} />
            <span className="text-ink">{product.name}</span>
          </nav>
        </div>
      </div>

      <section className="container-page grid grid-cols-1 gap-8 pb-16 md:grid-cols-[1.02fr_0.98fr] md:gap-14 lg:gap-20">
        <div className="flex flex-col gap-3">
          <div className="group/gallery aspect-square overflow-hidden rounded-[10px] border border-line bg-cream shadow-(--shadow-sm)">
            <div
              key={`${product.slug}-${activeImage}`}
              className="gallery-image gallery-zoom h-full w-full"
            >
              <ProductImage
                image={product.images[activeImage]}
                alt={product.name}
                className="h-full w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {product.images.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActiveImage(index)}
                aria-label={`View ${product.name} image ${index + 1}`}
                className={`group/thumb aspect-square overflow-hidden rounded-md border bg-cream shadow-(--shadow-sm) transition-all hover:border-forest ${activeImage === index ? "border-forest ring-1 ring-forest/20" : "border-line"}`}
              >
                <ProductImage image={image} alt="" className="h-full w-full" />
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-center gap-5">
          <div>
            <span className="text-xs uppercase tracking-[0.18em] text-fresh">
              {product.category}
            </span>
            <h1 className="mt-3 text-4xl leading-tight text-forest sm:text-5xl">
              {product.name}
            </h1>
          </div>
          <div
            className="flex items-center gap-2 text-fresh"
            aria-label={`${product.rating} out of 5 stars`}
          >
            <div className="flex gap-0.5">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={15}
                  fill={
                    index < Math.round(product.rating) ? "currentColor" : "none"
                  }
                />
              ))}
            </div>
            <span className="text-sm text-muted">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>
          <p className="text-2xl text-forest">{formatNaira(product.price)}</p>
          <p className="max-w-xl text-[15px] leading-7 text-muted">
            {product.slug === "ginger-powder"
              ? "Pure Wellness in Every Spoon. "
              : product.slug === "ginger-tea"
                ? "Pure Warmth. Natural Wellness. "
                : ""}
            <Intro product={product} />
          </p>
          <p className="text-xs uppercase tracking-[0.15em] text-muted">
            {product.weight}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <QuantitySelector quantity={quantity} onChange={setQuantity} />
            <span className="text-sm text-muted">
              Subtotal:{" "}
              <span className="text-ink">
                {formatNaira(product.price * quantity)}
              </span>
            </span>
          </div>
          <div className="flex flex-col gap-3 pt-1 sm:flex-row">
            <button
              type="button"
              onClick={() => addItem(product, quantity)}
              className="interactive-button flex-1 rounded-md border border-forest px-6 py-3.5 text-sm text-forest hover:bg-forest hover:text-white"
            >
              Add to Cart
            </button>
            <button
              type="button"
              onClick={handleBuyNow}
              className="interactive-button flex-1 rounded-md bg-forest px-6 py-3.5 text-sm text-white hover:bg-primary"
            >
              Buy Now
            </button>
          </div>

          <div className="mt-5 border-t border-line pt-6">
            <h2 className="font-serif text-xl text-forest">Product details</h2>
            <div className="mt-4 flex gap-4 overflow-x-auto border-b border-line sm:gap-6">
              {TABS.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTab(item)}
                  className={`-mb-px whitespace-nowrap border-b-2 pb-3 text-sm ${tab === item ? "border-forest text-forest" : "border-transparent text-muted hover:text-ink"}`}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="pt-5 text-sm leading-relaxed text-muted">
              {tab === "Ingredients" && (
                <ul className="space-y-2">
                  {product.ingredients.map((item) => (
                    <li key={item} className="flex gap-2">
                      <Check size={16} className="mt-0.5 shrink-0 text-fresh" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {tab === "How to Use" && (
                <ul className="list-inside list-disc space-y-2">
                  {product.howToUse.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              )}
              {tab === "Storage" && <p>{product.storage}</p>}
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-[#f4f1e8]">
        <div className="container-page grid gap-12 py-16 sm:py-20 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
          <Reveal>
            <div>
              <span className="text-xs uppercase tracking-[0.2em] text-fresh">
                Why ARIKA
              </span>
              <h2 className="mt-3 text-3xl text-forest sm:text-4xl">
                Made for the everyday healing.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div>
              <p className="leading-7 text-muted">
                {product.slug === "ginger-powder"
                  ? "Ginger has traditionally been used as part of natural wellness routines. ARIKA Ginger Powder fits simply into your daily lifestyle, as a drink or as part of a massage routine."
                  : product.slug === "ginger-tea"
                    ? "Ginger has been cherished for centuries as a natural wellness ingredient. ARIKA Ginger Tea makes it easy to enjoy its warmth daily."
                    : product.longDescription}
              </p>
              <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {product.benefits.map((benefit) => (
                  <div
                    key={benefit}
                    className="flex gap-3 border-t border-forest/20 pt-3 text-sm text-forest"
                  >
                    <Check size={16} className="shrink-0 text-fresh" />
                    {benefit}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-page py-16 sm:py-20">
        <Reveal>
          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-[0.2em] text-fresh">
              Inside the pack
            </span>
            <h2 className="mt-3 text-3xl text-forest sm:text-4xl">
              Simple by design.
            </h2>
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5">
          {product.features.map((feature, index) => (
            <Reveal key={feature} delay={index * 50}>
              <div className="rounded-[10px] border border-line bg-white p-4 shadow-(--shadow-sm) transition-all hover:-translate-y-1 hover:border-fresh hover:shadow-(--shadow-md) sm:p-6">
                <Check size={18} className="text-fresh" />
                <p className="mt-5 text-sm leading-relaxed text-forest">
                  {feature}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Preparation product={product} />

      <section className="border-t border-line bg-white">
        <div className="container-page py-16 sm:py-20">
          <h2 className="text-3xl text-forest">You may also like</h2>
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </div>
      </section>
    </div>
  );
}
