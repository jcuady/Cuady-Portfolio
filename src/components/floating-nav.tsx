"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Home, Briefcase, FolderGit2, Zap, User, GraduationCap, Code, Heart, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { DATA } from "@/data/resume";

interface NavSection {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface FloatingNavProps {
  sections?: NavSection[];
}

// Default sections with icons
const DEFAULT_SECTIONS: NavSection[] = [
  { id: "hero", label: "Home", icon: <Home className="w-full h-full" /> },
  { id: "work", label: "Experience", icon: <Briefcase className="w-full h-full" /> },
  { id: "projects", label: "Projects", icon: <FolderGit2 className="w-full h-full" /> },
  { id: "optrizo-projects", label: "Optrizo", icon: <Zap className="w-full h-full" /> },
  { id: "resume", label: "About", icon: <User className="w-full h-full" /> },
  { id: "education", label: "Education", icon: <GraduationCap className="w-full h-full" /> },
  { id: "skills", label: "Technical Skills", icon: <Code className="w-full h-full" /> },
  { id: "core-skills", label: "Core Skills", icon: <Heart className="w-full h-full" /> },
];

export function FloatingNav({ sections = DEFAULT_SECTIONS }: FloatingNavProps) {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Framer Motion scroll tracking for subtle scale/opacity on scroll
  const { scrollY } = useScroll();
  const navScale = useTransform(scrollY, [0, 100, 300], [1, 0.98, 0.96]);
  const navOpacity = useTransform(scrollY, [0, 100, 300], [1, 0.98, 0.95]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Smooth scroll to section with offset
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const offset = 100;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });

