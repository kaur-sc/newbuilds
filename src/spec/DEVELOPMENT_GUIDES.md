# Development Guides

This document provides step-by-step guides for creating new pages, themes,
layout modifications, and content blocks while maintaining system consistency.

## Table of Contents

1. [New Page Creation Guide](#new-page-creation-guide)
2. [New Theme Creation Guide](#new-theme-creation-guide)
3. [Layout Modification Guide](#layout-modification-guide)
4. [Content Block Addition Guide](#content-block-addition-guide)
5. [AI Development Guidelines](#ai-development-guidelines)
6. [Quality Assurance Checklists](#quality-assurance-checklists)
7. [Troubleshooting & Deployment](#troubleshooting--deployment)

---

## New Page Creation Guide

### Overview

This guide ensures new pages integrate seamlessly with the theme system and
maintain consistency across the application.

### Step 1: Create Page Component

**File Location**: `src/pages/[PageName].tsx`

**Template**:

```tsx
import React, { useEffect } from "react";
import { getPageTheme } from "@/lib/pageThemeManager";
import { applyTheme } from "@/themes/resolver";
import { Head } from "vite-react-ssg";

interface PageProps {
    // Define your page props here
}

export function PageName({/* props */}: PageProps) {
    // Apply saved theme on page load
    useEffect(() => {
        const currentPath = window.location.pathname;
        const savedTheme = getPageTheme(currentPath);

        if (savedTheme) {
            console.log(`🎨 Applying saved theme "${savedTheme}" to PageName`);
            applyTheme(savedTheme);
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col font-sans text-foreground bg-background">
            <Head>
                <title>Page Title - Sunny Casas</title>
                <meta name="description" content="Page description for SEO" />
            </Head>

            {/* Page content using theme classes */}
            <main className="flex-1">
                {/* Your page content here */}
            </main>
        </div>
    );
}

export default PageName;
```

### Step 2: Add Route Configuration

**File**: `src/routes.tsx`

**Add to routes array**:

```tsx
import { PageName } from '@/pages/PageName';

// Add this route object
{
  path: 'page-url-slug',
  element: <PageName />,
}
```

**For Fixed Theme Pages**:

```tsx
{
  path: 'page-url-slug-with-theme',
  element: (
    <ThemeProvider routeTheme="golf-elegant">
      <PageName />
    </ThemeProvider>
  ),
}
```

### Step 3: Use Theme Classes Throughout

**Typography**:

```tsx
<h1 className="h1">Page Title</h1>
<h2 className="h2">Section Title</h2>
<h3 className="h3">Subsection Title</h3>
<p className="body">Body paragraph text</p>
<small className="small">Small text</small>
<div className="caption">Caption text</div>
```

**Buttons**:

```tsx
<button className="btn-primary">Primary Action</button>
<button className="btn-secondary">Secondary Action</button>
<button className="btn-outline">Outline Action</button>
<button className="btn-ghost">Ghost Action</button>
```

**Colors and Layout**:

```tsx
<div className="bg-background text-foreground">Main container</div>
<div className="bg-card border-border">Card component</div>
<p className="text-muted-foreground">Muted text</p>
<a className="text-primary">Primary link</a>
```

### Step 4: Test Integration

**1. Theme Switching Test**:

- Navigate to Style Editor → Page Theme Manager
- Find your new page in the dropdown
- Apply different themes
- Verify immediate visual changes

**2. Theme Persistence Test**:

- Apply a theme to your page
- Refresh the browser (F5)
- Verify theme persists and is applied correctly

**3. Cross-Theme Test**:

- Test with all available themes (golf, golf-elegant, midnight)
- Ensure all styling works correctly
- Check responsive behavior on mobile/tablet/desktop

### Step 5: Navigation Integration

If page needs navigation components:

**Include Navbar**:

```tsx
import { Navbar } from "@/components/layout/Navbar";

// In your page component
<Navbar data={pageData} />;
```

**Include Footer**:

```tsx
import { Footer } from "@/components/layout/Footer";

// In your page component
<Footer data={pageData} />;
```

### New Page Checklist

- [ ] Page component created with useEffect theme detection
- [ ] Route added to src/routes.tsx
- [ ] All styled elements use theme classes
- [ ] No inline styles or CSS variable injection
- [ ] Page Theme Manager integration tested
- [ ] Theme persistence tested
- [ ] Cross-theme compatibility verified
- [ ] Mobile responsive design tested
- [ ] SEO meta tags implemented

---

## New Theme Creation Guide

### Overview

This guide ensures new themes integrate properly with the style editor and work
across all pages.

### Step 1: Define Theme Configuration

**File**: `src/themes/index.ts`

**Add to themes object**:

```typescript
export const themes: Record<ThemeKey, ThemeConfig> = {
    // ... existing themes

    "new-theme": {
        id: "new-theme",
        name: "New Theme Name",
        colors: {
            "--primary": "#3b82f6",
            "--primary-foreground": "#ffffff",
            "--secondary": "#f1f5f9",
            "--secondary-foreground": "#0f172a",
            "--accent": "#f1f5f9",
            "--accent-foreground": "#0f172a",
            "--muted": "#f1f5f9",
            "--muted-foreground": "#64748b",
            "--background": "#ffffff",
            "--foreground": "#0f172a",
            "--card": "#ffffff",
            "--card-foreground": "#0f172a",
            "--popover": "#ffffff",
            "--popover-foreground": "#0f172a",
            "--border": "#f1f5f9",
            "--input": "#f1f5f9",
            "--ring": "#0f172a",
            "--radius": "0.5rem",
            "--destructive": "#ef4444",
            "--destructive-foreground": "#ffffff",
        },
        baseTypo: {
            fontSize: "16px",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
        },
        elementStyles: {
            h1: {
                size: "3.75rem",
                weight: "700",
                lineHeight: "1",
                letterSpacing: "-0.02em",
            },
            h2: {
                size: "3rem",
                weight: "700",
                lineHeight: "1",
                letterSpacing: "-0.01em",
            },
            h3: {
                size: "1.875rem",
                weight: "700",
                lineHeight: "2.25rem",
                letterSpacing: "0",
            },
            body: {
                size: "1rem",
                weight: "400",
                lineHeight: "1.5rem",
                letterSpacing: "0",
            },
            small: {
                size: "0.875rem",
                weight: "400",
                lineHeight: "1.5",
                letterSpacing: "0.01em",
            },
            caption: {
                size: "0.75rem",
                weight: "400",
                lineHeight: "1.4",
                letterSpacing: "0.02em",
            },
            "btn-primary": {
                bg: "var(--primary)",
                text: "var(--primary-foreground)",
                radius: "9999px",
                px: "1.5rem",
                py: "0.625rem",
                weight: "700",
            },
            "btn-secondary": {
                bg: "var(--secondary)",
                text: "var(--secondary-foreground)",
                radius: "9999px",
                px: "2rem",
                py: "0.75rem",
                weight: "700",
            },
            "btn-outline": {
                bg: "transparent",
                text: "var(--primary)",
                radius: "9999px",
                px: "2rem",
                py: "0.75rem",
                border: "var(--border)",
                weight: "700",
            },
            "btn-ghost": {
                bg: "transparent",
                text: "var(--primary)",
                radius: "9999px",
                px: "2rem",
                py: "0.75rem",
                weight: "700",
            },
            "link-std": {
                text: "var(--primary)",
                weight: "500",
                under: "underline",
            },
            "link-bold": {
                text: "var(--primary)",
                weight: "700",
                under: "none",
            },
            "site-title": {
                size: "1.25rem",
                weight: "700",
                lineHeight: "1.2",
                letterSpacing: "-0.01em",
            },
            "mobile-menu-btn": {
                size: "0.875rem",
                weight: "600",
                lineHeight: "1.4",
                letterSpacing: "0.01em",
            },
            "mobile-menu-links": {
                size: "1rem",
                weight: "500",
                lineHeight: "1.5",
                letterSpacing: "0",
            },
            navbar: {
                bg: "var(--background)",
                transparency: "0.9",
                blur: "12px",
                color: "var(--foreground)",
                border: "var(--border)",
            },
        },
    },
    // ... other themes
};
```

### Step 2: Create Theme CSS File

**File**: `src/styles/new-theme.css`

**Template**:

```css
/* New Theme CSS - Defines theme classes that consume CSS variables */
[data-theme="new-theme"] {
    /* Colors (HSL format for Tailwind) */
    --primary: 59 91% 78%;
    --primary-foreground: 0 0% 100%;
    --secondary: 210 40% 98%;
    --secondary-foreground: 222.2 84% 4.9%;
    --accent: 210 40% 98%;
    --accent-foreground: 222.2 84% 4.9%;
    --muted: 210 40% 98%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 59 91% 78%;
    --radius: 0.5rem;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 0 0% 100%;

    /* Global Typography */
    --font-base-size: 16px;
    --font-base-family: ui-sans-serif, system-ui, sans-serif;

    /* Granular Element Styles */
    --h1-size: 3.75rem;
    --h1-weight: 700;
    --h1-line-height: 1;
    --h1-letter-spacing: -0.02em;
    --h1-color: var(--foreground);

    --h2-size: 3rem;
    --h2-weight: 700;
    --h2-line-height: 1;
    --h2-letter-spacing: -0.01em;
    --h2-color: var(--foreground);

    --h3-size: 1.875rem;
    --h3-weight: 700;
    --h3-line-height: 2.25rem;
    --h3-letter-spacing: 0;
    --h3-color: var(--foreground);

    --body-size: 1rem;
    --body-weight: 400;
    --body-line-height: 1.5rem;
    --body-letter-spacing: 0;
    --body-color: var(--foreground);

    --small-size: 0.875rem;
    --small-weight: 400;
    --small-line-height: 1.5;
    --small-letter-spacing: 0.01em;
    --small-color: var(--foreground);

    --caption-size: 0.75rem;
    --caption-weight: 400;
    --caption-line-height: 1.4;
    --caption-letter-spacing: 0.02em;
    --caption-color: var(--foreground);

    --btn-primary-bg: var(--primary);
    --btn-primary-text: var(--primary-foreground);
    --btn-primary-radius: 9999px;
    --btn-primary-px: 1.5rem;
    --btn-primary-py: 0.625rem;
    --btn-primary-weight: 700;
    --btn-primary-hover-bg: var(--primary);
    --btn-primary-hover-text: var(--primary-foreground);
    --btn-primary-hover-scale: 1.05;
    --btn-primary-active-bg: var(--primary);
    --btn-primary-active-text: var(--primary-foreground);
    --btn-primary-active-scale: 0.95;

    --btn-secondary-bg: var(--secondary);
    --btn-secondary-text: var(--secondary-foreground);
    --btn-secondary-radius: 9999px;
    --btn-secondary-px: 2rem;
    --btn-secondary-py: 0.75rem;
    --btn-secondary-weight: 700;
    --btn-secondary-hover-bg: var(--secondary);
    --btn-secondary-hover-text: var(--secondary-foreground);
    --btn-secondary-hover-scale: 1.05;
    --btn-secondary-active-bg: var(--secondary);
    --btn-secondary-active-text: var(--secondary-foreground);
    --btn-secondary-active-scale: 0.95;

    --btn-outline-bg: transparent;
    --btn-outline-text: var(--primary);
    --btn-outline-radius: 9999px;
    --btn-outline-px: 2rem;
    --btn-outline-py: 0.75rem;
    --btn-outline-border: var(--border);
    --btn-outline-weight: 700;
    --btn-outline-hover-bg: var(--primary);
    --btn-outline-hover-text: var(--primary-foreground);
    --btn-outline-hover-border: var(--primary);
    --btn-outline-hover-scale: 1.05;
    --btn-outline-active-bg: var(--primary);
    --btn-outline-active-text: var(--primary-foreground);
    --btn-outline-active-border: var(--primary);
    --btn-outline-active-scale: 0.95;

    --btn-ghost-bg: transparent;
    --btn-ghost-text: var(--primary);
    --btn-ghost-radius: 9999px;
    --btn-ghost-px: 2rem;
    --btn-ghost-py: 0.75rem;
    --btn-ghost-weight: 700;
    --btn-ghost-hover-bg: var(--primary);
    --btn-ghost-hover-text: var(--primary);
    --btn-ghost-hover-scale: 1.05;
    --btn-ghost-active-bg: var(--primary);
    --btn-ghost-active-text: var(--primary-foreground);
    --btn-ghost-active-scale: 0.95;

    --link-std-text: var(--primary);
    --link-std-weight: 500;
    --link-std-under: underline;
    --link-std-hover-text: var(--primary);
    --link-std-hover-scale: 1.02;
    --link-std-active-text: var(--primary);
    --link-std-active-scale: 0.98;

    --link-bold-text: var(--primary);
    --link-bold-weight: 700;
    --link-bold-under: none;
    --link-bold-hover-text: var(--primary);
    --link-bold-hover-scale: 1.02;
    --link-bold-active-text: var(--primary);
    --link-bold-active-scale: 0.98;

    --site-title-size: 1.25rem;
    --site-title-weight: 700;
    --site-title-line-height: 1.2;
    --site-title-letter-spacing: -0.01em;

    --mobile-menu-btn-size: 0.875rem;
    --mobile-menu-btn-weight: 600;
    --mobile-menu-btn-line-height: 1.4;
    --mobile-menu-btn-letter-spacing: 0.01em;

    --mobile-menu-links-size: 1rem;
    --mobile-menu-links-weight: 500;
    --mobile-menu-links-line-height: 1.5;
    --mobile-menu-links-letter-spacing: 0;

    /* Header Background Variables */
    --navbar-bg-color: var(--background);
    --navbar-bg-transparency: 0.9;
    --navbar-bg-blur: 12px;
}

/* Theme Classes - These consume the CSS variables defined above */

/* Typography Classes */
.h1 {
    font-size: var(--h1-size);
    font-weight: var(--h1-weight);
    line-height: var(--h1-line-height);
    letter-spacing: var(--h1-letter-spacing);
    color: hsl(var(--h1-color));
}

.h2 {
    font-size: var(--h2-size);
    font-weight: var(--h2-weight);
    line-height: var(--h2-line-height);
    letter-spacing: var(--h2-letter-spacing);
    color: hsl(var(--h2-color));
}

.h3 {
    font-size: var(--h3-size);
    font-weight: var(--h3-weight);
    line-height: var(--h3-line-height);
    letter-spacing: var(--h3-letter-spacing);
    color: hsl(var(--h3-color));
}

.body {
    font-size: var(--body-size);
    font-weight: var(--body-weight);
    line-height: var(--body-line-height);
    letter-spacing: var(--body-letter-spacing);
    color: hsl(var(--body-color));
}

.small {
    font-size: var(--small-size);
    font-weight: var(--small-weight);
    line-height: var(--small-line-height);
    letter-spacing: var(--small-letter-spacing);
    color: hsl(var(--small-color));
}

.caption {
    font-size: var(--caption-size);
    font-weight: var(--caption-weight);
    line-height: var(--caption-line-height);
    letter-spacing: var(--caption-letter-spacing);
    color: hsl(var(--caption-color));
}

/* Button Classes */
.btn-primary {
    background: hsl(var(--btn-primary-bg));
    color: hsl(var(--btn-primary-text));
    border-radius: var(--btn-primary-radius);
    padding-left: var(--btn-primary-px);
    padding-right: var(--btn-primary-px);
    padding-top: var(--btn-primary-py);
    padding-bottom: var(--btn-primary-py);
    font-weight: var(--btn-primary-weight);
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
}

.btn-primary:hover {
    background: hsl(var(--btn-primary-hover-bg));
    color: hsl(var(--btn-primary-hover-text));
    transform: scale(var(--btn-primary-hover-scale));
}

.btn-primary:active {
    background: hsl(var(--btn-primary-active-bg));
    color: hsl(var(--btn-primary-active-text));
    transform: scale(var(--btn-primary-active-scale));
}

.btn-secondary {
    background: hsl(var(--btn-secondary-bg));
    color: hsl(var(--btn-secondary-text));
    border-radius: var(--btn-secondary-radius);
    padding-left: var(--btn-secondary-px);
    padding-right: var(--btn-secondary-px);
    padding-top: var(--btn-secondary-py);
    padding-bottom: var(--btn-secondary-py);
    font-weight: var(--btn-secondary-weight);
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
}

.btn-secondary:hover {
    background: hsl(var(--btn-secondary-hover-bg));
    color: hsl(var(--btn-secondary-hover-text));
    transform: scale(var(--btn-secondary-hover-scale));
}

.btn-secondary:active {
    background: hsl(var(--btn-secondary-active-bg));
    color: hsl(var(--btn-secondary-active-text));
    transform: scale(var(--btn-secondary-active-scale));
}

.btn-outline {
    background: hsl(var(--btn-outline-bg));
    color: hsl(var(--btn-outline-text));
    border-radius: var(--btn-outline-radius);
    padding-left: var(--btn-outline-px);
    padding-right: var(--btn-outline-px);
    padding-top: var(--btn-outline-py);
    padding-bottom: var(--btn-outline-py);
    font-weight: var(--btn-outline-weight);
    border: 1px solid hsl(var(--btn-outline-border));
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
}

.btn-outline:hover {
    background: hsl(var(--btn-outline-hover-bg));
    color: hsl(var(--btn-outline-hover-text));
    border-color: hsl(var(--btn-outline-hover-border));
    transform: scale(var(--btn-outline-hover-scale));
}

.btn-outline:active {
    background: hsl(var(--btn-outline-active-bg));
    color: hsl(var(--btn-outline-active-text));
    border-color: hsl(var(--btn-outline-active-border));
    transform: scale(var(--btn-outline-active-scale));
}

.btn-ghost {
    background: hsl(var(--btn-ghost-bg));
    color: hsl(var(--btn-ghost-text));
    border-radius: var(--btn-ghost-radius);
    padding-left: var(--btn-ghost-px);
    padding-right: var(--btn-ghost-px);
    padding-top: var(--btn-ghost-py);
    padding-bottom: var(--btn-ghost-py);
    font-weight: var(--btn-ghost-weight);
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
}

.btn-ghost:hover {
    background: hsl(var(--btn-ghost-hover-bg));
    color: hsl(var(--btn-ghost-hover-text));
    transform: scale(var(--btn-ghost-hover-scale));
}

.btn-ghost:active {
    background: hsl(var(--btn-ghost-active-bg));
    color: hsl(var(--btn-ghost-active-text));
    transform: scale(var(--btn-ghost-active-scale));
}

/* Link Classes */
.link-std {
    color: hsl(var(--link-std-text));
    font-weight: var(--link-std-weight);
    text-decoration: var(--link-std-under);
    transition: all 0.2s ease;
    cursor: pointer;
}

.link-std:hover {
    color: hsl(var(--link-std-hover-text));
    transform: scale(var(--link-std-hover-scale));
}

.link-std:active {
    color: hsl(var(--link-std-active-text));
    transform: scale(var(--link-std-active-scale));
}

.link-bold {
    color: hsl(var(--link-bold-text));
    font-weight: var(--link-bold-weight);
    text-decoration: var(--link-bold-under);
    transition: all 0.2s ease;
    cursor: pointer;
}

.link-bold:hover {
    color: hsl(var(--link-bold-hover-text));
    transform: scale(var(--link-bold-hover-scale));
}

.link-bold:active {
    color: hsl(var(--link-bold-active-text));
    transform: scale(var(--link-bold-active-scale));
}

/* Navigation Classes */
.site-title {
    font-size: var(--site-title-size);
    font-weight: var(--site-title-weight);
    line-height: var(--site-title-line-height);
    letter-spacing: var(--site-title-letter-spacing);
    color: hsl(var(--foreground));
}

.mobile-menu-btn {
    font-size: var(--mobile-menu-btn-size);
    font-weight: var(--mobile-menu-btn-weight);
    line-height: var(--mobile-menu-btn-line-height);
    letter-spacing: var(--mobile-menu-btn-letter-spacing);
    color: hsl(var(--foreground));
}

.mobile-menu-links {
    font-size: var(--mobile-menu-links-size);
    font-weight: var(--mobile-menu-links-weight);
    line-height: var(--mobile-menu-links-line-height);
    letter-spacing: var(--mobile-menu-links-letter-spacing);
    color: hsl(var(--foreground));
}

/* Navigation with Header Background */
.navbar {
    background: hsla(var(--navbar-bg-color) / var(--navbar-bg-transparency));
    backdrop-filter: blur(var(--navbar-bg-blur));
    -webkit-backdrop-filter: blur(var(--navbar-bg-blur));
}

/* Responsive Mobile Variants */
@media (max-width: 768px) {
    .h1 {
        font-size: var(--h1-mobile-size);
        line-height: var(--h1-mobile-line-height);
    }

    .h2 {
        font-size: var(--h2-mobile-size);
        line-height: var(--h2-mobile-line-height);
    }

    .h3 {
        font-size: var(--h3-mobile-size);
        line-height: var(--h3-mobile-line-height);
    }

    .body {
        font-size: var(--body-mobile-size);
        line-height: var(--body-mobile-line-height);
    }

    .small {
        font-size: var(--small-mobile-size);
        line-height: var(--small-mobile-line-height);
    }

    .caption {
        font-size: var(--caption-mobile-size);
        line-height: var(--caption-mobile-line-height);
    }

    .btn-primary {
        padding-left: var(--btn-primary-mobile-px);
        padding-right: var(--btn-primary-mobile-px);
        padding-top: var(--btn-primary-mobile-py);
        padding-bottom: var(--btn-primary-mobile-py);
    }

    .btn-secondary {
        padding-left: var(--btn-secondary-mobile-px);
        padding-right: var(--btn-secondary-mobile-px);
        padding-top: var(--btn-secondary-mobile-py);
        padding-bottom: var(--btn-secondary-mobile-py);
    }

    .btn-outline {
        padding-left: var(--btn-outline-mobile-px);
        padding-right: var(--btn-outline-mobile-px);
        padding-top: var(--btn-outline-mobile-py);
        padding-bottom: var(--btn-outline-mobile-py);
    }

    .btn-ghost {
        padding-left: var(--btn-ghost-mobile-px);
        padding-right: var(--btn-ghost-mobile-px);
        padding-top: var(--btn-ghost-mobile-py);
        padding-bottom: var(--btn-ghost-mobile-py);
    }
}
```

### Step 3: Import Theme CSS in Style Editor

**File**: `src/style-editor/index.tsx`

**Add import**:

```tsx
import "../styles/new-theme.css";
```

### Step 4: Update Type Definitions

**File**: `src/themes/types.ts`

**Add to ThemeKey type**:

```typescript
export type ThemeKey = "golf" | "golf-elegant" | "midnight" | "new-theme";
```

### Step 5: Test Theme Integration

**1. Style Editor Test**:

- Open Style Editor
- Select your new theme
- Test all controls and live preview
- Verify CSS export functionality

**2. Page Integration Test**:

- Navigate to existing pages
- Apply your new theme via Page Theme Manager
- Verify all styling works correctly

**3. Cross-Theme Test**:

- Test with all page types (LandingPage, GolfProperties, etc.)
- Ensure theme works across different layouts
- Check responsive behavior on mobile/tablet/desktop

### New Theme Checklist

- [ ] Theme configuration added to src/themes/index.ts
- [ ] Theme CSS file created with all variables and classes
- [ ] Theme CSS imported in style-editor/index.tsx
- [ ] Type definitions updated with new theme key
- [ ] All theme classes defined in CSS
- [ ] Mobile responsive variants included
- [ ] Header background variables defined
- [ ] Style Editor integration tested
- [ ] Page theme switching tested
- [ ] Cross-theme compatibility verified

---

## Layout Modification Guide

### Overview

This guide ensures layout changes maintain theme compatibility and responsive
design patterns.

### Step 1: Understand Existing Layout Patterns

**Container System**:

```tsx
import { Container } from "@/components/ui/container";

// Use for consistent width and padding
<Container className="custom-class">
    {/* Content */}
</Container>;
```

**Section System**:

```tsx
import { Section } from "@/components/ui/section";

// Use for consistent section spacing
<Section className="custom-class">
    {/* Section content */}
</Section>;
```

### Step 2: Safe Layout Modifications

**For Container Width Changes**:

```css
/* Add to theme CSS */
[data-theme="theme-name"] {
    --container-max-width: 1200px; /* Custom width */
    --container-padding: 2rem; /* Custom padding */
}

/* Update Container component to use variables */
.container {
    max-width: var(--container-max-width);
    padding-left: var(--container-padding);
    padding-right: var(--container-padding);
}
```

**For Spacing Changes**:

```css
/* Add spacing variables */
[data-theme="theme-name"] {
    --section-spacing: 4rem; /* Custom section spacing */
    --element-gap: 2rem; /* Custom element gaps */
}

/* Use in layouts */
.section {
    margin-bottom: var(--section-spacing);
}

.element-grid {
    gap: var(--element-gap);
}
```

**For Layout Grid Changes**:

```css
/* Grid system variables */
[data-theme="theme-name"] {
    --grid-columns: 12; /* Number of columns */
    --grid-gap: 1.5rem; /* Grid spacing */
}

/* Grid utilities */
.grid {
    display: grid;
    grid-template-columns: repeat(var(--grid-columns), 1fr);
    gap: var(--grid-gap);
}

.col-span-6 {
    grid-column: span 6;
}
```

### Step 3: Component Layout Updates

**Responsive Layout Changes**:

```tsx
// Use theme classes for responsive behavior
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
    {/* Content */}
</div>;
```

**Alignment Changes**:

```tsx
// Use flexbox with theme classes
<div className="flex items-center justify-between">
  {/* Content */}
</div>

<div className="flex flex-col items-center gap-4">
  {/* Content */}
</div>
```

### Step 4: Test Layout Changes

**1. Cross-Theme Testing**:

- Test layout changes with all themes
- Ensure variables work correctly
- Verify responsive behavior

**2. Responsive Testing**:

- Test on mobile (< 768px)
- Test on tablet (768px - 1024px)
- Test on desktop (> 1024px)

**3. Component Integration**:

- Test with all existing components
- Ensure no breaking changes
- Verify Style Editor compatibility

### Layout Modification Checklist

- [ ] Layout variables added to all theme CSS files
- [ ] Component classes updated to use new variables
- [ ] Responsive behavior tested across breakpoints
- [ ] Cross-theme compatibility verified
- [ ] No hardcoded dimensions or spacing
- [ ] Style Editor preview reflects changes
- [ ] Existing components still function correctly

---

## Content Block Addition Guide

### Overview

This guide ensures new content blocks integrate seamlessly with existing pages
and themes.

### Step 1: Define Section Type

**File**: `src/models/landing-page.ts`

**Add to Section type**:

```typescript
export interface Section {
    id: string;
    type:
        | "hero"
        | "features"
        | "location"
        | "gallery"
        | "floor_plans"
        | "testimonials"
        | "faq"
        | "contact"
        | "new-section-type";
    enabled: boolean;
    order: number;
    title?: string;
    subtitle?: string;
    content?: string;
    items?: any[]; // Flexible for different section types
    cta?: CTA;
    media?: string | string[];
}
```

### Step 2: Create Section Component

**File**: `src/sections/NewSection.tsx`

**Template**:

```tsx
import React from "react";

interface NewSectionProps {
    data: Section;
}

export function NewSection({ data }: NewSectionProps) {
    if (!data.enabled) return null;

    return (
        <section id={data.id} className="section">
            {/* Use theme classes for all styling */}
            <div className="container">
                {data.title && <h2 className="h2">{data.title}</h2>}

                {data.subtitle && <p className="body">{data.subtitle}</p>}

                {data.content && (
                    <div className="body">
                        {data.content}
                    </div>
                )}

                {data.items && data.items.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {data.items.map((item, index) => (
                            <div key={index} className="card">
                                <h3 className="h3">{item.title}</h3>
                                <p className="body">{item.description}</p>
                                {item.cta && (
                                    <button className="btn-primary">
                                        {item.cta.label}
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                )}

                {data.cta && (
                    <div className="flex justify-center mt-8">
                        <button className="btn-primary btn-lg">
                            {data.cta.label}
                        </button>
                    </div>
                )}
            </div>
        </section>
    );
}
```

### Step 3: Integrate Section Type

**File**: `src/models/landing-page.ts`

**Add section handling**:

```typescript
// Add to existing section types
export interface Section {
    type:
        | "hero"
        | "features"
        | "location"
        | "gallery"
        | "floor_plans"
        | "testimonials"
        | "faq"
        | "contact"
        | "new-section-type";
    // ... other properties
}
```

### Step 4: Update Page Component

**File**: `src/pages/LandingPage.tsx`

**Add section rendering**:

```tsx
import { NewSection } from "@/sections/NewSection";

// In the switch statement
switch (section.type) {
    case "hero":
        return <HeroSection key={section.id} data={section} />;
    case "features":
        return <FeaturesSection key={section.id} data={section} />;
    case "new-section-type":
        return <NewSection key={section.id} data={section} />;
    // ... other cases
    default:
        return null;
}
```

### Step 5: Add Theme Variables

**All Theme CSS Files**:

```css
[data-theme="theme-name"] {
    /* New section variables */
    --new-section-bg: var(--background);
    --new-section-text: var(--foreground);
    --new-section-border: var(--border);
    --new-section-card-bg: var(--card);
    --new-section-card-text: var(--card-foreground);
}

/* New section classes */
.new-section {
    background: hsl(var(--new-section-bg));
    color: hsl(var(--new-section-text));
    border-bottom: 1px solid hsl(var(--new-section-border));
}

.new-section .card {
    background: hsl(var(--new-section-card-bg));
    color: hsl(var(--new-section-card-text));
    border-radius: var(--radius);
    padding: 1.5rem;
}
```

### Content Block Addition Checklist

- [ ] Section type added to TypeScript interfaces
- [ ] Section component created with theme classes
- [ ] Page component updated to render new section
- [ ] Theme variables defined for new section
- [ ] CSS classes created in all theme files
- [ ] Mobile responsive variants included
- [ ] Section tested across all themes
- [ ] Integration verified with existing pages

---

## AI Development Guidelines

### Overview

This section provides specific guidelines for AI assistants working on this
codebase to ensure consistency and maintainability.

### Core Principles

1. **Theme Classes Only**: Never use inline styles or Tailwind utilities for
   theming
2. **Semantic HTML**: Use proper HTML5 elements with theme classes
3. **Responsive via CSS**: Handle mobile/tablet/desktop in theme CSS media
   queries
4. **TypeScript Safety**: Maintain type safety across all components
5. **Consistent Patterns**: Follow existing code patterns exactly

### Required Imports

**For Pages**:

```tsx
import React, { useEffect } from "react";
import { getPageTheme } from "@/lib/pageThemeManager";
import { applyTheme } from "@/themes/resolver";
import { Head } from "vite-react-ssg";
```

**For Components**:

```tsx
import React from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
// No theme imports - use CSS classes
```

**For Themes**:

```tsx
import type { ElementConfig, ElementMap, ThemeConfig } from "@/themes";
```

### Code Templates

**Page Component Template**:

```tsx
export function ComponentName() {
    useEffect(() => {
        const savedTheme = getPageTheme(window.location.pathname);
        if (savedTheme) {
            applyTheme(savedTheme);
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col font-sans text-foreground bg-background">
            {/* Content using theme classes only */}
        </div>
    );
}
```

**Section Component Template**:

```tsx
interface SectionProps {
    data: Section;
}

export function SectionName({ data }: SectionProps) {
    return (
        <section className="section">
            <div className="container">
                <h2 className="h2">{data.title}</h2>
                <div className="body">{data.content}</div>
            </div>
        </section>
    );
}
```

### Forbidden Practices

❌ **NEVER do this**:

- Use inline styles: `style={{ color: 'red' }}`
- Use Tailwind for theming: `className="bg-blue-600 text-white"`
- Rely on tag selectors: `<h1>` without theme class
- Skip theme detection: No useEffect for saved themes
- Hardcode colors: Use CSS variables instead

✅ **ALWAYS do this**:

- Use theme classes: `className="h1 btn-primary"`
- Include theme detection: Add useEffect hook
- Follow responsive patterns: Use theme CSS media queries
- Maintain type safety: Use proper TypeScript types
- Test integration: Verify Page Theme Manager works

### File Location Rules

**Pages**: `src/pages/[PageName].tsx` **Sections**:
`src/sections/[SectionName].tsx` **Components**:
`src/components/[Category]/[ComponentName].tsx` **Themes**:
`src/themes/index.ts` and `src/styles/[theme-name].css` **Models**:
`src/models/[ModelName].ts`

### Testing Requirements

Before completing any task:

1. **Theme Switching**: Test with all available themes
2. **Page Integration**: Verify Page Theme Manager functionality
3. **Responsive Design**: Test mobile/tablet/desktop layouts
4. **Cross-browser**: Test Safari, Chrome, Firefox
5. **Style Editor**: Verify preview matches production
6. **Type Safety**: Ensure no TypeScript errors
7. **Console Logging**: Check for theme application messages

### Quality Gates

Do not consider work complete until:

- [ ] All styled elements use theme classes
- [ ] No inline styles or hardcoded colors
- [ ] Page Theme Manager integration works
- [ ] Theme persistence functions correctly
- [ ] Mobile responsive behavior tested
- [ ] Cross-theme compatibility verified
- [ ] TypeScript compilation succeeds
- [ ] No console errors or warnings

---

## Quality Assurance Checklists

### New Page QA Checklist

**Pre-Development**:

- [ ] Page requirements clearly defined
- [ ] Content structure planned
- [ ] Theme integration requirements identified
- [ ] Responsive design requirements established

**Development**:

- [ ] Page component created with useEffect theme detection
- [ ] All styled elements use theme classes
- [ ] No inline styles or CSS variable injection
- [ ] Semantic HTML5 elements used
- [ ] Route configuration added
- [ ] SEO meta tags implemented

**Testing**:

- [ ] Theme switching works from Style Editor
- [ ] Theme persistence across page refresh
- [ ] Mobile responsive design tested
- [ ] Tablet layout tested
- [ ] Desktop layout tested
- [ ] Cross-browser compatibility verified
- [ ] Accessibility features tested

**Final Review**:

- [ ] Code follows project patterns
- [ ] TypeScript types are correct
- [ ] Performance optimization considered
- [ ] Documentation updated if needed
- [ ] Peer review completed

### New Theme QA Checklist

**Pre-Development**:

- [ ] Color palette defined
- [ ] Typography scales planned
- [ ] Component styles identified
- [ ] Responsive requirements established
- [ ] Cross-theme compatibility planned

**Development**:

- [ ] Theme configuration added to index.ts
- [ ] CSS file created with all variables
- [ ] Theme classes implemented for all elements
- [ ] Mobile responsive variants included
- [ ] Header background variables defined
- [ ] CSS imported in Style Editor
- [ ] Type definitions updated

**Testing**:

- [ ] Style Editor controls work correctly
- [ ] Live preview matches theme definition
- [ ] CSS export generates correctly
- [ ] All page types tested with theme
- [ ] Theme switching works on all pages
- [ ] Responsive behavior verified
- [ ] Cross-browser testing completed

**Final Review**:

- [ ] All theme classes consume variables
- [ ] No hardcoded values in theme CSS
- [ ] Mobile variants properly implemented
- [ ] Theme follows naming conventions
- [ ] Documentation updated

### Layout Modification QA Checklist

**Pre-Development**:

- [ ] Layout requirements clearly defined
- [ ] Impact on existing components assessed
- [ ] Responsive behavior planned
- [ ] Theme integration strategy established

**Development**:

- [ ] Layout variables added to all theme files
- [ ] Component classes updated appropriately
- [ ] Responsive breakpoints handled correctly
- [ ] Existing components maintain functionality
- [ ] No breaking changes introduced
- [ ] Backward compatibility maintained

**Testing**:

- [ ] Layout changes work with all themes
- [ ] Mobile responsive behavior tested
- [ ] Tablet layout tested
- [ ] Desktop layout tested
- [ ] Component integration verified
- [ ] Style Editor preview reflects changes
- [ ] Cross-browser compatibility checked

**Final Review**:

- [ ] Performance impact assessed
- [ ] Accessibility features maintained
- [ ] Code follows established patterns
- [ ] Documentation updated
- [ ] Team communication completed

### Content Block Addition QA Checklist

**Pre-Development**:

- [ ] Section type clearly defined
- [ ] Data structure planned
- [ ] Component requirements identified
- [ ] Theme integration needs assessed

**Development**:

- [ ] Section type added to interfaces
- [ ] Section component created with theme classes
- [ ] Page integration implemented
- [ ] Theme variables defined
- [ ] CSS classes created in all theme files
- [ ] Mobile variants included

**Testing**:

- [ ] Section renders correctly in all contexts
- [ ] Theme switching works for section
- [ ] Responsive behavior tested
- [ ] Data binding works correctly
- [ ] Integration with existing pages verified
- [ ] Cross-theme compatibility tested

**Final Review**:

- [ ] Component follows project patterns
- [ ] TypeScript types are correct
- [ ] Reusable where appropriate
- [ ] Performance considered
- [ ] Documentation updated

These checklists ensure consistent, high-quality development that maintains the
system's integrity and extensibility.

## 🔧 Development Tools & Techniques

### Component Development

- Use TypeScript for type safety
- Follow React best practices
- Implement proper error boundaries
- Use semantic HTML5 elements

### Asset Handling Guidelines

- **Always use resolveAsset()** for all images:
  `resolveAsset('/assets/filename.ext')`
- **Import processed assets** from `src/assets/` when optimization is needed
- **Never use direct paths**: Don't bypass the asset resolution system
- **Never use relative paths**: Always use resolveAsset for consistent behavior

### Asset Management Workflow

1. **Add new images** to `/public/assets/` folder
2. **Use resolveAsset()** in components for consistent path handling
3. **Test locally** to verify images load correctly
4. **Test production build** to ensure paths work on external server

### Common Image Pitfalls to Avoid

- ❌ **Relative paths**: `../assets/image.jpg` breaks in production
- ❌ **Wrong imports**: Importing from `/public/` instead of `src/`
- ❌ **Hardcoded paths**: Not using asset management system
- ❌ **Missing mapping**: Forgetting to use resolveAsset for new assets

### Image Implementation Examples

```tsx
// ✅ CORRECT: Public assets with resolveAsset
import { resolveAsset } from '@/lib/assets';

const galleryImages = [
    {
        src: resolveAsset("/assets/lvb/lvb-01-3d.jpg"),
        alt: "Description",
    },
    {
        src: resolveAsset("/assets/lvb/lvb-02-3d.jpg"),
        alt: "Description",
    },
    // ... more images
];

// ✅ CORRECT: Imported assets when processing is needed
import optimizedImage from '@/assets/golf.jpg';
<img src={optimizedImage} alt="Description" />

// ❌ WRONG: Direct absolute paths bypass asset resolution
<img src="/assets/lvb/lvb-13-3d.jpg" alt="Description" />

// ❌ WRONG: Relative paths break in production
<img src="../assets/lvb/lvb-13-3d.jpg" alt="Description" />
```

Following these guidelines ensures images work reliably in both development and
production environments.

---

## Troubleshooting & Deployment

### Theme Deployment Issues

For comprehensive troubleshooting of theme-related deployment issues, see:
**[Theme Troubleshooting Guide](./THEME_TROUBLESHOOTING.md)**

This guide covers:

- Theme falls back to default on production
- CSS variables not applying correctly
- Build validation failures
- Performance and caching issues
- Environment-specific problems

### Quick Deployment Checklist

Before deploying theme-related changes:

1. **Run Full Validation**:
   ```bash
   npm run lint
   npm run spec
   npm run validate-themes
   ```

2. **Test Build Process**:
   ```bash
   npm run build
   # Should show: 🎉 [ThemeValidator] All theme validations passed!
   ```

3. **Verify Theme Assets**:
   - Check `dist/assets/app-[hash].css` contains all themes
   - Confirm HTML files reference CSS correctly
   - Test all theme URLs in development

4. **Test Theme Functionality**:
   - Theme switching works in Style Editor
   - Page Theme Manager applies themes correctly
   - localStorage persistence functions
   - All themes work across different pages

### Common Deployment Fixes

**CSS Not Loading on Server:**

- Verify `vite.config.ts` `base` path matches server structure
- Check server serves CSS files with correct MIME types
- Ensure no path rewriting rules interfere with asset loading

**Theme Falls Back to Default:**

- Confirm ThemeProvider wraps route components
- Check console for theme resolution logs
- Verify theme CSS selectors are present in build output

**Performance Issues:**

- Check CSS bundle size (should be ~68KB gzipped)
- Verify theme switching is instant (no network requests)
- Ensure proper caching headers for CSS files

For detailed debugging steps and advanced troubleshooting, refer to the
[Theme Troubleshooting Guide](./THEME_TROUBLESHOOTING.md).
