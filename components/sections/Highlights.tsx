"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Building2, Navigation, Leaf, TrendingUp, Shield } from "lucide-react";

const highlights = [
  {
    icon: MapPin,
    label: "Location",
    title: "Prime Location",
    description: "Situated in Sunny Enclave, Sector 125, SAS Nagar, Mohali — a well-established residential area with mature infrastructure.",
  },
  {
    icon: Building2,
    label: "Architecture",
    title: "Modern Architecture",
    description: "Contemporary architectural character with quality materials, clean lines, and a premium visual design that ages well.",
  },
  {
    icon: Navigation,
    label: "Connectivity",
    title: "Well Connected",
    description: "Convenient access to key areas of Mohali and surrounding regions including Chandigarh, Panchkula, and the airport corridor.",
  },
  {
    icon: Leaf,
    label: "Environment",
    title: "Premium Environment",
    description: "A refined, low-density setting focused on comfort, privacy, and accessibility — designed with long-term liveability in mind.",
  },
  {
    icon: TrendingUp,
    label: "Growth",
    title: "Strategic Location",
    description: "Located in a growing residential zone of SAS Nagar, within proximity to commercial centres and educational institutions.",
  },
  {
    icon: Shield,
    label: "Quality",
    title: "Built to Last",
    description: "Quality construction materials and thoughtful design detailing — a property built with attention to longevity and finish.",
  },
];

export default function Highlights() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="highlights"
      ref={ref}
      style={{ background: "var(--bg-secondary)", padding: "clamp(5rem, 10vw, 9rem) 0" }}
      aria-label="Property Highlights"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <motion.span
            className="section-label block mb-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            Highlights
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 500,
              color: "var(--text-primary)",
              maxWidth: "500px",
            }}
          >
            What Sets This Property Apart
          </motion.h2>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "var(--border-subtle)" }}>
          {highlights.map((h, i) => {
            const Icon = h.icon;
            return (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.05 * i }}
                style={{ background: "var(--bg-secondary)", padding: "2.5rem 2rem" }}
                className="group"
              >
                <Icon
                  size={20}
                  style={{ color: "var(--accent-gold)", marginBottom: "1.25rem" }}
                  aria-hidden="true"
                />
                <p
                  style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--text-muted)",
                    marginBottom: "0.5rem",
                    fontWeight: 600,
                  }}
                >
                  {h.label}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: "1.25rem",
                    fontWeight: 500,
                    color: "var(--text-primary)",
                    marginBottom: "0.75rem",
                    lineHeight: 1.3,
                  }}
                >
                  {h.title}
                </h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: 1.75 }}>
                  {h.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
