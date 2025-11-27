import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, Phone, MessageCircle, MapPin } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

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
const CarouselIndicators = ({
  count,
  currentIndex,
}: {
  count: number;
  currentIndex: number;
}) => {
  return (
    <div className="flex justify-center space-x-2 mt-6 mb-4">
      {Array.from({ length: count }).map((_, index) => (
        <button
          key={index}
          className={`h-2 w-2 rounded-full transition-all ${
            index === currentIndex ? "bg-[#2E7D32] w-6" : "bg-[#81C784]"
          }`}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

export const TestimonialSlider = () => {
  const [currentIndex, setCurrentIndex] = React.useState(0);

  return (
    <div className="w-full max-w-4xl mx-auto py-12 sm:py-16">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-4xl"
        setApi={(api) => {
          if (api) {
            api.on("select", () => {
              setCurrentIndex(api.selectedScrollSnap());
            });
          }
        }}
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className="pl-2 md:pl-4">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-xl overflow-hidden h-full">
                <CardContent className="p-6 md:p-8 flex flex-col h-full">
                  <div className="flex items-center mb-4">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < testimonial.rating
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-gray-700 text-lg md:text-xl italic mb-6 flex-grow">
                    "{testimonial.text}"
                  </p>

                  <div className="flex items-center mt-auto pt-4 border-t border-gray-200">
                    <Avatar className="w-12 h-12 mr-4">
                      {testimonial.image ? (
                        <AvatarImage
                          src={testimonial.image}
                          alt={testimonial.name}
                        />
                      ) : null}
                      <AvatarFallback className="bg-green-100 text-green-800 font-bold">
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-600 text-sm flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-14 top-1/2 -translate-y-1/2 z-10" />
        <CarouselNext className="absolute -right-14 top-1/2 -translate-y-1/2 z-10" />
      </Carousel>
      <div className="mt-8">
        <CarouselIndicators
          count={testimonials.length}
          currentIndex={currentIndex}
        />
      </div>
    </div>
  );
};
