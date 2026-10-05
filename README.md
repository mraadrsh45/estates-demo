<div align="center">

# 🏛️ Western Real Estates

**A Better Standard of Modern Living & Business**

*A luxury digital showcase for a premier real estate destination in Sunny Enclave, Sector 125, SAS Nagar, Mohali.*

[![Next.js](https://img.shields.io/badge/Next.js-16.3.5-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2.8-20232a?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-13-black?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)

[Live Demo](#) • [Explore Architecture](#-interactive-3d-experience) • [Features](#-key-features) • [Getting Started](#-getting-started) • [Contact](#-contact--inquiries)

---

</div>

## 📖 Overview

**Western Real Estates** delivers an immersive web experience designed to showcase high-end commercial and residential properties in Sunny Enclave, Sector 125, Mohali. 

Built with **Next.js 16 (App Router)**, **React 19**, and **Three.js / React Three Fiber**, this platform blends bespoke luxury aesthetics—deep obsidian tones and warm metallic gold accents—with real-time 3D architectural visualization and responsive, production-ready infrastructure.

---

## ✨ Key Features

### 🏢 Interactive 3D Architectural Scene
- **WebGL Real-Time Rendering**: Interactive 3D building model rendered using Three.js and `@react-three/fiber`.
- **Dynamic Camera & Parallax**: Smooth camera controls with responsive mouse-tracking and subtle perspective shifts.
- **Interactive Hotspots**: Clickable 3D callouts identifying key architectural zones (Sky Villas, Rooftop Lounge, Retail Promenade, Executive Suites).
- **Curated Lighting**: Ambient, directional, and point lighting simulating natural golden-hour illumination on architectural surfaces.

### 💎 Luxury Aesthetics & Micro-Interactions
- **Bespoke Color Palette**: Obsidian black (`#0B0D0F`), deep charcoal (`#111416`), and brushed champagne gold (`#C6A15B`).
- **Editorial Typography**: Pairing serif elegance (*Playfair Display*) with precision sans-serif clarity (*Manrope*).
- **Fluid Animation System**: Framer Motion scroll-driven entrances, micro-interactions, and custom animated cursor.

### 🖼️ Curated Visual Gallery
- Categorized architectural showcase spanning exterior elevations, evening lighting, grand lobby interiors, and landscaped spaces.
- Optimized responsive image loading with smooth hover zooms and lightbox capabilities.

### 📍 Strategic Location & Connectivity
- Integrated interactive Google Maps embed pinpointing Sector 125, SAS Nagar, Mohali.
- Key transit hubs, business parks, and connectivity highlights for prospective buyers and investors.

### 📬 Secure Inquiry & Lead Generation
- **Client & Server Validation**: Robust form validation powered by **Zod** schema enforcement.
- **Anti-Abuse Protection**: In-memory rate limiting via `rate-limiter-flexible`.
- **Email Delivery**: Automated inquiry forwarding powered by the **Resend API**.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) | Server Components, routing, SEO, API endpoints |
| **Language** | [TypeScript 5](https://www.typescriptlang.org/) | End-to-end type safety and maintainability |
| **UI Library** | [React 19](https://react.dev/) | Component architecture and modern concurrency hooks |
| **3D Engine** | [Three.js](https://threejs.org/) + [R3F](https://r3f.docs.pmnd.rs/) + [Drei](https://github.com/pmndrs/drei) | WebGL 3D architectural rendering & interactive controls |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) + CSS Variables | Design tokens, responsive utilities, custom theme |
| **Animations** | [Framer Motion](https://www.framer.com/motion/) | Orchestrated page transitions and scroll triggers |
| **Icons** | [Lucide React](https://lucide.dev/) | Clean, consistent vector iconography |
| **Form & Schema** | [Zod](https://zod.dev/) | Schema validation for lead forms and API payloads |
| **Email Service** | [Resend](https://resend.com/) | Transactional email delivery for customer inquiries |
| **Security** | [Rate Limiter Flexible](https://github.com/animir/node-rate-limiter-flexible) | DDoS and brute-force mitigation on contact API |

---

## 📁 Project Structure

```text
western-realestate/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts         # Secure contact form API route with rate-limiting
│   ├── globals.css              # Design tokens, CSS variables, typography & reset
│   ├── layout.tsx               # Root layout, fonts (Playfair Display, Manrope), SEO
│   └── page.tsx                 # Main landing page assembling all sections
├── components/
│   ├── 3d/
│   │   ├── BuildingModel.tsx    # Procedural / GLTF 3D building geometry
│   │   ├── BuildingScene.tsx    # Canvas setup, loader, and scene container
│   │   ├── CameraController.tsx # Parallax mouse tracking & orbit damping
│   │   ├── Hotspots.tsx         # Interactive 3D point markers & info cards
│   │   └── Lighting.tsx         # Scene illumination & shadow configuration
│   ├── contact/
│   │   └── ContactForm.tsx      # Validated client enquiry form
│   ├── footer/
│   │   └── Footer.tsx           # Contact information, legal links & branding
│   ├── gallery/
│   │   └── Gallery.tsx          # High-resolution architectural photography grid
│   ├── hero/
│   │   └── Hero.tsx             # Fullscreen hero with real-time 3D background
│   ├── location/
│   │   └── Location.tsx         # Location map, connectivity & address details
│   ├── navbar/
│   │   └── Navbar.tsx           # Glassmorphism header with smooth scroll links
│   ├── sections/
│   │   ├── About.tsx            # Heritage & vision narrative
│   │   ├── ArchitectureExperience.tsx # Dedicated 3D interactive viewer section
│   │   └── Highlights.tsx       # Key architectural metrics & features
│   └── ui/
│       └── CustomCursor.tsx     # Custom metallic gold cursor follower
├── lib/
│   ├── config.ts                # Site metadata, addresses, contacts, and SEO
│   ├── email.ts                 # Resend email client configuration
│   └── validation.ts            # Zod validation schemas
├── public/
│   └── images/
│       ├── gallery/             # High-res architectural photography
│       ├── logo.svg             # Western Real Estates vector logo
│       └── og-image.jpg         # Social share OpenGraph card
└── types/
    └── index.ts                 # Global TypeScript definitions
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: `v20.x` or higher
- **npm**, **pnpm**, or **yarn**

### 1. Clone the Repository

```bash
git clone https://github.com/mraadrsh45/estates-demo.git
cd estates-demo
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.example .env.local
```

Populate the required credentials:

```env
# Resend API Key (for contact form email dispatch)
RESEND_API_KEY=re_your_api_key_here

# Recipient email address for customer enquiries
CONTACT_EMAIL=info@westernrealestate.in

# Verified sender email in Resend
EMAIL_FROM=Western Real Estates <noreply@yourdomain.com>
```

> **Note**: In development mode without a valid `RESEND_API_KEY`, the contact form route will still validate submissions but skip email delivery.

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to experience the site.

---

## 📜 Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server with hot-reload |
| `npm run build` | Compiles an optimized production build |
| `npm run start` | Launches the production server |
| `npm run lint` | Runs ESLint 9 to verify code standards |

---

## 🛡️ Production & Performance Considerations

- **3D Optimization**: Building scenes utilize `next/dynamic` with `ssr: false` to ensure Three.js Canvas runs exclusively on the client without hydration mismatches.
- **Resource Management**: Geometries and textures are cached and disposed of correctly on unmount to prevent WebGL memory leaks.
- **Form Abuse Mitigation**: Rate limiting restricts submissions to 5 requests per IP every 15 minutes.
- **SEO & Social Sharing**: Complete OpenGraph, Twitter card, and canonical metadata configured in `app/layout.tsx` and `lib/config.ts`.

---

## 📍 Location & Inquiries

**Western Real Estates**  
H.No. 4058, Sunny Enclave, Sector 125, SAS Nagar, Mohali, Punjab – 140301  
📞 **Phone**: +91 82839 96261 / +91 82839 97902  
✉️ **Email**: [info@westernrealestate.in](mailto:info@westernrealestate.in)  

---

<div align="center">
  <sub>Built with precision for Western Real Estates • Designed for modern architecture & luxury living.</sub>
</div>
