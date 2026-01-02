/**
 * Resolves the public path for an asset, ensuring it works correctly in both
 * development and production (subdirectory) environments.
 *
 * This function prepends the base URL provided by Vite (`import.meta.env.BASE_URL`),
 * which is '/' in development and '/newbuilds/' in production. This is the
 * recommended way to reference public assets.
 *
 * @param pathFromPublic - The path to the asset starting from the `public` directory.
 *   It must begin with a forward slash, e.g., '/assets/image.png'.
 * @returns The fully resolved, environment-aware asset path.
 */
export function resolveAsset(pathFromPublic: string): string {
  if (!pathFromPublic.startsWith('/')) {
    console.warn(`[resolveAsset] Path should start with a '/', but got: ${pathFromPublic}`);
    pathFromPublic = `/${pathFromPublic}`;
  }
  // `import.meta.env.BASE_URL` is '/' in dev and '/newbuilds/' in prod.
  // The join logic prevents double slashes (e.g., '/newbuilds//assets').
  return `${import.meta.env.BASE_URL.replace(/\/$/, '')}${pathFromPublic}`;
}
