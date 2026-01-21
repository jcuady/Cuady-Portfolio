"use client";

import { useRef, useEffect, Children, ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function TiltWrapper({ children, className }: { children: ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 400, damping: 90 });
  const mouseY = useSpring(y, { stiffness: 400, damping: 90 });

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const xPos = clientX - left - width / 2;
    const yPos = clientY - top - height / 2;
    x.set(xPos);
    y.set(yPos);
  }

  const rotateX = useTransform(mouseY, [-100, 100], [1.5, -1.5]); 
  const rotateY = useTransform(mouseX, [-100, 100], [-1.5, 1.5]);

  return (
    <motion.div
      style={{ 
        rotateX, 
        rotateY, 
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { x.set(0); y.set(0); }}
      className={cn("relative h-full", className)}
    >
      {children}
    </motion.div>
  );
}

export function ProjectGrid({ children, className }: { children: ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".project-grid-item",
        { opacity: 0, y: 40, scale: 0.95, rotationX: 10 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={cn("grid grid-cols-1 sm:grid-cols-2 gap-6 perspective-1000", className)}>
      {Children.map(children, (child, index) => (
        <div key={index} className="project-grid-item h-full">
          <TiltWrapper>
            {child}
          </TiltWrapper>
        </div>
      ))}
    </div>
  );
}
