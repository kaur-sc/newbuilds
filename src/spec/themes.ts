/**
 * This file ensures that all theme CSS files are discoverable by Vite and included
 * in the production build. By dynamically importing them here, we can be sure that
 * the CSS for all themes is available to be applied at runtime.
 *
 * This module should be imported once in the main application entry point (main.tsx).
 */

import.meta.glob('/src/styles/*.css', { eager: true });

console.log('🎨 All themes loaded for bundling.');