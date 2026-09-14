import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({ quantity, onChange, size = "md" }) {
  const dims = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  return (
    <div className="inline-flex items-center border border-line">
      <button
        type="button"
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(1, quantity - 1))}
        className={`flex ${dims} items-center justify-center text-ink transition-colors hover:bg-sage disabled:opacity-40`}
        disabled={quantity <= 1}
      >
        <Minus size={14} />
      </button>
      <span className="w-9 text-center text-sm font-medium text-ink" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        onClick={() => onChange(quantity + 1)}
        className={`flex ${dims} items-center justify-center text-ink transition-colors hover:bg-sage`}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
