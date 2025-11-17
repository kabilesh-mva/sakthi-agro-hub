import React from "react";
import { motion } from "framer-motion";

const MicroTrustStrip = () => {
  const badges = [
    { text: "ISO Certified" },
    { text: "10,000+ Products Serviced" },
    { text: "Pan-India Delivery" },
    { text: "Authorized Dealers" },
  ];

  return (
    <section className="py-4 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {badges.map((badge, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/10 backdrop-blur-md bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 shadow-sm"
            >
              <span className="text-xs sm:text-sm font-medium text-green-800">
                {badge.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MicroTrustStrip;
