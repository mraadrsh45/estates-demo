"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";

const BuildingScene = dynamic(() => import("@/components/3d/BuildingScene"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-secondary)",
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          border: "1px solid rgba(198,161,91,0.3)",
          borderTop: "1px solid #C6A15B",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  ),
});

export default function ArchitectureExperience() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section
      id="architecture"
      ref={ref}
      style={{ background: "var(--bg-primary)", padding: "clamp(5rem, 10vw, 9rem) 0" }}
      aria-label="Architecture Experience"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="mb-12 lg:mb-16 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div>
            <motion.span
              className="section-label block mb-4"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
            >
              Architecture
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
              }}
            >
              Experience the Architecture
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              color: "var(--text-muted)",
              fontSize: "0.9rem",
              maxWidth: "320px",
              lineHeight: 1.75,
            }}
          >
            Explore the architectural composition in 3D. Move your mouse across the scene
            to shift perspective. Click the markers to learn more.
          </motion.p>
        </div>

        {/* 3D Viewer Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          style={{
            height: "clamp(400px, 65vh, 700px)",
            border: "1px solid var(--border-subtle)",
            borderRadius: "4px",
            overflow: "hidden",
            position: "relative",
            background: "var(--bg-secondary)",
          }}
        >
          {inView && <BuildingScene showHotspots={true} interactive={true} />}

          {/* Corner decorators */}
          {["top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"].map((pos, i) => (
            <div
              key={i}
              className={`absolute ${pos} w-5 h-5 pointer-events-none`}
              style={{
                borderTop: i < 2 ? "1px solid rgba(198,161,91,0.5)" : "none",
                borderBottom: i >= 2 ? "1px solid rgba(198,161,91,0.5)" : "none",
                borderLeft: i % 2 === 0 ? "1px solid rgba(198,161,91,0.5)" : "none",
                borderRight: i % 2 === 1 ? "1px solid rgba(198,161,91,0.5)" : "none",
              }}
              aria-hidden="true"
            />
          ))}

          {/* Label */}
          <div
            style={{
              position: "absolute",
              bottom: "1rem",
              left: "1rem",
              fontSize: "10px",
              letterSpacing: "0.15em",
              color: "rgba(198,161,91,0.7)",
              pointerEvents: "none",
            }}
            aria-hidden="true"
          >
            INTERACTIVE 3D VISUALIZATION
          </div>
        </motion.div>
      </div>
    </section>
  );
}
