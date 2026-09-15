import { useEffect } from "react";
import { X, Leaf, Search, UserRound, ShoppingBag } from "lucide-react";
import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function MobileMenu({ open, onClose, itemCount = 0 }) {
  useEffect(() => {
    if (!open) return undefined;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function handleKeyDown(event) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-90 md:hidden">
      <button
        aria-label="Close menu"
        className="absolute inset-0 bg-ink/40"
        onClick={onClose}
      />
      <div role="dialog" aria-modal="true" aria-label="Mobile navigation" className="animate-drawer absolute right-0 top-0 flex h-full w-[88%] max-w-sm flex-col border-l border-line bg-cream shadow-[var(--shadow-lg)]">
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <div className="flex items-center gap-2">
            <Leaf size={18} className="text-fresh" />
            <span className="font-serif text-lg text-forest">ARIKA Ginger</span>
          </div>
          <button
            aria-label="Close menu"
            onClick={onClose}
            className="p-1 text-ink hover:text-fresh"
          >
            <X size={22} />
          </button>
        </div>
        <nav className="flex flex-col px-6 py-4">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              onClick={onClose}
              className={({ isActive }) =>
                `border-b border-line py-4 text-base ${
                  isActive ? "text-forest font-medium" : "text-ink"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="grid grid-cols-3 gap-2 border-t border-line px-6 py-5">
          <NavLink to="/shop" onClick={onClose} className="flex flex-col items-center gap-2 py-2 text-xs text-forest">
            <Search size={18} /> Search
          </NavLink>
          <span className="flex flex-col items-center gap-2 py-2 text-xs text-forest">
            <UserRound size={18} /> Account
          </span>
          <NavLink to="/cart" onClick={onClose} className="relative flex flex-col items-center gap-2 py-2 text-xs text-forest">
            <ShoppingBag size={18} /> Cart
            {itemCount > 0 && <span className="absolute right-5 top-0 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] text-white">{itemCount}</span>}
          </NavLink>
        </div>
        <div className="mt-auto px-6 py-6">
          <NavLink
            to="/shop"
            onClick={onClose}
            className="block w-full bg-forest px-5 py-3 text-center text-sm text-white"
          >
            Shop Now
          </NavLink>
        </div>
      </div>
    </div>
  );
}
