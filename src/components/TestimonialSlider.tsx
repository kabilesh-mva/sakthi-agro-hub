import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Shield, Phone, MessageCircle, MapPin } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Rajesh Kumar",
    location: "Coimbatore, Tamil Nadu",
    text: "Sakthi Agro has been my trusted partner for agricultural equipment for over 5 years. Their genuine spare parts and expert service keep my farm running efficiently.",
    rating: 5,
    image: "",
  },
  {
    name: "Mohan Raj",
    location: "Tirupur, Tamil Nadu",
    text: "The quality of their diesel engines is exceptional. The warranty support and expert service team have saved me countless hours during harvest season.",
    rating: 5,
    image: "",
  },
  {
    name: "Vijay Sethupathi",
    location: "Erode, Tamil Nadu",
    text: "Their sprayers are top-notch quality and the customer service is excellent. I've recommended them to all my fellow farmers in the area.",
    rating: 5,
    image: "",
  },
  {
    name: "Senthil Kumar",
    location: "Salem, Tamil Nadu",
    text: "The genuine spare parts availability is what sets them apart. No more waiting for weeks to get my equipment fixed. Highly recommend!",
    rating: 5,
    image: "",
  },
  {
    name: "Arjun Singh",
    location: "Madurai, Tamil Nadu",
    text: "Best agricultural equipment service center in the region. Quick response and reliable solutions. Their team knows their products inside out.",
    rating: 5,
    image: "",
  },
  {
    name: "Kumaravel S",
    location: "Chennai, Tamil Nadu",
    text: "I've tried multiple suppliers, but Sakthi Agro stands out for their quality products and after-sales service. Worth every penny!",
    rating: 5,
    image: "",
  },
];

export const TestimonialSlider = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#E8F5E9] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="absolute top-0 left-0 w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232E7D32' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-6xl">
        <div className="text-center mb-12 sm:mb-16 relative z-20">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-6 opacity-10">
            <Shield className="h-16 w-16 sm:h-24 sm:w-24 text-[#2E7D32]" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 relative z-10">
            What Our Farmers Say
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto relative z-10">
            Trusted by thousands of farmers across Tamil Nadu
          </p>
        </div>
        <Carousel opts={{ align: "start", loop: true, duration: 20 }} className="w-full max-w-6xl mx-auto relative z-20 mb-16 sm:mb-20">
          <CarouselContent className="-ml-4 sm:-ml-6">
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="pl-4 sm:pl-6 basis-11/12 md:basis-1/2 lg:basis-1/3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                >
                  <Card className="h-full p-6 sm:p-8 bg-white border-2 hover:border-[#2E7D32] transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden group min-h-[300px] flex-col justify-between border-[#2E7D32]/30 hover:border-[#2E7D32]">
                    <div className="absolute top-0 right-0 opacity-5 group-hover:opacity-10 transition-opacity duration-30">
                      <Shield className="h-16 w-16 sm:h-20 sm:w-20 text-[#2E7D32]" />
                    </div>
                    <CardContent className="p-0 flex-col items-center text-center relative z-10 flex-grow group-hover:scale-[1.01] transition-transform duration-300">
                      <div className="flex mb-4 justify-center gap-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-40 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm sm:text-base text-muted-foreground mb-6 italic flex-grow">"{testimonial.text}"</p>
                      <div className="flex items-center gap-4 mt-auto w-full flex-col sm:flex-row sm:items-center justify-center sm:justify-start pt-4 border-t border-[#2E7D32]/10">
                        <Avatar className="h-14 w-14 sm:h-16 sm:w-16 border-2 border-[#2E7D32] flex-shrink-0">
                          <AvatarImage src={testimonial.image} alt={testimonial.name} />
                          <AvatarFallback className="bg-[#E8F5E9] text-[#2E7D32] text-lg">{testimonial.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="text-center sm:text-left mt-2 sm:mt-0 w-full sm:w-auto flex-shrink">
                          <p className="font-bold text-foreground text-base sm:text-lg">{testimonial.name}</p>
                          <div className="flex items-center justify-center sm:justify-start gap-1 text-xs sm:text-sm text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3" />
                            <span>{testimonial.location}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex bg-[#2E7D32] hover:bg-[#1B5E20] border-0 absolute top-1/2 left-4 z-30 h-10 w-10" />
          <CarouselNext className="hidden md:flex bg-[#2E7D32] hover:bg-[#1B5E20] border-0 absolute top-1/2 right-4 z-30 h-10 w-10" />
        </Carousel>
        
        {/* Enhanced CTA after testimonials */}
        <div className="text-center relative z-20 mb-12 sm:mb-16">
          <div className="bg-gradient-to-r from-[#2E7D32] via-[#388E3C] to-[#FFB200] p-8 sm:p-10 rounded-2xl max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bS0zMC00di00aDJ2NGg0djJoLTR2NGgtMnYtNGgtNHYtMmgyem0wIDM0di00aDJ2NGg0djJoLTR2NGgtMnYtNGgtNHYtMmgyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6"
              >
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">Join 5,000+ Happy Farmers</h3>
                <p className="text-white/90 text-lg mb-6 max-w-2xl mx-auto">Get your quote today and experience our premium agricultural solutions!</p>
                <p className="text-white/80 text-sm mb-6">We'll respond instantly on WhatsApp or call you back within 10 minutes.</p>
              </motion.div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.a
                  href="tel:+919443600205"
                  className="inline-flex items-center justify-center gap-3 bg-white text-[#2E7D32] hover:bg-[#E8F5E9] px-6 py-4 rounded-xl font-bold text-base transition-all duration-300 w-full sm:w-auto shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Phone className="h-5 w-5" />
                  <span>📞 Call Now</span>
                </motion.a>
                <motion.a
                  href="https://wa.me/919443600205"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white hover:bg-[#20ba5a] px-6 py-4 rounded-xl font-bold text-base transition-all duration-300 w-full sm:w-auto shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>💬 WhatsApp to Get Quote</span>
                </motion.a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
