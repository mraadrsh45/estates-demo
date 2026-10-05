"use client";
import { useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import BuildingModel from "./BuildingModel";
import CameraController from "./CameraController";
import SceneLighting from "./Lighting";
import Hotspots from "./Hotspots";

interface Props {
  showHotspots?: boolean;
  interactive?: boolean;
}

export default function BuildingScene({ showHotspots = false, interactive = false }: Props) {
  const mouse = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouse.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    mouse.current.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
  };

  return (
    <div
      className="w-full h-full"
      onMouseMove={handleMouseMove}
      role="img"
      aria-label="Interactive 3D architectural visualization of Western Real Estates building"
    >
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [0, 2, 14], fov: 55, near: 0.1, far: 100 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />

        <Suspense fallback={null}>
          <SceneLighting />
          <BuildingModel />
          {showHotspots && <Hotspots />}
          <CameraController mouse={mouse} />

          {/* Atmospheric fog */}
          <fog attach="fog" args={["#0b0d0f", 20, 60]} />

          {/* Ground reflection environment */}
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
}
