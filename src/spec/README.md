# Styling System Documentation

## Overview

This directory contains comprehensive documentation for the landing page styling
system. It provides complete guidance for maintaining consistency across pages,
themes, and components.

## Documentation Structure

```
src/spec/
├── README.md                    # This file - System overview
├── SYSTEM_ARCHITECTURE.md         # Complete system architecture and connections
├── styling.md                     # Core styling rules and implementation patterns
└── DEVELOPMENT_GUIDES.md          # Step-by-step development guides
```

## Quick Start Guide

### For New Development

1. **Read SYSTEM_ARCHITECTURE.md** - Understand how pieces connect
2. **Read styling.md** - Learn core styling rules
3. **Use DEVELOPMENT_GUIDES.md** - Follow step-by-step guides

### For Theme Development

1. **Read SYSTEM_ARCHITECTURE.md** - Theme system flow
2. **Read styling.md** - Theme class requirements
3. **Use DEVELOPMENT_GUIDES.md** - New theme creation guide

### For Layout Changes

1. **Read SYSTEM_ARCHITECTURE.md** - Component dependencies
2. **Read styling.md** - Layout modification rules
3. **Use DEVELOPMENT_GUIDES.md** - Layout modification guide

### For Content Blocks

1. **Read SYSTEM_ARCHITECTURE.md** - Section integration points
2. **Read styling.md** - Section styling requirements
3. **Use DEVELOPMENT_GUIDES.md** - Content block addition guide

## Core Principles

### 1. Theme Classes Are Mandatory

- **ALL styled elements MUST use explicit theme classes**
- **NEVER rely on tag selectors alone for styling**
- **NO exceptions**: Tag-only styling is forbidden

### 2. CSS Variable System

- **Colors**: HSL format for Tailwind compatibility
- **Consumption**: Use `hsl(var(--variable-name))` in theme classes
- **Fallbacks**: Always provide default values in theme CSS

### 3. Responsive Design via CSS

- **Mobile variants**: Handled in theme CSS media queries
- **NO preview hacks**: Mobile variants handled in theme CSS only
- **Breakpoint**: 768px (mobile < 768px, desktop ≥ 768px)

### 4. Component Integration

- **Theme detection**: All pages must implement useEffect hook
- **PageTheme Manager**: Integration required for all pages
- **No inline styles**: Remove CSS variable injection and style attributes

## Critical Rules Summary

1. **Theme Classes Not Optional**: All themed elements MUST use explicit theme
   classes
2. **No Tag Selectors**: Never rely on `<h1>`, `<button>` tags alone for styling
3. **No Preview Hacks**: Mobile variants and responsive behavior in theme CSS
   only
4. **Reliable Loading**: Use data-theme attribute switching, not dynamic CSS
   loading
5. **UI Isolation**: Editor styles must not pollute preview content
6. **Exact CSS Matching**: Preview must render exactly what theme CSS defines
7. **Page Integration**: All pages must implement theme detection and
   persistence
8. **No Inline Styles**: Remove CSS variable injection and style attributes

## File Locations

### Configuration Files

- `src/routes.tsx` - Route configuration and theme providers
- `src/themes/index.ts` - Theme definitions and exports
- `src/themes/types.ts` - TypeScript type definitions
- `src/lib/pageThemeManager.ts` - Page-specific theme assignment

### Component Files

- `src/pages/` - Page components with theme integration
- `src/sections/` - Reusable section components
- `src/components/` - UI and layout components

### Style Files

- `src/styles/` - Theme-specific CSS files
- `src/style-editor/` - Style editor components

### Documentation Files

- `src/spec/` - All system documentation

## Development Workflow

### 1. Planning Phase

- Read relevant documentation
- Understand requirements and constraints
- Plan implementation approach

### 2. Development Phase

- Follow step-by-step guides exactly
- Use provided templates and patterns
- Test incrementally

### 3. Testing Phase

- Use provided QA checklists
- Test across all themes and devices
- Verify integration points

### 4. Review Phase

- Code review against guidelines
- Documentation updates if needed
- Team approval process

## Getting Help

### If You're Stuck

1. **Check documentation first** - Most answers are in these guides
2. **Review architecture** - SYSTEM_ARCHITECTURE.md shows connections
3. **Follow patterns** - Existing code provides working examples

### Common Issues

1. **Theme not applying** - Check useEffect implementation
2. **Styles not working** - Verify theme class usage
3. **Style Editor issues** - Check CSS imports and variable definitions
4. **Responsive problems** - Verify CSS media queries and theme variables

## Maintenance

### Keeping System Consistent

- **Always follow guides** - They're maintained with the system
- **Update documentation** - When patterns change, update guides
- **Test thoroughly** - Use provided checklists
- **Ask questions** - When unsure, consult documentation first

This documentation system ensures that anyone working on this codebase can:

- Understand the complete architecture
- Follow established patterns consistently
- Maintain theme system integrity
- Develop new features safely
- Keep the codebase maintainable

For specific implementation questions, refer to the detailed guides in
DEVELOPMENT_GUIDES.md.
