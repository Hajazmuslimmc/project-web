'use client'

import { useState } from 'react';

export default function ColorPaletteStudio() {
  const [baseColor, setBaseColor] = useState('#3B82F6');
  const [palette, setPalette] = useState<string[]>([]);
  const [paletteType, setPaletteType] = useState('complementary');
  const [copied, setCopied] = useState('');

  const generatePalette = () => {
    const colors = [];
    const hsl = hexToHsl(baseColor);
    
    switch (paletteType) {
      case 'complementary':
        colors.push(baseColor);
        colors.push(hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l));
        break;
      case 'triadic':
        colors.push(baseColor);
        colors.push(hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l));
        colors.push(hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l));
        break;
      case 'analogous':
        colors.push(hslToHex((hsl.h - 30) % 360, hsl.s, hsl.l));
        colors.push(baseColor);
        colors.push(hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l));
        break;
      case 'monochromatic':
        colors.push(hslToHex(hsl.h, hsl.s, Math.max(10, hsl.l - 30)));
        colors.push(hslToHex(hsl.h, hsl.s, Math.max(10, hsl.l - 15)));
        colors.push(baseColor);
        colors.push(hslToHex(hsl.h, hsl.s, Math.min(90, hsl.l + 15)));
        colors.push(hslToHex(hsl.h, hsl.s, Math.min(90, hsl.l + 30)));
        break;
      case 'tetradic':
        colors.push(baseColor);
        colors.push(hslToHex((hsl.h + 90) % 360, hsl.s, hsl.l));
        colors.push(hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l));
        colors.push(hslToHex((hsl.h + 270) % 360, hsl.s, hsl.l));
        break;
    }
    
    setPalette(colors);
  };

  const hexToHsl = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return { h: h * 360, s: s * 100, l: l * 100 };
  };

  const hslToHex = (h: number, s: number, l: number) => {
    h = ((h % 360) + 360) % 360;
    s = Math.max(0, Math.min(100, s)) / 100;
    l = Math.max(0, Math.min(100, l)) / 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) { r = c; g = x; b = 0; }
    else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
    else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
    else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
    else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
    else if (300 <= h && h < 360) { r = c; g = 0; b = x; }

    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const copyColor = async (color: string) => {
    await navigator.clipboard.writeText(color);
    setCopied(color);
    setTimeout(() => setCopied(''), 2000);
  };

  const exportPalette = () => {
    const css = palette.map((color, i) => `--color-${i + 1}: ${color};`).join('\n');
    const blob = new Blob([`:root {\n${css}\n}`], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'palette.css';
    a.click();
  };

  const randomColor = () => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'];
    setBaseColor(colors[Math.floor(Math.random() * colors.length)]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            🎨 Color Palette Studio
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Create beautiful color palettes for your designs
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Base Color
              </label>
              <div className="flex gap-2">
                <input
                  type="color"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="w-16 h-10 border border-gray-300 rounded cursor-pointer"
                />
                <input
                  type="text"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Palette Type
              </label>
              <select
                value={paletteType}
                onChange={(e) => setPaletteType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="complementary">Complementary</option>
                <option value="triadic">Triadic</option>
                <option value="analogous">Analogous</option>
                <option value="monochromatic">Monochromatic</option>
                <option value="tetradic">Tetradic</option>
              </select>
            </div>

            <div className="flex flex-col justify-end gap-2">
              <button
                onClick={randomColor}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700 transition-colors"
              >
                Random Color
              </button>
              <button
                onClick={generatePalette}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-semibold"
              >
                Generate Palette
              </button>
            </div>
          </div>

          {/* Palette Display */}
          {palette.length > 0 && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Generated Palette
                </h3>
                <button
                  onClick={exportPalette}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                >
                  Export CSS
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {palette.map((color, index) => (
                  <div
                    key={index}
                    className="group cursor-pointer"
                    onClick={() => copyColor(color)}
                  >
                    <div
                      className="w-full h-24 rounded-lg shadow-md group-hover:scale-105 transition-transform"
                      style={{ backgroundColor: color }}
                    />
                    <div className="mt-2 text-center">
                      <p className="text-sm font-mono text-gray-700 dark:text-gray-300">
                        {color.toUpperCase()}
                      </p>
                      {copied === color && (
                        <p className="text-xs text-green-600">Copied!</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Color Theory Info */}
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
              Palette Types:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800 dark:text-blue-300">
              <div>
                <strong>Complementary:</strong> Colors opposite on the color wheel
              </div>
              <div>
                <strong>Triadic:</strong> Three colors evenly spaced
              </div>
              <div>
                <strong>Analogous:</strong> Adjacent colors on the wheel
              </div>
              <div>
                <strong>Monochromatic:</strong> Different shades of one color
              </div>
              <div>
                <strong>Tetradic:</strong> Four colors forming a rectangle
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <a
            href="/"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
          >
            ← Back to Tools
          </a>
        </div>
      </div>
    </div>
  );
}