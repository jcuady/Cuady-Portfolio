"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

interface ThemeAvatarProps {
  name: string;
  className?: string;
}

export function ThemeAvatar({ name, className }: ThemeAvatarProps) {
  const { theme, resolvedTheme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = mounted ? resolvedTheme : "light";

  const getAvatarSrc = () => {
    if (isHovered) {
      return currentTheme === "dark"
        ? "/avatar/me-tickled-dark.png"
        : "/avatar/me-tickled-light.png";
    }
    return currentTheme === "dark"
      ? "/avatar/me-dark.png"
      : "/avatar/me-light.png";
  };

  return (
    <Avatar
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AvatarImage alt={name} src={getAvatarSrc()} />
    </Avatar>
  );
}
