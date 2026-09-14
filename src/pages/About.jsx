import SectionHeading from "../components/SectionHeading";
import ProductImage from "../components/ProductImage";

const VALUES = [
  { title: "Simplicity", text: "Fewer, better ingredients. Nothing added just to fill a label." },
  { title: "Quality", text: "Careful sourcing and preparation, batch by batch." },
  { title: "Consistency", text: "The same experience, every time you reach for it." },
  { title: "Care", text: "Considered packaging and a process we're not in a hurry to rush." },
];

export default function About() {
  return (
    <div className="bg-white">
      <div className="border-b border-line bg-cream">
        <div className="container-page py-16">
          <h1 className="max-w-xl text-4xl text-forest sm:text-5xl">
            Rooted in simple wellness.
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted">
            Root &amp; Ritual makes carefully prepared botanical products for
            everyday routines — nothing more complicated than that.
          </p>
        </div>
      </div>

      <section className="container-page grid grid-cols-1 items-center gap-12 py-20 md:grid-cols-2">
        <div className="aspect-[4/5] border border-line bg-cream">
          <ProductImage image="ginger-tea" className="h-full w-full" />
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-xs tracking-wide text-fresh">Our Story</span>
          <h2 className="text-3xl text-forest">Started with a simple question.</h2>
          <p className="text-[15px] leading-relaxed text-muted">
            Root &amp; Ritual began with a simple question: why does everyday
            wellness so often feel complicated? We wanted to make a small
            set of products — ginger and botanicals — prepared well and
            packaged honestly, that could sit comfortably in an ordinary
            routine rather than demand a new one.
          </p>
          <p className="text-[15px] leading-relaxed text-muted">
            We work in small batches, from ingredient sourcing to the final
            pouch or bottle, so quality stays consistent from the first
            order to the hundredth.
          </p>
        </div>
      </section>

      <section className="border-y border-line bg-cream">
        <div className="container-page grid grid-cols-1 items-center gap-12 py-20 md:grid-cols-2">
          <div className="order-2 flex flex-col gap-4 md:order-1">
            <span className="text-xs tracking-wide text-fresh">Our Philosophy</span>
            <h2 className="text-3xl text-forest">Wellness as a routine, not an event.</h2>
            <p className="text-[15px] leading-relaxed text-muted">
              We don't believe in dramatic transformations sold in a bottle.
              We believe in small, repeatable choices — a cup of tea, a
              spoon of powder, a few drops of oil — that quietly add up over
              time.
            </p>
          </div>
          <div className="order-1 aspect-[4/5] border border-line bg-white md:order-2">
            <ProductImage image="aritha-oil" className="h-full w-full" />
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <SectionHeading heading="What we value" align="center" />
        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2">
          {VALUES.map((v) => (
            <div key={v.title} className="border border-line p-6">
              <h3 className="font-serif text-lg text-forest">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.text}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
