# Theme System Troubleshooting Guide

This guide helps diagnose and resolve theme-related deployment issues,
particularly when themes work in development but fail in production.

## Common Issues & Solutions

### 1. Theme Falls Back to Default on Production

**Symptoms:**

- Custom theme works in `npm run dev`
- Production build shows default theme instead
- No console errors visible

**Root Causes & Solutions:**

#### Issue: CSS Not Properly Loaded

**Diagnosis:**

```bash
# Open browser DevTools on deployed site
# Check Network tab for CSS file loading
# Look for 404 errors on theme CSS
```

**Solution:**

- Verify `vite.config.ts` has correct `base` path
- Ensure CSS file includes all theme selectors
- Run `npm run validate-themes` to check theme inclusion

#### Issue: ThemeProvider Not Wrapped

**Diagnosis:**

```bash
# Check routes configuration
# Verify ThemeProvider wraps route components
```

**Solution:**

```typescript
// Correct route configuration
{
  path: 'new-build-golf-properties-costa-blanca-golf-elegant',
  element: (
    <ThemeProvider routeTheme="golf-elegant">
      <GolfProperties />
    </ThemeProvider>
  ),
}
```

#### Issue: localStorage Theme Not Persisting

**Diagnosis:**

```javascript
// In browser console
console.log(localStorage.getItem("pageThemeAssignments"));
```

**Solution:**

- ThemeProvider handles localStorage automatically
- Ensure no privacy settings block localStorage
- Check for SameSite cookie restrictions

### 2. Theme CSS Variables Not Applied

**Symptoms:**

- Theme switch happens but colors don't change
- CSS variables show as default values

**Root Causes & Solutions:**

#### Issue: CSS Selector Mismatch

**Diagnosis:**

```css
/* Check in DevTools if this exists */
[data-theme="golf-elegant"] {
    --primary: 160 84% 39%;
    /* ... */
}
```

**Solution:**

- Run theme validation: `npm run validate-themes`
- Rebuild: `npm run build`
- Check CSS file includes theme selectors

#### Issue: CSS Specificity Problems

**Diagnosis:**

```css
/* Check computed styles in DevTools */
/* Verify CSS variables are being read */
```

**Solution:**

- Ensure theme CSS loads before other CSS
- Check for overriding CSS rules
- Verify `data-theme` attribute is set on `<html>` element

### 3. Build Validation Failures

**Symptoms:**

- `npm run build` fails with theme validation errors
- Missing theme CSS in build output

**Solutions:**

#### Check Theme Files Exist

```bash
# Verify source theme files
ls src/styles/
# Should include: golf-theme.css, golf-elegant-theme.css, midnight-theme.css
```

#### Check CSS Import Chain

```typescript
// Verify in src/index.css
@import './styles/golf-theme.css';
@import './styles/golf-elegant-theme.css';
@import './styles/midnight-theme.css';
```

#### Rebuild with Validation

```bash
# Clean build
rm -rf dist
npm run build
# Should show: 🎉 [ThemeValidator] All theme validations passed!
```

## Diagnostic Tools

### 1. Browser Console Analysis

```javascript
// Check current theme
console.log(
    "Current theme:",
    document.documentElement.getAttribute("data-theme"),
);

// Check CSS variables
const root = document.documentElement;
const primaryColor = getComputedStyle(root).getPropertyValue("--primary");
console.log("Primary color:", primaryColor);

// Check localStorage
console.log("Saved themes:", localStorage.getItem("pageThemeAssignments"));
```

### 2. Network Tab Analysis

1. Open DevTools → Network tab
2. Filter by CSS files
3. Look for theme CSS loading
4. Check for 404 errors on CSS files
5. Verify CSS file contains theme selectors

### 3. Elements Tab Analysis

1. Inspect `<html>` element
2. Verify `data-theme` attribute is set
3. Check computed styles for CSS variables
4. Look for overridden CSS rules

### 4. Build Process Validation

```bash
# Run theme validation
npm run validate-themes

# Check build output
ls -la dist/assets/
# Should contain app-[hash].css with all themes

# Verify HTML references
grep -n "app.*.css" dist/*.html
# Should show correct CSS references with base path
```

## Performance Considerations

### 1. CSS Bundle Size

Themes are included in a single CSS file to minimize requests:

- All themes: ~68KB gzipped
- Individual themes: ~22KB each
- Critical CSS is inlined for fast loading

### 2. Theme Switching Performance

Theme switching is instantaneous because:

- CSS is preloaded
- Only `data-theme` attribute changes
- No additional network requests required

### 3. Caching Strategy

- CSS files are hashed for cache busting
- Theme changes don't require cache invalidation
- localStorage persists user preferences

## Deployment Checklist

### Pre-Deployment

```bash
# 1. Run full test suite
npm run lint
npm run spec
npm run validate-themes

# 2. Test build process
npm run build
# Should complete without errors

# 3. Verify themes in build
node scripts/validate-themes.js
```

### Post-Deployment

```bash
# 1. Test all theme URLs
- /new-build-golf-properties-costa-blanca (golf theme)
- /new-build-golf-properties-costa-blanca-golf-elegant (golf-elegant theme)

# 2. Check browser console for errors
# Look for theme-related logs and errors

# 3. Verify theme switching
- Use PageThemeSelector if available
- Test localStorage persistence
```

## Advanced Debugging

### 1. Theme Resolution Debugging

```typescript
// Add temporary debug code in ThemeProvider
console.log("Route metadata:", routeMetadata);
console.log("Resolved theme:", resolveTheme(routeMetadata));
console.log("Available themes:", Object.keys(themes));
```

### 2. CSS Loading Debugging

```javascript
// Check if CSS is fully loaded
document.addEventListener("DOMContentLoaded", () => {
    const testElement = document.createElement("div");
    testElement.setAttribute("data-theme", "golf-elegant");
    document.body.appendChild(testElement);

    const computedStyle = getComputedStyle(testElement);
    const primaryColor = computedStyle.getPropertyValue("--primary");

    console.log("Theme CSS loaded:", primaryColor !== "");
    document.body.removeChild(testElement);
});
```

### 3. Build Process Debugging

```bash
# Inspect generated CSS
grep -A 10 "data-theme=golf-elegant" dist/assets/app-*.css

# Check HTML references
grep -n "data-theme" dist/*.html

# Verify asset paths
find dist -name "*.css" -exec grep -l "data-theme" {} \;
```

## Common Environment-Specific Issues

### 1. CDN/Static Asset Serving

- Ensure CSS files are served with correct MIME types
- Verify cache headers allow CSS updates
- Check for path rewriting rules

### 2. Server-Side Rendering

- Themes work with SSG out of the box
- No server-side theme application needed
- Client-side handles all theme logic

### 3. Development vs Production Differences

- Development uses hot reloading
- Production uses pre-built CSS bundles
- Theme validation only runs in production build

## Contact & Support

If issues persist after following this guide:

1. Check console logs for theme-related errors
2. Run diagnostic tools listed above
3. Verify build validation passes
4. Test with different browsers/profiles

Theme system is designed to be robust and self-healing. Most issues are related
to:

- Incorrect build configuration
- Missing CSS imports
- Routing/ThemeProvider misconfiguration

The validation scripts included in the build process help catch most issues
before deployment.
