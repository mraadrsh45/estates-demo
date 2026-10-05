import Navbar from "@/components/navbar/Navbar";
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Highlights from "@/components/sections/Highlights";
import ArchitectureExperience from "@/components/sections/ArchitectureExperience";
import Location from "@/components/location/Location";
import Gallery from "@/components/gallery/Gallery";
import ContactForm from "@/components/contact/ContactForm";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <About />
      <Highlights />
      <ArchitectureExperience />
      <Gallery />
      <Location />
      <ContactForm />
      <Footer />
    </main>
  );
}
