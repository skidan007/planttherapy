import arikaOil from "../assets/images/arikaOil.png";
import gingerPowder from "../assets/images/gingerPowder.png";
import gingerTea from "../assets/images/gingerTea.png";

const imageSources = {
	"aritha-oil": arikaOil,
	"ginger-powder": gingerPowder,
	"ginger-tea": gingerTea,
};

// // Reusable product image component.
// // Real photography can be dropped into /src/assets/products/ later —
// // swap the <picture> source below for an <img src={realImage} /> per product.

// function GingerPowderArt() {
//   return (
//     <svg viewBox="0 0 400 400" className="h-full w-full" role="img" aria-label="Ginger powder in a resealable pouch">
//       <rect width="400" height="400" fill="#FAF8F1" />
//       <ellipse cx="200" cy="340" rx="120" ry="14" fill="#E7F0E8" />
//       <path d="M130 120 L270 120 L262 320 Q200 336 138 320 Z" fill="#F4F0E4" stroke="#123C2A" strokeWidth="1.5" />
//       <path d="M130 120 Q130 96 160 92 L240 92 Q270 96 270 120 Z" fill="#1F5A3D" />
//       <rect x="150" y="150" width="100" height="66" rx="2" fill="#FFFFFF" stroke="#DDE3D9" />
//       <text x="200" y="178" textAnchor="middle" fontFamily="DM Serif Display, serif" fontSize="15" fill="#123C2A">Root &amp; Ritual</text>
//       <text x="200" y="200" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="9" letterSpacing="1.5" fill="#68736B">GINGER POWDER</text>
//       <circle cx="90" cy="230" r="18" fill="#E7A33C" opacity="0.9" />
//       <circle cx="105" cy="255" r="10" fill="#E7A33C" opacity="0.7" />
//       <circle cx="310" cy="245" r="14" fill="#E7A33C" opacity="0.85" />
//     </svg>
//   );
// }

// function GingerTeaArt() {
//   return (
//     <svg viewBox="0 0 400 400" className="h-full w-full" role="img" aria-label="Ginger tea box packaging">
//       <rect width="400" height="400" fill="#FAF8F1" />
//       <ellipse cx="200" cy="340" rx="120" ry="14" fill="#E7F0E8" />
//       <rect x="140" y="110" width="120" height="200" fill="#F4F0E4" stroke="#123C2A" strokeWidth="1.5" />
//       <rect x="140" y="110" width="120" height="46" fill="#1F5A3D" />
//       <text x="200" y="139" textAnchor="middle" fontFamily="DM Serif Display, serif" fontSize="16" fill="#FAF8F1">Root &amp; Ritual</text>
//       <text x="200" y="200" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" letterSpacing="1.5" fill="#123C2A">GINGER</text>
//       <text x="200" y="216" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="11" letterSpacing="1.5" fill="#123C2A">TEA</text>
//       <line x1="164" y1="240" x2="236" y2="240" stroke="#DDE3D9" />
//       <text x="200" y="270" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="8" fill="#68736B">20 SACHETS</text>
//       <rect x="270" y="150" width="6" height="70" fill="#3F7D4F" opacity="0.6" />
//     </svg>
//   );
// }

// function ArithaOilArt() {
//   return (
//     <svg viewBox="0 0 400 400" className="h-full w-full" role="img" aria-label="Aritha oil in a dark glass bottle">
//       <rect width="400" height="400" fill="#FAF8F1" />
//       <ellipse cx="200" cy="340" rx="110" ry="14" fill="#E7F0E8" />
//       <path d="M182 130 L218 130 L218 160 Q252 180 252 220 L252 310 Q252 320 242 320 L158 320 Q148 320 148 310 L148 220 Q148 180 182 160 Z" fill="#17231C" opacity="0.88" />
//       <rect x="186" y="104" width="28" height="30" fill="#123C2A" />
//       <rect x="180" y="96" width="40" height="12" rx="2" fill="#3F7D4F" />
//       <rect x="164" y="220" width="72" height="52" rx="2" fill="#FAF8F1" opacity="0.95" />
//       <text x="200" y="242" textAnchor="middle" fontFamily="DM Serif Display, serif" fontSize="12" fill="#123C2A">Aritha</text>
//       <text x="200" y="258" textAnchor="middle" fontFamily="Inter, sans-serif" fontSize="7" letterSpacing="1.5" fill="#68736B">BOTANICAL OIL</text>
//     </svg>
//   );
// }

// const ART = {
//   "ginger-powder": GingerPowderArt,
//   "ginger-tea": GingerTeaArt,
//   "aritha-oil": ArithaOilArt,
// };

// export default function ProductImage({ image, className = "" }) {
//   if (image?.includes("/")) {
//     return (
//       <div className={`overflow-hidden bg-cream ${className}`}>
//         <img src={image} alt="" className="h-full w-full object-cover" />
//       </div>
//     );
//   }

//   const key = image?.replace(/-\d$/, "") || "ginger-powder";
//   const Art = ART[key] || GingerPowderArt;
//   return (
//     <div className={`overflow-hidden bg-cream ${className}`}>
//       <Art />
//     </div>
//   );
// }
export default function ProductImage({ image, className = "" }) {
	const source = imageSources[image] || image;

	return (
		<div className={`overflow-hidden bg-cream ${className}`}>
			<img src={source} alt="" className="h-full w-full object-cover" />
		</div>
	);
}
