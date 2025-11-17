"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CertificationCard } from "@/components/certification-card";
import { ProjectItem } from "@/components/project-item";
import { ResumeCard } from "@/components/resume-card";
import { ThemeAvatar } from "@/components/theme-avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import { Download, Mail, MapPin } from "lucide-react";
import Link from "next/link";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const SECTIONS = [
  { id: "resume", label: "Resume" },
  { id: "work", label: "Work Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "optrizo-projects", label: "Optrizo Projects" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export default function Page() {
  const [activeSection, setActiveSection] = useState("resume");
  const [educationExpanded, setEducationExpanded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero fade in animation
    if (heroRef.current) {
      gsap.from(heroRef.current.children, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
      });
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
    // Scroll-triggered animations
    const fadeUpElements = document.querySelectorAll(".fade-up");
    fadeUpElements.forEach((el) => {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
      });
    });

    // Stagger animations for cards
    const staggerContainers = document.querySelectorAll(".stagger-container");
    staggerContainers.forEach((container) => {
      const items = container.querySelectorAll(".stagger-item");
      gsap.from(items, {
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out",
      });
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
    <div className="min-h-screen bg-background">
      {/* Floating Vertical Navigation */}
      <nav className="hidden lg:block fixed left-8 top-1/2 -translate-y-1/2 z-50">
        <div className="nav-vertical">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={activeSection === section.id ? "active" : ""}
            >
              <span className="text-sm">{section.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        {/* Hero Section - 2 Column */}
        <section id="hero" className="min-h-[80vh] grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div ref={heroRef} className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-6xl lg:text-7xl font-bold tracking-tight">
                Hi, I'm Malcolm
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Full-Stack Developer & Automation Engineer specializing in scalable systems & workflow automation.
              </p>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Based in Manila, PH</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {Object.entries(DATA.contact.social)
                .filter(([, social]) => social.navbar)
                .map(([name, social]) => (
                  <Link
                    key={name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 border border-border rounded-lg hover:border-foreground transition-all duration-200 hover:shadow-md"
                  >
                    <social.icon className="w-5 h-5" />
                  </Link>
                ))}
            </div>
          </div>

          {/* Profile Photo with Parallax */}
          <div className="flex justify-center lg:justify-end">
            <div
              ref={profileRef}
              className="profile-glow parallax-container"
            >
              <ThemeAvatar className="w-64 h-64 lg:w-80 lg:h-80" />
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* Resume Section */}
        <section id="resume" className="mb-24 fade-up">
          <h2 className="mb-8">Resume</h2>
          <div className="space-y-6">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {DATA.summary}
            </p>
            <div>
              <a
                href="/resume.pdf"
                download
                className="btn-notion"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* Work Experience Section */}
        <section id="work" className="mb-24 fade-up">
          <h2 className="mb-12">Work Experience</h2>
          <div className="space-y-12 stagger-container">
            {DATA.work.map((job, index) => (
              <div
                key={index}
                className="card-notion-hover stagger-item"
              >
                <div className="grid lg:grid-cols-[1fr_auto] gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold">{job.title}</h3>
                        <Link
                          href={job.href}
                          target="_blank"
                          className="text-lg text-foreground hover:underline"
                        >
                          {job.company}
                        </Link>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      {job.badges.map((badge, i) => (
                        <span key={i} className="badge-minimal">{badge}</span>
                      ))}
                      {job.end === "Present" && (
                        <span className="badge-minimal flex items-center gap-1">
                          <span className="w-2 h-2 bg-foreground rounded-full animate-pulse" />
                          Active
                        </span>
                      )}
                    </div>
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {job.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                      {job.start} - {job.end}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">{job.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* Education Section with Accordion */}
        <section id="education" className="mb-24 fade-up">
          <h2 className="mb-12">Education</h2>
          {DATA.education.map((edu, index) => (
            <div key={index} className="card-notion">
              <div className="space-y-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{edu.degree}</h3>
                    <Link href={edu.href} target="_blank" className="text-lg text-foreground hover:underline">
                      {edu.school}
                    </Link>
                  </div>
                  <p className="text-sm font-medium text-muted-foreground whitespace-nowrap">
                    {edu.start} - {edu.end}
                  </p>
                </div>

                {/* Expandable Details */}
                <button
                  onClick={() => setEducationExpanded(!educationExpanded)}
                  className="btn-notion-outline w-full"
                >
                  {educationExpanded ? "Hide Details" : "Show Details"}
                </button>

                {educationExpanded && (
                  <div className="space-y-6 pt-6 border-t border-border">
                    {edu.achievements && (
                      <div>
                        <h4 className="font-semibold mb-3">Achievements</h4>
                        <ul className="space-y-2">
                          {edu.achievements.map((achievement, i) => (
                            <li key={i} className="text-muted-foreground flex items-start gap-2">
                              <span className="mt-1.5 w-1.5 h-1.5 bg-foreground rounded-full flex-shrink-0" />
                              {achievement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {edu.relevantElectives && (
                      <div>
                        <h4 className="font-semibold mb-3">Relevant Electives</h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.relevantElectives.map((elective, i) => (
                            <span key={i} className="badge-minimal">{elective}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </section>

        <div className="divider" />

        {/* Skills Section */}
        <section id="skills" className="mb-24 fade-up">
          <h2 className="mb-12">Skills</h2>
          <div className="grid gap-8">
            {DATA.skills.map((category, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-lg font-semibold">{category.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, i) => (
                    <span key={i} className="badge-minimal">{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* Projects Section */}
        <section id="projects" className="mb-24 fade-up">
          <h2 className="mb-12">Projects</h2>
          <div className="grid md:grid-cols-2 gap-8 stagger-container">
            {DATA.projects.map((project, index) => (
              <div key={index} className="card-notion-hover stagger-item">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.dates}</p>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
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

        <div className="divider" />

        {/* Optrizo Projects Section */}
        <section id="optrizo-projects" className="mb-24 fade-up">
          <h2 className="mb-12">Optrizo Projects</h2>
          <div className="grid md:grid-cols-2 gap-8 stagger-container">
            {DATA.optrizoProjects.map((project, index) => (
              <div key={index} className="card-notion-hover stagger-item">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1">{project.title}</h3>
                    <p className="text-sm text-muted-foreground">{project.dates}</p>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <span key={i} className="badge-minimal text-xs">{tag}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, i) => (
                      <span key={i} className="text-xs text-muted-foreground">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* Certifications Section */}
        <section id="certifications" className="mb-24 fade-up">
          <h2 className="mb-12">Certifications</h2>
          <div className="space-y-4 stagger-container">
            {DATA.certifications.map((cert, index) => (
              <div key={index} className="card-notion stagger-item">
                <div className="flex items-center justify-between gap-6">
                  <div>
                    <h3 className="font-semibold">{cert.title}</h3>
                    <p className="text-sm text-muted-foreground">{cert.description}</p>
                  </div>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">{cert.dates}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="divider" />

        {/* Contact Section */}
        <section id="contact" className="mb-24 fade-up">
          <h2 className="mb-12">Get in Touch</h2>
          <div className="card-notion max-w-2xl">
            <div className="space-y-6">
              <p className="text-lg text-muted-foreground">
                I'm always open to discussing new projects, opportunities, or partnerships. Feel free to reach out!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`mailto:${DATA.contact.email}`}
                  className="btn-notion flex-1"
                >
                  <Mail className="w-4 h-4" />
                  {DATA.contact.email}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
