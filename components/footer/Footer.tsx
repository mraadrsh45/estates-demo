import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/config";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#highlights", label: "Highlights" },
  { href: "#architecture", label: "Architecture" },
  { href: "#location", label: "Location" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer
      style={{ background: "var(--bg-secondary)", borderTop: "1px solid var(--border-subtle)" }}
      aria-label="Footer"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* Top grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 py-16">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="#home" aria-label="Western Real Estates">
              <Image
                src="/images/logo.svg"
                alt="Western Real Estates"
                width={60}
                height={60}
                className="rounded-full mb-5"
              />
            </Link>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.8, fontSize: "0.9rem", maxWidth: "320px" }}>
              A premium real estate destination in Sunny Enclave, Sector 125, SAS Nagar,
              Mohali — designed for modern living and business.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.18em",
                color: "var(--text-muted)",
                fontWeight: 600,
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              Navigation
            </p>
            <ul className="space-y-2" role="list">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    style={{ color: "var(--text-muted)", fontSize: "0.9rem", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-gold)")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <address className="not-italic">
            <p
              style={{
                fontSize: "11px",
                letterSpacing: "0.18em",
                color: "var(--text-muted)",
                fontWeight: 600,
                textTransform: "uppercase",
                marginBottom: "1.25rem",
              }}
            >
              Contact
            </p>
            <ul className="space-y-4" role="list">
              <li className="flex gap-3">
                <MapPin size={14} style={{ color: "var(--accent-gold)", flexShrink: 0, marginTop: 3 }} aria-hidden="true" />
                <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", lineHeight: 1.7 }}>
                  {siteConfig.address.line1}, {siteConfig.address.line2},<br />
                  {siteConfig.address.line3},<br />
                  {siteConfig.address.state} — {siteConfig.address.pincode}
                </p>
              </li>
              {siteConfig.phones.map((p) => (
                <li key={p} className="flex gap-3">
                  <Phone size={14} style={{ color: "var(--accent-gold)", flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                  <a href={`tel:${p}`} style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>
                    {p}
                  </a>
                </li>
              ))}
              <li className="flex gap-3">
                <Mail size={14} style={{ color: "var(--accent-gold)", flexShrink: 0, marginTop: 2 }} aria-hidden="true" />
                <a href={`mailto:${siteConfig.email}`} style={{ color: "var(--text-muted)", fontSize: "0.85rem", wordBreak: "break-all" }}>
                  {siteConfig.email}
                </a>
              </li>
            </ul>
          </address>
        </div>

        {/* Bottom bar */}
        <div
          style={{ borderTop: "1px solid var(--border-subtle)", padding: "1.5rem 0" }}
          className="flex flex-col sm:flex-row justify-between gap-4 items-center"
        >
          <p style={{ color: "var(--text-muted)", fontSize: "12px" }}>
            © 2026 {siteConfig.businessName}. All Rights Reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Use"].map((label) => (
              <Link
                key={label}
                href="#"
                style={{ color: "var(--text-muted)", fontSize: "12px", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-gold)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
