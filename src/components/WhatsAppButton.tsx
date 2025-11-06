import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WhatsAppButton = () => {
  const whatsappNumber = "919876543210"; // Replace with actual number
  const whatsappMessage = encodeURIComponent("Hello! I'm interested in your agricultural products.");
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50"
    >
      <Button
        size="lg"
        className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all bg-[#25D366] hover:bg-[#20ba5a] text-white"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </a>
  );
};
