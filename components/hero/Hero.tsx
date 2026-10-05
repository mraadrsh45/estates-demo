"use client";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, ChevronRight } from "lucide-react";
import Link from "next/link";

const BuildingScene = dynamic(() => import("@/components/3d/BuildingScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 40,
            height: 40,
            border: "1px solid rgba(198,161,91,0.4)",
            borderTop: "1px solid #C6A15B",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
            margin: "0 auto 16px",
          }}
        />
        <p style={{ color: "#8C8C87", fontSize: "12px", letterSpacing: "0.15em" }}>
          LOADING ARCHITECTURE
        </p>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  ),
});

const baseAnim = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } };

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: "600px", background: "#0b0d0f" }}
      aria-label="Hero — Western Real Estates"
    >
      {/* 3D Scene */}
      <div className="absolute inset-0" aria-hidden="true">
        <BuildingScene showHotspots={false} />
      </div>

      {/* Gradient overlays */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(to right, rgba(11,13,15,0.85) 40%, rgba(11,13,15,0.2) 100%)" }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: "30%", background: "linear-gradient(to top, #0b0d0f, transparent)" }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center px-6 lg:px-16 max-w-3xl">
        <motion.span
          className="section-label mb-6 block"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          Premium Destination
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.35, ease: "easeOut" }}
          className="mb-6"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "clamp(2.4rem, 5vw, 4.2rem)",
            fontWeight: 500,
            lineHeight: 1.1,
            color: "var(--text-primary)",
          }}
        >
          A Better Standard of
          <br />
          <span style={{ color: "var(--accent-gold)" }}>Modern Living</span> &amp; Business
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.5, ease: "easeOut" }}
          style={{
            color: "var(--text-muted)",
            fontSize: "clamp(0.9rem, 1.5vw, 1.05rem)",
            lineHeight: 1.75,
            maxWidth: "480px",
            marginBottom: "2.5rem",
          }}
        >
          A premium destination in Sunny Enclave, Sector 125, Mohali, designed
          around accessibility, modern architecture and an elevated experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65, ease: "easeOut" }}
          className="flex flex-wrap gap-4"
        >
          <Link
            href="#architecture"
            className="flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-sm transition-all duration-200"
            style={{ background: "var(--accent-gold)", color: "var(--bg-primary)" }}
          >
            Explore <ChevronRight size={15} />
          </Link>
          <Link
            href="#contact"
            className="flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-sm transition-all duration-200"
            style={{ border: "1px solid rgba(244,241,234,0.25)", color: "var(--text-primary)" }}
          >
            Contact Us
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        aria-hidden="true"
      >
        <span style={{ color: "var(--text-muted)", fontSize: "10px", letterSpacing: "0.2em" }}>SCROLL</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ArrowDown size={14} style={{ color: "var(--accent-gold)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
