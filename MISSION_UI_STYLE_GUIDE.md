# NEXUS PROTOCOL - Mission UI/UX Style Guide

## Overview
This document contains all styling specifications, design patterns, and UI/UX guidelines extracted from the mission components. Use this as a reference for maintaining consistent design across the application.

---

## Color Palette

### Primary Colors
- **Arcane Teal (Primary)**: `text-arcane-teal` - Main brand color for headers
- **Theme Primary**: `text-theme-primary` - Dynamic color based on selected agent
- **Theme Accent**: `text-theme-accent` - Secondary dynamic color
- **Arcane Text**: `text-arcane-text` - Primary text color (white/light)
- **Arcane Muted**: `text-arcane-muted` - Secondary text color (gray)

### Background Colors
- **Arcane Dark**: `bg-arcane-dark` - Main background
- **Arcane Panel**: `bg-arcane-panel` - Card/panel backgrounds
- **Arcane Border**: `border-arcane-border` - Border color

### Status Colors
- **Success**: `text-green-400`, `bg-green-500/20`
- **Warning**: `text-yellow-400`, `bg-yellow-500/20`
- **Error**: `text-red-400`, `bg-red-500/20`
- **Info**: `text-blue-400`, `bg-blue-500/20`

---

## Typography

### Font Families
- **Display Font**: `font-display` - Used for headers and titles
- **Mono Font**: `font-mono` - Used for technical data, codes, and stats

### Font Sizes
- **Page Title**: `text-5xl` (3rem / 48px)
- **Section Title**: `text-2xl` (1.5rem / 24px)
- **Card Title**: `text-xl` (1.25rem / 20px)
- **Subtitle**: `text-lg` (1.125rem / 18px)
- **Body Text**: `text-sm` (0.875rem / 14px)
- **Caption**: `text-xs` (0.75rem / 12px)

### Font Weights
- **Bold**: `font-bold` (700)
- **Semibold**: `font-semibold` (600)
- **Normal**: Default (400)

---

## Layout Structure

### Page Container
```css
min-h-screen bg-arcane-dark p-8
```

### Content Container
```css
max-w-6xl mx-auto
```

### Grid Layouts
- **Two Column**: `grid grid-cols-1 lg:grid-cols-2 gap-8`
- **Three Column**: `grid grid-cols-1 lg:grid-cols-3 gap-8`
- **Responsive**: Always start with `grid-cols-1` for mobile

---

## Component Styles

### Page Header
```tsx
<div className="text-center mb-12">
  <h1 className="text-5xl font-bold font-display text-arcane-teal mb-4">
    PAGE TITLE
  </h1>
  <p className="text-xl text-arcane-muted">
    Subtitle or description text
  </p>
</div>
```

### Section Header
```tsx
<h2 className="text-2xl font-bold font-display text-arcane-text mb-6">
  Section Title
</h2>
```

### Card Component (NexusCard)
```tsx
<NexusCard
  interactive          // Adds hover effects
  selected={boolean}   // Highlights when selected
  onClick={handler}    // Makes clickable
  className="cursor-pointer"
>
  {/* Card content */}
</NexusCard>
```

**Card Content Structure:**
```tsx
<div className="flex justify-between items-start mb-4">
  <div>
    <h3 className="text-lg font-bold font-display text-arcane-text">
      Card Title
    </h3>
    <p className="text-sm text-arcane-muted">
      Subtitle
    </p>
  </div>
  <div className="px-3 py-1 rounded text-xs font-semibold bg-green-500/20 text-green-400">
    Badge
  </div>
</div>
```

---

## Mission-Specific Components

### Mission Status Panel
```tsx
<NexusCard>
  <h3 className="text-lg font-bold font-display text-arcane-text mb-4">
    Mission Status
  </h3>
  
  {/* Progress Bar */}
  <div className="flex justify-between text-sm mb-2">
    <span className="text-arcane-muted">Progress</span>
    <span className="text-arcane-text">75%</span>
  </div>
  <div className="w-full h-2 bg-arcane-border rounded-full overflow-hidden">
    <div 
      className="h-full bg-gradient-to-r from-theme-primary to-theme-accent transition-all duration-500"
      style={{ width: '75%' }}
    />
  </div>
</NexusCard>
```

