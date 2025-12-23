# Styling Specification

## System Overview

This document provides complete styling guidelines for the landing page system.
For detailed architecture documentation, see `SYSTEM_ARCHITECTURE.md`.

## Theme System Architecture

### CSS Variables Structure

The theme system uses CSS custom properties (variables) defined in
theme-specific selectors. Each theme file uses `[data-theme="theme-name"]`
selector for reliable theme switching.

### Page Theme Manager System

The Page Theme Manager allows assigning specific themes to individual pages and
persists these assignments across sessions.

#### Core Components

- `pageThemeManager.ts` - Theme assignment and persistence
- `PageThemeSelector.tsx` - UI for theme management
- Integration with existing resolver.ts for theme switching

#### Theme Assignment Methods

1. **Immediate Application**: Apply theme to current page (instant visual
   feedback)
2. **Deferred Application**: Assign theme to different page (applied on
   navigation)
3. **Persistence**: Themes saved to localStorage, survive page refresh

#### Theme Application Flow

1. **Page Load**: Check localStorage for saved theme using `getPageTheme(path)`
2. **Apply If Found**: Use `applyTheme(themeId)` for instant switching
3. **Fallback**: Use default/route theme if no saved theme exists

#### Color Variables

- `--primary`: Main brand color (HSL format)
- `--primary-foreground`: Text color for primary elements
- `--secondary`: Secondary brand color
- `--secondary-foreground`: Text color for secondary elements
- `--background`: Main background color
- `--foreground`: Main text color
- Additional semantic colors (muted, accent, border, etc.)

#### Typography Variables

- `--h1-size`, `--h1-weight`, `--h1-line-height`, `--h1-letter-spacing`
- `--h2-size`, `--h2-weight`, `--h2-line-height`, `--h2-letter-spacing`
- `--h3-size`, `--h3-weight`, `--h3-line-height`, `--h3-letter-spacing`
- `--body-size`, `--body-weight`, `--body-line-height`, `--body-letter-spacing`
- `--small-size`, `--small-weight`, `--small-line-height`,
  `--small-letter-spacing`
- `--caption-size`, `--caption-weight`, `--caption-line-height`,
  `--caption-letter-spacing`

#### Button Variables

- `--btn-primary-bg`, `--btn-primary-text`, `--btn-primary-radius`
- `--btn-primary-hover-bg`, `--btn-primary-hover-text`
- `--btn-primary-active-bg`, `--btn-primary-active-text`
- Similar patterns for secondary, outline, ghost variants

#### Link Variables

- `--link-std-text`, `--link-std-weight`, `--link-std-under`
- `--link-bold-text`, `--link-bold-weight`, `--link-bold-under`
- Hover and active state variables

#### Navigation Variables

- `--site-title-size`, `--site-title-weight`, `--site-title-line-height`
- `--mobile-menu-btn-size`, `--mobile-menu-btn-weight`
- `--mobile-menu-links-size`, `--mobile-menu-links-weight`

### Mobile Responsive Variables

Mobile-specific variables use pattern:

- `--h1-mobile-size`, `--h1-mobile-line-height`
- `--btn-primary-mobile-px`, `--btn-primary-mobile-py`
- etc.

### Theme Class Definitions

**CRITICAL**: Every theme MUST define CSS classes that consume the variables:

```css
[data-theme="theme-name"] {
    /* CSS variables defined here */
}

/* Theme Classes - These consume the CSS variables */
.h1 {
    font-size: var(--h1-size);
    font-weight: var(--h1-weight);
    line-height: var(--h1-line-height);
    letter-spacing: var(--h1-letter-spacing);
    color: hsl(var(--h1-color));
}

.btn-primary {
    background: hsl(var(--btn-primary-bg));
    color: hsl(var(--btn-primary-text));
    /* ... other properties */
}
```

## Usage in Components

### NON-NEGOTIABLE: Theme Classes Required

**ALL styled elements MUST use explicit theme classes - NEVER rely on tag
selectors alone.**

### Typography Elements

```tsx
// ✅ GOOD: Uses explicit theme class
<h1 className="h1">Headline</h1>
<h2 className="h2">Headline</h2>
<h3 className="h3">Headline</h3>
<p className="body">Body text</p>
<small className="small">Small text</small>
<div className="caption">Caption text</div>

// ❌ BAD: Relies on tag selectors only
<h1>Headline</h1>
<p>Body text</p>
<small>Small text</small>
```

