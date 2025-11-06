import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import sprayerIcon from "@/assets/sprayer-icon.png";
import pumpIcon from "@/assets/pump-icon.png";
import engineIcon from "@/assets/engine-icon.png";
import sparesIcon from "@/assets/spares-icon.png";

const categories = [
  {
    title: "Sprayers",
    description: "Battery, Manual, Knapsack, Power, and HTP Sprayers",
    icon: sprayerIcon,
  },
  {
    title: "Pumps & Irrigation",
    description: "Diesel, Petrol, Submersible, and Centrifugal Pumps",
    icon: pumpIcon,
  },
  {
    title: "Engines",
    description: "Diesel, Petrol, Marine, and Multifuel Engines",
    icon: engineIcon,
  },
  {
    title: "Spare Parts",
    description: "Genuine spares, hoses, nozzles, and accessories",
    icon: sparesIcon,
  },
];

export const ProductCategories = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Our Product Range
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Complete agricultural solutions for all your farming needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-shadow cursor-pointer group"
            >
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <img 
                    src={category.icon} 
                    alt={category.title}
                    className="h-24 w-24 object-contain group-hover:scale-110 transition-transform"
                  />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {category.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <Link to="/products" className="flex items-center gap-2">
              View All Products
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
