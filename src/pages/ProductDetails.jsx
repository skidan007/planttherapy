import { useState } from "react";
import { useParams, Link, Navigate, useNavigate } from "react-router-dom";
import { Star, ChevronRight } from "lucide-react";
import ProductImage from "../components/ProductImage";
import QuantitySelector from "../components/QuantitySelector";
import ProductGrid from "../components/ProductGrid";
import { getProductBySlug, formatNaira, products } from "../data/products";
import { useCart } from "../context/CartContext";

const TABS = ["Ingredients", "How to Use", "Storage"];

export default function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const product = getProductBySlug(slug);
  const { addItem } = useCart();

  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [tab, setTab] = useState("Ingredients");

  if (!product) return <Navigate to="/shop" replace />;

  const related = products.filter((p) => p.id !== product.id);

  function handleBuyNow() {
    addItem(product, quantity);
    navigate("/cart");
  }

  return (
    <div className="bg-white">
      <div className="container-page py-6">
        <nav className="flex items-center gap-1.5 text-xs text-muted">
          <Link to="/" className="hover:text-forest">Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-forest">Shop</Link>
          <ChevronRight size={12} />
          <span className="text-ink">{product.name}</span>
        </nav>
      </div>

      <div className="container-page grid grid-cols-1 gap-12 pb-16 md:grid-cols-2">
        {/* Gallery */}
        <div className="flex flex-col gap-3">
          <div className="aspect-square border border-line bg-cream">
            <ProductImage image={product.images[activeImage]} className="h-full w-full" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {product.images.map((img, i) => (
              <button
                key={img + i}
                onClick={() => setActiveImage(i)}
                aria-label={`View image ${i + 1}`}
                className={`aspect-square border bg-cream ${
                  activeImage === i ? "border-forest" : "border-line"
                }`}
              >
                <ProductImage image={img} className="h-full w-full" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-5">
          <div>
            <span className="text-xs tracking-wide text-muted">{product.category}</span>
            <h1 className="mt-1 text-3xl text-forest sm:text-4xl">{product.name}</h1>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5 text-fresh">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={15}
                  fill={i < Math.round(product.rating) ? "currentColor" : "none"}
                  strokeWidth={1.5}
                />
              ))}
            </div>
            <span className="text-sm text-muted">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          <p className="text-2xl font-medium text-forest">{formatNaira(product.price)}</p>

          <p className="text-[15px] leading-relaxed text-muted">{product.longDescription}</p>

          <div className="flex items-center gap-4 pt-2">
            <QuantitySelector quantity={quantity} onChange={setQuantity} />
            <span className="text-sm text-muted">
              Subtotal: <span className="text-ink">{formatNaira(product.price * quantity)}</span>
            </span>
          </div>

          <div className="flex flex-col gap-3 pt-1 sm:flex-row">
            <button
              onClick={() => addItem(product, quantity)}
              className="flex-1 border border-forest px-6 py-3.5 text-sm text-forest transition-colors hover:bg-sage"
            >
              Add to Cart
            </button>
            <button
              onClick={handleBuyNow}
              className="flex-1 bg-forest px-6 py-3.5 text-sm text-white transition-colors hover:bg-primary"
            >
              Buy Now
            </button>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-6 border-t border-line pt-6">
            <h2 className="font-serif text-lg text-forest">Product Details</h2>
            <div className="mt-4 flex gap-6 border-b border-line">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`-mb-px border-b-2 pb-3 text-sm transition-colors ${
                    tab === t ? "border-forest text-forest" : "border-transparent text-muted hover:text-ink"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
            <div className="pt-5 text-sm leading-relaxed text-muted">
              {tab === "Ingredients" && (
                <ul className="list-inside list-disc space-y-1.5">
                  {product.ingredients.map((ing) => <li key={ing}>{ing}</li>)}
                </ul>
              )}
              {tab === "How to Use" && (
                <ul className="list-inside list-disc space-y-1.5">
                  {product.howToUse.map((step) => <li key={step}>{step}</li>)}
                </ul>
              )}
              {tab === "Storage" && <p>{product.storage}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-line bg-cream">
        <div className="container-page py-16">
          <h2 className="text-2xl text-forest">You may also like</h2>
          <div className="mt-8">
            <ProductGrid products={related} />
          </div>
        </div>
      </div>
    </div>
  );
}
