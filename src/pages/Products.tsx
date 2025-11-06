import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, Users, Star } from "lucide-react";
import sprayerIcon from "@/assets/sprayer-icon.png";
import pumpIcon from "@/assets/pump-icon.png";
import engineIcon from "@/assets/engine-icon.png";
import sparesIcon from "@/assets/spares-icon.png";
import { DealerInquiry } from "@/components/DealerInquiry";

const products = [
  {
    category: "Sprayers",
    icon: sprayerIcon,
    items: [
      { name: "Battery Sprayer", specs: "16L capacity, rechargeable", rating: 4.8 },
      { name: "Manual Knapsack Sprayer", specs: "20L capacity", rating: 4.7 },
      { name: "Power Sprayer", specs: "Petrol/Diesel operated", rating: 4.9 },
      { name: "HTP Sprayer", specs: "High pressure spraying", rating: 4.6 },
    ],
  },
  {
    category: "Pumps & Irrigation",
    icon: pumpIcon,
    items: [
      { name: "Diesel Pump", specs: "5-15 HP range", rating: 4.7 },
      { name: "Petrol Pump", specs: "3-10 HP range", rating: 4.6 },
      { name: "Submersible Pump", specs: "1-5 HP range", rating: 4.8 },
      { name: "Centrifugal Pump", specs: "Various capacities", rating: 4.7 },
    ],
  },
  {
    category: "Engines",
    icon: engineIcon,
    items: [
      { name: "Diesel Engine", specs: "5-20 HP", rating: 4.9 },
      { name: "Petrol Engine", specs: "3-15 HP", rating: 4.7 },
      { name: "Marine Engine", specs: "Water-cooled", rating: 4.8 },
      { name: "Multifuel Engine", specs: "Versatile operation", rating: 4.6 },
    ],
  },
  {
    category: "Spare Parts & Accessories",
    icon: sparesIcon,
    items: [
      { name: "Spray Nozzles", specs: "All types available", rating: 4.9 },
      { name: "Hoses & Pipes", specs: "Durable materials", rating: 4.7 },
      { name: "Engine Parts", specs: "Genuine spares", rating: 4.8 },
      { name: "Pump Components", specs: "OEM quality", rating: 4.6 },
    ],
  },
];

const Products = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-6">Our Products</h1>
            <p className="text-lg sm:text-xl opacity-90 mb-6">
              Comprehensive range of agricultural equipment and machinery
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>4.8/5 Rating</span>
              </div>
              <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                <Users className="h-4 w-4" />
                <span>5,000+ Farmers Served</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8 sm:py-16 bg-background">
        <div className="container mx-auto px-4">
          {products.map((category, idx) => (
            <div key={idx} className="mb-12 sm:mb-16" id={category.category.toLowerCase().replace(/\s&\s/g, '-').replace(/\s/g, '-')}>
              <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
                <img 
                  src={category.icon} 
                  alt={category.category}
                  className="h-12 w-12 sm:h-16 sm:w-16 object-contain"
                />
                <h2 className="text-2xl sm:text-3xl font-bold">{category.category}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.items.map((item, itemIdx) => (
                  <Card key={itemIdx} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-t-[#FF6F00] overflow-hidden group">
                    <CardContent className="p-6 pt-6 pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold">{item.name}</h3>
                        <div className="flex items-center gap-1 bg-[#E8F5E9] px-2 py-1 rounded text-xs font-medium text-[#2E7D32]">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{item.rating}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-4">{item.specs}</p>
                    </CardContent>
                    <CardFooter className="flex flex-col gap-2 p-6 pt-0">
                      <Button size="sm" variant="default" asChild className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white flex items-center justify-center gap-1 mb-2">
                        <a href="tel:+919443600205" className="flex items-center justify-center gap-1 w-full">
                          <Phone className="h-4 w-4" />
                          Call Now
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" asChild className="w-full border-[#2E7D32] text-[#2E7D32] hover:bg-[#E8F5E9] flex items-center justify-center gap-1 mb-2">
                        <a 
                          href={`https://wa.me/919443600205?text=${encodeURIComponent(`Inquiry about ${item.name}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1 w-full"
                        >
                          <MessageCircle className="h-4 w-4" />
                          WhatsApp
                        </a>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Dealer Inquiry Section */}
      <section className="py-8 sm:py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Interested in Becoming a Dealer?</h2>
          <p className="text-lg text-muted-foreground mb-6">Join our network of trusted dealers and grow your business with quality agricultural equipment</p>
          <DealerInquiry />
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
 );
};

export default Products;
