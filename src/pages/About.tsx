import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Target, Lightbulb } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">About Sakthi Agro</h1>
            <p className="text-xl opacity-90">
              Empowering farmers with reliable agricultural solutions since 2012
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Our Story</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Sakthi Agro was founded with a vision to provide farmers with high-quality agricultural equipment and exceptional service. Over the years, we have built a reputation for reliability, expertise, and customer satisfaction.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                With over a decade of experience, we have become a trusted name in the agricultural equipment industry, serving farmers, dealers, and agricultural businesses across the region.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Our commitment to quality, coupled with our comprehensive after-sales service and genuine spare parts, has made us the preferred choice for agricultural solutions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card>
              <CardContent className="p-8 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-4">
                    <Target className="h-10 w-10 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Quality</h3>
                <p className="text-muted-foreground">
                  We provide only genuine, high-quality products that deliver lasting performance.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-4">
                    <Users className="h-10 w-10 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Customer First</h3>
                <p className="text-muted-foreground">
                  Your satisfaction is our priority. We go above and beyond to serve you.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="rounded-full bg-primary/10 p-4">
                    <Lightbulb className="h-10 w-10 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">Innovation</h3>
                <p className="text-muted-foreground">
                  We continuously adapt to bring you the latest in agricultural technology.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default About;
