interface ThemeColorPickerProps {
  value: string;
  onChange: (color: string) => void;
}

const themeColorNames = [
  'primary',
  'primary-foreground',
  'secondary',
  'secondary-foreground',
  'accent',
  'accent-foreground',
  'muted',
  'muted-foreground',
  'background',
  'foreground',
  'card',
  'card-foreground',
  'border',
  'destructive',
];

export function ThemeColorPicker({ value, onChange }: ThemeColorPickerProps) {
  // Helper function to resolve CSS variable to actual hex value
  const resolveColorValue = (colorVar: string): string => {
    if (typeof window === 'undefined') return '#000000';

    try {
      // If it's already a hex color, return it
      if (colorVar.startsWith('#')) {
        return colorVar;
      }

      // If it's a CSS variable reference, resolve it
      if (colorVar.startsWith('hsl(var(')) {
        const varName = colorVar.match(/hsl\(var\((--[^)]+)\)/)?.[1];
        if (varName) {
          const hslValue = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
          if (hslValue) {
            // Convert HSL to RGB then to hex
            return hslToHex(hslValue);
          }
        }
      }

      // Fallback to a default color
      return '#10b981'; // Default green
    } catch (error) {
      console.warn('Error resolving color value:', colorVar, error);
      return '#10b981';
    }
  };

  // Convert HSL string to hex
  const hslToHex = (hsl: string): string => {
    try {
      // Parse HSL values like "142.1 76.2% 36.3%"
      const match = hsl.match(/(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%/);
      if (!match) return '#10b981';

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
    } catch (error) {
      console.warn('Error converting HSL to hex:', hsl, error);
      return '#10b981';
    }
  };

  return (
    <div className="grid grid-cols-7 gap-2">
      {themeColorNames.map((name) => {
        const colorVar = `hsl(var(--${name}))`;
        const resolvedColor = resolveColorValue(colorVar);
        const isActive = value === colorVar || value === resolvedColor;

        return (
          <button
            key={name}
            type="button"
            onClick={() => onChange(colorVar)}
            className={`w-full aspect-square rounded-md border-2 ${isActive ? 'border-ring' : 'border-transparent'}`}
            style={{ backgroundColor: resolvedColor }}
            aria-label={`Select ${name} color`}
          />
        );
      })}
    </div>
  );
}
