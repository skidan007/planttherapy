import { Link } from "react-router-dom";
import ProductImage from "./ProductImage";

export default function Hero() {
  return (
    <section className="bg-cream">
      <div className="container-page grid grid-cols-1 items-center gap-12 py-14 md:grid-cols-2 md:py-20">
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center bg-sage px-3 py-1 text-xs text-forest">
            Natural wellness, made with care
          </span>
          <h1 className="text-4xl leading-[1.15] text-forest sm:text-5xl lg:text-[3.4rem]">
            Simple ingredients.
            <br />
            Rooted in wellness.
          </h1>
          <p className="max-w-md text-[15px] leading-relaxed text-muted">
            Thoughtfully prepared ginger and botanical products for everyday
            wellness, made for the way you live.
          </p>
          <div className="mt-2 flex flex-wrap gap-4">
            <Link
              to="/shop"
              className="bg-forest px-7 py-3.5 text-sm text-white transition-colors hover:bg-primary"
            >
              Shop Products
            </Link>
            <Link
              to="/about"
              className="border border-forest px-7 py-3.5 text-sm text-forest transition-colors hover:bg-sage"
            >
              Learn Our Story
            </Link>
          </div>
        </div>

        <div className="relative mx-auto grid w-full max-w-md grid-cols-2 gap-4">
          <div className="col-span-2 aspect-4/3 border border-line bg-white">
            <ProductImage image="ginger-powder" className="h-full w-full" />
          </div>
          <div className="aspect-square border border-line bg-white">
            <ProductImage image="ginger-tea" className="h-full w-full" />
          </div>
          <div className="aspect-square border border-line bg-white">
            <ProductImage image="ginger-tea2" className="h-full w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
