import { useState } from "react";
import { Mail, Phone, Clock, MessageCircle, CheckCircle2 } from "lucide-react";

const initialForm = { name: "", email: "", phone: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim()) next.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) next.email = "Enter a valid email address.";
    if (!form.message.trim()) next.message = "Please enter a message.";
    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const next = validate();
    setErrors(next);
    if (Object.keys(next).length === 0) {
      setSent(true);
      setForm(initialForm);
    }
  }

  return (
    <div className="bg-white">
      <div className="border-b border-line bg-cream">
        <div className="container-page py-16">
          <h1 className="text-4xl text-forest sm:text-5xl">Let's talk.</h1>
          <p className="mt-4 max-w-md text-[15px] text-muted">
            Questions about our products or an order? Send us a message and
            we'll get back to you.
          </p>
        </div>
      </div>

      <div className="container-page grid grid-cols-1 gap-14 py-16 lg:grid-cols-3">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:col-span-2">
          {sent && (
            <div className="mb-2 flex items-center gap-2 border border-fresh bg-sage px-4 py-3 text-sm text-forest">
              <CheckCircle2 size={16} />
              Your message has been sent. We'll be in touch soon.
            </div>
          )}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field label="Name" error={errors.name}>
              <input
                type="text"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                className={inputClass(errors.name)}
              />
            </Field>
            <Field label="Email" error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={inputClass(errors.email)}
              />
            </Field>
          </div>
          <Field label="Phone (optional)">
            <input
              type="tel"
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              className={inputClass()}
            />
          </Field>
          <Field label="Message" error={errors.message}>
            <textarea
              rows={5}
              value={form.message}
              onChange={(e) => update("message", e.target.value)}
              className={inputClass(errors.message)}
            />
          </Field>
          <button
            type="submit"
            className="mt-2 w-fit bg-forest px-7 py-3.5 text-sm text-white transition-colors hover:bg-primary"
          >
            Send Message
          </button>
        </form>

        <div className="flex flex-col gap-6">
          <InfoRow icon={Mail} label="Email" value="hello@rootandritual.example" />
          <InfoRow icon={Phone} label="Phone" value="+234 800 000 0000" />
          <InfoRow icon={Clock} label="Business Hours" value="Mon – Sat, 9am – 6pm" />
          <a
            href="https://wa.me/2348000000000"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 border border-forest px-5 py-3.5 text-sm text-forest transition-colors hover:bg-sage"
          >
            <MessageCircle size={17} />
            Chat with us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3 border border-line p-4">
      <Icon size={18} className="mt-0.5 shrink-0 text-fresh" />
      <div>
        <p className="text-xs text-muted">{label}</p>
        <p className="mt-0.5 text-sm text-ink">{value}</p>
      </div>
    </div>
  );
}

function Field({ label, error, children }) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="text-ink">{label}</span>
      {children}
      {error && <span className="text-xs text-red-600">{error}</span>}
    </label>
  );
}

function inputClass(error) {
  return `border bg-white px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-1 focus:ring-fresh ${
    error ? "border-red-400" : "border-line"
  }`;
}
