import { useState, useEffect, useRef, useCallback } from "react";
import { InView } from "./ui/in-view";

interface ScrollTriggeredCounterProps {
  value: string;
  type?: "number" | "percentage" | "plus" | "split";
  duration?: number;
  className?: string;
}

const ScrollTriggeredCounter = ({
  value,
  type,
  duration = 100,
  className = "",
}: ScrollTriggeredCounterProps) => {
  const [count, setCount] = useState<string>("0");
  const hasAnimated = useRef(false);
  const ref = useRef<HTMLDivElement>(null);

  // Parse the value to determine the animation type
  const parseValue = (
    val: string,
    overrideType?: "number" | "percentage" | "plus" | "split"
  ) => {
    if (overrideType) {
      if (overrideType === "split") {
        const [first, second] = val.split("/");
        return {
          type: "split",
          first: parseInt(first),
          second: parseInt(second),
          separator: "/",
        };
      } else if (overrideType === "percentage") {
        return {
          type: "percentage",
          value: parseInt(val.replace("%", "")),
        };
      } else if (overrideType === "plus") {
        return {
          type: "plus",
          value: parseInt(val.replace("+", "")),
        };
      } else {
        return {
          type: "number",
          value: parseInt(val),
        };
      }
    } else {
      if (val.includes("/")) {
        // Handle "24/7" case
        const [first, second] = val.split("/");
        return {
          type: "split",
          first: parseInt(first),
          second: parseInt(second),
          separator: "/",
        };
      } else if (val.includes("%")) {
        // Handle percentage case
        return {
          type: "percentage",
          value: parseInt(val.replace("%", "")),
        };
      } else if (val.includes("+")) {
        // Handle "+ case
        return {
          type: "plus",
          value: parseInt(val.replace("+", "")),
        };
      } else {
        // Handle regular number
        return {
          type: "number",
          value: parseInt(val),
        };
      }
    }
  };

  // Bounce easing function
  const easeOutBounce = (x: number): number => {
    const n1 = 7.5625;
    const d1 = 2.75;

    if (x < 1 / d1) {
      return n1 * x;
    } else if (x < 2 / d1) {
      return n1 * (x -= 1.5 / d1) * x + 0.75;
    } else if (x < 2.5 / d1) {
      return n1 * (x -= 2.25 / d1) * x + 0.9375;
    } else {
      return n1 * (x -= 2.625 / d1) * x + 0.984375;
    }
  };

  const animateCount = useCallback(() => {
    if (hasAnimated.current) return;

    const parsed = parseValue(value, type);
    const startTime = performance.now();

    // Set specific durations based on the value
    let animationDuration = duration;
    if (value === "5000+") {
      animationDuration = 1200; // 1.2 seconds for 5000+
    } else if (value === "98%") {
      animationDuration = 800; // 0.8 seconds for 98%
    }

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      // Apply easing function based on type
      let easedProgress;
      if (
        parsed.type === "split" &&
        parsed.first === 24 &&
        parsed.second === 7
      ) {
        // For "24/7", use bounce easing for both numbers but in different directions
        easedProgress = easeOutBounce(progress);
      } else {
        // For others, use easeOutCubic
        easedProgress = 1 - Math.pow(1 - progress, 3);
      }

      if (parsed.type === "split") {
        // Handle "24/7" case - special animation for this specific case
        if (parsed.first === 24 && parsed.second === 7) {
          // 24 counts upward with bounce easing (from 0 to 24)
          const currentFirst = Math.min(
            Math.floor(24 * easeOutBounce(progress)),
            24
          );
          // 7 counts downward with bounce easing (from 7 to 0)
          const currentSecond = Math.max(
            0,
            Math.floor(7 - 7 * easeOutBounce(progress))
          );
          setCount(`${currentFirst}/${currentSecond}`);
        } else {
          // General split case
          const currentFirst = Math.min(
            Math.floor(parsed.first * easedProgress),
            parsed.first
          );
          const currentSecond = Math.min(
            Math.floor(parsed.second * easedProgress),
            parsed.second
          );

          setCount(`${currentFirst}/${currentSecond}`);
        }
      } else {
        const currentValue = Math.floor(parsed.value * easedProgress);

        if (parsed.type === "percentage") {
          setCount(`${currentValue}%`);
        } else if (parsed.type === "plus") {
          setCount(`${currentValue}+`);
        } else {
          setCount(currentValue.toString());
        }
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Set final value when animation completes
        setCount(value);
        hasAnimated.current = true;
      }
    };

    requestAnimationFrame(animate);
  }, [value, type, duration]);

  // Use Intersection Observer to detect when the element is in view
  useEffect(() => {
    const element = ref.current;
    if (!element || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setCount("0");
          setTimeout(() => animateCount(), 50);
        }
      },
      { threshold: 0.5, rootMargin: "-100px" }
    );

    observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, [animateCount]);

  return (
    <InView
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      transition={{ duration: 0.5 }}
      viewOptions={{ once: false, margin: "-100px" }}
    >
      <div ref={ref} className={className}>
        {count}
      </div>
    </InView>
  );
};

export default ScrollTriggeredCounter;
