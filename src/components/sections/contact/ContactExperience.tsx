"use client";

import React, { Suspense, useState, useEffect } from "react";
import { OrbitControls, BakeShadows } from "@react-three/drei";
import { Canvas, useThree } from "@react-three/fiber";
import Computer from "./Computer";

const WebGLCleaner: React.FC = () => {
  const { gl, scene } = useThree();
  useEffect(() => {
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      scene.traverse((object: any) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            object.material.forEach((mat: any) => mat.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      gl.dispose();
    };
  }, [gl, scene]);
  return null;
};

const ContactExperience: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSlowNetwork, setIsSlowNetwork] = useState(false);

  useEffect(() => {
    const checkMobileAndNetwork = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      // Detect slow internet / Data Saver on mobile to avoid heavy 3D load
      if (mobile && "connection" in navigator) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const conn = (navigator as any).connection;
        if (conn) {
          const slowType = ["slow-2g", "2g", "3g"].includes(conn.effectiveType);
          const isSaveData = conn.saveData === true;
          if (slowType || isSaveData) {
            setIsSlowNetwork(true);
          }
        }
      }
    };

    checkMobileAndNetwork();
    window.addEventListener("resize", checkMobileAndNetwork);
    return () => window.removeEventListener("resize", checkMobileAndNetwork);
  }, []);

  // Conditional Lite Mode fallback for slow mobile internet connections
  if (isSlowNetwork && isMobile) {
    return (
      <div className="w-full h-full min-h-[260px] flex flex-col items-center justify-center p-6 bg-black text-white text-center border border-[#50C878]/20 shadow-[0_0_30px_rgba(80,200,120,0.1)] relative overflow-hidden">
        <div className="w-12 h-12 rounded-2xl bg-[#50C878]/10 border border-[#50C878]/30 flex items-center justify-center mb-4 shadow-xl backdrop-blur-md">
          <span className="text-xl">⚡</span>
        </div>
        <h3 className="font-mono text-xs font-bold uppercase tracking-widest text-[#50C878] mb-2">
          Fast-Load Lite Mode
        </h3>
        <p className="font-sans text-xs sm:text-sm text-white/60 max-w-xs mb-4">
          Optimized for your connection speed. Ready to connect and scale your fleet.
        </p>
        <button
          onClick={() => setIsSlowNetwork(false)}
          type="button"
          className="px-5 py-2 rounded-full bg-white/5 hover:bg-[#50C878]/20 border border-[#50C878]/30 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-300"
        >
          Load 3D Desk Anyway
        </button>
      </div>
    );
  }

  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={isMobile ? [1, 1.5] : [1, 2]}
      camera={{
        position: isMobile ? [0, 1.8, 6.0] : [0, 1.6, 5.2],
        fov: isMobile ? 42 : 38,
      }}
      gl={{ antialias: true, powerPreference: isMobile ? "default" : "high-performance" }}
      className="w-full h-full"
    >
      <BakeShadows />
      <WebGLCleaner />
      
      {/* Studio Ambient Light */}
      <ambientLight intensity={0.9} color="#d4f4e0" />

      {/* Main Studio Key Light (Front-Left top) — Nexar Emerald Green */}
      <directionalLight
        position={[-5, 9, 6]}
        castShadow
        intensity={3.5}
        color="#50C878"
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={25}
        shadow-bias={-0.0001}
      />

      {/* Soft Studio Fill Light (Right top) — Mint / Emerald Green */}
      <directionalLight
        position={[6, 7, 5]}
        intensity={2.0}
        color="#34D399"
      />

      {/* Backlight / Rim Light for emerald green edge definition */}
      <directionalLight
        position={[0, 8, -6]}
        intensity={2.4}
        color="#50C878"
      />

      {/* Subtle Green Accent Fill */}
      <directionalLight
        position={[-4, 3, -3]}
        intensity={1.2}
        color="#a7f3d0"
      />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableDamping={true}
        dampingFactor={0.05}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.05}
        target={[0, 0.1, 0]}
      />

      {/* Ground Shadow Plane */}
      <group scale={[1, 1, 1]}>
        <mesh
          receiveShadow
          position={[0, -0.91, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[30, 30]} />
          <meshStandardMaterial
            color="#050d08"
            roughness={0.92}
            metalness={0.05}
          />
        </mesh>
      </group>

      <Suspense fallback={null}>
        <group
          scale={isMobile ? 0.033 : 0.037}
          position={isMobile ? [0, -0.9, 0] : [0, -0.9, 0]}
          rotation={[0, 2.2, 0]}
          castShadow
        >
          <Computer />
        </group>
      </Suspense>
    </Canvas>
  );
};

export default React.memo(ContactExperience);



