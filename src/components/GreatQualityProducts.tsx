import { Card, CardContent } from "@/components/ui/card";
import { Shield, Package, CheckCircle, Star } from "lucide-react";
import { motion } from "framer-motion";

import { useLanguage } from "@/contexts/LanguageContext";

export const GreatQualityProducts = () => {
  const { t } = useLanguage();

  const qualityFeatures = [
    {
      icon: Shield,
      title: t("quality_1_title"),
      description: t("quality_1_desc"),
    },
    {
      icon: Package,
      title: t("quality_2_title"),
      description: t("quality_2_desc"),
    },
    {
      icon: CheckCircle,
      title: t("quality_3_title"),
      description: t("quality_3_desc"),
    },
    {
      icon: Star,
      title: t("quality_4_title"),
      description: t("quality_4_desc"),
    },
  ];

  return (
    <section className="py-12 sm:py-16 bg-green-50">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2E7D32] mb-3 sm:mb-4">
            {t("quality_title")}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("quality_subtitle")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-10"
        >
          {qualityFeatures.map((feature, index) => (
            <div key={index} className="group relative overflow-visible">
              <Card className="rounded-2xl shadow-md transition-all duration-300 cursor-pointer h-full flex-col border-2 border-[#2E7D32] hover:shadow-lg hover:shadow-[#2E7D32]/40 hover:border-[#1B5E20] relative hover:z-10 origin-center transform hover:translateY(-6px)">
                <CardContent className="p-4 sm:p-5 md:p-6 flex-col items-center text-center flex-grow relative overflow-visible transition-transform duration-300 group-hover:scale-104">
                  <div className="p-3 sm:p-4 bg-[#E8F5E9] rounded-full group-hover:bg-[#2E7D32] transition-colors duration-300 mb-3 sm:mb-4 relative z-10 flex items-center justify-center">
                    <feature.icon className="h-8 sm:h-10 w-8 sm:w-10 text-[#2E7D32] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-foreground mb-2 group-hover:text-[#2E7D32] transition-colors duration-300 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground mb-0 flex-grow group-hover:text-[#2E7D32] transition-colors duration-300 text-center">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg p-8 border border-[#2E7D32]/20"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8">
            <div className="flex-1 text-center md:text-left w-full">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3">
                {t("quality_commitment_title")}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground mb-4">
                {t("quality_commitment_desc")}
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                  <span className="text-xs sm:text-sm">
                    {t("quality_badge_1")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                  <span className="text-xs sm:text-sm">
                    {t("quality_badge_2")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
                  <span className="text-xs sm:text-sm">{t("quality_badge_3")}</span>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center w-full max-w-xs">
              <img
                src="/src/assets/Sakthi agro logo1.png"
                alt="Sakthi Agro Quality Products"
                className="max-w-full h-auto rounded-lg shadow-md w-48 sm:w-64"
                loading="lazy"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
