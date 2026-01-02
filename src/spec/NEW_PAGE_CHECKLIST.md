# New Subpage Creation Checklist (Spec Kit Method)

This checklist provides the only supported step-by-step guide for creating new
pages in the system using the JSON-based **Spec Kit** method. This ensures a
clean, simple, and consistent architecture without hardcoded values.

## 🔗 File Connections Summary

Every new subpage involves these specific files:

| Task Area       | File Path                 | Purpose                                        |
| :-------------- | :------------------------ | :--------------------------------------------- |
| **Content**     | `src/developments/*.json` | Primary source of truth for page data          |
| **I18n**        | `src/locales/*/*.json`    | Translation storage (organized by namespace)   |
| **I18n Auth**   | `src/i18n.ts`             | **Crucial:** Manual import for static bundling |
| **Asset Check** | `public/assets/`          | Storage for page-specific images               |
| **Theming**     | `src/themes/index.ts`     | (Optional) Define new theme colors/styles      |
| **Theming**     | `src/styles/*.css`        | (Optional) Theme-specific CSS classes          |
| **Validation**  | `src/spec/schema.json`    | Reference for valid JSON structure             |

---

## Phase 1: Content Setup

- [ ] **Define Slug**: Decide on the unique URL slug (e.g.,
      `modern-villas-costa-blanca`).
- [ ] **Create JSON**: Create `src/developments/[slug].json`.
- [ ] **Populate**: Copy structure from `src/developments/sunny-hills.json`.
- [ ] **ID Check**: Ensure the `"id"` field in the JSON matches your filename
      exactly.
- [ ] **Sections**: Define sections (Hero, Features, etc.) matching
      `src/spec/schema.json`.

---

## Phase 2: Internationalization (CRITICAL)

> [!IMPORTANT]
> All translations MUST be manually registered in `src/i18n.ts` to be included
> in the static build.

- [ ] **Namespace**: Use your slug/id as the translation namespace.
- [ ] **Create Files**:
  - [ ] English: `src/locales/en/[slug].json`
  - [ ] French: `src/locales/fr/[slug].json`
- [ ] **Register in `src/i18n.ts`**:
  - [ ] Add imports:
    ```typescript
    import enMyPage from "./locales/en/my-page.json";
    import frMyPage from "./locales/fr/my-page.json";
    ```
  - [ ] Map resources:
    ```typescript
    en: { 'my-page': enMyPage },
    fr: { 'my-page': frMyPage },
    ```
  - [ ] Add to namespace list: Add `'my-page'` to the `ns: [...]` array.

---

## Phase 3: SEO & Meta Tags

