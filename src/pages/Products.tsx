import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, MessageCircle } from "lucide-react";
import sprayerIcon from "@/assets/sprayer-icon.png";
import pumpIcon from "@/assets/pump-icon.png";
import engineIcon from "@/assets/engine-icon.png";
import sparesIcon from "@/assets/spares-icon.png";

const products = [
  {
    category: "Sprayers",
    icon: sprayerIcon,
    items: [
      { name: "Battery Sprayer", specs: "16L capacity, rechargeable" },
      { name: "Manual Knapsack Sprayer", specs: "20L capacity" },
      { name: "Power Sprayer", specs: "Petrol/Diesel operated" },
      { name: "HTP Sprayer", specs: "High pressure spraying" },
    ],
  },
  {
    category: "Pumps & Irrigation",
    icon: pumpIcon,
    items: [
      { name: "Diesel Pump", specs: "5-15 HP range" },
      { name: "Petrol Pump", specs: "3-10 HP range" },
      { name: "Submersible Pump", specs: "1-5 HP range" },
      { name: "Centrifugal Pump", specs: "Various capacities" },
    ],
  },
  {
    category: "Engines",
    icon: engineIcon,
    items: [
      { name: "Diesel Engine", specs: "5-20 HP" },
      { name: "Petrol Engine", specs: "3-15 HP" },
      { name: "Marine Engine", specs: "Water-cooled" },
      { name: "Multifuel Engine", specs: "Versatile operation" },
    ],
  },
  {
    category: "Spare Parts & Accessories",
    icon: sparesIcon,
    items: [
      { name: "Spray Nozzles", specs: "All types available" },
      { name: "Hoses & Pipes", specs: "Durable materials" },
      { name: "Engine Parts", specs: "Genuine spares" },
      { name: "Pump Components", specs: "OEM quality" },
    ],
  },
];

const Products = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Our Products</h1>
            <p className="text-xl opacity-90">
              Comprehensive range of agricultural equipment and machinery
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          {products.map((category, idx) => (
            <div key={idx} className="mb-16">
              <div className="flex items-center gap-4 mb-8">
                <img 
                  src={category.icon} 
                  alt={category.category}
                  className="h-16 w-16 object-contain"
                />
                <h2 className="text-3xl font-bold">{category.category}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {category.items.map((item, itemIdx) => (
                  <Card key={itemIdx} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                      <p className="text-muted-foreground mb-4">{item.specs}</p>
                    </CardContent>
                    <CardFooter className="flex gap-2 p-6 pt-0">
                      <Button size="sm" variant="default" asChild className="flex-1">
                        <a href="tel:+919876543210" className="flex items-center justify-center gap-1">
                          <Phone className="h-4 w-4" />
                          Call
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" asChild className="flex-1">
                        <a 
                          href={`https://wa.me/919876543210?text=${encodeURIComponent(`Inquiry about ${item.name}`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-1"
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

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Products;
