# System Architecture Documentation

## Overview

This document provides a complete map of the landing page system architecture,
including all connections, dependencies, and data flow between components.

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    LANDING PAGE SYSTEM ARCHITECTURE                      │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   ROUTING      │    │   THEMING      │    │   CONTENT       │
│                 │    │                 │    │                 │
│ routes.tsx      │    │ themes/index.ts  │    │ developments/    │
│ ├─ Home (/)    │    │ ├─ golf         │    │ sunny-hills.json│
│ ├─ Pages        │    │ ├─ golf-elegant │    │ costa-blanca.json│
│ ├─ Dynamic      │    │ └─ midnight     │    │                 │
│ └─ Style Editor │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     PAGES      │    │   COMPONENTS    │    │     DATA        │
│                 │    │                 │    │                 │
│ LandingPage.tsx │    │ layout/         │    │ pageThemeManager│
│ GolfProperties  │    │ ├─ Navbar.tsx   │    │ content.ts      │
│                 │    │ ├─ Footer.tsx   │    │ assets.ts       │
│                 │    │ └─ Language...   │    │                 │
└─────────────────┘    │ ui/             │    └─────────────────┘
         │              │ ├─ button.tsx    │              │
         │              │ ├─ container.tsx │              │
         │              │ ├─ section.tsx   │              │
         │              │ └─ Gallery.tsx   │              │
         │              └─────────────────┘              │
         │                       │                       │
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│     SECTIONS    │    │     STYLES      │    │  STYLE EDITOR  │
│                 │    │                 │    │                 │
│ Hero.tsx        │    │ styles/         │    │ StyleEditor.tsx │
│ Features.tsx     │    │ ├─ golf-theme.css│    │ index.tsx       │
│ Contact.tsx       │    │ ├─ golf-elegant │    │                 │
│                 │    │ └─ midnight.css │    └─────────────────┘
└─────────────────┘    │                 │              │
         │              │                 │              │
         │              │ themes/          │              │
         │              │ ├─ resolver.ts    │              │
         │              │ ├─ ThemeProvider  │              │
         │              │ └─ types.ts       │              │
         │              └─────────────────┘              │
         │                       │                       │
         │                       │                       │
         │              ┌─────────────────┐              │
         │              │   MODELS        │              │
         │              │                 │              │
         │              │ landing-page.ts  │              │
         │              └─────────────────┘              │
         │                       │                       │
         └─────────────────────┼───────────────────────┘
                                 │
                                 ▼
┌─────────────────────────────────────────┐
│           USER INTERFACE            │
│                                   │
│ ┌─────────────┐ ┌─────────────┐ │
│   Mobile     │ │   Desktop    │ │
│   (< 768px) │ │   (≥ 768px) │ │
│             │ │             │ │
│ Mobile Menu │ │ Full Nav    │ │
│ Hamburgers  │ │ Header       │ │
│ Stacked     │ │ Horizontal    │ │
│ Layout      │ │ Layout       │ │
└─────────────┘ └─────────────┘ │
└─────────────────────────────────────────┘
```

## Data Flow Architecture

### 1. Theme Application Flow

```
Page Load → Check localStorage → Apply saved theme → Render with theme classes
     │              │                    │                   │
     │              │                    │                   ▼
     │              │                    │            ┌─────────────────┐
     │              │                    │            │ Theme CSS      │
     │              │                    │            │ Variables      │
     │              │                    │            │ Applied        │
     │              │                    │            └─────────────────┘
     ▼              ▼                    ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────────┐
│ Routes.tsx │ │pageTheme   │ │  ThemeProvider  │
│            │ │Manager.ts   │ │   .tsx         │
└─────────────┘ └─────────────┘ └─────────────────┘
```

### 2. Content Rendering Flow

```
JSON Data → Content Parser → Section Components → Theme Classes → Rendered Page
    │            │               │               │              │
    │            │               │               │              ▼
    │            │               │               │    ┌─────────────────┐
    │            │               │               │    │   Component     │
    │            │               │               │    │ Rendering      │
    │            │               │               │    │ with Theme     │
    │            │               │               │    │ Classes        │
    ▼            ▼               ▼               │    └─────────────────┘
┌─────────┐ ┌─────────┐ ┌─────────────────┐ │
│Content  │ │ Sections │ │   UI Components │ │
│Files    │ │ .tsx    │ │     .tsx        │ │
│(JSON)   │ │         │ │                 │ │
└─────────┘ └─────────┘ └─────────────────┘ │
```

### 3. Style Editor Integration Flow

```
Style Editor → Theme Variables → CSS Generation → Theme Files → Page Updates
     │              │                │               │
     │              │                │               │
     │              │                │               ▼
     │              │                │        ┌─────────────────┐
     │              │                │        │  Theme CSS      │
     │              │                │        │  Files         │
     │              │                │        │  Updated       │
     ▼              ▼                ▼        └─────────────────┘
┌─────────────┐ ┌─────────────┐ ┌─────────────────┐
│   Style    │ │ Theme      │ │  Page          │
│   Editor   │ │ Variables  │ │  Components     │
│  Component │ │  Object    │ │  React to       │
└─────────────┘ └─────────────┘ │  Theme CSS     │
                              └─────────────────┘
