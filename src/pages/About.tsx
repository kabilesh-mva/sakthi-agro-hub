import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import {
  Users,
  Target,
  Lightbulb,
  Award,
  Leaf,
  Heart,
  CheckCircle,
  MapPin,
  Star,
  Calendar,
  TrendingUp,
  Truck,
  Zap,
  ShieldCheck,
  Globe,
  Camera,
  Quote,
  User,
  Phone,
  MessageCircle,
} from "lucide-react";
import { TestimonialSlider } from "@/components/TestimonialSlider";
import MicroTrustStrip from "@/components/MicroTrustStrip";

// Import the images we need
import founderImage from "/src/assets/hero-farming.jpg";
import shopImage from "/src/assets/hero-farming3.jpg";
import workshopImage from "/src/assets/hero-farming4.jpg";
import customerImage1 from "/src/assets/hero-farming.jpg";
import customerImage2 from "/src/assets/hero-farming3.jpg";
import teamImage1 from "/src/assets/hero-farming4.jpg";
import teamImage2 from "/src/assets/hero-farming.jpg";
import teamImage3 from "/src/assets/hero-farming4.jpg";

const About = () => {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState<Record<string, boolean>>({});
  const [animatedStats, setAnimatedStats] = useState({
    farmers: 0,
    products: 0,
    engineers: 0,
    rating: 0,
  });

  // Mouse position for parallax effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Refs for animations
  const heroRef = useRef(null);
  const founderRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const statsRef = useRef(null);
  const timelineRef = useRef(null);
  const teamRef = useRef(null);
  const testimonialsRef = useRef(null);
  const contactRef = useRef(null);
  const mapRef = useRef(null);

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation for stats counter and timeline
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));

            // Animate stats when they come into view
            if (entry.target.id === "stats") {
              setTimeout(() => {
                setAnimatedStats({
                  farmers: 5000,
                  products: 10000,
                  engineers: 12,
                  rating: 4.9,
                });
              }, 30);
            }

            // Animate timeline when it comes into view
            if (entry.target.id === "timeline") {
              // Get the timeline line element and animate it
              const timelineLines = document.querySelectorAll(".timeline-line");
              timelineLines.forEach((line) => {
                // Cast to SVGLineElement to access SVG properties
                const svgLine = line as SVGLineElement;
                const length = svgLine.getTotalLength?.() || 0;
                svgLine.style.strokeDasharray = `${length}`;
                svgLine.style.strokeDashoffset = `${length}`;

                // Trigger the animation
                setTimeout(() => {
                  svgLine.style.transition = "stroke-dashoffset 2s ease-in-out";
                  svgLine.style.strokeDashoffset = "0";
                }, 100);
              });
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = [
      heroRef.current,
      founderRef.current,
      storyRef.current,
      valuesRef.current,
      statsRef.current,
      timelineRef.current,
      teamRef.current,
      testimonialsRef.current,
      mapRef.current,
    ];

    elements.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Stats data
  const stats = [
    { value: "5k+", label: t("about_stat_1_label"), icon: Users },
    { value: "10k+", label: t("about_stat_2_label"), icon: TrendingUp },
    { value: "12+", label: t("about_stat_3_label"), icon: Users },
    { value: "4.9/5", label: t("about_stat_4_label"), icon: Star },
    { value: "Pan-India", label: t("about_stat_5_label"), icon: Truck },
    { value: "ISO", label: t("about_stat_6_label"), icon: ShieldCheck },
  ];

  // Timeline data
  const timeline = [
    {
      year: "2012",
      title: "Company Founded",
      description:
        "Sakthi Agro was established with a vision to serve farmers with quality agricultural equipment",
      image: shopImage,
    },
    {
      year: "2014",
      title: "First Service Center",
      description:
        "Opened our first service center in Coimbatore to provide local support",
      image: workshopImage,
    },
    {
      year: "2016",
      title: "Product Range Expansion",
      description:
        "Expanded our product range to include pumps and irrigation systems",
      image: customerImage1,
    },
    {
      year: "2018",
      title: "Digital Presence",
      description: "Launched our website and online inquiry system",
      image: customerImage2,
    },
    {
      year: "2020",
      title: "Pan-India Delivery",
      description:
        "Started offering delivery services across Tamil Nadu and neighboring states",
      image: teamImage1,
    },
    {
      year: "2022",
      title: "ISO Certification",
      description: "Achieved ISO certification for quality management",
      image: teamImage2,
    },
    {
      year: "2024",
      title: "Modernization",
      description: "Upgraded our facility with modern tools and equipment",
      image: teamImage3,
    },
  ];

  // Values data
  const values = [
    {
      icon: Heart,
      title: t("about_value_1_title"),
      description: t("about_value_1_desc"),
    },
    {
      icon: ShieldCheck,
      title: t("about_value_2_title"),
      description: t("about_value_2_desc"),
    },
    {
      icon: Lightbulb,
      title: t("about_value_3_title"),
      description: t("about_value_3_desc"),
    },
    {
      icon: Globe,
      title: t("about_value_4_title"),
      description: t("about_value_4_desc"),
    },
  ];

  // Team data
  const teamMembers = [
    {
      name: "Naveen Kumar N",
      role: "Founder & CEO",
      image: teamImage1,
      bio: "Agricultural expert with 12+ years of experience in farm equipment and services.",
    },
    {
      name: "Kavitha N",
      role: "Operations Head",
      image: teamImage2,
      bio: "Managing operations and customer relations with a focus on excellence.",
    },
    {
      name: "Kabilesh N",
      role: "Service Manager",
      image: teamImage3,
      bio: "Technical specialist ensuring all equipment functions at peak performance.",
    },
    {
      name: "Kathiresh N",
      role: "Customer Relations",
      image: workshopImage,
      bio: "Dedicated to providing exceptional customer service and support.",
    },
    {
      name: "Rajesh T",
      role: "Sales Manager",
      image: customerImage1,
      bio: "Expert in agricultural equipment sales and farmer consultation.",
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Raj Kumar",
      location: "Coimbatore, TN",
      rating: 5,
      image: customerImage1,
      text: "Sakthi Agro has been my go-to for agricultural equipment for over 5 years. Their service is exceptional and parts are always genuine.",
    },
    {
      name: "Senthil M",
      location: "Erode, TN",
      rating: 5,
      image: customerImage2,
      text: "The team at Sakthi Agro understands our farming needs perfectly. They helped me choose the right pump for my farm and provided excellent after-sales service.",
    },
    {
      name: "Vijay R",
      location: "Salem, TN",
      rating: 4,
      image: teamImage1,
      text: "Fast delivery, quality products, and reliable service. I highly recommend Sakthi Agro to all farmers in Tamil Nadu.",
    },
    {
      name: "Ganesh P",
      location: "Madurai, TN",
      rating: 5,
      image: teamImage2,
      text: "Their engineers are knowledgeable and efficient. My equipment was repaired quickly and at a reasonable cost.",
    },
  ];

  // Counter animation function
  const Counter = ({ end, suffix = "" }: { end: number; suffix?: string }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
      let startTime: number | null = null;
      const duration = 2000;

      const animateCount = (currentTime: number) => {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);
        const current = Math.floor(progress * end);
        setCount(current);

        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          setCount(end);
        }
      };

      if (inView) {
        requestAnimationFrame(animateCount);
      }
    }, [end, inView]);

    return (
      <div ref={ref} className="text-4xl md:text-5xl font-bold">
        {count}
        {suffix}
      </div>
    );
  };

  return (
    <>
      <div className="min-h-screen bg-white text-gray-800">
        <Navigation />
        <div className="pt-14 md:pt-16 lg:pt-20">

        {/* Micro-trust strip */}
        <MicroTrustStrip />

        {/* Premium Hero Section with Full-width Gradient Background */}
        <section
          ref={heroRef}
          className="w-full py-32 relative overflow-hidden"
          style={{
            background: "linear-gradient(90deg, #0E5322 0%, #1E7A3C 100%)",
          }}
        >
          {/* Agricultural Wave Shapes with Parallax Effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className="absolute bottom-0 left-0 w-full h-40 opacity-30"
              style={{
                transform: `translateY(${mousePosition.y * 0.05}px)`,
              }}
            >
              <svg
                viewBox="0 0 1200 120"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path
                  d="M0,0V46.29c47.79,2.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,13-14.29,1200,52.47V0Z"
                  fill="#1E7A3C"
                ></path>
              </svg>
            </div>

            <div
              className="absolute bottom-20 left-0 w-full h-32 opacity-20"
              style={{
                transform: `translateY(${mousePosition.y * 0.03}px)`,
              }}
            >
              <svg
                viewBox="0 120 120"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path
                  d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,1,24.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.7,25.39,62.32,62,103.63,73,40.4,10.79,81.35-6.69,119.13-24.28s75.16-39,16.92-43.05c59.73-5.85,13.28,2.8,168.9,38.84,30.2,8.6,59,6.17,87.09-7.5,2.43-10.89,48-26.93,60.65-49.24V0Z"
                  fill="#2E7D32"
                ></path>
              </svg>
            </div>

            <div
              className="absolute bottom-40 right-0 w-full h-24 opacity-25"
              style={{
                transform: `translateY(${mousePosition.y * 0.02}px)`,
              }}
            >
              <svg
                viewBox="0 1200 120"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
              >
                <path
                  d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,7.2,86,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                  fill="#3CB371"
                ></path>
              </svg>
            </div>
          </div>

          {/* Decorative Elements with 0.8s ease animation */}
          <div
            className="absolute top-20 left-10 animate-pulse"
            style={{ animationDuration: "0.8s" }}
          >
            <Leaf className="w-12 h-12 text-green-300 opacity-60" />
          </div>
          <div
            className="absolute top-40 right-20 animate-pulse"
            style={{ animationDuration: "0.8s" }}
          >
            <div className="w-16 h-16 rounded-full bg-green-300 opacity-30"></div>
          </div>
          <div
            className="absolute bottom-40 left-1/4 animate-pulse"
            style={{ animationDuration: "0.8s" }}
          >
            <div className="w-20 h-20 rounded-full bg-green-400 opacity-20"></div>
          </div>

          <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
            {/* Heading with fade-in-down animation */}
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={
                isVisible.hero ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }
              }
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8"
            >
              {t("about_hero_title")}
            </motion.h1>

            {/* Subtitle with fade-in-up animation */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={
                isVisible.hero ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }
              }
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-xl md:text-2xl text-white max-w-3xl mx-auto"
            >
              {t("about_hero_subtitle")}
            </motion.p>
          </div>
        </section>

        {/* Founder Story Section - White Background */}
        <section id="founder" ref={founderRef} className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={isVisible.founder ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.12 }}
                  className="relative"
                >
                  <div className="relative overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500">
                    <img
                      src={founderImage}
                      alt="Founder"
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>

                    {/* Decorative leaf element */}
                    <div className="absolute top-6 right-6 w-16 h-16 bg-green-50/20 rounded-full backdrop-blur-sm flex items-center justify-center">
                      <Leaf className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={isVisible.founder ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.24 }}
                  whileHover={{
                    y: -6,
                    boxShadow: "0 10px 30px rgba(14,83,34,0.15)",
                  }} // Hover lift effect as specified
                  className="relative"
                >
                  <div
                    className="bg-white rounded-3xl p-10 shadow-xl border border-gray-100 relative"
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid #E6EDE6",
                      borderLeft: "4px solid #1E7A3C", // Left border accent as specified
                      borderRadius: "16px",
                      boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
                    }}
                  >
                    {/* Decorative elements */}
                    <div className="absolute -top-4 -left-4 w-24 h-24 bg-green-100 rounded-full opacity-30 -z-10"></div>
                    <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-100 rounded-full opacity-20 -z-10"></div>

                    <div className="relative z-10">
                      <h2
                        className="text-4xl font-bold mb-8 text-gray-800"
                        style={{ color: "#1E7A3C" }}
                      >
                       {t("about_founder_title")}
                      </h2>
                      <div
                        className="space-y-6 text-gray-700 leading-relaxed"
                        style={{ color: "#3B3B3B" }}
                      >
                        <p className="text-lg">
                          {t("about_founder_text_1")}
                        </p>
                        <p className="text-lg">
                          {t("about_founder_text_2")}
                        </p>
                        <p className="text-lg">
                          {t("about_founder_text_3")}
                        </p>
                      </div>
                      <div
                        className="mt-8 pt-8 border-t border-gray-200"
                        style={{ borderColor: "#E6EDE6" }}
                      >
                        <p
                          className="font-semibold text-gray-800 text-lg"
                          style={{ color: "#0E5322" }}
                        >
                          {t("about_founder_name")}
                        </p>
                        <div
                          className="text-sm text-gray-60"
                          style={{ color: "#3B3B3B" }}
                        >
                          Sakthi Agro
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Section - Light Green/Grey Background */}
        <section
          id="story"
          ref={storyRef}
          className="py-24 bg-gradient-to-br from-gray-50 to-green-50"
        >
          <div
            className="container mx-auto px-4"
            style={{ background: "#F7FBF7" }}
          >
            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={isVisible.story ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8 }}
                  className="order-2 lg:order-1"
                >
                  <div
                    className="relative overflow-hidden rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500"
                    style={{
                      borderRadius: "16px",
                      boxShadow: "0 4px 20px rgba(0,0,0.05)",
                      border: "1px solid #E6EDE6",
                    }}
                  >
                    <img
                      src={shopImage}
                      alt="Our Shop"
                      className="w-full h-96 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 to-blue-600/20"></div>

                    {/* Decorative leaf element */}
                    <div className="absolute top-6 left-6 w-16 h-16 bg-white/80 rounded-full backdrop-blur-sm flex items-center justify-center">
                      <TrendingUp className="w-8 h-8 text-green-600" />
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={isVisible.story ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="order-1 lg:order-2"
                >
                  <div className="relative">
                    <div className="absolute -left-6 -top-6 w-24 h-24 bg-green-200 rounded-full opacity-20 -z-10"></div>
                    <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-blue-200 rounded-full opacity-20 -z-10"></div>
                    <div className="relative z-10">
                      <h2
                        className="text-4xl font-bold mb-8 text-gray-800"
                        style={{ color: "#1E7A3C" }}
                      >
                        {t("about_story_title")}
                      </h2>
                      <div
                        className="space-y-6 text-gray-700 leading-relaxed"
                        style={{ color: "#3B3B3B" }}
                      >
                        <p className="text-lg">
                          {t("about_story_text_1")}
                        </p>
                        <p className="text-lg">
                          {t("about_story_text_2")}
                        </p>
                        <p className="text-lg">
                          {t("about_story_text_3")}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values Section - White Background */}
        <section id="values" ref={valuesRef} className="py-24 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible.values ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="flex justify-center mb-4">
                <Leaf className="w-12 h-12 text-green-600" />
              </div>
              <h2
                className="text-4xl font-bold mb-6 text-gray-800"
                style={{ color: "#1E7A3C" }}
              >
                {t("about_values_title")}
              </h2>
              <p
                className="text-xl text-gray-60 max-w-2xl mx-auto"
                style={{ color: "#3B3B3B" }}
              >
                {t("about_values_subtitle")}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible.values ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.1 * index }}
                  whileHover={{ y: -15, scale: 1.05 }}
                  className="h-full"
                >
                  <Card
                    className="group h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden relative"
                    style={{
                      background: "#FFFFFF",
                      border: "1px solid #E6EDE6",
                      borderRadius: "18px",
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-green-10/50 via-emerald-10/30 to-blue-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-50"></div>
                    <CardContent className="p-8 relative z-10">
                      <div className="mb-6 flex justify-center">
                        <div className="rounded-full bg-gradient-to-br from-[#D9E9DF] to-[#F4FAF5] p-5 shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:scale-110 group-hover:shadow-green-50/30">
                          <value.icon className="h-12 w-12 text-green-600" />
                        </div>
                      </div>
                      <h3
                        className="text-2xl font-bold mb-4 text-center text-gray-800"
                        style={{ color: "#0E532", fontWeight: 600 }}
                      >
                        {value.title}
                      </h3>
                      <p
                        className="text-gray-60 text-center leading-relaxed"
                        style={{ color: "#3B3B3B", opacity: 0.8 }}
                      >
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Farmers Trust Us (Stats) - Full-width Soft Gradient */}
        <section
          id="stats"
          ref={statsRef}
          className="py-24 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-blue-500/10 text-white relative overflow-hidden"
        >
          {/* Background decorative elements */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-10 left-10 w-32 h-32 bg-green-500 rounded-full blur-xl"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500 rounded-full blur-xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500 rounded-full blur-xl"></div>
          </div>

          {/* Vertical separators */}
          <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white/20"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/20"></div>
          <div className="absolute left-3/4 top-0 bottom-0 w-px bg-white/20"></div>

          <div
            className="container mx-auto px-4 relative z-10"
            style={{
              background: "linear-gradient(90deg, #0E532, #1E7A3C)",
              color: "#FFFFFF",
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible.stats ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2
                className="text-4xl font-bold mb-6 text-gray-800"
                style={{ color: "#FFFFFF" }}
              >
                {t("about_stats_title")}
              </h2>
              <p
                className="text-xl text-gray-60 max-w-2xl mx-auto"
                style={{ color: "#FFFFFF" }}
              >
                {t("about_stats_subtitle")}
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-7xl mx-auto">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isVisible.stats ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.1 * index }}
                  className="text-center relative"
                >
                  <div className="flex justify-center mb-4">
                    <div
                      className="p-4 rounded-full border-2 bg-white/10 backdrop-blur-sm flex items-center justify-center"
                      style={{
                        borderColor: "#1E7A3C",
                        width: "80px",
                        height: "80px",
                      }}
                    >
                      <stat.icon
                        className="h-12 w-12 text-green-600"
                        style={{ color: "#1E7A3C" }}
                      />
                    </div>
                  </div>
                  <div
                    className="text-4xl sm:text-5xl font-bold mb-2 text-gray-800"
                    style={{ color: "#FFFFFF" }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-lg font-medium text-gray-600"
                    style={{ color: "#FFFFFF" }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Journey (Timeline) - White Background */}
        <section
          id="timeline"
          ref={timelineRef}
          className="py-24 bg-white"
          style={{ background: "#FFFFFF" }}
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible.timeline ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="flex justify-center mb-4">
                <Calendar className="w-12 h-12 text-green-600" />
              </div>
              <h2
                className="text-4xl font-bold mb-6 text-gray-800"
                style={{ color: "#1E7A3C" }}
              >
                Our Journey
              </h2>
              <p
                className="text-xl text-gray-60 max-w-2xl mx-auto"
                style={{ color: "#3B3B" }}
              >
                Milestones that shaped our commitment to the farming community
              </p>
            </motion.div>

            <div
              className="max-w-4xl mx-auto relative"
              style={{ background: "#FFFFFF" }}
            >
              {/* Vertical line with glow effect */}
              <svg
                className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full"
                style={{ height: "100%" }}
              >
                <line
                  x1="50%"
                  y1="0"
                  x2="50%"
                  y2="100%"
                  stroke="#1E7A3C"
                  strokeWidth="3"
                  strokeDasharray="10,10"
                  className="timeline-line"
                />
              </svg>

              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isVisible.timeline ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.1 * index }}
                  className={`flex items-center mb-16 ${
                    index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  <div
                    className={`w-5/12 ${
                      index % 2 === 0 ? "text-right pr-12" : "text-left pl-12"
                    }`}
                  >
                    <div
                      className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-green-50 relative overflow-hidden group"
                      style={{
                        background: "#FFFFFF",
                        border: "1px solid #E6EDE6",
                        borderRadius: "14px",
                        boxShadow: "0 3px 12px rgba(0,0,0,0.05)",
                      }}
                    >
                      {/* Decorative background element */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-30"></div>

                      <div className="relative z-10">
                        <div
                          className="text-lg font-bold text-green-600 mb-3"
                          style={{
                            background: "#F3B500",
                            color: "#0E5322",
                            fontWeight: "bold",
                            borderRadius: "6px",
                          }}
                        >
                          {item.year}
                        </div>
                        <h3
                          className="text-2xl font-bold mb-3 text-gray-800"
                          style={{ color: "#1E7A3C" }}
                        >
                          {item.title}
                        </h3>
                        <p
                          className="text-gray-600 text-lg"
                          style={{ color: "#3B3B" }}
                        >
                          {item.description}
                        </p>

                        {/* Image for key events */}
                        <div className="mt-4">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="w-2/12 flex justify-center">
                    {/* Numbered year badge */}
                    <div
                      className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full border-4 border-white shadow-lg z-10 flex items-center justify-center text-white font-bold text-lg"
                      style={{ background: "#F3B500", color: "#0E5322" }}
                    >
                      {index + 1}
                    </div>
                  </div>

                  <div className="w-5/12"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Meet Our Team - White Background */}
        <section
          id="team"
          ref={teamRef}
          className="py-24 bg-white"
          style={{ background: "#0E5322" }}
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible.team ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="flex justify-center mb-4">
                <Users
                  className="w-12 h-12 text-green-600"
                  style={{ color: "#F3B500" }}
                />
              </div>
              <h2
                className="text-4xl font-bold mb-6 text-gray-800"
                style={{ color: "#FFFFFF", fontWeight: 700 }}
              >
                Meet Our Team
              </h2>
              <p
                className="text-xl text-gray-600 max-w-2xl mx-auto"
                style={{ color: "rgba(255,255,0.75)" }}
              >
                Dedicated professionals committed to serving the farming
                community
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 max-w-6xl mx-auto">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible.team ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.1 * index }}
                  className="text-center"
                >
                  <div className="relative inline-block group">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-36 h-36 rounded-full object-cover mx-auto shadow-lg border-4 border-white transform group-hover:scale-105 transition-all duration-300 grayscale group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-green-50 to-blue-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                  </div>
                  <h3
                    className="text-xl font-bold mt-6 text-gray-800"
                    style={{ color: "#FFFFFF" }}
                  >
                    {member.name}
                  </h3>
                  <p
                    className="text-green-600 font-medium text-lg"
                    style={{ color: "#F3B500" }}
                  >
                    {member.role}
                  </p>
                  <p
                    className="text-gray-600 text-sm mt-3"
                    style={{ color: "rgba(255,255,0.75)" }}
                  >
                    {member.bio}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Slider - Light Green Background */}
        <section
          id="testimonials"
          ref={testimonialsRef}
          className="py-20 sm:py-24 bg-gradient-to-br from-green-50 to-blue-50"
        >
          <div
            className="container mx-auto px-4"
            style={{ background: "#F7FBF7" }}
          >
            <div className="max-w-4xl mx-auto relative">
              <TestimonialSlider />
            </div>
          </div>
        </section>


        {/* Visit Our Shop Section - White Background */}
        <section
          id="map"
          ref={mapRef}
          className="py-24 bg-white"
          style={{ background: "#0E532" }}
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible.map ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="flex justify-center mb-4">
                <MapPin
                  className="w-12 h-12 text-green-600"
                  style={{ color: "#F3B50" }}
                />
              </div>
              <h2
                className="text-4xl font-bold mb-6 text-gray-800"
                style={{ color: "#FFFFFF", fontWeight: 700 }}
              >
                Visit Our Shop
              </h2>
              <p
                className="text-xl text-gray-60 max-w-2xl mx-auto"
                style={{ color: "rgba(255,255,0.75)" }}
              >
                Come see us in person at our facility in Coimbatore
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div
                className="bg-white rounded-3xl shadow-2xl overflow-hidden p-8"
                style={{ background: "#FFFFFF" }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <MapPin
                    className="h-6 w-6 text-green-600"
                    style={{ color: "#F3B50" }}
                  />
                  <div>
                    <h3
                      className="text-2xl font-bold text-gray-800"
                      style={{ color: "#FFFFFF" }}
                    >
                      Sakthi Agro
                    </h3>
                    <p
                      className="text-gray-600 text-lg"
                      style={{ color: "rgba(255,255,0.75)" }}
                    >
                      113, Kattoor Main, Ram Nagar, Coimbatore, Tamil Nadu 641009
                    </p>
                  </div>
                </div>
                <div className="rounded-xl overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.3254!2d76.9628568!3d11.0077253!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDAwJzI3LjgiTiA3NsKwNTcnNDYuMyJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Sakthi Agro Shop Location - 113, Kattoor Main, Ram Nagar, Coimbatore"
                    className="rounded-lg"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form Section - White Background */}
        <section
          id="contact"
          ref={contactRef}
          className="py-24 bg-white"
          style={{ background: "#FFFFFF" }}
        >
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible.map ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <div className="flex justify-center mb-4">
                <MapPin
                  className="w-12 h-12 text-green-600"
                  style={{ color: "#F3B50" }}
                />
              </div>
              <h2
                className="text-4xl font-bold mb-6 text-gray-800"
                style={{ color: "#1E7A3C", fontWeight: 700 }}
              >
                Get In Touch
              </h2>
              <p
                className="text-xl text-gray-60 max-w-2xl mx-auto"
                style={{ color: "#3B3B3B" }}
              >
                Have questions about our products or services? Reach out to our
                team.
              </p>
            </motion.div>

            <div className="max-w-4xl mx-auto">
              <div
                className="bg-white rounded-3xl shadow-2xl overflow-hidden p-8 border-gray-200"
                style={{ background: "#FFFFFF", border: "1px solid #E6EDE6" }}
              >
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                        style={{ color: "#3B3B3B" }}
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                        style={{
                          background: "#FFFFFF",
                          border: "1px solid #E6EDE6",
                          borderRadius: "16px",
                          padding: "12px 16px",
                        }}
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                        style={{ color: "#3B3B3B" }}
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                        style={{
                          background: "#FFFFFF",
                          border: "1px solid #E6EDE6",
                          borderRadius: "16px",
                          padding: "12px 16px",
                        }}
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                      style={{ color: "#3B3B3B" }}
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                      style={{
                        background: "#FFFFFF",
                        border: "1px solid #E6EDE6",
                        borderRadius: "16px",
                        padding: "12px 16px",
                      }}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="product"
                      className="block text-sm font-medium text-gray-700 mb-2"
                      style={{ color: "#3B3B3B" }}
                    >
                      Interested Product/Service
                    </label>
                    <select
                      id="product"
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgdmlld0JveD0iMCAwIDYwMCA2MDAiPjxwYXRoIGZpbGw9IiMzQjNCM0IiIGQ9Ik0xNzQuMTAzIDIxNy42NDdsMTI4LjU1NSAxMjguNTU1TDE3NC4xMDMgNDc0Ljc1NmwxOC4zNTQgMTguMzU0TDMyMS4wMTEgMzY0LjU1NWwxMjguNTU2IDEyOC41NTRMMzY4LjQ0NCA1NzQuMTYzIDIxNy42NDcgNDIzLjM2NiA4OS4wOTIgNTUxLjkxOUwuNTM5IDQ3My4zNjYgMTI5LjA5MiAzNDQuODEzbC0xMjguNTU0LTEyOC41NTUgODguNTU0LTg4LjU1NHoiLz48L3N2Zz4=')_right_1rem_center/no-repeat"
                    >
                      <option>Select a product/service</option>
                      <option>Sprayers</option>
                      <option>Pumps</option>
                      <option>Engines</option>
                      <option>Genuine Spare Parts</option>
                      <option>Field Service</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-2"
                      style={{ color: "#3B3B3B" }}
                    >
                      How can we help you?
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 resize-none"
                      style={{
                        background: "#FFFFFF",
                        border: "1px solid #E6EDE6",
                        borderRadius: "16px",
                        padding: "12px 16px",
                      }}
                      placeholder="Tell us about your requirements or questions"
                    ></textarea>
                  </div>
                  <div className="pt-4">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-green-600 to-emerald-60 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                      style={{
                        background: "linear-gradient(90deg, #1E7A3C, #0E532)",
                        color: "#FFFFFF",
                        border: "none",
                        borderRadius: "16px",
                        padding: "16px",
                        fontSize: "18px",
                        fontWeight: "bold",
                      }}
                    >
                      Send Inquiry
                    </motion.button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA - Premium Gradient */}
        <section
          className="py-24 bg-gradient-to-r from-orange-500 via-green-600 to-blue-600 text-white relative overflow-hidden"
          style={{ background: "#F3B50" }}
        >
          {/* Background decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full blur-xl"></div>
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-white rounded-full blur-xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-xl"></div>
          </div>

          <div className="container mx-auto px-4 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible.map ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="flex justify-center mb-6">
                <Leaf
                  className="w-16 h-16 text-white opacity-80"
                  style={{ color: "#1E7A3C" }}
                />
              </div>
              <h2
                className="text-4xl md:text-5xl font-bold mb-8"
                style={{ color: "#0E532", fontWeight: 700 }}
              >
                Need Parts or Service? Contact Our Field Team Now!
              </h2>
              <p
                className="text-xl mb-12 max-w-2xl mx-auto"
                style={{ color: "rgba(14,83,34,0.8)" }}
              >
                Get the best agricultural equipment and service for your farm
                with our premium solutions.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-6">
                <motion.a
                  href="tel:+919876543210"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-green-600 px-10 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-shadow"
                  style={{ background: "#F3B500", color: "#0E5322" }}
                >
                  <Phone className="h-6 w-6" style={{ color: "#0E532" }} />
                  Call Now
                </motion.a>
                <motion.a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-green-500 text-white px-10 py-5 rounded-full font-bold text-lg flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-shadow"
                  style={{ background: "#1E7A3C", color: "#FFFFFF" }}
                >
                  <MessageCircle
                    className="h-6 w-6"
                    style={{ color: "#FFFFFF" }}
                  />
                  WhatsApp
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
        </div>
      </div>{" "}
      {/* Close the main div */}
      <Footer />
      <WhatsAppButton />
    </>
  );
}; // Added missing closing brace

export default About;
