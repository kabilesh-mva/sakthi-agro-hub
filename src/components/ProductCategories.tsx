import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sprout, Droplets, Gavel, Wrench } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const categories = [
  {
    title: "Sprayers & Atomizers",
    description: "Battery, Manual, Knapsack, Power, and HTP Sprayers",
    icon: Sprout,
    badge: "Best Seller",
    badgeColor: "bg-orange-100 text-orange-800",
    accentColor: "border-orange-500", // Orange accent for sprayers
  },
  {
    title: "Irrigation Pumps",
    description: "Diesel, Petrol, Submersible, and Centrifugal Pumps",
    icon: Droplets,
    badge: "New Arrival",
    badgeColor: "bg-blue-100 text-blue-800",
    accentColor: "border-blue-500", // Blue accent for pumps
  },
  {
    title: "Diesel & Petrol Engines",
    description: "Reliable and powerful engines for every farm need",
    icon: Gavel,
    badge: "Popular",
    badgeColor: "bg-red-100 text-red-800",
    accentColor: "border-red-500", // Red accent for engines
  },
  {
    title: "Genuine Spare Parts",
    description: "Genuine spares, hoses, nozzles, and accessories",
    icon: Wrench,
    badge: "Essential",
    badgeColor: "bg-yellow-100 text-yellow-800",
    accentColor: "border-yellow-500", // Yellow accent for spare parts
  },
];

export const ProductCategories = () => {
  return (
    <section className="py-12 sm:py-16 bg-background overflow-visible">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
            Our Product Range
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Complete agricultural solutions for all your farming needs
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 overflow-visible"
        >
          {categories.map((category, index) => (
            <div key={index} className="group relative overflow-visible">
              <Card
                className={`rounded-2xl shadow-md transition-all duration-300 cursor-pointer group h-full flex-col border-2 ${category.accentColor} hover:shadow-lg hover:shadow-[#2E7D32]/40 hover:border-[#2E7D32] relative hover:z-10 origin-center transform hover:translateY(-6px)`}
              >
                <CardContent className="p-4 sm:p-5 md:p-6 flex-col items-center text-center flex-grow relative overflow-visible transition-transform duration-300 group-hover:scale-104">
                  <div
                    className={`absolute top-3 right-3 sm:top-4 sm:right-4 ${category.badgeColor} text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-full z-20`}
                  >
                    {category.badge}
                  </div>
                  <div className="p-3 sm:p-4 bg-green-50 rounded-full group-hover:bg-[#2E7D32] transition-colors duration-300 mb-3 sm:mb-4 relative z-10 flex items-center justify-center">
                    <category.icon className="h-8 sm:h-10 w-8 sm:w-10 text-[#2E7D32] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-[#2E7D32] transition-colors duration-300 text-center">
                    {category.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-0 flex-grow group-hover:text-[#2E7D32] transition-colors duration-300 text-center">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex justify-center mt-10"
        >
          <Button
            size="sm"
            className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-lg transition text-sm sm:text-base"
            asChild
          >
            <Link to="/products" className="flex items-center gap-2 sm:gap-3">
              Browse All Products
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};
