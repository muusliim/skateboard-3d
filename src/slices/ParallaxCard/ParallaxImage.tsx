"use client";

import { ImageField } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { useEffect, useRef } from "react";

type Props = {
  foregroundImage: ImageField;
  backgroundImage: ImageField;
  className?: string;
};

export function ParallaxImage({
  foregroundImage,
  backgroundImage,
  className,
}: Props) {
  const bgRef = useRef<HTMLDivElement>(null);
  const fgRef = useRef<HTMLDivElement>(null);

  const targetPosition = useRef({ x: 0, y: 0 });  //чтоб не было перерендера использовал useRef вместо useState
  const currentPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const frameAnimation = requestAnimationFrame(animate);
    window.addEventListener("mousemove", onMouseMove);

    function onMouseMove(e: MouseEvent) {
      const { innerWidth, innerHeight } = window;
      const xPercent = (e.clientX / innerWidth - 0.5) * 2; //значение от -1 до 1 по оси Х
      const yPercent = (e.clientY / innerHeight - 0.5) * 2; // значение от -1 до 1 по оси У

      targetPosition.current = { x: xPercent * -20, y: yPercent * -20 }; // значение от -20 до 20 по оси Х и У, чтоб движение начиналось за пределами секции
    }

    function animate() {
      const { x: targetX, y: targetY } = targetPosition.current; //переименовываем, чтоб не было конфликта с переменной currentPosition (х и y)
      const { x: currentX, y: currentY } = currentPosition.current;

      const newX = currentX + (targetX - currentX) / 50  // для плавного движение - аналог lerp
      const newY = currentY + (targetY - currentY) / 50;

      currentPosition.current = { x: newX, y: newY };

      if (bgRef.current) {
        bgRef.current.style.transform = `translate(${newX}px, ${newY}px)`;
      }
      if (fgRef.current) {
        fgRef.current.style.transform = `translate(${newX * 2.8}px, ${newY * 2.8}px)`;
      }

      requestAnimationFrame(animate);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(frameAnimation);
    };
  });

  return (
    <div className={clsx("grid grid-cols-1 place-items-center", className)}>
      <div ref={bgRef} className="col-start-1 row-start-1 transition-transform">
        <PrismicNextImage alt="" field={backgroundImage} className="w-11/12 animate-squiggle" />
      </div>
      <div
        ref={fgRef}
        className="col-start-1 row-start-1 h-full w-full place-items-center transition-transform"
      >
        <PrismicNextImage
          alt=""
          field={foregroundImage}
          className={clsx(className, "h-full max-h-[500px] w-auto")}
          imgixParams={{ height: 600 }}
        />
      </div>
    </div>
  );
}
