# Real Estate Landing Page System

A fast, static-only landing page system optimized for real estate developments.
Built with React, Vite, TailwindCSS, and Spec Kit.

## 🚀 Quick Start

1. **Install dependencies**:
   ```bash
   npm install
   # Use --legacy-peer-deps if you encounter conflicts with React 19/18
   npm install --legacy-peer-deps
   ```

2. **Run locally**:
   ```bash
   npm run dev
   ```
   Visit `http://localhost:5173`.

3. **Validate content**:
   ```bash
   npm run spec
   ```

4. **Build static site**:
   ```bash
   npm run build
   ```
   The output will be in `dist/`.

## 📁 Project Structure

- `src/developments/`: **Content Files**. Add new JSON files here to create
  pages.
- `src/spec/`: **Spec Kit**. Validation schema (`schema.json`).
- `src/sections/`: UI Sections (Hero, Features, etc.).
- `src/components/ui/`: Reusable primitives (Buttons, Cards).
- `scripts/`: Validation scripts.

## 📝 How to Add a New Development

1. Create a new JSON file in `src/developments/` (e.g., `ocean-view.json`).
2. Copy the structure from `sunny-hills.json`:
   ```json
   {
     "id": "ocean-view",
     "name": "Ocean View Residences",
     "brand": { ... },
     "seo": { ... },
     "sections": [ ... ]
   }
   ```
3. Fill in your content.
4. Run `npm run spec` to verify your file matches the schema.
   `/developments/ocean-view`.

### Alternative: Custom Pages

For pages that require custom layouts or logic beyond the standard schema:

1. Create a new component in `src/pages/` (e.g., `src/pages/MyPage.tsx`).
2. Import components from `src/components/ui` and `src/sections` as needed.
3. Register the route manually in `src/routes.tsx`.
4. **Important**: Add a link to the new page in the main navigation or front
   page list (e.g., in `src/pages/LandingPage.tsx` or
   `src/components/layout/Navbar.tsx`) to ensure users can find it.

## 🌍 Multilingual Support

The project uses `i18next` for translations. Content is stored in
`src/locales/{lang}/{namespace}.json`.

### Adding Translations

1. **Create JSON Files**:
   - Create a JSON file for your page in `src/locales/en/` (e.g.,
     `my-page.json`).
   - Create corresponding files for other languages (e.g.,
     `src/locales/es/my-page.json`).

2. **Use in Components**:
   - Use the `useTranslation` hook:
     ```tsx
     import { useTranslation } from "react-i18next";

     export function MyPage() {
        const { t } = useTranslation("my-page"); // 'my-page' matches the filename
        return <h1>{t("hero.title")}</h1>;
     }
     ```

3. **Update Configuration**:
   - Add your new namespace to `src/i18n.ts` in the `ns` array to ensure it's
     loaded.

## 🛠️ Spec Kit

This project includes a local "Spec Kit" implementation to ensure data
integrity. The schema is defined in `src/spec/schema.json`. The validation
script `scripts/validate.js` uses `ajv` to check all files in
`src/developments/` against the schema.

## 📦 Deployment

This is a **Static Site**. You can deploy the `dist/` folder to any static host:

- Vercel / Netlify / Cloudflare Pages
- GitHub Pages
- Amazon S3 / Google Cloud Storage

No database or backend server is required.
