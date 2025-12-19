import golfImage from '@/assets/golf.jpg';

/**
 * Maps static string paths from JSON to imported assets.
 * Vite requires assets to be imported for them to be processed correctly for production/external hosting.
 */
const assetMap: Record<string, string> = {
  '/assets/golf.jpg': golfImage,
  '../assets/golf.jpg': golfImage,
  'assets/golf.jpg': golfImage,
};

export function resolveAsset(path: string): string {
  return assetMap[path] || path;
}
