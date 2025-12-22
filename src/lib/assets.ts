import golfImage from '@/assets/golf.jpg';

/**
 * Maps static string paths from JSON to imported assets.
 * Vite requires assets to be imported for them to be processed correctly for production/external hosting.
 * 
 * PUBLIC ASSETS: Images in /public/assets/ should use src="/assets/filename.ext"
 * IMPORTED ASSETS: Images that need processing should be imported and mapped here
 */
const assetMap: Record<string, string> = {
  // Imported assets (for processed/optimized images)
  '/assets/golf.jpg': golfImage,
  '../assets/golf.jpg': golfImage,
  'assets/golf.jpg': golfImage,
  
  // LVB Development Images - Public assets (use src="/assets/filename.ext")
  // These are mapped for consistency but don't need imports since they're in /public/
  '/assets/lvb/lvb-01-3d.jpg': '/assets/lvb/lvb-01-3d.jpg',
  '/assets/lvb/lvb-02-3d.jpg': '/assets/lvb/lvb-02-3d.jpg',
  '/assets/lvb/lvb-03-3d.jpg': '/assets/lvb/lvb-03-3d.jpg',
  '/assets/lvb/lvb-04-edited.jpg': '/assets/lvb/lvb-04-edited.jpg',
  '/assets/lvb/lvb-05-edited.jpg': '/assets/lvb/lvb-05-edited.jpg',
  '/assets/lvb/lvb-06-edited.jpg': '/assets/lvb/lvb-06-edited.jpg',
  '/assets/lvb/lvb-06-s.jpg': '/assets/lvb/lvb-06-s.jpg',
  '/assets/lvb/lvb-07-edited.jpg': '/assets/lvb/lvb-07-edited.jpg',
  '/assets/lvb/lvb-08-edited.jpg': '/assets/lvb/lvb-08-edited.jpg',
  '/assets/lvb/lvb-09-edited.jpg': '/assets/lvb/lvb-09-edited.jpg',
  '/assets/lvb/lvb-10-edited.jpg': '/assets/lvb/lvb-10-edited.jpg',
  '/assets/lvb/lvb-11-3d.jpg': '/assets/lvb/lvb-11-3d.jpg',
  '/assets/lvb/lvb-12-3d.jpg': '/assets/lvb/lvb-12-3d.jpg',
  '/assets/lvb/lvb-13-3d.jpg': '/assets/lvb/lvb-13-3d.jpg',
  '/assets/lvb/lvb-development-block.webp': '/assets/lvb/lvb-development-block.webp',
  '/assets/lvb/lvb-development-floors.webp': '/assets/lvb/lvb-development-floors.webp',
};

export function resolveAsset(path: string): string {
  return assetMap[path] || path;
}
