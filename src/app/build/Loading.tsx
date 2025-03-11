"use client";
import { useProgress } from "@react-three/drei";
import clsx from "clsx";

import { Logo } from "@/components/Logo";
export default function Loading() {
  const { progress } = useProgress();
  return (
    <div
      className={clsx(
        "absolute inset-0 flex flex-col items-center justify-center overflow-hidden bg-brand-navy font-sans text-2xl text-[15vw] text-white transition-opacity duration-1000",
        progress >= 100 ? "pointer-events-none opacity-0" : "opacity-100",
      )}
    >
      <Logo className="w-[15vw] animate-squiggle text-brand-purple" />
      <p className="w-full animate-squiggle text-center leading-none text-brand-lime">
        ЗАГРУЗКА...
      </p>
    </div>
  );
}
