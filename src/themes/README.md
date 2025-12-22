# Universal Page Theming System

## Overview

This theming system provides a simple, scalable way to apply themes to any page
in the application with minimal configuration. It follows the Spec Kit
guidelines and ensures all pages automatically inherit themes without code
duplication.

## Architecture

### Core Components

- **Theme Registry** (`src/themes/index.ts`): Central repository of all
  available themes
- **Theme Resolver** (`src/themes/resolver.ts`): Logic for determining which
  theme to apply
- **Theme Provider** (`src/themes/ThemeProvider.tsx`): React component that
  applies themes at runtime
- **Theme Types** (`src/themes/types.ts`): TypeScript definitions for theme
  configuration

### Theme Structure

Each theme consists of:

- **Colors**: HSL values for semantic color tokens
- **Typography**: Font sizes, weights, line heights, letter spacing
- **Element Styles**: Configuration for buttons, links, navigation elements
- **Responsive Variants**: Mobile-specific overrides for all elements

## How It Works

### 1. Theme Declaration

Themes are defined in `src/themes/index.ts`:

```typescript
export const themes: Record<ThemeKey, ThemeConfig> = {
    golf: {
        id: "golf",
        name: "Golf",
        colors: {
            "--primary": "#10b981",
            "--background": "#ffffff",
            // ... more colors
        },
        elementStyles: {
            h1: { size: "3.75rem", weight: "700" },
            "btn-primary": {
                bg: "var(--primary)",
                text: "var(--primary-foreground)",
            },
            // ... more element styles
        },
    },
    midnight: {
        // ... another theme configuration
    },
};
```

### 2. Theme Resolution

The resolver determines which theme to apply based on:

1. **Explicit page theme** (highest priority)
2. **Default theme** (fallback)

```typescript
function resolveTheme(metadata?: RouteMetadata): ThemeKey {
    if (metadata?.theme && themes[metadata.theme as ThemeKey]) {
        return metadata.theme as ThemeKey;
    }
    return DEFAULT_THEME;
}
```

### 3. Theme Application

The ThemeProvider applies the selected theme by:

- Setting `data-theme` attribute on HTML element
- Applying CSS variables to document root
- Triggering theme CSS via `[data-theme="theme-name"]` selectors

## Usage

### Applying a Theme to a Page

#### Method 1: Route Configuration (Recommended)

```typescript
// In routes.tsx
{
  path: 'my-page',
  element: (
    <ThemeProvider routeTheme="midnight">
      <MyPage />
    </ThemeProvider>
  ),
}
```

#### Method 2: Default Theme

Pages automatically inherit the default theme (`golf`) without any
configuration.

### Using Theme Classes in Components

Always use theme classes instead of inline styles or Tailwind utilities:

```tsx
// ✅ GOOD: Use theme classes
<h1 className="h1">Page Title</h1>
<button className="btn-primary">Submit</button>
<a href="#" className="link-std">Learn More</a>

// ❌ BAD: Inline styles or utilities
<h1 className="text-4xl font-bold">Page Title</h1>
<button className="bg-blue-600 text-white px-4 py-2">Submit</button>
```

## Available Themes

### Golf (Default)

- Fresh, green-focused theme for property listings
- Light background with emerald accents
- Optimized for real estate content

### Golf Elegant

- Refined version of Golf theme
- Same colors with subtle styling differences
- Suitable for premium property listings

### Midnight

- Dark, sophisticated theme
- Purple/violet primary colors
- Dark background with light text
- Ideal for luxury or evening-focused content

## CSS Variables Reference

### Colors

- `--primary`: Main brand color
- `--primary-foreground`: Text color on primary background
- `--secondary`: Secondary brand color
- `--background`: Main background color
- `--foreground`: Main text color
- `--border`: Border color
- `--muted`: Muted/secondary text color

### Typography

- `--h1-size`, `--h1-weight`, `--h1-line-height`, `--h1-letter-spacing`
- `--h2-*`, `--h3-*`: Same pattern for other heading levels
- `--body-*`: Body text styles
- `--small-*`, `--caption-*`: Small text styles

### Elements

- `--btn-primary-*`, `--btn-secondary-*`: Button styles
- `--btn-outline-*`, `--btn-ghost-*`: Button variants
- `--link-std-*`, `--link-bold-*`: Link styles
- `--site-title-*`, `--mobile-menu-*`: Navigation styles

### Responsive Variants

Mobile-specific variables use `-mobile-` suffix:

