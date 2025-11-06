import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sprout, Droplets, Gavel, Wrench, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

const categories = [
  {
    title: "Sprayers",
    description: "Battery, Manual, Knapsack, Power, and HTP Sprayers",
    icon: Sprout,
    badge: "Best Seller",
    badgeColor: "bg-[#FF6F00]",
    accentColor: "border-yellow-500 hover:border-yellow-600", // Yellow accent for sprayers
    popularProducts: [
      { name: "Battery Sprayer 12V", rating: 4.8 },
      { name: "Manual Knapsack Sprayer", rating: 4.7 },
      { name: "Power Sprayer 25L", rating: 4.9 }
    ]
  },
  {
    title: "Pumps & Irrigation",
    description: "Diesel, Petrol, Submersible, and Centrifugal Pumps",
    icon: Droplets,
    badge: "New Arrival",
    badgeColor: "bg-[#2E7D32]",
    accentColor: "border-blue-500 hover:border-blue-600", // Blue accent for pumps
    popularProducts: [
      { name: "Submersible Pump 1HP", rating: 4.6 },
      { name: "Centrifugal Pump 2HP", rating: 4.7 },
      { name: "Diesel Water Pump", rating: 4.8 }
    ]
  },
  {
    title: "Engines",
    description: "Diesel, Petrol, Marine, and Multifuel Engines",
    icon: Gavel,
    badge: "Popular",
    badgeColor: "bg-[#333333]",
    accentColor: "border-gray-500 hover:border-gray-600", // Gray accent for engines
    popularProducts: [
      { name: "Diesel Engine 5HP", rating: 4.9 },
      { name: "Petrol Engine 3HP", rating: 4.7 },
      { name: "Marine Engine 8HP", rating: 4.8 }
    ]
  },
  {
    title: "Spare Parts",
    description: "Genuine spares, hoses, nozzles, and accessories",
    icon: Wrench,
    badge: "Essential",
    badgeColor: "bg-[#FF6F00]",
    accentColor: "border-orange-500 hover:border-orange-600", // Orange accent for spare parts
    popularProducts: [
      { name: "Nozzle Set", rating: 4.5 },
      { name: "Hose Pipe 25m", rating: 4.6 },
      { name: "Engine Gaskets", rating: 4.7 }
    ]
  },
];

export const ProductCategories = () => {
  return (
    <section className="py-12 sm:py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Our Product Range
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Complete agricultural solutions for all your farming needs
          </p>
        </div>

        <Carousel opts={{ align: "start", loop: true }} className="w-full max-w-6xl mx-auto">
          <CarouselContent className="-ml-3 sm:-ml-4">
            {categories.map((category, index) => (
              <CarouselItem key={index} className="pl-3 sm:pl-4 basis-3/4 sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <Card 
                  className={`hover:shadow-xl transition-all duration-300 cursor-pointer group h-full flex flex-col border-l-4 border-l-[#FF6F00] ${category.accentColor} hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(0,0,0,0.15)]`}
                >
                  <CardContent className="p-4 sm:p-6 flex-col items-center text-center flex-grow relative overflow-hidden">
                    <div className="relative mb-3 sm:mb-4 flex justify-center w-full">
                      <div className="p-3 sm:p-4 bg-[#E8F5E9] rounded-full group-hover:bg-[#2E7D32] transition-colors duration-300 group-hover:scale-110 relative z-10">
                        <category.icon className="h-10 w-10 sm:h-12 sm:w-12 text-[#2E7D32] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div className={`absolute -top-2 -right-2 ${category.badgeColor} text-white text-xs font-bold px-2 py-1 rounded-full z-10`}>
                        {category.badge}
                      </div>
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-[#2E7D32] transition-colors duration-300 z-10">
                      {category.title}
                    </h3>
                    <p className="text-sm sm:text-muted-foreground mb-3 sm:mb-4 flex-grow group-hover:text-[#2E7D32] transition-colors duration-300 text-center z-10">
                      {category.description}
                    </p>
                    
                    {/* Popular Products Mini Slider */}
                    <div className="w-full mt-3 space-y-2 z-10">
                      {category.popularProducts.map((product, idx) => (
                        <div key={idx} className="text-xs bg-secondary/30 p-2 rounded text-left opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0 absolute bottom-20 left-4 right-4 group-hover:static group-hover:translate-y-0 group-hover:opacity-100 group-hover:delay-150">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-medium">{product.name}</span>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span>{product.rating}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex bg-[#2E7D32] hover:bg-[#1B5E20] border-0" />
          <CarouselNext className="hidden md:flex bg-[#2E7D32] hover:bg-[#1B5E20] border-0" />
        </Carousel>

        <div className="text-center mt-8 sm:mt-12">
          <Button size="sm" className="bg-gradient-to-r from-[#2E7D32] to-[#FF6F00] hover:from-[#1B5E20] hover:to-[#E65100] text-white px-6 py-2 sm:px-8 sm:py-3" asChild>
            <Link to="/products" className="flex items-center gap-2 text-sm sm:text-base font-medium">
              View All Products
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
