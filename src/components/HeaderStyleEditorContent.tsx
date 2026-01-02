import { useState, useEffect } from 'react';
import { ThemeColorPicker } from './ui/ThemeColorPicker';

export function HeaderStyleEditorContent() {
  const getInitialValue = (varName: string, defaultValue: string) => {
    if (typeof window === 'undefined') return defaultValue;
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || defaultValue;
  };

  const [bgColor, setBgColor] = useState(() => getInitialValue('--header-bg-color', 'hsl(var(--background))'));
  const [bgAlpha, setBgAlpha] = useState(() => {
    const alpha = getInitialValue('--header-bg-alpha', '0.8');
    return Math.round(parseFloat(alpha) * 100);
  });
  const [blur, setBlur] = useState(() => {
    const blurVal = getInitialValue('--header-blur', '8px');
    return parseInt(blurVal.replace('px', ''), 10);
  });

  useEffect(() => {
    document.documentElement.style.setProperty('--header-bg-color', bgColor);
    const newBgColor = bgColor.replace(')', `, ${bgAlpha / 100})`).replace('hsl', 'hsla');
    document.documentElement.style.setProperty('--header-bg', newBgColor);
  }, [bgColor, bgAlpha]);

  useEffect(() => {
    document.documentElement.style.setProperty('--header-bg-alpha', (bgAlpha / 100).toString());
  }, [bgAlpha]);

  useEffect(() => {
    document.documentElement.style.setProperty('--header-blur', `${blur}px`);
  }, [blur]);

  return (
    <div className="space-y-6">
      <div>
        <label className="block small font-medium mb-2">
          Background Color
        </label>
        <ThemeColorPicker value={bgColor} onChange={setBgColor} />
      </div>

      <div>
        <label htmlFor="bg-alpha" className="block small font-medium mb-2">
          Background Transparency: {bgAlpha}%
        </label>
        <input
          id="bg-alpha"
          type="range"
          min="0"
          max="100"
          value={bgAlpha}
          onChange={(e) => setBgAlpha(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      <div>
        <label htmlFor="header-blur" className="block small font-medium mb-2">
          Background Blur: {blur}px
        </label>
        <input
          id="header-blur"
          type="range"
          min="0"
          max="40"
          value={blur}
          onChange={(e) => setBlur(parseInt(e.target.value))}
          className="w-full"
        />
      </div>
    </div>
  );
}