### Mission Card
```tsx
<NexusCard interactive selected={isSelected} onClick={handleSelect}>
  {/* Header with title and difficulty badge */}
  <div className="flex justify-between items-start mb-4">
    <div>
      <h3 className="text-lg font-bold font-display text-arcane-text">
        Mission Name
      </h3>
      <p className="text-sm text-arcane-muted">
        Target: Medium Access
      </p>
    </div>
    <div className="px-3 py-1 rounded text-xs font-semibold bg-yellow-500/20 text-yellow-400">
      Medium
    </div>
  </div>

  {/* Description */}
  <p className="text-sm text-arcane-muted mb-3">
    Mission description text
  </p>

  {/* Stats Grid */}
  <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
    <div>
      <span className="text-arcane-muted">Duration:</span>
      <div className="text-arcane-text">30 min</div>
    </div>
    <div>
      <span className="text-arcane-muted">Trace Limit:</span>
      <div className="text-arcane-text">75%</div>
    </div>
    <div>
      <span className="text-arcane-muted">Phases:</span>
      <div className="text-arcane-text">3</div>
    </div>
  </div>
</NexusCard>
```

### Objective Panel
```tsx
<div className="p-4 bg-arcane-panel/50 rounded border border-arcane-border">
  <h5 className="text-theme-primary font-bold mb-1">
    Objective Title
  </h5>
  <p className="text-sm text-arcane-muted mb-2">
    Objective description
  </p>
  <div className="text-xs font-mono text-arcane-text opacity-75">
    Reward: 500 PTS
  </div>
</div>
```

### Mission Details Grid
```tsx
<div className="grid grid-cols-2 gap-4 pt-4 border-t border-arcane-border">
  <div>
    <span className="text-xs text-arcane-muted">Risk Level:</span>
    <div className="text-sm text-arcane-text">Medium</div>
  </div>
  <div>
    <span className="text-xs text-arcane-muted">Time Limit:</span>
    <div className="text-sm text-arcane-text">30 min</div>
  </div>
</div>
```

---

## Progress Indicators

### Progress Bar
```tsx
<div className="w-full h-2 bg-arcane-border rounded-full overflow-hidden">
  <div 
    ref={progressBarRef}
    className="h-full bg-gradient-to-r from-theme-primary to-theme-accent transition-all duration-500"
    style={{ width: `${progress}%` }}
  />
</div>
```

### Trace Meter (with warning states)
```tsx
<div className="w-full h-3 bg-arcane-border rounded-full overflow-hidden">
  <div 
    className={`h-full transition-all duration-500 ${
      trace > 75 ? 'bg-gradient-to-r from-red-500 to-red-700' :
      trace > 50 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
      'bg-gradient-to-r from-theme-primary to-theme-accent'
    }`}
    style={{ width: `${trace}%` }}
  />
</div>
```

---

## Badges & Status Indicators

### Difficulty Badges
```tsx
{/* Easy */}
<div className="px-3 py-1 rounded text-xs font-semibold bg-green-500/20 text-green-400">
  Easy
</div>

{/* Medium */}
<div className="px-3 py-1 rounded text-xs font-semibold bg-yellow-500/20 text-yellow-400">
  Medium
</div>

{/* Hard */}
<div className="px-3 py-1 rounded text-xs font-semibold bg-orange-500/20 text-orange-400">
  Hard
</div>
```

### Status Dots
```tsx
<div className="flex items-center">
  <div className="w-2 h-2 bg-theme-primary rounded-full mr-2 animate-pulse"></div>
  <span className="text-sm text-theme-primary">Active</span>
</div>
```

---

## Interactive States

### Hover Effects
```css
hover:scale-105
hover:shadow-xl
hover:shadow-theme-primary/10
transition-all duration-500
```

### Selected State
```css
ring-2 ring-theme-primary
shadow-2xl shadow-theme-primary/25
```

### Disabled State
```css
opacity-50
cursor-not-allowed
```

---

## Animations

### GSAP Animations (for progress bars)
```javascript
gsap.to(element, {
  width: `${progress}%`,
  duration: 0.8,
  ease: 'power2.out'
});
```

