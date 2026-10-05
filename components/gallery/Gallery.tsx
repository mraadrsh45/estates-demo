"use client";
import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  { src: "/images/gallery/exterior-1.jpg", alt: "Building exterior — evening view", category: "Exterior" },
  { src: "/images/gallery/exterior-night.jpg", alt: "Building exterior — blue hour", category: "Exterior" },
  { src: "/images/gallery/lobby.jpg", alt: "Premium lobby interior", category: "Interior" },
  { src: "/images/gallery/amenities.jpg", alt: "Rooftop terrace and amenities", category: "Amenities" },
  { src: "/images/gallery/facade.jpg", alt: "Architectural facade detail", category: "Architecture" },
  { src: "/images/gallery/landscape.jpg", alt: "Landscaped grounds and entrance", category: "Landscape" },
];

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const prev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, []);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, []);

  const close = useCallback(() => setLightboxIndex(null), []);

  // Keyboard nav
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, prev, next, close]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  return (
    <section
      id="gallery"
      style={{ background: "var(--bg-primary)", padding: "clamp(5rem, 10vw, 9rem) 0" }}
      aria-label="Gallery"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Header */}
        <div className="mb-12">
          <span className="section-label block mb-4">Gallery</span>
          <h2
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "clamp(2rem, 4vw, 3.2rem)",
              fontWeight: 500,
              color: "var(--text-primary)",
            }}
          >
            A Look Inside & Out
          </h2>
        </div>

        {/* Masonry-style grid */}
        <div
          className="grid grid-cols-2 lg:grid-cols-3 gap-3"
          style={{ gridAutoRows: "240px" }}
        >
          {images.map((img, i) => (
            <motion.button
              key={img.src}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              onClick={() => setLightboxIndex(i)}
              className="relative overflow-hidden group text-left"
              style={{
                gridRow: i === 0 || i === 3 ? "span 2" : "span 1",
                borderRadius: "2px",
                cursor: "pointer",
                border: "none",
                padding: 0,
              }}
              aria-label={`View: ${img.alt}`}
              data-cursor-expand
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 30vw"
              />
              <div
                className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "linear-gradient(to top, rgba(11,13,15,0.85), transparent)" }}
              >
                <span style={{ color: "var(--accent-gold)", fontSize: "10px", letterSpacing: "0.2em", fontWeight: 600 }}>
                  {img.category.toUpperCase()}
                </span>
                <p style={{ color: "var(--text-primary)", fontSize: "0.85rem", marginTop: "0.25rem" }}>
                  {img.alt}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: "rgba(0,0,0,0.95)", backdropFilter: "blur(8px)" }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            {/* Close */}
            <button
              className="absolute top-5 right-5 p-2 rounded-sm transition-colors"
              style={{ background: "rgba(255,255,255,0.08)", color: "var(--text-primary)" }}
              onClick={close}
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 p-3 rounded-sm transition-colors"
              style={{ background: "rgba(255,255,255,0.08)", color: "var(--text-primary)" }}
              onClick={(e) => { e.stopPropagation(); prev(); }}
              aria-label="Previous image"
            >
              <ChevronLeft size={22} />
            </button>

            {/* Image */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              style={{ position: "relative", width: "min(90vw, 1200px)", height: "min(80vh, 700px)" }}
            >
              <Image
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-4 p-3 rounded-sm transition-colors"
              style={{ background: "rgba(255,255,255,0.08)", color: "var(--text-primary)" }}
              onClick={(e) => { e.stopPropagation(); next(); }}
              aria-label="Next image"
            >
              <ChevronRight size={22} />
            </button>

            {/* Counter */}
            <div
              style={{
                position: "absolute",
                bottom: "1.5rem",
                left: "50%",
                transform: "translateX(-50%)",
                fontSize: "12px",
                color: "var(--text-muted)",
                letterSpacing: "0.1em",
              }}
            >
              {lightboxIndex + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
