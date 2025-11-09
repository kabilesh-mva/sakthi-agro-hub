import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

// Animation data for each service
const repairAnimation = {
  v: "5.5.7",
  fr: 29.9700393676758,
  ip: 0,
  op: 150,
  w: 200,
  h: 200,
  nm: "Repair Animation",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Gear",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            {
              i: { x: [0.67], y: [0.667] },
              o: { x: [0.333], y: [0.333] },
              t: 0,
              s: [0],
            },
            {
              i: { x: [0.667], y: [0.667] },
              o: { x: [0.333], y: [0.333] },
              t: 75,
              s: [360],
            },
            { t: 150, s: [720] },
          ],
        },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "rc",
              d: 1,
              s: { a: 0, k: [100, 100] },
              p: { a: 0, k: [0, 0] },
              r: { a: 0, k: 10 },
              nm: "Rectangle",
              mn: "ADBE Vector Shape - Rect",
              hd: false,
            },
            {
              ty: "st",
              c: { a: 0, k: [0.2, 0.6, 0.8] },
              w: { a: 0, k: 8 },
              lc: 2,
              lj: 2,
              nm: "Stroke",
              mn: "ADBE Vector Graphic - Stroke",
              hd: false,
            },
            {
              ty: "tr",
              p: { a: 0, k: [100, 100] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              sk: { a: 0, k: 0 },
              sa: { a: 0, k: 0 },
              nm: "Transform",
            },
          ],
          nm: "Rectangle Group",
          np: 2,
          cix: 2,
          ix: 1,
          mn: "ADBE Vector Group",
          hd: false,
        },
      ],
      ip: 0,
      op: 150,
      st: 0,
      bm: 0,
    },
  ],
};

const warrantyAnimation = {
  v: "5.5.7",
  fr: 29.9700393676758,
  ip: 0,
  op: 150,
  w: 200,
  h: 200,
  nm: "Shield Animation",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Shield",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        s: {
          a: 1,
          k: [
            {
              i: { x: [0.667, 0.667], y: [0.667, 0.667] },
              o: { x: [0.333, 0.333], y: [0.333, 0.333] },
              t: 0,
              s: [100, 100],
            },
            {
              i: { x: [0.667, 0.667], y: [0.667, 0.67] },
              o: { x: [0.333, 0.333], y: [0.333, 0.333] },
              t: 75,
              s: [110, 110],
            },
            { t: 150, s: [100, 100] },
          ],
        },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "el",
              p: { a: 0, k: [0, 0] },
              s: { a: 0, k: [60, 60] },
              nm: "Circle",
              mn: "ADBE Vector Shape - Ellipse",
              hd: false,
            },
            {
              ty: "st",
              c: { a: 0, k: [0.2, 0.6, 0.8] },
              w: { a: 0, k: 8 },
              lc: 2,
              lj: 2,
              ml: { a: 0, k: 0 },
              nm: "Stroke",
              mn: "ADBE Vector Graphic - Stroke",
              hd: false,
            },
            {
              ty: "tr",
              p: { a: 0, k: [100, 100] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              sk: { a: 0, k: 0 },
              sa: { a: 0, k: 0 },
              nm: "Transform",
            },
          ],
          nm: "Circle Group",
          np: 2,
          cix: 2,
          ix: 1,
          mn: "ADBE Vector Group",
          hd: false,
        },
      ],
      ip: 0,
      op: 150,
      st: 0,
      bm: 0,
    },
  ],
};

