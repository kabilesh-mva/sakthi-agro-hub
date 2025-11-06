import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

export const LanguageToggle = () => {
  const toggleLanguage = () => {
    // In a real implementation, this would toggle between languages
    // For now, we'll just show a placeholder that demonstrates the functionality
    alert("Language toggle functionality would switch between English and Tamil");
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 border-white/30 text-white hover:bg-white/10 hover:text-white"
    >
      <Globe className="h-4 w-4" />
      <span>English</span>
      <span className="text-xs opacity-70">/ தமிழ்</span>
    </Button>
  );
};
