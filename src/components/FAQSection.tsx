import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: "What products do you sell?",
      answer: "We sell a wide range of agricultural equipment including sprayers, pumps, diesel engines, spare parts, and power tools. Visit our Products page to see our complete catalog.",
    },
    {
      question: "Do you provide warranty on products?",
      answer: "Yes, all our products come with manufacturer warranty. The warranty period varies by product category. Please check the specific product details or contact us for more information.",
    },
    {
      question: "Do you offer after-sales service?",
      answer: "Absolutely! We provide comprehensive after-sales service including repairs, maintenance, and genuine spare parts. Our expert team is available to support you.",
    },
    {
      question: "Can I visit your store in Coimbatore?",
      answer: "Yes! We welcome customers to visit our store. We're located in Coimbatore, Tamil Nadu. Check our Contact page for address and operating hours.",
    },
    {
      question: "Do you deliver outside Coimbatore?",
      answer: "Yes, we deliver across Tamil Nadu and other states. Delivery charges and time may vary based on location. Contact us for specific delivery details.",
    },
    {
      question: "Are your spare parts genuine?",
      answer: "Yes, 100% genuine! We only stock authentic spare parts from trusted manufacturers. Quality and authenticity are our top priorities.",
    },
    {
      question: "How can I contact customer support?",
      answer: "You can reach us via phone at +91 9443600205, WhatsApp, or email. Visit our Contact page to send us a message directly.",
    },
    {
      question: "Do you offer bulk discounts for dealers?",
      answer: "Yes, we offer special pricing for dealers and bulk orders. Contact us to discuss dealer partnerships and wholesale pricing.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-[#f0fdf4] to-[#dcfce7]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#1E7A3C] mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#2E7D32] max-w-2xl mx-auto">
            Find answers to common questions about our products and services
          </p>
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-[#f0fdf4] rounded-xl border border-[#dcfce7] overflow-hidden"
            >
              <button
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-[#dcfce7] transition-colors"
                onClick={() => toggleFAQ(index)}
              >
                <span className="font-semibold text-[#1E7A3C] pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#2E7D32] transition-transform duration-300 flex-shrink-0 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-5 pt-2 text-[#2E7D32] leading-relaxed">
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

export default FAQSection;
