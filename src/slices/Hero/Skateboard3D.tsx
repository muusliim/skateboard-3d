"use client";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import React, { Suspense } from "react";
import { Skateboard } from "@/components/Skateboard";
export function Skateboard3D() {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <Canvas
        camera={{ position: [1.5, 1, 1.4], fov: 50 }}
        className="min-h-[60rem] w-full"
      >
        <Suspense fallback={null}>
          <OrbitControls />
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Scene() {
  return (
    <group position={[0, -0.2, 0]}>
      <Environment files={"/hdr/warehouse-256.hdr"} />
      <Skateboard />
      <ContactShadows opacity={0.5} position={[0, -0.07, 0]} />
    </group>
  );
}
