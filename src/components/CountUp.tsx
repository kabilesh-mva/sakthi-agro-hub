import { motion } from "framer-motion";
import React, { useEffect, useState, useMemo } from "react";

export default function CountUp({
  value,
  className = "",
  duration = 2,
  delay = 0,
}) {
  const valueStr = value.toString();
  const [count, setCount] = useState(0);

  // Check if the value is "24/7" specifically - this should not be animated as it's a special symbolic value
  const is247 = valueStr.toLowerCase() === "24/7";

  // Check if the value is a special format like "24/7", "1.5 hrs", "48 hrs", etc. that should be animated
  const isTimeFormat =
    /^[0-9]+(\.[0-9]+)?\s*(hrs|hr|days|day|week|weeks|month|months|year|years)$/i.test(
      valueStr
    ); // Matches patterns like "1.5 hrs", "48 hrs", "30 days", etc.
  const isRangeFormat =
    /^[0-9]+-[0-9]+\s*(days|day|hrs|hr|week|weeks|month|months|year|years)$/i.test(
      valueStr
    ); // Matches patterns like "2-5 Days", "1-3 days", etc.
  const isPercentage = valueStr.includes("%");
  const isPlusValue = valueStr.includes("+") && !valueStr.includes("/");
  const isFraction =
    valueStr.includes("/") && valueStr.toLowerCase() !== "24/7"; // Exclude 24/7 from fraction handling

  const shouldAnimate = !is247;

  useEffect(() => {
    if (!shouldAnimate) return;

    // Extract numeric value by removing units, %, +, etc.
    let numericValue = 0;
    if (isRangeFormat) {
      const rangeMatch = valueStr.match(/^([0-9]+)-([0-9]+)/);
      if (rangeMatch) {
        numericValue = parseFloat(rangeMatch[1]) || 0;
      }
    } else {
      numericValue = parseFloat(valueStr.replace(/[^\d.-]/g, "")) || 0;
    }

    setCount(0);

    let animationFrameID: number;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    const animateCount = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      
      const easeProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out for smoother end
      let currentValue = 0;

      if (isTimeFormat) {
        currentValue = parseFloat((easeProgress * numericValue).toFixed(1));
      } else {
        currentValue = Math.floor(easeProgress * numericValue);
      }

      setCount(currentValue);

      if (progress < 1) {
        animationFrameID = requestAnimationFrame(animateCount);
      } else {
        setCount(isTimeFormat ? parseFloat(numericValue.toFixed(1)) : numericValue);
      }
    };

    animationFrameID = requestAnimationFrame(animateCount);

    return () => {
      cancelAnimationFrame(animationFrameID);
    };
  }, [valueStr, duration, isTimeFormat, isRangeFormat, shouldAnimate]);

  const { formattedCount, suffix, customRangeRender } = React.useMemo(() => {
    let fmtCount = "";
    let sfx = "";
    let customRender = null;

    if (
      isRangeFormat ||
      isTimeFormat ||
      isPercentage ||
      isPlusValue ||
      isFraction
    ) {
      const suffixMatch = valueStr.match(/([a-zA-Z%+/-]+)/);
      sfx = suffixMatch ? suffixMatch[0] : "";

      if (isTimeFormat && count % 1 !== 0) {
        fmtCount = count.toFixed(1);
      } else {
        fmtCount = Math.floor(count).toLocaleString();
      }

      if (isRangeFormat) {
        const rangeMatch = valueStr.match(/^([0-9]+)-([0-9]+)\s*(.+)/);
        if (rangeMatch) {
          const secondNum = rangeMatch[2];
          const unit = rangeMatch[3];
          customRender = (
            <motion.span
              className={className}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              key={key}
            >
              {fmtCount}-{secondNum} {unit}
            </motion.span>
          );
        }
      }
    } else {
      const hasPercent = valueStr.includes("%");
      const hasPlus = valueStr.includes("+");
      sfx = hasPercent ? "%" : hasPlus ? "+" : "";
      fmtCount = count.toLocaleString();
    }

    return { formattedCount: fmtCount, suffix: sfx, customRangeRender: customRender };
  }, [count, valueStr, isRangeFormat, isTimeFormat, isPercentage, isPlusValue, isFraction, className]);

  if (is247) {
    return (
      <motion.span
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {valueStr}
      </motion.span>
    );
  }

  if (customRangeRender) return customRangeRender;

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {formattedCount}
      {suffix}
    </motion.span>
  );
}
