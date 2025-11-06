import { Shield, Wrench, Clock, Award, CheckCircle, Users, Star, Phone, Package } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Users,
    title: "30+ Years Experience",
    description: "Serving farmers since 2012 with dedication and expertise",
    details: "With over three decades of experience in the agricultural industry, we understand the unique challenges farmers face. Our expertise ensures you get the right solutions for your farming needs.",
  },
  {
    icon: Shield,
    title: "Warranty Support",
    description: "Comprehensive warranty coverage on all products",
    details: "We stand behind our products with comprehensive warranty coverage. Our support team is always ready to assist you with any warranty claims or service needs.",
  },
  {
    icon: Wrench,
    title: "Expert Service",
    description: "Professional repair and maintenance by skilled technicians",
    details: "Our certified technicians provide professional repair and maintenance services. We use genuine parts and follow manufacturer guidelines to ensure optimal performance.",
  },
  {
    icon: Package,
    title: "Genuine Products",
    description: "100% authentic equipment and spare parts",
    details: "We only stock genuine products from trusted manufacturers. This ensures reliability, performance, and compatibility with your existing equipment.",
  },
];

const stats = [
  { value: "5,000+", label: "Happy Farmers Served", icon: Users },
  { value: "98%", label: "Customer Satisfaction", icon: Star },
  { value: "24/7", label: "Expert Support", icon: Phone },
  { value: "10,000+", label: "Genuine Products Delivered", icon: Package },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-12 sm:py-16 bg-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232E7D32' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Stats Section with Animated Count-Up */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-16 relative z-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center bg-[#E8F5E9] p-4 sm:p-6 rounded-xl backdrop-blur-sm relative overflow-hidden group border-white/20 hover:border-[#2E7D32]/30 transition-all duration-300 hover:shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-[#2E7D32] to-[#FF6F00] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2E7D32] mb-1 sm:mb-2 animate-pulse">{stat.value}</div>
              <div className="text-sm sm:text-[#33333] flex items-center justify-center gap-1 mt-1">
                <stat.icon className="h-4 w-4" />
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-8 sm:mb-12 relative z-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 sm:mb-4">
            Why Choose Sakthi Agro?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-3 sm:mb-6">
            Your trusted partner for quality agricultural solutions
          </p>
          <div className="inline-block bg-[#2E7D32] text-white px-4 sm:px-6 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold">
            Since 2012
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 relative z-20">
          {features.map((feature, index) => {
            // Alternate between green and white backgrounds for visual rhythm
            const isWhite = index % 2 === 0;
            return (
              <Card key={index} className={`${isWhite ? 'bg-white' : 'bg-[#F9F9F9]'} border-2 hover:border-[#2E7D32] transition-colors group cursor-pointer h-full relative overflow-hidden border-[#2E7D32] hover:shadow-lg hover:shadow-[#2E7D32]/20`}>
                <CardContent className="p-4 sm:p-6 text-center relative h-full flex flex-col justify-between z-10">
                  <div className="flex flex-col items-center justify-center flex-grow relative z-10">
                    <div className="mb-3 sm:mb-4 flex justify-center relative z-10">
                      <div className={`rounded-full ${isWhite ? 'bg-[#E8F5E9]' : 'bg-[#E8F5E9]/70'} p-3 sm:p-4 group-hover:bg-[#2E7D32] transition-colors duration-300 relative z-10`}>
                        <feature.icon className={`h-6 sm:h-8 w-6 sm:w-8 ${isWhite ? 'text-[#2E7D32]' : 'text-[#2E7D32]'} group-hover:text-[#FF6F00] transition-colors duration-300`} />
                      </div>
                    </div>
                    <h3 className={`text-lg sm:text-xl font-bold ${isWhite ? 'text-foreground' : 'text-[#2E7D32]'} mb-2 group-hover:text-[#2E7D32] transition-colors duration-300 relative z-10`}>
                      {feature.title}
                    </h3>
                    <p className={`text-sm ${isWhite ? 'text-muted-foreground' : 'text-[#333333]'} mb-2 relative z-10`}>
                      {feature.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
