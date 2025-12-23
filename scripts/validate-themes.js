#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to find the CSS file in the dist/assets directory
const findCssFile = () => {
    const assetsDir = path.join(__dirname, '../dist/assets');
    if (!fs.existsSync(assetsDir)) {
        return null;
    }
    const files = fs.readdirSync(assetsDir);
    const cssFile = files.find(file => file.startsWith('app-') && file.endsWith('.css'));
    return cssFile ? { name: cssFile, path: path.join(assetsDir, cssFile) } : null;
};


const htmlPath = path.join(__dirname, '../dist/new-build-golf-properties-costa-blanca/index.html');

console.log('🔍 [ThemeValidator] Starting theme validation...');

const cssFileInfo = findCssFile();

if (!cssFileInfo) {
    console.error(`❌ [ThemeValidator] Could not find CSS file in dist/assets`);
    process.exit(1);
}

const cssPath = cssFileInfo.path;
const cssFileName = cssFileInfo.name;


// Validate CSS file exists and contains theme markers
if (fs.existsSync(cssPath)) {
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    
    const requiredThemes = ['golf', 'golf-elegant', 'midnight'];
    const foundThemes = [];
    
    for (const theme of requiredThemes) {
        const themeSelector = `[data-theme=${theme}]`;
        if (cssContent.includes(themeSelector)) {
            foundThemes.push(theme);
            console.log(`✅ [ThemeValidator] Found theme CSS for: ${theme}`);
        } else {
            console.error(`❌ [ThemeValidator] Missing theme CSS for: ${theme}`);
        }
    }
    
    if (foundThemes.length === requiredThemes.length) {
        console.log('✅ [ThemeValidator] All required themes found in CSS');
    } else {
        console.error(`❌ [ThemeValidator] Missing themes: ${requiredThemes.filter(t => !foundThemes.includes(t)).join(', ')}`);
        process.exit(1);
    }
} else {
    console.error(`❌ [ThemeValidator] CSS file not found: ${cssPath}`);
    process.exit(1);
}

// Validate HTML files reference CSS correctly
if (fs.existsSync(htmlPath)) {
    const htmlContent = fs.readFileSync(htmlPath, 'utf8');
    
    const expectedCssPathInHtml = path.join('/newbuilds/assets', cssFileName).replace(/\\/g, '/');

    if (htmlContent.includes(expectedCssPathInHtml)) {
        console.log('✅ [ThemeValidator] HTML correctly references CSS with base path');
    } else {
        console.error(`❌ [ThemeValidator] HTML does not reference CSS correctly. Expected to find ${expectedCssPathInHtml}`);
        process.exit(1);
    }
} else {
    console.error(`❌ [ThemeValidator] HTML file not found: ${htmlPath}`);
    process.exit(1);
}

console.log('🎉 [ThemeValidator] All theme validations passed!');