### Button Elements

```tsx
// ✅ GOOD: Uses theme classes
<button className="btn-primary">Primary Button</button>
<button className="btn-secondary">Secondary Button</button>
<button className="btn-outline">Outline Button</button>
<button className="btn-ghost">Ghost Button</button>

// ❌ BAD: Uses Tailwind utilities instead of theme classes
<button className="bg-blue-600 text-white px-4 py-2">Primary Button</button>
```

### Link Elements

```tsx
// ✅ GOOD: Uses theme classes
<a href="#" className="link-std">Standard Link</a>
<a href="#" className="link-bold">Bold Link</a>

// ❌ BAD: Uses inline styles or utility classes
<a href="#" className="text-blue-600 underline">Link</a>
```

### Navigation Elements

```tsx
// ✅ GOOD: Uses theme classes
<h1 className="site-title">Site Title</h1>
<nav className="mobile-menu-links">Mobile Menu</nav>
<button className="mobile-menu-btn">Menu Button</button>

// ❌ BAD: No theme classes
<h1>Site Title</h1>
<nav>Mobile Menu</nav>
```

## Theme Switching

### Reliable Theme Loading

Themes are switched using data-theme attribute:

```tsx
// Set theme attribute on HTML element
document.documentElement.setAttribute("data-theme", "golf");
```

### Theme CSS Import Pattern

```tsx
// Import all theme CSS files in style-editor/index.tsx
import "../styles/golf-theme.css";
import "../styles/another-theme.css"; // Future themes

// Theme CSS files use [data-theme="theme-name"] selector
```

## Implementation Rules

### 1. Theme Classes Are Mandatory

- **Preview elements**: MUST use theme classes (`.h1`, `.btn-primary`, etc.)
- **Production pages**: MUST use theme classes for all themed elements
- **Dialog previews**: MUST use theme classes, not hardcoded styles
- **NO exceptions**: Tag-only styling is forbidden

### 2. No Preview Hacks

- **NO mobile preview classes**: Mobile variants handled in theme CSS media
  queries
- **NO inline color overrides**: Let theme CSS handle all colors
- **NO conditional styling based on preview mode**: Theme CSS handles responsive
  behavior

### 3. CSS Variable Format

- **Colors**: HSL format for Tailwind compatibility: `160 84% 39%`
- **Consumption**: Use `hsl(var(--variable-name))` in theme classes
- **Fallbacks**: Always provide default values in theme CSS

### 4. Theme File Structure

```css
/* theme-name.css */
[data-theme="theme-name"] {
    /* All CSS variables defined here */
}

/* Theme Classes - These consume the variables */
.h1 {
    /* consume --h1-* variables */
}
.h2 {
    /* consume --h2-* variables */
}
.btn-primary {
    /* consume --btn-primary-* variables */
}
/* ... all other theme classes */

/* Responsive Mobile Variants */
@media (max-width: 768px) {
    .h1 {
        /* consume --h1-mobile-* variables */
    }
    .btn-primary {
        /* consume --btn-primary-mobile-* variables */
    }
}
```

### 5. Style Editor Guidelines

- **UI Isolation**: Editor UI styles must not affect preview content
- **Preview Accuracy**: Preview must render exactly what theme defines
- **Live Updates**: CSS variable changes must reflect immediately
- **No Tag Selectors**: Preview elements use theme classes exclusively

## Page Component Integration

### Pattern 1: Custom Pages (e.g., GolfProperties.tsx)

Custom pages with their own implementations should include theme detection:

```tsx
import React, { useEffect } from "react";
import { getPageTheme } from "@/lib/pageThemeManager";
import { applyTheme } from "@/themes/resolver";

export function CustomPage() {
    // Apply saved theme on page load
    useEffect(() => {
        const currentPath = window.location.pathname;
        const savedTheme = getPageTheme(currentPath);

        if (savedTheme) {
            console.log(
                `🎨 Applying saved theme "${savedTheme}" to Custom page`,
            );
            applyTheme(savedTheme);
        }
    }, []);

    return (
        <div className="min-h-screen flex flex-col font-sans text-foreground bg-background">
            {/* Page content using theme classes */}
        </div>
    );
}
```

