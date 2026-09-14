export default function TestimonialCard({ quote, name }) {
  return (
    <div className="flex h-full flex-col justify-between border border-line bg-white p-7">
      <p className="text-[15px] leading-relaxed text-ink">"{quote}"</p>
      <p className="mt-6 text-sm text-muted">— {name}</p>
    </div>
  );
}
