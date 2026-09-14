import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-forest text-cream">
      <div className="container-page grid grid-cols-2 gap-10 py-14 md:grid-cols-5">
        <div className="col-span-2">
          <div className="flex items-center gap-2">
            <Leaf size={18} className="text-fresh" />
            <span className="font-serif text-xl">Root &amp; Ritual</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/70">
            Natural wellness, thoughtfully made.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-cream">Shop</h3>
          <ul className="mt-4 space-y-3 text-sm text-cream/70">
            <li><Link to="/shop/ginger-powder" className="hover:text-white">Ginger Powder</Link></li>
            <li><Link to="/shop/ginger-tea" className="hover:text-white">Ginger Tea</Link></li>
            <li><Link to="/shop/aritha-oil" className="hover:text-white">Aritha Oil</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium text-cream">Company</h3>
          <ul className="mt-4 space-y-3 text-sm text-cream/70">
            <li><Link to="/about" className="hover:text-white">About</Link></li>
            <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link to="/contact" className="hover:text-white">FAQs</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium text-cream">Help</h3>
          <ul className="mt-4 space-y-3 text-sm text-cream/70">
            <li><Link to="/contact" className="hover:text-white">Shipping</Link></li>
            <li><Link to="/contact" className="hover:text-white">Returns</Link></li>
            <li><Link to="/contact" className="hover:text-white">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-page flex flex-col items-start justify-between gap-4 py-6 text-xs text-cream/60 sm:flex-row sm:items-center">
          <p>© 2026 Root &amp; Ritual. All rights reserved. Natural wellness, thoughtfully made.</p>
          <div className="flex items-center gap-4 text-[13px] font-medium">
            <a href="#" className="hover:text-white">Instagram</a>
            <a href="#" className="hover:text-white">Facebook</a>
            <a href="#" className="hover:text-white">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
