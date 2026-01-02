import { useState, useEffect } from 'react';
import { ThemeColorPicker } from './ThemeColorPicker';

export function IconStyleEditorContent() {
  // State for icon styles - use proper defaults that match CSS variable types
  const [bgColor, setBgColor] = useState(() => 'hsl(var(--primary) / 0.1)');
  const [radius, setRadius] = useState(() => 16); // Default 16px
  const [iconColor, setIconColor] = useState(() => 'hsl(var(--primary))');
  const [iconSize, setIconSize] = useState(() => 40); // Default 40px
  const [iconPadding, setIconPadding] = useState(() => 8); // Default 8px padding

  // Helper function to resolve HSL variables to actual colors
  const resolveColor = (colorValue: string): string => {
    if (typeof window === 'undefined') return colorValue;

    try {
      if (colorValue.startsWith('hsl(var(')) {
        const varName = colorValue.match(/hsl\(var\((--[^)]+)\)/)?.[1];
        if (varName) {
          const hslValue = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
          if (hslValue) {
            // Parse HSL and convert to hex for more reliable rendering
            const match = hslValue.match(/(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%/);
            if (match) {
              const h = parseFloat(match[1]);
              const s = parseFloat(match[2]) / 100;
              const l = parseFloat(match[3]) / 100;

              const c = (1 - Math.abs(2 * l - 1)) * s;
              const x = c * (1 - Math.abs((h / 60) % 2 - 1));
              const m = l - c / 2;

              let r = 0, g = 0, b = 0;

              if (0 <= h && h < 60) {
                r = c; g = x; b = 0;
              } else if (60 <= h && h < 120) {
                r = x; g = c; b = 0;
              } else if (120 <= h && h < 180) {
                r = 0; g = c; b = x;
              } else if (180 <= h && h < 240) {
                r = 0; g = x; b = c;
              } else if (240 <= h && h < 300) {
                r = x; g = 0; b = c;
              } else if (300 <= h && h < 360) {
                r = c; g = 0; b = x;
              }

              r = Math.round((r + m) * 255);
              g = Math.round((g + m) * 255);
              b = Math.round((b + m) * 255);

              return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
            }
          }
        }
      }
      return colorValue;
    } catch (error) {
      console.warn('Error resolving color:', colorValue, error);
      return colorValue;
    }
  };

  // Effects to apply styles to the document
  useEffect(() => {
    document.documentElement.style.setProperty('--feature-icon-bg', bgColor);
  }, [bgColor]);

  useEffect(() => {
    document.documentElement.style.setProperty('--feature-icon-radius', `${radius}px`);
  }, [radius]);

  useEffect(() => {
    document.documentElement.style.setProperty('--feature-icon-text', iconColor);
  }, [iconColor]);

  useEffect(() => {
    document.documentElement.style.setProperty('--feature-icon-size', `${iconSize / 16}rem`);
  }, [iconSize]);

  useEffect(() => {
    document.documentElement.style.setProperty('--feature-icon-padding', `${iconPadding}px`);
  }, [iconPadding]);

  return (
    <div className="space-y-6">
      {/* Icon Preview Header */}
      <div className="bg-muted/30 p-4 rounded-lg border border-border">
        <div className="text-xs font-medium text-muted-foreground mb-3">Current Icon Preview</div>
        <div className="flex items-center justify-center gap-4">
          <div className="icon-container flex items-center justify-center" style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            borderRadius: `${radius}px`,
            backgroundColor: resolveColor(bgColor),
            color: resolveColor(iconColor),
            padding: `${iconPadding}px`
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={resolveColor(iconColor)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a10 10 0 0 1 10 10" />
              <path d="M12 12l-3-5" />
              <circle cx="12" cy="12" r="1" fill={resolveColor(iconColor)} />
            </svg>
          </div>
          <div className="icon-container flex items-center justify-center" style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            borderRadius: `${radius}px`,
            backgroundColor: resolveColor(bgColor),
            color: resolveColor(iconColor),
            padding: `${iconPadding}px`
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={resolveColor(iconColor)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9,22 9,12 15,12 15,22"/>
            </svg>
          </div>
          <div className="icon-container flex items-center justify-center" style={{
            width: `${iconSize}px`,
            height: `${iconSize}px`,
            borderRadius: `${radius}px`,
            backgroundColor: resolveColor(bgColor),
            color: resolveColor(iconColor),
            padding: `${iconPadding}px`
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={resolveColor(iconColor)} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
              <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Background Color */}
      <div>
        <label className="block small font-medium mb-2">
          Background Color
        </label>
        <ThemeColorPicker value={bgColor} onChange={setBgColor} />
      </div>

      {/* Icon Size */}
      <div>
        <label htmlFor="icon-size" className="block small font-medium mb-2">
          Icon Size: {iconSize}px
        </label>
        <input
          id="icon-size"
          type="range"
          min="24"
          max="80"
          value={iconSize}
          onChange={(e) => setIconSize(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Corner Radius */}
      <div>
        <label htmlFor="icon-radius" className="block small font-medium mb-2">
          Corner Radius: {radius}px
        </label>
        <input
          id="icon-radius"
          type="range"
          min="0"
          max="32"
          value={radius}
          onChange={(e) => setRadius(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Icon Padding */}
      <div>
        <label htmlFor="icon-padding" className="block small font-medium mb-2">
          Icon Padding: {iconPadding}px
        </label>
        <input
          id="icon-padding"
          type="range"
          min="0"
          max="20"
          value={iconPadding}
          onChange={(e) => setIconPadding(parseInt(e.target.value))}
          className="w-full"
        />
      </div>

      {/* Icon Color */}
      <div>
        <label className="block small font-medium mb-2">
          Icon Color
        </label>
        <ThemeColorPicker value={iconColor} onChange={setIconColor} />
      </div>
    </div>
  );
}
