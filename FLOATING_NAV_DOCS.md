# Floating Navigation Implementation Guide

## 📦 Components Created

### 1. `FloatingNav` Component
**Location:** `src/components/floating-nav.tsx`

**Features:**
- ✅ Bottom-center floating pill navigation
- ✅ Smooth scroll to sections
- ✅ Active section highlighting with Intersection Observer
- ✅ Framer Motion animations (entrance, hover, tap, scroll-based scale/opacity)
- ✅ Social media links (GitHub, LinkedIn, Facebook)
- ✅ Animated theme toggle (sun/moon with rotation)
- ✅ Fully responsive (mobile & desktop)
- ✅ ARIA labels and keyboard navigation support
- ✅ Optional tooltip showing active section name

**Props:**
```typescript
interface NavSection {
  id: string;        // DOM id of the section to scroll to
  label: string;     // Display name
  icon: React.ReactNode; // Icon component
}

interface SocialLink {
  name: string;
  url: string;
  icon: React.ReactNode;
}

interface FloatingNavProps {
  sections: NavSection[];
  socialLinks: SocialLink[];
}
```

### 2. `useActiveSection` Hook
**Location:** `src/hooks/use-active-section.ts`

A reusable hook for tracking active sections across the app. Can be used to sync multiple navigation components.

## 🎨 Design Features

### Visual Style (Minimalist Black & White)
- **Background:** `bg-white/80 dark:bg-black/80` with backdrop blur
- **Border:** Thin gray border matching your theme
- **Shadow:** Subtle shadow for depth
- **Icons:** 60% opacity by default, 100% when active
- **Active Highlight:** Circular gray background behind active icon
- **Hover:** Scale up to 1.15x with smooth spring animation
- **Tap:** Scale down to 0.95x for tactile feedback

### Positioning
- **Desktop:** `bottom-10` (40px from bottom)
- **Tablet:** `bottom-8` (32px from bottom)
- **Mobile:** `bottom-6` (24px from bottom)
- **Always:** Horizontally centered with `left-1/2 -translate-x-1/2`

## 🌀 Animation Details

### Entrance Animation (Page Load)
```typescript
- Initial: y: 100, opacity: 0, scale: 0.8
- Animate: y: 0, opacity: 1, scale: 1
- Timing: Spring animation (stiffness: 260, damping: 20)
- Delay: 0.5s
```

### Scroll-Based Effects
- **Scale:** Shrinks from 1.0 → 0.9 as you scroll 0-200px
- **Opacity:** Fades from 1.0 → 0.9 as you scroll 0-200px
- Uses `useTransform` for buttery-smooth 60fps animations

### Icon Interactions
- **Hover:** Scale 1.15x, opacity 100%, duration 200ms
- **Active:** Scale 1.1x, opacity 100%, circular highlight appears
- **Tap:** Scale 0.95x for press feedback
- **Highlight:** Scales from 0 → 1 with spring physics

### Theme Toggle
- **Rotate:** -90° → 0° → 90° when switching
- **Fade:** opacity 0 → 1 during transition
- **Duration:** 200ms
- **Mode:** `AnimatePresence` with `mode="wait"` for clean swap

## 🧭 Smooth Scrolling Implementation

### How It Works
1. Click on nav icon
2. `scrollToSection()` finds element by ID
3. Calculates position with 80px offset (for sticky headers)
4. Uses native `window.scrollTo({ behavior: "smooth" })`
5. Updates `activeSection` state immediately

### Offset Logic
```typescript
const offset = 80; // Account for fixed headers
const elementPosition = element.getBoundingClientRect().top;
const offsetPosition = elementPosition + window.scrollY - offset;
```

## 🎯 Active Section Detection

### Intersection Observer Setup
```typescript
observerOptions = {
  root: null,
  rootMargin: "-20% 0px -60% 0px", // Section is "active" when top 20-40% of viewport
  threshold: 0,
}
```

**Why this works:**
- Negative top margin (-20%) = section must be at least 20% into view
- Negative bottom margin (-60%) = section stays active until 60% past view
- Prevents flickering between sections
- Feels natural and predictable

