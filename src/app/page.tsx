"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { CertificationCard } from "@/components/certification-card";
import { ProjectItem } from "@/components/project-item";
import { ResumeCard } from "@/components/resume-card";
import { ThemeAvatar } from "@/components/theme-avatar";
import { Badge } from "@/components/ui/badge";
import { FloatingNav } from "@/components/floating-nav";
import { DATA } from "@/data/resume";
import { Download, Mail, MapPin, Home, Briefcase, FolderGit2, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
}

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "work", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "optrizo-projects", label: "Optrizo" },
  { id: "resume", label: "About" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Technical Skills" },
  { id: "core-skills", label: "Core Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

// Framer Motion variants for smooth animations
const fadeInUpVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

const staggerContainerVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const cardVariant = {
  hidden: { opacity: 0, y: 20, rotateX: 5 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function Page() {
  const [activeSection, setActiveSection] = useState("resume");
  const [educationExpanded, setEducationExpanded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  
  // Framer Motion scroll hooks for smooth animations
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const navY = useTransform(smoothProgress, [0, 1], [0, 30]);
  const navRotateY = useTransform(smoothProgress, [0, 1], [0, -3]);
  const navRotateX = useTransform(smoothProgress, [0, 1], [0, 2]);

  useEffect(() => {
    // Hero fade in animation
    if (heroRef.current) {
      gsap.fromTo(
        heroRef.current.children,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        }
      );
    }

    // Profile photo parallax effect
    if (profileRef.current) {
      const handleMouseMove = (e: MouseEvent) => {
        if (!profileRef.current) return;
        const { clientX, clientY } = e;
        const { left, top, width, height } =
          profileRef.current.getBoundingClientRect();
        const x = (clientX - left - width / 2) / 20;
        const y = (clientY - top - height / 2) / 20;

        gsap.to(profileRef.current, {
          x,
          y,
          duration: 0.5,
          ease: "power2.out",
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  useEffect(() => {
    // Scroll-triggered animations with enhanced effects
    const fadeUpElements = document.querySelectorAll(".fade-up");
    fadeUpElements.forEach((el) => {
      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 60%",
            toggleActions: "play none none reverse",
            scrub: 1,
          },
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
        }
      );
    });

    // Stagger animations for cards with parallax effect
    const staggerContainers = document.querySelectorAll(".stagger-container");
    staggerContainers.forEach((container) => {
      const items = container.querySelectorAll(".stagger-item");
      gsap.fromTo(
        items,
        { opacity: 0, y: 30, rotationX: 5 },
        {
          scrollTrigger: {
            trigger: container,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        }
      );
    });

    // Text reveal animations for headings
    const headings = document.querySelectorAll("h2, h3");
    headings.forEach((heading) => {
      gsap.fromTo(
        heading,
        { opacity: 0, x: -20 },
        {
          scrollTrigger: {
            trigger: heading,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power2.out",
        }
      );
    });

    // Badge animations
    const badges = document.querySelectorAll(".badge-minimal");
    badges.forEach((badge, index) => {
      gsap.fromTo(
        badge,
        { opacity: 0, scale: 0.8 },
        {
          scrollTrigger: {
            trigger: badge,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: index * 0.05,
          ease: "back.out(1.7)",
        }
      );
    });

    // Card hover parallax effect
    const cards = document.querySelectorAll(".card-notion-hover");
    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        });
      });
      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
        });
      });
    });

    // Smooth scroll progress indicator
    gsap.to(".progress-bar", {
      scrollTrigger: {
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
      },
      scaleX: 1,
      transformOrigin: "left",
    });

    // Section-based active state tracking with ScrollTrigger
    SECTIONS.forEach((section) => {
      const sectionElement = document.getElementById(section.id);
      if (sectionElement) {
        ScrollTrigger.create({
          trigger: sectionElement,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => setActiveSection(section.id),
          onEnterBack: () => setActiveSection(section.id),
        });
      }
    });
  }, []);

  // Smooth scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      gsap.to(window, {
        scrollTo: { y: element, offsetY: 80 },
        duration: 1,
        ease: "power3.inOut",
      });
      setActiveSection(id);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background relative">
      {/* Scroll Progress Bar with Framer Motion */}
      <motion.div 
        className="fixed top-0 left-0 w-full h-1 bg-border z-50"
      >
        <motion.div 
          className="h-full bg-foreground origin-left"
          style={{ scaleX: smoothProgress }}
        />
      </motion.div>

      {/* Main Content - Asymmetric Grid Layout */}
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-16">
        {/* Hero Section - Full Width Centered */}
        <motion.section 
          id="hero" 
          className="min-h-[70vh] sm:min-h-[80vh] lg:min-h-[90vh] flex flex-col items-center justify-center text-center mb-16 sm:mb-24 lg:mb-32 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div ref={heroRef} className="max-w-4xl space-y-6 sm:space-y-8 lg:space-y-12 relative z-10">
            {/* Profile Photo - Top Center */}
            <div className="flex justify-center">
              <div
                ref={profileRef}
                className="profile-glow parallax-container relative z-0"
              >
                <ThemeAvatar 
                  name={DATA.name}
                  initials={DATA.initials}
                  className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-64 lg:h-64" 
                />
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4 lg:space-y-6 relative z-20">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-bold tracking-tight">
                Malcolm Joaquin L. Cuady
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-muted-foreground leading-relaxed">
                Full-Stack Developer & Automation Engineer
              </p>
              <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Delivering scalable software through agile, iterative development
              </p>
            </div>

            {/* Location */}
            <div className="flex items-center justify-center gap-2 text-sm sm:text-base text-muted-foreground">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>Based in Manila, PH</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-4 sm:gap-6">
              {Object.entries(DATA.contact.social)
                .filter(([, social]) => social.navbar)
                .map(([name, social]) => (
                  <Link
                    key={name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 sm:p-4 border-2 border-border rounded-lg hover:border-foreground transition-all duration-200 hover:shadow-lg"
                  >
                    <social.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </Link>
                ))}
            </div>
          </div>
        </motion.section>

        {/* Split Layout Container */}
        <div className="grid lg:grid-cols-[2fr_1fr] gap-8 sm:gap-12 lg:gap-16 xl:gap-24">
          {/* Left Column - Main Content */}
          <div className="space-y-16 sm:space-y-20 lg:space-y-32">
            {/* Work Experience Section - Left */}
            <section id="work" className="fade-up">
              <div className="mb-6 sm:mb-8 lg:mb-12">
                <span className="badge-minimal">Experience</span>
                <h2 className="mt-4">Work Experience</h2>
              </div>
              <div className="space-y-6 sm:space-y-8 stagger-container">
                {DATA.work.map((job, index) => (
                  <div
                    key={index}
                    className="card-notion-hover stagger-item"
                  >
                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-start justify-between gap-3 sm:gap-4 flex-wrap">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg sm:text-xl font-semibold mb-1">{job.title}</h3>
                          <Link
                            href={job.href}
                            target="_blank"
                            className="text-sm sm:text-base text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {job.company}
                          </Link>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-xs sm:text-sm font-medium whitespace-nowrap">
                            {job.start} - {job.end}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">{job.location}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        {job.badges.map((badge, i) => (
                          <span key={i} className="badge-minimal text-xs">{badge}</span>
                        ))}
                        {job.end === "Present" && (
                          <span className="badge-minimal flex items-center gap-1 text-xs">
                            <span className="w-1.5 h-1.5 bg-foreground rounded-full animate-pulse" />
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {job.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects Section - Left */}
            <section id="projects" className="fade-up">
              <div className="mb-12">
                <span className="badge-minimal">Portfolio</span>
                <h2 className="mt-4">Featured Projects</h2>
              </div>
              <div className="grid gap-6 stagger-container">
                {DATA.projects.slice(0, 4).map((project, index) => (
                  <div key={index} className="card-notion-hover stagger-item">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <h3 className="text-lg font-semibold flex-1">{project.title}</h3>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">{project.dates}</span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="badge-minimal text-xs">{tech}</span>
                        ))}
                      </div>
                      {project.links && project.links.length > 0 && (
                        <Link
                          href={project.links[0].href}
                          target="_blank"
                          className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                        >
                          View Project →
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Optrizo Projects Section - Left */}
            <section id="optrizo-projects" className="fade-up">
              <div className="mb-12">
                <span className="badge-minimal">Startup</span>
                <h2 className="mt-4">Optrizo Projects</h2>
                <p className="text-muted-foreground mt-2">Key automation solutions for SMEs</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6 stagger-container">
                {DATA.optrizoProjects.map((project, index) => (
                  <div key={index} className="card-notion-hover stagger-item">
                    <div className="space-y-3">
                      <h3 className="text-base font-semibold">{project.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="badge-minimal text-xs">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-24 lg:sticky lg:top-24 lg:self-start">
            {/* Resume Section - Right */}
            <section id="resume" className="fade-up">
              <div className="card-notion">
                <div className="space-y-6">
                  <div>
                    <span className="badge-minimal">About</span>
                    <h2 className="mt-4 text-2xl">Resume</h2>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {DATA.summary}
                  </p>
                  <a
                    href="/resume.pdf"
                    download
                    className="btn-notion w-full justify-center"
                  >
                    <Download className="w-4 h-4" />
                    Download Resume
                  </a>
                </div>
              </div>
            </section>

            {/* Education Section - Right */}
            <section id="education" className="fade-up">
              <div className="card-notion">
                <div className="space-y-6">
                  <div>
                    <span className="badge-minimal">Academic</span>
                    <h2 className="mt-4 text-2xl">Education</h2>
                  </div>
                  {DATA.education.map((edu, index) => (
                    <div key={index} className="space-y-4">
                      <div className="flex items-start gap-4">
                        {edu.logoUrl && (
                          <Image 
                            src={edu.logoUrl} 
                            alt={`${edu.school} logo`}
                            width={48}
                            height={48}
                            className="w-12 h-12 object-contain"
                          />
                        )}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold">{edu.degree}</h3>
                          <Link href={edu.href} target="_blank" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                            {edu.school}
                          </Link>
                          <p className="text-xs text-muted-foreground mt-1">
                            {edu.start} - {edu.end}
                          </p>
                        </div>
                      </div>

                      {/* Expandable Details */}
                      <button
                        onClick={() => setEducationExpanded(!educationExpanded)}
                        className="btn-notion-outline w-full text-sm py-2"
                      >
                        {educationExpanded ? "Hide Details" : "Show Details"}
                      </button>

                      {educationExpanded && (
                        <div className="space-y-4 pt-4 border-t border-border">
                          {edu.achievements && (
                            <div>
                              <h4 className="text-sm font-semibold mb-2">Achievements</h4>
                              <ul className="space-y-1.5">
                                {edu.achievements.map((achievement, i) => (
                                  <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                                    <span className="mt-1.5 w-1 h-1 bg-foreground rounded-full flex-shrink-0" />
                                    {achievement}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                          {edu.relevantElectives && (
                            <div>
                              <h4 className="text-sm font-semibold mb-2">Relevant Electives</h4>
                              <div className="flex flex-wrap gap-1.5">
                                {edu.relevantElectives.map((elective, i) => (
                                  <span key={i} className="badge-minimal text-xs">{elective}</span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Skills Section - Right */}
            <section id="skills" className="fade-up">
              <div className="card-notion">
                <div className="space-y-6">
                  <div>
                    <span className="badge-minimal">Expertise</span>
                    <h2 className="mt-4 text-2xl">Technical Skills</h2>
                  </div>
                  <div className="space-y-6">
                    {DATA.skills.map((category, index) => (
                      <div key={index} className="space-y-3">
                        <h3 className="text-sm font-semibold">{category.category}</h3>
                        <div className="flex flex-wrap gap-1.5">
                          {category.skills.map((skill, i) => (
                            <span key={i} className="badge-minimal text-xs">{skill}</span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Core Skills Section - Right */}
            <section id="core-skills" className="fade-up">
              <div className="card-notion">
                <div className="space-y-6">
                  <div>
                    <span className="badge-minimal">Soft Skills</span>
                    <h2 className="mt-4 text-2xl">Core Skills</h2>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {DATA.coreSkills.map((skill, i) => (
                      <span key={i} className="badge-minimal text-xs">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Certifications Section - Full Width */}
        <section id="certifications" className="mt-32 fade-up">
          <div className="mb-12 text-center">
            <span className="badge-minimal">Credentials</span>
            <h2 className="mt-4">Certifications</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 stagger-container">
            {DATA.certifications.map((cert, index) => (
              <div key={index} className="card-notion stagger-item hover:border-foreground/20 transition-all">
                <div className="text-center space-y-2">
                  <h3 className="text-sm font-semibold">{cert.title}</h3>
                  <p className="text-xs text-muted-foreground">{cert.description}</p>
                  <span className="inline-block text-xs text-muted-foreground">{cert.dates}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section - Full Width Bottom */}
        <motion.section 
          id="contact" 
          className="mt-32"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUpVariant}
        >
          <div className="max-w-2xl mx-auto">
            <motion.div 
              className="card-notion text-center"
              whileHover={{ scale: 1.02, y: -4 }}
              transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <div className="space-y-6">
                <div>
                  <span className="badge-minimal">Connect</span>
                  <h2 className="mt-4 text-2xl">Get in Touch</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Open to discussing new projects and opportunities.
                </p>
                <motion.a
                  href={`mailto:${DATA.contact.email}`}
                  className="btn-notion w-full justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                >
                  <Mail className="w-4 h-4" />
                  Send Email
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* Unified Floating Navigation */}
      <FloatingNav />
    </div>
    </>
  );
}
