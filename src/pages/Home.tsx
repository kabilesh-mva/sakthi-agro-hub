import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ProductCategories } from "@/components/ProductCategories";
import { GreatQualityProducts } from "@/components/GreatQualityProducts";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import { ContactSection } from "@/components/ContactSection";

const Home = () => {
  return (
    <div className="min-h-screen bg-background w-full overflow-x-hidden">
      <Navigation />
      <Hero />
      <ProductCategories />
      <GreatQualityProducts />
      <WhyChooseUs />
      <TestimonialSlider />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Home;
