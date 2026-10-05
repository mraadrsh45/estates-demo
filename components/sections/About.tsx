"use client";
import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  const show = (delay = 0) => ({
    initial: { opacity: 0, y: 28 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 },
    transition: { duration: 0.85, delay, ease: "easeOut" as const },
  });

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden"
      style={{ background: "var(--bg-primary)", padding: "clamp(5rem, 10vw, 9rem) 0" }}
      aria-label="About Western Real Estates"
    >
      {/* Thin gold rule top */}
      <div
        style={{
          position: "absolute", top: 0, left: "8%", right: "8%", height: "1px",
          background: "linear-gradient(to right, transparent, rgba(198,161,91,0.3), transparent)",
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left */}
          <div>
            <motion.span className="section-label block mb-8" {...show(0)}>
              About the Property
            </motion.span>

            <motion.h2
              {...show(0.1)}
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)",
                fontWeight: 500,
                lineHeight: 1.15,
                color: "var(--text-primary)",
                marginBottom: "2rem",
              }}
            >
              Designed Around
              <br />
              <em style={{ color: "var(--accent-gold)", fontStyle: "italic" }}>Modern</em>{" "}
              Expectations
            </motion.h2>

            <motion.span
              className="gold-divider block mb-8"
              initial={{ scaleX: 0, originX: 0 }}
              animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
              aria-hidden="true"
            />

            <motion.p {...show(0.25)} style={{ color: "var(--text-muted)", lineHeight: 1.85, fontSize: "1rem", maxWidth: "440px", marginBottom: "1.75rem" }}>
              Western Real Estates represents a considered approach to contemporary
              living in Mohali. Located in Sunny Enclave, Sector 125 — one of the
              well-connected areas of SAS Nagar — this property offers an architectural
              character that stands apart from the ordinary.
            </motion.p>

            <motion.p {...show(0.3)} style={{ color: "var(--text-muted)", lineHeight: 1.85, fontSize: "1rem", maxWidth: "440px" }}>
              The design integrates quality materials, thoughtful proportions, and
              a refined environment that respects both the surrounding context and
              the needs of those who will call it home.
            </motion.p>
          </div>

          {/* Right — stacked images */}
          <motion.div {...show(0.15)} className="relative" style={{ height: "500px" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: "60px", bottom: "60px", borderRadius: "2px", overflow: "hidden" }}>
              <Image
                src="/images/gallery/exterior-night.jpg"
                alt="Western Real Estates building exterior at night"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 45vw"
              />
            </div>
            <div style={{ position: "absolute", bottom: 0, right: 0, width: "55%", height: "55%", borderRadius: "2px", overflow: "hidden", border: "3px solid var(--bg-primary)" }}>
              <Image
                src="/images/gallery/lobby.jpg"
                alt="Premium lobby interior"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
            <div
              style={{
                position: "absolute", bottom: "55%", right: "55%", width: "24px", height: "24px",
                borderRight: "2px solid var(--accent-gold)", borderBottom: "2px solid var(--accent-gold)",
                transform: "translate(50%, 50%)",
              }}
              aria-hidden="true"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
