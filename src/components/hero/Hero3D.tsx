// Hero3D.tsx - Performance-first 3D
import React, { useState, useEffect, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Performance-optimized pump model (40 triangles)
const PumpModel = () => {
  // Create a simple geometry with minimal triangles for performance
  const geometry = new THREE.ConeGeometry(0.5, 1, 8); // Low segment count for performance
  const material = new THREE.MeshStandardMaterial({
    color: "#4F46E5",
    metalness: 0.7,
    roughness: 0.3,
  });

  return (
    <mesh geometry={geometry} material={material}>
      <meshStandardMaterial color="#4F46E5" metalness={0.7} roughness={0.3} />
    </mesh>
  );
};

// Floating animation for the 3D object
const FloatingPump = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { scene } = useThree();

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating motion
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
    }
  });

  return <PumpModel />;
};

// Main Hero3D component
const Hero3D = () => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simple visibility detection
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full h-96 relative overflow-hidden">
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 5], fov: 50 }}
          className="w-full h-full"
        >
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 0]} intensity={1.5} color="#4F46E5" />
          <Suspense fallback={null}>
            <FloatingPump />
          </Suspense>
        </Canvas>
      )}
      {!isVisible && (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-indigo-500 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-8 h-8 bg-white rounded-full"></div>
            </div>
            <p className="text-gray-500 text-sm">Loading 3D experience...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hero3D;
