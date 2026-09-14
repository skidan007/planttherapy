import { Leaf, PackageCheck, Sun, ShieldCheck } from "lucide-react";

const ITEMS = [
  { icon: Leaf, label: "Natural Ingredients" },
  { icon: PackageCheck, label: "Carefully Prepared" },
  { icon: Sun, label: "Made for Everyday Wellness" },
  { icon: ShieldCheck, label: "Secure Checkout" },
];

export default function TrustSection() {
  return (
    <div className="border-y border-line bg-cream">
      <div className="container-page grid grid-cols-2 gap-6 py-8 sm:grid-cols-4 sm:gap-4">
        {ITEMS.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3">
            <Icon size={18} className="shrink-0 text-fresh" />
            <span className="text-sm text-ink">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