### CSS Transitions
```css
transition-all duration-500
transition-colors duration-300
transition-opacity duration-300
```

### Pulse Animation
```css
animate-pulse
```

---

## Spacing System

### Padding
- **Small**: `p-3` (0.75rem / 12px)
- **Medium**: `p-4` (1rem / 16px)
- **Large**: `p-8` (2rem / 32px)

### Margin
- **Small**: `mb-2` (0.5rem / 8px)
- **Medium**: `mb-4` (1rem / 16px)
- **Large**: `mb-6` (1.5rem / 24px)
- **Extra Large**: `mb-12` (3rem / 48px)

### Gap (for grids/flex)
- **Small**: `gap-4` (1rem / 16px)
- **Large**: `gap-8` (2rem / 32px)

---

## Border Styles

### Standard Border
```css
border border-arcane-border
```

### Top Border (divider)
```css
border-t border-arcane-border
```

### Rounded Corners
- **Small**: `rounded` (0.25rem / 4px)
- **Medium**: `rounded-lg` (0.5rem / 8px)
- **Full**: `rounded-full` (9999px)

---

## Empty States

### No Selection State
```tsx
<NexusCard>
  <div className="text-center py-12">
    <div className="text-arcane-muted mb-4">
      Select a mission to view details
    </div>
    <div className="w-16 h-16 mx-auto border-2 border-dashed border-arcane-border rounded-lg flex items-center justify-center">
      <span className="text-2xl text-arcane-muted">?</span>
    </div>
  </div>
</NexusCard>
```

### No Active Mission
```tsx
<div className="min-h-screen bg-arcane-dark flex items-center justify-center">
  <div className="text-center">
    <div className="text-6xl text-theme-primary mb-4">⚠️</div>
    <h2 className="text-2xl font-bold text-arcane-text mb-4">
      No Active Mission
    </h2>
    <p className="text-arcane-muted">
      Please select a mission to begin.
    </p>
  </div>
</div>
```

---

## Button Styles (NexusButton)

### Primary Button
```tsx
<NexusButton
  variant="primary"
  size="lg"
  fullWidth
  onClick={handleClick}
>
  Button Text
</NexusButton>
```

### Button Variants
- `variant="primary"` - Main action button
- `variant="secondary"` - Secondary actions
- `variant="danger"` - Destructive actions

### Button Sizes
- `size="sm"` - Small button
- `size="md"` - Medium button (default)
- `size="lg"` - Large button

---

## Responsive Design

### Breakpoints
- **Mobile**: Default (< 768px)
- **Tablet**: `md:` (≥ 768px)
- **Desktop**: `lg:` (≥ 1024px)

### Responsive Patterns
```tsx
{/* Stack on mobile, side-by-side on desktop */}
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  {/* Content */}
</div>

{/* Hide on mobile, show on desktop */}
<div className="hidden lg:block">
  {/* Content */}
</div>
```

---

## Accessibility

### Focus States
All interactive elements should have visible focus states:
```css
focus:outline-none
focus:ring-2
focus:ring-theme-primary
```

### ARIA Labels
```tsx
<button aria-label="Start Mission">
  Start
</button>
```

---

## Best Practices

1. **Consistency**: Always use the defined color palette and spacing system
2. **Hierarchy**: Use font sizes and weights to establish clear visual hierarchy
3. **Feedback**: Provide visual feedback for all interactive elements
4. **Performance**: Use CSS transitions for simple animations, GSAP for complex ones
5. **Accessibility**: Ensure sufficient color contrast and keyboard navigation
6. **Responsive**: Design mobile-first, enhance for larger screens
7. **Theme Support**: Use theme-aware colors (`theme-primary`, `theme-accent`) for agent-specific styling

---

## Component Checklist

When creating new mission-related components, ensure:
- [ ] Uses NexusCard for containers
- [ ] Follows the color palette
- [ ] Uses appropriate font sizes and weights
- [ ] Includes hover/selected states for interactive elements
- [ ] Has proper spacing (padding/margin/gap)
- [ ] Is responsive (mobile-first)
- [ ] Includes loading/empty states
- [ ] Uses theme-aware colors where appropriate
- [ ] Has smooth transitions/animations
- [ ] Follows accessibility guidelines