```

## File Dependencies Map

### Core System Files

#### `src/routes.tsx`

**Purpose**: Route configuration and navigation **Dependencies**:

- `@/pages/LandingPage`
- `@/pages/GolfProperties`
- `@/style-editor`
- `@/lib/content`
- `@/components/DynamicPageNavigation`
- `@/themes/ThemeProvider` **Responsibilities**:
- Define application routes
- Wrap pages with ThemeProvider for fixed themes
- Handle dynamic development routes
- Provide root layout with navigation

#### `src/themes/index.ts`

**Purpose**: Theme definitions and exports **Dependencies**: None (core file)
**Exports**:

- `ThemeConfig`, `ElementConfig`, `ElementMap` types
- `themes` object with all theme definitions
- `resolveTheme`, `applyTheme` from resolver **Theme Structure**:

```typescript
{
  id: string;
  name: string;
  colors: { [key: string]: string };  // CSS variables
  baseTypo: { fontSize: string; fontFamily: string };
  elementStyles: {
    h1, h2, h3, body, small, caption,
    btn-primary, btn-secondary, btn-outline, btn-ghost,
    link-std, link-bold,
    site-title, mobile-menu-btn, mobile-menu-links,
    navbar
  };
}
```

#### `src/themes/resolver.ts`

**Purpose**: Theme switching and CSS application **Dependencies**:
`@/themes/types` **Functions**:

- `resolveTheme(themeId)`: Get theme config by ID
- `applyTheme(themeId)`: Apply theme to DOM

#### `src/lib/pageThemeManager.ts`

**Purpose**: Page-specific theme assignment and persistence **Dependencies**:
Browser localStorage **Functions**:

- `getPageTheme(path)`: Retrieve saved theme for page
- `setPageTheme(path, themeId)`: Save theme for page
- `clearPageTheme(path)`: Clear saved theme

### Component Dependencies

#### `src/pages/LandingPage.tsx`

**Purpose**: Generic landing page renderer **Dependencies**:

- `@/models/landing-page`
- `@/components/layout/Navbar`
- `@/components/layout/Footer`
- `@/sections/*` (Hero, Features, Contact)
- `@/lib/pageThemeManager`
- `@/themes/resolver` **Responsibilities**:
- Apply saved theme on mount
- Render sections dynamically based on data
- Handle SEO meta tags

#### `src/pages/GolfProperties.tsx`

**Purpose**: Specific golf properties page **Dependencies**:

- `@/lib/pageThemeManager`
- `@/themes/resolver`
- Custom components and sections **Responsibilities**:
- Apply saved theme on mount
- Custom layout for golf properties
- Theme-aware rendering

#### `src/components/layout/Navbar.tsx`

**Purpose**: Navigation component **Dependencies**:

- `@/components/ui/container`
- `@/components/ui/button`
- `@/models/landing-page`
- Theme classes (navbar, site-title, nav-link, mobile-menu-links)
  **Responsibilities**:
- Responsive navigation (desktop/mobile)
- Language switching
- Theme-aware styling

### Theme System Dependencies

#### Theme CSS Files (`src/styles/*.css`)

**Purpose**: CSS variable definitions and theme classes **Structure**:

```css
[data-theme="theme-name"] {
    /* CSS Variables */
    --primary: #10b981;
    --h1-size: 3.75rem;
    --btn-primary-bg: var(--primary);
    /* ... all variables */
}

/* Theme Classes */
.h1 {
    font-size: var(--h1-size);
}
.btn-primary {
    background: hsl(var(--btn-primary-bg));
}
/* ... all classes */
```

#### Style Editor (`src/style-editor/`)

**Purpose**: Theme customization interface **Dependencies**:

- `@/themes/index` (theme configs)
- All theme CSS files (imports) **Responsibilities**:
- Real-time theme editing
- CSS variable manipulation
- Theme export functionality

## Responsive Design Architecture

### Breakpoint System

```css
/* Mobile: < 768px */
@media (max-width: 768px) {
    .h1 {
        font-size: var(--h1-mobile-size);
    }
    .btn-primary {
        padding: var(--btn-primary-mobile-py) var(--btn-primary-mobile-px);
    }
    /* ... mobile variants */
}

/* Desktop: ≥ 768px */
/* Base styles apply, no media query needed */
```

### Component Responsive Patterns

- **Navbar**: Horizontal (desktop) → Hamburger menu (mobile)
- **Sections**: Multi-column (desktop) → Single column (mobile)
- **Typography**: Smaller sizes (mobile) → Full sizes (desktop)
- **Buttons**: Reduced padding (mobile) → Full padding (desktop)

## State Management

### Theme State

- **Global**: `data-theme` attribute on `<html>`
- **Page-specific**: localStorage with path-based keys
- **Editor**: React state in StyleEditor component

### Navigation State

- **Menu toggle**: `useState` in Navbar component
- **Route-based**: React Router location

## Integration Points

### 1. Adding New Pages

```
1. Create page component in src/pages/
2. Add useEffect for theme detection
3. Use theme classes throughout
4. Add route in src/routes.tsx
5. Test with PageThemeManager
```

### 2. Adding New Themes

```
1. Create theme config in src/themes/index.ts
2. Create theme CSS file in src/styles/
3. Import CSS in src/style-editor/index.tsx
4. Test all page types
```

### 3. Adding New Sections

```
1. Create section component in src/sections/
2. Add section type to src/models/landing-page.ts
3. Update LandingPage switch statement
4. Use theme classes for styling
```

## Quality Assurance Flow

### Theme Testing

1. **Style Editor**: Test all controls and live preview
2. **Page Integration**: Test theme switching on all pages
3. **Persistence**: Test localStorage save/load
4. **Responsive**: Test mobile/desktop variants
5. **Cross-browser**: Test Safari, Chrome, Firefox

### Component Testing

1. **Theme Classes**: Verify all elements use theme classes
2. **Responsive**: Test mobile/desktop layouts
3. **Accessibility**: Verify semantic HTML and ARIA
4. **Functionality**: Test all interactive elements
5. **Cross-theme**: Test with all available themes

This architecture ensures maintainability, scalability, and consistency across
the entire system.
