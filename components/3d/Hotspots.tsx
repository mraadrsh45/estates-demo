"use client";
import { useState } from "react";
import { Html } from "@react-three/drei";
import { X } from "lucide-react";

const hotspots = [
  {
    id: "entrance",
    position: [0, -0.5, 3.5] as [number, number, number],
    label: "Entrance",
    description: "Premium double-height entrance with architectural canopy and glass facade.",
  },
  {
    id: "building",
    position: [2.5, 6, 2] as [number, number, number],
    label: "Building",
    description: "Contemporary multi-story design with concrete, glass, and metal accents.",
  },
  {
    id: "landscape",
    position: [-4, -1.5, 2] as [number, number, number],
    label: "Landscape",
    description: "Manicured greenery and architectural planters surrounding the property.",
  },
  {
    id: "penthouse",
    position: [1.5, 13.5, 2] as [number, number, number],
    label: "Upper Floors",
    description: "Premium upper-level units with architectural floor-to-ceiling glazing.",
  },
];

export default function Hotspots() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <>
      {hotspots.map((h) => (
        <group key={h.id} position={h.position}>
          {/* Pulse ring */}
          <mesh onClick={() => setActive(active === h.id ? null : h.id)}>
            <sphereGeometry args={[0.18, 12, 12]} />
            <meshStandardMaterial
              color={active === h.id ? "#C6A15B" : "#ffffff"}
              emissive={active === h.id ? "#C6A15B" : "#888888"}
              emissiveIntensity={active === h.id ? 1 : 0.5}
              transparent
              opacity={0.9}
            />
          </mesh>

          {/* Info panel */}
          {active === h.id && (
            <Html
              center
              distanceFactor={8}
              style={{ pointerEvents: "none" }}
            >
              <div
                style={{
                  background: "rgba(11,13,15,0.92)",
                  border: "1px solid rgba(198,161,91,0.4)",
                  borderRadius: "4px",
                  padding: "12px 16px",
                  minWidth: "160px",
                  pointerEvents: "all",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "6px",
                  }}
                >
                  <span
                    style={{
                      color: "#C6A15B",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {h.label}
                  </span>
                  <button
                    onClick={() => setActive(null)}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#8C8C87",
                      cursor: "pointer",
                      padding: "0 0 0 8px",
                    }}
                    aria-label="Close"
                  >
                    <X size={12} />
                  </button>
                </div>
                <p style={{ color: "#c8c4bc", fontSize: "12px", lineHeight: 1.5, margin: 0 }}>
                  {h.description}
                </p>
              </div>
            </Html>
          )}
        </group>
      ))}
    </>
  );
}
