import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CountUp({
  value,
  className = "",
  duration = 2,
  delay = 0,
  key, // Add key prop to trigger re-animation on change (optional)
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
      // For range formats like "2-5 Days", extract the first number
      const rangeMatch = valueStr.match(/^([0-9]+)-([0-9]+)/);
      if (rangeMatch) {
        numericValue = parseFloat(rangeMatch[1]) || 0;
      }
    } else {
      numericValue = parseFloat(valueStr.replace(/[^\d.-]/g, "")) || 0;
    }

    // Reset count when key changes (role changes)
    setCount(0);

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const timer = setInterval(() => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);

      // Ease-out function
      const easeProgress = 1 - Math.pow(1 - progress, 2);
      let currentValue = 0;

      if (isTimeFormat) {
        // For time formats, maintain decimal precision
        currentValue = parseFloat((easeProgress * numericValue).toFixed(1));
      } else {
        currentValue = Math.floor(easeProgress * numericValue);
      }

      setCount(currentValue);

      if (now >= endTime) {
        if (isTimeFormat) {
          setCount(parseFloat(numericValue.toFixed(1)));
        } else {
          setCount(numericValue);
        }
        clearInterval(timer);
      }
    }, 16); // ~60fps

    return () => {
      clearInterval(timer);
    };
  }, [key, valueStr, duration, isTimeFormat, isRangeFormat, shouldAnimate]);

  if (is247) {
    return (
      <motion.span
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        key={key} // Use key to force re-render and re-animation
      >
        {valueStr}
      </motion.span>
    );
  }

  // Rendering logic
  let formattedCount;
  let suffix = "";

  if (
    isRangeFormat ||
    isTimeFormat ||
    isPercentage ||
    isPlusValue ||
    isFraction
  ) {
    // Extract the suffix (unit, %, +, etc.)
    const suffixMatch = valueStr.match(/([a-zA-Z%+/-]+)/);
    suffix = suffixMatch ? suffixMatch[0] : "";

    // Format the number with commas, but preserve decimal for time formats
    if (isTimeFormat && count % 1 !== 0) {
      formattedCount = count.toFixed(1);
    } else {
      formattedCount = Math.floor(count).toLocaleString();
    }

    // For range formats, we need to reconstruct the full string
    if (isRangeFormat) {
      const rangeMatch = valueStr.match(/^([0-9]+)-([0-9]+)\s*(.+)/);
      if (rangeMatch) {
        const secondNum = rangeMatch[2];
        const unit = rangeMatch[3];
        return (
          <motion.span
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            key={key}
          >
            {formattedCount}-{secondNum} {unit}
          </motion.span>
        );
      }
    }
  } else {
    // Handle purely numeric values with counting animation
    const hasPercent = valueStr.includes("%");
    const hasPlus = valueStr.includes("+");
    suffix = hasPercent ? "%" : hasPlus ? "+" : "";
    formattedCount = count.toLocaleString();
  }

  return (
    <motion.span
      className={className}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      key={key}
    >
      {formattedCount}
      {suffix}
    </motion.span>
  );
}
