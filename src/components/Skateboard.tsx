/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/
import * as THREE from "three";
import React, { useEffect, useMemo, useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";

type SkateboardProps = {
  deckTextureURLs: string[];
  deckTextureURL: string;
  wheelTextureURLs: string[];
  wheelTextureURL: string;
  truckColor: string;
  boltColor: string;
  wheelSpin?: boolean;
  pose?: "side" | "front";
};
type GLTFResult = GLTF & {
  nodes: {
    GripTape: THREE.Mesh;
    Wheel1: THREE.Mesh;
    Wheel2: THREE.Mesh;
    Deck: THREE.Mesh;
    Wheel4: THREE.Mesh;
    Bolts: THREE.Mesh;
    Wheel3: THREE.Mesh;
    Baseplates: THREE.Mesh;
    Truck1: THREE.Mesh;
    Truck2: THREE.Mesh;
  };
  materials: object;
};

export function Skateboard({
  deckTextureURLs,
  deckTextureURL,
  wheelTextureURLs,
  wheelTextureURL,
  truckColor,
  boltColor,
  wheelSpin = false,
  pose = "front",
}: SkateboardProps) {
  const wheelRefs = useRef<THREE.Object3D[]>([]);

  const { nodes } = useGLTF("/skateboard.gltf") as GLTFResult;

  /* WHEEL TEXTURES */
  const wheelTextures = useTexture(wheelTextureURLs);
  wheelTextures.forEach((texture) => {
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
  });

  const wheelTextureIndex = wheelTextureURLs.findIndex(
    (url) => url === wheelTextureURL,
  );

  const wheelTexture = wheelTextures[wheelTextureIndex];

  //WHEEL REFS
  const addToWheelRefs = (wheelRef: THREE.Object3D | null) => {
    if (wheelRef && !wheelRefs.current.includes(wheelRef)) {
      wheelRefs.current.push(wheelRef);
    }
  };

  useFrame((_, delta) => {
    if (wheelSpin && wheelRefs.current) {
      wheelRefs.current.forEach((wheel) => {
        wheel.rotation.x += delta * 10;
      });
    }
  });

  useEffect(() => {
    if (wheelSpin || !wheelRefs.current) return;
    wheelRefs.current.forEach((wheel) => {
      //GSAP animate rotation
      gsap.to(wheel.rotation, {
        x: "-=30",
        duration: 3,
        ease: "circ.out",
      });
    });
  }, [wheelSpin, wheelTexture]);

  /* DECK TEXTURE */
  const deckTextures = useTexture(deckTextureURLs);
  deckTextures.forEach((texture) => {
    texture.flipY = false;
    texture.colorSpace = THREE.SRGBColorSpace;
  });

  const deckTextureIndex = deckTextureURLs.findIndex(
    (url) => url === deckTextureURL,
  );
  const deckTexture = deckTextures[deckTextureIndex];

  //textures
  const gripTapeDiffuse = useTexture("/skateboard/griptape-diffuse.webp");
  const gripTapeRoughness = useTexture("/skateboard/griptape-roughness.webp");
  const metalNormalMap = useTexture("/skateboard/metal-normal.avif");
  metalNormalMap.wrapS = THREE.RepeatWrapping;
  metalNormalMap.wrapT = THREE.RepeatWrapping;
  metalNormalMap.anisotropy = 8;
  metalNormalMap.repeat.set(10, 10);

  const gripTapeMaterial = useMemo(() => {
    const material = new THREE.MeshStandardMaterial({
      map: gripTapeDiffuse,
      roughnessMap: gripTapeRoughness,
      bumpMap: gripTapeRoughness,
      roughness: 1,
      bumpScale: 5,
      metalness: 0.5,
      color: "#555555",
    });
    if (gripTapeDiffuse) {
      gripTapeDiffuse.wrapS = THREE.RepeatWrapping;
      gripTapeDiffuse.wrapT = THREE.RepeatWrapping;
      gripTapeDiffuse.repeat.set(10, 10);
      gripTapeDiffuse.needsUpdate = true;
    }
    if (gripTapeRoughness) {
      gripTapeRoughness.wrapS = THREE.RepeatWrapping;
      gripTapeRoughness.wrapT = THREE.RepeatWrapping;
      gripTapeRoughness.repeat.set(10, 10);
      gripTapeRoughness.needsUpdate = true;

      gripTapeRoughness.anisotropy = 8;
    }

    return material;
  }, [gripTapeDiffuse, gripTapeRoughness]);

  const boltMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: boltColor,
      roughness: 0.25,
      metalness: 0.8,
    });
  }, [boltColor]);

  const truckMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: truckColor,
      roughness: 0.25,
      metalness: 0.8,
      normalMap: metalNormalMap,
      normalScale: new THREE.Vector2(0.5, 0.5),
    });
  }, [metalNormalMap, truckColor]);

  const deckMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      roughness: 0.15,
      map: deckTexture,
    });
  }, [deckTexture]);

  const wheelMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      roughness: 0.15,
      map: wheelTexture,
    });
  }, [wheelTexture]);

  //pose for skateboard
  const position = useMemo(() => {
    return {
      front: {
        position: [0, 0, 0],
        rotation: [0, 0, 0],
      },
      side: {
        position: [0, 0.3, 0],
        rotation: [0, 0, Math.PI / 2],
      },
    } as const;
  }, []);

  return (
    <group
      dispose={null}
      rotation={position[pose].rotation}
      position={position[pose].position}
    >
      <group name="Scene">
        <mesh
          name="GripTape"
          castShadow
          receiveShadow
          geometry={nodes.GripTape.geometry}
          material={gripTapeMaterial}
          position={[0, 0.286, -0.002]}
        />
        <mesh
          name="Wheel1"
          castShadow
          receiveShadow
          geometry={nodes.Wheel1.geometry}
          material={wheelMaterial}
          position={[0.238, 0.086, 0.635]}
          ref={addToWheelRefs}
        />
        <mesh
          name="Wheel2"
          castShadow
          receiveShadow
          geometry={nodes.Wheel2.geometry}
          material={wheelMaterial}
          position={[-0.237, 0.086, 0.635]}
          ref={addToWheelRefs}
        />
        <mesh
          name="Deck"
          castShadow
          receiveShadow
          geometry={nodes.Deck.geometry}
          material={deckMaterial}
          position={[0, 0.271, -0.002]}
        />
        <mesh
          name="Wheel4"
          castShadow
          receiveShadow
          geometry={nodes.Wheel4.geometry}
          material={wheelMaterial}
          position={[-0.238, 0.086, -0.635]}
          rotation={[Math.PI, 0, Math.PI]}
          ref={addToWheelRefs}
        />
        <mesh
          name="Bolts"
          castShadow
          receiveShadow
          geometry={nodes.Bolts.geometry}
          material={boltMaterial}
          position={[0, 0.198, 0]}
          rotation={[Math.PI, 0, Math.PI]}
        />
        <mesh
          name="Wheel3"
          castShadow
          receiveShadow
          geometry={nodes.Wheel3.geometry}
          material={wheelMaterial}
          position={[0.237, 0.086, -0.635]}
          rotation={[Math.PI, 0, Math.PI]}
          ref={addToWheelRefs}
        />
        <mesh
          name="Baseplates"
          castShadow
          receiveShadow
          geometry={nodes.Baseplates.geometry}
          material={truckMaterial}
          position={[0, 0.211, 0]}
        />
        <mesh
          name="Truck1"
          castShadow
          receiveShadow
          geometry={nodes.Truck1.geometry}
          material={truckMaterial}
          position={[0, 0.101, -0.617]}
        />
        <mesh
          name="Truck2"
          castShadow
          receiveShadow
          geometry={nodes.Truck2.geometry}
          material={truckMaterial}
          position={[0, 0.101, 0.617]}
          rotation={[Math.PI, 0, Math.PI]}
        />
      </group>
    </group>
  );
}

useGLTF.preload("/skateboard.gltf");
