import { MessageCircle, Check, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const WhatsAppButton = () => {
  const whatsappNumber = "919443600205"; // Replace with actual number
  const whatsappMessage = encodeURIComponent(
    "Hello! I'm interested in your agricultural products."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <div className="text-xs text-white/80 bg-black/30 px-2 py-1 rounded-full flex items-center gap-1 animate-pulse">
        <span>Replies in under 5 minutes</span>
        <CheckCheck size={12} className="text-green-400" />
      </div>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative"
      >
        <Button
          size="lg"
          className="rounded-full h-12 w-12 sm:h-14 sm:w-14 shadow-lg hover:shadow-xl transition-all bg-[#25D366] hover:bg-[#20ba5a] text-white animate-pulse-slow"
        >
          <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6" />
          {/* Verified badge */}
          <div className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 shadow-md">
            <Check size={10} className="text-[#25D366]" />
          </div>
        </Button>
      </a>
    </div>
  );
};
