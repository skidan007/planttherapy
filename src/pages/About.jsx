import SectionHeading from "../components/SectionHeading";
import ProductImage from "../components/ProductImage";
import gingerTea from "../assets/images/gingerTea.png";
import arikaOil from "../assets/images/arikaOil.png";

const VALUES = [
  {
    title: "Simplicity",
    text: "Fewer, better ingredients. Nothing added just to fill a label.",
  },
  {
    title: "Quality",
    text: "Careful sourcing and preparation, batch by batch.",
  },
  {
    title: "Consistency",
    text: "The same experience, every time you reach for it.",
  },
  {
    title: "Care",
    text: "Considered packaging and a process we're not in a hurry to rush.",
  },
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
            Experience the warmth of nature with our thoughtfully crafted products, designed to support your self healing power.
          </p>
        </div>
      </div>

      <section className="container-page grid grid-cols-1 items-center gap-12 py-20 md:grid-cols-2">
        <div className="aspect-4/5 border border-line bg-cream">
          <ProductImage
            image={gingerTea}
            alt="Ginger Tea"
            className="h-full w-full"
          />
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-xs tracking-wide text-fresh">Our Story</span>
          <h2 className="text-3xl text-forest">
            Started with a simple question.
          </h2>
          <p className="text-[15px] leading-relaxed text-muted">
            We believe wellness begins with restoring balance in
            the body. Our approach is rooted in the traditional belief that
            discomfort can be associated with blockages and an imbalance of the
            body’s natural warmth and energy. Our practice combines
            <strong>therapeutic massage</strong> with carefully applied internal
            and external sources of warmth, with the goal of helping the body
            relax, improve circulation, and support its natural healing
            processes. At Arika Ginger, we are committed to a simple philosophy:{" "}
            <strong>
              listen to the body, care for it consistently, and support wellness
              through natural, thoughtful routines.
            </strong>
          </p>
          <p className="text-[15px] leading-relaxed text-muted">
            All diseases and illnesses are treated from the root cause and not
            just the symptoms. We believe in a holistic approach to wellness,
            focusing on the mind, body, and spirit. Our products are designed to
            support this philosophy, providing natural solutions that promote
            overall health and well-being.
          </p>
        </div>
      </section>

      <section className="border-y border-line bg-cream">
        <div className="container-page grid grid-cols-1 items-center gap-12 py-20 md:grid-cols-2">
          <div className="order-2 flex flex-col gap-4 md:order-1">
            <span className="text-xs tracking-wide text-fresh">
              Our Philosophy
            </span>
            <h2 className="text-3xl text-forest">
              Wellness as a routine, not an event.
            </h2>
            <p className="text-[15px] leading-relaxed text-muted">
              We don't believe in dramatic transformations sold in a bottle. We
              believe in small, repeatable choices — a cup of tea, a spoon of
              powder, a few drops of oil — that quietly add up over time.
            </p>
          </div>
          <div className="order-1 aspect-4/5 border border-line bg-white md:order-2">
            <ProductImage
              image={arikaOil}
              alt="Arika Oil"
              className="h-full w-full"
            />
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <SectionHeading heading="What we value" align="center" />
        <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-8 sm:grid-cols-2">
          {VALUES.map((v) => (
            <div key={v.title} className="border border-line p-6">
              <h3 className="font-serif text-lg text-forest">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {v.text}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
