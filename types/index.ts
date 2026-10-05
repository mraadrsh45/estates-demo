export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  width: number;
  height: number;
}

export interface Hotspot {
  id: string;
  position: [number, number, number];
  label: string;
  description: string;
}

export interface ContactFormState {
  status: "idle" | "loading" | "success" | "error";
  message?: string;
}

export interface NavLink {
  href: string;
  label: string;
}

export interface Highlight {
  icon: string;
  label: string;
  title: string;
  description: string;
}
