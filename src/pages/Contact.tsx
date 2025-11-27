import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { FAQSection } from "@/components/FAQSection";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("inquiries").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });

      if (error) throw error;

      toast({
        title: "Message Sent!",
        description: "We'll get back to you shortly.",
      });
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-6">
              Contact Us
            </h1>
            <p className="text-lg sm:text-xl opacity-90">
              Get in touch with us for inquiries and support
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-8 sm:py-16 bg-[#F9F9F9]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
            <p className="text-lg text-muted-foreground">
              We're here to help you with any questions or inquiries
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#2E7D32]/10 text-center">
              <Phone className="h-10 w-10 text-[#2E7D32] mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Phone</h3>
              <p className="text-muted-foreground">
                Call us for immediate assistance
              </p>
              <a
                href="tel:+919443600205"
                className="text-[#2E7D32] font-bold hover:underline mt-2 block"
              >
                +91 94436 00205
              </a>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#2E7D32]/10 text-center">
              <Mail className="h-10 w-10 text-[#2E7D32] mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Email</h3>
              <p className="text-muted-foreground">Send us an email</p>
              <a
                href="mailto:info@sakthiagro.com"
                className="text-[#2E7D32] font-bold hover:underline mt-2 block"
              >
                info@sakthiagro.com
              </a>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#2E7D32]/10 text-center">
              <Clock className="h-10 w-10 text-[#2E7D32] mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Business Hours</h3>
              <p className="text-muted-foreground">We're available</p>
              <p className="text-[#2E7D32] font-bold mt-2">
                Mon-Sat: 8AM - 8PM
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="lg:order-1">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <Card className="h-full">
                <CardContent className="p-6 sm:p-8">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Input
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Input
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <Textarea
                        placeholder="Your Message"
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Map Section */}
            <div className="lg:order-2">
              <h2 className="text-2xl font-bold mb-6">Find Our Location</h2>
              <div className="rounded-xl overflow-hidden shadow-lg h-80">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.411436852982!2d76.96285687504522!3d11.00725389155468!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba8597b1fcfe0b3%3A0x640b518711d823a1!2sSakthi%20agro!5e0!3m2!1sen!2sin!4v1762419961612!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Sakthi Agro Location Map"
                ></iframe>
              </div>
              <div className="mt-4 p-4 bg-[#F9F9F9] rounded-lg border border-[#2E7D32]/10">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#2E7D32] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold">Sakthi Agro</h3>
                    <p className="text-sm text-muted-foreground">
                      123 Agriculture Complex, Coimbatore Road, Tamil Nadu
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection />

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Contact;
