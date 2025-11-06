import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wrench, Shield, Package, Clock } from "lucide-react";

const services = [
  {
    icon: Wrench,
    title: "Repair & Maintenance",
    description: "Expert repair services for all types of agricultural equipment and machinery",
    features: [
      "On-site and workshop repairs",
      "Skilled technicians",
      "Quick turnaround time",
      "Preventive maintenance",
    ],
  },
  {
    icon: Shield,
    title: "Warranty Support",
    description: "Comprehensive warranty coverage on all products with dedicated support",
    features: [
      "Manufacturer warranty",
      "Extended warranty options",
      "Hassle-free claims",
      "Replacement support",
    ],
  },
  {
    icon: Package,
    title: "Genuine Spare Parts",
    description: "Wide range of authentic spare parts for all major brands",
    features: [
      "OEM quality parts",
      "Competitive pricing",
      "Quick availability",
      "Bulk ordering options",
    ],
  },
  {
    icon: Clock,
    title: "Annual Maintenance",
    description: "Regular servicing contracts to keep your equipment running smoothly",
    features: [
      "Scheduled maintenance",
      "Priority service",
      "Cost-effective plans",
      "Performance optimization",
    ],
  },
];

const Services = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl opacity-90">
              Comprehensive support for all your agricultural equipment needs
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-8">
                  <div className="mb-4">
                    <div className="rounded-full bg-primary/10 p-4 inline-block">
                      <service.icon className="h-10 w-10 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{service.title}</h3>
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, featureIdx) => (
                      <li key={featureIdx} className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-accent" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-xl mb-6">Need service support?</p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="tel:+919876543210">Call for Service</a>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="/contact">Request Callback</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Services;
