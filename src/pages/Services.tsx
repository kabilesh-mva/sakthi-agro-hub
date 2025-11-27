import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InView } from "@/components/ui/in-view";
import { servicesData } from "@/data/services";
import { Service } from "@/types/service";
import { ServiceIcon } from "@/components/ServiceIcons";
import { useEffect } from "react";

// Pre-define the SVG pattern to avoid inline construction
const backgroundPattern = `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`;

const Services = () => {
  // Map service IDs to icon types for the animated icons
  const getServiceIconType = (id: string) => {
    switch (id) {
      case "repair-maintenance":
        return "repair";
      case "warranty-support":
        return "warranty";
      case "spare-parts":
        return "parts";
      case "annual-maintenance":
        return "maintenance";
      default:
        return "repair";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      <Navigation />

      {/* Enhanced Hero Section with Animated Gradient */}
      <section
        className="py-12 sm:py-16 bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] text-primary-foreground relative overflow-hidden"
        aria-labelledby="services-hero-title"
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2E7D32] via-[#3FA34D] to-[#7BC67E] bg-[length:400%_400%] animate-gradient-move"></div>
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: backgroundPattern }}
          aria-hidden="true"
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center" role="banner">
            <h1
              id="services-hero-title"
              className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-green-200"
            >
              Our Services
            </h1>
            <p
              className="text-lg sm:text-xl opacity-90"
              aria-describedby="services-hero-description"
            >
              Comprehensive support for all your agricultural equipment needs
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12 sm:py-20" aria-labelledby="services-grid-title">
        <div className="container mx-auto px-4">
          <h2 id="services-grid-title" className="sr-only">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {servicesData.map((service: Service, idx: number) => (
              <InView
                key={service.id}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: idx * 0.1,
                }}
                viewOptions={{ margin: "0px 0px -100px 0px" }}
              >
                <div className="service-card-wrapper" data-service={service.id}>
                  <Card
                    className="service-card hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg bg-card/90 backdrop-blur-sm rounded-xl overflow-hidden group"
                    role="region"
                    aria-labelledby={`service-title-${idx}`}
                  >
                    <CardContent className="p-8 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-50/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10">
                        <div className="mb-6 flex justify-center">
                          <div
                            className="rounded-full bg-gradient-to-br from-primary/20 to-primary/10 p-5 inline-flex items-center justify-center shadow-inner border border-primary/20 group-hover:shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 transform"
                            aria-hidden="true"
                          >
                            <ServiceIcon
                              type={getServiceIconType(service.id)}
                              size={56}
                            />
                          </div>
                        </div>
                        <h3
                          id={`service-title-${idx}`}
                          className="text-2xl font-bold mb-3 text-center text-foreground group-hover:text-primary transition-colors duration-300"
                        >
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 text-center">
                          {service.description}
                        </p>
                        <ul
                          className="space-y-2 mt-6"
                          aria-label={`${service.title} features`}
                        >
                          {service.features.map((feature) => (
                            <li
                              key={feature.id}
                              className="flex items-center gap-3 p-3 hover:bg-accent/40 rounded-lg transition-all duration-200 hover:translate-x-2 group-hover:bg-primary/5 group-hover:rounded-xl group-hover:shadow-sm group-hover:border-l-2 group-hover:border-primary/50"
                            >
                              <div
                                className="h-3 w-3 rounded-full bg-primary flex-shrink-0"
                                aria-hidden="true"
                              />
                              <span className="text-sm">{feature.text}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </InView>
            ))}
          </div>

          <InView
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.3 }}
          >
            <div
              className="text-center mt-16 p-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl backdrop-blur-sm border border-green-100 shadow-lg"
              role="complementary"
              aria-labelledby="contact-options-title"
            >
              <h3
                id="contact-options-title"
                className="text-xl mb-6 font-semibold text-foreground"
              >
                Need service support?
              </h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Button
                  size="lg"
                  asChild
                  className="bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-70 hover:to-emerald-800 text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-green-500/30 transform hover:-translate-y-0.5 transition-all duration-200 hover:scale-105 relative overflow-hidden group"
                >
                  <a
                    href="tel:+919443600205"
                    className="flex items-center gap-2 relative z-10"
                  >
                    <span className="animate-pulse">📞</span> Call for Service
                  </a>
                  <div className="absolute inset-0 bg-gradient-to-r from-green-700 to-emerald-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-green-600 text-green-70 hover:bg-green-50 hover:shadow-lg hover:shadow-green-500/20 transform hover:-translate-y-0.5 transition-all duration-200 hover:scale-105 relative overflow-hidden group"
                >
                  <a
                    href="/contact"
                    className="flex items-center gap-2 relative z-10"
                  >
                    <span className="animate-spin">🔄</span> Request Callback
                  </a>
                  <div className="absolute inset-0 bg-green-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </div>
            </div>
          </InView>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Services;
