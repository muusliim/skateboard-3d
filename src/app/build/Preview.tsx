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
//АНИмация камеры при смены деки
  useEffect(() => {
    setCameraControls(
      new THREE.Vector3(0, 0.3, 0),
      new THREE.Vector3(1.5, 0.8, 0),
    );
  }, [selectedDeck]);

  //Анимация камеры при смены колес
  useEffect(() => {
    setCameraControls(
      new THREE.Vector3(-0.52, -0.8, -0.1),
      new THREE.Vector3(0.1, 0.9, 0.9),
    );
  }, [selectedWheel]);

  //Анимация камеры при смены подвески
  useEffect(() => {
    setCameraControls(
        new THREE.Vector3(-0.72, -0.9, -1.1),
        new THREE.Vector3(0.1, 0.56, 1.1),
    );
  }, [selectedTruck]);
  // Анимация камеры при смены болтов
  useEffect(() => {
    setCameraControls(
        new THREE.Vector3(-0.25, 0.3, 0.62),
        new THREE.Vector3(-0.5, 0.35, 0.8),
    );
  }, [selectedBolt]);

  function setCameraControls(target: THREE.Vector3, position: THREE.Vector3) {
    if (!cameraControls.current) return;

    cameraControls.current.setTarget(target.x, target.y, target.z, true); // true для установки transition
    cameraControls.current.setPosition(
      position.x,
      position.y,
      position.z,
      true,
    );
  }

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
