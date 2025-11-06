import { Shield, Wrench, Clock, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Clock,
    title: "30+ Years Experience",
    description: "Serving farmers since 2012 with dedication and expertise",
  },
  {
    icon: Shield,
    title: "Warranty Support",
    description: "Comprehensive warranty coverage on all products",
  },
  {
    icon: Wrench,
    title: "Expert Service",
    description: "Professional repair and maintenance by skilled technicians",
  },
  {
    icon: Award,
    title: "Genuine Products",
    description: "100% authentic equipment and spare parts",
  },
];

export const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Why Choose Sakthi Agro?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your trusted partner for quality agricultural solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="border-2 hover:border-primary transition-colors">
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-4">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
