"use client";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import type { ContactFormData } from "@/lib/validation";

const REQUIREMENTS = [
  "Residential Property",
  "Commercial Space",
  "Investment Enquiry",
  "Site Visit",
  "General Enquiry",
];

type FormState = { status: "idle" | "loading" | "success" | "error"; message?: string };

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "var(--bg-card)",
  border: "1px solid var(--border-subtle)",
  borderRadius: "2px",
  padding: "0.875rem 1rem",
  color: "var(--text-primary)",
  fontSize: "0.9rem",
  outline: "none",
  transition: "border-color 0.2s",
  fontFamily: "var(--font-body)",
};

export default function ContactForm() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [state, setState] = useState<FormState>({ status: "idle" });
  const [errors, setErrors] = useState<Partial<ContactFormData>>({});
  const [form, setForm] = useState<ContactFormData>({
    name: "",
    phone: "",
    email: "",
    requirement: "",
    message: "",
  });

  const validate = (): boolean => {
    const errs: Partial<Record<keyof ContactFormData, string>> = {};
    if (!form.name.trim() || form.name.trim().length < 2) errs.name = "Name is required (min 2 characters)";
    if (!form.phone.trim() || !/^[+]?[\d\s\-().]{7,15}$/.test(form.phone.trim()))
      errs.phone = "Enter a valid phone number";
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim()))
      errs.email = "Enter a valid email address";
    if (!form.requirement) errs.requirement = "Please select a requirement";
    if (!form.message.trim() || form.message.trim().length < 10)
      errs.message = "Message must be at least 10 characters";
    setErrors(errs as Partial<ContactFormData>);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setState({ status: "loading" });
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setState({ status: "success" });
        setForm({ name: "", phone: "", email: "", requirement: "", message: "" });
      } else {
        setState({ status: "error", message: data.message ?? "Something went wrong." });
      }
    } catch {
      setState({ status: "error", message: "Network error. Please try again." });
    }
  };

  const field = (key: keyof ContactFormData) => ({
    value: form[key],
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [key]: e.target.value }));
      if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
    },
    onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      e.currentTarget.style.borderColor = "rgba(198,161,91,0.6)";
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      e.currentTarget.style.borderColor = errors[key] ? "#ef4444" : "var(--border-subtle)";
    },
  });

  return (
    <section
      id="contact"
      ref={ref}
      style={{ background: "var(--bg-secondary)", padding: "clamp(5rem, 10vw, 9rem) 0" }}
      aria-label="Contact Form — Send Enquiry"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Left info */}
          <div>
            <motion.span
              className="section-label block mb-6"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
            >
              Enquire
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2rem, 3.5vw, 3rem)",
                fontWeight: 500,
                color: "var(--text-primary)",
                marginBottom: "1.5rem",
              }}
            >
              Get in Touch
            </motion.h2>
            <motion.span
              className="gold-divider block mb-8"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2, transformOrigin: "left" }}
              aria-hidden="true"
            />
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3 }}
              style={{ color: "var(--text-muted)", lineHeight: 1.85, maxWidth: "380px" }}
            >
              We&apos;d be happy to share more information about Western Real Estates.
              Fill out the form and we will be in touch shortly.
            </motion.p>
          </div>

          {/* Right form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {state.status === "success" ? (
              <div
                className="flex flex-col items-center text-center py-16"
                style={{ border: "1px solid rgba(198,161,91,0.2)", borderRadius: "4px" }}
              >
                <CheckCircle size={40} style={{ color: "var(--accent-gold)", marginBottom: "1.5rem" }} />
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.6rem",
                    color: "var(--text-primary)",
                    marginBottom: "0.75rem",
                  }}
                >
                  Thank You.
                </h3>
                <p style={{ color: "var(--text-muted)", maxWidth: "280px", lineHeight: 1.75 }}>
                  Your enquiry has been received. We will get back to you shortly.
                </p>
                <button
                  onClick={() => setState({ status: "idle" })}
                  className="mt-8 px-6 py-2.5 text-sm font-semibold rounded-sm"
                  style={{ border: "1px solid var(--border-subtle)", color: "var(--text-muted)" }}
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                {/* Name + Phone row */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" style={{ display: "block", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "0.5rem", fontWeight: 600 }}>
                      FULL NAME *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      placeholder="Your name"
                      autoComplete="name"
                      style={{ ...inputStyle, borderColor: errors.name ? "#ef4444" : "var(--border-subtle)" }}
                      {...field("name")}
                    />
                    {errors.name && <p style={{ color: "#ef4444", fontSize: "11px", marginTop: "0.3rem" }}>{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-phone" style={{ display: "block", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "0.5rem", fontWeight: 600 }}>
                      PHONE *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      placeholder="Phone number"
                      autoComplete="tel"
                      style={{ ...inputStyle, borderColor: errors.phone ? "#ef4444" : "var(--border-subtle)" }}
                      {...field("phone")}
                    />
                    {errors.phone && <p style={{ color: "#ef4444", fontSize: "11px", marginTop: "0.3rem" }}>{errors.phone}</p>}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" style={{ display: "block", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "0.5rem", fontWeight: 600 }}>
                    EMAIL *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                    style={{ ...inputStyle, borderColor: errors.email ? "#ef4444" : "var(--border-subtle)" }}
                    {...field("email")}
                  />
                  {errors.email && <p style={{ color: "#ef4444", fontSize: "11px", marginTop: "0.3rem" }}>{errors.email}</p>}
                </div>

                {/* Requirement */}
                <div>
                  <label htmlFor="contact-requirement" style={{ display: "block", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "0.5rem", fontWeight: 600 }}>
                    REQUIREMENT *
                  </label>
                  <select
                    id="contact-requirement"
                    style={{ ...inputStyle, borderColor: errors.requirement ? "#ef4444" : "var(--border-subtle)" }}
                    {...field("requirement")}
                  >
                    <option value="">Select your requirement</option>
                    {REQUIREMENTS.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                  {errors.requirement && <p style={{ color: "#ef4444", fontSize: "11px", marginTop: "0.3rem" }}>{errors.requirement}</p>}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="contact-message" style={{ display: "block", fontSize: "11px", letterSpacing: "0.1em", color: "var(--text-muted)", marginBottom: "0.5rem", fontWeight: 600 }}>
                    MESSAGE *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    placeholder="Tell us about your enquiry..."
                    style={{ ...inputStyle, resize: "vertical", borderColor: errors.message ? "#ef4444" : "var(--border-subtle)" }}
                    {...field("message")}
                  />
                  {errors.message && <p style={{ color: "#ef4444", fontSize: "11px", marginTop: "0.3rem" }}>{errors.message}</p>}
                </div>

                {/* Error */}
                {state.status === "error" && (
                  <div className="flex gap-2 p-3 rounded-sm" style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}>
                    <AlertCircle size={16} style={{ color: "#ef4444", flexShrink: 0 }} />
                    <p style={{ color: "#ef4444", fontSize: "13px" }}>
                      {state.message ?? "Something went wrong. Please try again or contact us directly."}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={state.status === "loading"}
                  className="flex items-center justify-center gap-2 w-full py-4 text-sm font-semibold rounded-sm transition-all duration-200 disabled:opacity-60"
                  style={{ background: "var(--accent-gold)", color: "var(--bg-primary)" }}
                >
                  {state.status === "loading" ? (
                    <><Loader2 size={16} className="animate-spin" /> Sending...</>
                  ) : (
                    <><Send size={15} /> Send Enquiry</>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
