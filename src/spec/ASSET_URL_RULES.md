# Asset URL Rules and Guardrails (Spec Kit)

This guide defines mandatory rules for building asset URLs so they work in both development and on GitHub Pages (production subfolder). Follow these rules exactly to avoid duplicated prefixes like "/newbuilds/newbuilds/...".

Context
- We deploy under a sub-path: /newbuilds/
- Vite is configured with base = '/newbuilds/' in production
- The single source of truth for public asset URLs in code is resolveAsset() from src/lib/assets.ts

Golden Rules
1) Never hardcode the base path in source code
- Do not write literal "/newbuilds/" in component props, inline styles, meta tags, or image src attributes in src/**/*.
- The only place that defines the base is vite.config.ts.

2) Always use resolveAsset() for public assets
- Always pass the path starting from the public directory and starting with a slash, e.g. '/assets/golf.jpg'.
- Example (Correct):
  - <img src={resolveAsset('/assets/golf.jpg')} alt="..." />
- Example (Wrong):
  - <img src="/newbuilds/assets/golf.jpg" alt="..." />
  - <img src={resolveAsset('/newbuilds/assets/golf.jpg')} alt="..." />

3) Resolve exactly once per asset
- If a component accepts a media or image prop, it must accept a raw path (e.g., '/assets/...') and the component itself should call resolveAsset().
- Do NOT pass a value that was already processed by resolveAsset() into another place that also calls resolveAsset() or adds the base again.
- Anti-pattern: Passing resolveAsset(...) into a component that also calls resolveAsset(...).

4) Meta tags and inline styles must also use resolveAsset()
- og:image, link rel images, CSS background-image URLs should be generated with resolveAsset().
- Example:
  - <meta property="og:image" content={resolveAsset('/assets/golf.jpg')} />
  - style={{ backgroundImage: `url(${resolveAsset('/assets/hero.jpg')})` }}

5) Never fix production by editing dist
- dist/ contains build artifacts. Do not commit manual fixes there.
- If duplication occurs in dist HTML, fix the source so the next build is correct.

6) Do not mix public/ and src/assets processing behaviors
- For stable public references use /public/assets and resolveAsset().
- For images that must be imported/optimized, follow Vite import rules and do not prefix them manually with /newbuilds/.

Patterns to Avoid
- Hardcoded '/newbuilds/' anywhere in src/**/* (components, pages, sections, styles-in-JS, meta tags).
- Constructing URLs by concatenating import.meta.env.BASE_URL yourself (use resolveAsset()).
- Passing already-resolved URLs into APIs that will apply the base again.

Component Contract Pattern
- If a component renders an image/background:
  - Component prop should accept a raw path: '/assets/...' (not prefixed, not resolved).
  - Component code calls resolveAsset(media) right at render time.
- If a parent must pass a pre-resolved URL, the child must treat the value as final and must NOT call resolveAsset() again. Prefer the first approach to keep a single source of truth.

Vite Base Behavior (Reference)
- In dev: import.meta.env.BASE_URL === '/'
- In prod: import.meta.env.BASE_URL === '/newbuilds/'
- resolveAsset() joins BASE_URL and the given path safely and prevents double slashes. It does not guard against passing a value that already contains '/newbuilds/'.

PR Checklist (Must-pass)
- [ ] No occurrences of '/newbuilds/' inside src/**/* (grep check). Allowed only in vite.config.ts or deployment docs.
- [ ] All public asset references use resolveAsset('/assets/...').
- [ ] No component receives an already-resolved URL and then calls resolveAsset() again.
- [ ] Inline styles and meta tags use resolveAsset().
- [ ] Built output does not contain 'newbuilds/newbuilds' anywhere.

Quick Greps
- Find hardcoded base (should return nothing in src):
  - grep -R "\/newbuilds\/" src || true
- Find potential double-prefixes in dist after build:
  - grep -R "newbuilds\/newbuilds" dist || true
- Ensure all public assets use resolveAsset:
  - grep -R "resolveAsset\(" src | wc -l  # then spot-check relevant files

Examples
Correct
- <img src={resolveAsset('/assets/lvb/lvb-01-3d.jpg')} alt="..." />
- <meta property="og:image" content={resolveAsset('/assets/golf.jpg')} />
- <div style={{ backgroundImage: `url(${resolveAsset('/assets/hero.jpg')})` }} />

Incorrect
- <img src="/newbuilds/assets/lvb/lvb-01-3d.jpg" alt="..." />
- <img src={resolveAsset('/newbuilds/assets/lvb/lvb-01-3d.jpg')} alt="..." />
- <div style={{ backgroundImage: 'url(/newbuilds/assets/hero.jpg)' }} />
- Passing resolveAsset(...) into a component that will also call resolveAsset(...)

Troubleshooting
- Symptom: Some assets work, some fail on GitHub Pages.
  - Likely cause: Some were hardcoded with '/newbuilds/' and then processed again.
  - Fix: Remove hardcoded '/newbuilds/' from source and use resolveAsset('/assets/...').
- Symptom: dist contains '/newbuilds/newbuilds/'.
  - Likely cause: Double application of base in templates or props.
  - Fix: Normalize the source to resolve exactly once and rebuild.

Enforcement Notes for AI Contributors
- Do not add new documentation or examples that hardcode '/newbuilds/'.
- When adding new components that accept media paths, document whether the prop expects a raw path (preferred) or a final URL. Default to raw path with resolveAsset() inside the component.
- Always add/update PR checklist items above when touching asset code.

This document supersedes any conflicting examples elsewhere in the repo. Adhere to these rules to prevent broken assets in production.