- `--h1-mobile-size`, `--h1-mobile-line-height`
- `--btn-primary-mobile-px`, `--btn-primary-mobile-py`

## Adding a New Theme

### 1. Define Theme Configuration

Add to `src/themes/index.ts`:

```typescript
export const themes: Record<ThemeKey, ThemeConfig> = {
    // existing themes...
    "my-theme": {
        id: "my-theme",
        name: "My Theme",
        colors: {
            "--primary": "#your-color",
            "--background": "#your-bg-color",
            // ... all required colors
        },
        baseTypo: {
            fontSize: "16px",
            fontFamily: "ui-sans-serif, system-ui, sans-serif",
        },
        elementStyles: {
            // ... all element styles
        },
    },
};
```

### 2. Create Theme CSS File

Create `src/styles/my-theme-theme.css`:

```css
[data-theme="my-theme"] {
    /* Color variables */
    --primary: 250 84% 50%; /* HSL format */
    --background: 0 0% 100%;

    /* Typography variables */
    --h1-size: 3.75rem;
    --h1-weight: 700;

    /* Element style variables */
    --btn-primary-bg: var(--primary);
    --btn-primary-text: var(--primary-foreground);
}

/* Theme Classes */
.h1 {
    font-size: var(--h1-size);
    font-weight: var(--h1-weight);
    color: hsl(var(--h1-color));
}

.btn-primary {
    background: hsl(var(--btn-primary-bg));
    color: hsl(var(--btn-primary-text));
    /* ... complete button styling */
}

/* Mobile variants */
@media (max-width: 768px) {
    .h1 {
        font-size: var(--h1-mobile-size);
    }
}
```

### 3. Import Theme CSS

Add to `src/index.css`:

```css
@import "./styles/my-theme-theme.css";
```

### 4. Update TypeScript Types

Add to `ThemeKey` union in `src/themes/types.ts`:

```typescript
export type ThemeKey = "golf" | "golf-elegant" | "midnight" | "my-theme";
```

## Testing

### Running Tests

```bash
# Run theme resolver tests
npm test src/themes/__tests__/resolver.test.ts

# Test theme application manually
npm run dev
# Navigate to /new-build-golf-properties-costa-blanca-midnight
```

### Expected Behavior

1. Default page loads with "golf" theme
2. Midnight-themed page loads with "midnight" theme
3. CSS variables are applied correctly
4. Theme classes render with proper styling
5. Mobile responsive variants work correctly

## Best Practices

### 1. Always Use Theme Classes

Never mix Tailwind utilities with theme classes for styling:

```tsx
// ✅ GOOD
<button className="btn-primary">Click me</button>

// ❌ BAD
<button className="btn-primary bg-blue-500">Click me</button>
```

### 2. Test Responsive Behavior

Ensure mobile variants work:

- Test on mobile devices
- Check responsive breakpoints in theme CSS
- Verify mobile-specific variables are applied

### 3. Maintain Consistency

- Use semantic color tokens (`--primary`, `--secondary`)
- Follow naming conventions (`btn-primary`, `link-std`)
- Include all required element styles

### 4. Performance Considerations

- Themes are bundled at build time
- No runtime CSS loading
- CSS variable application is synchronous
- Theme switching is instant

## Troubleshooting

### Theme Not Applying

1. Check theme is imported in `src/index.css`
2. Verify theme CSS file exists and is valid
3. Ensure `data-theme` attribute is set correctly
4. Check browser console for CSS variable errors

### Mobile Styles Not Working

1. Verify mobile media queries in theme CSS
2. Check mobile variable naming (`-mobile-` suffix)
3. Test responsive breakpoints match design

### TypeScript Errors

1. Ensure theme key is in `ThemeKey` union
2. Check theme config interface compliance
3. Verify import paths are correct

## Migration Guide

### From Inline Styles to Theme Classes

1. Identify inline styles or hardcoded values
2. Map to appropriate theme variables
3. Replace with theme classes
4. Test visual consistency
5. Remove inline styles

Example migration:

```tsx
// Before
<h1 style={{ fontSize: '3rem', color: '#10b981' }}>Title</h1>

// After
<h1 className="h1">Title</h1>
```

### From Theme-Specific Pages to Universal Pages

1. Remove theme-specific styling code
2. Add route-level theme configuration if needed
3. Ensure theme classes are used throughout
4. Test with default theme

This migration ensures pages work with any theme and are maintainable long-term.
