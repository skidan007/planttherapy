import { Link } from "react-router-dom";
import { X } from "lucide-react";
import ProductImage from "./ProductImage";
import QuantitySelector from "./QuantitySelector";
import { formatNaira } from "../data/products";
import { useCart } from "../context/CartContext";

export default function CartItem({ product, quantity }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 border-b border-line py-6 first:pt-0 last:border-b-0">
      <Link to={`/shop/${product.slug}`} className="h-24 w-24 shrink-0 border border-line sm:h-28 sm:w-28">
        <ProductImage image={product.image} className="h-full w-full" />
      </Link>

      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link to={`/shop/${product.slug}`}>
              <h3 className="font-serif text-base text-ink sm:text-lg">{product.name}</h3>
            </Link>
            <p className="mt-1 text-sm text-muted">{formatNaira(product.price)} each</p>
          </div>
          <button
            aria-label={`Remove ${product.name} from cart`}
            onClick={() => removeItem(product.id)}
            className="p-1 text-muted hover:text-ink"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <QuantitySelector
            quantity={quantity}
            onChange={(q) => updateQuantity(product.id, q)}
            size="sm"
          />
          <span className="text-sm font-medium text-forest">
            {formatNaira(product.price * quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}
