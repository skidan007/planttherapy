export default function ProductImage({ image, alt = "", className = "" }) {
  return (
    <div className={`overflow-hidden bg-cream ${className}`}>
      <img
        src={image}
        alt={alt}
        className="h-full w-full object-contain"
      />
    </div>
  );
}
