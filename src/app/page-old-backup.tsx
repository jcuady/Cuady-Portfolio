import { CertificationCard } from "@/components/certification-card";
import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectItem } from "@/components/project-item";
import { ResumeCard } from "@/components/resume-card";
import { SectionNav } from "@/components/section-nav";
import { ThemeAvatar } from "@/components/theme-avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import { getProjectSortDate } from "@/lib/date-utils";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;

const SECTIONS = [
  { id: "resume", label: "Resume" },
  { id: "work", label: "Work Experience" },
  { id: "education", label: "Education" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "hackathons", label: "Hackathons" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

export default function Page() {
  const sortedProjects = [...DATA.projects].sort((a, b) => {
    return getProjectSortDate(b.dates) - getProjectSortDate(a.dates);
  });

  const sortedCertifications = [...DATA.certifications].sort((a, b) => {
    const getYear = (dateStr: string) => {
      const match = dateStr.match(/\d{4}/);
      return match ? parseInt(match[0]) : 0;
    };
    return getYear(b.dates) - getYear(a.dates);
  });

  return (
    <main className="flex flex-col min-h-[100dvh]">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        <div className="space-y-12 lg:sticky lg:top-10 lg:self-start">
          <section id="hero">
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-6">
                <div className="flex-1 space-y-5">
                  <div className="space-y-3">
                    <BlurFadeText
                      delay={BLUR_FADE_DELAY}
                      className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl hero-gradient"
                      yOffset={8}
                      text={`Hi, I'm ${DATA.name.split(" ")[0]} 👋`}
                    />
                    <BlurFadeText
                      className="text-lg sm:text-xl text-foreground font-medium leading-relaxed max-w-2xl"
                      delay={BLUR_FADE_DELAY * 1.5}
                      text={DATA.description}
                    />
                  </div>
                  
                  <BlurFade delay={BLUR_FADE_DELAY * 2}>
                    <div className="flex items-center gap-2 flex-wrap">
                      {Object.entries(DATA.contact.social)
                        .filter(([_, social]) => social.navbar)
                        .slice(0, 3)
                        .map(([name, social]) => (
                          <Link
                            key={name}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center rounded-full h-9 w-9 bg-secondary/70 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
                            aria-label={name}
                          >
                            <social.icon className="h-4 w-4" />
                          </Link>
                        ))}
                    </div>
                  </BlurFade>
                </div>
                
                <BlurFade delay={BLUR_FADE_DELAY}>
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-lg opacity-75"></div>
                    <ThemeAvatar
                      name={DATA.name}
                      initials={DATA.initials}
                      className="relative size-24 sm:size-28 border-2 border-background shadow-xl"
                    />
                  </div>
                </BlurFade>
              </div>
            </div>
          </section>

          <section id="about">
            <BlurFade delay={BLUR_FADE_DELAY * 3}>
              <h2 className="text-2xl font-semibold mb-4">About</h2>
            </BlurFade>
            <BlurFade delay={BLUR_FADE_DELAY * 4}>
              <Markdown className="prose prose-sm max-w-full text-pretty text-muted-foreground dark:prose-invert prose-p:leading-relaxed">
                {DATA.summary}
              </Markdown>
            </BlurFade>
          </section>

          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <div className="hidden lg:block">
              <SectionNav sections={SECTIONS} />
            </div>
          </BlurFade>
        </div>

        <div className="space-y-12">
          <section id="resume">
            <div className="flex min-h-0 flex-col gap-y-4">
              <BlurFade delay={BLUR_FADE_DELAY * 5}>
                <h2 className="text-2xl font-semibold">Resume</h2>
              </BlurFade>
              <BlurFade delay={BLUR_FADE_DELAY * 5.5}>
                <div className="relative group">
                  <div className="relative overflow-hidden rounded-lg border bg-card">
                    <div className="relative h-[500px] w-full">
                      <iframe
                        src="/resume.pdf"
                        className="w-full h-full pointer-events-none"
                        title="Resume Preview"
                      />
                      <div 
                        className="absolute bottom-0 left-0 right-0 h-[65%] backdrop-blur-xl"
                        style={{
                          maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 10%, rgba(0,0,0,0.5) 25%, rgba(0,0,0,0.8) 45%, black 70%)',
                          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.2) 10%, rgba(0,0,0,0.5) 25%, rgba(0,0,0,0.8) 45%, black 70%)',
                        }}
                      />
                      <div 
                        className="absolute bottom-0 left-0 right-0 h-[65%] bg-gradient-to-b from-transparent from-0% via-background/50 via-40% to-background to-90%"
                      />
                    </div>
                  </div>
                  
                  <Link
                    href="/resume.pdf"
                    download="Malcolm_Cuady_Resume.pdf"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md mt-4 w-fit"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download Resume
                  </Link>
                </div>
              </BlurFade>
            </div>
          </section>

          <section id="work">
            <div className="flex min-h-0 flex-col gap-y-4">
              <BlurFade delay={BLUR_FADE_DELAY * 6}>
                <h2 className="text-2xl font-semibold">Work Experience</h2>
              </BlurFade>
              {DATA.work.map((work, id) => (
                <BlurFade
                  key={work.company}
                  delay={BLUR_FADE_DELAY * 7 + id * 0.05}
                >
                  <ResumeCard
                    key={work.company}
                    logoUrl={work.logoUrl}
                    altText={work.company}
                    title={work.company}
                    subtitle={work.title}
                    href={work.href}
                    badges={work.badges}
                    period={`${work.start} - ${work.end ?? "Present"}`}
                    description={work.description}
                  />
                </BlurFade>
              ))}
            </div>
          </section>

          <section id="education">
            <div className="flex min-h-0 flex-col gap-y-4">
              <BlurFade delay={BLUR_FADE_DELAY * 7}>
                <h2 className="text-2xl font-semibold">Education</h2>
              </BlurFade>
              {DATA.education.map((education, id) => (
                <BlurFade
                  key={education.school}
                  delay={BLUR_FADE_DELAY * 8 + id * 0.05}
                >
                  <ResumeCard
                    key={education.school}
                    href={education.href}
                    logoUrl={education.logoUrl}
                    altText={education.school}
                    title={education.school}
                    subtitle={education.degree}
                    period={`${education.start} - ${education.end}`}
                  />
                </BlurFade>
              ))}
            </div>
          </section>

          <section id="skills">
            <div className="flex min-h-0 flex-col gap-y-4">
              <BlurFade delay={BLUR_FADE_DELAY * 9}>
                <h2 className="text-2xl font-semibold">Skills</h2>
              </BlurFade>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {DATA.skills.map((skillCategory, id) => (
                  <BlurFade
                    key={skillCategory.category}
                    delay={BLUR_FADE_DELAY * 10 + id * 0.05}
                  >
                    <ResumeCard
                      logoUrl={skillCategory.logoUrl}
                      altText={skillCategory.category}
                      title={skillCategory.category}
                      subtitle={skillCategory.skills.join(", ")}
                    />
                  </BlurFade>
                ))}
              </div>
            </div>
          </section>

          <section id="projects">
            <div className="space-y-8 w-full">
              <BlurFade delay={BLUR_FADE_DELAY * 11}>
                <div className="flex flex-col space-y-3">
                  <div className="space-y-3">
                    <span className="badge-professional">
                      Projects
                    </span>
                    <h2 className="text-3xl font-semibold tracking-tight">
                      Check out my latest work
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      I&apos;ve worked on a variety of projects, from simple
                      websites to complex web applications. Here are a few of my
                      favorites.
                    </p>
                  </div>
                </div>
              </BlurFade>
              <div className="flex flex-col gap-4">
                {sortedProjects.slice(0, 4).map((project, id) => (
                  <BlurFade
                    key={project.title}
                    delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                  >
                    <ProjectItem
                      href={project.href}
                      title={project.title}
                      description={project.description}
                      dates={project.dates}
                      tags={project.technologies}
                      image={project.image}
                      video={project.video}
                      links={project.links}
                    />
                  </BlurFade>
                ))}
              </div>
              {DATA.projects.length > 4 && (
                <BlurFade delay={BLUR_FADE_DELAY * 12 + 0.1}>
                  <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-primary/10 text-foreground hover:text-primary border border-border hover:border-primary/20 text-sm font-medium transition-all duration-300"
                  >
                    View all projects
                    <ChevronRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </BlurFade>
              )}
            </div>
          </section>

          <section id="hackathons">
            <div className="space-y-12 w-full">
              <BlurFade delay={BLUR_FADE_DELAY * 13}>
                <div className="flex flex-col space-y-3">
                  <div className="space-y-3">
                    <span className="badge-professional">
                      🏆 Hackathons
                    </span>
                    <h2 className="text-3xl font-semibold tracking-tight">
                      I like building things
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      During my time in university, I attended{" "}
                      {DATA.hackathons.length}+ hackathons. People from around
                      the country would come together and build incredible
                      things in 2-3 days. It was eye-opening to see the endless
                      possibilities brought to life by a group of motivated and
                      passionate individuals.
                    </p>
                  </div>
                </div>
              </BlurFade>
              <BlurFade delay={BLUR_FADE_DELAY * 14}>
                <ul className="mb-4 ml-4 divide-y divide-dashed border-l">
                  {DATA.hackathons.slice(0, 4).map((project, id) => (
                    <BlurFade
                      key={project.title + project.dates}
                      delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                    >
                      <HackathonCard
                        title={project.title}
                        description={project.description}
                        location={project.location}
                        dates={project.dates}
                        image={project.image}
                        win={"win" in project ? project.win : undefined}
                        links={project.links}
                      />
                    </BlurFade>
                  ))}
                </ul>
              </BlurFade>
              {DATA.hackathons.length > 4 && (
                <BlurFade delay={BLUR_FADE_DELAY * 14 + 0.1}>
                  <Link
                    href="/hackathons"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-primary/10 text-foreground hover:text-primary border border-border hover:border-primary/20 text-sm font-medium transition-all duration-300"
                  >
                    View all hackathons
                    <ChevronRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </BlurFade>
              )}
            </div>
          </section>

          <section id="certifications">
            <div className="space-y-8 w-full">
              <BlurFade delay={BLUR_FADE_DELAY * 16}>
                <div className="flex flex-col space-y-3">
                  <div className="space-y-3">
                    <span className="badge-professional">
                      📜 Certifications
                    </span>
                    <h2 className="text-3xl font-semibold tracking-tight">
                      Professional credentials
                    </h2>
                    <p className="text-muted-foreground text-sm">
                      I continuously invest in professional development to stay
                      current with industry best practices and emerging
                      technologies. These certifications validate my expertise
                      and commitment to excellence.
                    </p>
                  </div>
                </div>
              </BlurFade>
              <div className="flex flex-col gap-4">
                {sortedCertifications.slice(0, 4).map((cert, id) => (
                  <BlurFade
                    key={cert.title}
                    delay={BLUR_FADE_DELAY * 17 + id * 0.05}
                  >
                    <CertificationCard
                      href={cert.href}
                      title={cert.title}
                      description={cert.description}
                      dates={cert.dates}
                      image={cert.image}
                    />
                  </BlurFade>
                ))}
              </div>
              {DATA.certifications.length > 4 && (
                <BlurFade delay={BLUR_FADE_DELAY * 17 + 0.1}>
                  <Link
                    href="/certifications"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary hover:bg-primary/10 text-foreground hover:text-primary border border-border hover:border-primary/20 text-sm font-medium transition-all duration-300"
                  >
                    View all certifications
                    <ChevronRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </BlurFade>
              )}
            </div>
          </section>

          <section id="contact">
            <div className="gap-4 w-full">
              <BlurFade delay={BLUR_FADE_DELAY * 18}>
                <div className="space-y-3">
                  <span className="badge-professional">
                    💬 Contact
                  </span>
                  <h2 className="text-3xl font-semibold tracking-tight">
                    Get in Touch
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Want to chat? Just shoot me an email at{" "}
                    <Link
                      href={`mailto:${DATA.contact.email}`}
                      className="text-primary hover:text-accent font-medium underline decoration-primary/30 hover:decoration-accent underline-offset-4 transition-colors"
                    >
                      {DATA.contact.email}
                    </Link>{" "}
                    and I&apos;ll respond whenever I can.
                  </p>
                </div>
              </BlurFade>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
