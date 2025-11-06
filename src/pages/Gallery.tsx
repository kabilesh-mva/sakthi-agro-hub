import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Card } from "@/components/ui/card";
import sprayerIcon from "@/assets/sprayer-icon.png";
import pumpIcon from "@/assets/pump-icon.png";
import engineIcon from "@/assets/engine-icon.png";
import sparesIcon from "@/assets/spares-icon.png";

const galleryItems = [
  { image: sprayerIcon, title: "Agricultural Sprayers", category: "Products" },
  { image: pumpIcon, title: "Water Pumps", category: "Products" },
  { image: engineIcon, title: "Diesel Engines", category: "Products" },
  { image: sparesIcon, title: "Spare Parts Collection", category: "Products" },
  { image: sprayerIcon, title: "Battery Sprayers", category: "Equipment" },
  { image: pumpIcon, title: "Irrigation Systems", category: "Solutions" },
  { image: engineIcon, title: "Power Equipment", category: "Machinery" },
  { image: sparesIcon, title: "Service Workshop", category: "Facilities" },
];

const Gallery = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Gallery</h1>
            <p className="text-xl opacity-90">
              Explore our range of products and facilities
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {galleryItems.map((item, idx) => (
              <Card key={idx} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                <div className="aspect-square bg-secondary flex items-center justify-center p-8">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform"
                  />
                </div>
                <div className="p-4">
                  <p className="text-sm text-accent font-semibold mb-1">{item.category}</p>
                  <h3 className="font-bold">{item.title}</h3>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Gallery;
