"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone, X, Menu } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#highlights", label: "Highlights" },
  { href: "#architecture", label: "Architecture" },
  { href: "#location", label: "Location" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    document.querySelectorAll("section[id]").forEach((s) => observerRef.current?.observe(s));
    return () => observerRef.current?.disconnect();
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled ? "rgba(11,13,15,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(198,161,91,0.1)" : "none",
      }}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-18" aria-label="Main navigation">
        {/* Logo */}
        <Link href="#home" className="flex-shrink-0" aria-label="Western Real Estates Home">
          <Image
            src="/images/logo.svg"
            alt="Western Real Estates"
            width={56}
            height={56}
            className="rounded-full"
            priority
          />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden lg:flex items-center gap-8" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium tracking-wide transition-colors duration-200"
                style={{
                  color: activeSection === link.href.slice(1)
                    ? "var(--accent-gold)"
                    : "var(--text-muted)",
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href={`tel:${siteConfig.phones[0]}`}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded-sm transition-all duration-200"
            style={{
              border: "1px solid var(--accent-gold)",
              color: "var(--accent-gold)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "var(--accent-gold)";
              (e.currentTarget as HTMLElement).style.color = "var(--bg-primary)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.color = "var(--accent-gold)";
            }}
          >
            <Phone size={14} />
            Call Now
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 rounded-sm transition-colors"
          style={{ color: "var(--text-primary)" }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{ background: "rgba(11,13,15,0.97)", backdropFilter: "blur(16px)" }}
            className="lg:hidden overflow-hidden"
          >
            <ul className="px-6 py-6 space-y-1" role="list">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={link.href}
                    className="block py-3 text-base font-medium border-b transition-colors duration-150"
                    style={{
                      borderColor: "var(--border-subtle)",
                      color: activeSection === link.href.slice(1) ? "var(--accent-gold)" : "var(--text-muted)",
                    }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="pt-4"
              >
                <a
                  href={`tel:${siteConfig.phones[0]}`}
                  className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold rounded-sm"
                  style={{ background: "var(--accent-gold)", color: "var(--bg-primary)" }}
                >
                  <Phone size={14} />
                  {siteConfig.phones[0]}
                </a>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
