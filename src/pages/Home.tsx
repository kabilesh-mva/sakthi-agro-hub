import { Navigation } from "@/components/Navigation";
import PremiumHero from "@/components/PremiumHero";
import { ProductCategories } from "@/components/ProductCategories";
import { GreatQualityProducts } from "@/components/GreatQualityProducts";
import { WhyChooseUs } from "@/components/WhyChooseUs";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ContactSection } from "@/components/ContactSection";
import ReviewSection from "@/components/ReviewSection";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f0fdf4] via-[#dcfce7] to-background w-full overflow-x-hidden flex flex-col">
      <Navigation />
      <main className="flex-grow pt-14 md:pt-16 lg:pt-20">
        <PremiumHero />
        <ProductCategories />
        <GreatQualityProducts />
        <WhyChooseUs />
        <ReviewSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Home;
