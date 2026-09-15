import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import ProductImage from "./ProductImage";
import { formatNaira } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <div className="product-card group flex flex-col rounded-[10px] border border-line bg-white shadow-[var(--shadow-sm)]">
      <Link to={`/shop/${product.slug}`} className="relative block aspect-[4/5] overflow-hidden border-b border-line bg-cream sm:aspect-square">
        <div className="product-card-image h-full w-full">
          <ProductImage image={product.image} alt={product.name} className="h-full w-full" />
        </div>
        <button
          type="button"
          aria-label={`Add ${product.name} to cart`}
          onClick={(e) => {
            e.preventDefault();
            addItem(product);
          }}
          className="interactive-button absolute bottom-3 right-3 flex h-10 w-10 translate-y-1 items-center justify-center rounded-md bg-forest text-white opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Plus size={18} />
        </button>
      </Link>
      <div className="flex flex-1 flex-col gap-1.5 p-3 sm:p-5">
        <span className="text-[11px] tracking-wide text-muted">{product.category}</span>
        <Link to={`/shop/${product.slug}`}>
          <h3 className="font-serif text-base text-ink sm:text-lg">{product.name}</h3>
        </Link>
        <p className="line-clamp-2 text-xs leading-relaxed text-muted sm:text-sm">{product.description}</p>
        <div className="mt-2 flex items-center justify-between gap-2 sm:mt-3">
          <span className="text-sm font-medium text-forest sm:text-base">{formatNaira(product.price)}</span>
          <Link to={`/shop/${product.slug}`} className="group/view text-sm text-fresh transition-colors hover:text-forest">
            View <span className="inline-block transition-transform group-hover/view:translate-x-1">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
