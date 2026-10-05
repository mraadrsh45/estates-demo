export const siteConfig = {
  businessName: "Western Real Estates",
  tagline: "A Better Standard of Modern Living & Business",
  description:
    "A premium destination in Sunny Enclave, Sector 125, Mohali, designed around accessibility, modern architecture and an elevated experience.",
  address: {
    line1: "H.No. 4058",
    line2: "Sunny Enclave",
    line3: "Sector 125, SAS Nagar, Mohali",
    state: "Punjab",
    pincode: "140301",
    full: "H.No. 4058, Sunny Enclave, Sector 125, SAS Nagar, Mohali, Punjab - 140301",
    googleMapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Sunny+Enclave+Sector+125+SAS+Nagar+Mohali+Punjab+140301",
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3428.4!2d76.74!3d30.71!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390fed7d0000000%3A0x0!2sSunny+Enclave+Sector+125+Mohali!5e0!3m2!1sen!2sin!4v1694000000000!5m2!1sen!2sin",
  },
  phones: ["8283996261", "8283997902"],
  email: process.env.CONTACT_EMAIL ?? "info@westernrealestate.in",
  social: {
    instagram: "",
    facebook: "",
    youtube: "",
  },
  seo: {
    title: "Western Real Estates — Premium Destination, Sector 125, Mohali",
    description:
      "Western Real Estates — A premium real estate destination in Sunny Enclave, Sector 125, SAS Nagar, Mohali. Modern architecture, prime location, elevated living.",
    keywords:
      "Western Real Estates, Sunny Enclave, Sector 125, Mohali, SAS Nagar, real estate Mohali, luxury property Mohali, property in Mohali, Punjab real estate",
    canonical: "https://westernrealestate.in",
    ogImage: "/images/og-image.jpg",
  },
};

export type SiteConfig = typeof siteConfig;
