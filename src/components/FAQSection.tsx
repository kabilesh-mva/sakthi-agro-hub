import { useState } from "react";
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
    answer: "We are open Monday to Saturday from 9:00 AM to 6:00 PM and on Sundays from 10:0 AM to 4:00 PM. Our expert support is available 24/7 for urgent service needs.",
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
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-br from-green-50 to-emerald-50" id="faq">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-12 sm:mb-16 relative z-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <HelpCircle className="h-8 w-8 text-[#2E7D32]" />
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">Frequently Asked Questions</h2>
          </div>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Common questions on sprayers, pumps, engines, and spare parts
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-[#2E7D32]/10 overflow-hidden transition-all duration-300 hover:shadow-md h-full flex flex-col cursor-pointer" onClick={() => toggleFAQ(index)}>
              <div className="p-5 flex-shrink-0 border-b border-[#2E7D32]/10">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-[#E8F5E9] rounded-lg text-[#2E7D32] flex-shrink-0">
                    <faq.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-base font-medium text-foreground line-clamp-2">{faq.question}</h3>
                </div>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out flex-grow ${activeIndex === index ? 'opacity-100' : 'opacity-0 h-0'}`}
              >
                <div className="px-5 py-4 text-sm text-muted-foreground">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
 );
};
