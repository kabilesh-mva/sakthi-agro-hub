import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export const LanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className={`flex items-center gap-2 border-gray-300 bg-white text-gray-900 hover:bg-gray-100 hover:text-black ${language === 'ta' ? 'font-tamil' : ''}`}
    >
      <Globe className="h-4 w-4" />
      <span className={language === 'en' ? "font-bold" : "opacity-70"}>English</span>
      <span className="opacity-70">/</span>
      <span className={language === 'ta' ? "font-bold" : "opacity-70"}>தமிழ்</span>
    </Button>
  );
};
