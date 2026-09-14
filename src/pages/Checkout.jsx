import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { formatNaira, products } from "../data/products";
import { useCart } from "../context/CartContext";

const DELIVERY_FEE = 2500;
const NIGERIAN_STATES = [
  "Lagos", "Abuja (FCT)", "Rivers", "Oyo", "Kano", "Enugu", "Ogun", "Delta", "Kaduna", "Other",
];

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  notes: "",
  payment: "delivery",
};

export default function Checkout() {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [placed, setPlaced] = useState(false);

  const lineItems = items
    .map((item) => ({ ...item, product: products.find((p) => p.id === item.id) }))
    .filter((item) => item.product);
  const subtotal = lineItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const total = subtotal + (lineItems.length ? DELIVERY_FEE : 0);

  if (!lineItems.length && !placed) {
    return <Navigate to="/cart" replace />;
  }

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate() {
    const next = {};
    if (!form.fullName.trim()) next.fullName = "Full name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.phone.trim()) next.phone = "Phone number is required.";
    else if (!/^[\d+\s-]{7,}$/.test(form.phone)) next.phone = "Enter a valid phone number.";
    if (!form.address.trim()) next.address = "Delivery address is required.";
    if (!form.city.trim()) next.city = "City is required.";
    if (!form.state) next.state = "Please select a state.";
    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setPlaced(true);
      clearCart();
    }
  }

  if (placed) {
    return (
      <div className="container-page flex flex-col items-center gap-5 py-28 text-center">
        <CheckCircle2 size={40} className="text-fresh" />
        <h1 className="text-2xl text-forest">Order details received.</h1>
        <p className="max-w-sm text-sm leading-relaxed text-muted">
          This is a frontend preview — no payment has been processed. Order
          placement and payment will be connected once the store goes live.
        </p>
        <button
          onClick={() => navigate("/shop")}
          className="mt-2 bg-forest px-7 py-3.5 text-sm text-white transition-colors hover:bg-primary"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container-page py-14">
      <h1 className="text-3xl text-forest sm:text-4xl">Checkout</h1>

      <form onSubmit={handleSubmit} className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="flex flex-col gap-10 lg:col-span-2">
          <fieldset className="flex flex-col gap-4">
            <legend className="mb-1 font-serif text-lg text-forest">Customer Information</legend>
            <Field label="Full Name" error={errors.fullName}>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                className={inputClass(errors.fullName)}
              />
            </Field>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="Email" error={errors.email}>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={inputClass(errors.email)}
                />
              </Field>
              <Field label="Phone Number" error={errors.phone}>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={inputClass(errors.phone)}
                />
              </Field>
            </div>
          </fieldset>

          <fieldset className="flex flex-col gap-4">
            <legend className="mb-1 font-serif text-lg text-forest">Delivery Information</legend>
            <Field label="Address" error={errors.address}>
              <input
                type="text"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                className={inputClass(errors.address)}
              />
            </Field>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field label="City" error={errors.city}>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  className={inputClass(errors.city)}
                />
              </Field>
              <Field label="State" error={errors.state}>
                <select
                  value={form.state}
                  onChange={(e) => update("state", e.target.value)}
                  className={inputClass(errors.state)}
                >
                  <option value="">Select state</option>
                  {NIGERIAN_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="Delivery Notes (optional)">
              <textarea
                rows={3}
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                className={inputClass()}
              />
            </Field>
          </fieldset>

          <fieldset className="flex flex-col gap-3">
            <legend className="mb-1 font-serif text-lg text-forest">Payment Method</legend>
            {[
              { value: "delivery", label: "Pay on Delivery" },
              { value: "transfer", label: "Bank Transfer" },
              { value: "online", label: "Online Payment" },
            ].map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-3 border border-line px-4 py-3 text-sm has-[:checked]:border-forest has-[:checked]:bg-sage"
              >
                <input
                  type="radio"
                  name="payment"
                  value={option.value}
                  checked={form.payment === option.value}
                  onChange={(e) => update("payment", e.target.value)}
                  className="accent-forest"
                />
                {option.label}
              </label>
            ))}
            {form.payment === "online" && (
              <p className="text-xs text-muted">
                Online payment integration is coming soon — you can still place your order using this option as a placeholder.
              </p>
            )}
          </fieldset>
        </div>

        <div className="h-fit border border-line bg-cream p-6">
          <h2 className="font-serif text-lg text-forest">Order Summary</h2>
          <div className="mt-4 flex flex-col gap-2.5 text-sm text-muted">
            {lineItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span className="text-ink">
                  {item.product.name} × {item.quantity}
                </span>
                <span>{formatNaira(item.product.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2 border-t border-line pt-4 text-sm">
            <div className="flex justify-between text-muted">
              <span>Subtotal</span>
              <span className="text-ink">{formatNaira(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Delivery</span>
              <span className="text-ink">{formatNaira(DELIVERY_FEE)}</span>
            </div>
            <div className="mt-1 flex justify-between border-t border-line pt-3 text-base font-medium text-forest">
              <span>Total</span>
              <span>{formatNaira(total)}</span>
            </div>
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-forest px-6 py-3.5 text-sm text-white transition-colors hover:bg-primary"
          >
            Place Order
          </button>
          <p className="mt-3 text-center text-xs text-muted">
            No payment will be charged in this preview.
          </p>
        </div>
      </form>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-ink">{label}</span>
      {children}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}

function inputClass(error) {
  return `border bg-white px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-1 focus:ring-fresh ${
    error ? "border-red-400" : "border-line"
  }`;
}
