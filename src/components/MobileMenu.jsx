import { X, Leaf } from "lucide-react";
import { NavLink } from "react-router-dom";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function MobileMenu({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90] md:hidden">
      <button
        aria-label="Close menu"
        className="absolute inset-0 bg-ink/40"
        onClick={onClose}
      />
      <div className="animate-drawer absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <div className="flex items-center gap-2">
            <Leaf size={18} className="text-fresh" />
            <span className="font-serif text-lg text-forest">Root &amp; Ritual</span>
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
