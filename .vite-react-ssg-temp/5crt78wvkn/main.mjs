import { Head, ViteReactSSG } from "vite-react-ssg";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useState, useEffect, useCallback, Suspense } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";
import { Globe, Menu, Check, Maximize2, X, ChevronLeft, ChevronRight, Sun, Waves, Bed, Bath, Ruler, Home, MapPin, Calendar, ShoppingBag, Coffee, Plane, ArrowRight, Settings, RotateCcw, Settings2, Type, Download } from "lucide-react";
import { useLocation, Link, Outlet } from "react-router-dom";
import { useTranslation, Trans, initReactI18next } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import i18n from "i18next";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function Container({ className, children, ...props }) {
  return /* @__PURE__ */ jsx("div", { className: cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className), ...props, children });
}
const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return /* @__PURE__ */ jsx(
      "button",
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";
function LanguageSwitcher() {
  const { i18n: i18n2 } = useTranslation();
  const changeLanguage = (lng) => {
    i18n2.changeLanguage(lng);
  };
  const languages = [
    { code: "en", name: "EN", flag: "🇬🇧" },
    { code: "fr", name: "FR", flag: "🇫🇷" }
  ];
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1 bg-muted/50 p-1 rounded-lg border border-border/50", children: [
    /* @__PURE__ */ jsx("div", { className: "px-2 text-muted-foreground", children: /* @__PURE__ */ jsx(Globe, { className: "h-3.5 w-3.5" }) }),
    languages.map((lang) => /* @__PURE__ */ jsx(
      Button,
      {
        variant: i18n2.language === lang.code ? "secondary" : "ghost",
        size: "sm",
        onClick: () => changeLanguage(lang.code),
        className: `h-7 px-2 text-[10px] font-bold transition-all ${i18n2.language === lang.code ? "bg-white text-foreground" : "text-muted-foreground hover:text-foreground"}`,
        children: lang.name
      },
      lang.code
    ))
  ] });
}
function Navbar({ data }) {
  const [isOpen, setIsOpen] = useState(false);
  const { name: name2 } = data;
  const contactSection = data.sections.find((s) => s.type === "contact" && s.enabled);
  const contactCta = contactSection?.cta;
  const homePath = data.id === "sunny-hills" ? "/" : data.id === "costa-blanca" ? "/new-build-golf-properties-costa-blanca" : `/developments/${data.id}`;
  const location2 = useLocation();
  const handleLogoClick = (e) => {
    if (location2.pathname === homePath) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return /* @__PURE__ */ jsxs("nav", { className: "navbar", children: [
    /* @__PURE__ */ jsxs(Container, { className: "navbar-container", children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: homePath,
          className: "site-title",
          onClick: handleLogoClick,
          children: name2
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center gap-6", children: [
        data.sections.filter((s) => s.enabled && s.type !== "hero").map((section) => /* @__PURE__ */ jsx(
          "a",
          {
            href: `#${section.id}`,
            className: "nav-link",
            children: section.title || section.type
          },
          section.id
        )),
        contactCta && /* @__PURE__ */ jsx(Button, { asChild: true, className: "btn-primary", children: /* @__PURE__ */ jsx("a", { href: contactCta.href, children: contactCta.label }) }),
        /* @__PURE__ */ jsx("div", { className: "border-l border-border h-6 mx-4", children: /* @__PURE__ */ jsx(LanguageSwitcher, {}) })
      ] }),
      /* @__PURE__ */ jsx(Button, { asChild: true, className: "btn-ghost mobile-menu-btn md:hidden", onClick: () => setIsOpen(!isOpen), children: /* @__PURE__ */ jsx(Menu, { className: "h-5 w-5" }) })
    ] }),
    isOpen && /* @__PURE__ */ jsxs("div", { className: "mobile-menu md:hidden border-t p-4 space-y-4", children: [
      data.sections.filter((s) => s.enabled && s.type !== "hero").map((section) => /* @__PURE__ */ jsx(
        "a",
        {
          href: `#${section.id}`,
          className: "mobile-menu-links block",
          onClick: () => setIsOpen(false),
          children: section.title || section.type
        },
        section.id
      )),
      contactCta && /* @__PURE__ */ jsx(Button, { className: "btn-primary w-full", asChild: true, children: /* @__PURE__ */ jsx("a", { href: contactCta.href, children: contactCta.label }) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center pt-2", children: /* @__PURE__ */ jsx(LanguageSwitcher, {}) })
    ] })
  ] });
}
function Footer({ data }) {
  const homePath = data.id === "sunny-hills" ? "/" : data.id === "costa-blanca" ? "/new-build-golf-properties-costa-blanca" : `/developments/${data.id}`;
  const location2 = useLocation();
  const handleLogoClick = (e) => {
    if (location2.pathname === homePath) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return /* @__PURE__ */ jsx("footer", { className: "bg-muted py-12", children: /* @__PURE__ */ jsxs(Container, { className: "flex flex-col md:flex-row justify-between items-center gap-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: homePath,
          className: "font-bold text-lg hover:text-primary transition-colors",
          onClick: handleLogoClick,
          children: data.name
        }
      ),
      /* @__PURE__ */ jsxs("p", { className: "small", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " ",
        data.name,
        ". All rights reserved."
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex gap-6 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-foreground", children: "Privacy Policy" }),
      /* @__PURE__ */ jsx("a", { href: "#", className: "hover:text-foreground", children: "Terms of Service" })
    ] })
  ] }) });
}
function resolveAsset(pathFromPublic) {
  if (!pathFromPublic.startsWith("/")) {
    console.warn(`[resolveAsset] Path should start with a '/', but got: ${pathFromPublic}`);
    pathFromPublic = `/${pathFromPublic}`;
  }
  return `${"/newbuilds/".replace(/\/$/, "")}${pathFromPublic}`;
}
function HeroSection({ data }) {
  if (!data.enabled) return null;
  return /* @__PURE__ */ jsxs("div", { className: "relative min-h-[80vh] flex items-center justify-center overflow-hidden", children: [
    data.media && typeof data.media === "string" && /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
      /* @__PURE__ */ jsx("img", { src: resolveAsset(data.media), alt: data.title, className: "w-full h-full object-cover" }),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/40" })
    ] }),
    /* @__PURE__ */ jsxs(Container, { className: "relative z-10 text-center text-primary-foreground", children: [
      /* @__PURE__ */ jsx("h1", { className: "h1 mb-6", children: data.title }),
      data.subtitle && /* @__PURE__ */ jsx("p", { className: "body-l mb-8 max-w-2xl mx-auto", children: data.subtitle }),
      data.cta && /* @__PURE__ */ jsx(Button, { asChild: true, className: "btn-primary", children: /* @__PURE__ */ jsx("a", { href: data.cta.href, children: data.cta.label }) })
    ] })
  ] });
}
function Section({ className, container = true, children, ...props }) {
  const content = container ? /* @__PURE__ */ jsx(Container, { children }) : children;
  return /* @__PURE__ */ jsx("section", { className: cn("py-16 md:py-24", className), ...props, children: content });
}
const Card$1 = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "rounded-xl border bg-card text-card-foreground",
      className
    ),
    ...props
  }
));
Card$1.displayName = "Card";
const CardHeader = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex flex-col space-y-1.5 p-6", className),
    ...props
  }
));
CardHeader.displayName = "CardHeader";
const CardTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "h3",
  {
    ref,
    className: cn("font-semibold leading-none tracking-tight", className),
    ...props
  }
));
CardTitle.displayName = "CardTitle";
const CardDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "p",
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
CardDescription.displayName = "CardDescription";
const CardContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("p-6 pt-0", className), ...props }));
CardContent.displayName = "CardContent";
const CardFooter = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn("flex items-center p-6 pt-0", className),
    ...props
  }
));
CardFooter.displayName = "CardFooter";
function FeaturesSection({ data }) {
  if (!data.enabled) return null;
  return /* @__PURE__ */ jsx(Section, { id: data.id, children: /* @__PURE__ */ jsxs(Container, { children: [
    /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
      /* @__PURE__ */ jsx("h2", { className: "h2 mb-4", children: data.title }),
      data.subtitle && /* @__PURE__ */ jsx("p", { className: "body text-muted-foreground", children: data.subtitle })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "features-grid", children: data.items?.map((item, idx) => /* @__PURE__ */ jsx(Card$1, { children: /* @__PURE__ */ jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-4 mb-2", children: [
        /* @__PURE__ */ jsx("div", { className: "feature-icon", children: /* @__PURE__ */ jsx(Check, { className: "h-5 w-5" }) }),
        /* @__PURE__ */ jsx(CardTitle, { children: item.title })
      ] }),
      /* @__PURE__ */ jsx(CardDescription, { className: "body", children: item.description })
    ] }) }, idx)) })
  ] }) });
}
function ContactSection({ data }) {
  if (!data.enabled) return null;
  return /* @__PURE__ */ jsx(Section, { id: data.id, className: "bg-primary text-primary-foreground", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
    /* @__PURE__ */ jsx("h2", { className: "h2 mb-4", children: data.title }),
    data.subtitle && /* @__PURE__ */ jsx("p", { className: "body text-primary-foreground/80 mb-8 max-w-2xl mx-auto", children: data.subtitle }),
    data.cta && /* @__PURE__ */ jsx(Button, { className: "btn-secondary", asChild: true, children: /* @__PURE__ */ jsx("a", { href: data.cta.href, children: data.cta.label }) })
  ] }) }) });
}
function resolveTheme(metadata) {
  if (metadata?.theme && themes[metadata.theme]) {
    console.log(`🎨 [ThemeResolver] Using explicit theme: "${metadata.theme}"`);
    return metadata.theme;
  }
  if (typeof window !== "undefined") {
    const currentPath = window.location.pathname;
    try {
      const assignments = JSON.parse(localStorage.getItem("pageThemeAssignments") || "[]");
      const savedAssignment = assignments.find((a) => {
        const isGolfPropertiesPage = (path) => path.includes("new-build-golf-properties-costa-blanca");
        if (isGolfPropertiesPage(a.pagePath) && isGolfPropertiesPage(currentPath)) {
          return true;
        }
        return a.pagePath === currentPath;
      });
      if (savedAssignment && savedAssignment.themeId && themes[savedAssignment.themeId]) {
        console.log(`🎨 [ThemeResolver] Using saved theme: "${savedAssignment.themeId}" for path "${currentPath}"`);
        return savedAssignment.themeId;
      }
    } catch (error) {
      console.warn(`🎨 [ThemeResolver] Error reading saved theme:`, error);
    }
  }
  console.log(`🎨 [ThemeResolver] Using default theme: "${DEFAULT_THEME}"`);
  return DEFAULT_THEME;
}
function validateThemeCSS(themeKey) {
  if (typeof document === "undefined") return false;
  try {
    const testElement = document.createElement("div");
    testElement.style.display = "none";
    testElement.setAttribute("data-theme", themeKey);
    document.body.appendChild(testElement);
    const computedStyle = getComputedStyle(testElement);
    const primaryColor = computedStyle.getPropertyValue("--primary");
    document.body.removeChild(testElement);
    if (primaryColor && primaryColor.trim() !== "") {
      console.log(`✅ [ThemeResolver] Theme CSS validation passed for "${themeKey}"`);
      return true;
    } else {
      console.warn(`⚠️ [ThemeResolver] Theme CSS validation failed for "${themeKey}" - CSS variables not available`);
      return false;
    }
  } catch (error) {
    console.warn(`⚠️ [ThemeResolver] Theme CSS validation error for "${themeKey}":`, error);
    return false;
  }
}
function applyTheme(themeKey) {
  console.log(`🎨 [ThemeResolver] Attempting to apply theme: "${themeKey}"`);
  const theme = themes[themeKey];
  if (!theme) {
    console.warn(`⚠️ [ThemeResolver] Theme "${themeKey}" not found, applying default theme "${DEFAULT_THEME}"`);
    themeKey = DEFAULT_THEME;
  }
  const finalTheme = themes[themeKey];
  if (!finalTheme) {
    console.error(`❌ [ThemeResolver] Default theme "${DEFAULT_THEME}" not found`);
    return;
  }
  if (typeof document !== "undefined" && document.documentElement) {
    const previousTheme = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", themeKey);
    console.log(`✅ [ThemeResolver] Theme applied: "${themeKey}" (previous: "${previousTheme}")`);
    setTimeout(() => {
      const currentTheme = document.documentElement.getAttribute("data-theme");
      const cssValid = validateThemeCSS(themeKey);
      if (currentTheme === themeKey && cssValid) {
        console.log(`✅ [ThemeResolver] Theme application successful: "${currentTheme}"`);
      } else {
        console.error(`❌ [ThemeResolver] Theme application failed. Expected "${themeKey}", got "${currentTheme}", CSS valid: ${cssValid}`);
      }
    }, 100);
  } else {
    console.warn(`⚠️ [ThemeResolver] Document not available for theme application`);
  }
}
const DEFAULT_THEME = "golf";
const themes = {
  golf: {
    id: "golf",
    name: "Golf",
    colors: {
      "--primary": "#10b981",
      "--primary-foreground": "#ffffff",
      "--secondary": "#f1f5f9",
      "--secondary-foreground": "#0f172a",
      "--accent": "#f1f5f9",
      "--accent-foreground": "#0f172a",
      "--muted": "#f1f5f9",
      "--muted-foreground": "#64748b",
      "--background": "#ffffff",
      "--foreground": "#0f172a",
      "--card": "#ffffff",
      "--card-foreground": "#0f172a",
      "--popover": "#ffffff",
      "--popover-foreground": "#0f172a",
      "--border": "#f1f5f9",
      "--input": "#f1f5f9",
      "--ring": "#0f172a",
      "--radius": "0.5rem",
      "--destructive": "#ef4444",
      "--destructive-foreground": "#ffffff"
    },
    baseTypo: {
      fontSize: "16px",
      fontFamily: "ui-sans-serif, system-ui, sans-serif"
    },
    elementStyles: {
      h1: { size: "3.75rem", weight: "700", lineHeight: "1", letterSpacing: "-0.02em" },
      h2: { size: "3rem", weight: "700", lineHeight: "1", letterSpacing: "-0.01em" },
      h3: { size: "1.875rem", weight: "700", lineHeight: "2.25rem", letterSpacing: "0" },
      body: { size: "1rem", weight: "400", lineHeight: "1.5rem", letterSpacing: "0" },
      "body-l": { size: "1.25rem", weight: "400", lineHeight: "1.6rem", letterSpacing: "0" },
      small: { size: "0.875rem", weight: "400", lineHeight: "1.5", letterSpacing: "0.01em" },
      caption: { size: "0.75rem", weight: "400", lineHeight: "1.4", letterSpacing: "0.02em" },
      "btn-primary": { bg: "var(--primary)", text: "var(--primary-foreground)", radius: "9999px", px: "1.5rem", py: "0.625rem", weight: "700" },
      "btn-secondary": { bg: "var(--secondary)", text: "var(--secondary-foreground)", radius: "9999px", px: "2rem", py: "0.75rem", weight: "700" },
      "btn-outline": { bg: "transparent", text: "var(--primary)", radius: "9999px", px: "2rem", py: "0.75rem", border: "var(--border)", weight: "700" },
      "btn-ghost": { bg: "transparent", text: "var(--primary)", radius: "9999px", px: "2rem", py: "0.75rem", weight: "700" },
      "link-std": { text: "var(--primary)", weight: "500", under: "underline" },
      "link-bold": { text: "var(--primary)", weight: "700", under: "none" },
      "site-title": { size: "1.25rem", weight: "700", lineHeight: "1.2", letterSpacing: "-0.01em" },
      "mobile-menu-btn": { size: "0.875rem", weight: "600", lineHeight: "1.4", letterSpacing: "0.01em" },
      "mobile-menu-links": { size: "1rem", weight: "500", lineHeight: "1.5", letterSpacing: "0" },
      "gallery-tab-container": {
        bg: "var(--muted)",
        px: "0.25rem",
        py: "0.25rem",
        radius: "0.75rem",
        gap: "0.25rem"
      },
      "gallery-tab": {
        px: "1.5rem",
        py: "0.625rem",
        radius: "0.5rem",
        weight: "600",
        size: "0.875rem",
        letterSpacing: "0.025em",
        bg: "transparent",
        text: "var(--muted-foreground)",
        hoverBg: "var(--background)",
        hoverText: "var(--foreground)",
        activeBg: "var(--background)",
        activeText: "var(--primary)",
        transition: "200ms"
      }
    }
  },
  "golf-elegant": {
    id: "golf-elegant",
    name: "Golf Elegant",
    colors: {
      "--primary": "#10b981",
      "--primary-foreground": "#ffffff",
      "--secondary": "#f1f5f9",
      "--secondary-foreground": "#0f172a",
      "--accent": "#f1f5f9",
      "--accent-foreground": "#0f172a",
      "--muted": "#f1f5f9",
      "--muted-foreground": "#64748b",
      "--background": "#ffffff",
      "--foreground": "#0f172a",
      "--card": "#ffffff",
      "--card-foreground": "#0f172a",
      "--popover": "#ffffff",
      "--popover-foreground": "#0f172a",
      "--border": "#f1f5f9",
      "--input": "#f1f5f9",
      "--ring": "#0f172a",
      "--radius": "0.5rem",
      "--destructive": "#ef4444",
      "--destructive-foreground": "#ffffff"
    },
    baseTypo: {
      fontSize: "16px",
      fontFamily: "ui-sans-serif, system-ui, sans-serif"
    },
    elementStyles: {
      h1: { size: "3.75rem", weight: "700", lineHeight: "1", letterSpacing: "-0.02em" },
      h2: { size: "3rem", weight: "700", lineHeight: "1", letterSpacing: "-0.01em" },
      h3: { size: "1.875rem", weight: "700", lineHeight: "2.25rem", letterSpacing: "0" },
      body: { size: "1rem", weight: "400", lineHeight: "1.5rem", letterSpacing: "0" },
      "body-l": { size: "1.25rem", weight: "400", lineHeight: "1.6rem", letterSpacing: "0" },
      small: { size: "0.875rem", weight: "400", lineHeight: "1.5", letterSpacing: "0.01em" },
      caption: { size: "0.75rem", weight: "400", lineHeight: "1.4", letterSpacing: "0.02em" },
      "btn-primary": { bg: "var(--primary)", text: "var(--primary-foreground)", radius: "9999px", px: "1.5rem", py: "0.625rem", weight: "700" },
      "btn-secondary": { bg: "var(--secondary)", text: "var(--secondary-foreground)", radius: "9999px", px: "2rem", py: "0.75rem", weight: "700" },
      "btn-outline": { bg: "transparent", text: "var(--primary)", radius: "9999px", px: "2rem", py: "0.75rem", border: "var(--border)", weight: "700" },
      "btn-ghost": { bg: "transparent", text: "var(--primary)", radius: "9999px", px: "2rem", py: "0.75rem", weight: "700" },
      "link-std": { text: "var(--primary)", weight: "500", under: "underline" },
      "link-bold": { text: "var(--primary)", weight: "700", under: "none" },
      "site-title": { size: "1.25rem", weight: "700", lineHeight: "1.2", letterSpacing: "-0.01em" },
      "mobile-menu-btn": { size: "0.875rem", weight: "600", lineHeight: "1.4", letterSpacing: "0.01em" },
      "mobile-menu-links": { size: "1rem", weight: "500", lineHeight: "1.5", letterSpacing: "0" },
      "gallery-tab-container": {
        bg: "var(--muted)",
        px: "0.25rem",
        py: "0.25rem",
        radius: "0.75rem",
        gap: "0.25rem"
      },
      "gallery-tab": {
        px: "1.5rem",
        py: "0.625rem",
        radius: "0.5rem",
        weight: "600",
        size: "0.875rem",
        letterSpacing: "0.025em",
        bg: "transparent",
        text: "var(--muted-foreground)",
        hoverBg: "var(--background)",
        hoverText: "var(--foreground)",
        activeBg: "var(--background)",
        activeText: "var(--primary)",
        transition: "200ms"
      }
    }
  },
  "golf-modern": {
    id: "golf-modern",
    name: "Golf Modern",
    colors: {
      "--primary": "#10b981",
      "--primary-foreground": "#ffffff",
      "--secondary": "#f1f5f9",
      "--secondary-foreground": "#0f172a",
      "--accent": "#f1f5f9",
      "--accent-foreground": "#0f172a",
      "--muted": "#f1f5f9",
      "--muted-foreground": "#64748b",
      "--background": "#ffffff",
      "--foreground": "#0f172a",
      "--card": "#ffffff",
      "--card-foreground": "#0f172a",
      "--popover": "#ffffff",
      "--popover-foreground": "#0f172a",
      "--border": "#f1f5f9",
      "--input": "#f1f5f9",
      "--ring": "#0f172a",
      "--radius": "0.5rem",
      "--destructive": "#ef4444",
      "--destructive-foreground": "#ffffff"
    },
    baseTypo: {
      fontSize: "16px",
      fontFamily: "ui-sans-serif, system-ui, sans-serif"
    },
    elementStyles: {
      h1: { size: "3.75rem", weight: "700", lineHeight: "1", letterSpacing: "-0.02em" },
      h2: { size: "3rem", weight: "700", lineHeight: "1", letterSpacing: "-0.01em" },
      h3: { size: "1.875rem", weight: "700", lineHeight: "2.25rem", letterSpacing: "0" },
      body: { size: "1rem", weight: "400", lineHeight: "1.5rem", letterSpacing: "0" },
      "body-l": { size: "1.25rem", weight: "400", lineHeight: "1.6rem", letterSpacing: "0" },
      small: { size: "0.875rem", weight: "400", lineHeight: "1.5", letterSpacing: "0.01em" },
      caption: { size: "0.75rem", weight: "400", lineHeight: "1.4", letterSpacing: "0.02em" },
      "btn-primary": { bg: "var(--primary)", text: "var(--primary-foreground)", radius: "9999px", px: "1.5rem", py: "0.625rem", weight: "700" },
      "btn-secondary": { bg: "var(--secondary)", text: "var(--secondary-foreground)", radius: "9999px", px: "2rem", py: "0.75rem", weight: "700" },
      "btn-outline": { bg: "transparent", text: "var(--primary)", radius: "9999px", px: "2rem", py: "0.75rem", border: "var(--border)", weight: "700" },
      "btn-ghost": { bg: "transparent", text: "var(--primary)", radius: "9999px", px: "2rem", py: "0.75rem", weight: "700" },
      "link-std": { text: "var(--primary)", weight: "500", under: "underline" },
      "link-bold": { text: "var(--primary)", weight: "700", under: "none" },
      "site-title": { size: "1.25rem", weight: "700", lineHeight: "1.2", letterSpacing: "-0.01em" },
      "mobile-menu-btn": { size: "0.875rem", weight: "600", lineHeight: "1.4", letterSpacing: "0.01em" },
      "mobile-menu-links": { size: "1rem", weight: "500", lineHeight: "1.5", letterSpacing: "0" },
      "gallery-tab-container": {
        bg: "var(--muted)",
        px: "0.25rem",
        py: "0.25rem",
        radius: "0.75rem",
        gap: "0.25rem"
      },
      "gallery-tab": {
        px: "1.5rem",
        py: "0.625rem",
        radius: "0.5rem",
        weight: "600",
        size: "0.875rem",
        letterSpacing: "0.025em",
        bg: "transparent",
        text: "var(--muted-foreground)",
        hoverBg: "var(--background)",
        hoverText: "var(--foreground)",
        activeBg: "var(--background)",
        activeText: "var(--primary)",
        transition: "200ms"
      }
    }
  },
  midnight: {
    id: "midnight",
    name: "Midnight",
    colors: {
      "--primary": "#8b5cf6",
      "--primary-foreground": "#ffffff",
      "--secondary": "#1e293b",
      "--secondary-foreground": "#e2e8f0",
      "--accent": "#312e81",
      "--accent-foreground": "#e2e8f0",
      "--muted": "#1e293b",
      "--muted-foreground": "#94a3b8",
      "--background": "#0f172a",
      "--foreground": "#e2e8f0",
      "--card": "#1e293b",
      "--card-foreground": "#e2e8f0",
      "--popover": "#1e293b",
      "--popover-foreground": "#e2e8f0",
      "--border": "#334155",
      "--input": "#1e293b",
      "--ring": "#8b5cf6",
      "--radius": "0.5rem",
      "--destructive": "#ef4444",
      "--destructive-foreground": "#ffffff"
    },
    baseTypo: {
      fontSize: "16px",
      fontFamily: "ui-sans-serif, system-ui, sans-serif"
    },
    elementStyles: {
      h1: { size: "3.75rem", weight: "700", lineHeight: "1", letterSpacing: "-0.02em" },
      h2: { size: "3rem", weight: "700", lineHeight: "1", letterSpacing: "-0.01em" },
      h3: { size: "1.875rem", weight: "700", lineHeight: "2.25rem", letterSpacing: "0" },
      body: { size: "1rem", weight: "400", lineHeight: "1.5rem", letterSpacing: "0" },
      "body-l": { size: "1.25rem", weight: "400", lineHeight: "1.6rem", letterSpacing: "0" },
      small: { size: "0.875rem", weight: "400", lineHeight: "1.5", letterSpacing: "0.01em" },
      caption: { size: "0.75rem", weight: "400", lineHeight: "1.4", letterSpacing: "0.02em" },
      "btn-primary": { bg: "var(--primary)", text: "var(--primary-foreground)", radius: "9999px", px: "1.5rem", py: "0.625rem", weight: "700" },
      "btn-secondary": { bg: "var(--secondary)", text: "var(--secondary-foreground)", radius: "9999px", px: "2rem", py: "0.75rem", weight: "700" },
      "btn-outline": { bg: "transparent", text: "var(--primary)", radius: "9999px", px: "2rem", py: "0.75rem", border: "var(--border)", weight: "700" },
      "btn-ghost": { bg: "transparent", text: "var(--primary)", radius: "9999px", px: "2rem", py: "0.75rem", weight: "700" },
      "link-std": { text: "var(--primary)", weight: "500", under: "underline" },
      "link-bold": { text: "var(--primary)", weight: "700", under: "none" },
      "site-title": { size: "1.25rem", weight: "700", lineHeight: "1.2", letterSpacing: "-0.01em" },
      "mobile-menu-btn": { size: "0.875rem", weight: "600", lineHeight: "1.4", letterSpacing: "0.01em" },
      "mobile-menu-links": { size: "1rem", weight: "500", lineHeight: "1.5", letterSpacing: "0" },
      "gallery-tab-container": {
        bg: "var(--muted)",
        px: "0.25rem",
        py: "0.25rem",
        radius: "0.75rem",
        gap: "0.25rem"
      },
      "gallery-tab": {
        px: "1.5rem",
        py: "0.625rem",
        radius: "0.5rem",
        weight: "600",
        size: "0.875rem",
        letterSpacing: "0.025em",
        bg: "transparent",
        text: "var(--muted-foreground)",
        hoverBg: "var(--background)",
        hoverText: "var(--foreground)",
        activeBg: "var(--background)",
        activeText: "var(--primary)",
        transition: "200ms"
      }
    }
  }
};
const extractPagesFromRoutes = () => {
  const pages = [];
  const processRoute = (route, parentPath = "") => {
    const fullPathWithTrailing = parentPath + route.path;
    const fullPath = fullPathWithTrailing.endsWith("/") && fullPathWithTrailing.length > 1 ? fullPathWithTrailing.slice(0, -1) : fullPathWithTrailing;
    if (route.path === "*" || route.path === void 0 || route.element?.type?.name === "RootLayout" || fullPath === "style-editor") {
      return;
    }
    if (route.index === true && parentPath === "") {
      pages.push({
        path: "/",
        name: "Home"
      });
      return;
    }
    let name2 = "";
    if (fullPath === "/") {
      name2 = "Home";
    } else if (fullPath.includes("new-build-golf-properties-costa-blanca")) {
      const themeName = route.element?.props?.routeTheme;
      if (themeName) {
        name2 = themeName.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
      } else {
        name2 = "Golf Properties";
      }
    } else if (fullPath.includes("style-editor")) {
      name2 = "Style Editor";
    } else if (fullPath.includes("developments/")) {
      const devId = fullPath.split("developments/")[1];
      if (devId) {
        name2 = devId.charAt(0).toUpperCase() + devId.slice(1);
      }
    } else {
      const parts = fullPath.split("/").filter(Boolean);
      name2 = parts.map(
        (part) => part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " ")
      ).join(" ");
    }
    if (name2) {
      let currentTheme;
      if (route.element && route.element.type?.name === "ThemeProvider" && route.element.props.routeTheme) {
        currentTheme = route.element.props.routeTheme;
      }
      pages.push({
        path: fullPath,
        name: name2,
        currentTheme
      });
    }
    if (route.children && Array.isArray(route.children)) {
      route.children.forEach((child) => processRoute(child, fullPathWithTrailing));
    }
  };
  routes.forEach((route) => {
    if (route.children && Array.isArray(route.children)) {
      route.children.forEach((child) => processRoute(child, route.path || ""));
    }
  });
  return pages;
};
const getAvailableThemes = () => {
  return Object.entries(themes).map(([id2, theme]) => ({
    id: id2,
    name: theme.name
  }));
};
const isCurrentPage = (pagePath) => {
  const currentPath = window.location.pathname.replace(/^\/|\/$/g, "");
  const normalizedPagePath = pagePath.replace(/\/$/, "");
  console.log(`🎨 [PageThemeManager] Checking if current path "${currentPath}" matches saved path "${normalizedPagePath}"`);
  if (normalizedPagePath === "" && currentPath === "") {
    console.log(`🎨 [PageThemeManager] Root path match`);
    return true;
  }
  if (currentPath === normalizedPagePath) {
    console.log(`🎨 [PageThemeManager] Exact match found`);
    return true;
  }
  const isGolfPropertiesPage = (path) => path.includes("new-build-golf-properties-costa-blanca");
  if (isGolfPropertiesPage(normalizedPagePath) && isGolfPropertiesPage(currentPath)) {
    console.log(`🎨 [PageThemeManager] Golf Properties page group match`);
    return true;
  }
  console.log(`🎨 [PageThemeManager] No match found`);
  return false;
};
const applyThemeToPage = (pagePath, themeId) => {
  const assignments = getPageThemeAssignments();
  const existingIndex = assignments.findIndex((a) => a.pagePath === pagePath);
  if (existingIndex >= 0) {
    assignments[existingIndex].themeId = themeId;
  } else {
    assignments.push({ pagePath, themeId });
  }
  localStorage.setItem("pageThemeAssignments", JSON.stringify(assignments));
  if (isCurrentPage(pagePath)) {
    applyTheme(themeId);
    console.log(`✅ Applied theme "${themeId}" to current page "${pagePath}"`);
  } else {
    console.log(`📝 Assigned theme "${themeId}" to "${pagePath}" (navigate to see effect)`);
  }
};
const getPageThemeAssignments = () => {
  try {
    const stored = localStorage.getItem("pageThemeAssignments");
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};
const getPageTheme = (pagePath) => {
  console.log(`[getPageTheme] Input path: "${pagePath}"`);
  const normalizedPath = pagePath.replace(/^\/|\/$/g, "");
  console.log(`[getPageTheme] Normalized path: "${normalizedPath}"`);
  const assignments = getPageThemeAssignments();
  console.log(`[getPageTheme] All assignments:`, assignments);
  const assignment = assignments.find((a) => a.pagePath.replace(/^\/|\/$/g, "") === normalizedPath);
  console.log(`[getPageTheme] Found assignment:`, assignment);
  return assignment?.themeId;
};
function LandingPage({ data }) {
  useEffect(() => {
    const currentPath = window.location.pathname;
    console.log(`[LandingPage] useEffect running for path: "${currentPath}"`);
    const savedTheme = getPageTheme(currentPath);
    console.log(`[LandingPage] Saved theme found: "${savedTheme}"`);
    if (savedTheme) {
      console.log(
        `🎨 Applying saved theme "${savedTheme}" to Landing page`
      );
      applyTheme(savedTheme);
    } else {
      console.log(`[LandingPage] No saved theme found, using default.`);
      applyTheme("golf");
    }
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col font-sans text-foreground bg-background", children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: data.seo.title }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: data.seo.description }),
      data.seo.ogImage && /* @__PURE__ */ jsx("meta", { property: "og:image", content: data.seo.ogImage })
    ] }),
    /* @__PURE__ */ jsx(Navbar, { data }),
    /* @__PURE__ */ jsx("main", { className: "flex-1", children: data.sections.sort((a, b) => a.order - b.order).map((section) => {
      if (!section.enabled) return null;
      switch (section.type) {
        case "hero":
          return /* @__PURE__ */ jsx(HeroSection, { data: section }, section.id);
        case "features":
          return /* @__PURE__ */ jsx(FeaturesSection, { data: section }, section.id);
        case "contact":
          return /* @__PURE__ */ jsx(ContactSection, { data: section }, section.id);
        default:
          return null;
      }
    }) }),
    /* @__PURE__ */ jsx(Footer, { data })
  ] });
}
function Gallery() {
  const { t } = useTranslation("costa-blanca");
  const [activeTab, setActiveTab] = useState("photos");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const photos = [
    { src: resolveAsset("/assets/lvb/lvb-01-3d.jpg"), alt: "La Vista Boulevard 3D View 1" },
    { src: resolveAsset("/assets/lvb/lvb-02-3d.jpg"), alt: "La Vista Boulevard 3D View 2" },
    { src: resolveAsset("/assets/lvb/lvb-03-3d.jpg"), alt: "La Vista Boulevard 3D View 3" },
    { src: resolveAsset("/assets/lvb/lvb-04-edited.jpg"), alt: "La Vista Boulevard Photo 4" },
    { src: resolveAsset("/assets/lvb/lvb-05-edited.jpg"), alt: "La Vista Boulevard Photo 5" },
    { src: resolveAsset("/assets/lvb/lvb-06-edited.jpg"), alt: "La Vista Boulevard Photo 6" },
    { src: resolveAsset("/assets/lvb/lvb-07-edited.jpg"), alt: "La Vista Boulevard Photo 7" },
    { src: resolveAsset("/assets/lvb/lvb-08-edited.jpg"), alt: "La Vista Boulevard Photo 8" },
    { src: resolveAsset("/assets/lvb/lvb-09-edited.jpg"), alt: "La Vista Boulevard Photo 9" },
    { src: resolveAsset("/assets/lvb/lvb-10-edited.jpg"), alt: "La Vista Boulevard Photo 10" },
    { src: resolveAsset("/assets/lvb/lvb-11-3d.jpg"), alt: "La Vista Boulevard 3D View 11" },
    { src: resolveAsset("/assets/lvb/lvb-12-3d.jpg"), alt: "La Vista Boulevard 3D View 12" },
    { src: resolveAsset("/assets/lvb/lvb-13-3d.jpg"), alt: "La Vista Boulevard 3D View 13" }
  ];
  const plans = [
    { src: resolveAsset("/assets/lvb/lvb-development-block.webp"), alt: "Development Block Plan" },
    { src: resolveAsset("/assets/lvb/lvb-development-floors.webp"), alt: "Development Floor Plans" }
  ];
  const activeContent = activeTab === "photos" ? photos : plans;
  const handleOpenLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };
  const handleCloseLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = "unset";
  };
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => prev > 0 ? prev - 1 : activeContent.length - 1);
  }, [activeContent.length]);
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => prev < activeContent.length - 1 ? prev + 1 : 0);
  }, [activeContent.length]);
  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab);
    setCurrentIndex(0);
  }, []);
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "Escape") handleCloseLightbox();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, handlePrev, handleNext]);
  return /* @__PURE__ */ jsxs("section", { className: "py-20 md:py-32 overflow-hidden", children: [
    /* @__PURE__ */ jsxs(Container, { children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center mb-12", children: [
        /* @__PURE__ */ jsx("h2", { className: "h2 mb-6", children: t("gallery.title") }),
        /* @__PURE__ */ jsxs("div", { className: "gallery-tab-container mb-8", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleTabChange("photos"),
              className: `gallery-tab ${activeTab === "photos" ? "active" : ""}`,
              children: t("gallery.tabs.photos")
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => handleTabChange("plans"),
              className: `gallery-tab ${activeTab === "plans" ? "active" : ""}`,
              children: t("gallery.tabs.plans")
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "relative group", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8", children: activeContent.map((item, index) => /* @__PURE__ */ jsx(
        motion.div,
        {
          layout: true,
          initial: { opacity: 0, scale: 0.9 },
          animate: { opacity: 1, scale: 1 },
          className: "relative cursor-pointer",
          onClick: () => handleOpenLightbox(index),
          children: /* @__PURE__ */ jsxs("div", { className: "w-[120%] aspect-[4/3] rounded-2xl overflow-hidden border border-border relative group/item -ml-[10%]", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: item.src,
                alt: item.alt,
                className: "w-full h-full object-cover transform transition-transform duration-700 group-hover/item:scale-105"
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/0 group-hover/item:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover/item:opacity-100", children: /* @__PURE__ */ jsx(Maximize2, { className: "text-background w-10 h-10" }) })
          ] })
        },
        index
      )) }) })
    ] }),
    /* @__PURE__ */ jsx(AnimatePresence, { children: lightboxOpen && /* @__PURE__ */ jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-[100] bg-background/95 flex flex-col items-center select-none text-foreground",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "w-full flex items-center justify-between p-4 md:p-6 backdrop-blur-md border-b border-border", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-4 md:gap-8", children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleTabChange("photos"),
                  className: `gallery-tab ${activeTab === "photos" ? "active" : ""}`,
                  children: t("gallery.tabs.photos")
                }
              ),
              /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: () => handleTabChange("plans"),
                  className: `gallery-tab ${activeTab === "plans" ? "active" : ""}`,
                  children: t("gallery.tabs.plans")
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleCloseLightbox,
                className: "btn-ghost",
                children: /* @__PURE__ */ jsx(X, { className: "w-6 h-6 md:w-8 md:h-8" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 w-full flex items-center justify-between px-4 md:px-12 relative overflow-hidden", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handlePrev,
                className: "hidden md:flex btn-ghost",
                children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-8 h-8" })
              }
            ),
            /* @__PURE__ */ jsx("div", { className: "relative flex-1 h-full flex items-center justify-center p-4 md:p-8", children: /* @__PURE__ */ jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsx(
              motion.img,
              {
                initial: { opacity: 0, x: 50, scale: 0.95 },
                animate: { opacity: 1, x: 0, scale: 1 },
                exit: { opacity: 0, x: -50, scale: 0.95 },
                transition: { duration: 0.3 },
                src: activeContent[currentIndex].src,
                alt: activeContent[currentIndex].alt,
                className: "max-w-full max-h-full object-contain rounded-lg"
              },
              `${activeTab}-${currentIndex}`
            ) }) }),
            /* @__PURE__ */ jsx(
              "button",
              {
                onClick: handleNext,
                className: "hidden md:flex btn-ghost",
                children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-8 h-8" })
              }
            ),
            /* @__PURE__ */ jsxs("div", { className: "absolute inset-x-0 bottom-4 flex justify-between px-4 md:hidden", children: [
              /* @__PURE__ */ jsx("button", { onClick: handlePrev, className: "btn-ghost", children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-6 h-6" }) }),
              /* @__PURE__ */ jsx("button", { onClick: handleNext, className: "btn-ghost", children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-6 h-6" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full h-24 md:h-32 backdrop-blur-md flex items-center justify-center p-2 md:p-4 gap-2 md:gap-4 overflow-x-auto bg-background/80 border-t border-border", children: activeContent.map((item, index) => /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setCurrentIndex(index),
              className: `relative flex-none h-full aspect-square rounded-md overflow-hidden transition-all duration-300 ${currentIndex === index ? "ring-2 ring-primary scale-110 z-10" : "opacity-40 hover:opacity-100 scale-100"}`,
              children: [
                /* @__PURE__ */ jsx("img", { src: item.src, className: "w-full h-full object-cover", alt: `Thumb ${index}` }),
                currentIndex === index && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-primary/10" })
              ]
            },
            index
          )) })
        ]
      }
    ) })
  ] });
}
function GolfPropertiesModern() {
  const { t } = useTranslation("costa-blanca");
  useEffect(() => {
    const currentPath = window.location.pathname;
    const savedTheme = getPageTheme(currentPath);
    if (savedTheme) {
      console.log(
        `🎨 Applying saved theme "${savedTheme}" to Golf Properties Modern page`
      );
      applyTheme(savedTheme);
    }
  }, []);
  const pageData = {
    id: "costa-blanca-modern",
    name: "Golf Properties Modern",
    brand: {
      colors: {
        primary: "142.1 76.2% 36.3%",
        secondary: "30 80% 90%"
      }
    },
    seo: {
      title: t("seo.title"),
      description: t("seo.description")
    },
    sections: [
      { id: "villas", type: "features", enabled: true, order: 1, title: "The Villas" },
      { id: "golf", type: "features", enabled: true, order: 2, title: "Golf" },
      { id: "location", type: "features", enabled: true, order: 3, title: "Location" },
      { id: "lifestyle", type: "features", enabled: true, order: 4, title: "Lifestyle" },
      { id: "contact", type: "contact", enabled: true, order: 5, title: "Prices & Visits", cta: { label: "Get Info", href: "#contact" } }
    ]
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col font-sans text-foreground bg-background", children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: pageData.seo.title }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: pageData.seo.description })
    ] }),
    /* @__PURE__ */ jsx(Navbar, { data: pageData }),
    /* @__PURE__ */ jsxs("main", { id: "MainContent", className: "flex-1", role: "main", tabIndex: -1, children: [
      /* @__PURE__ */ jsxs("section", { className: "hero-parallax", children: [
        /* @__PURE__ */ jsx(
          "img",
          {
            src: resolveAsset("/assets/golf.jpg"),
            alt: "Modern new build villa overlooking a golf course in Costa Blanca",
            className: "hero-parallax-img",
            loading: "eager",
            fetchPriority: "high"
          }
        ),
        /* @__PURE__ */ jsx("div", { className: "gradient-overlay" }),
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 z-10 flex items-center justify-center", children: /* @__PURE__ */ jsx("div", { className: "container-modern text-center", children: /* @__PURE__ */ jsxs("div", { className: "animate-fade-in-up", children: [
          /* @__PURE__ */ jsxs("h1", { className: "h1 text-white mb-6", children: [
            "Imagine Waking Up to",
            /* @__PURE__ */ jsx("br", {}),
            "18-Hole Golf Views",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-accent", children: "Every Single Morning" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "body-l text-white/90 mb-8 max-w-2xl mx-auto", children: "Your dream golf getaway is waiting in La Zenia, Costa Blanca. Modern villas designed for golf lovers who refuse to compromise." }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
            /* @__PURE__ */ jsx("a", { href: "#contact", className: "btn-primary", children: t("hero.cta_brochure") }),
            /* @__PURE__ */ jsxs("a", { href: "#villas", className: "btn-ghost bg-white/20 backdrop-blur-sm text-white hover:bg-white/30", children: [
              "Explore Properties ",
              /* @__PURE__ */ jsx(ChevronRight, { className: "ml-2 w-5 h-5" })
            ] })
          ] })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "overflow-hidden bg-primary py-4", children: /* @__PURE__ */ jsx("div", { className: "flex gap-8 animate-fade-in whitespace-nowrap", children: [...Array(4)].map((_, i) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-8 small text-white", children: [
        /* @__PURE__ */ jsx("span", { className: "small", children: "✦ 300+ Days of Sunshine" }),
        /* @__PURE__ */ jsx("span", { className: "small", children: "•" }),
        /* @__PURE__ */ jsx("span", { className: "small", children: "✦ 5 Golf Courses Within 10 min" }),
        /* @__PURE__ */ jsx("span", { className: "small", children: "•" }),
        /* @__PURE__ */ jsx("span", { className: "small", children: "✦ Mediterranean Lifestyle" }),
        /* @__PURE__ */ jsx("span", { className: "small", children: "•" }),
        /* @__PURE__ */ jsx("span", { className: "small", children: "✦ Lock-Up-and-Leave Ready" }),
        /* @__PURE__ */ jsx("span", { className: "small", children: "•" }),
        /* @__PURE__ */ jsx("span", { className: "small", children: "✦ From €449,900" })
      ] }, i)) }) }),
      /* @__PURE__ */ jsx("section", { className: "modern-section", children: /* @__PURE__ */ jsxs("div", { className: "container-modern max-w-4xl", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-center mb-16 animate-fade-in-up", children: [
          /* @__PURE__ */ jsx("h2", { className: "h2 mb-6", children: "Your Perfect Golf Life Starts Here" }),
          /* @__PURE__ */ jsx("p", { className: "body-l", children: t("hero.description") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-12 animate-fade-in-up", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx(GolfIcon, {}) }),
            /* @__PURE__ */ jsx("h3", { className: "h3 mb-4", children: "Multiple Golf Courses" }),
            /* @__PURE__ */ jsx("p", { className: "body", children: "5 championship courses within 10 minutes drive - never play the same course twice in a week. Rotate weekly, vary difficulty, keep your game fresh." })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx(Sun, { className: "w-10 h-10 text-primary" }) }),
            /* @__PURE__ */ jsx("h3", { className: "h3 mb-4", children: "Year-Round Climate" }),
            /* @__PURE__ */ jsx("p", { className: "body", children: "300+ sunny days annually - perfect golf weather from January to December. Mild winters mean you can escape cold and play year-round." })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx(Waves, { className: "w-10 h-10 text-primary" }) }),
            /* @__PURE__ */ jsx("h3", { className: "h3 mb-4", children: "Beach & Golf Combined" }),
            /* @__PURE__ */ jsx("p", { className: "body", children: "Sandy beaches just 5 minutes away - best of both worlds in one location. You don't have to choose between golf and beach lifestyle." })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { id: "villas", className: "modern-section bg-muted", children: /* @__PURE__ */ jsxs("div", { className: "container-modern", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-12 text-center animate-fade-in-up", children: [
          /* @__PURE__ */ jsx("h2", { className: "h2 mb-4", children: "Modern Villas Built for Golfers" }),
          /* @__PURE__ */ jsx("p", { className: "body-l max-w-2xl mx-auto", children: t("villas.description_1") })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mb-12 animate-fade-in-up delay-100", children: /* @__PURE__ */ jsx("div", { className: "full-vw-image", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: resolveAsset("/assets/lvb/lvb-01-3d.jpg"),
            alt: "Modern villa interior design concept",
            className: "w-full h-full img-zoom"
          }
        ) }) }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 animate-fade-in-up delay-200", children: [
          /* @__PURE__ */ jsx(StatCard, { icon: /* @__PURE__ */ jsx(Bed, {}), value: "3", label: "Bedrooms" }),
          /* @__PURE__ */ jsx(StatCard, { icon: /* @__PURE__ */ jsx(Bath, {}), value: "2", label: "Bathrooms" }),
          /* @__PURE__ */ jsx(StatCard, { icon: /* @__PURE__ */ jsx(Ruler, {}), value: "106m²", label: "Built Area" }),
          /* @__PURE__ */ jsx(StatCard, { icon: /* @__PURE__ */ jsx(Home, {}), value: "150m²", label: "Garden" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mb-12 animate-fade-in-up delay-300", children: /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "h3 mb-3", children: "Smart Layout" }),
            /* @__PURE__ */ jsx("p", { className: "body", children: t("villas.points.layout") })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "h3 mb-3", children: "Generous Space" }),
            /* @__PURE__ */ jsx("p", { className: "body", children: t("villas.points.space") })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "h3 mb-3", children: "Private Plot" }),
            /* @__PURE__ */ jsx("p", { className: "body", children: t("villas.points.garden") })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl p-8 border border-border animate-fade-in-up delay-400", children: [
          /* @__PURE__ */ jsx("h3", { className: "h3 mb-4", children: "Why This Layout Works for You" }),
          /* @__PURE__ */ jsx("p", { className: "body", children: t("villas.description_2") })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "modern-section", children: /* @__PURE__ */ jsxs("div", { className: "container-modern", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-12 text-center animate-fade-in", children: [
          /* @__PURE__ */ jsx("h2", { className: "h2 mb-4", children: "Explore Every Corner" }),
          /* @__PURE__ */ jsx("p", { className: "body-l", children: "See the quality, space, and attention to detail" })
        ] }),
        /* @__PURE__ */ jsx(Gallery, {})
      ] }) }),
      /* @__PURE__ */ jsx("section", { id: "golf", className: "modern-section bg-muted", children: /* @__PURE__ */ jsxs("div", { className: "container-modern", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-12 text-center animate-fade-in-up", children: [
          /* @__PURE__ */ jsx("h2", { className: "h2 mb-4", children: "Your Base in Orihuela Costa Golf Belt" }),
          /* @__PURE__ */ jsx("p", { className: "body-l", children: t("golf.description_1") })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mb-12 animate-fade-in-up delay-100", children: /* @__PURE__ */ jsx("div", { className: "full-vw-image", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: resolveAsset("/assets/lvb/golf-06-s.jpg"),
            alt: "Golf course at Orihuela Costa",
            className: "w-full h-full img-zoom"
          }
        ) }) }),
        /* @__PURE__ */ jsx("div", { className: "mb-12 animate-fade-in-up delay-200", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-12", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx(MapPin, { className: "w-10 h-10 text-primary" }) }),
            /* @__PURE__ */ jsx("h3", { className: "h3 mb-4", children: "Golf Course Cluster" }),
            /* @__PURE__ */ jsx("p", { className: "body", children: "Not just one course - choose from multiple 18-hole championship courses. Rotate weekly, vary difficulty, keep your game fresh. The variety keeps golf exciting." })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx(Calendar, { className: "w-10 h-10 text-primary" }) }),
            /* @__PURE__ */ jsx("h3", { className: "h3 mb-4", children: "Extended Season" }),
            /* @__PURE__ */ jsx("p", { className: "body", children: "Mild winters mean year-round golf. Escape the cold, play in perfect conditions from January through December. No more winter off-season." })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx(Sun, { className: "w-10 h-10 text-primary" }) }),
            /* @__PURE__ */ jsx("h3", { className: "h3 mb-4", children: "Perfect Routine" }),
            /* @__PURE__ */ jsx("p", { className: "body", children: "Golf in the morning, terrace lunch, beach afternoon - or siesta, sunset, dinner. Your pace, your choice. Build your ideal daily routine." })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl p-8 border border-border animate-fade-in-up delay-300", children: [
          /* @__PURE__ */ jsx("h3", { className: "h3 mb-4", children: "Winter Golf Paradise" }),
          /* @__PURE__ */ jsx("p", { className: "body", children: t("golf.description_2") })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { id: "location", className: "modern-section", children: /* @__PURE__ */ jsxs("div", { className: "container-modern", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-12 text-center animate-fade-in-up", children: [
          /* @__PURE__ */ jsx("h2", { className: "h2 mb-4", children: "La Zenia: Everything You Need Within Reach" }),
          /* @__PURE__ */ jsx("p", { className: "body-l", children: t("location.description") }),
          /* @__PURE__ */ jsx("p", { className: "body", children: t("location.note") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 animate-fade-in-up", children: [
          /* @__PURE__ */ jsx(
            DistanceCard,
            {
              icon: /* @__PURE__ */ jsx(ShoppingBag, { className: "w-8 h-8" }),
              title: "Shopping",
              items: ["Large Shopping Centre", "Supermarkets", "Local Markets", "Pharmacies"],
              distance: "5 min"
            }
          ),
          /* @__PURE__ */ jsx(
            DistanceCard,
            {
              icon: /* @__PURE__ */ jsx(Coffee, { className: "w-8 h-8" }),
              title: "Dining",
              items: ["Restaurants", "Cafés & Bars", "Local Cuisine", "International Options"],
              distance: "5 min"
            }
          ),
          /* @__PURE__ */ jsx(
            DistanceCard,
            {
              icon: /* @__PURE__ */ jsx(Waves, { className: "w-8 h-8" }),
              title: "Beaches",
              items: ["Sandy Beaches", "Hidden Coves", "Coastal Walks", "Water Sports"],
              distance: "5 min"
            }
          ),
          /* @__PURE__ */ jsx(
            DistanceCard,
            {
              icon: /* @__PURE__ */ jsx(Plane, { className: "w-8 h-8" }),
              title: "Airport",
              items: ["Alicante Airport", "Murcia Airport", "Easy Access", "Flights Daily"],
              distance: "45 min"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "animate-fade-in-up", children: /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "h3 mb-3", children: t("location.points.services.title") }),
            /* @__PURE__ */ jsx("p", { className: "body", children: t("location.points.services.description") })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "h3 mb-3", children: t("location.points.beaches.title") }),
            /* @__PURE__ */ jsx("p", { className: "body", children: t("location.points.beaches.description") })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h3", { className: "h3 mb-3", children: t("location.points.year_round.title") }),
            /* @__PURE__ */ jsx("p", { className: "body", children: t("location.points.year_round.description") })
          ] })
        ] }) })
      ] }) }),
      /* @__PURE__ */ jsx("section", { id: "lifestyle", className: "modern-section bg-foreground text-background", children: /* @__PURE__ */ jsxs("div", { className: "container-modern", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-12 text-center animate-fade-in-up", children: [
          /* @__PURE__ */ jsx("h2", { className: "h2 mb-4 text-background", children: "Built for Your Lifestyle" }),
          /* @__PURE__ */ jsx("p", { className: "body-l text-background max-w-3xl mx-auto mb-6", children: t("lifestyle.description_1") })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mb-12 animate-fade-in-up delay-100", children: /* @__PURE__ */ jsx("div", { className: "full-vw-image", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: resolveAsset("/assets/lvb/lvb-13-3d.jpg"),
            alt: "Modern villa design with low-maintenance pool area",
            className: "w-full h-full img-zoom"
          }
        ) }) }),
        /* @__PURE__ */ jsx("div", { className: "mb-12 animate-fade-in-up delay-200", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-12", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx(Home, { className: "w-10 h-10 text-primary" }) }),
            /* @__PURE__ */ jsx("h3", { className: "h3 mb-4 text-background", children: "New Construction" }),
            /* @__PURE__ */ jsxs("p", { className: "body text-background/70", children: [
              t("lifestyle.points.construction"),
              " Modern materials and equipment ensure quality and durability for years to come."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx(Sun, { className: "w-10 h-10 text-primary" }) }),
            /* @__PURE__ */ jsx("h3", { className: "h3 mb-4 text-background", children: "Outdoor Living" }),
            /* @__PURE__ */ jsxs("p", { className: "body text-background/70", children: [
              t("lifestyle.points.outdoor"),
              " Spaces designed for al fresco dining, relaxing, and entertaining in Spanish sunshine."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "mb-6", children: /* @__PURE__ */ jsx(Plane, { className: "w-10 h-10 text-primary" }) }),
            /* @__PURE__ */ jsx("h3", { className: "h3 mb-4 text-background", children: "Hassle-Free" }),
            /* @__PURE__ */ jsxs("p", { className: "body text-background/70", children: [
              t("lifestyle.points.maintenance"),
              " A home that's easy to close, leave, and open again several times a year."
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 animate-fade-in-up delay-300", children: [
          /* @__PURE__ */ jsx("h3", { className: "h3 mb-4 text-background", children: "The Perfect Balance" }),
          /* @__PURE__ */ jsx("p", { className: "body text-background/70", children: t("lifestyle.description_2") })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { className: "modern-section bg-gradient-to-br from-primary/5 to-secondary/5", children: /* @__PURE__ */ jsx("div", { className: "container-modern max-w-5xl", children: /* @__PURE__ */ jsxs("div", { className: "animate-fade-in-up", children: [
        /* @__PURE__ */ jsx("h2", { className: "h2 mb-6 text-center", children: "Why Costa Blanca?" }),
        /* @__PURE__ */ jsxs("div", { className: "max-w-2xl mx-auto space-y-4", children: [
          /* @__PURE__ */ jsx(TrustItem, { text: "Exclusive development - only a limited number of villas" }),
          /* @__PURE__ */ jsx(TrustItem, { text: "Prime location in La Zenia - established residential area" }),
          /* @__PURE__ */ jsx(TrustItem, { text: "Proven developer track record" }),
          /* @__PURE__ */ jsx(TrustItem, { text: "Designed specifically for international buyers" }),
          /* @__PURE__ */ jsx(TrustItem, { text: "Turnkey delivery - move-in ready" })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx("section", { id: "contact", className: "modern-section", children: /* @__PURE__ */ jsx("div", { className: "container-modern", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto text-center animate-fade-in-up", children: [
        /* @__PURE__ */ jsx("h2", { className: "h2 mb-6", children: t("contact.title") }),
        /* @__PURE__ */ jsx("div", { className: "bg-card rounded-3xl p-8 md:p-12 border border-border mb-8", children: /* @__PURE__ */ jsx(Trans, { i18nKey: "contact.price_info", t, components: [/* @__PURE__ */ jsx("span", { className: "display-md text-primary mx-2" }, "0")] }) }),
        /* @__PURE__ */ jsxs("div", { className: "bg-secondary text-secondary-foreground px-6 py-4 rounded-xl mb-8 inline-block body", children: [
          "⚠️ ",
          t("contact.warning")
        ] }),
        /* @__PURE__ */ jsx("p", { className: "body-l", children: t("contact.cta_intro") }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-4 max-w-md mx-auto", children: [
          /* @__PURE__ */ jsx("button", { className: "btn-primary w-full", children: t("contact.cta_brochure") }),
          /* @__PURE__ */ jsx("button", { className: "btn-outline w-full", children: t("contact.cta_availability") }),
          /* @__PURE__ */ jsxs("button", { className: "btn-outline w-full", children: [
            t("contact.cta_visit"),
            " ",
            /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 w-4 h-4" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-12 flex flex-wrap justify-center gap-8 small", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsx("span", { children: "Free Brochure" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsx("span", { children: "No Obligation" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsx("span", { children: "Local Support" })
          ] })
        ] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsx(Footer, { data: pageData })
  ] });
}
function StatCard({ icon, value, label }) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl p-6 border border-border text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "h-12 w-12 rounded-xl flex items-center justify-center mx-auto mb-4 icon-container", children: icon }),
    /* @__PURE__ */ jsx("div", { className: "h2 text-primary mb-1", children: value }),
    /* @__PURE__ */ jsx("div", { className: "caption", children: label })
  ] });
}
function DistanceCard({ icon, title, items, distance }) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-card rounded-2xl p-6 border border-border", children: [
    /* @__PURE__ */ jsx("div", { className: "h-12 w-12 rounded-xl flex items-center justify-center mb-4 icon-container", children: icon }),
    /* @__PURE__ */ jsx("h3", { className: "h3 mb-4", children: title }),
    /* @__PURE__ */ jsx("ul", { className: "space-y-2 mb-4", children: items.map((item, i) => /* @__PURE__ */ jsxs("li", { className: "flex items-center gap-2 small", children: [
      /* @__PURE__ */ jsx("div", { className: "w-1.5 h-1.5 bg-primary/50 rounded-full" }),
      item
    ] }, i)) }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 small", children: [
      /* @__PURE__ */ jsx(MapPin, { className: "w-4 h-4" }),
      distance
    ] })
  ] });
}
function TrustItem({ text }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsx(Check, { className: "w-5 h-5 text-primary flex-shrink-0 mt-0.5" }),
    /* @__PURE__ */ jsx("span", { className: "body", children: text })
  ] });
}
function GolfIcon() {
  return /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "w-10 h-10 text-primary", children: [
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
    /* @__PURE__ */ jsx("path", { d: "M12 2a10 10 0 0 1 10 10" }),
    /* @__PURE__ */ jsx("path", { d: "M12 12l-3-5" }),
    /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "1", fill: "currentColor" })
  ] });
}
const PageThemeSelector = () => {
  const [pages, setPages] = useState([]);
  const [availableThemes, setAvailableThemes] = useState([]);
  const [selectedPage, setSelectedPage] = useState("");
  const [selectedTheme, setSelectedTheme] = useState("golf");
  const [assignments, setAssignments] = useState([]);
  useEffect(() => {
    console.log("PageThemeSelector: Loading data...");
    const loadedPages = extractPagesFromRoutes();
    console.log("PageThemeSelector: Loaded pages:", loadedPages);
    const loadedThemes = getAvailableThemes();
    console.log("PageThemeSelector: Loaded themes:", loadedThemes);
    const loadedAssignments = getPageThemeAssignments();
    console.log("PageThemeSelector: Loaded assignments:", loadedAssignments);
    setPages(loadedPages);
    setAvailableThemes(loadedThemes);
    setAssignments(loadedAssignments);
    if (loadedPages.length > 0) {
      setSelectedPage(loadedPages[0].path);
      const pageAssignment = loadedAssignments.find((a) => a.pagePath === loadedPages[0].path);
      if (pageAssignment) {
        setSelectedTheme(pageAssignment.themeId);
      } else if (loadedPages[0].currentTheme) {
        setSelectedTheme(loadedPages[0].currentTheme);
      }
    }
  }, []);
  useEffect(() => {
    if (selectedPage) {
      const pageAssignment = assignments.find((a) => a.pagePath === selectedPage);
      if (pageAssignment) {
        setSelectedTheme(pageAssignment.themeId);
      } else {
        const page = pages.find((p) => p.path === selectedPage);
        if (page?.currentTheme) {
          setSelectedTheme(page.currentTheme);
        } else {
          setSelectedTheme("golf");
        }
      }
    }
  }, [selectedPage, assignments, pages]);
  const handleApplyTheme = () => {
    if (selectedPage && selectedTheme) {
      applyThemeToPage(selectedPage, selectedTheme);
      const newAssignments = [...assignments];
      const existingIndex = newAssignments.findIndex((a) => a.pagePath === selectedPage);
      if (existingIndex >= 0) {
        newAssignments[existingIndex].themeId = selectedTheme;
      } else {
        newAssignments.push({ pagePath: selectedPage, themeId: selectedTheme });
      }
      setAssignments(newAssignments);
      const currentPath = window.location.pathname;
      const isCurrentPage2 = selectedPage === "/" && currentPath === "/" || selectedPage.includes("new-build-golf-properties") && currentPath.includes("new-build-golf-properties");
      if (isCurrentPage2) {
        const themeName = availableThemes.find((t) => t.id === selectedTheme)?.name;
        console.log(`✅ Theme "${themeName}" applied successfully!`);
      }
    }
  };
  const handleResetAll = () => {
    localStorage.removeItem("pageThemeAssignments");
    setAssignments([]);
    console.log("All page theme assignments have been reset");
  };
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 p-6 bg-card border rounded-xl shadow-lg", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b pb-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx(Settings, { className: "w-5 h-5 text-primary" }),
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-bold", children: "Page Theme Manager" })
      ] }),
      /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: handleResetAll,
          className: "flex items-center gap-2 text-xs text-muted-foreground hover:text-foreground transition-colors",
          title: "Reset all theme assignments",
          children: [
            /* @__PURE__ */ jsx(RotateCcw, { className: "w-3 h-3" }),
            "Reset All"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Select Page" }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(
          "select",
          {
            value: selectedPage,
            onChange: (e) => setSelectedPage(e.target.value),
            className: "w-full bg-background border border-border rounded-lg px-4 py-3 pr-10 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-primary/30 transition-all",
            children: pages.length > 0 ? pages.map((page) => /* @__PURE__ */ jsx("option", { value: page.path, children: page.name }, page.path)) : /* @__PURE__ */ jsx("option", { value: "", children: "No pages found" })
          }
        ),
        /* @__PURE__ */ jsx(ChevronRight, { className: "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none rotate-90" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Select Theme" }),
      /* @__PURE__ */ jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsx(
          "select",
          {
            value: selectedTheme,
            onChange: (e) => setSelectedTheme(e.target.value),
            className: "w-full bg-background border border-border rounded-lg px-4 py-3 pr-10 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-primary/30 transition-all",
            children: availableThemes.map((theme) => /* @__PURE__ */ jsx("option", { value: theme.id, children: theme.name }, theme.id))
          }
        ),
        /* @__PURE__ */ jsx(ChevronRight, { className: "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none rotate-90" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: handleApplyTheme,
        className: "w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium flex items-center justify-center gap-2 hover:opacity-90 transition-all active:scale-95",
        children: [
          /* @__PURE__ */ jsx(Check, { className: "w-4 h-4" }),
          "Apply Theme to Page"
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "space-y-3 pt-4 border-t", children: [
      /* @__PURE__ */ jsx("label", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground", children: "Current Assignments" }),
      /* @__PURE__ */ jsx("div", { className: "space-y-2 max-h-48 overflow-y-auto", children: assignments.length === 0 ? /* @__PURE__ */ jsx("div", { className: "text-sm text-muted-foreground text-center py-4 border border-dashed border-border rounded-lg", children: "No theme assignments yet. Select a page and theme above to get started." }) : assignments.map((assignment) => {
        const page = pages.find((p) => p.path === assignment.pagePath);
        const theme = availableThemes.find((t) => t.id === assignment.themeId);
        if (!page || !theme) return null;
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-foreground", children: page.name }),
                /* @__PURE__ */ jsx("span", { className: "text-xs text-muted-foreground", children: assignment.pagePath })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm font-medium text-primary", children: theme.name }),
                /* @__PURE__ */ jsx(
                  "div",
                  {
                    className: "w-3 h-3 rounded-full border border-border",
                    style: {
                      backgroundColor: theme.id === "midnight" ? "#8b5cf6" : "#10b981"
                    }
                  }
                )
              ] })
            ]
          },
          assignment.pagePath
        );
      }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "bg-blue-50 border border-blue-100 p-4 rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "text-xs text-blue-800 leading-relaxed", children: [
      /* @__PURE__ */ jsx("strong", { children: "How it works:" }),
      ` Select a page from the dropdown, choose a theme, and click "Apply Theme to Page". The theme assignments are stored locally and will be reflected in the navigation. For permanent changes, you'll need to update the routes configuration.`
    ] }) })
  ] });
};
const hexToHslVariables = (hex) => {
  let r = 0, g = 0, b = 0;
  if (hex.length === 4) {
    r = parseInt(hex[1] + hex[1], 16);
    g = parseInt(hex[2] + hex[2], 16);
    b = parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = parseInt(hex.substring(1, 3), 16);
    g = parseInt(hex.substring(3, 5), 16);
    b = parseInt(hex.substring(5, 7), 16);
  }
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return `${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
};
const DEFAULT_ELEMENT_STYLES = {
  h1: { size: "3.75rem", weight: "700", lineHeight: "1", letterSpacing: "-0.02em" },
  h2: { size: "3rem", weight: "700", lineHeight: "1", letterSpacing: "-0.01em" },
  h3: { size: "1.875rem", weight: "700", lineHeight: "2.25rem", letterSpacing: "0" },
  body: { size: "1rem", weight: "400", lineHeight: "1.5rem", letterSpacing: "0" },
  "body-l": { size: "1.25rem", weight: "400", lineHeight: "1.6rem", letterSpacing: "0" },
  small: { size: "0.875rem", weight: "400", lineHeight: "1.5", letterSpacing: "0.01em" },
  caption: { size: "0.75rem", weight: "400", lineHeight: "1.4", letterSpacing: "0.02em" },
  "btn-primary": { bg: "var(--primary)", text: "var(--primary-foreground)", radius: "9999px", px: "1.5rem", py: "0.625rem", weight: "700" },
  "btn-secondary": { bg: "var(--secondary)", text: "var(--secondary-foreground)", radius: "9999px", px: "2rem", py: "0.75rem", weight: "700" },
  "btn-outline": { bg: "transparent", text: "var(--primary)", radius: "9999px", px: "2rem", py: "0.75rem", border: "var(--border)", weight: "700" },
  "btn-ghost": { bg: "transparent", text: "var(--primary)", radius: "9999px", px: "2rem", py: "0.75rem", weight: "700" },
  "link-std": { text: "var(--primary)", weight: "500", under: "underline" },
  "link-bold": { text: "var(--primary)", weight: "700", under: "none" },
  "site-title": { size: "1.25rem", weight: "700", lineHeight: "1.2", letterSpacing: "-0.01em" },
  "mobile-menu-btn": { size: "0.875rem", weight: "600", lineHeight: "1.4", letterSpacing: "0.01em" },
  "mobile-menu-links": { size: "1rem", weight: "500", lineHeight: "1.5", letterSpacing: "0" },
  "gallery-tab-container": {
    bg: "var(--muted)",
    px: "0.25rem",
    py: "0.25rem",
    radius: "0.75rem",
    gap: "0.25rem"
  },
  "gallery-tab": {
    px: "1.5rem",
    py: "0.625rem",
    radius: "0.5rem",
    weight: "600",
    size: "0.875rem",
    letterSpacing: "0.025em",
    bg: "transparent",
    text: "var(--muted-foreground)",
    hoverBg: "var(--background)",
    hoverText: "var(--foreground)",
    activeBg: "var(--background)",
    activeText: "var(--primary)",
    transition: "200ms"
  }
};
const initializeTheme = (theme) => ({
  ...themes.golf,
  // Start with a complete base theme
  ...theme,
  // Override with specifics from the partial theme
  baseTypo: theme.baseTypo || themes.golf.baseTypo,
  elementStyles: theme.elementStyles || DEFAULT_ELEMENT_STYLES
});
const StyleEditor = () => {
  const [availableThemes, setAvailableThemes] = useState(
    () => Object.values(themes).map(initializeTheme)
  );
  const [activeThemeId, setActiveThemeId] = useState("golf");
  const [editingStyle, setEditingStyle] = useState(null);
  const [previewDevice, setPreviewDevice] = useState("desktop");
  const activeTheme = availableThemes.find((t) => t.id === activeThemeId) ?? availableThemes[0];
  useEffect(() => {
    if (!activeTheme || !editingStyle) return;
    const applyStylesToPreview = () => {
      const previewContainer = document.querySelector(".live-style-preview");
      if (!previewContainer) return;
      const config = activeTheme.elementStyles[editingStyle];
      if (!config) return;
      const previewElements2 = previewContainer.querySelectorAll("*");
      previewElements2.forEach((el) => {
        el.style.cssText = "";
      });
      const styleElement = previewContainer.querySelector(`.${editingStyle}`);
      if (styleElement) {
        if (config.size) styleElement.style.fontSize = config.size;
        if (config.weight) styleElement.style.fontWeight = config.weight;
        if (config.lineHeight) styleElement.style.lineHeight = config.lineHeight;
        if (config.letterSpacing !== void 0) styleElement.style.letterSpacing = config.letterSpacing || "0";
        if (config.color) {
          if (config.color.startsWith("#")) {
            styleElement.style.color = config.color;
          } else if (config.color.startsWith("var(")) {
            const colorName = config.color.match(/var\((--[^)]+)\)/)?.[1];
            if (colorName && activeTheme.colors[colorName]) {
              styleElement.style.color = `hsl(${hexToHslVariables(activeTheme.colors[colorName])})`;
            }
          }
        }
        if (editingStyle.startsWith("btn")) {
          if (config.bg) {
            if (config.bg.startsWith("#")) {
              styleElement.style.backgroundColor = config.bg;
            } else if (config.bg.startsWith("var(")) {
              const colorName = config.bg.match(/var\((--[^)]+)\)/)?.[1];
              if (colorName && activeTheme.colors[colorName]) {
                styleElement.style.backgroundColor = `hsl(${hexToHslVariables(activeTheme.colors[colorName])})`;
              }
            }
          }
          if (config.text) {
            if (config.text.startsWith("#")) {
              styleElement.style.color = config.text;
            } else if (config.text.startsWith("var(")) {
              const colorName = config.text.match(/var\((--[^)]+)\)/)?.[1];
              if (colorName && activeTheme.colors[colorName]) {
                styleElement.style.color = `hsl(${hexToHslVariables(activeTheme.colors[colorName])})`;
              }
            }
          }
          if (config.radius) styleElement.style.borderRadius = config.radius;
          if (config.px) {
            styleElement.style.paddingLeft = config.px;
            styleElement.style.paddingRight = config.px;
          }
          if (config.py) {
            styleElement.style.paddingTop = config.py;
            styleElement.style.paddingBottom = config.py;
          }
          if (config.border) {
            if (config.border.startsWith("#")) {
              styleElement.style.border = `1px solid ${config.border}`;
            } else if (config.border.startsWith("var(")) {
              const colorName = config.border.match(/var\((--[^)]+)\)/)?.[1];
              if (colorName && activeTheme.colors[colorName]) {
                styleElement.style.border = `1px solid hsl(${hexToHslVariables(activeTheme.colors[colorName])})`;
              }
            }
          }
        }
      }
    };
    applyStylesToPreview();
    const previewElements = document.querySelectorAll(".preview-mobile, .preview-desktop");
    previewElements.forEach((previewElement) => {
      const element = previewElement.querySelector(`.${editingStyle}`);
      if (element && activeTheme.elementStyles[editingStyle]) {
        const config = activeTheme.elementStyles[editingStyle];
        if (config.size) element.style.fontSize = config.size;
        if (config.weight) element.style.fontWeight = config.weight;
        if (config.lineHeight) element.style.lineHeight = config.lineHeight;
        if (config.letterSpacing !== void 0) element.style.letterSpacing = config.letterSpacing || "0";
        if (config.color) {
          if (config.color.startsWith("#")) {
            element.style.color = config.color;
          } else if (config.color.startsWith("var(")) {
            const colorName = config.color.match(/var\((--[^)]+)\)/)?.[1];
            if (colorName && activeTheme.colors[colorName]) {
              element.style.color = `hsl(${hexToHslVariables(activeTheme.colors[colorName])})`;
            }
          }
        }
      }
    });
  }, [activeTheme, editingStyle]);
  const updateActiveTheme = (updater) => {
    setAvailableThemes((prevThemes) => prevThemes.map((t) => t.id === activeThemeId ? updater(t) : t));
  };
  const handleColorChange = (variable, value) => {
    updateActiveTheme((t) => ({
      ...t,
      colors: { ...t.colors, [variable]: value }
    }));
  };
  const handleBaseTypoChange = (key, value) => {
    updateActiveTheme((t) => ({
      ...t,
      baseTypo: { ...t.baseTypo, [key]: value }
    }));
  };
  const handleElementStyleChange = (key, field, value) => {
    updateActiveTheme((t) => ({
      ...t,
      elementStyles: {
        ...t.elementStyles,
        [key]: { ...t.elementStyles[key], [field]: value }
      }
    }));
  };
  const handleResponsiveChange = (key, breakpoint, field, value) => {
    updateActiveTheme((t) => ({
      ...t,
      elementStyles: {
        ...t.elementStyles,
        [key]: {
          ...t.elementStyles[key],
          [breakpoint]: {
            ...t.elementStyles[key]?.[breakpoint] || {},
            [field]: value
          }
        }
      }
    }));
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row min-h-screen font-sans text-foreground bg-background border-t relative overflow-x-hidden", children: [
    /* @__PURE__ */ jsxs("aside", { className: "w-full lg:w-96 bg-card border-r p-6 space-y-8 overflow-y-auto max-h-screen lg:sticky lg:top-0 shadow-xl z-20", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b pb-4 mb-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-xl font-bold flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "w-3 h-3 bg-primary rounded-full animate-pulse" }),
          "Style Editor"
        ] }),
        /* @__PURE__ */ jsx(Settings2, { className: "w-5 h-5 text-muted-foreground" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx("label", { className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground", children: "Select Theme" }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            "select",
            {
              value: activeThemeId,
              onChange: (e) => {
                const newThemeId = e.target.value;
                setActiveThemeId(newThemeId);
              },
              className: "w-full bg-background border border-border rounded-lg px-4 py-3 pr-10 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 hover:border-primary/30 transition-all",
              children: availableThemes.map((theme) => /* @__PURE__ */ jsx("option", { value: theme.id, children: theme.name }, theme.id))
            }
          ),
          /* @__PURE__ */ jsx(ChevronRight, { className: "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none rotate-90" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsx("div", { className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground", children: "Design Tokens: Colors" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-2", children: activeTheme?.colors && Object.entries(activeTheme.colors).map(([v, hex]) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-muted/50 p-2.5 rounded-xl border border-border hover:border-primary/30 transition-all group", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold uppercase text-muted-foreground group-hover:text-primary transition-colors", children: v.replace("--", "") }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-mono font-medium text-foreground", children: hex })
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "color",
              value: hex,
              className: "w-10 h-10 rounded-lg border p-1 cursor-pointer bg-background",
              onChange: (e) => handleColorChange(v, e.target.value)
            }
          )
        ] }, v)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-8 pt-4 border-t", children: [
        /* @__PURE__ */ jsx("div", { className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground", children: "Text Styles" }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-3 bg-foreground rounded-xl text-background space-y-3 shadow-lg", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase font-bold text-background", children: "Base Font Size" }),
              /* @__PURE__ */ jsx(
                "select",
                {
                  value: activeTheme?.baseTypo?.fontSize || "16px",
                  onChange: (e) => handleBaseTypoChange("fontSize", e.target.value),
                  className: "w-full bg-card text-foreground border-none rounded-lg p-2 text-sm focus:ring-1 focus:ring-primary/20 outline-none",
                  children: ["14px", "16px", "18px", "20px"].map((s) => /* @__PURE__ */ jsx("option", { value: s, children: s }, s))
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase font-bold text-background", children: "Font Family" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: activeTheme?.baseTypo?.fontFamily || "ui-sans-serif, system-ui, sans-serif",
                  onChange: (e) => handleBaseTypoChange("fontFamily", e.target.value),
                  className: "w-full bg-card text-foreground border-none rounded-lg p-2 text-sm focus:ring-1 focus:ring-primary/20 outline-none",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "ui-sans-serif, system-ui, sans-serif", children: "Sans (System)" }),
                    /* @__PURE__ */ jsx("option", { value: "Inter, sans-serif", children: "Inter" }),
                    /* @__PURE__ */ jsx("option", { value: "Roboto, sans-serif", children: "Roboto" }),
                    /* @__PURE__ */ jsx("option", { value: "Playfair Display, serif", children: "Playfair (Serif)" }),
                    /* @__PURE__ */ jsx("option", { value: "monospace", children: "Monospace" })
                  ]
                }
              )
            ] })
          ] }),
          activeTheme?.elementStyles && Object.keys(activeTheme.elementStyles).map((styleKey) => /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setEditingStyle(styleKey),
              className: "w-full flex items-center justify-between p-3 rounded-xl bg-card border border-border hover:bg-muted hover:border-primary/20 transition-all group",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
                  /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded bg-muted flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors", children: /* @__PURE__ */ jsx(Type, { className: "w-4 h-4" }) }),
                  /* @__PURE__ */ jsx("span", { className: "font-bold text-sm uppercase text-foreground", children: styleKey })
                ] }),
                /* @__PURE__ */ jsx(ChevronRight, { className: "w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" })
              ]
            },
            styleKey
          ))
        ] })
      ] }),
      /* @__PURE__ */ jsx(PageThemeSelector, {}),
      /* @__PURE__ */ jsx("div", { className: "pt-8 space-y-3", children: /* @__PURE__ */ jsxs(
        "button",
        {
          onClick: async () => {
            if (!activeTheme) return;
            const colors = activeTheme.colors || {};
            const elementStyles = activeTheme.elementStyles || {};
            const baseTypo = activeTheme.baseTypo || { fontSize: "16px", fontFamily: "ui-sans-serif, system-ui, sans-serif" };
            const colorVars = Object.entries(colors).map(([varName, hexValue]) => {
              if (typeof hexValue === "string" && hexValue.startsWith("#")) {
                return `    ${varName}: ${hexToHslVariables(hexValue)};`;
              }
              return "";
            }).filter(Boolean).join("\n");
            const typoVars = [
              `    --font-base-size: ${baseTypo.fontSize};`,
              `    --font-base-family: ${baseTypo.fontFamily};`
            ].join("\n");
            const elementVars = Object.entries(elementStyles).map(([elementKey, config]) => {
              if (!config) return "";
              const vars = [];
              if (config.size) vars.push(`    --${elementKey}-size: ${config.size};`);
              if (config.weight) vars.push(`    --${elementKey}-weight: ${config.weight};`);
              if (config.lineHeight) vars.push(`    --${elementKey}-line-height: ${config.lineHeight};`);
              if (config.letterSpacing !== void 0) vars.push(`    --${elementKey}-letter-spacing: ${config.letterSpacing || "0"};`);
              if (config.color) {
                if (config.color.startsWith("#")) {
                  vars.push(`    --${elementKey}-color: ${hexToHslVariables(config.color)};`);
                } else if (config.color.startsWith("var(")) {
                  vars.push(`    --${elementKey}-color: ${config.color};`);
                }
              }
              if (config.bg) {
                if (config.bg.startsWith("#")) {
                  vars.push(`    --${elementKey}-bg: ${hexToHslVariables(config.bg)};`);
                } else if (config.bg.startsWith("var(")) {
                  vars.push(`    --${elementKey}-bg: ${config.bg};`);
                }
              }
              if (config.text) {
                if (config.text.startsWith("#")) {
                  vars.push(`    --${elementKey}-text: ${hexToHslVariables(config.text)};`);
                } else if (config.text.startsWith("var(")) {
                  vars.push(`    --${elementKey}-text: ${config.text};`);
                }
              }
              if (config.border) {
                if (config.border.startsWith("#")) {
                  vars.push(`    --${elementKey}-border: ${hexToHslVariables(config.border)};`);
                } else if (config.border.startsWith("var(")) {
                  vars.push(`    --${elementKey}-border: ${config.border};`);
                }
              }
              if (config.radius) vars.push(`    --${elementKey}-radius: ${config.radius};`);
              if (config.px) vars.push(`    --${elementKey}-px: ${config.px};`);
              if (config.py) vars.push(`    --${elementKey}-py: ${config.py};`);
              if (config.gap) vars.push(`    --${elementKey}-gap: ${config.gap};`);
              if (config.transition) vars.push(`    --${elementKey}-transition: ${config.transition};`);
              if (config.under) vars.push(`    --${elementKey}-under: ${config.under};`);
              if (config.hoverBg) {
                if (config.hoverBg.startsWith("#")) {
                  vars.push(`    --${elementKey}-hover-bg: ${hexToHslVariables(config.hoverBg)};`);
                } else if (config.hoverBg.startsWith("var(")) {
                  vars.push(`    --${elementKey}-hover-bg: ${config.hoverBg};`);
                }
              }
              if (config.hoverText) {
                if (config.hoverText.startsWith("#")) {
                  vars.push(`    --${elementKey}-hover-text: ${hexToHslVariables(config.hoverText)};`);
                } else if (config.hoverText.startsWith("var(")) {
                  vars.push(`    --${elementKey}-hover-text: ${config.hoverText};`);
                }
              }
              if (config.hoverBorder) {
                if (config.hoverBorder.startsWith("#")) {
                  vars.push(`    --${elementKey}-hover-border: ${hexToHslVariables(config.hoverBorder)};`);
                } else if (config.hoverBorder.startsWith("var(")) {
                  vars.push(`    --${elementKey}-hover-border: ${config.hoverBorder};`);
                }
              }
              if (config.hoverScale) vars.push(`    --${elementKey}-hover-scale: ${config.hoverScale};`);
              if (config.activeBg) {
                if (config.activeBg.startsWith("#")) {
                  vars.push(`    --${elementKey}-active-bg: ${hexToHslVariables(config.activeBg)};`);
                } else if (config.activeBg.startsWith("var(")) {
                  vars.push(`    --${elementKey}-active-bg: ${config.activeBg};`);
                }
              }
              if (config.activeText) {
                if (config.activeText.startsWith("#")) {
                  vars.push(`    --${elementKey}-active-text: ${hexToHslVariables(config.activeText)};`);
                } else if (config.activeText.startsWith("var(")) {
                  vars.push(`    --${elementKey}-active-text: ${config.activeText};`);
                }
              }
              if (config.activeBorder) {
                if (config.activeBorder.startsWith("#")) {
                  vars.push(`    --${elementKey}-active-border: ${hexToHslVariables(config.activeBorder)};`);
                } else if (config.activeBorder.startsWith("var(")) {
                  vars.push(`    --${elementKey}-active-border: ${config.activeBorder};`);
                }
              }
              if (config.activeScale) vars.push(`    --${elementKey}-active-scale: ${config.activeScale};`);
              if (config.mobile) {
                if (config.mobile.size) vars.push(`    --${elementKey}-mobile-size: ${config.mobile.size};`);
                if (config.mobile.weight) vars.push(`    --${elementKey}-mobile-weight: ${config.mobile.weight};`);
                if (config.mobile.lineHeight) vars.push(`    --${elementKey}-mobile-line-height: ${config.mobile.lineHeight};`);
                if (config.mobile.letterSpacing !== void 0) vars.push(`    --${elementKey}-mobile-letter-spacing: ${config.mobile.letterSpacing || "0"};`);
                if (config.mobile.color) {
                  if (config.mobile.color.startsWith("#")) {
                    vars.push(`    --${elementKey}-mobile-color: ${hexToHslVariables(config.mobile.color)};`);
                  } else if (config.mobile.color.startsWith("var(")) {
                    vars.push(`    --${elementKey}-mobile-color: ${config.mobile.color};`);
                  }
                }
                if (config.mobile.px) vars.push(`    --${elementKey}-mobile-px: ${config.mobile.px};`);
                if (config.mobile.py) vars.push(`    --${elementKey}-mobile-py: ${config.mobile.py};`);
                if (config.mobile.radius) vars.push(`    --${elementKey}-mobile-radius: ${config.mobile.radius};`);
              }
              if (elementKey === "navbar") {
                if (config.transparency) vars.push(`    --navbar-bg-transparency: ${config.transparency};`);
                if (config.blur) vars.push(`    --navbar-bg-blur: ${config.blur};`);
                if (config.bg) {
                  if (config.bg.startsWith("#")) {
                    vars.push(`    --navbar-bg-color: ${hexToHslVariables(config.bg)};`);
                  } else if (config.bg.startsWith("var(")) {
                    vars.push(`    --navbar-bg-color: ${config.bg};`);
                  }
                }
              }
              return vars.join("\n");
            }).filter(Boolean).join("\n");
            const cssContent = `[data-theme="${activeTheme.id}"] {
${colorVars}${typoVars}${elementVars}
}

/* Theme Classes - These consume the CSS variables defined above */

/* Typography Classes */
.h1 {
    font-size: var(--h1-size);
    font-weight: var(--h1-weight);
    line-height: var(--h1-line-height);
    letter-spacing: var(--h1-letter-spacing);
    color: hsl(var(--h1-color));
}

.h2 {
    font-size: var(--h2-size);
    font-weight: var(--h2-weight);
    line-height: var(--h2-line-height);
    letter-spacing: var(--h2-letter-spacing);
    color: hsl(var(--h2-color));
}

.h3 {
    font-size: var(--h3-size);
    font-weight: var(--h3-weight);
    line-height: var(--h3-line-height);
    letter-spacing: var(--h3-letter-spacing);
    color: hsl(var(--h3-color));
}

.body {
    font-size: var(--body-size);
    font-weight: var(--body-weight);
    line-height: var(--body-line-height);
    letter-spacing: var(--body-letter-spacing);
    color: hsl(var(--body-color));
}

.small {
    font-size: var(--small-size);
    font-weight: var(--small-weight);
    line-height: var(--small-line-height);
    letter-spacing: var(--small-letter-spacing);
    color: hsl(var(--small-color));
}

.caption {
    font-size: var(--caption-size);
    font-weight: var(--caption-weight);
    line-height: var(--caption-line-height);
    letter-spacing: var(--caption-letter-spacing);
    color: hsl(var(--caption-color));
}

.body-l {
    font-size: var(--body-l-size);
    font-weight: var(--body-l-weight);
    line-height: var(--body-l-line-height);
    letter-spacing: var(--body-l-letter-spacing);
    color: hsl(var(--body-color));
}

/* Button Classes */
.btn-primary {
    background: hsl(var(--btn-primary-bg));
    color: hsl(var(--btn-primary-text));
    border-radius: var(--btn-primary-radius);
    padding-left: var(--btn-primary-px);
    padding-right: var(--btn-primary-px);
    padding-top: var(--btn-primary-py);
    padding-bottom: var(--btn-primary-py);
    font-weight: var(--btn-primary-weight);
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
}

.btn-primary:hover {
    background: hsl(var(--btn-primary-hover-bg));
    color: hsl(var(--btn-primary-hover-text));
    transform: scale(var(--btn-primary-hover-scale));
}

.btn-primary:active {
    background: hsl(var(--btn-primary-active-bg));
    color: hsl(var(--btn-primary-active-text));
    transform: scale(var(--btn-primary-active-scale));
}

.btn-secondary {
    background: hsl(var(--btn-secondary-bg));
    color: hsl(var(--btn-secondary-text));
    border-radius: var(--btn-secondary-radius);
    padding-left: var(--btn-secondary-px);
    padding-right: var(--btn-secondary-px);
    padding-top: var(--btn-secondary-py);
    padding-bottom: var(--btn-secondary-py);
    font-weight: var(--btn-secondary-weight);
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
}

.btn-secondary:hover {
    background: hsl(var(--btn-secondary-hover-bg));
    color: hsl(var(--btn-secondary-hover-text));
    transform: scale(var(--btn-secondary-hover-scale));
}

.btn-secondary:active {
    background: hsl(var(--btn-secondary-active-bg));
    color: hsl(var(--btn-secondary-active-text));
    transform: scale(var(--btn-secondary-active-scale));
}

.btn-outline {
    background: hsl(var(--btn-outline-bg));
    color: hsl(var(--btn-outline-text));
    border-radius: var(--btn-outline-radius);
    padding-left: var(--btn-outline-px);
    padding-right: var(--btn-outline-px);
    padding-top: var(--btn-outline-py);
    padding-bottom: var(--btn-outline-py);
    font-weight: var(--btn-outline-weight);
    border: 1px solid hsl(var(--btn-outline-border));
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
}

.btn-outline:hover {
    background: hsl(var(--btn-outline-hover-bg));
    color: hsl(var(--btn-outline-hover-text));
    border-color: hsl(var(--btn-outline-hover-border));
    transform: scale(var(--btn-outline-hover-scale));
}

.btn-outline:active {
    background: hsl(var(--btn-outline-active-bg));
    color: hsl(var(--btn-outline-active-text));
    border-color: hsl(var(--btn-outline-active-border));
    transform: scale(var(--btn-outline-active-scale));
}

.btn-ghost {
    background: hsl(var(--btn-ghost-bg));
    color: hsl(var(--btn-ghost-text));
    border-radius: var(--btn-ghost-radius);
    padding-left: var(--btn-ghost-px);
    padding-right: var(--btn-ghost-px);
    padding-top: var(--btn-ghost-py);
    padding-bottom: var(--btn-ghost-py);
    font-weight: var(--btn-ghost-weight);
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
}

.btn-ghost:hover {
    background: hsl(var(--btn-ghost-hover-bg));
    color: hsl(var(--btn-ghost-hover-text));
    transform: scale(var(--btn-ghost-hover-scale));
}

.btn-ghost:active {
    background: hsl(var(--btn-ghost-active-bg));
    color: hsl(var(--btn-ghost-active-text));
    transform: scale(var(--btn-ghost-active-scale));
}

/* Link Classes */
.link-std {
    color: hsl(var(--link-std-text));
    font-weight: var(--link-std-weight);
    text-decoration: var(--link-std-under);
    transition: all 0.2s ease;
    cursor: pointer;
}

.link-std:hover {
    color: hsl(var(--link-std-hover-text));
    transform: scale(var(--link-std-hover-scale));
}

.link-std:active {
    color: hsl(var(--link-std-active-text));
    transform: scale(var(--link-std-active-scale));
}

.link-bold {
    color: hsl(var(--link-bold-text));
    font-weight: var(--link-bold-weight);
    text-decoration: var(--link-bold-under);
    transition: all 0.2s ease;
    cursor: pointer;
}

.link-bold:hover {
    color: hsl(var(--link-bold-hover-text));
    transform: scale(var(--link-bold-hover-scale));
}

.link-bold:active {
    color: hsl(var(--link-bold-active-text));
    transform: scale(var(--link-bold-active-scale));
}

/* Header/Navigation Classes */
.navbar {
    background: hsla(var(--navbar-bg-color) / var(--navbar-bg-transparency));
    border-bottom: 1px solid hsl(var(--navbar-border));
    backdrop-filter: blur(var(--navbar-bg-blur));
    -webkit-backdrop-filter: blur(var(--navbar-bg-blur));
    position: sticky;
    top: 0;
    z-index: 50;
}

.navbar-container {
    height: var(--navbar-height);
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.site-title {
    font-size: var(--navbar-logo-size);
    font-weight: var(--navbar-logo-weight);
    line-height: var(--navbar-logo-line-height);
    letter-spacing: var(--navbar-logo-letter-spacing);
    color: hsl(var(--navbar-text));
    transition: color 0.2s ease;
    text-decoration: none;
}

.site-title:hover {
    color: hsl(var(--primary));
}

.nav-link {
    font-size: var(--navbar-link-size);
    font-weight: var(--navbar-link-weight);
    line-height: var(--navbar-link-line-height);
    letter-spacing: var(--navbar-link-letter-spacing);
    color: hsl(var(--navbar-text));
    transition: color 0.2s ease;
    text-decoration: none;
}

.nav-link:hover {
    color: hsl(var(--primary));
}

.mobile-menu-btn {
    font-size: var(--mobile-menu-btn-size);
    font-weight: var(--mobile-menu-btn-weight);
    line-height: var(--mobile-menu-btn-line-height);
    letter-spacing: var(--mobile-menu-btn-letter-spacing);
    color: hsl(var(--navbar-text));
}

.mobile-menu {
    background: hsl(var(--navbar-mobile-bg));
    border-top: 1px solid hsl(var(--navbar-mobile-border));
}

.mobile-menu-links {
    font-size: var(--mobile-menu-links-size);
    font-weight: var(--mobile-menu-links-weight);
    line-height: var(--mobile-menu-links-line-height);
    letter-spacing: var(--mobile-menu-links-letter-spacing);
    color: hsl(var(--navbar-text));
    transition: color 0.2s ease;
}

/* Gallery Tab Classes */
.gallery-tab-container {
    background: hsl(var(--gallery-tab-container-bg));
    padding-left: var(--gallery-tab-container-px);
    padding-right: var(--gallery-tab-container-px);
    padding-top: var(--gallery-tab-container-py);
    padding-bottom: var(--gallery-tab-container-py);
    border-radius: var(--gallery-tab-container-radius);
    display: inline-flex;
    gap: var(--gallery-tab-container-gap);
}

.gallery-tab {
    background: hsl(var(--gallery-tab-bg));
    color: hsl(var(--gallery-tab-text));
    border-radius: var(--gallery-tab-radius);
    padding-left: var(--gallery-tab-px);
    padding-right: var(--gallery-tab-px);
    padding-top: var(--gallery-tab-py);
    padding-bottom: var(--gallery-tab-py);
    font-weight: var(--gallery-tab-weight);
    font-size: var(--gallery-tab-size);
    letter-spacing: var(--gallery-tab-letter-spacing);
    transition: all var(--gallery-tab-transition) ease;
    cursor: pointer;
    border: none;
}

.gallery-tab:hover {
    background: hsl(var(--gallery-tab-hover-bg));
    color: hsl(var(--gallery-tab-hover-text));
}

.gallery-tab.active {
    background: hsl(var(--gallery-tab-active-bg));
    color: hsl(var(--gallery-tab-active-text));
}

/* Navigation Layout Classes */
.nav-desktop {
    display: flex;
    align-items: center;
    gap: var(--nav-gap);
}

.nav-desktop-mobile {
    display: none;
}

/* Hamburger menu button - hidden by default, overridden in mobile */
[data-theme="${activeTheme.id}"] .nav-desktop-mobile-show {
    display: none !important;
}

.nav-language-separator {
    padding-left: var(--nav-separator-padding);
    border-left: 1px solid hsl(var(--border));
    margin-left: var(--nav-separator-margin);
}

.nav-mobile-padding {
    padding: var(--nav-mobile-padding);
}

.nav-mobile-gap {
    gap: var(--nav-mobile-gap);
}

.nav-mobile-center {
    display: flex;
    justify-content: center;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(1, minmax(0, 1fr));
    gap: 2rem;
}

@media (min-width: 768px) {
    .features-grid {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

.feature-icon {
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 9999px;
    background-color: hsla(var(--primary) / 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: hsl(var(--primary));
}

/* Responsive Mobile Variants */
@media (max-width: 768px) {
    .h1 {
        font-size: var(--h1-mobile-size);
        line-height: var(--h1-mobile-line-height);
    }

    .h2 {
        font-size: var(--h2-mobile-size);
        line-height: var(--h2-mobile-line-height);
    }

    .h3 {
        font-size: var(--h3-mobile-size);
        line-height: var(--h3-mobile-line-height);
    }

    .body {
        font-size: var(--body-mobile-size);
        line-height: var(--body-mobile-line-height);
    }

    .small {
        font-size: var(--small-mobile-size);
        line-height: var(--small-mobile-line-height);
    }

    .caption {
        font-size: var(--caption-mobile-size);
        line-height: var(--caption-mobile-line-height);
    }

    .body-l {
        font-size: var(--body-l-mobile-size);
        line-height: var(--body-l-mobile-line-height);
    }

    .btn-primary {
        padding-left: var(--btn-primary-mobile-px);
        padding-right: var(--btn-primary-mobile-px);
        padding-top: var(--btn-primary-mobile-py);
        padding-bottom: var(--btn-primary-mobile-py);
    }

    .btn-secondary {
        padding-left: var(--btn-secondary-mobile-px);
        padding-right: var(--btn-secondary-mobile-px);
        padding-top: var(--btn-secondary-mobile-py);
        padding-bottom: var(--btn-secondary-mobile-py);
    }

    .btn-outline {
        padding-left: var(--btn-outline-mobile-px);
        padding-right: var(--btn-outline-mobile-px);
        padding-top: var(--btn-outline-mobile-py);
        padding-bottom: var(--btn-outline-mobile-py);
    }

    .btn-ghost {
        padding-left: var(--btn-ghost-mobile-px);
        padding-right: var(--btn-ghost-mobile-px);
        padding-top: var(--btn-ghost-mobile-py);
        padding-bottom: var(--btn-ghost-mobile-py);
    }

    .nav-desktop {
        display: none;
    }

    .nav-desktop-mobile {
        display: flex;
    }

    /* Show hamburger menu only on mobile */
    [data-theme="${activeTheme.id}"] .nav-desktop-mobile-show {
        display: flex !important;
    }

    .nav-mobile-padding {
        padding: var(--nav-mobile-padding);
    }

    .nav-mobile-gap {
        gap: var(--nav-mobile-gap);
    }

    .nav-mobile-center {
        justify-content: center;
    }
}

/* Style Editor Device-Specific Overrides */
.preview-mobile .h1 {
    font-size: var(--h1-mobile-size) !important;
    line-height: var(--h1-mobile-line-height) !important;
}

.preview-mobile .h2 {
    font-size: var(--h2-mobile-size) !important;
    line-height: var(--h2-mobile-line-height) !important;
}

.preview-mobile .h3 {
    font-size: var(--h3-mobile-size) !important;
    line-height: var(--h3-mobile-line-height) !important;
}

.preview-mobile .body {
    font-size: var(--body-mobile-size) !important;
    line-height: var(--body-mobile-line-height) !important;
}

.preview-mobile .small {
    font-size: var(--small-mobile-size) !important;
    line-height: var(--small-mobile-line-height) !important;
}

.preview-mobile .caption {
    font-size: var(--caption-mobile-size) !important;
    line-height: var(--caption-mobile-line-height) !important;
}

.preview-mobile .btn-primary {
    padding-left: var(--btn-primary-mobile-px) !important;
    padding-right: var(--btn-primary-mobile-px) !important;
    padding-top: var(--btn-primary-mobile-py) !important;
    padding-bottom: var(--btn-primary-mobile-py) !important;
}

.preview-mobile .btn-secondary {
    padding-left: var(--btn-secondary-mobile-px) !important;
    padding-right: var(--btn-secondary-mobile-px) !important;
    padding-top: var(--btn-secondary-mobile-py) !important;
    padding-bottom: var(--btn-secondary-mobile-py) !important;
}

.preview-mobile .btn-outline {
    padding-left: var(--btn-outline-mobile-px) !important;
    padding-right: var(--btn-outline-mobile-px) !important;
    padding-top: var(--btn-outline-mobile-py) !important;
    padding-bottom: var(--btn-outline-mobile-py) !important;
}

.preview-mobile .btn-ghost {
    padding-left: var(--btn-ghost-mobile-px) !important;
    padding-right: var(--btn-ghost-mobile-px) !important;
    padding-top: var(--btn-ghost-mobile-py) !important;
    padding-bottom: var(--btn-ghost-mobile-py) !important;
}

.preview-mobile .body-l {
    font-size: var(--body-l-mobile-size) !important;
    line-height: var(--body-l-mobile-line-height) !important;
}

.preview-mobile .gallery-tab-container {
    background: hsl(var(--gallery-tab-container-bg)) !important;
    padding-left: var(--gallery-tab-container-px) !important;
    padding-right: var(--gallery-tab-container-px) !important;
    padding-top: var(--gallery-tab-container-py) !important;
    padding-bottom: var(--gallery-tab-container-py) !important;
    border-radius: var(--gallery-tab-container-radius) !important;
    gap: var(--gallery-tab-container-gap) !important;
}

.preview-mobile .gallery-tab {
    background: hsl(var(--gallery-tab-bg)) !important;
    color: hsl(var(--gallery-tab-text)) !important;
    border-radius: var(--gallery-tab-radius) !important;
    padding-left: var(--gallery-tab-px) !important;
    padding-right: var(--gallery-tab-px) !important;
    padding-top: var(--gallery-tab-py) !important;
    padding-bottom: var(--gallery-tab-py) !important;
    font-weight: var(--gallery-tab-weight) !important;
    font-size: var(--gallery-tab-size) !important;
    letter-spacing: var(--gallery-tab-letter-spacing) !important;
    transition: all var(--gallery-tab-transition) ease !important;
}

.preview-mobile .gallery-tab:hover {
    background: hsl(var(--gallery-tab-hover-bg)) !important;
    color: hsl(var(--gallery-tab-hover-text)) !important;
}

.preview-mobile .gallery-tab.active {
    background: hsl(var(--gallery-tab-active-bg)) !important;
    color: hsl(var(--gallery-tab-active-text)) !important;
}`;
            try {
              await navigator.clipboard.writeText(cssContent);
              alert("✅ Theme CSS copied to clipboard!");
            } catch (err) {
              console.error("Failed to copy CSS to clipboard:", err);
              const confirmed = window.confirm("CSS generated! Copy the following CSS:\\n\\n" + cssContent);
              if (!confirmed) {
                console.log("Theme CSS:", cssContent);
              }
            }
          },
          className: "w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg active:scale-95",
          children: [
            /* @__PURE__ */ jsx(Download, { className: "w-5 h-5" }),
            "Export ",
            activeTheme?.name || "Theme",
            " CSS"
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx("main", { "data-theme": activeThemeId, className: "flex-1 p-4 lg:p-12 overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "preview-desktop mx-auto space-y-12 max-w-5xl w-full", children: [
      /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx("div", { className: "navbar border-b bg-card/30 backdrop-blur sticky top-0 z-50 rounded-t-2xl", children: /* @__PURE__ */ jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: (e) => {
              e.stopPropagation();
              setEditingStyle("navbar");
            },
            className: "absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center gap-1 z-50",
            title: "Edit header background",
            children: [
              /* @__PURE__ */ jsx(Settings2, { className: "w-3 h-3" }),
              "Edit"
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 h-16 flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("h1", { className: "site-title cursor-pointer", onClick: () => setEditingStyle("h1"), children: "Golf Properties" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
            /* @__PURE__ */ jsx("a", { href: "#", className: "text-sm font-medium cursor-pointer", onClick: (e) => {
              e.preventDefault();
              setEditingStyle("link-std");
            }, children: "Features" }),
            /* @__PURE__ */ jsx("button", { className: "btn-primary", onClick: () => setEditingStyle("btn-primary"), children: "Get Info" })
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx("div", { className: "bg-card rounded-b-3xl rounded-t-none p-8 lg:p-16 shadow-2xl border border-border relative", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col space-y-16", children: [
        /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase font-bold text-muted-foreground border-b pb-2", children: "Typography Scale" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 gap-4", children: [
            /* @__PURE__ */ jsx("div", { className: "cursor-pointer hover:ring-2 hover:ring-primary/20 hover:bg-primary/5 rounded px-2 -mx-2 transition-all", onClick: () => setEditingStyle("h1"), children: /* @__PURE__ */ jsx("h1", { className: "h1", children: "Headline Level 1" }) }),
            /* @__PURE__ */ jsx("div", { className: "cursor-pointer hover:ring-2 hover:ring-primary/20 hover:bg-primary/5 rounded px-2 -mx-2 transition-all border-t pt-4", onClick: () => setEditingStyle("h2"), children: /* @__PURE__ */ jsx("h2", { className: "h2", children: "Headline Level 2" }) }),
            /* @__PURE__ */ jsx("div", { className: "cursor-pointer hover:ring-2 hover:ring-primary/20 hover:bg-primary/5 rounded px-2 -mx-2 transition-all border-t pt-4", onClick: () => setEditingStyle("h3"), children: /* @__PURE__ */ jsx("h3", { className: "h3", children: "Headline Level 3" }) }),
            /* @__PURE__ */ jsx("div", { className: "cursor-pointer hover:ring-2 hover:ring-primary/20 hover:bg-primary/5 rounded px-2 -mx-2 transition-all border-t pt-4", onClick: () => setEditingStyle("body-l"), children: /* @__PURE__ */ jsx("p", { className: "body-l", children: "Body Text L: A modern 3-bedroom villa a short drive from several 18-hole golf courses, Mediterranean and all everyday services in a big shopping center nearby." }) }),
            /* @__PURE__ */ jsx("div", { className: "cursor-pointer hover:ring-2 hover:ring-primary/20 hover:bg-primary/5 rounded px-2 -mx-2 transition-all border-t pt-4", onClick: () => setEditingStyle("body"), children: /* @__PURE__ */ jsx("p", { className: "body", children: "Body Text: The quick brown fox jumps over lazy dog. This demonstrates readable paragraph text with proper line height and spacing." }) }),
            /* @__PURE__ */ jsx("div", { className: "cursor-pointer hover:ring-2 hover:ring-primary/20 hover:bg-primary/5 rounded px-2 -mx-2 transition-all border-t pt-4", onClick: () => setEditingStyle("small"), children: /* @__PURE__ */ jsx("small", { className: "small", children: "Small Text: Compact text for captions and metadata." }) }),
            /* @__PURE__ */ jsx("div", { className: "cursor-pointer hover:ring-2 hover:ring-primary/20 hover:bg-primary/5 rounded px-2 -mx-2 transition-all border-t pt-4", onClick: () => setEditingStyle("caption"), children: /* @__PURE__ */ jsx("div", { className: "caption", children: "Caption: Additional descriptive text below images or content." }) }),
            /* @__PURE__ */ jsx("div", { className: "cursor-pointer hover:ring-2 hover:ring-primary/20 hover:bg-primary/5 rounded px-2 -mx-2 transition-all border-t pt-4", onClick: () => setEditingStyle("site-title"), children: /* @__PURE__ */ jsx("div", { className: "site-title", children: "Site Title" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-8 border-t pt-8", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase font-bold text-muted-foreground", children: "Complete Button System" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-4", children: [
            /* @__PURE__ */ jsx("button", { className: "btn-primary", onClick: () => setEditingStyle("btn-primary"), children: "Primary Button" }),
            /* @__PURE__ */ jsx("button", { className: "btn-secondary", onClick: () => setEditingStyle("btn-secondary"), children: "Secondary Button" }),
            /* @__PURE__ */ jsx("button", { className: "btn-outline", onClick: () => setEditingStyle("btn-outline"), children: "Outline Button" }),
            /* @__PURE__ */ jsx("button", { className: "btn-ghost", onClick: () => setEditingStyle("btn-ghost"), children: "Ghost Button" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-8 border-t pt-8", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase font-bold text-muted-foreground", children: "Complete Link System" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-8 items-center", children: [
            /* @__PURE__ */ jsx("a", { href: "#", className: "link-std", onClick: (e) => {
              e.preventDefault();
              setEditingStyle("link-std");
            }, children: "Standard Link →" }),
            /* @__PURE__ */ jsx("a", { href: "#", className: "link-bold", onClick: (e) => {
              e.preventDefault();
              setEditingStyle("link-bold");
            }, children: "Bold Link →" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-8 border-t pt-8", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase font-bold text-muted-foreground", children: "Gallery Tabs" }),
          /* @__PURE__ */ jsxs("div", { className: "gallery-tab-container", children: [
            /* @__PURE__ */ jsx("button", { className: "gallery-tab", onClick: () => setEditingStyle("gallery-tab"), children: "Photos" }),
            /* @__PURE__ */ jsx("button", { className: "gallery-tab active", onClick: () => setEditingStyle("gallery-tab"), children: "Videos" }),
            /* @__PURE__ */ jsx("button", { className: "gallery-tab", onClick: () => setEditingStyle("gallery-tab"), children: "360°" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-8 border-t pt-8", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase font-bold text-muted-foreground", children: "Color Palette" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-card border border-border shadow-sm flex flex-col items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-primary" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-medium", children: "Primary" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-card border border-border shadow-sm flex flex-col items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-secondary" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-medium", children: "Secondary" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-card border border-border shadow-sm flex flex-col items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-accent" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-medium", children: "Accent" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "p-4 rounded-xl bg-card border border-border shadow-sm flex flex-col items-center gap-2", children: [
              /* @__PURE__ */ jsx("div", { className: "w-8 h-8 rounded-full bg-muted" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-medium", children: "Muted" })
            ] })
          ] })
        ] })
      ] }) })
    ] }) }),
    editingStyle && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-slate-900/60 backdrop-blur-sm", onClick: () => setEditingStyle(null) }),
      /* @__PURE__ */ jsxs("div", { "data-theme": activeThemeId, className: "relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "p-6 bg-gray-200 text-gray-900 flex items-center justify-between border-b border-gray-300", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2", children: [
              "Preview Style: ",
              editingStyle.toUpperCase()
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "live-style-preview truncate py-2 min-h-[60px] flex items-center", children: [
              editingStyle === "h1" && /* @__PURE__ */ jsx("h1", { className: "h1", children: "Heading 1 Preview" }),
              editingStyle === "h2" && /* @__PURE__ */ jsx("h2", { className: "h2", children: "Heading 2 Preview" }),
              editingStyle === "h3" && /* @__PURE__ */ jsx("h3", { className: "h3", children: "Heading 3 Preview" }),
              editingStyle === "body" && /* @__PURE__ */ jsx("p", { className: "body", children: "Body Paragraph Preview Style" }),
              editingStyle === "body-l" && /* @__PURE__ */ jsx("p", { className: "body-l", children: "Body Text L Preview" }),
              editingStyle === "small" && /* @__PURE__ */ jsx("small", { className: "small", children: "Small Text Preview" }),
              editingStyle === "caption" && /* @__PURE__ */ jsx("div", { className: "caption", children: "Caption Text Preview" }),
              editingStyle.startsWith("btn") && /* @__PURE__ */ jsxs("button", { className: editingStyle, children: [
                editingStyle.replace("btn-", ""),
                " Label"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: () => setEditingStyle(null), className: "p-2 hover:bg-white/10 rounded-lg shrink-0 ml-4 self-start", children: /* @__PURE__ */ jsx(X, { className: "w-5 h-5" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "p-8 space-y-8 max-h-[60vh] overflow-y-auto", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold uppercase text-slate-400", children: "Base Styles (Desktop)" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              activeTheme?.elementStyles?.[editingStyle]?.size && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-400", children: "Font Size" }),
                /* @__PURE__ */ jsx("input", { type: "text", value: activeTheme.elementStyles[editingStyle].size, onChange: (e) => handleElementStyleChange(editingStyle, "size", e.target.value), className: "w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" })
              ] }),
              activeTheme?.elementStyles?.[editingStyle]?.weight && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-400", children: "Weight" }),
                /* @__PURE__ */ jsx("select", { value: activeTheme.elementStyles[editingStyle].weight, onChange: (e) => handleElementStyleChange(editingStyle, "weight", e.target.value), className: "w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm", children: [300, 400, 500, 600, 700, 800].map((w) => /* @__PURE__ */ jsx("option", { value: w.toString(), children: w }, w)) })
              ] }),
              activeTheme?.elementStyles?.[editingStyle]?.lineHeight && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-400", children: "Line Height" }),
                /* @__PURE__ */ jsx("input", { type: "text", value: activeTheme.elementStyles[editingStyle].lineHeight, onChange: (e) => handleElementStyleChange(editingStyle, "lineHeight", e.target.value), className: "w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" })
              ] }),
              activeTheme?.elementStyles?.[editingStyle]?.letterSpacing !== void 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-400", children: "Letter Spacing" }),
                /* @__PURE__ */ jsx("input", { type: "text", value: activeTheme.elementStyles[editingStyle].letterSpacing || "0", onChange: (e) => handleElementStyleChange(editingStyle, "letterSpacing", e.target.value), className: "w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6 pt-6 border-t border-slate-100", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold uppercase text-purple-600", children: "Color" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-2", children: activeTheme?.colors && Object.entries(activeTheme.colors).map(([colorVar, colorHex]) => /* @__PURE__ */ jsxs(
                "button",
                {
                  onClick: () => {
                    handleElementStyleChange(editingStyle, "color", colorHex);
                  },
                  className: `p-2 rounded-lg border text-xs font-medium transition-all ${activeTheme?.elementStyles[editingStyle]?.color === colorHex ? "bg-purple-500 text-white border-purple-500" : "bg-white border-slate-200 hover:border-purple-300"}`,
                  children: [
                    /* @__PURE__ */ jsx("div", { className: "w-4 h-4 rounded-full border-2", style: { backgroundColor: colorHex } }),
                    /* @__PURE__ */ jsx("span", { className: "font-mono", children: colorVar.replace("--", "") })
                  ]
                },
                colorVar
              )) }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-400", children: "Custom Color" }),
                /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "color",
                      value: activeTheme?.elementStyles?.[editingStyle]?.color || "#000000",
                      onChange: (e) => {
                        handleElementStyleChange(editingStyle, "color", e.target.value);
                      },
                      className: "w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      value: activeTheme?.elementStyles?.[editingStyle]?.color || "#000000",
                      onChange: (e) => {
                        handleElementStyleChange(editingStyle, "color", e.target.value);
                      },
                      placeholder: "#000000",
                      className: "flex-1 bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm font-mono"
                    }
                  )
                ] })
              ] })
            ] })
          ] }),
          editingStyle.startsWith("btn") && /* @__PURE__ */ jsxs("div", { className: "space-y-6 pt-6 border-t border-slate-100", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold uppercase text-blue-600", children: "Interactive States" }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold uppercase text-slate-400 mb-3", children: "Hover State" }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                activeTheme?.elementStyles?.[editingStyle]?.hoverBg !== void 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-400", children: "Background" }),
                  /* @__PURE__ */ jsx("input", { type: "color", value: activeTheme.elementStyles[editingStyle].hoverBg || "#000000", onChange: (e) => handleElementStyleChange(editingStyle, "hoverBg", e.target.value), className: "w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" })
                ] }),
                activeTheme?.elementStyles?.[editingStyle]?.hoverText !== void 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-400", children: "Text Color" }),
                  /* @__PURE__ */ jsx("input", { type: "color", value: activeTheme.elementStyles[editingStyle].hoverText || "#000000", onChange: (e) => handleElementStyleChange(editingStyle, "hoverText", e.target.value), className: "w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" })
                ] }),
                activeTheme?.elementStyles?.[editingStyle]?.hoverBorder !== void 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-400", children: "Border Color" }),
                  /* @__PURE__ */ jsx("input", { type: "color", value: activeTheme.elementStyles[editingStyle].hoverBorder || "#000000", onChange: (e) => handleElementStyleChange(editingStyle, "hoverBorder", e.target.value), className: "w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" })
                ] }),
                activeTheme?.elementStyles?.[editingStyle]?.hoverScale !== void 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-400", children: "Scale" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: activeTheme.elementStyles[editingStyle].hoverScale || "1", onChange: (e) => handleElementStyleChange(editingStyle, "hoverScale", e.target.value), className: "w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm", placeholder: "e.g. 1.05" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold uppercase text-slate-400 mb-3", children: "Active State" }),
              /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                activeTheme?.elementStyles?.[editingStyle]?.activeBg !== void 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-400", children: "Background" }),
                  /* @__PURE__ */ jsx("input", { type: "color", value: activeTheme.elementStyles[editingStyle].activeBg || "#000000", onChange: (e) => handleElementStyleChange(editingStyle, "activeBg", e.target.value), className: "w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" })
                ] }),
                activeTheme?.elementStyles?.[editingStyle]?.activeText !== void 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-400", children: "Text Color" }),
                  /* @__PURE__ */ jsx("input", { type: "color", value: activeTheme.elementStyles[editingStyle].activeText || "#000000", onChange: (e) => handleElementStyleChange(editingStyle, "activeText", e.target.value), className: "w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" })
                ] }),
                activeTheme?.elementStyles?.[editingStyle]?.activeBorder !== void 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-400", children: "Border Color" }),
                  /* @__PURE__ */ jsx("input", { type: "color", value: activeTheme.elementStyles[editingStyle].activeBorder || "#000000", onChange: (e) => handleElementStyleChange(editingStyle, "activeBorder", e.target.value), className: "w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" })
                ] }),
                activeTheme?.elementStyles?.[editingStyle]?.activeScale !== void 0 && /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-400", children: "Scale" }),
                  /* @__PURE__ */ jsx("input", { type: "text", value: activeTheme.elementStyles[editingStyle].activeScale || "1", onChange: (e) => handleElementStyleChange(editingStyle, "activeScale", e.target.value), className: "w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm", placeholder: "e.g. 0.95" })
                ] })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6 pt-6 border-t border-slate-100", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold uppercase text-purple-600", children: "Mobile Overrides" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-400", children: "Mobile Size" }),
                /* @__PURE__ */ jsx("input", { type: "text", value: activeTheme?.elementStyles?.[editingStyle]?.mobile?.size || "", onChange: (e) => handleResponsiveChange(editingStyle, "mobile", "size", e.target.value), className: "w-full bg-purple-50/50 border border-purple-100 rounded-lg p-2 text-sm", placeholder: "e.g. 1.5rem" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-400", children: "Mobile Line-H" }),
                /* @__PURE__ */ jsx("input", { type: "text", value: activeTheme?.elementStyles?.[editingStyle]?.mobile?.lineHeight || "", onChange: (e) => handleResponsiveChange(editingStyle, "mobile", "lineHeight", e.target.value), className: "w-full bg-purple-50/50 border border-purple-100 rounded-lg p-2 text-sm", placeholder: "e.g. 1.2" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "pt-4", children: /* @__PURE__ */ jsx("button", { onClick: () => setEditingStyle(null), className: "w-full bg-slate-900 text-white font-bold py-4 rounded-xl", children: "Done" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("style", { children: `
        .style-editor-ui { font-size: 14px !important; font-family: Inter, sans-serif !important; }
        .live-style-preview h1, .live-style-preview h2, .live-style-preview h3, .live-style-preview p, .live-style-preview small { margin: 0 !important; }
      ` })
  ] });
};
function GolfPropertiesNewLayout() {
  const { t } = useTranslation("costa-blanca");
  useEffect(() => {
    const currentPath = window.location.pathname;
    const savedTheme = getPageTheme(currentPath);
    if (savedTheme) {
      console.log(
        `🎨 Applying saved theme "${savedTheme}" to Custom page`
      );
      applyTheme(savedTheme);
    }
  }, []);
  const pageData = {
    id: "golf-properties-new-layout",
    // Changed ID for this new page
    name: "Golf Properties New Layout",
    // New name
    brand: {
      colors: {
        primary: "142.1 76.2% 36.3%",
        // Green for Golf
        secondary: "30 80% 90%"
        // Warm/Sun
      }
    },
    seo: {
      title: t("seo.title"),
      description: t("seo.description")
    },
    sections: [
      { id: "villas", type: "features", enabled: true, order: 1, title: "The Villas" },
      { id: "golf", type: "features", enabled: true, order: 2, title: "Golf" },
      { id: "location", type: "features", enabled: true, order: 3, title: "Location" },
      { id: "lifestyle", type: "features", enabled: true, order: 4, title: "Lifestyle" },
      { id: "contact", type: "contact", enabled: true, order: 5, title: "Prices & Visits", cta: { label: "Get Info", href: "#contact" } }
    ]
  };
  return /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col font-sans text-foreground bg-background", children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: pageData.seo.title }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: pageData.seo.description })
    ] }),
    /* @__PURE__ */ jsx(Navbar, { data: pageData }),
    /* @__PURE__ */ jsxs("main", { className: "flex-1", children: [
      /* @__PURE__ */ jsxs("section", { className: "relative h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden", children: [
        /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-0", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: resolveAsset("/assets/golf.jpg"),
              alt: "Modern new build villa overlooking a golf course in Costa Blanca",
              className: "w-full h-full object-cover"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/40" })
        ] }),
        /* @__PURE__ */ jsxs(Container, { className: "relative z-10 text-center max-w-4xl", children: [
          /* @__PURE__ */ jsxs("h1", { className: "h1 mb-6 text-white", children: [
            t("hero.title_start"),
            " ",
            t("hero.title_middle"),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-accent", children: t("hero.title_highlight") })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "body-l text-primary-foreground/80 mb-10 max-w-2xl mx-auto", children: t("hero.description") }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-4 justify-center", children: [
            /* @__PURE__ */ jsx("a", { href: "#contact", className: "btn-primary", children: t("hero.cta_brochure") }),
            /* @__PURE__ */ jsx("a", { href: "#villas", className: "btn-outline", children: t("hero.cta_explore") })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { id: "villas", className: "py-20 md:py-32 bg-card", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-12 lg:gap-20 items-center", children: [
        " ",
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "h2 mb-6", children: t("villas.title") }),
          /* @__PURE__ */ jsx("p", { className: "body mb-6", children: t("villas.description_1") }),
          /* @__PURE__ */ jsx("p", { className: "body mb-8", children: t("villas.description_2") }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx(KeyPoint, { text: t("villas.points.layout") }),
            /* @__PURE__ */ jsx(KeyPoint, { text: t("villas.points.space") }),
            /* @__PURE__ */ jsx(KeyPoint, { text: t("villas.points.garden") })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "h-[400px] md:h-[500px] rounded-2xl overflow-hidden relative", children: [
          " ",
          /* @__PURE__ */ jsx(
            "img",
            {
              src: resolveAsset("/assets/lvb/lvb-01-3d.jpg"),
              alt: "Modern villa interior design concept",
              className: "w-full h-full object-cover"
            }
          )
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx("section", { className: "py-20 md:py-32 bg-muted", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx(Gallery, {}) }) }),
      /* @__PURE__ */ jsx("section", { id: "golf", className: "py-20 md:py-32 bg-card", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-12 lg:gap-20 items-center", children: [
        " ",
        /* @__PURE__ */ jsxs("div", { className: "h-[400px] md:h-[500px] rounded-2xl overflow-hidden relative", children: [
          " ",
          /* @__PURE__ */ jsx(
            "img",
            {
              src: resolveAsset("/assets/lvb/golf-06-s.jpg"),
              alt: "Golf course at Orihuela Costa",
              className: "w-full h-full object-cover"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "h2 mb-6", children: t("golf.title") }),
          /* @__PURE__ */ jsx("p", { className: "body mb-6", children: t("golf.description_1") }),
          /* @__PURE__ */ jsx("p", { className: "body mb-8", children: t("golf.description_2") }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 bg-card p-8 rounded-xl border border-border", children: [
            /* @__PURE__ */ jsx(KeyPoint, { text: t("golf.points.cluster"), icon: /* @__PURE__ */ jsx(MapPin, { className: "w-5 h-5 text-primary" }) }),
            /* @__PURE__ */ jsx(KeyPoint, { text: t("golf.points.season"), icon: /* @__PURE__ */ jsx(Sun, { className: "w-5 h-5 text-primary" }) }),
            /* @__PURE__ */ jsx(KeyPoint, { text: t("golf.points.routine"), icon: /* @__PURE__ */ jsx(Check, { className: "w-5 h-5 text-primary" }) })
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsx("section", { id: "location", className: "py-20 md:py-32 bg-muted", children: /* @__PURE__ */ jsxs(Container, { children: [
        /* @__PURE__ */ jsxs("div", { className: "max-w-3xl mx-auto text-center mb-16", children: [
          /* @__PURE__ */ jsx("h2", { className: "h2 mb-6", children: t("location.title") }),
          /* @__PURE__ */ jsx("p", { className: "body-l", children: t("location.description") })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-3 gap-8", children: [
          /* @__PURE__ */ jsx(Card, { title: t("location.points.services.title"), description: t("location.points.services.description"), icon: /* @__PURE__ */ jsx(Home, { className: "w-6 h-6 text-primary" }) }),
          /* @__PURE__ */ jsx(Card, { title: t("location.points.beaches.title"), description: t("location.points.beaches.description"), icon: /* @__PURE__ */ jsx(MapPin, { className: "w-6 h-6 text-primary" }) }),
          /* @__PURE__ */ jsx(Card, { title: t("location.points.year_round.title"), description: t("location.points.year_round.description"), icon: /* @__PURE__ */ jsx(Sun, { className: "w-6 h-6 text-primary" }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("section", { id: "lifestyle", className: "py-20 md:py-32 bg-card", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-12 lg:gap-20 items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "h-[400px] md:h-[500px] rounded-2xl overflow-hidden relative", children: /* @__PURE__ */ jsx(
          "img",
          {
            src: resolveAsset("/assets/lvb/lvb-13-3d.jpg"),
            alt: "Modern villa design with low-maintenance pool area",
            className: "w-full h-full object-cover"
          }
        ) }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h2", { className: "h2 mb-6", children: t("lifestyle.title") }),
          /* @__PURE__ */ jsx("p", { className: "body mb-6", children: t("lifestyle.description_1") }),
          /* @__PURE__ */ jsx("p", { className: "body mb-8", children: t("lifestyle.description_2") }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
            /* @__PURE__ */ jsx(KeyPoint, { text: t("lifestyle.points.construction") }),
            /* @__PURE__ */ jsx(KeyPoint, { text: t("lifestyle.points.outdoor") }),
            /* @__PURE__ */ jsx(KeyPoint, { text: t("lifestyle.points.maintenance") })
          ] })
        ] })
      ] }) }) }),
      /* @__PURE__ */ jsxs("section", { id: "contact", className: "py-24 bg-accent relative overflow-hidden", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute top-0 right-0 w-[500px] h-[500px] bg-muted rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-50" }),
        /* @__PURE__ */ jsx(Container, { className: "relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto bg-card rounded-3xl p-8 md:p-16 text-center border border-border", children: [
          /* @__PURE__ */ jsx("h2", { className: "h2 mb-6", children: t("contact.title") }),
          /* @__PURE__ */ jsx("p", { className: "body-l mb-8 max-w-2xl mx-auto", children: /* @__PURE__ */ jsx(Trans, { i18nKey: "contact.price_info", t, components: [/* @__PURE__ */ jsx("span", { className: "text-primary" }, "0")] }) }),
          /* @__PURE__ */ jsxs("div", { className: "bg-secondary text-secondary-foreground px-6 py-4 rounded-xl mb-10 inline-block small border border-border", children: [
            "⚠️ ",
            t("contact.warning")
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-4 max-w-md mx-auto", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-6", children: t("contact.cta_intro") }),
            /* @__PURE__ */ jsx("button", { className: "btn-primary w-full", children: t("contact.cta_brochure") }),
            /* @__PURE__ */ jsx("button", { className: "btn-outline w-full", children: t("contact.cta_availability") }),
            /* @__PURE__ */ jsxs("button", { className: "btn-ghost w-full", children: [
              t("contact.cta_visit"),
              " ",
              /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 w-4 h-4" })
            ] })
          ] })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsx(Footer, { data: pageData })
  ] });
}
function KeyPoint({ text, icon, light = false }) {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
    /* @__PURE__ */ jsx("div", { className: `mt-1 min-w-5 ${light ? "text-accent" : "text-primary"}`, children: icon || /* @__PURE__ */ jsx(Check, { className: "w-5 h-5" }) }),
    /* @__PURE__ */ jsx("span", { className: `body ${light ? "text-muted-foreground" : "text-foreground"}`, children: text })
  ] });
}
function Card({ title, description, icon }) {
  return /* @__PURE__ */ jsxs("div", { className: "bg-muted p-8 rounded-2xl border border-border transition-shadow duration-300", children: [
    /* @__PURE__ */ jsx("div", { className: "h-12 w-12 bg-card rounded-xl flex items-center justify-center mb-6", children: icon }),
    /* @__PURE__ */ jsx("h3", { className: "h3 mb-3", children: title }),
    /* @__PURE__ */ jsx("p", { className: "body", children: description })
  ] });
}
const id = "sunny-hills";
const name = "Sunny Hills Estate";
const brand = { "colors": { "primary": "222.2 47.4% 11.2%", "secondary": "210 40% 96.1%" } };
const seo$2 = { "title": "Sunny Hills - Luxury Living", "description": "Experience the pinnacle of luxury at Sunny Hills Estate. Modern homes, stunning views, and premium amenities." };
const sections = [{ "id": "hero", "type": "hero", "enabled": true, "order": 1, "title": "Welcome to Sunny Hills", "subtitle": "Your Dream Home Awaits", "cta": { "label": "View Residences", "href": "#features", "variant": "primary" }, "media": "/assets/golf.jpg" }, { "id": "features", "type": "features", "enabled": true, "order": 2, "title": "Premium Amenities", "items": [{ "title": "Golf Course", "description": "Championship 18-hole course" }, { "title": "Swimming Pool", "description": "Olympic sized infinity pool" }, { "title": "24/7 Security", "description": "Gated community with patrols" }] }, { "id": "contact", "type": "contact", "enabled": true, "order": 10, "title": "Get in Touch", "subtitle": "Schedule a private tour today.", "cta": { "label": "Contact Sales", "href": "mailto:sales@sunnyhills.com", "variant": "primary" } }];
const sunnyHills = {
  id,
  name,
  brand,
  seo: seo$2,
  sections
};
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  brand,
  default: sunnyHills,
  id,
  name,
  sections,
  seo: seo$2
}, Symbol.toStringTag, { value: "Module" }));
const developmentsGrid = /* @__PURE__ */ Object.assign({ "../developments/sunny-hills.json": __vite_glob_0_0 });
function getAllDevelopments() {
  return Object.values(developmentsGrid).map((mod) => mod.default || mod);
}
function getDevelopment(slug) {
  return getAllDevelopments().find((dev) => dev.id === slug);
}
const DynamicPageNavigation = () => {
  const location2 = useLocation();
  if (location2.pathname !== "/") {
    return null;
  }
  const extractRoutesFromConfig = (routeConfig) => {
    const routes2 = [];
    const processRoute = (route, parentPath = "") => {
      const fullPath = parentPath + route.path;
      if (route.path === "*" || route.path === void 0) {
        return;
      }
      if (route.index === true && parentPath === "") {
        routes2.push({
          path: "/",
          name: "Home",
          current: location2.pathname === "/"
        });
        return;
      }
      if (route.element && route.element.type.name !== "RootLayout") {
        let name2 = "";
        if (fullPath === "/") {
          name2 = "Home";
        } else if (fullPath.includes("new-build-golf-properties-costa-blanca")) {
          const themeName = route.element?.props?.routeTheme;
          if (themeName) {
            name2 = themeName.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
          } else {
            name2 = "Golf";
          }
        } else if (fullPath.includes("style-editor")) {
          name2 = "Style Editor";
        } else if (fullPath.includes("developments/")) {
          const devId = fullPath.split("developments/")[1];
          const developments2 = getAllDevelopments();
          const dev = developments2.find((d) => d.id === devId);
          name2 = dev?.name || devId?.charAt(0).toUpperCase() + devId?.slice(1) || devId;
        } else {
          const parts = fullPath.split("/").filter(Boolean);
          name2 = parts.map(
            (part) => part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " ")
          ).join(" ");
        }
        if (name2) {
          routes2.push({
            path: fullPath,
            name: name2,
            current: location2.pathname === fullPath
          });
        }
      }
      if (route.children && Array.isArray(route.children)) {
        route.children.forEach((child) => processRoute(child, fullPath));
      }
    };
    routeConfig.forEach((route) => processRoute(route));
    return routes2;
  };
  const pageRoutes = extractRoutesFromConfig(routes);
  console.log("Extracted page routes:", pageRoutes);
  return /* @__PURE__ */ jsxs("div", { className: "fixed top-20 left-4 z-50 bg-white border border-gray-200 rounded-lg shadow-lg p-3 max-w-xs", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-3 pb-2 border-b border-gray-200", children: /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-gray-600 uppercase tracking-wider", children: "Navigation" }) }),
    /* @__PURE__ */ jsx("nav", { className: "space-y-1", children: pageRoutes.map((page) => /* @__PURE__ */ jsx(
      Link,
      {
        to: page.path,
        className: `block px-3 py-2 text-sm rounded-md transition-all duration-200 ${page.current ? "bg-primary text-primary-foreground font-medium shadow-sm" : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 hover:translate-x-1"}`,
        children: page.name
      },
      page.path
    )) })
  ] });
};
function ThemeProvider({ children, routeTheme }) {
  useEffect(() => {
    console.log(`🎨 [ThemeProvider] Initializing with routeTheme: "${routeTheme}"`);
    let finalThemeKey;
    if (routeTheme) {
      console.log(`🎨 [ThemeProvider] Using route theme: "${routeTheme}"`);
      const metadata = { theme: routeTheme };
      finalThemeKey = resolveTheme(metadata);
    } else {
      const currentPath = window.location.pathname;
      const savedTheme = getPageTheme(currentPath);
      if (savedTheme) {
        console.log(`🎨 [ThemeProvider] Using saved theme "${savedTheme}" for path "${currentPath}"`);
        finalThemeKey = savedTheme;
      } else {
        console.log(`🎨 [ThemeProvider] No saved theme found, using default theme "${DEFAULT_THEME}"`);
        finalThemeKey = DEFAULT_THEME;
      }
    }
    applyTheme(finalThemeKey);
  }, [routeTheme]);
  return /* @__PURE__ */ jsx(Fragment, { children });
}
const developments = getAllDevelopments();
const RootLayout = () => {
  return /* @__PURE__ */ jsxs(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center min-h-screen", children: "Loading..." }), children: [
    /* @__PURE__ */ jsx(DynamicPageNavigation, {}),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
};
const routes = [
  {
    path: "/",
    element: /* @__PURE__ */ jsx(RootLayout, {}),
    children: [
      {
        index: true,
        element: /* @__PURE__ */ jsx(LandingPage, { data: getDevelopment("sunny-hills") })
        // Default/Home
      },
      {
        path: "new-build-golf-properties-costa-blanca-modern/",
        element: /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsx(GolfPropertiesModern, {}) })
      },
      {
        path: "style-editor/",
        element: /* @__PURE__ */ jsx(StyleEditor, {})
      },
      {
        path: "golf-properties-new-layout/",
        element: /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsx(GolfPropertiesNewLayout, {}) })
      },
      ...developments.map((dev) => ({
        path: `developments/${dev.id}/`,
        element: /* @__PURE__ */ jsx(LandingPage, { data: dev })
      })),
      {
        path: "*",
        element: /* @__PURE__ */ jsx("div", { className: "p-10 text-center", children: "404 - Not Found" })
      }
    ]
  }
];
const seo$1 = { "title": "Modern New Build Golf Properties for Sale in Spain", "description": "Explore exclusive new build golf properties in Costa Blanca. From frontline villas to luxury apartments near top courses. Find your dream golf home in the sun today." };
const hero$1 = { "title_start": "Exclusive New Build", "title_middle": "Golf Properties in", "title_highlight": "Costa Blanca", "description": "A modern 3‑bedroom villa a short drive from several 18‑hole golf courses, the Mediterranean and all everyday services in a big shopping center nearby.", "cta_brochure": "Send me the brochure", "cta_explore": "Explore the villas", "footer_note": "Lock-up-and-leave homes made for golf trips, winter stays & family holidays." };
const villas$1 = { "title": "Villas made for golf days", "description_1": "You get a three‑bedroom, two‑bathroom villa of about 106 m² built, with smart use of space and light. The open‑plan living and kitchen area connects directly to the terrace and garden, so coming home after a round feels easy and relaxed.", "description_2": "One bedroom and one bathroom are on the ground floor; two bedrooms and another bathroom are upstairs with access to a large terrace. There is room for friends or family to join you, without losing privacy or comfort.", "points": { "layout": "3 bedrooms, 2 bathrooms over two levels.", "space": "Approx. 106 m² built, about 85 m² indoors, 56 m² of terraces.", "garden": "Private garden of roughly 150–213 m² with on‑plot space for parking and outdoor living." } };
const gallery$1 = { "title": "Property Details & Layout", "tabs": { "photos": "Development Photos", "plans": "Floor Plans" } };
const golf$1 = { "title": "Your base in the Orihuela Costa golf belt", "description_1": "From Costa Blanca you are only a short drive from several well‑known 18‑hole courses in the Orihuela Costa area. You can vary where you play, adjust difficulty to the group and keep golf fresh week after week.", "description_2": "The climate gives you many sunny days and mild winters, so the villa works for long winter stays, spring and autumn trips – not just a two‑week summer holiday.", "points": { "cluster": "Cluster of golf courses nearby instead of a single option.", "season": "Long playing season with comfortable winter temperatures.", "routine": "Easy to build a routine: golf in the morning, sea or terrace time in the afternoon." } };
const location$1 = { "title": "La Zenia: easy living by the sea", "description": "Costa Blanca sits in a residential part of La Zenia with supermarkets, cafés, restaurants and services close by. A large shopping centre in the area adds more shops, dining and entertainment in one place.", "points": { "services": { "title": "Services & Leisure", "description": "Everyday services and leisure within a short distance." }, "beaches": { "title": "Beaches", "description": "Sandy beaches and coastal walks nearby." }, "year_round": { "title": "Year-round", "description": "Suitable for both short breaks and longer winter stays." } }, "note": "Beaches and small coves are only a short drive away, ideal for rest days or for family members who prefer the sea to the fairways. You do not need to choose between golf, beach and convenience – you get all three." };
const lifestyle$1 = { "title": "Modern, low‑maintenance comfort", "description_1": "These are new build villas with a clean, contemporary design. Fitted wardrobes, a modern kitchen and well‑planned bathrooms keep the house practical and uncluttered.", "description_2": "Private plots are big enough for terraces, planting and, depending on configuration, a pool area – but not so large that they become a burden to maintain. Installations are prepared for year‑round use, not just high summer.", "points": { "construction": "New construction with modern materials and equipment.", "outdoor": "Outdoor space focused on living, dining and relaxing.", "maintenance": "A home that is easy to close, leave and open again several times a year." } };
const contact$1 = { "title": "Price, scarcity and next step", "price_info": "Costa Blanca consists of a small number of villas. Current prices are in the range of <0>449,900 to 479,900 euros</0>, depending on plot and configuration.", "warning": "With limited units, availability can change quickly.", "cta_intro": "If you are looking for a golf‑oriented home in La Zenia, the next step is simple:", "cta_brochure": "Send me the Costa Blanca brochure", "cta_availability": "Check availability & exact prices", "cta_visit": "Help me arrange a visit" };
const enCostaBlanca = {
  seo: seo$1,
  hero: hero$1,
  villas: villas$1,
  gallery: gallery$1,
  golf: golf$1,
  location: location$1,
  lifestyle: lifestyle$1,
  contact: contact$1
};
const seo = { "title": "Propriétés de golf neuves à vendre en Espagne", "description": "Découvrez des propriétés de golf neuves exclusives sur la Costa Blanca. Des villas en première ligne aux appartements de luxe près des meilleurs parcours. Trouvez votre maison de golf de rêve au soleil dès aujourd'hui." };
const hero = { "title_start": "Propriétés de golf", "title_middle": "neuves exclusives sur la", "title_highlight": "Costa Blanca", "description": "Une villa moderne de 3 chambres à une courte distance en voiture de plusieurs parcours de golf de 18 trous, de la Méditerranée et de tous les services quotidiens dans un grand centre commercial à proximité.", "cta_brochure": "Envoyez-moi la brochure", "cta_explore": "Explorer les villas", "footer_note": "Maisons prêtes à vivre conçues pour les séjours de golf, les hivers et les vacances en famille." };
const villas = { "title": "Des villas conçues pour le golf", "description_1": "Vous bénéficiez d'une villa de trois chambres et deux salles de bains d'environ 106 m² construits, avec une utilisation intelligente de l'espace et de la lumière. Le salon et la cuisine à aire ouverte communiquent directement avec la terrasse et le jardin, pour que rentrer après une partie soit facile et relaxant.", "description_2": "Une chambre et une salle de bain se trouvent au rez-de-chaussée ; deux chambres et une autre salle de bain sont à l'étage avec accès à une grande terrasse. Il y a de la place pour que des amis ou de la famille vous rejoignent, sans perdre en intimité ni en confort.", "points": { "layout": "3 chambres, 2 salles de bains sur deux niveaux.", "space": "Environ 106 m² construits, environ 85 m² intérieurs, 56 m² de terrasses.", "garden": "Jardin privé d'environ 150–213 m² avec espace sur la parcelle pour le parking et la vie en plein air." } };
const gallery = { "title": "Détails et Agencement de la Propriété", "tabs": { "photos": "Photos du Projet", "plans": "Plans" } };
const golf = { "title": "Votre base dans la ceinture de golf d'Orihuela Costa", "description_1": "Depuis Costa Blanca, vous n'êtes qu'à quelques minutes en voiture de plusieurs parcours de 18 trous renommés dans la région d'Orihuela Costa. Vous pouvez varier les endroits où vous jouez, adapter la difficulté au groupe et garder le golf frais semaine après semaine.", "description_2": "Le climat vous offre de nombreux jours ensoleillés et des hivers doux, de sorte que la villa convient aux longs séjours d'hiver, aux escapades de printemps et d'automne – pas seulement pour deux semaines de vacances d'été.", "points": { "cluster": "Groupe de parcours de golf à proximité au lieu d'une seule option.", "season": "Longue saison de jeu avec des températures hivernales confortables.", "routine": "Routine facile à construire : golf le matin, mer ou temps sur la terrasse l'après-midi." } };
const location = { "title": "La Zenia : la vie facile en bord de mer", "description": "Costa Blanca se situe dans une partie résidentielle de La Zenia avec des supermarchés, des cafés, des restaurants et des services à proximité. Un grand centre commercial dans le secteur ajoute plus de boutiques, de restaurants et de divertissements en un seul endroit.", "points": { "services": { "title": "Services et Loisirs", "description": "Services quotidiens et loisirs à courte distance." }, "beaches": { "title": "Plages", "description": "Plages de sable et promenades côtières à proximité." }, "year_round": { "title": "Toute l'année", "description": "Idéal pour les courts séjours et les séjours d'hiver plus longs." } }, "note": "Les plages et les petites criques ne sont qu'à quelques minutes en voiture, idéal pour les jours de repos ou pour les membres de la famille qui préfèrent la mer aux fairways. Vous n'avez pas à choisir entre golf, plage et commodité – vous avez les trois." };
const lifestyle = { "title": "Confort moderne et peu d'entretien", "description_1": "Ce sont des villas de construction neuve avec un design propre et contemporain. Des armoires encastrées, une cuisine moderne et des salles de bains bien conçues rendent la maison pratique et ordonnée.", "description_2": "Les parcelles privées sont assez grandes pour les terrasses, les plantations et, selon la configuration, une piscine – mais pas assez grandes pour devenir un fardeau à entretenir. Les installations sont préparées pour une utilisation toute l'année, pas seulement pour le plein été.", "points": { "construction": "Construction neuve avec des matériaux et équipements modernes.", "outdoor": "Espace extérieur axé sur la vie, les repas et la détente.", "maintenance": "Une maison facile à fermer, à quitter et à rouvrir plusieurs fois par an." } };
const contact = { "title": "Prix, rareté et étape suivante", "price_info": "Costa Blanca se compose d'un petit nombre de villas. Les prix actuels se situent dans la fourchette de <0>449 900 à 479 900 euros</0>, selon la parcelle et la configuration.", "warning": "Avec un nombre limité d'unités, la disponibilité peut changer rapidement.", "cta_intro": "Si vous recherchez une maison orientée golf à La Zenia, l'étape suivante est simple :", "cta_brochure": "Envoyez-moi la brochure Costa Blanca", "cta_availability": "Vérifier la disponibilité et les prix exacts", "cta_visit": "Aidez-moi à organiser une visite" };
const frCostaBlanca = {
  seo,
  hero,
  villas,
  gallery,
  golf,
  location,
  lifestyle,
  contact
};
const resources = {
  en: {
    "costa-blanca": enCostaBlanca
  },
  fr: {
    "costa-blanca": frCostaBlanca
  }
};
i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  // default language
  fallbackLng: "en",
  supportedLngs: ["en", "fr"],
  ns: ["costa-blanca"],
  defaultNS: "costa-blanca",
  interpolation: {
    escapeValue: false
    // React already safe from XSS
  },
  react: {
    useSuspense: true
  }
});
console.log("🎨 All themes loaded for bundling.");
const createRoot = ViteReactSSG(
  { routes, basename: "/newbuilds/" }
);
export {
  createRoot,
  createRoot as default
};
