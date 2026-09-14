import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Leaf, Search, ShoppingBag, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import MobileMenu from "./MobileMenu";

const LINKS = [
  { to: "/", label: "Home" },
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const { itemCount } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
      setSearchOpen(false);
      setQuery("");
    }
  }

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow ${
        scrolled ? "border-line shadow-[0_1px_0_rgba(18,60,42,0.05)]" : "border-transparent"
      }`}
    >
      <div className="container-page flex h-16 items-center justify-between md:h-[72px]">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center bg-forest">
            <Leaf size={16} className="text-cream" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg text-forest">Arika Ginger</span>
            <span className="hidden text-[10px] tracking-wide text-muted sm:block">
              Natural Treatments
            </span>
          </span>
        </NavLink>

        <nav className="hidden items-center gap-9 md:flex">
          {LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `text-sm transition-colors hover:text-forest ${
                  isActive ? "text-forest font-medium" : "text-ink"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            aria-label="Search"
            onClick={() => setSearchOpen((s) => !s)}
            className="hidden p-2 text-ink hover:text-fresh md:inline-flex"
          >
            <Search size={19} />
          </button>
          <NavLink
            to="/cart"
            aria-label="View cart"
            className="relative inline-flex p-2 text-ink hover:text-fresh"
          >
            <ShoppingBag size={19} />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-white">
                {itemCount}
              </span>
            )}
          </NavLink>
          <NavLink
            to="/shop"
            className="ml-3 hidden bg-forest px-5 py-2.5 text-sm text-white transition-colors hover:bg-primary md:inline-block"
          >
            Shop Now
          </NavLink>
          <button
            aria-label="Open menu"
            onClick={() => setMobileOpen(true)}
            className="p-2 text-ink md:hidden"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="hidden border-t border-line bg-cream md:block">
          <form onSubmit={handleSearchSubmit} className="container-page flex items-center gap-3 py-3">
            <Search size={16} className="text-muted" />
            <input
              autoFocus
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
              className="p-1 text-muted hover:text-ink"
            >
              <X size={16} />
            </button>
          </form>
        </div>
      )}

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}
