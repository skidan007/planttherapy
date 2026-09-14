import gingerTea from "../assets/images/gingerTea.png";
import gingerPowder from "../assets/images/gingerPowder.png";
import arikaOil from "../assets/images/arikaOil.png";
import gingerTea2 from "../assets/images/gingerTea2.png";
import gingerTea3 from "../assets/images/gingerTea3.png";
import gingerPowder2 from "../assets/images/gingerPowder2.png";
import gingerPowder3 from "../assets/images/gingerPowder3.png";
export const products = [
  {
    id: 1,
    name: "Ginger Powder",
    slug: "ginger-powder",
    price: 15000,
    category: "Ginger",
    image: gingerPowder,
    images: [gingerPowder, gingerPowder2, gingerPowder3],
    description: "Finely ground ginger with a warm, naturally rich flavour.",
    longDescription:
      "Our ginger powder is milled from carefully selected ginger root and dried using a slow, low-temperature process that keeps its warmth and character intact. Stir it into hot water, tea, or your everyday cooking for a simple, consistent addition to your routine.",
    ingredients: ["100% dried ginger root (Zingiber officinale)"],
    howToUse: [
      "Stir half a teaspoon into hot water or tea.",
      "Add to soups, stews, or marinades for warmth and depth.",
      "Store the scoop dry and reseal the pouch after each use.",
    ],
    storage: "Keep in a cool, dry place away from direct sunlight. Reseal tightly after opening.",
    rating: 4.8,
    reviews: 32,
  },
  {
    id: 2,
    name: "Ginger Tea",
    slug: "ginger-tea",
    price: 15000,
    category: "Tea",
    image: gingerTea,
    images: [gingerTea, gingerTea2, gingerTea3],
    description: "A comforting ginger tea blend for a simple daily ritual.",
    longDescription:
      "A clean, comforting blend built around dried ginger, meant to be steeped slowly and enjoyed without hurry. Each pouch is portioned for a single cup, so your ritual stays consistent morning after morning.",
    ingredients: ["Dried ginger root", "Natural botanical blend"],
    howToUse: [
      "Steep one sachet in hot water for 4–6 minutes.",
      "Enjoy on its own, or with a little honey.",
      "Best prepared fresh each time.",
    ],
    storage: "Store in a cool, dry place. Keep the box closed between uses.",
    rating: 4.9,
    reviews: 47,
  },
  {
    id: 3,
    name: "Aritha Oil",
    slug: "aritha-oil",
    price: 15000,
    category: "Oil",
    image: arikaOil,
    images: [arikaOil],
    description: "A botanical oil prepared for nourishing personal care.",
    longDescription:
      "A lightweight botanical oil, prepared in small batches and bottled in dark glass to protect it from light. Aritha Oil is designed to sit simply in your personal care routine — measured, unhurried, and easy to return to.",
    ingredients: ["Aritha (soapnut) extract", "Carrier oil blend"],
    howToUse: [
      "Warm a few drops between your palms before applying.",
      "Work gently into hair or skin as part of your routine.",
      "Use consistently for best results.",
    ],
    storage: "Store upright in a cool, dry place, away from direct sunlight.",
    rating: 4.7,
    reviews: 21,
  },
];

export function formatNaira(amount) {
  return `₦${amount.toLocaleString("en-NG")}`;
}

export function getProductBySlug(slug) {
  return products.find((p) => p.slug === slug);
}
