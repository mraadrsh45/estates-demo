"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Phone, Navigation } from "lucide-react";
import { siteConfig } from "@/lib/config";

export default function Location() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });

  return (
    <section
      id="location"
      ref={ref}
      style={{ background: "var(--bg-secondary)", padding: "clamp(5rem, 10vw, 9rem) 0" }}
      aria-label="Location — Sunny Enclave, Mohali"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — address info */}
          <div>
            <motion.span
              className="section-label block mb-6"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
            >
              Location
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
                marginBottom: "2rem",
              }}
            >
              Located in Mohali
            </motion.h2>

            <motion.span
              className="gold-divider block mb-8"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2, transformOrigin: "left" }}
              aria-hidden="true"
            />

            <motion.address
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="not-italic mb-10"
              style={{ borderLeft: "1px solid var(--border-subtle)", paddingLeft: "1.5rem" }}
            >
              <div className="flex gap-3 mb-3">
                <MapPin size={16} style={{ color: "var(--accent-gold)", flexShrink: 0, marginTop: 3 }} aria-hidden="true" />
                <div>
                  <p style={{ color: "var(--text-primary)", fontWeight: 500, marginBottom: "0.25rem" }}>
                    {siteConfig.address.line1}
                  </p>
                  <p style={{ color: "var(--text-muted)", lineHeight: 1.8 }}>
                    {siteConfig.address.line2}<br />
                    {siteConfig.address.line3}<br />
                    {siteConfig.address.state} — {siteConfig.address.pincode}
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <Phone size={16} style={{ color: "var(--accent-gold)", flexShrink: 0, marginTop: 3 }} aria-hidden="true" />
                <div>
                  {siteConfig.phones.map((p) => (
                    <a
                      key={p}
                      href={`tel:${p}`}
                      className="block transition-colors"
                      style={{ color: "var(--text-muted)", lineHeight: 1.9 }}
                    >
                      {p}
                    </a>
                  ))}
                </div>
              </div>
            </motion.address>

            <motion.a
              href={siteConfig.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-sm transition-all duration-200"
              style={{ background: "var(--accent-gold)", color: "var(--bg-primary)" }}
            >
              <Navigation size={14} />
              Get Directions
            </motion.a>
          </div>

          {/* Right — Map embed */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2 }}
            style={{
              height: "420px",
              borderRadius: "4px",
              overflow: "hidden",
              border: "1px solid var(--border-subtle)",
            }}
          >
            <iframe
              title="Western Real Estates — Sunny Enclave, Sector 125, Mohali"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3429.516048239956!2d76.74121631511998!3d30.712843981642384!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed7adb25e09b%3A0xceda0d05e5bd3b50!2sSunny%20Enclave%2C%20Sahibzada%20Ajit%20Singh%20Nagar%2C%20Punjab%20140301!5e0!3m2!1sen!2sin!4v1694000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