const partsAnimation = {
  v: "5.5.7",
  fr: 29.9700393676758,
  ip: 0,
  op: 150,
  w: 200,
  h: 200,
  nm: "Parts Animation",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Box",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        p: {
          a: 1,
          k: [
            {
              i: { x: [0.667], y: [0.667] },
              o: { x: [0.333], y: [0.333] },
              t: 0,
              s: [100, 120],
            },
            {
              i: { x: [0.667], y: [0.667] },
              o: { x: [0.333], y: [0.333] },
              t: 75,
              s: [100, 90],
            },
            { t: 150, s: [100, 120] },
          ],
        },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "rc",
              d: 1,
              s: { a: 0, k: [80, 60] },
              p: { a: 0, k: [0, 0] },
              r: { a: 0, k: 10 },
              nm: "Rectangle",
              mn: "ADBE Vector Shape - Rect",
              hd: false,
            },
            {
              ty: "st",
              c: { a: 0, k: [0.2, 0.6, 0.8] },
              w: { a: 0, k: 8 },
              lc: 2,
              lj: 2,
              nm: "Stroke",
              mn: "ADBE Vector Graphic - Stroke",
              hd: false,
            },
            {
              ty: "tr",
              p: { a: 0, k: [100, 100] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              sk: { a: 0, k: 0 },
              sa: { a: 0, k: 0 },
              nm: "Transform",
            },
          ],
          nm: "Rectangle Group",
          np: 2,
          cix: 2,
          ix: 1,
          mn: "ADBE Vector Group",
          hd: false,
        },
      ],
      ip: 0,
      op: 150,
      st: 0,
      bm: 0,
    },
  ],
};

const maintenanceAnimation = {
  v: "5.5.7",
  fr: 29.9700393676758,
  ip: 0,
  op: 150,
  w: 200,
  h: 200,
  nm: "Maintenance Animation",
  ddd: 0,
  assets: [],
  layers: [
    {
      ddd: 0,
      ind: 1,
      ty: 4,
      nm: "Circle",
      sr: 1,
      ks: {
        o: { a: 0, k: 100 },
        r: {
          a: 1,
          k: [
            {
              i: { x: [0.667], y: [0.667] },
              o: { x: [0.333], y: [0.333] },
              t: 0,
              s: [0],
            },
            {
              i: { x: [0.667], y: [0.667] },
              o: { x: [0.333], y: [0.333] },
              t: 75,
              s: [360],
            },
            { t: 150, s: [720] },
          ],
        },
      },
      ao: 0,
      shapes: [
        {
          ty: "gr",
          it: [
            {
              ty: "el",
              p: { a: 0, k: [0, 0] },
              s: { a: 0, k: [60, 60] },
              nm: "Circle",
              mn: "ADBE Vector Shape - Ellipse",
              hd: false,
            },
            {
              ty: "st",
              c: { a: 0, k: [0.2, 0.6, 0.8] },
              w: { a: 0, k: 8 },
              lc: 2,
              lj: 2,
              ml: { a: 0, k: 0 },
              nm: "Stroke",
              mn: "ADBE Vector Graphic - Stroke",
              hd: false,
            },
            {
              ty: "tr",
              p: { a: 0, k: [100, 100] },
              a: { a: 0, k: [0, 0] },
              s: { a: 0, k: [100, 100] },
              r: { a: 0, k: 0 },
              o: { a: 0, k: 100 },
              sk: { a: 0, k: 0 },
              sa: { a: 0, k: 0 },
              nm: "Transform",
            },
          ],
          nm: "Circle Group",
          np: 2,
          cix: 2,
          ix: 1,
          mn: "ADBE Vector Group",
          hd: false,
        },
      ],
      ip: 0,
      op: 150,
      st: 0,
      bm: 0,
    },
  ],
};

interface ServiceIconProps {
  type: "repair" | "warranty" | "parts" | "maintenance";
  size?: number;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({
  type,
  size = 56,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let animationData;
    switch (type) {
      case "repair":
        animationData = repairAnimation;
        break;
      case "warranty":
        animationData = warrantyAnimation;
        break;
      case "parts":
        animationData = partsAnimation;
        break;
      case "maintenance":
        animationData = maintenanceAnimation;
        break;
      default:
        animationData = repairAnimation;
    }

    // Use setTimeout to ensure DOM element is rendered before initializing lottie
    const timer = setTimeout(() => {
      if (containerRef.current) {
        const anim = lottie.loadAnimation({
          container: containerRef.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData: animationData,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        });

        return () => {
          anim.destroy();
        };
      }
    }, 0);

    return () => {
      clearTimeout(timer);
    };
  }, [type]);

  return <div ref={containerRef} style={{ width: size, height: size }} />;
};
