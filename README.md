# Root & Ritual — Frontend

A premium Nigerian natural wellness e-commerce storefront (frontend only, no backend yet).

## Stack
React 19 + Vite + Tailwind CSS v4 + React Router + Lucide React

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## What's included
- 7 pages: Home, Shop, Product Details, Cart, Checkout, About, Contact
- Cart state persisted to `localStorage` via `src/context/CartContext.jsx`
- Product data in `src/data/products.js` — edit prices/copy here
- Placeholder product visuals in `src/components/ProductImage.jsx` — swap in real
  photography later by dropping files into `src/assets/products/` and updating
  this component to render `<img>` instead of the SVG illustrations
- Brand name ("Root & Ritual") is used throughout but can be renamed by searching
  for the string across `src/components` and `src/pages`

## Intentionally not included yet
- Backend / API
- Authentication
- Real payment gateway integration (checkout has a polished placeholder flow)
