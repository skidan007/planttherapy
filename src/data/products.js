import gingerTea from "../assets/images/gingerTea.png";
import gingerPowder from "../assets/images/gingerPowder.png";
import arikaOil from "../assets/images/arikaOil.png";
import arikaOil2 from "../assets/images/arikaOil2.png"; 
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
    eyebrow: "Natural wellness, made with care",
    heroTitle: "Pure Ginger. Everyday Wellness.",
    heroDescription: "Premium ginger powder made from carefully prepared natural ginger, crafted for simple everyday wellness.",
    description: "Finely ground ginger with a warm, naturally rich flavour.",
    longDescription:
      "Our ginger powder is milled from carefully selected ginger root and dried using a slow, low-temperature process that keeps its warmth and character intact. Stir it into hot water, tea, or your everyday cooking for a simple, consistent addition to your routine.",
    ingredients: ["100% dried ginger root (Zingiber officinale)"],
    howToUse: [

      "Add 1 tablespoon of ARIKA Ginger Powder to a small pot.",
      "Add approximately 12 tablespoons of water..",
      "Bring to a boil and simmer for about 2 minutes.",
      "Bring to a boil and simmer for about 2 minutes.",
      "Allow to cool to a comfortable temperature.",
      "Enjoy as a ginger drink.",

    ],
    storage: "Keep in a cool, dry place away from direct sunlight. Reseal tightly after opening.",
    weight: "250g per pack",
    features: ["100% Pure & Natural", "No Additives", "No Preservatives", "Gluten Free", "Premium Quality", "Suitable for drink or massage use"],
    benefits: ["Healthy digestion", "General immune-system support", "Everyday vitality", "A healthy inflammatory response", "Healthy circulation", "Natural energy and wellness"],
    usage: {
      drink: ["Add 1 tablespoon of ARIKA Ginger Powder to a small pot.", "Add approximately 12 tablespoons of water.", "Bring to a boil and simmer for about 2 minutes.", "Allow to cool to a comfortable temperature.", "Enjoy as a ginger drink."],
      massage: ["Add 1 tablespoon of ARIKA Ginger Powder to a small pot.", "Add approximately 6 tablespoons of water.", "Heat for about 2 minutes while stirring.", "Allow the mixture to cool to a comfortable temperature.", "Use the prepared paste as part of a massage routine."],
    },
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
    eyebrow: "Pure warmth. Natural wellness.",
    heroTitle: "Pure Warmth. Natural Wellness.",
    heroDescription: "Premium dried ginger tea made for a simple, comforting and boosting immune system.",
    description: "A comforting ginger tea blend for a simple daily ritual.",
    longDescription:
      "A clean, comforting blend built around dried ginger, meant to be steeped slowly and enjoyed without hurry. Each pouch is portioned for a single cup, so your ritual stays consistent morning after morning.",
    ingredients: ["Dried ginger root", "Natural botanical blend"],
    howToUse: [
      "Take one full hand of ginger flakes in a pot",
      "Add 1.5 litres of water and bring to a boil",
      "Drink warm daily as your water.",
    ],
    storage: "Store in a cool, dry place. Keep the box closed between uses.",
    weight: "250g per pack",
    features: ["100% Pure & Natural Ginger", "No Additives or Preservatives", "Gluten Free", "Caffeine Free", "Premium Quality"],
    benefits: ["Healthy digestion", "General immune support", "Natural warmth", "Healthy circulation", "Natural energy and vitality"],
    usage: {
      prepare: ["Add 1 tablespoon of ARIKA Ginger Tea to a cup or small pot.", "Pour approximately 250ml of hot, not boiling, water over the powder.", "Stir well and allow to steep for 2 minutes.", "Add honey or lemon to taste. Enjoy!"],
    },
    rating: 4.9,
    reviews: 47,
  },
  {
    id: 3,
    name: "Arika Oil",
    slug: "arika-oil",
    price: 15000,
    category: "Oil",
    image: arikaOil,
    images: [arikaOil, arikaOil2],
    eyebrow: "Rooted in natural care",
    heroTitle: "Botanical Care, Naturally.",
    heroDescription: "A ginger oil prepared for a thoughtful personal-care routine.",
    description: "A botanical oil prepared for nourishing personal care.",
    longDescription:
      "A lightweight botanical oil, prepared in small batches and bottled in dark glass to protect it from light. Arika Oil is designed to sit simply in your personal care routine — measured, unhurried, and easy to return to.",
    ingredients: ["Arika (ginger oil) extract", "Carrier oil blend"],
    howToUse: [
      "spray directly to where pain exists.",
      "Then massage with the bottom of the bottle.",
      "Use consistently for best results.",
    ],
    storage: "Store upright in a cool, dry place, away from direct sunlight.",
    weight: "100ml bottle",
    features: ["Botanical ingredients", "Small-batch preparation", "Dark glass bottle", "Made for personal care"],
    benefits: ["A nourishing daily ritual", "Lightweight botanical care", "Thoughtful, simple preparation"],
    benefits: ["Healthy digestion", "General immune support", "Natural warmth", "Healthy circulation", "Natural energy and vitality"],
    usage: {
      prepare: ["spray directly to where pain exists.", "Then massage with the bottom of the bottle.", "Use consistently for best results."],
    },
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
