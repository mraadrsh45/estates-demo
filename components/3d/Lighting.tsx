"use client";

export default function SceneLighting() {
  return (
    <>
      {/* Ambient */}
      <ambientLight intensity={0.3} color="#e8d5b0" />
      {/* Key light — warm golden side */}
      <directionalLight
        position={[8, 12, 4]}
        intensity={2.2}
        color="#f5deb3"
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={60}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      {/* Fill light — cool sky */}
      <directionalLight
        position={[-6, 8, -4]}
        intensity={0.5}
        color="#c8d8f0"
      />
      {/* Ground bounce */}
      <hemisphereLight
        args={["#b0c8e8", "#3d2a10", 0.4]}
      />
      {/* Accent point inside building */}
      <pointLight position={[0, 3, 1]} intensity={1.5} color="#ffd580" distance={12} />
      <pointLight position={[-3, 1, 2]} intensity={0.8} color="#ffb347" distance={8} />
      <pointLight position={[3, 1, 2]} intensity={0.8} color="#ffb347" distance={8} />
    </>
  );
}
