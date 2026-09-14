import { Link } from "react-router-dom";
import { useState } from "react";
import Hero from "../components/Hero";
import TrustSection from "../components/TrustSection";
import SectionHeading from "../components/SectionHeading";
import ProductGrid from "../components/ProductGrid";
import TestimonialCard from "../components/TestimonialCard";
import ProductImage from "../components/ProductImage";
import { products } from "../data/products";

const RITUAL_STEPS = [
  { number: "01", title: "Choose your ritual", text: "Pick the product that fits where you are in your routine today." },
  { number: "02", title: "Prepare it your way", text: "Stir, steep, or apply — however it fits naturally into your day." },
  { number: "03", title: "Make it consistent", text: "Small, repeated moments are what make a ritual stick." },
];

const TESTIMONIALS = [
  { quote: "Love how simple the ginger tea is to prepare. It's become part of my morning routine.", name: "Amaka O." },
  { quote: "Packaging feels premium and the product quality has been great so far.", name: "Tobi A." },
  { quote: "The ginger powder has become a staple in my kitchen.", name: "Favour E." },
];

export default function Home() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e) {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  }

  return (
    <div>
      <Hero />
      <TrustSection />

      {/* Featured Products */}
      <section className="container-page py-20">
        <SectionHeading
          label="Shop"
          heading="Our everyday essentials"
          text="Three simple products. Thoughtfully made for your wellness routine."
        />
        <div className="mt-10">
          <ProductGrid products={products} />
        </div>
      </section>

      {/* Why Root & Ritual */}
      <section className="border-y border-line bg-cream">
        <div className="container-page py-20">
          <SectionHeading
            heading="Wellness doesn't have to be complicated."
            text="We believe everyday wellness can start with simple ingredients, thoughtful preparation and rituals that fit naturally into your routine."
          />
          <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {[
              { title: "Simple Ingredients", text: "Products made around familiar botanical ingredients." },
              { title: "Thoughtful Preparation", text: "Carefully prepared with quality and consistency in mind." },
              { title: "Everyday Rituals", text: "Simple products designed to become part of your routine." },
            ].map((item, i) => (
              <div key={item.title} className="border-t border-forest/30 pt-5">
                <span className="text-xs text-fresh">0{i + 1}</span>
                <h3 className="mt-2 font-serif text-xl text-forest">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Product Story */}
      <section className="container-page grid grid-cols-1 items-center gap-12 py-20 md:grid-cols-2">
        <div className="aspect-square border border-line bg-cream md:order-1">
          <ProductImage image="ginger-powder" className="h-full w-full" />
        </div>
        <div className="flex flex-col items-start gap-4">
          <span className="inline-flex items-center bg-sage px-3 py-1 text-xs text-forest">
            Our signature ingredient
          </span>
          <h2 className="text-3xl text-forest sm:text-4xl">Good things start at the root.</h2>
          <p className="text-[15px] leading-relaxed text-muted">
            Ginger has been part of everyday routines for generations —
            valued simply for its warmth and character. We source it
            carefully and prepare it with a light touch, so what reaches you
            is close to how it started: honest, familiar, and unfussy.
          </p>
          <Link
            to="/shop/ginger-powder"
            className="mt-2 border border-forest px-6 py-3 text-sm text-forest transition-colors hover:bg-sage"
          >
            Explore Ginger
          </Link>
        </div>
      </section>

      {/* Daily Ritual */}
      <section className="border-y border-line bg-cream">
        <div className="container-page py-20">
          <SectionHeading heading="Make it part of your day." align="center" />
          <div className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-10 sm:grid-cols-3">
            {RITUAL_STEPS.map((step) => (
              <div key={step.number} className="text-center">
                <span className="font-serif text-2xl text-fresh">{step.number}</span>
                <h3 className="mt-3 font-serif text-lg text-forest">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-page py-20">
        <SectionHeading label="Reviews" heading="What people are saying" />
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <TestimonialCard key={t.name} {...t} />
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-forest">
        <div className="container-page flex flex-col items-center gap-5 py-16 text-center text-cream">
          <h2 className="text-3xl sm:text-4xl">Stay close to your wellness ritual.</h2>
          <p className="max-w-md text-[15px] text-cream/75">
            Get product updates, simple wellness ideas and new releases.
          </p>
          {subscribed ? (
            <p className="mt-2 text-sm text-fresh">You're subscribed. Thank you.</p>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-2 flex w-full max-w-md flex-col gap-3 sm:flex-row">
              <label htmlFor="newsletter-email" className="sr-only">Email address</label>
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="w-full border border-cream/30 bg-transparent px-4 py-3 text-sm text-cream placeholder:text-cream/50 focus:outline-none focus:ring-1 focus:ring-fresh"
              />
              <button
                type="submit"
                className="shrink-0 bg-cream px-6 py-3 text-sm text-forest transition-colors hover:bg-white"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
