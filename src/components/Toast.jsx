import { Check } from "lucide-react";
import { useCart } from "../context/CartContext";

export default function Toast() {
  const { toast } = useCart();
  if (!toast) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2 animate-toast"
    >
      <div className="flex items-center gap-2.5 border border-forest bg-forest px-5 py-3 text-sm text-cream shadow-sm">
        <Check size={16} className="shrink-0 text-fresh" />
        <span>{toast}</span>
      </div>
    </div>
  );
}
