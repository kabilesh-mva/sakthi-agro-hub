import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ProductCategories } from "@/components/ProductCategories";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import { QuickQuotePopup } from "@/components/QuickQuotePopup";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <ProductCategories />
      <WhyChooseUs />
      <TestimonialSlider />
      <QuickQuotePopup />
      <Footer />
      <WhatsAppButton />
    </div>
 );
};

export default Home;
