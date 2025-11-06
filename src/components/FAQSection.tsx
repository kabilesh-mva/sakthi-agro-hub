import { useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { HelpCircle, Tractor, Droplets, Gavel, Wrench, Users } from "lucide-react";

const faqData = [
  {
    question: "What types of agricultural equipment do you sell?",
    answer: "We specialize in sprayers, pumps, engines, and genuine spare parts for agricultural equipment. Our range includes battery sprayers, manual sprayers, power sprayers, diesel pumps, petrol pumps, submersible pumps, diesel engines, petrol engines, and a wide variety of spare parts.",
    icon: Tractor
  },
  {
    question: "Do you provide warranty on your products?",
    answer: "Yes, all our products come with comprehensive warranty coverage. We stand behind our products and our support team is always ready to assist you with any warranty claims or service needs.",
    icon: Wrench
  },
  {
    question: "What are your business hours?",
    answer: "We are open Monday to Saturday from 9:00 AM to 6:00 PM and on Sundays from 10:00 AM to 4:00 PM. Our expert support is available 24/7 for urgent service needs.",
    icon: HelpCircle
  },
  {
    question: "Do you offer service and maintenance?",
    answer: "Yes, we provide professional repair and maintenance services by skilled technicians. We use genuine parts and follow manufacturer guidelines to ensure optimal performance of your equipment.",
    icon: Gavel
  },
  {
    question: "How can I become a dealer?",
    answer: "We are always looking for reliable dealers. You can submit a dealer inquiry through our website, and our team will contact you with more details about the process and requirements.",
    icon: Users
  },
  {
    question: "Do you deliver products outside Coimbatore?",
    answer: "Yes, we offer pan-India delivery services. We have successfully serviced over 10,000 products across Tamil Nadu and other parts of India.",
    icon: Droplets
  },
  {
    question: "Can you deliver to my village?",
    answer: "Yes, we provide delivery services to villages across Tamil Nadu and other parts of India. Our logistics team ensures timely delivery to even remote locations.",
    icon: Tractor
  },
  {
    question: "Do you provide doorstep service?",
    answer: "Yes, we offer doorstep service for equipment maintenance and repair. Our technicians will visit your location to service your equipment at your convenience.",
    icon: Gavel
  }
];

export const FAQSection = () => {
  return (
    <section className="py-16 sm:py-20 bg-background" id="faq">
      <div className="container mx-auto px-4 max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12 sm:mb-16 relative z-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="h-8 w-8 text-[#2E7D32]" />
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Frequently Asked Questions</h2>
          </div>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Common questions on sprayers, pumps, engines, and spare parts
          </p>
        </div>
        <div className="space-y-4 max-w-4xl mx-auto">
          {faqData.map((faq, index) => (
            <Accordion type="single" collapsible key={index}>
              <AccordionItem value={`item-${index}`} className="border rounded-xl p-6 bg-card hover:shadow-lg transition-all duration-300 border-[#2E7D32]/20 hover:border-[#2E7D32]/40 overflow-hidden">
                <AccordionTrigger className="text-left text-lg font-medium text-foreground hover:text-[#2E7D32] flex items-center gap-3 text-xl py-2">
                  <div className="p-2 bg-[#E8F5E9] rounded-lg text-[#2E7D32] flex-shrink-0">
                    <faq.icon className="h-5 w-5" />
                  </div>
                  <span className="text-left">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pt-4 pb-2 px-12 text-lg leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
};
