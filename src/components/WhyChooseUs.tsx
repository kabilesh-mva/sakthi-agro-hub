import {
  Shield,
  Wrench,
  Clock,
  Award,
  CheckCircle,
  Users,
  Star,
  Phone,
  Package,
  Heart,
  Languages,
  HardHat,
  Check,
  Handshake,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";



export const WhyChooseUs = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Users,
      title: t("why_us_1_title"),
      description: t("why_us_1_desc"),
    },
    {
      icon: Shield,
      title: t("why_us_2_title"),
      description: t("why_us_2_desc"),
    },
    {
      icon: Languages,
      title: t("why_us_3_title"),
      description: t("why_us_3_desc"),
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-secondary relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232E7D32' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="text-center mb-8 sm:mb-12 relative z-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 sm:mb-4">
            {t("why_choose_us_title")}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-3 sm:mb-6">
            {t("why_choose_us_subtitle")}
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 relative z-20 max-w-6xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
            hidden: {},
          }}
        >
          {features.map((feature, index) => {
            // Alternate between green and white backgrounds for visual rhythm
            const isWhite = index % 2 === 0;
            return (
              <motion.div
                key={index}
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 20 },
                }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <Card
                  className={`${
                    isWhite ? "bg-white" : "bg-[#F9F9F9]"
                  } border-2 hover:border-[#2E7D32] transition-colors group cursor-pointer h-full relative overflow-hidden border-[#2E7D32] hover:shadow-lg hover:shadow-[#2E7D32]/20`}
                >
                  <CardContent className="p-4 sm:p-6 text-center relative h-full flex flex-col justify-between z-10">
                    <div className="flex flex-col items-center justify-center flex-grow relative z-10">
                      <div className="mb-2 sm:mb-3 md:mb-4 flex justify-center relative z-10">
                        <div
                          className={`rounded-full ${
                            isWhite ? "bg-[#E8F5E9]" : "bg-[#E8F5E9]/70"
                          } p-2 sm:p-3 md:p-4 group-hover:bg-[#2E7D32] transition-colors duration-300 relative z-10`}
                        >
                          <feature.icon
                            className={`h-5 sm:h-6 md:h-8 w-5 sm:w-6 md:w-8 ${
                              isWhite ? "text-[#2E7D32]" : "text-[#2E7D32]"
                            } group-hover:text-[#FF6F00] transition-colors duration-300`}
                          />
                        </div>
                      </div>
                      <h3
                        className={`text-base sm:text-lg md:text-xl font-bold text-foreground mb-1 sm:mb-2 group-hover:text-[#2E7D32] transition-colors duration-300 relative z-10 text-center`}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className={`text-xs sm:text-sm md:text-base ${
                          isWhite ? "text-muted-foreground" : "text-[#333333]"
                        } mb-2 relative z-10 text-center`}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Since 2012 Badge */}
        <motion.div
          className="flex justify-center mt-12 relative z-20"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="inline-block bg-gradient-to-r from-[#2E7D32] to-[#FF6F00] text-white px-6 py-2 rounded-full text-sm sm:text-base font-bold shadow-lg">
            Since 2012
          </div>
        </motion.div>
      </div>
    </section>
  );
};
