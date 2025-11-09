import { Card, CardContent } from "@/components/ui/card";
import { Shield, Package, CheckCircle, Star } from "lucide-react";
import { motion } from "framer-motion";

export const GreatQualityProducts = () => {
  const qualityFeatures = [
    {
      icon: Shield,
      title: "Quality Assured",
      description: "Every product undergoes rigorous quality testing before delivery",
    },
    {
      icon: Package,
      title: "Genuine Parts",
      description: "Only authentic and genuine spare parts from trusted manufacturers",
    },
    {
      icon: CheckCircle,
      title: "Certified Standards",
      description: "All products meet international quality and safety standards",
    },
    {
      icon: Star,
      title: "Trusted Brands",
      description: "We partner with leading manufacturers for superior quality",
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-green-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2E7D32] mb-3 sm:mb-4">
            Great Quality Products
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            We ensure the highest quality standards for all our agricultural products and equipment
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
        >
          {qualityFeatures.map((feature, index) => (
            <div key={index} className="group relative overflow-visible">
              <Card 
                className="rounded-2xl shadow-md transition-all duration-300 cursor-pointer h-full flex-col border-2 border-[#2E7D32] hover:shadow-lg hover:shadow-[#2E7D32]/40 hover:border-[#1B5E20] relative hover:z-10 origin-center transform hover:translateY(-6px)"
              >
                <CardContent className="p-6 flex flex-col items-center text-center flex-grow relative overflow-visible transition-transform duration-300 group-hover:scale-104">
                  <div className="p-4 bg-[#E8F5E9] rounded-full group-hover:bg-[#2E7D32] transition-colors duration-300 mb-4 relative z-10 flex items-center justify-center">
                    <feature.icon className="h-10 w-10 text-[#2E7D32] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2 group-hover:text-[#2E7D32] transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-0 flex-grow group-hover:text-[#2E7D32] transition-colors duration-300 text-center">
                    {feature.description}
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
          className="bg-white rounded-2xl shadow-lg p-8 border border-[#2E7D32]/20"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3">
                Our Commitment to Quality
              </h3>
              <p className="text-base text-muted-foreground mb-4">
                At Sakthi Agro, we believe that quality is the foundation of trust. Every product we offer 
                is carefully selected and tested to ensure it meets the highest standards of performance, 
                durability, and safety. Our commitment to quality ensures that farmers get reliable 
                equipment that enhances productivity and reduces downtime.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm">100% Authentic Products</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Warranty Protection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Expert Support</span>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <img 
                src="/src/assets/Sakthi agro logo1.png" 
                alt="Sakthi Agro Quality Products" 
                className="max-w-full h-auto rounded-lg shadow-md w-64"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