### Syncing with Side Nav
Both navigations use the same `activeSection` state:
1. Intersection Observer updates state when section enters view
2. Both FloatingNav and side nav re-render with new active state
3. Active styles (highlight, scale, opacity) update in sync

## 📱 Mobile Responsiveness

### Breakpoints
```css
Mobile: < 768px
- Icons: w-5 h-5
- Padding: px-3 py-2.5
- Gap: gap-1

Desktop: ≥ 768px
- Icons: w-6 h-6
- Padding: px-4 py-3
- Gap: gap-2
```

### Touch Targets
All buttons have minimum 44x44px tap area (iOS/Android guidelines).

## ♿ Accessibility

### Features Implemented
- ✅ `aria-label` on all buttons describing their action
- ✅ `aria-current="page"` on active section button
- ✅ `focus:ring-2` visible focus indicators
- ✅ Keyboard navigation (Tab, Enter, Space)
- ✅ Semantic `<nav>` element with role
- ✅ `rel="noopener noreferrer"` on external links

### Keyboard Navigation
- **Tab:** Move between nav items
- **Enter/Space:** Activate button (scroll to section)
- **Shift+Tab:** Move backwards

## 🔧 Usage Example

### In Main Page
```tsx
import { FloatingNav } from "@/components/floating-nav";
import { Home, Briefcase, FolderGit2, Zap } from "lucide-react";

<FloatingNav
  sections={[
    { id: "hero", label: "Home", icon: <Home /> },
    { id: "work", label: "Experience", icon: <Briefcase /> },
    { id: "projects", label: "Projects", icon: <FolderGit2 /> },
    { id: "optrizo-projects", label: "Optrizo", icon: <Zap /> },
  ]}
  socialLinks={[
    {
      name: "GitHub",
      url: "https://github.com/username",
      icon: <Github />,
    },
    // ... more social links
  ]}
/>
```

### Adding New Sections
1. Add section to your page with unique `id` attribute
2. Add corresponding entry to `sections` array
3. Choose appropriate icon from `lucide-react`

## 🎛️ Customization Options

### Adjust Scroll Offset
```typescript
const offset = 80; // Change this value in scrollToSection()
```

### Adjust Detection Threshold
```typescript
rootMargin: "-20% 0px -60% 0px" // Modify percentages
```

### Disable Scroll-Based Shrinking
```typescript
// Comment out or remove these:
style={{
  scale: navScale,
  opacity: navOpacity,
}}
```

### Change Animation Timing
```typescript
// Entrance speed
delay: 0.5, // Increase/decrease

// Hover/tap speed
duration: 0.2, // Adjust in variants

// Spring physics
stiffness: 260, // Higher = snappier
damping: 20,    // Higher = less bounce
```

## 🐛 Troubleshooting

### Nav not appearing?
- Check `z-index` conflicts
- Ensure sections have correct `id` attributes
- Verify `isVisible` state is `true`

### Wrong section highlighted?
- Adjust `rootMargin` in Intersection Observer
- Check for overlapping section IDs
- Ensure sections have sufficient height

### Animations janky?
- Check for CSS transitions conflicting with Framer Motion
- Ensure `will-change: transform` is set
- Use `transition={{ type: "spring" }}` for physics-based motion

### Theme toggle not working?
- Verify `next-themes` is installed and configured
- Check `ThemeProvider` wraps your app
- Ensure `mounted` state prevents hydration mismatch

## 📊 Performance Considerations

- ✅ Uses `passive: true` on scroll listeners
- ✅ Intersection Observer is more efficient than scroll calculations
- ✅ Framer Motion animations run on GPU (transform/opacity)
- ✅ `AnimatePresence` cleans up DOM nodes properly
- ✅ Debounced scroll effects with `useTransform`

## 🚀 Future Enhancements

Optional features you can add:
- [ ] Progress indicator showing scroll % through page
- [ ] Swipe gestures on mobile to navigate sections
- [ ] Keyboard shortcuts (e.g., 1-9 for sections)
- [ ] Breadcrumb trail showing scroll path
- [ ] Section previews on hover
- [ ] Haptic feedback on mobile (Vibration API)

## 🎓 Learning Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)
- [ARIA Best Practices](https://www.w3.org/WAI/ARIA/apg/)
