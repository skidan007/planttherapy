import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import ProductImage from "./ProductImage";
import { formatNaira } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addItem } = useCart();

  return (
    <div className="group flex flex-col border border-line bg-white">
      <Link to={`/shop/${product.slug}`} className="relative block aspect-square overflow-hidden border-b border-line">
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-[1.04]">
          <ProductImage image={product.image} className="h-full w-full" />
        </div>
        <button
          type="button"
          aria-label={`Add ${product.name} to cart`}
          onClick={(e) => {
            e.preventDefault();
            addItem(product);
          }}
          className="absolute bottom-3 right-3 flex h-10 w-10 translate-y-1 items-center justify-center bg-forest text-white opacity-0 transition-all duration-200 group-hover:translate-y-0 group-hover:opacity-100"
        >
          <Plus size={18} />
        </button>
      </Link>
      <div className="flex flex-1 flex-col gap-1.5 p-5">
        <span className="text-[11px] tracking-wide text-muted">{product.category}</span>
        <Link to={`/shop/${product.slug}`}>
          <h3 className="font-serif text-lg text-ink">{product.name}</h3>
        </Link>
        <p className="text-sm leading-relaxed text-muted">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-base font-medium text-forest">{formatNaira(product.price)}</span>
          <Link to={`/shop/${product.slug}`} className="text-sm text-fresh hover:text-forest">
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
