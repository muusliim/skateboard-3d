"use client";
import { ReactNode, useEffect, useRef } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  duration?: number;
};

export default function SlideInAnimation({
  children,
  duration = 0.6,
  delay = 0,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const elem = ref.current;
    if (!elem) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          elem.style.animation = `slide-in-animation-show ${duration}s ease ${delay}s forwards`;
          observer.unobserve(elem);
        }
      },
      { threshold: 0, rootMargin: '-130px' },
    );

    observer.observe(elem);

    return () => {
      observer.disconnect();
    };
  }, [duration, delay]);

  return (
    <div ref={ref} className="slide-in-animation-hidden">
      {children}
    </div>
  );
}
