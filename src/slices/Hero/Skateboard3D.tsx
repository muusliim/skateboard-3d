"use client";
import { Suspense, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { Canvas, ThreeEvent, useThree } from "@react-three/fiber";
import { ContactShadows, Environment, Html } from "@react-three/drei";
import { Skateboard } from "@/components/Skateboard";
import { Hotspot } from "./Hotspot";
import { SVGFloorPath } from "./SVGFloorPath";

const _initialCameraPosition = [1.5, 1, 1.4] as const;

type Props = {
  deckTexture: string;
  wheelTexture: string;
  truckColor: string;
  boltColor: string;
};
export function Skateboard3D({
  deckTexture,
  wheelTexture,
  truckColor,
  boltColor,
}: Props) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <Canvas
        camera={{ position: _initialCameraPosition, fov: 50 }}
        className="min-h-[50rem] w-full"
      >
        <Suspense
          fallback={
            <Html className="animate-squiggle absolute inset-0 flex items-center justify-center font-sans font-extrabold text-brand-purple ~text-xl/4xl">
              ЗАГРУЗКА...
            </Html>
          }
        >
          <Scene
            deckTexture={deckTexture}
            wheelTexture={wheelTexture}
            truckColor={truckColor}
            boltColor={boltColor}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Scene({ deckTexture, wheelTexture, truckColor, boltColor }: Props) {
  const containerRef = useRef<THREE.Group>(null); // для позиционирования оси на задние колеса скейта для back и middle анимации
  const originRef = useRef<THREE.Group>(null); // для оригинального позиционирования оси при анимации

  const [animated, setAnimated] = useState(false);
  const [showHotspot, setShowHotspot] = useState({
    front: true,
    middle: true,
    back: true,
  });

  // Позиционирование камеры на скейт
  const { camera } = useThree();

  useEffect(() => {
    camera.lookAt(new THREE.Vector3(-0.15, 0.15, 0));

    function setCameraZoom() {
      const scale = Math.max(Math.min(1000 / window.innerWidth, 2.2), 1);

      camera.position.x = _initialCameraPosition[0] * scale;
      camera.position.y = _initialCameraPosition[1] * scale;
      camera.position.z = _initialCameraPosition[2] * scale;
    }

    window.addEventListener("resize", setCameraZoom);
    setCameraZoom();

    return () => {
      window.removeEventListener("resize", setCameraZoom);
    };
  }, [camera]);

  //Анимация движения скейта по оси X
  useEffect(() => {
    if (!containerRef.current || !originRef.current) return;

    gsap.to(containerRef.current.position, {
      x: 0.2,
      repeat: -1,
      yoyo: true,
      duration: 3,
      ease: "sine.inOut",
    });

    gsap.to(originRef.current.rotation, {
      y: 0.05,
      repeat: -1,
      yoyo: true,
      duration: 3,
      ease: "sine.inOut",
    });
  }, []);

  // Анимация при нажатии на скейт
  function onSkateClick(event: ThreeEvent<MouseEvent>) {
    event.stopPropagation();

    const board = containerRef.current;
    const originBoardPos = originRef.current;

    if (!board || !originBoardPos || animated) return;

    const { name } = event.object;

    setShowHotspot((state) => ({
      ...state,
      [name]: false,
    }));

    switch (name) {
      case "back":
        backJumpTrick(board);
        break;
      case "middle":
        middleJumpTrick(board);
        break;
      case "front":
        frontJumpTrick(board, originBoardPos);
        break;
      default:
        break;
    }
  }

  //Анимация при нажатии на заднюю часть скейта
  function backJumpTrick(board: THREE.Group) {
    jumpBoard(board);
    gsap
      .timeline()
      .to(board.rotation, {
        x: -0.6,
        duration: 0.26,
        ease: "none",
      })
      .to(board.rotation, {
        x: 0.41,
        duration: 0.62,
        ease: "power2.in",
      })
      .to(board.rotation, {
        x: 0,
        duration: 0.23,
        ease: "none",
      });
  }

  //Анимация при нажатии на среднюю часть скейта
  function middleJumpTrick(board: THREE.Group) {
    jumpBoard(board);
    setAnimated(true);

    gsap
      .timeline({ onComplete: () => setAnimated(false) })
      .to(board.rotation, {
        x: -0.6,
        duration: 0.26,
        ease: "none",
      })
      .to(board.rotation, {
        x: 0.4,
        duration: 0.82,
        ease: "power2.in",
      })
      .to(
        board.rotation,
        {
          z: `+=${Math.PI * 2}`,
          duration: 0.78,
          ease: "none",
        },
        0.3,
      )
      .to(
        board.rotation,
        {
          x: 0,
          duration: 0.12,
          ease: "none",
        },
        "-=0.089",
      );
  }

  //Анимация при нажатии на переднюю часть скейта
  function frontJumpTrick(board: THREE.Group, originBoardPos: THREE.Group) {
    jumpBoard(board);
    gsap
      .timeline()
      .to(board.rotation, {
        x: -0.6,
        duration: 0.26,
        ease: "none",
      })
      .to(board.rotation, {
        x: 0.4,
        duration: 0.82,
        ease: "power2.in",
      })
      .to(
        originBoardPos.rotation,
        {
          y: `+=${Math.PI * 2}`,
          duration: 0.78,
          ease: "none",
        },
        0.3,
      )
      .to(
        board.rotation,
        {
          x: 0,
          duration: 0.12,
          ease: "none",
        },
        "-=0.074",
      );
  }

  //Анимация прыжка - функция применяется ко всем частям скейта
  function jumpBoard(board: THREE.Group) {
    gsap
      .timeline()
      .to(board.position, {
        y: 0.8,
        duration: 0.52,
        ease: "powe2.out",
        delay: 0.29,
      })

      .to(board.position, {
        y: 0,
        duration: 0.43,
        ease: "powe2.in",
      });
  }

  return (
    <group>
      <Environment files={"/hdr/warehouse-256.hdr"} />
      <group ref={originRef}>
        <group ref={containerRef} position={[-0.15, 0, -0.635]}>
          {" "}
          {/* меняем ось смещения скейта  - типа transformOrigin*/}
          <group position={[0, -0.086, 0.635]}>
            <Skateboard
              deckTextureURLs={[deckTexture]}
              deckTextureURL={deckTexture}
              wheelTextureURLs={[wheelTexture]}
              wheelTextureURL={wheelTexture}
              truckColor={truckColor}
              boltColor={boltColor}
              wheelSpin={true}
            />
            {/* FRONT SKATE ANIMATION */}
            <Hotspot
              position={[0.1, 0.38, 0.9]}
              isVisible={!animated && showHotspot.front}
              color={"#2123b8"}
            />
            <mesh position={[0, 0.27, 0.9]} name="front" onClick={onSkateClick}>
              <boxGeometry args={[0.6, 0.2, 0.58]} />
              <meshBasicMaterial visible={false} />
            </mesh>
            {/* MIDDLE SKATE ANIMATION */}
            <Hotspot
              position={[0, 0.33, 0]}
              isVisible={!animated && showHotspot.middle}
              color={"#e7a23a"}
            />
            <mesh position={[0, 0.27, 0]} name="middle" onClick={onSkateClick}>
              <boxGeometry args={[0.6, 0.1, 1.2]} />
              <meshBasicMaterial visible={false} />
            </mesh>
            {/* BACK SKATE ANIMATION */}
            <Hotspot
              position={[0.05, 0.38, -0.9]}
              isVisible={!animated && showHotspot.back}
              color={"#cb3e5c"}
            />
            <mesh position={[0, 0.27, -0.9]} name="back" onClick={onSkateClick}>
              <boxGeometry args={[0.6, 0.2, 1.2]} />
              <meshBasicMaterial visible={false} />
            </mesh>
          </group>
        </group>
      </group>
      <ContactShadows opacity={0.5} position={[0, -0.09, 0]} />

      <group
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
        position={[-0.4, -0.1, -0.5]}
        scale={0.2}
      >
        <Html
          wrapperClass="pointer-events-none"
          transform
          zIndexRange={[0, 0]}
          occlude="blending"
        >
          <SVGFloorPath />
        </Html>
      </group>
    </group>
  );
}
