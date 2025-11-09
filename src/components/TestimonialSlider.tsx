import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Phone, MessageCircle, MapPin } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

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

// Simple carousel indicators component
const CarouselIndicators = ({ count, currentIndex }: { count: number; currentIndex: number }) => {
  return (
    <div className="flex justify-center space-x-2 mt-6">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          className={`h-2 w-2 rounded-full transition-all ${index === currentIndex ? 'bg-[#2E7D32] w-6' : 'bg-[#81C784]'}`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export const TestimonialSlider = () => {
  return (
    <section className="py-12 sm:py-16 bg-[#F1F8E9]">
      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div className="text-center mb-12 sm:mb-16 relative z-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4 relative z-10">
            What Our Farmers Say
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto relative z-10">
            Trusted by thousands of farmers across Tamil Nadu
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto mb-16 sm:mb-20">
          <Carousel opts={{ align: "start", loop: true, duration: 20 }} className="w-full">
            <CarouselContent className="-ml-4 sm:-ml-6">
              {testimonials.slice(0, 3).map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 sm:pl-6 basis-11/12 md:basis-1/2 lg:basis-1/3">
                  <div className="h-full">
                    <Card className="h-full p-6 sm:p-8 bg-white border border-[#81C784] hover:border-[#2E7D32] transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden group min-h-[300px] flex flex-col justify-between hover:transform hover:scale-[1.02]">
                      <CardContent className="p-0 flex flex-col items-center text-center relative z-10 flex-grow">
                        <div className="flex mb-4 justify-center gap-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-5 w-5 fill-yellow-40 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-sm sm:text-base text-[#333] mb-6 italic flex-grow flex items-center text-center font-sans">"{testimonial.text}"</p>
                        <div className="flex items-center gap-4 mt-6 w-full flex-col sm:flex-row sm:items-center justify-center sm:justify-start pt-4 border-t border-[#2E7D32]/10">
                          <Avatar className="h-12 w-12 sm:h-14 sm:w-14 border-2 border-[#2E7D32] flex-shrink-0 bg-[#E8F5E9]">
                            <AvatarImage src={testimonial.image} alt={testimonial.name} />
                            <AvatarFallback className="bg-[#E8F5E9] text-[#2E7D32] text-lg font-medium border-0">{testimonial.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="text-center sm:text-left mt-2 sm:mt-0 w-full sm:w-auto flex-1">
                            <p className="font-bold text-[#2E7D32] text-base sm:text-lg">{testimonial.name}</p>
                            <div className="flex items-center justify-center sm:justify-start gap-1 text-xs sm:text-sm text-[#66] mt-1">
                              <MapPin className="h-3 w-3" />
                              <span>{testimonial.location}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute top-1/2 left-[-60px] z-30 h-10 w-10 rounded-full bg-[#E8F5E9] hover:bg-[#2E7D32] hover:text-white transition-all duration-300 border border-[#81C784] flex items-center justify-center" />
            <CarouselNext className="absolute top-1/2 right-[-60px] z-30 h-10 w-10 rounded-full bg-[#E8F5E9] hover:bg-[#2E7D32] hover:text-white transition-all duration-300 border border-[#81C784] flex items-center justify-center" />
          </Carousel>
          <CarouselIndicators count={3} currentIndex={0} />
        </div>

        {/* New CTA Banner */}
        <div className="text-center py-8 sm:py-12 bg-gradient-to-r from-[#2E7D32] to-[#388E3C] rounded-xl shadow-lg">
          <div className="container mx-auto px-4 max-w-4xl">
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">Join 5,000+ Happy Farmers — Get Your Free Quote Today!</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="tel:+919443600205"
                className="inline-flex items-center justify-center gap-3 bg-white text-[#2E7D32] hover:bg-[#E8F5E9] px-6 py-4 rounded-xl font-bold text-base transition-all duration-300 w-full sm:w-auto shadow-lg hover:shadow-xl"
              >
                <Phone className="h-5 w-5" />
                <span>📞 Call Now</span>
              </a>
              <a
                href="https://wa.me/919443600205"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-[#25D366] text-white hover:bg-[#20ba5a] px-6 py-4 rounded-xl font-bold text-base transition-all duration-300 w-full sm:w-auto shadow-lg hover:shadow-xl"
              >
                <MessageCircle className="h-5 w-5" />
                <span>💬 WhatsApp to Quote</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
