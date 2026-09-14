export default function SectionHeading({ label, heading, text, align = "left" }) {
  const alignment = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <div className={`flex max-w-xl flex-col gap-3 ${alignment}`}>
      {label && (
        <span className="inline-flex w-fit items-center bg-sage px-3 py-1 text-xs text-forest">
          {label}
        </span>
      )}
      <h2 className="text-3xl text-forest sm:text-4xl">{heading}</h2>
      {text && <p className="text-base leading-relaxed text-muted">{text}</p>}
    </div>
  );
}
