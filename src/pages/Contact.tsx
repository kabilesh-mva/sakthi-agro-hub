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
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import FAQSection from "@/components/FAQSection";

const Contact = () => {
  const { t } = useLanguage();
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
      // Format the message for WhatsApp
      const whatsappMessage = `*New Enquiry from Website*%0A%0A` +
        `*Name:* ${formData.name}%0A` +
        `*Email:* ${formData.email}%0A` +
        `*Phone:* ${formData.phone}%0A` +
        `*Message:* ${formData.message}`;

      // WhatsApp URL with the formatted message
      const whatsappUrl = `https://wa.me/919443600205?text=${whatsappMessage}`;

      // Open WhatsApp in a new window
      window.open(whatsappUrl, '_blank');

      toast({
        title: "Redirecting to WhatsApp",
        description: "Your enquiry will be sent via WhatsApp.",
      });
      
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to open WhatsApp. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      <div className="pt-14 md:pt-16 lg:pt-20">

      {/* Hero Section */}
      <section className="py-12 sm:py-16 bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-6">
              {t("contact_hero_title")}
            </h1>
            <p className="text-lg sm:text-xl opacity-90">
              {t("contact_hero_subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-8 sm:py-16 bg-gradient-to-b from-[#f0fdf4] to-[#dcfce7]">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">{t("contact_section_title")}</h2>
            <p className="text-lg text-muted-foreground">
              {t("contact_section_desc")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            <div className="bg-[#f0fdf4] p-6 rounded-xl shadow-sm border border-[#dcfce7] text-center">
              <Phone className="h-10 w-10 text-[#2E7D32] mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">{t("contact_info_phone")}</h3>
              <p className="text-muted-foreground">
                {t("contact_info_phone_desc")}
              </p>
              <a
                href="tel:+919443600205"
                className="text-[#2E7D32] font-bold hover:underline mt-2 block"
              >
                +91 94436 00205
              </a>
            </div>

            <div className="bg-[#f0fdf4] p-6 rounded-xl shadow-sm border border-[#dcfce7] text-center">
              <Mail className="h-10 w-10 text-[#2E7D32] mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">{t("contact_info_email")}</h3>
              <p className="text-muted-foreground">{t("contact_info_email_desc")}</p>
              <a
                href="mailto:info@sakthiagro.com?subject=Inquiry%20from%20Website&body=Hello%20Sakthi%20Agro%20Team%2C%0A%0AI%20would%20like%20to%20inquire%20about..."
                className="text-[#2E7D32] font-bold hover:underline mt-2 block"
              >
                info@sakthiagro.com
              </a>
            </div>

            <div className="bg-[#f0fdf4] p-6 rounded-xl shadow-sm border border-[#dcfce7] text-center">
              <Clock className="h-10 w-10 text-[#2E7D32] mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">{t("contact_info_hours")}</h3>
              <p className="text-muted-foreground">{t("contact_info_hours_desc")}</p>
              <p className="text-[#2E7D32] font-bold mt-2">
                {t("contact_info_timing")}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <div className="lg:order-1 flex flex-col">
              <h2 className="text-2xl font-bold mb-6">{t("contact_form_title")}</h2>
              <Card className="h-full flex flex-col">
                <CardContent className="p-6 sm:p-8 flex-grow flex flex-col">
                  <form onSubmit={handleSubmit} className="space-y-4 flex-grow flex flex-col">
                    <div>
                      <Input
                        placeholder={t("contact_name_placeholder")}
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
                        placeholder={t("contact_email_placeholder")}
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
                        placeholder={t("contact_phone_placeholder")}
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div className="flex-grow">
                      <Textarea
                        placeholder={t("contact_message_placeholder")}
                        rows={4}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        required
                        className="h-full min-h-[120px]"
                      />
                    </div>
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full mt-auto"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t("contact_sending")}
                        </>
                      ) : (
                        t("contact_submit_btn")
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Map Section */}
            <div className="lg:order-2 flex flex-col">
              <h2 className="text-2xl font-bold mb-6">{t("contact_location_title")}</h2>
              <div className="rounded-xl overflow-hidden shadow-lg flex-grow flex flex-col">
                <div className="h-80 lg:h-auto lg:flex-grow">
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
              </div>
              <div className="mt-4 p-4 bg-[#f0fdf4] rounded-lg border border-[#dcfce7]">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-[#2E7D32] mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold">Sakthi Agro</h3>
                    <p className="text-sm text-muted-foreground">
                      Thulasi Raja Complex, Kunnanan Konar Street, Kattor, Near Balu Mess
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <FAQSection />
      </div>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Contact;
