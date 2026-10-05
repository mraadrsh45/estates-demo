"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Procedural luxury residential building
export default function BuildingModel() {
  const groupRef = useRef<THREE.Group>(null);

  const materials = useMemo(() => ({
    concrete: new THREE.MeshStandardMaterial({ color: "#2a2d2f", roughness: 0.85, metalness: 0.05 }),
    concreteDark: new THREE.MeshStandardMaterial({ color: "#1c1e20", roughness: 0.9, metalness: 0.0 }),
    glass: new THREE.MeshStandardMaterial({ color: "#8aabcc", roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.55 }),
    glassWarm: new THREE.MeshStandardMaterial({ color: "#c8a050", roughness: 0.05, metalness: 0.2, transparent: true, opacity: 0.7, emissive: "#804000", emissiveIntensity: 0.5 }),
    metal: new THREE.MeshStandardMaterial({ color: "#c6a15b", roughness: 0.3, metalness: 0.9 }),
    metalDark: new THREE.MeshStandardMaterial({ color: "#1a1a1a", roughness: 0.4, metalness: 0.85 }),
    stone: new THREE.MeshStandardMaterial({ color: "#3a3530", roughness: 0.95, metalness: 0.0 }),
    ground: new THREE.MeshStandardMaterial({ color: "#181a1c", roughness: 0.9, metalness: 0.05 }),
    groundLight: new THREE.MeshStandardMaterial({ color: "#2a2520", roughness: 0.85 }),
  }), []);

  // Subtle breathing animation
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.08) * 0.03;
    }
  });

  return (
    <group ref={groupRef} position={[0, -2, 0]}>
      {/* === GROUND PLANE === */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[40, 40]} />
        <primitive object={materials.ground} attach="material" />
      </mesh>

      {/* Paved driveway */}
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 4]}>
        <planeGeometry args={[6, 8]} />
        <primitive object={materials.groundLight} attach="material" />
      </mesh>

      {/* === MAIN TOWER === */}
      {/* Tower base / podium */}
      <mesh castShadow receiveShadow position={[0, 1.5, 0]}>
        <boxGeometry args={[8, 3, 6]} />
        <primitive object={materials.stone} attach="material" />
      </mesh>

      {/* Tower body */}
      <mesh castShadow receiveShadow position={[0, 6, 0]}>
        <boxGeometry args={[6.5, 7, 5]} />
        <primitive object={materials.concrete} attach="material" />
      </mesh>

      {/* Upper tower */}
      <mesh castShadow receiveShadow position={[0, 12, 0]}>
        <boxGeometry args={[5.5, 5, 4.5]} />
        <primitive object={materials.concreteDark} attach="material" />
      </mesh>

      {/* Penthouse */}
      <mesh castShadow receiveShadow position={[0, 15.5, 0]}>
        <boxGeometry args={[4.5, 2, 4]} />
        <primitive object={materials.concrete} attach="material" />
      </mesh>

      {/* === GLASS FACADE PANELS (front) === */}
      {[-2, 0, 2].map((x, i) => (
        <group key={i}>
          {/* Floor 1 window */}
          <mesh position={[x, 2, 3.02]}>
            <boxGeometry args={[1.4, 1.8, 0.05]} />
            <primitive object={materials.glassWarm} attach="material" />
          </mesh>
          {/* Floors 2-4 windows */}
          {[4, 5.5, 7, 8.5, 10, 11.5, 13].map((y, j) => (
            <mesh key={j} position={[x, y, 3.27]}>
              <boxGeometry args={[1.3, 1.2, 0.05]} />
              <primitive object={j < 3 ? materials.glassWarm : materials.glass} attach="material" />
            </mesh>
          ))}
        </group>
      ))}

      {/* === SIDE GLASS (left face) === */}
      {[4, 6, 8, 10, 12].map((y, j) => (
        <mesh key={j} position={[-3.27, y, 0]}>
          <boxGeometry args={[0.05, 1.1, 1.2]} />
          <primitive object={j < 2 ? materials.glassWarm : materials.glass} attach="material" />
        </mesh>
      ))}

      {/* === METAL FRAME ACCENTS === */}
      {/* Horizontal bands */}
      {[3, 5, 9, 13, 14.5].map((y, i) => (
        <mesh key={i} castShadow position={[0, y, 0]}>
          <boxGeometry args={[6.6, 0.12, 5.1]} />
          <primitive object={materials.metal} attach="material" />
        </mesh>
      ))}

      {/* Vertical columns */}
      {[-3.3, 0, 3.3].map((x, i) => (
        <mesh key={i} castShadow position={[x, 8, 0]}>
          <boxGeometry args={[0.12, 16, 0.12]} />
          <primitive object={materials.metalDark} attach="material" />
        </mesh>
      ))}

      {/* === ENTRANCE CANOPY === */}
      <mesh castShadow position={[0, 3.2, 4]}>
        <boxGeometry args={[4, 0.15, 2]} />
        <primitive object={materials.metal} attach="material" />
      </mesh>
      {/* Canopy supports */}
      {[-1.8, 1.8].map((x, i) => (
        <mesh key={i} castShadow position={[x, 1.6, 4.8]}>
          <cylinderGeometry args={[0.06, 0.06, 3.2, 8]} />
          <primitive object={materials.metalDark} attach="material" />
        </mesh>
      ))}

      {/* Entrance door frame */}
      <mesh position={[0, 1.5, 3.06]}>
        <boxGeometry args={[2.2, 3, 0.08]} />
        <primitive object={materials.metalDark} attach="material" />
      </mesh>
      <mesh position={[0, 1.5, 3.1]}>
        <boxGeometry args={[1.9, 2.7, 0.04]} />
        <primitive object={materials.glassWarm} attach="material" />
      </mesh>

      {/* === ROOFTOP PARAPET === */}
      <mesh castShadow position={[0, 16.6, 0]}>
        <boxGeometry args={[4.7, 0.4, 4.2]} />
        <primitive object={materials.metal} attach="material" />
      </mesh>

      {/* === LANDSCAPE / PLANTERS === */}
      {[[-3, 0.3, 3], [3, 0.3, 3], [-3, 0.3, -3], [3, 0.3, -3]].map(([x, y, z], i) => (
        <mesh key={i} castShadow position={[x, y, z]}>
          <boxGeometry args={[1, 0.6, 1]} />
          <primitive object={materials.stone} attach="material" />
        </mesh>
      ))}

      {/* Trees (cylinders + spheres) */}
      {[[-4.5, 0, 3], [4.5, 0, 3]].map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh castShadow position={[0, 1, 0]}>
            <cylinderGeometry args={[0.1, 0.15, 2, 6]} />
            <meshStandardMaterial color="#2a1800" roughness={1} />
          </mesh>
          <mesh castShadow position={[0, 2.6, 0]}>
            <sphereGeometry args={[0.8, 8, 8]} />
            <meshStandardMaterial color="#1a3015" roughness={0.95} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