### Pattern 2: Landing Pages (LandingPage.tsx)

Landing pages that use a generic component should follow this pattern:

```tsx
import React, { useEffect } from "react";
import { getPageTheme } from "@/lib/pageThemeManager";
import { applyTheme } from "@/themes/resolver";

interface LandingPageProps {
    data: LandingPageData;
}

export function LandingPage({ data }: LandingPageProps) {
    // Apply saved theme on page load
    useEffect(() => {
        const currentPath = window.location.pathname;
        const savedTheme = getPageTheme(currentPath);

        if (savedTheme) {
            console.log(
                `🎨 Applying saved theme "${savedTheme}" to Landing page`,
            );
            applyTheme(savedTheme);
        }
    }, []);

    // NO inline styles - remove CSS variable injection
    // Use theme CSS classes throughout
    return (
        <div className="min-h-screen flex flex-col font-sans text-foreground bg-background">
            {/* Page content */}
        </div>
    );
}
```

### Pattern 3: Route-based Themes (Fixed Theme Pages)

Pages with predefined themes should use ThemeProvider:

```tsx
import { ThemeProvider } from '@/themes/ThemeProvider';
import { CustomPage } from './CustomPage';

export default function FixedThemePage() {
  return (
    <ThemeProvider routeTheme="golf-elegant">
      <CustomPage />
    </ThemeProvider>
  );
}


```

### Pattern 4: Header/Navigation Components

Header components should use theme classes for complete theme integration:

```tsx
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar({ data }: NavbarProps) {
    return (
        <nav className="navbar">
            <Container className="navbar-container">
                <Link className="site-title">
                    {data.name}
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    {data.sections.map((section) => (
                        <a
                            key={section.id}
                            href={`#${section.id}`}
                            className="nav-link"
                        >
                            {section.title}
                        </a>
                    ))}
                    <Button asChild>
                        <a href={contactCta.href}>{contactCta.label}</a>
                    </Button>
                </div>

                {/* Mobile Toggle */}
                <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                </Button>
            </Container>

            {/* Mobile Menu */}
            <div className="mobile-menu md:hidden border-t p-4 space-y-4">
                {data.sections.map((section) => (
                    <a
                        key={section.id}
                        href={`#${section.id}`}
                        className="mobile-menu-links block"
                    >
                        {section.title}
                    </a>
                ))}
            </div>
        </nav>
    );
}
```

#### Header Theme Classes Required:

- **`navbar`**: Main navigation container with blur/background
- **`navbar-container`**: Inner container with proper height and flex layout
- **`site-title`**: Logo/site name with theme typography
- **`nav-link`**: Desktop navigation links with hover states
- **`mobile-menu`**: Mobile menu container with theme background
- **`mobile-menu-links`**: Mobile navigation links with theme typography

### Page Integration Checklist

**For ALL new pages, ensure:**

- [ ] Import pageThemeManager and resolver
- [ ] Add useEffect theme detection hook
- [ ] Use theme CSS classes for all styling
- [ ] Remove inline CSS variable injection
- [ ] Test with Page Theme Manager
- [ ] Verify theme persistence across navigation
- [ ] Test theme switching works correctly
- [ ] Test header theme switching on navigation

## File Structure

```
src/
├── styles/
│   ├── golf-theme.css       # Theme-specific CSS with classes
│   └── [other-theme].css   # Future themes
├── style-editor/
│   ├── index.tsx            # Imports all theme CSS files
│   └── StyleEditor.tsx      # Main style editor component
├── lib/
│   └── pageThemeManager.ts   # Page theme assignment & persistence
├── themes/
│   ├── resolver.ts          # Theme switching logic
│   └── ThemeProvider.tsx   # Route-based theme provider
└── pages/
    └── *.tsx               # Production pages using theme classes
