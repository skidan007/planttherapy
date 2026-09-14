import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Search, X } from "lucide-react";
import ProductGrid from "../components/ProductGrid";
import { products } from "../data/products";

const CATEGORIES = ["All", "Ginger", "Oils", "Tea"];
const SORTS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A to Z" },
];

function matchesCategory(product, category) {
  if (category === "All") return true;
  if (category === "Oils") return product.category === "Oil";
  return product.category === category;
}

export default function Shop() {
  const [searchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let list = products.filter(
      (p) =>
        matchesCategory(p, category) &&
        (p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase()))
    );
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "name-asc") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [category, sort, query]);

  return (
    <div className="bg-white">
      <div className="border-b border-line bg-cream">
        <div className="container-page py-14">
          <h1 className="text-4xl text-forest">Shop Our Products</h1>
          <p className="mt-3 max-w-md text-[15px] text-muted">
            Simple botanical products for everyday rituals.
          </p>
        </div>
      </div>

      <div className="container-page py-10">
        {/* Mobile filter button */}
        <div className="mb-6 flex items-center justify-between gap-4 md:hidden">
          <div className="relative flex-1">
            <Search size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
              className="w-full border border-line py-2.5 pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-fresh"
            />
          </div>
          <button
            onClick={() => setFiltersOpen((o) => !o)}
            className="flex shrink-0 items-center gap-2 border border-line px-4 py-2.5 text-sm text-ink"
          >
            <SlidersHorizontal size={15} />
            Filters
          </button>
        </div>

        {filtersOpen && (
          <div className="mb-6 flex flex-col gap-4 border border-line bg-cream p-4 md:hidden">
            <div>
              <p className="mb-2 text-xs text-muted">Category</p>
              <div className="flex flex-wrap gap-2">
                {CATEGORIES.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCategory(c)}
                    className={`border px-3 py-1.5 text-sm ${
                      category === c ? "border-forest bg-forest text-white" : "border-line text-ink"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-2 text-xs text-muted">Sort by</p>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full border border-line bg-white px-3 py-2 text-sm"
              >
                {SORTS.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Desktop filter bar */}
        <div className="mb-8 hidden items-center justify-between gap-6 md:flex">
          <div className="flex items-center gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`border px-4 py-2 text-sm transition-colors ${
                  category === c ? "border-forest bg-forest text-white" : "border-line text-ink hover:border-forest"
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              {query && (
                <button
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted hover:text-ink"
                >
                  <X size={14} />
                </button>
              )}
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products…"
                className="w-full border border-line py-2 pl-9 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-fresh"
              />
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-line bg-white px-3 py-2 text-sm text-ink focus:outline-none focus:ring-1 focus:ring-fresh"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>
        </div>

        <p className="mb-6 text-sm text-muted">
          {filtered.length} {filtered.length === 1 ? "product" : "products"}
        </p>

        <ProductGrid products={filtered} />
      </div>
    </div>
  );
}
