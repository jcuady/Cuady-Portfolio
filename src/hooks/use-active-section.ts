"use client";

import { useEffect, useState } from "react";

interface Section {
  id: string;
  label: string;
}

/**
 * Hook to track the currently active section based on scroll position
 * Uses Intersection Observer for efficient, accurate section detection
 * 
 * @param sections - Array of section objects with id and label
 * @param options - IntersectionObserver options for fine-tuning detection
 * @returns The currently active section ID
 */
export function useActiveSection(
  sections: Section[],
  options?: IntersectionObserverInit
) {
  const [activeSection, setActiveSection] = useState<string>(
    sections[0]?.id || ""
  );

  useEffect(() => {
    // Default observer options - section is "active" when ~20-40% visible
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: options?.rootMargin || "-20% 0px -60% 0px",
      threshold: options?.threshold || 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe all sections
    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    // Cleanup
    return () => observer.disconnect();
  }, [sections, options]);

  return activeSection;
}
