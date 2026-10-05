"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface CameraControllerProps {
  mouse: React.MutableRefObject<{ x: number; y: number }>;
}

export default function CameraController({ mouse }: CameraControllerProps) {
  const ref = useRef<THREE.PerspectiveCamera>(null);

  useFrame((state) => {
    // Subtle parallax mouse-driven camera drift
    const targetX = mouse.current.x * 0.6;
    const targetY = mouse.current.y * 0.3;
    state.camera.position.x += (targetX - state.camera.position.x) * 0.03;
    state.camera.position.y += (targetY + 2 - state.camera.position.y) * 0.03;
    state.camera.lookAt(0, 1.5, 0);
  });

  return null;
}
