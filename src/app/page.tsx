"use client";

import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { WorkExperience } from "@/components/work-experience";
import { ProjectGrid } from "@/components/project-grid";
import { ThemeAvatar } from "@/components/theme-avatar";
import { FloatingNav } from "@/components/floating-nav";
import { DATA } from "@/data/resume";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Mail, MapPin, Download, FileText } from "lucide-react";
import { useEffect } from "react";
import { gsap } from "gsap";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  useEffect(() => {
    // Profile photo parallax effect
    const profile = document.getElementById("profile-image");
    if (profile) {
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = profile.getBoundingClientRect();
        const x = (clientX - left - width / 2) / 20;
        const y = (clientY - top - height / 2) / 20;

        gsap.to(profile, {
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

  return (
    <div className="min-h-screen bg-background relative font-sans">
      <main className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-24 space-y-24 sm:space-y-32">
        
        {/* Hero Section */}
        <section id="hero" className="flex flex-col items-center justify-center text-center min-h-[60vh] max-w-4xl mx-auto space-y-8">
          <BlurFade delay={BLUR_FADE_DELAY}>
            <div id="profile-image" className="relative">
              <ThemeAvatar 
                name={DATA.name}
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 shadow-2xl" 
              />
            </div>
          </BlurFade>
          
          <div className="space-y-4">
            <BlurFade delay={BLUR_FADE_DELAY * 2}>
              <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold tracking-tighter">
                {DATA.name}
              </h1>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <p className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto">
                Full-Stack Developer & Automation Engineer
              </p>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {DATA.description}
              </p>
            </BlurFade>
          </div>

          <BlurFade delay={BLUR_FADE_DELAY * 5}>
             <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{DATA.location}</span>
            </div>
          </BlurFade>

          <BlurFade delay={BLUR_FADE_DELAY * 6}>
            <div className="flex items-center justify-center gap-4">
              {Object.entries(DATA.contact.social)
                .filter(([, social]) => social.navbar)
                .map(([name, social]) => (
                  <Link
                    key={name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-colors"
                  >
                    <social.icon className="w-5 h-5" />
                  </Link>
                ))}
            </div>
          </BlurFade>
        </section>

        {/* Split Layout Container */}
        <div className="grid lg:grid-cols-[1.8fr_1fr] gap-12 lg:gap-24 items-start">
          {/* Left Column - Main Content */}
          <div className="space-y-24">
            
            {/* Work Experience */}
            <section id="work">
              <BlurFade delay={BLUR_FADE_DELAY * 7}>
                <h2 className="text-2xl font-bold mb-8">Work Experience</h2>
              </BlurFade>
              <WorkExperience work={DATA.work} />
            </section>

            {/* Featured Projects */}
            <section id="projects">
              <BlurFade delay={BLUR_FADE_DELAY * 9}>
                <div className="flex flex-col gap-2 mb-8">
                  <h2 className="text-2xl font-bold">Featured Projects</h2>
                  <p className="text-muted-foreground">Recent work and applications</p>
                </div>
              </BlurFade>
              <ProjectGrid>
                {DATA.projects.map((project, index) => (
                  <ProjectCard 
                    key={index}
                    href={project.href}
                    title={project.title}
                    description={project.description}
                    dates={project.dates}
                    tags={project.technologies}
                    image={project.image}
                    video={project.video}
                    links={project.links}
                    showPreview={true}
                  />
                ))}
              </ProjectGrid>
            </section>

             {/* Optrizo Projects */}
             <section id="optrizo-projects">
              <BlurFade delay={BLUR_FADE_DELAY * 11}>
                <div className="flex flex-col gap-2 mb-8">
                  <h2 className="text-2xl font-bold">Optrizo</h2>
                  <p className="text-muted-foreground">Automation & digital solutions for SMEs</p>
                </div>
              </BlurFade>
              <ProjectGrid>
                {DATA.optrizoProjects.map((project, index) => (
                  <ProjectCard 
                    key={index}
                    title={project.title}
                    description={project.description}
                    dates={project.dates}
                    tags={project.tags}
                    image={project.image}
                    video="" // No video for these usually
                    links={[]}
                    className="bg-secondary/10" // Subtle difference
                  />
                ))}
              </ProjectGrid>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-16 lg:sticky lg:top-24 h-fit">
            
            {/* About / Summary */}
             <section id="resume">
                <BlurFade delay={BLUR_FADE_DELAY * 13}>
                  <div className="space-y-4">
                    <div className="p-6 border rounded-xl bg-card text-card-foreground shadow-sm">
                       <h2 className="text-xl font-bold mb-4">About Me</h2>
                       <p className="text-sm text-muted-foreground leading-relaxed">
                          {DATA.summary}
                       </p>
                    </div>

                    {/* Interactive Resume Preview Card */}
                    <div className="group relative w-full aspect-[210/297] border rounded-xl overflow-hidden bg-white dark:bg-zinc-900 shadow-sm hover:shadow-2xl transition-all duration-300">
                        <Link href="/resume.pdf" target="_blank" className="absolute inset-0 z-10">
                            <span className="sr-only">View Resume</span>
                        </Link>
                        
                        {/* PDF Object Overlay (Always visible now) */}
                        <div className="absolute inset-0 bg-white">
                            <object
                              data="/resume.pdf#toolbar=0&navpanes=0&scrollbar=0&view=FitH"
                              type="application/pdf"
                              className="w-full h-full pointer-events-none" 
                            >
                                <div className="flex items-center justify-center h-full text-muted-foreground bg-muted/20">
                                    <div className="flex flex-col items-center gap-2">
                                       <FileText className="size-8" />
                                       <p className="text-sm">View PDF</p>
                                    </div>
                                </div>
                            </object>
                        </div>

                        {/* Download Button (Appears on hover) */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 translate-y-12 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 w-max">
                            <a 
                                href="/resume.pdf" 
                                download 
                                className="flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-full shadow-lg hover:opacity-90 transition-opacity text-sm font-medium"
                            >
                                <Download className="size-4" />
                                Download PDF
                            </a>
                        </div>
                    </div>
                  </div>
                </BlurFade>
             </section>

            {/* Education */}
            <section id="education">
              <BlurFade delay={BLUR_FADE_DELAY * 14}>
                <h2 className="text-xl font-bold mb-6">Education</h2>
              </BlurFade>
              <div className="flex flex-col gap-4">
                 {DATA.education.map((edu, index) => (
                   <BlurFade 
                     key={index} 
                     delay={BLUR_FADE_DELAY * 15 + index * 0.05}
                   >
                     <ResumeCard
                        key={edu.school}
                        href={edu.href}
                        logoUrl={edu.logoUrl}
                        altText={edu.school}
                        title={edu.school}
                        subtitle={edu.degree}
                        period={`${edu.start} - ${edu.end}`}
                        description={
                          edu.achievements && edu.achievements.length > 0 ? (
                            <ul className="list-disc pl-4 space-y-1">
                              {edu.achievements.map((achievement, i) => (
                                <li key={i}>{achievement}</li>
                              ))}
                            </ul>
                          ) : null
                        }
                     />
                   </BlurFade>
                 ))}
              </div>
            </section>

            {/* Skills */}
            <section id="skills">
              <BlurFade delay={BLUR_FADE_DELAY * 16}>
                <h2 className="text-xl font-bold mb-6">Skills</h2>
              </BlurFade>
              <div className="flex flex-col gap-6">
                 {DATA.skills.map((category, index) => (
                    <BlurFade 
                      key={index}
                      delay={BLUR_FADE_DELAY * 17 + index * 0.05}
                    >
                      <div className="space-y-2">
                         <h3 className="text-sm font-semibold text-foreground/80">{category.category}</h3>
                         <div className="flex flex-wrap gap-1.5">
                            {category.skills.map((skill) => (
                               <Badge key={skill} variant="outline" className="text-[10px] sm:text-xs">
                                  {skill}
                               </Badge>
                            ))}
                         </div>
                      </div>
                    </BlurFade>
                 ))}
              </div>
            </section>

             {/* Contact */}
            <section id="contact">
               <BlurFade delay={BLUR_FADE_DELAY * 18}>
                  <div className="p-6 border rounded-xl bg-card text-card-foreground shadow-sm text-center space-y-4">
                     <h2 className="text-xl font-bold">Get in Touch</h2>
                     <p className="text-sm text-muted-foreground">
                        Want to chat? Just shoot me a dm with a direct question on social media or email me directly.
                     </p>
                     <Link 
                        href={`mailto:${DATA.contact.email}`}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-md bg-primary text-primary-foreground hover:bg-primary/90 w-full"
                     >
                        <Mail className="size-4" />
                        Send Email
                     </Link>
                  </div>
               </BlurFade>
            </section>

          </div>
        </div>
      </main>

      <FloatingNav />
    </div>
  );
}
