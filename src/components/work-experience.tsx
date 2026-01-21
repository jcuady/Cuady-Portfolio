"use client";

import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface WorkExperienceProps {
  work: readonly {
    company: string;
    href: string;
    badges: readonly string[];
    location: string;
    title: string;
    start: string;
    end: string;
    description: string;
  }[];
}

export function WorkExperience({ work }: WorkExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate cards on scroll
      const cards = gsap.utils.toArray(".work-card");
      
      cards.forEach((card: any) => {
        gsap.fromTo(
          card,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            }
          }
        );
      });

      // Timeline line animation (Progress Bar)
      gsap.fromTo(
        ".timeline-line-progress",
        { height: "0%" },
        {
          height: "100%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 200px", 
            end: "bottom center",
            scrub: 0.5,
          },
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative pl-6 sm:pl-8 py-4">
      {/* Background Line */}
      <div className="absolute left-0 sm:left-2 top-2 bottom-2 w-px bg-border/40" />
      
      {/* Progress Line (Animated) */}
      <div className="timeline-line-progress absolute left-0 sm:left-2 top-2 w-px bg-foreground origin-top" />

      <div className="flex flex-col gap-10 sm:gap-14">
        {work.map((job, index) => (
          <div key={index} className="work-card group relative pl-4 sm:pl-6">
            {/* Timeline Dot */}
            <div className="absolute -left-[5px] sm:-left-[3px] top-1.5 size-2.5 rounded-full border border-muted-foreground bg-background group-hover:scale-125 group-hover:border-foreground group-hover:bg-foreground transition-all duration-300 z-10" />
            
            <div className="flex flex-col gap-3">
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4">
                <div className="flex flex-col">
                   <h3 className="text-base sm:text-lg font-semibold leading-none tracking-tight group-hover:text-primary transition-colors duration-200">
                     {job.title}
                   </h3>
                   <div className="flex items-center gap-2 mt-1.5">
                    <Link 
                      href={job.href} 
                      target="_blank" 
                      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {job.company}
                    </Link>
                    <span className="text-[10px] text-muted-foreground/60">•</span>
                    <span className="text-xs text-muted-foreground/80 font-mono">{job.location}</span>
                   </div>
                </div>
                
                <div className="text-xs sm:text-sm text-muted-foreground/80 font-mono tabular-nums whitespace-nowrap pt-1 sm:pt-0">
                  {job.start} - {job.end}
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed text-pretty font-light">
                {job.description}
              </p>
              
              {job.badges.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {job.badges.map((badge, i) => (
                    <Badge 
                      key={i} 
                      variant="outline" 
                      className="px-1.5 py-0 text-[10px] text-muted-foreground font-normal border-border/60 hover:border-border hover:bg-secondary/50 transition-colors"
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