```

## Best Practices

### 1. Theme Development

- Define ALL theme classes that consume variables
- Use semantic class names matching element style keys
- Include hover/active states for interactive elements
- Provide mobile variants in media queries
- Test theme switching works reliably

### 2. Component Development

- ALWAYS use theme classes for themed elements
- NEVER mix Tailwind utilities with theme classes for styling
- NEVER rely on tag selectors for theme styling
- Use semantic HTML elements with theme classes
- Ensure responsive behavior comes from theme CSS

### 3. Style Editor Development

- Preview elements must use theme classes exclusively
- No preview-specific hacks that bypass theme CSS
- UI styles must be isolated from preview content
- Mobile preview handled by theme CSS media queries
- Live preview must match production rendering

### 4. Theme Switching

- Use data-theme attribute for reliable switching
- Import all theme CSS files at build time
- No dynamic file loading at runtime
- Theme CSS should be bundled, not loaded via filesystem paths

## Development Guidelines

### New Page Development Workflow

When creating a new page, follow this exact workflow:

1. **Create Page Component**
   ```tsx
   import React, { useEffect } from "react";
   import { getPageTheme } from "@/lib/pageThemeManager";
   import { applyTheme } from "@/themes/resolver";

   export function NewPage() {
       useEffect(() => {
           const currentPath = window.location.pathname;
           const savedTheme = getPageTheme(currentPath);

           if (savedTheme) {
               console.log(
                   `🎨 Applying saved theme "${savedTheme}" to NewPage`,
               );
               applyTheme(savedTheme);
           }
       }, []);

       return (
           <div className="min-h-screen flex flex-col font-sans text-foreground bg-background">
               {/* Page content using theme classes */}
           </div>
       );
   }
   ```

2. **Use Theme CSS Classes Exclusively**
   - Typography: `h1`, `h2`, `h3`, `body`, `small`, `caption`
   - Buttons: `btn-primary`, `btn-secondary`, `btn-outline`, `btn-ghost`
   - Colors: `text-primary`, `text-muted-foreground`, `bg-primary`, `bg-muted`
   - Layout: `bg-background`, `text-foreground`, `border-border`

3. **Test Page Theme Manager Integration**
   - Navigate to Style Editor → Page Theme Manager
   - Select your new page and apply different themes
   - Verify immediate theme switching on current page
   - Verify deferred theme application when navigating

4. **Test Theme Persistence**
   - Apply a theme to your page
   - Refresh the page
   - Verify theme persists and is applied correctly

### Component Development Rules

**ALWAYS follow these rules:**

- [ ] **Theme Classes Only**: Never use Tailwind utilities for styling
- [ ] **No Inline Styles**: Remove all style attributes and CSS injection
- [ ] **Semantic HTML**: Use proper tags with theme classes
- [ ] **Theme Detection**: Include useEffect hook for saved themes
- [ ] **Test Integration**: Verify Page Theme Manager works
- [ ] **Responsive Design**: Use theme CSS media queries, not Tailwind
      responsive

### Theme Development Rules

**For creating new themes:**

- [ ] **Complete Variable Set**: Define all required CSS variables
- [ ] **Theme Classes**: Create classes for all UI elements
- [ ] **Mobile Variants**: Include responsive design in media queries
- [ ] **Cross-Theme Testing**: Test with all page types
- [ ] **Consistent Naming**: Use semantic class names

### Quality Assurance Checklist

**Before merging new pages:**

- [ ] Page responds to theme changes instantly
- [ ] Page Theme Manager can assign themes to page
- [ ] Theme persists across page refresh
- [ ] No inline styles or hardcoded colors
- [ ] Mobile design works via theme CSS
- [ ] Console logs show theme application
- [ ] Style Editor preview matches page appearance

## Troubleshooting Guide

### Common Issues and Solutions

#### Issue: Theme Not Applying to Page

**Symptoms**: Page shows default theme regardless of Page Theme Manager
assignment **Causes**:

- Missing useEffect hook for theme detection
- Not importing pageThemeManager/resolver
- Using inline styles that override theme CSS

**Solutions**:

```tsx
// Add this to your page component
useEffect(() => {
    const savedTheme = getPageTheme(window.location.pathname);
    if (savedTheme) applyTheme(savedTheme);
}, []);
```

#### Issue: Theme Classes Not Working

**Symptoms**: Elements show default browser styling **Causes**:

- Missing theme CSS class names
- Using tag selectors instead of theme classes
- Theme CSS not importing correctly

**Solutions**:

```tsx
// ✅ GOOD: Use theme classes
<h1 className="h1">Title</h1>
<button className="btn-primary">Button</button>