    setActiveSection(sectionId);
  }, []);

  // Intersection Observer for accurate section detection
  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-10% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  // Optional: Hide on fast scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Animation variants
  const navVariants = {
    hidden: { 
      y: 120, 
      opacity: 0,
      scale: 0.85,
    },
    visible: { 
      y: 0, 
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay: 0.6,
      }
    },
  };

  const itemVariants = {
    inactive: { 
      scale: 1, 
      opacity: 0.6,
    },
    active: { 
      scale: 1.05, 
      opacity: 1,
    },
    hover: { 
      scale: 1.1, 
      opacity: 1,
      y: -2,
    },
    tap: { 
      scale: 0.95,
    }
  };

  const highlightVariants = {
    inactive: { 
      scale: 0,
      opacity: 0,
    },
    active: { 
      scale: 1,
      opacity: 1,
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.nav
          className="fixed left-0 right-0 bottom-6 z-[100] 
                     sm:bottom-8 md:bottom-10 lg:bottom-12
                     flex items-center justify-center
                     pointer-events-none"
          variants={navVariants}
          initial="hidden"
          animate="visible"
          style={{
            scale: navScale,
            opacity: navOpacity,
          }}
          aria-label="Main navigation"
        >
          <motion.div
            className="flex items-center justify-center gap-1 px-2.5 py-2
                       bg-white/90 dark:bg-black/90
                       backdrop-blur-2xl backdrop-saturate-150
                       border border-border/50
                       rounded-full shadow-lg
                       pointer-events-auto
                       sm:gap-1.5 sm:px-3 sm:py-2.5
                       md:gap-2 md:px-4 md:py-3
                       w-fit"
            whileHover={{ 
              boxShadow: "0 12px 48px rgba(0, 0, 0, 0.15)",
              scale: 1.02,
            }}
            transition={{ duration: 0.2 }}
          >
            {/* Section Navigation */}
            <div className="flex items-center gap-0.5 sm:gap-1">
              {sections.map((section) => (
                <motion.button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="relative p-1.5 rounded-full transition-colors
                             focus:outline-none focus:ring-2 focus:ring-foreground/50
                             group sm:p-2 md:p-2.5"
                  variants={itemVariants}
                  initial="inactive"
                  animate={activeSection === section.id ? "active" : "inactive"}
                  whileHover="hover"
                  whileTap="tap"
                  aria-label={section.label}
                  aria-current={activeSection === section.id ? "page" : undefined}
                  title={section.label}
                >
                  {/* Active highlight */}
                  <motion.div
                    className="absolute inset-0 bg-foreground/10 dark:bg-white/10 rounded-full"
                    variants={highlightVariants}
                    initial="inactive"
                    animate={activeSection === section.id ? "active" : "inactive"}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                  
                  {/* Icon */}
                  <div className="relative w-4 h-4 sm:w-5 sm:h-5 text-foreground">
                    {section.icon}
                  </div>

                  {/* Tooltip on hover */}
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2
                                   px-2 py-1 bg-foreground text-background
                                   text-xs font-medium rounded-md
                                   opacity-0 group-hover:opacity-100
                                   pointer-events-none transition-opacity
                                   whitespace-nowrap z-10">
                    {section.label}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Divider */}
            <div className="w-px h-5 bg-border/50 mx-0.5 sm:mx-1 md:mx-2 sm:h-6" />

            {/* Social Links */}
            <div className="flex items-center gap-0.5 sm:gap-1">
              <motion.a
                href={DATA.contact.social.GitHub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-1.5 rounded-full transition-colors
                           focus:outline-none focus:ring-2 focus:ring-foreground/50
                           group sm:p-2 md:p-2.5"
                variants={itemVariants}
                initial="inactive"
                animate="inactive"
                whileHover="hover"
                whileTap="tap"
                aria-label="GitHub"
                title="GitHub"
              >
                <DATA.contact.social.GitHub.icon className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
                
                <span className="absolute -top-10 left-1/2 -translate-x-1/2
                                 px-2 py-1 bg-foreground text-background
                                 text-xs font-medium rounded-md
                                 opacity-0 group-hover:opacity-100
                                 pointer-events-none transition-opacity
                                 whitespace-nowrap">
                  GitHub
                </span>
              </motion.a>

              <motion.a
                href={DATA.contact.social.LinkedIn.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-1.5 rounded-full transition-colors
                           focus:outline-none focus:ring-2 focus:ring-foreground/50
                           group sm:p-2 md:p-2.5"
                variants={itemVariants}
                initial="inactive"
                animate="inactive"
                whileHover="hover"
                whileTap="tap"
                aria-label="LinkedIn"
                title="LinkedIn"
              >
                <DATA.contact.social.LinkedIn.icon className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
                
                <span className="absolute -top-10 left-1/2 -translate-x-1/2
                                 px-2 py-1 bg-foreground text-background
                                 text-xs font-medium rounded-md
                                 opacity-0 group-hover:opacity-100
                                 pointer-events-none transition-opacity
                                 whitespace-nowrap">
                  LinkedIn
                </span>
              </motion.a>

              <motion.a
                href={DATA.contact.social.Facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                className="relative p-1.5 rounded-full transition-colors
                           focus:outline-none focus:ring-2 focus:ring-foreground/50
                           group sm:p-2 md:p-2.5"
                variants={itemVariants}
                initial="inactive"
                animate="inactive"
                whileHover="hover"
                whileTap="tap"
                aria-label="Facebook"
                title="Facebook"
              >
                <DATA.contact.social.Facebook.icon className="w-4 h-4 sm:w-5 sm:h-5 text-foreground" />
                
                <span className="absolute -top-10 left-1/2 -translate-x-1/2
                                 px-2 py-1 bg-foreground text-background
                                 text-xs font-medium rounded-md
                                 opacity-0 group-hover:opacity-100
                                 pointer-events-none transition-opacity
                                 whitespace-nowrap">
                  Facebook
                </span>
              </motion.a>
            </div>

            {/* Divider */}
            <div className="w-px h-5 bg-border/50 mx-0.5 sm:mx-1 md:mx-2 sm:h-6" />

            {/* Theme Toggle */}
            {mounted && (
              <motion.button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="relative p-1.5 rounded-full transition-colors
                           focus:outline-none focus:ring-2 focus:ring-foreground/50
                           group sm:p-2 md:p-2.5"
                variants={itemVariants}
                initial="inactive"
                animate="inactive"
                whileHover="hover"
                whileTap="tap"
                aria-label="Toggle theme"
                title="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ rotate: -180, opacity: 0, scale: 0.6 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 180, opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    className="w-4 h-4 sm:w-5 sm:h-5"
                  >
                    {theme === "dark" ? (
                      <Moon className="w-full h-full" />
                    ) : (
                      <Sun className="w-full h-full" />
                    )}
                  </motion.div>
                </AnimatePresence>

                <span className="absolute -top-10 left-1/2 -translate-x-1/2
                                 px-2 py-1 bg-foreground text-background
                                 text-xs font-medium rounded-md
                                 opacity-0 group-hover:opacity-100
                                 pointer-events-none transition-opacity
                                 whitespace-nowrap">
                  {theme === "dark" ? "Light" : "Dark"} mode
                </span>
              </motion.button>
            )}
          </motion.div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
