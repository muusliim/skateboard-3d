"use client";

import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { useShallow } from "zustand/shallow";
import { asImageSrc } from "@prismicio/client";
import useCustomizationStore from "@/stores/useCustomizationStore";
import {
  CameraControls,
  Environment,
  Preload,
  useTexture,
} from "@react-three/drei";

import {
  BoardCustomizerDocumentDataDecksItem,
  BoardCustomizerDocumentDataMetalsItem,
  BoardCustomizerDocumentDataWheelsItem,
} from "../../../prismicio-types";
import { Skateboard } from "@/components/Skateboard";

const _default_wheel_texture = "/skateboard/SkateWheel1.png";
const _default_deck_texture = "/skateboard/Deck.webp";
const _default_truck_color = "#6F6E6A";
const _default_bolt_color = "#6F6E6A";
const _env_color = "#25292d";
type Props = {
  wheelTextureURLs: string[];
  deckTextureURLs: string[];
  defaultBolt: BoardCustomizerDocumentDataMetalsItem;
  defaultDeck: BoardCustomizerDocumentDataDecksItem;
  defaultTruck: BoardCustomizerDocumentDataMetalsItem;
  defaultWheel: BoardCustomizerDocumentDataWheelsItem;
};

export default function Preview({
  wheelTextureURLs,
  deckTextureURLs,
  defaultBolt,
  defaultDeck,
  defaultTruck,
  defaultWheel,
}: Props) {
  const {
    selectedWheel,
    selectedBolt,
    selectedDeck,
    selectedTruck,
    setWheel,
    setBolt,
    setDeck,
    setTruck,
  } = useCustomizationStore(
    useShallow((state) => ({
      selectedWheel: state.selectedWheel,
      selectedBolt: state.selectedBolt,
      selectedDeck: state.selectedDeck,
      selectedTruck: state.selectedTruck,
      setWheel: state.setWheel,
      setBolt: state.setBolt,
      setDeck: state.setDeck,
      setTruck: state.setTruck,
    })),
  );

  useEffect(() => {
    if (defaultWheel && defaultDeck && defaultTruck && defaultBolt) {
      setWheel(defaultWheel);
      setBolt(defaultBolt);
      setDeck(defaultDeck);
      setTruck(defaultTruck);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const wheelTextureURL =
    asImageSrc(selectedWheel?.texture) ?? _default_wheel_texture;
  const deckTextureURL =
    asImageSrc(selectedDeck?.texture) ?? _default_deck_texture;
  const truckColor = selectedTruck?.color ?? _default_truck_color;
  const boltColor = selectedBolt?.color ?? _default_bolt_color;

  const cameraControls = useRef<CameraControls>(null);

  return (
    <Canvas shadows camera={{ position: [2.5, 1, 0], fov: 50 }}>
      <Suspense fallback={null}>
        <CameraControls
          ref={cameraControls}
          minDistance={1.2}
          maxDistance={4}
          minPolarAngle={Math.PI / 8}
          maxPolarAngle={Math.PI / 2 - 0.1}
        />
        <Environment
          files={"/hdr/warehouse-512.hdr"}
          environmentIntensity={0.7}
        />
        <directionalLight
          castShadow
          lookAt={[0, 0, 0]}
          position={[1, 1, 1]}
          intensity={1.8}
        />
        <fog attach="fog" args={[_env_color, 3, 10]} />
        <color attach="background" args={[_env_color]} />
        <Skateboard
          deckTextureURLs={deckTextureURLs}
          wheelTextureURLs={wheelTextureURLs}
          boltColor={boltColor}
          truckColor={truckColor}
          wheelTextureURL={wheelTextureURL}
          deckTextureURL={deckTextureURL}
          pose="side"
        />
        <StageFloor />
      </Suspense>
      <Preload all />
    </Canvas>
  );
}

function StageFloor() {
  const normalMap = useTexture("/concrete-normal.avif");
  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(25, 25);
  normalMap.anisotropy = 8;
  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -0.005, 0]}
      receiveShadow
      castShadow
    >
      <circleGeometry args={[20, 32]} />
      <meshStandardMaterial
        roughness={0.8}
        normalMap={normalMap}
        color={_env_color}
      />
    </mesh>
  );
}
