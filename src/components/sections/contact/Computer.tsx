"use client";

import React, { useMemo } from "react";
import { useFBX, useTexture } from "@react-three/drei";
import * as THREE from "three";
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";

/* ------------------------------------------------------------------
   1. OFFICE CHAIR (Caramel leather & black 5-star swivel base)
   ------------------------------------------------------------------ */
function OfficeChair({
  position = [-22.0, 0, -4.0],
  rotation = [0, Math.PI / 2 + 0.15, 0],
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const leatherMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xa86c3a), // Rich caramel / tan leather
        roughness: 0.38,
        metalness: 0.06,
      }),
    []
  );

  const blackMetalMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x151618),
        roughness: 0.25,
        metalness: 0.85,
      }),
    []
  );

  const darkPlasticMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x1c1e20),
        roughness: 0.55,
        metalness: 0.1,
      }),
    []
  );

  return (
    <group position={position} rotation={rotation}>
      {/* 5-Star Caster Base */}
      <group position={[0, 0, 0]}>
        {/* Central Hub */}
        <mesh position={[0, 2.2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[2.0, 2.4, 2.2, 16]} />
          <primitive object={blackMetalMaterial} attach="material" />
        </mesh>

        {/* 5 Base Legs */}
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i * Math.PI * 2) / 5;
          const legLength = 11.5;
          const x = Math.sin(angle) * (legLength / 2);
          const z = Math.cos(angle) * (legLength / 2);
          const casterX = Math.sin(angle) * legLength;
          const casterZ = Math.cos(angle) * legLength;
          return (
            <group key={i}>
              {/* Star Leg Arm */}
              <mesh
                position={[x, 1.8, z]}
                rotation={[0, angle, 0]}
                castShadow
                receiveShadow
              >
                <boxGeometry args={[1.8, 1.4, legLength]} />
                <primitive object={blackMetalMaterial} attach="material" />
              </mesh>

              {/* Dual-Wheel Caster */}
              <group position={[casterX, 0.8, casterZ]}>
                <mesh castShadow receiveShadow>
                  <sphereGeometry args={[0.9, 12, 12]} />
                  <primitive object={darkPlasticMaterial} attach="material" />
                </mesh>
                <mesh
                  rotation={[0, 0, Math.PI / 2]}
                  position={[0, 0, 0]}
                  castShadow
                >
                  <cylinderGeometry args={[0.8, 0.8, 1.2, 12]} />
                  <primitive object={darkPlasticMaterial} attach="material" />
                </mesh>
              </group>
            </group>
          );
        })}

        {/* Gas Lift Hydraulic Cylinder */}
        <mesh position={[0, 8.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[1.1, 1.3, 11, 16]} />
          <primitive object={blackMetalMaterial} attach="material" />
        </mesh>
        <mesh position={[0, 13.2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.8, 0.8, 4, 16]} />
          <meshStandardMaterial
            color="#c0c4c8"
            roughness={0.15}
            metalness={0.95}
          />
        </mesh>
      </group>

      {/* Seat Assembly */}
      <group position={[0, 15.5, 0]}>
        {/* Seat Mechanism */}
        <mesh position={[0, -0.6, 0]} castShadow receiveShadow>
          <boxGeometry args={[11, 1.2, 11]} />
          <primitive object={blackMetalMaterial} attach="material" />
        </mesh>

        {/* Leather Seat Cushion */}
        <mesh position={[0, 0.8, 0.5]} castShadow receiveShadow>
          <boxGeometry args={[15.5, 3.2, 15]} />
          <primitive object={leatherMaterial} attach="material" />
        </mesh>

        {/* Curved Armrests */}
        {[-1, 1].map((side) => (
          <group key={side} position={[side * 8.6, 4.2, 0]}>
            <mesh
              position={[0, 1.6, -0.5]}
              rotation={[0.08, 0, 0]}
              castShadow
              receiveShadow
            >
              <boxGeometry args={[1.8, 0.8, 14.5]} />
              <primitive object={darkPlasticMaterial} attach="material" />
            </mesh>
            <mesh
              position={[0, -1.2, 4.8]}
              rotation={[-0.3, 0, 0]}
              castShadow
              receiveShadow
            >
              <cylinderGeometry args={[0.45, 0.45, 6, 12]} />
              <primitive object={blackMetalMaterial} attach="material" />
            </mesh>
            <mesh
              position={[0, 0.2, -6.0]}
              rotation={[0.35, 0, 0]}
              castShadow
              receiveShadow
            >
              <cylinderGeometry args={[0.45, 0.45, 7, 12]} />
              <primitive object={blackMetalMaterial} attach="material" />
            </mesh>
          </group>
        ))}

        {/* Backrest Assembly */}
        <group position={[0, 11.5, -6.8]} rotation={[-0.12, 0, 0]}>
          {/* Black Back Shell */}
          <mesh position={[0, 0, -0.6]} castShadow receiveShadow>
            <boxGeometry args={[14.2, 19.5, 1.2]} />
            <primitive object={blackMetalMaterial} attach="material" />
          </mesh>

          {/* Top Header with Vent Holes Detail */}
          <mesh position={[0, 9.8, -0.6]} castShadow receiveShadow>
            <boxGeometry args={[14.2, 2.5, 1.3]} />
            <primitive object={darkPlasticMaterial} attach="material" />
          </mesh>

          {/* Caramel Leather Cushion */}
          <mesh position={[0, -0.5, 0.4]} castShadow receiveShadow>
            <boxGeometry args={[13.2, 17.5, 2.0]} />
            <primitive object={leatherMaterial} attach="material" />
          </mesh>
        </group>
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------
   2. APPLE CINEMA / MODERN PC MONITOR (Sleek aluminum stand + bezel)
   ------------------------------------------------------------------ */
function Monitor({
  position = [3.0, 31.22, 6.0],
  rotation = [0, -Math.PI / 2 - 0.1, 0],
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const aluminumMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xd8dcde),
        roughness: 0.22,
        metalness: 0.9,
      }),
    []
  );

  const bezelMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x181a1c),
        roughness: 0.28,
        metalness: 0.8,
      }),
    []
  );

  const screenGlassMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0x0a1c12),
        emissive: new THREE.Color(0x0e3520),
        emissiveIntensity: 0.35,
        roughness: 0.1,
        metalness: 0.4,
      }),
    []
  );

  return (
    <group position={position} rotation={rotation}>
      {/* Aluminum Stand Base */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[10.5, 0.5, 8.5]} />
        <primitive object={aluminumMaterial} attach="material" />
      </mesh>

      {/* Tilted Aluminum Neck */}
      <mesh
        position={[0, 6.5, -1.2]}
        rotation={[-0.18, 0, 0]}
        castShadow
        receiveShadow
      >
        <boxGeometry args={[3.2, 12, 0.8]} />
        <primitive object={aluminumMaterial} attach="material" />
      </mesh>

      {/* Monitor Display Head */}
      <group position={[0, 13.5, 0]}>
        {/* Back Housing */}
        <mesh position={[0, 0, -0.5]} castShadow receiveShadow>
          <boxGeometry args={[25, 16.5, 1.2]} />
          <primitive object={aluminumMaterial} attach="material" />
        </mesh>

        {/* Front Bezel */}
        <mesh position={[0, 0, 0.15]} castShadow receiveShadow>
          <boxGeometry args={[24.6, 16.2, 0.3]} />
          <primitive object={bezelMaterial} attach="material" />
        </mesh>

        {/* Display Panel Screen (Facing Front) */}
        <mesh position={[0, 0.6, 0.32]} castShadow>
          <planeGeometry args={[23.2, 13.8]} />
          <primitive object={screenGlassMaterial} attach="material" />
        </mesh>

        {/* Aluminum Bottom Chin */}
        <mesh position={[0, -7.0, 0.32]}>
          <planeGeometry args={[23.2, 1.4]} />
          <primitive object={aluminumMaterial} attach="material" />
        </mesh>
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------
   3. SLEEK ALUMINUM KEYBOARD (Apple Magic Keyboard Style)
   ------------------------------------------------------------------ */
function Keyboard({
  position = [-6.0, 31.22, 6.0],
  rotation = [0, -Math.PI / 2, 0],
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Aluminum Top Case */}
      <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[18, 0.5, 6.2]} />
        <meshStandardMaterial color="#d4d8dc" roughness={0.25} metalness={0.85} />
      </mesh>
      {/* Keys Bed */}
      <mesh position={[0, 0.52, 0]} castShadow>
        <boxGeometry args={[17.2, 0.2, 5.5]} />
        <meshStandardMaterial color="#f0f2f5" roughness={0.35} metalness={0.1} />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------
   4. WIRELESS OPTICAL MOUSE
   ------------------------------------------------------------------ */
function Mouse({
  position = [-6.0, 31.22, 17.5],
  rotation = [0, -Math.PI / 2, 0],
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* Mouse Body */}
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <capsuleGeometry args={[1.3, 2.0, 8, 16]} />
        <meshStandardMaterial color="#16181a" roughness={0.2} metalness={0.8} />
      </mesh>
      {/* Aluminum Perimeter Trim */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <capsuleGeometry args={[1.35, 2.0, 4, 16]} />
        <meshStandardMaterial
          color="#d4d8dc"
          roughness={0.15}
          metalness={0.95}
        />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------
   5. ARTICULATED DESK LAMP (Polished copper / rose bronze)
   ------------------------------------------------------------------ */
function DeskLamp({
  position = [4.0, 31.22, -28.0],
  rotation = [0, Math.PI * 0.7, 0],
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const copperMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xc27a52), // Polished copper / rose bronze
        roughness: 0.22,
        metalness: 0.88,
      }),
    []
  );

  const chromeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color(0xe0e4e8),
        roughness: 0.15,
        metalness: 0.95,
      }),
    []
  );

  return (
    <group position={position} rotation={rotation}>
      {/* Weighted Circular Base */}
      <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[3.2, 3.5, 1.6, 24]} />
        <primitive object={copperMaterial} attach="material" />
      </mesh>
      {/* Base Swivel Hinge */}
      <mesh position={[0, 2.0, 0]} castShadow>
        <sphereGeometry args={[1.1, 16, 16]} />
        <primitive object={chromeMaterial} attach="material" />
      </mesh>

      {/* Lower Articulated Rod */}
      <group position={[0, 2.0, 0]} rotation={[0.4, 0, 0]}>
        <mesh position={[0, 7.5, 0]} castShadow>
          <cylinderGeometry args={[0.3, 0.3, 15, 12]} />
          <primitive object={chromeMaterial} attach="material" />
        </mesh>
        {/* Elbow Joint */}
        <mesh position={[0, 15, 0]} castShadow>
          <sphereGeometry args={[1.0, 16, 16]} />
          <primitive object={copperMaterial} attach="material" />
        </mesh>

        {/* Upper Articulated Rod */}
        <group position={[0, 15, 0]} rotation={[-1.1, 0, 0]}>
          <mesh position={[0, 6, 0]} castShadow>
            <cylinderGeometry args={[0.3, 0.3, 12, 12]} />
            <primitive object={chromeMaterial} attach="material" />
          </mesh>

          {/* Lamp Shade Dome */}
          <group position={[0, 12.5, 0]} rotation={[0.9, 0, 0]}>
            <mesh position={[0, 0, 0]} castShadow receiveShadow>
              <coneGeometry args={[3.2, 4.5, 20, 1, true]} />
              <primitive object={copperMaterial} attach="material" />
            </mesh>
            {/* Top Cap */}
            <mesh position={[0, 2.4, 0]} castShadow>
              <sphereGeometry args={[1.4, 16, 16]} />
              <primitive object={copperMaterial} attach="material" />
            </mesh>
            {/* Emerald Green Bulb Light */}
            <pointLight
              position={[0, -1, 0]}
              intensity={2.2}
              distance={14}
              color="#50C878"
            />
          </group>
        </group>
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------
   6. MAIN COMPUTER DESK (FBX + High-Gloss Dark Mahogany PBR)
   ------------------------------------------------------------------ */
