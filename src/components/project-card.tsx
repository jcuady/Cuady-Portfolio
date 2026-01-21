"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import { ExternalLink, Folder, Globe } from "lucide-react";

interface Props {
  title: string;
  href?: string;
  description: string;
  dates: string;
  tags: readonly string[];
  link?: string;
  image?: string;
  video?: string;
  links?: readonly {
    icon: React.ReactNode;
    type: string;
    href: string;
  }[];
  className?: string;
  showPreview?: boolean;
}

export function ProjectCard({
  title,
  href,
  description,
  dates,
  tags,
  image,
  video,
  links,
  className,
  showPreview = false,
}: Props) {
  // Filter out "Website" links as the whole card is now the link
  const footerLinks = links?.filter((link) => link.type !== "Website");

  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden border transition-all duration-300 ease-out h-full hover:shadow-2xl hover:border-foreground/20 bg-card group relative hover:scale-[1.02] hover:z-50",
        className
      )}
    >
      {/* Primary Link (Stretched to cover the whole card) */}
      <Link
        href={href || "#"}
        target="_blank"
        className="absolute inset-0 z-0"
      >
        <span className="sr-only">View {title}</span>
      </Link>

      {/* Media Section */}
      <div className="relative w-full aspect-video overflow-hidden bg-secondary/20">
        {video ? (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted/50 transition-colors group-hover:bg-muted/70">
            <div className="flex flex-col items-center gap-2 text-muted-foreground transition-transform duration-500 group-hover:scale-110">
              <Folder className="size-10 opacity-20" />
            </div>
          </div>
        )}

        {/* Hover Overlay Preview Label - Only if showPreview is true */}
        {showPreview && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="flex items-center gap-2 text-white font-medium text-sm translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <Globe className="size-4" />
              <span>Visit Site</span>
              <ExternalLink className="size-3" />
            </div>
          </div>
        )}
      </div>

      <CardHeader className="px-4 py-4 relative z-10 pointer-events-none">
        <div className="space-y-2">
          <div className="flex justify-between items-start gap-2">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              {title}
              {href && <div className="size-1.5 rounded-full bg-green-500 animate-pulse" />}
            </CardTitle>
            <time className="font-sans text-[10px] text-muted-foreground whitespace-nowrap pt-1">
              {dates}
            </time>
          </div>
          <Markdown className="prose max-w-full text-pretty font-sans text-xs text-muted-foreground dark:prose-invert leading-relaxed line-clamp-3 group-hover:line-clamp-none transition-all duration-300">
            {description}
          </Markdown>
        </div>
      </CardHeader>

      <CardContent className="mt-auto flex flex-col px-4 pb-4 relative z-10 pointer-events-none">
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge
                className="px-1.5 py-0.5 text-[10px] rounded-md bg-secondary text-secondary-foreground border-transparent font-medium"
                key={tag}
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      {footerLinks && footerLinks.length > 0 && (
        <CardFooter className="px-4 pb-4 pt-0 relative z-10 pointer-events-none">
          <div className="flex flex-row flex-wrap items-start gap-2 pointer-events-auto">
            {footerLinks.map((link, idx) => (
              <Link
                href={link?.href}
                key={idx}
                target="_blank"
              >
                <Badge className="flex gap-1.5 px-2 py-1 text-[10px] rounded-md bg-primary/5 text-primary hover:bg-primary/10 border-transparent transition-colors">
                  {link.icon}
                  {link.type}
                </Badge>
              </Link>
            ))}
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