- [ ] **SEO Object**: Fill the mandatory `seo` object in your `[slug].json`:
  - [ ] `title`: Descriptive title (e.g., "Modern New Build Villas in Costa
        Blanca").
  - [ ] `description`: Compelling summary for search results.
  - [ ] `ogImage`: Reference to your main social sharing image (e.g.,
        `/assets/og-villas.jpg`).

---

## Phase 4: Asset Handling

> [!TIP]
> Use the standard asset directory to ensure internal path resolution.

- [ ] Store internal assets in `public/assets/` or `src/assets/`.
- [ ] Reference them correctly in your JSON (e.g., `"/assets/villas/hero.jpg"`).
- [ ] **Rule**: Ensure filenames use only lowercase, numbers, and hyphens (no
      spaces).

---

## Phase 5: Styling & Theme Compatibility

> [!IMPORTANT]
> To ensure your page responds to **Style Editor**, do NOT use raw Tailwind
> size/color classes (e.g., `text-4xl`, `bg-blue-500`) for primary elements. You
> MUST use **Theme Classes**.

### CRITICAL: Fluid Design Requirements (MANDATORY)

**ALL new components MUST use fluid design with `clamp()` functions**. No
exceptions allowed.

- [ ] **No Fixed Pixels**: NEVER use fixed pixel values (e.g., `width: "300px"`)
- [ ] **Use Fluid Variables**: ALL sizing must use CSS variables with `clamp()`
- [ ] **No Media Query Sizing**: Remove breakpoint-based sizing, use fluid
      scaling
- [ ] **Component Dimensions**: Use `var(--component-width)`,
      `var(--component-height)` etc.
- [ ] **Spacing & Gaps**: Use `var(--component-gap-small)`,
      `var(--component-gap-medium)` etc.
- [ ] **Button Sizing**: Use `var(--btn-primary-px)`, `var(--btn-primary-py)`
      etc.
- [ ] **Typography**: Already fluid via theme CSS variables

### Styling Implementation

- [ ] **Typography**: Use only these classes for text:
  - `.h1`, `.h2`, `.h3` (Headings - already fluid)
  - `.body`, `.body-l` (Body text - already fluid)
  - `.small`, `.caption` (Small text/labels - already fluid)
- [ ] **Interactive**: Use these classes for buttons/links:
  - `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.btn-ghost` (already
    fluid)
  - `.link-std`, `.link-bold` (already fluid)
- [ ] **Colors**: Use CSS variables if you need custom coloring:
  - `var(--primary)`, `var(--secondary)`, `var(--background)`,
    `var(--foreground)`
- [ ] **Layout**: You CAN use Tailwind for layout only (e.g., `flex`, `grid`,
      `p-4`, `mb-10`).
- [ ] **Component Sizing**: For custom components, define fluid variables in
      theme CSS:
  ```css
  /* Example for new component */
  --my-component-width: clamp(280px, 35vw, 380px);
  --my-component-padding: clamp(1rem, 3vw, 2rem);
  --my-component-gap: clamp(0.5rem, 1.5vw, 1rem);
  ```
- [ ] **JavaScript Integration**: Parse CSS variables for dynamic behavior:
  ```typescript
  const computedStyle = getComputedStyle(element);
  const scrollAmount = computedStyle.getPropertyValue(
        "--carousel-scroll-amount",
  );
  const numericValue = parseFloat(scrollAmount) || 400;
  ```

### Fluid Design Validation

- [ ] **Test Viewport Scaling**: Resize browser smoothly - no jumps or breaks
- [ ] **Test Mobile**: (< 768px) - Optimal sizing maintained
- [ ] **Test Desktop**: (> 1024px) - Maximum sizes capped correctly
- [ ] **Test Ultra-Wide**: - Maximum sizes don't exceed defined limits
- [ ] **No Fixed Values**: Verify no hardcoded pixels remain in component
      +++++++ REPLACE

---

---

## Phase 6: Advanced Aesthetics & Navigation

> [!TIP]
> To match the "Premium" look of legacy custom pages, follow these naming and
> animation rules.

- [ ] **Section IDs**: Use semantic IDs for smooth scrolling (e.g., `"hero"`,
      `"features"`, `"location"`, `"gallery"`, `"contact"`).
- [ ] **Premium Animations**: Use these classes for a modern feel:
  - `.animate-fade-in-up`: Use on hero text and section headers.
  - `.animate-fade-in`: Use for subtle entry effects.
  - `.img-zoom`: Add to property images for a hover expansion effect.
- [ ] **Asset Resolution**: Ensure ALL images in your JSON use standard public
      paths (e.g., `"/assets/my-image.jpg"`) as the system wraps them in
      `resolveAsset()` automatically.

---

## Phase 7: Automatic Routing & Navigation

- [x] **Automatic Routing**: No code changes needed. The system automatically
      picks up all files in `src/developments/*.json` and mounts them at
      `/developments/[id]`.
- [x] **Header Dropdown**: The "Golf Developments" menu automatically populates
      with all projects found in `src/developments/`.
- [x] **Style Editor**: The "Page Theme Manager" automatically detects all
      routes, including your new development page, for instant theme switching.
- [ ] **Theme Persistence**: - [ ] To permanently assign a theme to your new
      page without using the Style Editor, update the default application logic
      in `src/pages/LandingPage.tsx` or use the Style Editor to save the
      preference in localStorage.

---

## Phase 8: Verification & QA (Fail-Safe)

- [ ] **Run Validation**: `npm run spec` (checks if your JSON matches the
      schema).
- [ ] **Local Check**: Run `npm run dev` and visit the homepage or
      `http://localhost:5173/developments/[slug]`.
- [ ] **Navigation Check**: Ensure your new page appears in the "Golf
      Developments" header dropdown.
- [ ] **Styles Verification**: Open the **Style Editor**, select your new page
      from the dropdown, switch themes, and verify the page updates correctly.
- [ ] **I18n Verification**: Switch languages and ensure no translation keys
      (e.g., `hero.title`) are displayed.
- [ ] **SEO Verification**: Inspect the page source to ensure `<title>` and meta
      tags are populated from your JSON.
- [ ] **Build Verification**: Run `npm run build` and ensure the page is
      correctly pre-rendered in the `dist/` directory.