// ❌ BAD: Missing theme classes
<h1>Title</h1>
<button className="bg-blue-600">Button</button>
```

#### Issue: Page Theme Manager Not Finding Page

**Symptoms**: Page doesn't appear in Page Theme Manager dropdown **Causes**:

- Page not included in route configuration
- Incorrect path detection in pageThemeManager
- Route configuration errors

**Solutions**:

1. Verify page is in routes.tsx
2. Check pageManager route extraction logic
3. Test page path detection

#### Issue: Theme Changes Not Persisting

**Symptoms**: Theme reverts to default after refresh **Causes**:

- localStorage quota exceeded
- Theme assignment not saved correctly
- Page load timing issues

**Solutions**:

1. Clear browser localStorage and test again
2. Check browser console for errors
3. Verify theme assignment saved correctly

### Testing Procedures

#### Manual Testing Workflow

1. **Test Theme Switching**:
   - Navigate to page
   - Open Style Editor → Page Theme Manager
   - Apply different themes
   - Verify immediate visual changes

2. **Test Theme Persistence**:
   - Apply theme to page
   - Refresh browser (F5)
   - Verify theme remains applied

3. **Test Cross-Page Navigation**:
   - Apply theme to Page A
   - Navigate to Page B
   - Return to Page A
   - Verify theme persists

4. **Test Mobile Responsiveness**:
   - Apply different themes
   - Test on mobile viewport
   - Verify responsive design works

## Critical Rules Summary

1. **Theme Classes Are Not Optional**: All themed elements MUST use explicit
   theme classes
2. **No Tag Selectors**: Never rely on `<h1>`, `<button>` tags alone for styling
3. **No Preview Hacks**: Mobile variants and responsive behavior in theme CSS
   only
4. **Reliable Loading**: Use data-theme attribute switching, not dynamic CSS
   loading
5. **UI Isolation**: Editor styles must not pollute preview content
6. **Exact CSS Matching**: Preview must render exactly what theme CSS defines
7. **Page Integration**: All pages must implement theme detection and
   persistence
8. **No Inline Styles**: Remove CSS variable injection and style attributes

These rules ensure themes are truly swappable, system remains consistent and
maintainable, and all future developments follow the same patterns.

## 11. 🖼️ Asset Handling Guidelines

### Critical: Use resolveAsset for All Images

**PROBLEM**: Images work in localhost but break on external server due to
incorrect path handling.

**SOLUTION**: Always use the `resolveAsset()` function for all image paths.

### Asset Resolution System

The `resolveAsset()` function in `src/lib/assets.ts` is the **single source of
truth** for all asset paths. It automatically handles development vs production
environments.

```tsx
import { resolveAsset } from "@/lib/assets";
```

### Asset Location Strategy

#### Public Assets (/public/assets/)

All public assets must use `resolveAsset()`:

```tsx
// ✅ CORRECT: Use resolveAsset for all public assets
<img src={resolveAsset('/assets/lvb/lvb-13-3d.jpg')} alt="Description" />

// ❌ WRONG: Direct absolute paths (breaks in production)
<img src="/assets/lvb/lvb-13-3d.jpg" alt="Description" />

// ❌ WRONG: Relative paths (breaks in production)
<img src="../assets/lvb/lvb-13-3d.jpg" alt="Description" />
```

#### Imported Assets (src/assets/)

Images that need processing should be imported:

```tsx
// ✅ CORRECT: Import for processed assets
import heroImage from '@/assets/golf.jpg';
<img src={heroImage} alt="Description" />

// ❌ WRONG: Direct reference to src assets
<img src={resolveAsset('/assets/golf.jpg')} alt="Description" />
```

### resolveAsset Function Behavior

The `resolveAsset()` function automatically:

- **Adds base path**: `/` in development, `/newbuilds/` in production
- **Validates paths**: Warns if path doesn't start with `/`
- **Prevents double slashes**: Handles path joining correctly

```typescript
// Function signature
export function resolveAsset(pathFromPublic: string): string;
```

### Component Implementation Patterns

#### Gallery Components

```tsx
import { resolveAsset } from "@/lib/assets";

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
```

#### Page Components

```tsx
import { resolveAsset } from "@/lib/assets";

