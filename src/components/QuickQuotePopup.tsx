import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Quote, Phone, User, Package } from "lucide-react";

export const QuickQuotePopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the data to the backend
    console.log("Quote request submitted:", formData);
    setIsOpen(false);
    setFormData({ name: "", phone: "", message: "" });
    // Show success message or redirect to WhatsApp
    window.open(`https://wa.me/91944360205?text=Hello! I'm interested in your products. My name is ${formData.name} and my phone number is ${formData.phone}. ${formData.message}`, '_blank');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-24 right-6 z-50 bg-[#FF6F00] hover:bg-[#E65100] text-white shadow-lg rounded-full px-4 py-2 flex items-center gap-2 sm:hidden md:hidden lg:hidden xl:hidden 2xl:hidden" size="sm">
          <Quote className="h-4 w-4" />
          <span className="hidden sm:inline">Get Quote</span>
          <span className="sm:hidden">Quote</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl font-bold text-[#2E7D32]">
            <Quote className="h-6 w-6" />
            Quick Quote Request
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-[#2E7D32]/50" />
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone</label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-[#2E7D32]/50" />
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your Phone Number"
                className="pl-10"
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
            <div className="relative">
              <Package className="absolute left-3 top-3 h-4 w-4 text-[#2E7D32]/50" />
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="What products are you interested in?"
                className="pl-10 min-h-[100px]"
              />
            </div>
          </div>
          <Button type="submit" className="w-full bg-[#2E7D32] hover:bg-[#1B5E20] text-white mt-4">Send Quote Request</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
