import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { ProductCategories } from "@/components/ProductCategories";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const Home = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      <ProductCategories />
      <WhyChooseUs />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Home;
