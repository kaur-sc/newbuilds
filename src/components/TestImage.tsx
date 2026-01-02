import { resolveAsset } from '@/lib/assets';

export function TestImage() {
  const imageUrl = resolveAsset('/assets/golf.jpg'); // Using a known asset

  return (
    <div style={{ padding: '20px', border: '1px solid red', margin: '20px' }}>
      <h2>Test Image Component</h2>
      <p>Image URL should be /newbuilds/assets/golf.jpg</p>
      <img src={imageUrl} alt="Test Golf Course" style={{ width: '300px', height: 'auto' }} />
      <p>Raw URL from resolveAsset: {imageUrl}</p>
    </div>
  );
}
