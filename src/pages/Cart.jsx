import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import CartItem from "../components/CartItem";
import { formatNaira, products } from "../data/products";
import { useCart } from "../context/CartContext";

const DELIVERY_FEE = 2500;

export default function Cart() {
  const { items } = useCart();

  const lineItems = items
    .map((item) => ({ ...item, product: products.find((p) => p.id === item.id) }))
    .filter((item) => item.product);

  const subtotal = lineItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const delivery = lineItems.length ? DELIVERY_FEE : 0;
  const total = subtotal + delivery;

  if (!lineItems.length) {
    return (
      <div className="container-page flex flex-col items-center gap-5 py-28 text-center">
        <ShoppingBag size={36} className="text-muted" />
        <h1 className="text-2xl text-forest">Your cart is waiting.</h1>
        <Link
          to="/shop"
          className="mt-2 bg-forest px-7 py-3.5 text-sm text-white transition-colors hover:bg-primary"
        >
          Explore Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container-page py-14">
      <h1 className="text-3xl text-forest sm:text-4xl">Your Cart</h1>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {lineItems.map((item) => (
            <CartItem key={item.id} product={item.product} quantity={item.quantity} />
          ))}
        </div>

        <div className="h-fit border border-line bg-cream p-6">
          <h2 className="font-serif text-lg text-forest">Order Summary</h2>
          <div className="mt-5 flex flex-col gap-3 text-sm">
            <div className="flex justify-between text-muted">
              <span>Subtotal</span>
              <span className="text-ink">{formatNaira(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Delivery</span>
              <span className="text-ink">{formatNaira(delivery)}</span>
            </div>
            <div className="mt-2 flex justify-between border-t border-line pt-3 text-base font-medium text-forest">
              <span>Total</span>
              <span>{formatNaira(total)}</span>
            </div>
          </div>
          <Link
            to="/checkout"
            className="mt-6 block w-full bg-forest px-6 py-3.5 text-center text-sm text-white transition-colors hover:bg-primary"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
}
