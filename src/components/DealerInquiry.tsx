import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Users, Phone, User, Building } from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";

export const DealerInquiry = () => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    businessName: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
    setFormData({ name: "", phone: "", businessName: "", message: "" });
    // Redirect to WhatsApp with pre-filled message
    window.open(
      `https://wa.me/919443600205?text=Hello! I'm interested in becoming a dealer. My name is ${formData.name}, business name is ${formData.businessName}, and my phone number is ${formData.phone}. ${formData.message}`,
      "_blank"
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white"
          variant="outline"
          size="lg"
        >
          <Users className="h-4 w-4 mr-2" />
          {t("dealer_btn")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-[#2E7D32]">
            <Users className="h-6 w-6" />
            {t("dealer_title")}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label
              htmlFor="name"
              className="text-sm font-medium text-foreground"
            >
              {t("dealer_name_label")}
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-[#2E7D32]/50" />
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder={t("dealer_name_label")}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="businessName"
              className="text-sm font-medium text-foreground"
            >
              {t("dealer_business_label")}
            </label>
            <div className="relative">
              <Building className="absolute left-3 top-3 h-4 w-4 text-[#2E7D32]/50" />
              <Input
                id="businessName"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                placeholder={t("dealer_business_label")}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium text-foreground"
            >
              {t("dealer_phone_label")}
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-[#2E7D32]/50" />
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={t("dealer_phone_label")}
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label
              htmlFor="message"
              className="text-sm font-medium text-foreground"
            >
              {t("dealer_message_label")}
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-3 h-4 w-4 text-[#2E7D32]/50" />
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder={t("dealer_message_label")}
                className="pl-10 min-h-[100px]"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white mt-4"
          >
            {t("dealer_submit_btn")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