export function PageComponent() {
    return (
        <div>
            {/* All images must use resolveAsset */}
            <img
                src={resolveAsset("/assets/golf.jpg")}
                alt="Hero"
            />
            <img
                src={resolveAsset("/assets/lvb/content-image.jpg")}
                alt="Content"
            />
        </div>
    );
}
```

### Development vs Production Behavior

#### Development (localhost:5173)

- `resolveAsset('/assets/lvb/lvb-13-3d.jpg')` →
  `http://localhost:5173/assets/lvb/lvb-13-3d.jpg`
- Base path is `/`

#### Production (external server)

- `resolveAsset('/assets/lvb/lvb-13-3d.jpg')` →
  `https://yoursite.com/newbuilds/assets/lvb/lvb-13-3d.jpg`
- Base path is `/newbuilds/` (configured in vite.config.ts)

### Asset Path Rules

#### 1. Always Use resolveAsset for Public Assets

```tsx
// ✅ CORRECT: Single source of truth
<img src={resolveAsset('/assets/lvb/lvb-13-3d.jpg')} alt="Description" />

// ❌ WRONG: Bypasses asset resolution system
<img src="/assets/lvb/lvb-13-3d.jpg" alt="Description" />
```

#### 2. Import Assets That Need Processing

```tsx
// ✅ CORRECT: For optimized/processed images
import optimizedImage from '@/assets/image.jpg';
<img src={optimizedImage} alt="Description" />

// ❌ WRONG: Won't be processed by Vite
<img src={resolveAsset('/assets/image.jpg')} alt="Description" />
```

#### 3. Never Use Relative Paths

```tsx
// ❌ WRONG: Breaks in production
<img src="../assets/lvb/lvb-13-3d.jpg" alt="Description" />

// ✅ CORRECT: Use resolveAsset
<img src={resolveAsset('/assets/lvb/lvb-13-3d.jpg')} alt="Description" />
```

### Quality Assurance Checklist

**For all new image implementations:**

- [ ] **Always use resolveAsset()** for public assets
- [ ] **Import processing assets** from `src/assets/` when needed
- [ ] **Never use direct paths** like `src="/assets/filename.ext"`
- [ ] **Never use relative paths** like `../assets/filename.ext`
- [ ] **Test in development** to verify images load correctly
- [ ] **Test production build** to verify paths work on external server

### Troubleshooting Image Issues

#### Issue: Images Work Locally, Break in Production

**Cause**: Not using `resolveAsset()` function

**Solution**: Convert all image paths to use `resolveAsset()`

```tsx
// ❌ PROBLEM: Direct path
<img src="/assets/lvb/lvb-13-3d.jpg" alt="Description" />

// ✅ SOLUTION: Use resolveAsset
<img src={resolveAsset('/assets/lvb/lvb-13-3d.jpg')} alt="Description" />
```

#### Issue: Images Not Found After Build

**Cause**: Incorrect asset location or path

**Solution**: Verify asset location and use `resolveAsset()`

1. Check file exists in `/public/assets/`
2. Use `resolveAsset('/assets/filename.ext')` in component
3. Test production build

#### Issue: Build Errors for Imported Assets

**Cause**: Importing public assets instead of src assets

**Solution**: Move assets to correct location

```tsx
// ❌ WRONG: Importing from public
import image from "/public/assets/image.jpg";

// ✅ CORRECT: Import from src
import image from "@/assets/image.jpg";
```

### File Structure for Images

```
public/
├── assets/
│   ├── golf.jpg                 # Public images (use resolveAsset)
│   └── lvb/
│       ├── lvb-01-3d.jpg       # Public images (use resolveAsset)
│       ├── lvb-02-3d.jpg
│       ├── lvb-13-3d.jpg
│       └── ...other LVB images

src/
├── assets/
│   └── golf.jpg                 # Imported version (use import)
└── lib/
    └── assets.ts                # resolveAsset function
```

### Summary

1. **Always use resolveAsset()** for public assets:
   `resolveAsset('/assets/filename.ext')`
2. **Import processing assets** from `src/assets/` when optimization is needed
3. **Never use direct paths**: Don't bypass the asset resolution system
4. **Never use relative paths**: Always use resolveAsset for consistent behavior
5. **Test production builds**: Verify external server compatibility

Following these guidelines ensures images work reliably in both development and
production environments.