export function Computer(props: React.JSX.IntrinsicElements["group"]) {
  const fbx = useFBX("/models/contact-us-pc/Computer_Desk.FBX");
  const woodTexture = useTexture(
    "/models/contact-us-pc/Dark-Wood-Texture-520x339.jpg"
  );

  const configuredScene = useMemo(() => {
    // Configure wood texture wrapping and filtering for high gloss
    woodTexture.wrapS = THREE.RepeatWrapping;
    woodTexture.wrapT = THREE.RepeatWrapping;
    woodTexture.repeat.set(2.5, 2.5);
    woodTexture.colorSpace = THREE.SRGBColorSpace;

    const clone = fbx.clone(true);

    // High-Gloss Dark Mahogany Wood Material
    const woodMaterial = new THREE.MeshStandardMaterial({
      map: woodTexture,
      roughness: 0.18,
      metalness: 0.04,
      color: new THREE.Color(0x503525),
    });

    // Frosted Translucent Glass Modesty Panel
    const modestyGlassMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xf0f4f8),
      roughness: 0.22,
      metalness: 0.1,
      transparent: true,
      opacity: 0.88,
    });

    // Horizontal Slats
    const slatMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x3a2518),
      roughness: 0.2,
      metalness: 0.1,
    });

    // Chrome Handles
    const handleMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0xdce0e4),
      roughness: 0.15,
      metalness: 0.95,
    });

    // Dark Charcoal Base Trim
    const baseTrimMaterial = new THREE.MeshStandardMaterial({
      color: new THREE.Color(0x181a1c),
      roughness: 0.35,
      metalness: 0.7,
    });

    // Apply materials and geometry optimization
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.geometry) {
          try {
            const optimizedGeom = BufferGeometryUtils.mergeVertices(
              child.geometry,
              0.001
            );
            optimizedGeom.computeVertexNormals();
            child.geometry = optimizedGeom;
          } catch {
            // Keep original if merge not applicable
          }
        }

        const name = child.name.toLowerCase();
        if (name.includes("semi_transparent")) {
          child.material = modestyGlassMaterial;
        } else if (name.includes("box008")) {
          child.material = slatMaterial;
        } else if (
          name.includes("box006") ||
          name.includes("box005") ||
          name.includes("handle")
        ) {
          child.material = handleMaterial;
        } else if (
          name.includes("box001") ||
          name.includes("box003") ||
          name.includes("foot")
        ) {
          child.material = baseTrimMaterial;
        } else {
          child.material = woodMaterial;
        }
      }
    });

    return clone;
  }, [fbx, woodTexture]);

  return (
    <group {...props} dispose={null}>
      <group position={[3.12, 0, -4.71]}>
        {/* The Executive Desk */}
        <primitive object={configuredScene} />

        {/* Office Chair rotated towards the table */}
        <OfficeChair
          position={[-22.0, 0, -4.0]}
          rotation={[0, Math.PI / 2 + 0.15, 0]}
        />

        {/* Apple Cinema Monitor shifted towards center-left of desk */}
        <Monitor
          position={[3.0, 31.22, 6.0]}
          rotation={[0, -Math.PI / 2 - 0.1, 0]}
        />

        {/* Sleek Aluminum Keyboard in front of monitor */}
        <Keyboard
          position={[-6.0, 31.22, 6.0]}
          rotation={[0, -Math.PI / 2, 0]}
        />

        {/* Wireless Mouse next to keyboard */}
        <Mouse
          position={[-6.0, 31.22, 17.5]}
          rotation={[0, -Math.PI / 2, 0]}
        />

        {/* Articulated Desk Lamp on left rear of desk */}
        <DeskLamp
          position={[4.0, 31.22, -28.0]}
          rotation={[0, Math.PI * 0.7, 0]}
        />
      </group>
    </group>
  );
}

// Preload the assets for instant rendering
useFBX.preload("/models/contact-us-pc/Computer_Desk.FBX");
useTexture.preload("/models/contact-us-pc/Dark-Wood-Texture-520x339.jpg");

export default React.memo(Computer);
