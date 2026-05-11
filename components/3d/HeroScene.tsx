"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { PerspectiveCamera, Float, Stars, Sparkles } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";
import { motion } from "framer-motion";

function TechGrid() {
  const gridRef = useRef<THREE.GridHelper>(null);
  
  useFrame((state) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.performance.now() * 0.0005) % 2;
    }
  });

  return (
    <gridHelper 
      ref={gridRef} 
      args={[100, 50, "#FF9933", "#111111"]} 
      position={[0, -2, 0]} 
      rotation={[0, 0, 0]}
    />
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 bg-white">
      <Canvas dpr={[1, 2]} gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 2, 10]} fov={35} />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={50} color="#FF9933" />

        <Suspense fallback={null}>
          <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
            <Sparkles count={50} scale={15} size={2} speed={0.5} color="#FF9933" />
          </Float>
          {/* Removed Stars for light theme visibility */}
          <gridHelper 
            args={[100, 50, "#FF9933", "#dddddd"]} 
            position={[0, -2, 0]} 
          />
        </Suspense>
        
        <fog attach="fog" args={["#ffffff", 5, 20]} />
      </Canvas>
      
      {/* Light overlay for fade effect */}
      <motion.div 
        className="absolute inset-0 bg-white pointer-events-none"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 2, delay: 0.5 }}
      />
    </div>
  );
}
