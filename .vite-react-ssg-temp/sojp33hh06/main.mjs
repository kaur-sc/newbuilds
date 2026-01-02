import { Head, ViteReactSSG } from "vite-react-ssg";
import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import * as React from "react";
import { useState, useRef, useEffect, forwardRef, useImperativeHandle, Suspense, useCallback, useMemo } from "react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { cva } from "class-variance-authority";
import { Globe, ChevronDown, X, Menu, SquarePen, ChevronLeft, ChevronRight, ArrowRight, LandPlot, BadgeEuro, Plane, Armchair, Flag, ScanFace, Check, Maximize2, Sun, Waves, Bed, Bath, Ruler, Home, MapPin, Calendar, ShoppingBag, Coffee, Settings, RotateCcw, Settings2, Type, Download } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation, Trans, initReactI18next } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import i18n from "i18next";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function Container({ className, children, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className),
      "data-container": "true",
      ...props,
      children
    }
  );
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
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langRef = useRef(null);
  const languages = [
    { code: "en", name: "English", flag: "🇬🇧" },
    { code: "fr", name: "Français", flag: "🇫🇷" }
  ];
  const currentLang = languages.find((l) => l.code === i18n2.language) || languages[0];
  useEffect(() => {
    function handleClickOutside(event) {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return /* @__PURE__ */ jsxs("div", { className: "relative", ref: langRef, children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => setIsLangOpen(!isLangOpen),
        className: "flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors small",
        children: [
          /* @__PURE__ */ jsx(Globe, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { children: currentLang.code.toUpperCase() }),
          /* @__PURE__ */ jsx(ChevronDown, { className: `h-3 w-3 transition-transform ${isLangOpen ? "rotate-180" : ""}` })
        ]
      }
    ),
    isLangOpen && /* @__PURE__ */ jsx("div", { className: "absolute right-0 top-full mt-2 w-40 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-50 animate-fade-in-fast", children: languages.map((lang) => /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => {
          i18n2.changeLanguage(lang.code);
          setIsLangOpen(false);
        },
        className: `w-full text-left px-4 py-2 small hover:bg-muted/50 transition-colors flex items-center gap-3 ${i18n2.language === lang.code ? "font-bold text-primary" : ""}`,
        children: [
          /* @__PURE__ */ jsx("span", { children: lang.flag }),
          /* @__PURE__ */ jsx("span", { children: lang.name })
        ]
      },
      lang.code
    )) })
  ] });
}
const id$1 = "sunny-hills";
const name$1 = "Sunny Hills Estate";
const brand$1 = { "colors": { "primary": "222.2 47.4% 11.2%", "secondary": "210 40% 96.1%" } };
const seo$3 = { "title": "Sunny Hills - Luxury Living", "description": "Experience the pinnacle of luxury at Sunny Hills Estate. Modern homes, stunning views, and premium amenities." };
const sections$1 = [{ "id": "hero", "type": "hero", "enabled": true, "order": 1, "title": "Welcome to Sunny Hills", "subtitle": "Your Dream Home Awaits", "cta": { "label": "View Residences", "href": "#features", "variant": "primary" }, "media": "/assets/golf.jpg" }, { "id": "features", "type": "features", "enabled": true, "order": 2, "title": "Premium Amenities", "items": [{ "title": "Golf Course", "description": "Championship 18-hole course" }, { "title": "Swimming Pool", "description": "Olympic sized infinity pool" }, { "title": "24/7 Security", "description": "Gated community with patrols" }] }, { "id": "contact", "type": "contact", "enabled": true, "order": 10, "title": "Get in Touch", "subtitle": "Schedule a private tour today.", "cta": { "label": "Contact Sales", "href": "mailto:sales@sunnyhills.com", "variant": "primary" } }];
const index = {
  id: id$1,
  name: name$1,
  brand: brand$1,
  seo: seo$3,
  sections: sections$1
};
const __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  brand: brand$1,
  default: index,
  id: id$1,
  name: name$1,
  sections: sections$1,
  seo: seo$3
}, Symbol.toStringTag, { value: "Module" }));
const id = "new-build-golf-properties-costa-blanca";
const name = "Costa Blanca Golf Properties";
const brand = { "colors": { "primary": "216 100% 17%", "secondary": "44 76% 58%" } };
const seo$2 = { "title": "Golf Properties in Orihuela Costa | New-Build Golf Homes", "description": "Discover carefully selected new-build golf properties in Orihuela Costa. Homes surrounded by championship golf courses and Mediterranean living.", "ogImage": "/assets/golf.jpg" };
const sections = [{ "id": "announcement", "type": "banner", "enabled": true, "order": 0, "title": "Complimentary Golf Membership | Limited Time Offer" }, { "id": "hero", "type": "hero", "enabled": true, "order": 1, "title": "New Build Golf Properties in Costa Blanca", "subtitle": "New-Build Homes Surrounded by Championship Golf & Mediterranean Living", "media": "assets/golf.jpg", "layout": "left-aligned", "cta": { "label": "Contact Agent", "href": "#contact" } }, { "id": "intro", "type": "features", "enabled": true, "order": 2, "title": "Live where golf, sunshine, and modern comfort come together.", "subtitle": "Selection of premium properties in Spain's premier golf destination.", "layout": "split", "media": "assets/golf.jpg" }, { "id": "developments", "type": "features", "enabled": true, "order": 3, "title": "Carefully Selected New-Build Golf Developments", "subtitle": "We work with a curated portfolio of new-build developments located on or close to established golf courses.", "layout": "carousel" }, { "id": "courses", "type": "features", "enabled": true, "order": 4, "title": "Why Orihuela Costa Is One of Costa Blanca’s Top Golf Locations", "subtitle": "Concentration of high-quality golf courses and international atmosphere.", "layout": "grid", "columns": 3 }, { "id": "climate", "type": "features", "enabled": true, "order": 5, "title": "A Climate Made for Golf & Outdoor Living", "subtitle": "300+ days of sun per year for year-round golf enjoyment.", "layout": "grid", "columns": 3 }, { "id": "benefits", "type": "features", "enabled": true, "order": 6, "title": "Key Benefits of Owning a Golf Property", "subtitle": "Quality living and long-term appeal combined.", "layout": "grid", "columns": 2, "items": [{ "title": "Golf at Your Doorstep", "description": "Live within minutes of several championship courses. Play more often, drive less.", "icon": "LandPlot" }, { "title": "Modern Comfort", "description": "New-build properties offer contemporary design, energy efficiency, and low maintenance.", "icon": "Armchair" }, { "title": "International Community", "description": "Strong international population with excellent services and healthcare access.", "icon": "Globe" }, { "title": "Easy Access", "description": "Alicante and Murcia airports are both within easy reach with frequent flights.", "icon": "Plane" }, { "title": "Lifestyle Flexibility", "description": "Enjoy the property yourself, rent it out seasonally, or combine both.", "icon": "BadgeEuro" }] }, { "id": "collection", "type": "features", "enabled": true, "order": 7, "title": "Explore Our Golf Property Collection", "subtitle": "Detailed information about properties, surroundings, and lifestyle opportunities.", "layout": "grid", "columns": 2 }, { "id": "appeal", "type": "features", "enabled": true, "order": 8, "title": "Lifestyle & Investment Appeal Combined", "subtitle": "Consistent demand from golfers and lifestyle buyers.", "layout": "split", "media": "assets/golf.jpg" }, { "id": "imagine", "type": "hero", "enabled": true, "order": 9, "title": "Imagine Your Life Here", "subtitle": "Morning coffee, first tee, lunch by the sea.", "media": "assets/golf.jpg", "layout": "centered" }, { "id": "contact", "type": "contact", "enabled": true, "order": 10, "title": "Speak directly with a local property specialist", "content": "Contact us today and let's find the golf property in Orihuela Costa that truly fits your lifestyle.", "cta": { "label": "Contact Us Today", "href": "#contact" } }];
const newBuildGolfPropertiesCostaBlanca = {
  id,
  name,
  brand,
  seo: seo$2,
  sections
};
const __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  brand,
  default: newBuildGolfPropertiesCostaBlanca,
  id,
  name,
  sections,
  seo: seo$2
}, Symbol.toStringTag, { value: "Module" }));
const developmentsGrid = /* @__PURE__ */ Object.assign({ "../developments/index.json": __vite_glob_0_0, "../developments/new-build-golf-properties-costa-blanca.json": __vite_glob_0_1 });
function getAllDevelopments() {
  return Object.values(developmentsGrid).map((mod) => mod.default || mod);
}
function getDevelopment(slug) {
  return getAllDevelopments().find((dev) => dev.id === slug);
}
function Navbar({ data }) {
  const { t } = useTranslation(data.id);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const developments2 = getAllDevelopments();
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return /* @__PURE__ */ jsxs("nav", { className: "navbar bg-white border-b border-gray-100 z-50 sticky top-0", children: [
    /* @__PURE__ */ jsxs(Container, { className: "navbar-container h-20 flex items-center justify-between", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "site-logo", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: "/assets/golf-by-sunnycasas-logo.svg",
          alt: "Sunny Casas Golf Properties",
          className: "h-10 w-auto"
        }
      ) }),
      /* @__PURE__ */ jsxs("div", { className: "hidden md:flex items-center gap-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", ref: dropdownRef, children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setIsDropdownOpen(!isDropdownOpen),
              className: "flex items-center gap-1 group py-2",
              children: [
                "Golf Developments",
                /* @__PURE__ */ jsx(ChevronDown, { className: `h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}` })
              ]
            }
          ),
          isDropdownOpen && /* @__PURE__ */ jsx("div", { className: "absolute top-full left-0 mt-2 w-64 bg-white border border-gray-100 rounded-xl shadow-xl py-2 z-[60] animate-fade-in-fast", children: developments2.filter((dev) => dev.id !== "style-editor").map((dev) => /* @__PURE__ */ jsx(
            Link,
            {
              to: dev.id === "new-build-golf-properties-costa-blanca" ? "/" : `/developments/${dev.id}`,
              className: "block px-6 py-3 small underline hover:bg-muted/50 transition-colors",
              onClick: () => setIsDropdownOpen(false),
              children: dev.name
            },
            dev.id
          )) })
        ] }),
        /* @__PURE__ */ jsx(Button, { asChild: true, className: "btn-primary rounded-[4px] px-4", children: /* @__PURE__ */ jsx("a", { href: "#contact", children: t("nav.contact_agent") }) }),
        /* @__PURE__ */ jsx("div", { className: "h-6 w-px bg-gray-200 mx-2" }),
        /* @__PURE__ */ jsx(LanguageSwitcher, {})
      ] }),
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "md:hidden text-dark-blue",
          onClick: () => setIsOpen(!isOpen),
          children: isOpen ? /* @__PURE__ */ jsx(X, { className: "h-6 w-6" }) : /* @__PURE__ */ jsx(Menu, { className: "h-6 w-6" })
        }
      )
    ] }),
    isOpen && /* @__PURE__ */ jsx("div", { className: "mobile-menu md:hidden fixed inset-x-0 top-20 bg-white border-b shadow-lg z-40 p-6 animate-fade-in", children: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("p", { className: "caption text-gray-400 mb-4 tracking-widest uppercase", children: "Golf Developments" }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-4", children: developments2.filter((dev) => dev.id !== "style-editor").map((dev) => /* @__PURE__ */ jsx(
          Link,
          {
            to: dev.id === "new-build-golf-properties-costa-blanca" ? "/" : `/developments/${dev.id}`,
            className: "body-l",
            onClick: () => setIsOpen(false),
            children: dev.name
          },
          dev.id
        )) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "pt-4 border-t border-gray-100", children: /* @__PURE__ */ jsx(Button, { asChild: true, className: "btn-primary w-full h-14 text-lg rounded-full", children: /* @__PURE__ */ jsx("a", { href: "#contact", onClick: () => setIsOpen(false), children: t("nav.contact_agent") }) }) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-center pt-4", children: /* @__PURE__ */ jsx(LanguageSwitcher, {}) })
    ] }) })
  ] });
}
function Footer({ data }) {
  data.id === "sunny-hills" ? "/" : data.id === "costa-blanca" ? "/new-build-golf-properties-costa-blanca" : `/developments/${data.id}`;
  useLocation();
  return /* @__PURE__ */ jsx("footer", { className: "bg-muted py-12", children: /* @__PURE__ */ jsxs(Container, { className: "flex flex-col md:flex-row justify-between items-center gap-6", children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(
        Link,
        {
          to: "/",
          className: "block hover:opacity-80 transition-opacity",
          children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "/assets/SC-Logo-Horizontal.svg",
              alt: "Sunny Casas",
              className: "h-8 w-auto"
            }
          )
        }
      ),
      /* @__PURE__ */ jsxs("p", { className: "small text-muted-foreground mt-2", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " SUNNY CASAS. All rights reserved."
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
function HeroBlock({ data, namespace, developments: developments2 = [] }) {
  const { t } = useTranslation(namespace);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  return /* @__PURE__ */ jsxs("section", { className: "hero-block relative min-h-[85vh] flex items-center overflow-hidden", children: [
    /* @__PURE__ */ jsx("div", { className: "hero-block-background absolute inset-0 z-0 pointer-events-none", children: data.media && /* @__PURE__ */ jsx(
      "img",
      {
        src: resolveAsset(data.media),
        alt: t(`${data.id}.title`),
        className: "w-full h-full object-cover img-zoom",
        loading: "eager",
        fetchPriority: "high"
      }
    ) }),
    /* @__PURE__ */ jsx("div", { className: "hero-block-overlay absolute inset-0 z-10 pointer-events-none" }),
    /* @__PURE__ */ jsx(Container, { className: "hero-block-content relative z-20", children: /* @__PURE__ */ jsxs("div", { className: "hero-block-content-wrapper max-w-3xl text-left", children: [
      /* @__PURE__ */ jsx("h1", { className: "hero-block-title h1 mb-6 text-[#F1F5F9]", children: t(`${data.id}.title`, { defaultValue: data.title }) }),
      (data.subtitle || t(`${data.id}.subtitle`, { defaultValue: data.subtitle })) && /* @__PURE__ */ jsx("p", { className: "hero-block-subtitle body-l mb-10 text-white max-w-xl", children: t(`${data.id}.subtitle`, { defaultValue: data.subtitle }) }),
      /* @__PURE__ */ jsxs("div", { className: "hero-block-buttons flex flex-wrap gap-4 justify-start relative", children: [
        data.cta && /* @__PURE__ */ jsx(Button, { asChild: true, className: "hero-btn-primary min-w-[180px]", children: /* @__PURE__ */ jsxs("a", { href: data.cta.href, className: "flex items-center justify-center gap-2 px-6", children: [
          t(`${data.id}.contact_agent`, { defaultValue: "Contact Agent" }),
          /* @__PURE__ */ jsx(SquarePen, { className: "h-4 w-4" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxs(
            Button,
            {
              variant: "outline",
              className: "hero-btn-secondary min-w-[180px] flex items-center justify-between gap-4 px-6 bg-white text-primary border-none hover:bg-gray-50",
              onClick: () => setIsDropdownOpen(!isDropdownOpen),
              children: [
                /* @__PURE__ */ jsx("span", { children: "View Collection" }),
                /* @__PURE__ */ jsx(ChevronDown, { className: `h-4 w-4 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}` })
              ]
            }
          ),
          isDropdownOpen && developments2 && developments2.length > 0 && /* @__PURE__ */ jsx("div", { className: "absolute top-full left-0 mt-2 w-[280px] bg-white rounded-md shadow-lg border border-gray-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200", children: /* @__PURE__ */ jsx("div", { className: "py-2 flex flex-col", children: developments2.map((dev, index2) => /* @__PURE__ */ jsx(
            "a",
            {
              href: dev.cta?.href || "#",
              className: "px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors text-left truncate",
              children: dev.title
            },
            index2
          )) }) })
        ] })
      ] })
    ] }) })
  ] });
}
function FeatureBar({ data, namespace }) {
  const features = data.items || [
    { text: "300+ Days of Sunshine" },
    { text: "5 Golf Courses Within 10 min" },
    { text: "Mediterranean Lifestyle" },
    { text: "Lock-Up-and-Leave Ready" },
    { text: "From €449,900" }
  ];
  const animatedFeatures = [...features, ...features];
  return /* @__PURE__ */ jsx("section", { className: "feature-bar relative overflow-hidden h-32 w-full flex items-center bg-white", children: /* @__PURE__ */ jsx("div", { className: "feature-bar-container w-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "feature-bar-animated flex flex-row items-center whitespace-nowrap", children: animatedFeatures.map((feature, index2) => /* @__PURE__ */ jsxs(
    "div",
    {
      className: "feature-item flex flex-row items-center gap-5 mx-3",
      children: [
        /* @__PURE__ */ jsx("span", { className: "text-1xl text-primary", children: "✦" }),
        /* @__PURE__ */ jsx("span", { className: "feature-text text-m font-light", children: feature.text })
      ]
    },
    index2
  )) }) }) });
}
function TwoColumnBlock({ data, namespace }) {
  const { t } = useTranslation(namespace);
  const imagePosition = data.imagePosition || "left";
  return /* @__PURE__ */ jsxs("section", { className: `two-column-block relative w-full flex flex-col md:flex-row ${imagePosition === "right" ? "md:flex-row-reverse" : ""}`, children: [
    /* @__PURE__ */ jsx("div", { className: "two-column-image flex-1 relative overflow-hidden min-h-[400px] md:min-h-[600px]", children: data.media ? /* @__PURE__ */ jsx(
      "img",
      {
        src: resolveAsset(data.media),
        alt: t(`${data.id}.title`),
        className: "absolute inset-0 w-full h-full object-cover"
      }
    ) : /* @__PURE__ */ jsx("div", { className: "absolute inset-0 w-full h-full bg-gray-200 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-gray-400", children: "Image placeholder" }) }) }),
    /* @__PURE__ */ jsx("div", { className: "two-column-content flex-1 bg-primary flex flex-col justify-center items-start p-8 md:p-20 lg:p-32", children: /* @__PURE__ */ jsxs("div", { className: "two-column-content-wrapper max-w-2xl flex flex-col gap-8", children: [
      /* @__PURE__ */ jsx("h2", { className: "two-column-title text-4xl md:text-5xl lg:text-6xl text-white", children: t(`${data.id}.title`, { defaultValue: data.title }) }),
      /* @__PURE__ */ jsxs("div", { className: "two-column-paragraphs flex flex-col gap-6", children: [
        /* @__PURE__ */ jsx("p", { className: "two-column-subtitle text-lg md:text-xl text-white opacity-90 leading-relaxed", children: t(`${data.id}.subtitle`, { defaultValue: data.subtitle }) }),
        data.content && /* @__PURE__ */ jsx("p", { className: "two-column-description text-lg md:text-xl text-white opacity-90 leading-relaxed", children: t(`${data.id}.content`, { defaultValue: data.content }) })
      ] })
    ] }) })
  ] });
}
const Carousel = forwardRef(
  ({ children, className = "", onScrollLeft, onScrollRight }, ref) => {
    const scrollRef = useRef(null);
    useImperativeHandle(ref, () => ({
      scrollLeft: () => {
        if (scrollRef.current) {
          scrollRef.current.scrollBy({ left: -400, behavior: "smooth" });
          onScrollLeft?.();
        }
      },
      scrollRight: () => {
        if (scrollRef.current) {
          scrollRef.current.scrollBy({ left: 400, behavior: "smooth" });
          onScrollRight?.();
        }
      }
    }));
    return /* @__PURE__ */ jsx("div", { className: `w-full ${className}`, children: /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx("div", { className: "ml-[max(1rem,calc((100vw-80rem)/2+1rem))] sm:ml-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:ml-[max(2rem,calc((100vw-80rem)/2+2rem)]", children: /* @__PURE__ */ jsx(
      "div",
      {
        ref: scrollRef,
        className: "flex flex-row gap-6 overflow-x-auto pb-8 snap-x snap-mandatory",
        style: { scrollbarWidth: "none", msOverflowStyle: "none" },
        children
      }
    ) }) }) });
  }
);
Carousel.displayName = "Carousel";
function ProjectGrid({ data, namespace }) {
  const { t } = useTranslation(namespace);
  const carouselRef = useRef(null);
  const projects = data.items || [
    {
      title: "La Vista Boulevard - Phase 1",
      description: "Modern 2-3 bedroom villas with stunning golf views and Mediterranean architecture.",
      image: "/assets/lvb/lvb-01-3d.jpg",
      reference: "SCG001",
      cta: { label: "View Project", href: "#" }
    },
    {
      title: "La Vista Boulevard - Phase 2",
      description: "Contemporary apartments and townhouses with premium finishes and communal facilities.",
      image: "/assets/lvb/lvb-02-3d.jpg",
      reference: "SCG002",
      cta: { label: "View Project", href: "#" }
    },
    {
      title: "La Vista Boulevard - Phase 3",
      description: "Luxury villas with private pools and panoramic golf course views.",
      image: "/assets/lvb/lvb-03-3d.jpg",
      reference: "SCG003",
      cta: { label: "View Project", href: "#" }
    },
    {
      title: "La Vista Boulevard - Premium Collection",
      description: "Exclusive residences with enhanced amenities and landscaped gardens.",
      image: "/assets/lvb/lvb-11-3d.jpg",
      reference: "SCG011",
      cta: { label: "View Project", href: "#" }
    },
    {
      title: "La Vista Boulevard - Golf View Residences",
      description: "Stunning properties overlooking the championship fairways with modern design.",
      image: "/assets/lvb/lvb-12-3d.jpg",
      reference: "SCG012",
      cta: { label: "View Project", href: "#" }
    },
    {
      title: "La Vista Boulevard - Final Phase",
      description: "Last opportunity to secure your dream home in this prestigious development.",
      image: "/assets/lvb/lvb-13-3d.jpg",
      reference: "SCG013",
      cta: { label: "View Project", href: "#" }
    }
  ];
  return /* @__PURE__ */ jsxs("section", { className: "project-grid relative bg-[#f0f0f0] w-full py-20 md:py-32", children: [
    /* @__PURE__ */ jsx(Container, { className: "mb-12", children: /* @__PURE__ */ jsxs("div", { className: "project-grid-header flex flex-col md:flex-row justify-between items-start md:items-end gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "project-grid-header-content max-w-2xl flex flex-col gap-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "project-grid-title text-4xl md:text-5xl leading-tight", children: t(`${data.id}.title`, { defaultValue: data.title }) }),
        /* @__PURE__ */ jsx("p", { className: "project-grid-subtitle text-lg opacity-80 max-w-xl", children: t(`${data.id}.subtitle`, { defaultValue: data.subtitle }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "project-grid-controls hidden md:flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => carouselRef.current?.scrollLeft(),
            className: "w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm",
            "aria-label": "Previous",
            children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-6 h-6" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => carouselRef.current?.scrollRight(),
            className: "w-12 h-12 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors shadow-sm",
            "aria-label": "Next",
            children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-6 h-6" })
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Carousel, { ref: carouselRef, children: projects.map((project, index2) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "project-card flex-shrink-0 w-[300px] md:w-[380px] bg-white rounded-lg overflow-hidden snap-start flex flex-col",
        children: [
          /* @__PURE__ */ jsx("div", { className: "project-card-image relative aspect-[16/11] overflow-hidden", children: project.image ? /* @__PURE__ */ jsx(
            "img",
            {
              src: resolveAsset(project.image),
              alt: project.title,
              className: "absolute inset-0 w-full h-full object-cover"
            }
          ) : /* @__PURE__ */ jsx("div", { className: "absolute inset-0 w-full h-full bg-gray-300 flex items-center justify-center", children: /* @__PURE__ */ jsx("span", { className: "text-gray-500 text-sm", children: "Project Image" }) }) }),
          /* @__PURE__ */ jsxs("div", { className: "project-card-content p-6 md:p-8 flex flex-col flex-1 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "project-card-info flex flex-col gap-2 flex-1", children: [
              /* @__PURE__ */ jsx("h3", { className: "project-card-title text-xl md:text-2xl font-normal leading-snug", children: project.title }),
              project.reference && /* @__PURE__ */ jsxs("p", { className: "project-card-reference text-sm text-gray-500 font-medium", children: [
                "Ref.: ",
                project.reference
              ] }),
              /* @__PURE__ */ jsx("p", { className: "project-card-description text-sm md:text-base text-gray-600 leading-relaxed line-clamp-3", children: project.description })
            ] }),
            project.cta && /* @__PURE__ */ jsx(Button, { asChild: true, className: "project-card-button bg-primary hover:bg-primary/90 text-white w-full rounded-md h-12", children: /* @__PURE__ */ jsx("a", { href: project.cta.href, children: project.cta.label }) })
          ] })
        ]
      },
      index2
    )) })
  ] });
}
function CourseGrid({ data, namespace }) {
  const { t } = useTranslation(namespace);
  const carouselRef = useRef(null);
  const courses2 = data.items || [
    {
      title: "Villamartín Golf",
      description: "Established and iconic course with a vibrant community.",
      cta: { label: "View Homepage", href: "#" }
    },
    {
      title: "Las Ramblas Golf",
      description: "Challenging course with dramatic landscapes and views.",
      cta: { label: "View Homepage", href: "#" }
    },
    {
      title: "Real Club de Golf Campoamor",
      description: "Championship course with mature surroundings.",
      cta: { label: "View Homepage", href: "#" }
    },
    {
      title: "Las Colinas Golf & Country Club",
      description: "Private valley setting with world-class facilities.",
      cta: { label: "View Homepage", href: "#" }
    },
    {
      title: "Lo Romero Golf",
      description: "Beautiful 18th hole island green and stunning vistas.",
      cta: { label: "View Homepage", href: "#" }
    }
  ];
  return /* @__PURE__ */ jsxs("section", { className: "course-grid relative bg-white w-full py-20 md:py-32", children: [
    /* @__PURE__ */ jsx(Container, { className: "mb-12", children: /* @__PURE__ */ jsxs("div", { className: "course-grid-header flex flex-col md:flex-row justify-between items-start md:items-end gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "course-grid-header-content max-w-2xl flex flex-col gap-4", children: [
        /* @__PURE__ */ jsx("h2", { className: "course-grid-title text-4xl md:text-5xl font-normal leading-tight", children: t(`${data.id}.title`, { defaultValue: data.title }) }),
        /* @__PURE__ */ jsx("p", { className: "course-grid-subtitle text-lg opacity-80 max-w-2xl", children: t(`${data.id}.subtitle`, { defaultValue: data.subtitle }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "course-grid-controls hidden md:flex items-center gap-4", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => carouselRef.current?.scrollLeft(),
            className: "w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm",
            "aria-label": "Previous",
            children: /* @__PURE__ */ jsx(ChevronLeft, { className: "w-6 h-6" })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => carouselRef.current?.scrollRight(),
            className: "w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors shadow-sm",
            "aria-label": "Next",
            children: /* @__PURE__ */ jsx(ChevronRight, { className: "w-6 h-6" })
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(Carousel, { ref: carouselRef, children: courses2.map((course, index2) => /* @__PURE__ */ jsxs(
      "div",
      {
        className: "course-card flex-shrink-0 w-[300px] md:w-[380px] bg-[#f5f5f5] rounded-lg overflow-hidden snap-start flex flex-col",
        children: [
          /* @__PURE__ */ jsx("div", { className: "course-card-image relative aspect-[16/11] overflow-hidden", children: course.image ? /* @__PURE__ */ jsx(
            "img",
            {
              src: resolveAsset(course.image),
              alt: course.title,
              className: "absolute inset-0 w-full h-full object-cover"
            }
          ) : /* @__PURE__ */ jsx(
            "img",
            {
              src: "/assets/golf.jpg",
              alt: course.title,
              className: "absolute inset-0 w-full h-full object-cover"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "course-card-content p-6 md:p-8 flex flex-col flex-1 gap-6", children: [
            /* @__PURE__ */ jsxs("div", { className: "course-card-info flex flex-col gap-4 flex-1", children: [
              /* @__PURE__ */ jsx("h3", { className: "course-card-title text-xl md:text-2xl font-normal leading-snug", children: course.title }),
              /* @__PURE__ */ jsx("p", { className: "course-card-description text-sm md:text-base text-gray-600 leading-relaxed", children: course.description })
            ] }),
            course.cta && /* @__PURE__ */ jsx(Button, { asChild: true, className: "course-card-button bg-primary hover:bg-primary/90 text-white w-full rounded-md h-12", children: /* @__PURE__ */ jsxs("a", { href: course.cta.href, className: "flex items-center justify-center gap-2", children: [
              course.cta.label,
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-4 h-4 text-white" })
            ] }) })
          ] })
        ]
      },
      index2
    )) })
  ] });
}
function ClimateSection({ data, namespace }) {
  const { t } = useTranslation(namespace);
  const media = data.media || "/assets/lvb/golf-06-s.jpg";
  const benefits2 = data.items || [
    {
      title: "300+ Sunny Days",
      description: "More than 300 sunny days per year for year-round outdoor enjoyment."
    },
    {
      title: "Mild Winters",
      description: "Comfortable daytime temperatures even in the middle of winter."
    },
    {
      title: "Outdoor Lifestyle",
      description: "Long seasons ideal for golf, walking, and terrace living."
    },
    {
      title: "Exquisite Mediterranean Cuisine",
      description: "Savor the healthy Mediterranean diet with vibrant tapas, fresh seafood, and exceptional dining experiences."
    }
  ];
  return /* @__PURE__ */ jsxs("section", { className: "climate-section", children: [
    /* @__PURE__ */ jsxs("div", { className: "climate-background", children: [
      /* @__PURE__ */ jsx("div", { className: "climate-background-image", children: /* @__PURE__ */ jsx(
        "img",
        {
          src: resolveAsset(media),
          alt: "Costa Blanca Climate"
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "climate-overlay" }),
      /* @__PURE__ */ jsx("div", { className: "climate-content", children: /* @__PURE__ */ jsx(Container, { className: "h-full flex flex-col justify-end items-center md:justify-center md:items-end", children: /* @__PURE__ */ jsxs("div", { className: "climate-text-content text-white", children: [
        /* @__PURE__ */ jsx("h2", { className: "climate-title h1 text-white", children: t(`${data.id}.title`, { defaultValue: data.title }) }),
        /* @__PURE__ */ jsx("p", { className: "climate-subtitle body-l text-white leading-relaxed", children: t(`${data.id}.subtitle`, { defaultValue: data.subtitle }) })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "climate-benefits", children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsx("div", { className: "climate-benefits-grid text-white", children: benefits2.map((benefit, index2) => /* @__PURE__ */ jsxs("div", { className: "climate-benefit-item", children: [
      /* @__PURE__ */ jsx("h3", { className: "climate-benefit-title h3 text-white", children: benefit.title }),
      /* @__PURE__ */ jsx("p", { className: "climate-benefit-description body", children: benefit.description })
    ] }, index2)) }) }) })
  ] });
}
function BenefitGrid({ data, namespace }) {
  const { t } = useTranslation(namespace);
  const benefits2 = data.items || [
    {
      title: "Golf at Your Doorstep",
      description: "Live within minutes of several championship courses. Play more often, drive less.",
      icon: "LandPlot"
    },
    {
      title: "Modern Comfort",
      description: "New-build properties offer contemporary design, energy efficiency, and low maintenance.",
      icon: "Armchair"
    },
    {
      title: "International Community",
      description: "Strong international population with excellent services and healthcare access.",
      icon: "Globe"
    },
    {
      title: "Easy Access",
      description: "Alicante and Murcia airports are both within easy reach with frequent flights.",
      icon: "Plane"
    },
    {
      title: "Lifestyle Flexibility",
      description: "Enjoy the property yourself, rent it out seasonally, or combine both.",
      icon: "BadgeEuro"
    }
  ];
  const getIcon = (iconName) => {
    const iconMap = {
      Flag,
      Armchair,
      Globe,
      Plane,
      BadgeEuro,
      LandPlot,
      flag: Flag,
      armchair: Armchair,
      globe: Globe,
      plane: Plane,
      "badge-euro": BadgeEuro,
      "land-plot": LandPlot
    };
    const keys = Object.keys(iconMap);
    const match = keys.find((key) => key.toLowerCase() === iconName.toLowerCase().replace(/-/g, ""));
    const IconComponent = iconMap[iconName] || (match ? iconMap[match] : ScanFace);
    return /* @__PURE__ */ jsx(IconComponent, { className: "w-12 h-12 text-[#10b981]", strokeWidth: 1.5 });
  };
  return /* @__PURE__ */ jsx(
    "section",
    {
      id: data.id,
      className: "relative bg-white w-full flex flex-col justify-start items-center flex-nowrap py-32 box-border",
      children: /* @__PURE__ */ jsx(Container, { children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: "relative w-full flex flex-col justify-start items-start flex-nowrap gap-16",
          children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: "relative w-full flex flex-col justify-start items-start flex-nowrap gap-4",
                children: [
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "relative w-[42rem] max-w-full flex flex-col justify-start items-start flex-nowrap",
                      children: /* @__PURE__ */ jsx(
                        "h2",
                        {
                          className: "text-left bg-[rgba(15,23,41,1.00)] bg-clip-text text-transparent not-italic text-[2.6375rem] font-light leading-[3rem] tracking-[-0.03rem]",
                          style: { fontFamily: "Inter, sans-serif" },
                          children: t(`${data.id}.title`, { defaultValue: data.title })
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "div",
                    {
                      className: "relative w-full flex flex-col justify-start items-start flex-nowrap",
                      children: /* @__PURE__ */ jsx(
                        "p",
                        {
                          className: "text-left bg-[rgba(15,23,41,1.00)] bg-clip-text text-transparent not-italic text-[1.14rem] font-normal leading-8",
                          style: { fontFamily: "Inter, sans-serif" },
                          children: t(`${data.id}.subtitle`, { defaultValue: data.subtitle })
                        }
                      )
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "relative w-full flex flex-row justify-start items-start flex-wrap gap-x-8 gap-y-8",
                children: benefits2.map((benefit, index2) => /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "relative w-[36rem] max-w-full flex flex-row justify-start items-start flex-nowrap gap-8",
                    children: [
                      /* @__PURE__ */ jsx(
                        "div",
                        {
                          className: "relative overflow-hidden h-12 w-12 flex-shrink-0",
                          children: getIcon(benefit.icon || "default")
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "div",
                        {
                          className: "relative flex-1 flex flex-col justify-start items-start flex-nowrap gap-2",
                          children: [
                            /* @__PURE__ */ jsx(
                              "div",
                              {
                                className: "relative w-full flex flex-col justify-start items-start flex-nowrap",
                                children: /* @__PURE__ */ jsx(
                                  "h3",
                                  {
                                    className: "text-left bg-[rgba(15,23,41,1.00)] bg-clip-text text-transparent not-italic text-[1.675rem] font-light leading-9 whitespace-nowrap",
                                    style: { fontFamily: "Inter, sans-serif" },
                                    children: benefit.title
                                  }
                                )
                              }
                            ),
                            /* @__PURE__ */ jsx(
                              "div",
                              {
                                className: "relative w-full flex flex-col justify-start items-start flex-nowrap",
                                children: /* @__PURE__ */ jsx(
                                  "p",
                                  {
                                    className: "text-left bg-[rgba(15,23,41,1.00)] bg-clip-text text-transparent not-italic text-[0.95rem] font-normal leading-6",
                                    style: { fontFamily: "Inter, sans-serif" },
                                    children: benefit.description
                                  }
                                )
                              }
                            )
                          ]
                        }
                      )
                    ]
                  },
                  index2
                ))
              }
            )
          ]
        }
      ) })
    }
  );
}
function CallToActionSection({ data, namespace }) {
  const { t } = useTranslation(namespace);
  return /* @__PURE__ */ jsx("section", { className: "cta-section relative h-[56.25rem] w-full flex flex-col justify-start items-start flex-nowrap", children: /* @__PURE__ */ jsxs("div", { className: "cta-background relative h-[56.25rem] w-full", children: [
    data.media ? /* @__PURE__ */ jsx(
      "img",
      {
        src: resolveAsset(data.media),
        alt: t(`${data.id}.title`),
        className: "w-full h-full object-cover"
      }
    ) : /* @__PURE__ */ jsx("div", { className: "w-full h-full bg-gradient-to-br from-blue-600 to-green-600" }),
    /* @__PURE__ */ jsx("div", { className: "cta-overlay absolute inset-0" }),
    /* @__PURE__ */ jsx("div", { className: "cta-content absolute inset-0 flex flex-col justify-start items-center pt-16 md:pt-32", children: /* @__PURE__ */ jsxs("div", { className: "cta-text-content max-w-2xl text-center text-white", children: [
      /* @__PURE__ */ jsx("h1", { className: "cta-title h1 mb-4 text-white", children: t(`${data.id}.title`, { defaultValue: data.title }) }),
      /* @__PURE__ */ jsx("p", { className: "cta-subtitle body-l mb-8 text-white", children: t(`${data.id}.subtitle`, { defaultValue: data.subtitle }) }),
      data.cta && /* @__PURE__ */ jsx(Button, { asChild: true, className: "cta-button btn-secondary min-w-[200px]", children: /* @__PURE__ */ jsxs("a", { href: data.cta.href, className: "flex items-center gap-2", children: [
        t(`${data.id}.cta_label`, { defaultValue: data.cta.label }),
        " ",
        /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })
      ] }) })
    ] }) })
  ] }) });
}
function ContactSection({ data, namespace }) {
  const { t } = useTranslation(namespace);
  const badges = data.badges || [
    { icon: "check", text: "Free Information Pack" },
    { icon: "check", text: "Direct Pricing" },
    { icon: "check", text: "No Obligation" }
  ];
  return /* @__PURE__ */ jsx(
    "section",
    {
      id: data.id,
      className: "relative bg-[#10b77f] w-full flex flex-col justify-start items-center flex-nowrap py-24 px-4 sm:px-8",
      children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[90rem] flex flex-col justify-start items-center flex-nowrap gap-6", children: [
        /* @__PURE__ */ jsx("div", { className: "relative w-full flex flex-col justify-start items-center flex-nowrap", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center text-center items-center w-full max-w-[54.125rem] relative", children: /* @__PURE__ */ jsx(
          "h2",
          {
            className: "text-white not-italic text-[2.625rem] font-light leading-[3rem] tracking-[-0.03rem]",
            style: { fontFamily: "Inter, sans-serif" },
            children: t(`${data.id}.title`, { defaultValue: data.title })
          }
        ) }) }),
        /* @__PURE__ */ jsx("div", { className: "relative w-full flex flex-col justify-start items-center flex-nowrap", children: /* @__PURE__ */ jsx("div", { className: "flex justify-center text-center items-center w-full max-w-[42rem] relative", children: /* @__PURE__ */ jsx(
          "p",
          {
            className: "text-white not-italic text-[1.15rem] font-normal leading-8",
            style: { fontFamily: "Inter, sans-serif" },
            children: t(`${data.id}.description`, { defaultValue: data.description })
          }
        ) }) }),
        data.cta && /* @__PURE__ */ jsx("div", { className: "relative flex flex-col justify-center items-center flex-nowrap gap-4 mt-2", children: /* @__PURE__ */ jsx(
          Button,
          {
            asChild: true,
            className: "bg-white hover:bg-gray-50 text-[#18b058] rounded shadow-sm h-auto py-3 px-8 transition-colors",
            children: /* @__PURE__ */ jsxs("a", { href: data.cta.href, className: "no-underline flex flex-row items-center justify-center gap-2", children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "whitespace-nowrap not-italic text-[0.8625rem] font-normal leading-5",
                  style: { fontFamily: "Inter, sans-serif" },
                  children: t(`${data.id}.cta_label`, { defaultValue: data.cta.label })
                }
              ),
              /* @__PURE__ */ jsx(ArrowRight, { className: "w-5 h-5" })
            ] })
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "relative w-full flex flex-row justify-center items-center flex-wrap gap-x-8 pt-12 border-[#ffffff19] border-t-[1px] mt-2", children: badges.map((badge, index2) => /* @__PURE__ */ jsxs("div", { className: "flex flex-row justify-start items-center flex-nowrap gap-2", children: [
          /* @__PURE__ */ jsx(Check, { className: "w-4 h-4 text-white" }),
          /* @__PURE__ */ jsx(
            "span",
            {
              className: "whitespace-nowrap text-[rgba(255,255,255,0.60)] text-[0.85rem] font-normal leading-5 tracking-[0.009rem]",
              style: { fontFamily: "Inter, sans-serif" },
              children: badge.text
            }
          )
        ] }, index2)) })
      ] })
    }
  );
}
function LandingPage({ data }) {
  const { t } = useTranslation(data.id);
  return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center min-h-screen", children: "Loading..." }), children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col font-sans text-foreground bg-background", children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("title", { children: data.seo.title }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: data.seo.description }),
      data.seo.ogImage && /* @__PURE__ */ jsx("meta", { property: "og:image", content: data.seo.ogImage })
    ] }),
    /* @__PURE__ */ jsx(Navbar, { data }),
    /* @__PURE__ */ jsx("div", { className: "announcement-bar", children: /* @__PURE__ */ jsx("span", { className: "small", children: t("announcement.title", "EXCLUSIVE OFFER | COMPLIMENTARY GOLF MEMBERSHIP | LIMITED TIME") }) }),
    /* @__PURE__ */ jsxs("main", { className: "flex-1", children: [
      /* @__PURE__ */ jsx(
        HeroBlock,
        {
          data: {
            id: "hero",
            media: "/assets/golf.jpg",
            title: "New Build Golf Properties in Costa Blanca",
            subtitle: "New-Build Homes Surrounded by Championship Golf & Mediterranean Living",
            cta: { label: "Contact Agent", href: "#contact" },
            cta_secondary: { label: "View Collection", href: "#projects" }
          },
          namespace: data.id
        }
      ),
      /* @__PURE__ */ jsx(
        FeatureBar,
        {
          data: {
            id: "features",
            items: [
              { text: "300+ Days of Sunshine" },
              { text: "5 Golf Courses Within 10 min" },
              { text: "Mediterranean Lifestyle" },
              { text: "Lock-Up-and-Leave Ready" },
              { text: "From €449,900" }
            ]
          },
          namespace: data.id
        }
      ),
      /* @__PURE__ */ jsx(
        TwoColumnBlock,
        {
          data: {
            id: "two-column",
            title: "Live where golf, sunshine, and modern comfort come together.",
            subtitle: "Our hand-picked selection of new-build golf properties in Orihuela Costa offers a rare opportunity to enjoy year-round golfing in one of Spain's most established golf destinations.",
            content: "Whether you are searching for a Mediterranean lifestyle home, a winter golf escape, or a smart lifestyle investment, Orihuela Costa delivers the perfect balance of quality living and long-term appeal.",
            media: "/assets/golf.jpg"
          },
          namespace: data.id
        }
      ),
      /* @__PURE__ */ jsx(
        ProjectGrid,
        {
          data: {
            id: "projects",
            title: "Carefully Selected New-Build Golf Developments",
            subtitle: "We work with a curated portfolio of new-build developments selected for their proximity to multiple golf courses, modern architecture, and strong lifestyle appeal."
          },
          namespace: data.id
        }
      ),
      /* @__PURE__ */ jsx(
        CourseGrid,
        {
          data: {
            id: "courses",
            title: "Why Orihuela Costa Is One of Costa Blanca's Top Golf Locations",
            subtitle: "Orihuela Costa is widely known for its concentration of high-quality golf courses, excellent infrastructure, and international atmosphere."
          },
          namespace: data.id
        }
      ),
      /* @__PURE__ */ jsx(
        ClimateSection,
        {
          data: {
            id: "climate",
            media: "/assets/lvb/golf-06-s.jpg",
            title: "A Climate Made for Golf & Outdoor Living",
            subtitle: "One of the strongest reasons buyers choose Orihuela Costa is its Mediterranean climate."
          },
          namespace: data.id
        }
      ),
      /* @__PURE__ */ jsx(
        BenefitGrid,
        {
          data: {
            id: "benefits",
            title: "Key Benefits of Owning a Golf Property in Orihuela Costa",
            subtitle: "Everything you need for a premium lifestyle and smart investment."
          },
          namespace: data.id
        }
      ),
      /* @__PURE__ */ jsx(
        TwoColumnBlock,
        {
          data: {
            id: "lifestyle",
            title: "Lifestyle & Investment Appeal Combined",
            subtitle: "Golf properties in Orihuela Costa are popular with long-stay winter golfers, short-term holiday renters, and lifestyle buyers.",
            content: "This creates consistent demand without relying on speculative promises. The combination of location and golf infrastructure makes these properties attractive.",
            media: "/assets/golf.jpg"
          },
          namespace: data.id
        }
      ),
      /* @__PURE__ */ jsx(
        CallToActionSection,
        {
          data: {
            id: "cta",
            media: "/assets/golf.jpg",
            title: "Imagine Your Life Here",
            subtitle: "Morning coffee on the terrace. A short drive to the first tee. Lunch by the sea. Evenings spent outdoors under warm Mediterranean skies.",
            cta: { label: "View Collection", href: "#projects" }
          },
          namespace: data.id
        }
      ),
      /* @__PURE__ */ jsx(
        ContactSection,
        {
          data: {
            id: "contact",
            title: "Speak directly with a local property specialist",
            description: "We'll help you compare developments, understand the buying process, and arrange viewings or virtual tours. Contact us today and let's find the golf property in Orihuela Costa that truly fits your lifestyle.",
            cta: { label: "Speak to an Expert", href: "#contact" },
            badges: [
              { icon: "phone", text: "Free Information Pack" },
              { icon: "euro", text: "Direct Pricing" },
              { icon: "shield", text: "No Obligation" }
            ]
          },
          namespace: data.id
        }
      )
    ] }),
    /* @__PURE__ */ jsx(Footer, { data })
  ] }) });
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
  if (!themes[themeKey]) {
    console.warn(`Theme '${themeKey}' is not valid. Falling back to default '${DEFAULT_THEME}' theme.`);
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
      },
      "feature-icon": {
        size: "1.5rem",
        radius: "9999px",
        bg: "transparent",
        text: "var(--primary)"
      }
    }
  }
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
  const handleOpenLightbox = (index2) => {
    setCurrentIndex(index2);
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
    /* @__PURE__ */ jsx(Container, { className: "mb-12", children: /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
      /* @__PURE__ */ jsx("h2", { className: "h2 mb-6", children: t("gallery.title") }),
      /* @__PURE__ */ jsxs("div", { className: "gallery-tab-container inline-flex", children: [
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
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx("div", { className: "w-full", children: /* @__PURE__ */ jsx("div", { className: "ml-[max(1rem,calc((100vw-80rem)/2+1rem))] sm:ml-[max(1.5rem,calc((100vw-80rem)/2+1.5rem))] lg:ml-[max(2rem,calc((100vw-80rem)/2+2rem)]", children: /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-8", children: activeContent.map((item, index2) => /* @__PURE__ */ jsx(
      motion.div,
      {
        layout: true,
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        className: "relative cursor-pointer",
        onClick: () => handleOpenLightbox(index2),
        children: /* @__PURE__ */ jsxs("div", { className: "w-full aspect-[4/3] rounded-2xl overflow-hidden border border-border relative group/item", children: [
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
      index2
    )) }) }) }) }),
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
          /* @__PURE__ */ jsx("div", { className: "w-full h-24 md:h-32 backdrop-blur-md flex items-center justify-center p-2 md:p-4 gap-2 md:gap-4 overflow-x-auto bg-background/80 border-t border-border", children: activeContent.map((item, index2) => /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setCurrentIndex(index2),
              className: `relative flex-none h-full aspect-square rounded-md overflow-hidden transition-all duration-300 ${currentIndex === index2 ? "ring-2 ring-primary scale-110 z-10" : "opacity-40 hover:opacity-100 scale-100"}`,
              children: [
                /* @__PURE__ */ jsx("img", { src: item.src, className: "w-full h-full object-cover", alt: `Thumb ${index2}` }),
                currentIndex === index2 && /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-primary/10" })
              ]
            },
            index2
          )) })
        ]
      }
    ) })
  ] });
}
function GolfPropertiesModern() {
  const { t } = useTranslation("costa-blanca");
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
const extractPagesFromRoutes = (routes2) => {
  const pages = [];
  const processRoute = (route, parentPath = "") => {
    const routePath = route.path || (route.index ? "" : "");
    let fullPathJoined = parentPath;
    if (routePath) {
      if (!fullPathJoined.endsWith("/") && !routePath.startsWith("/")) {
        fullPathJoined += "/";
      }
      fullPathJoined += routePath;
    }
    let fullPath = fullPathJoined.startsWith("/") ? fullPathJoined : "/" + fullPathJoined;
    if (fullPath.length > 1 && fullPath.endsWith("/")) {
      fullPath = fullPath.slice(0, -1);
    }
    if (route.path === "*" || fullPath === "/style-editor") {
      return;
    }
    let name2 = "";
    if (fullPath === "/" || route.index) {
      name2 = "Home";
    } else if (fullPath.includes("new-build-golf-properties-costa-blanca")) {
      const themeName = route.element?.props?.routeTheme;
      if (themeName) {
        name2 = themeName.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
      } else {
        name2 = "Golf Properties";
      }
    } else if (fullPath.includes("developments/")) {
      const devId = fullPath.split("developments/")[1];
      if (devId) {
        name2 = devId.charAt(0).toUpperCase() + devId.slice(1).replace(/-/g, " ");
      }
    } else {
      const parts = fullPath.split("/").filter(Boolean);
      name2 = parts.map(
        (part) => part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, " ")
      ).join(" ");
    }
    if (name2) {
      let currentTheme;
      if (route.element && route.element.props?.routeTheme) {
        currentTheme = route.element.props.routeTheme;
      }
      if (!pages.some((p) => p.path === fullPath)) {
        pages.push({
          path: fullPath,
          name: name2,
          currentTheme
        });
      }
    }
    if (route.children && Array.isArray(route.children)) {
      route.children.forEach((child) => processRoute(child, fullPathJoined));
    }
  };
  routes2.forEach((route) => processRoute(route));
  return pages;
};
const PageThemeSelector = () => {
  const { pages, availableThemes, initialAssignments } = useMemo(() => {
    console.log("PageThemeSelector: Loading data...");
    const loadedPages = extractPagesFromRoutes(routes);
    console.log("PageThemeSelector: Loaded pages:", loadedPages);
    const loadedThemes = getAvailableThemes();
    console.log("PageThemeSelector: Loaded themes:", loadedThemes);
    const loadedAssignments = getPageThemeAssignments();
    console.log("PageThemeSelector: Loaded assignments:", loadedAssignments);
    return {
      pages: loadedPages,
      availableThemes: loadedThemes,
      initialAssignments: loadedAssignments
    };
  }, []);
  const [selectedPage, setSelectedPage] = useState(() => pages.length > 0 ? pages[0].path : "");
  const [selectedTheme, setSelectedTheme] = useState(() => {
    if (pages.length > 0) {
      const initialPage = pages[0].path;
      const pageAssignment = initialAssignments.find((a) => a.pagePath === initialPage);
      return pageAssignment?.themeId || pages[0].currentTheme || "golf";
    }
    return "golf";
  });
  const [assignments, setAssignments] = useState(initialAssignments);
  selectedPage ? (() => {
    const pageAssignment = assignments.find((a) => a.pagePath === selectedPage);
    if (pageAssignment) {
      return pageAssignment.themeId;
    } else {
      const page = pages.find((p) => p.path === selectedPage);
      return page?.currentTheme || "golf";
    }
  })() : "golf";
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
function Dialog({ isOpen, onClose, title, children, className = "" }) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
  if (!isOpen) return null;
  return /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[9999] flex items-center justify-center p-4", children: [
    /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/50 backdrop-blur-sm z-[9998]", onClick: onClose }),
    /* @__PURE__ */ jsxs("div", { className: `bg-card w-full max-w-md rounded-2xl shadow-2xl border border-border flex flex-col max-h-[90vh] relative z-[9999] ${className}`, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center p-6 border-b border-border", children: [
        /* @__PURE__ */ jsx("h3", { className: "h3", children: title }),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: onClose,
            className: "btn-ghost p-1 text-2xl leading-none hover:bg-muted rounded-lg",
            "aria-label": "Close dialog",
            children: "×"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "overflow-y-auto p-6", children })
    ] })
  ] });
}
const themeColorNames = [
  "primary",
  "primary-foreground",
  "secondary",
  "secondary-foreground",
  "accent",
  "accent-foreground",
  "muted",
  "muted-foreground",
  "background",
  "foreground",
  "card",
  "card-foreground",
  "border",
  "destructive"
];
function ThemeColorPicker({ value, onChange }) {
  const resolveColorValue = (colorVar) => {
    if (typeof window === "undefined") return "#000000";
    try {
      if (colorVar.startsWith("#")) {
        return colorVar;
      }
      if (colorVar.startsWith("hsl(var(")) {
        const varName = colorVar.match(/hsl\(var\((--[^)]+)\)/)?.[1];
        if (varName) {
          const hslValue = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
          if (hslValue) {
            return hslToHex(hslValue);
          }
        }
      }
      return "#10b981";
    } catch (error) {
      console.warn("Error resolving color value:", colorVar, error);
      return "#10b981";
    }
  };
  const hslToHex = (hsl) => {
    try {
      const match = hsl.match(/(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%/);
      if (!match) return "#10b981";
      const h = parseFloat(match[1]);
      const s = parseFloat(match[2]) / 100;
      const l = parseFloat(match[3]) / 100;
      const c = (1 - Math.abs(2 * l - 1)) * s;
      const x = c * (1 - Math.abs(h / 60 % 2 - 1));
      const m = l - c / 2;
      let r = 0, g = 0, b = 0;
      if (0 <= h && h < 60) {
        r = c;
        g = x;
        b = 0;
      } else if (60 <= h && h < 120) {
        r = x;
        g = c;
        b = 0;
      } else if (120 <= h && h < 180) {
        r = 0;
        g = c;
        b = x;
      } else if (180 <= h && h < 240) {
        r = 0;
        g = x;
        b = c;
      } else if (240 <= h && h < 300) {
        r = x;
        g = 0;
        b = c;
      } else if (300 <= h && h < 360) {
        r = c;
        g = 0;
        b = x;
      }
      r = Math.round((r + m) * 255);
      g = Math.round((g + m) * 255);
      b = Math.round((b + m) * 255);
      return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
    } catch (error) {
      console.warn("Error converting HSL to hex:", hsl, error);
      return "#10b981";
    }
  };
  return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 gap-2", children: themeColorNames.map((name2) => {
    const colorVar = `hsl(var(--${name2}))`;
    const resolvedColor = resolveColorValue(colorVar);
    const isActive = value === colorVar || value === resolvedColor;
    return /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: () => onChange(colorVar),
        className: `w-full aspect-square rounded-md border-2 ${isActive ? "border-ring" : "border-transparent"}`,
        style: { backgroundColor: resolvedColor },
        "aria-label": `Select ${name2} color`
      },
      name2
    );
  }) });
}
function IconStyleEditorContent() {
  const [bgColor, setBgColor] = useState(() => "hsl(var(--primary) / 0.1)");
  const [radius, setRadius] = useState(() => 16);
  const [iconColor, setIconColor] = useState(() => "hsl(var(--primary))");
  const [iconSize, setIconSize] = useState(() => 40);
  const [iconPadding, setIconPadding] = useState(() => 8);
  const resolveColor = (colorValue) => {
    if (typeof window === "undefined") return colorValue;
    try {
      if (colorValue.startsWith("hsl(var(")) {
        const varName = colorValue.match(/hsl\(var\((--[^)]+)\)/)?.[1];
        if (varName) {
          const hslValue = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
          if (hslValue) {
            const match = hslValue.match(/(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%/);
            if (match) {
              const h = parseFloat(match[1]);
              const s = parseFloat(match[2]) / 100;
              const l = parseFloat(match[3]) / 100;
              const c = (1 - Math.abs(2 * l - 1)) * s;
              const x = c * (1 - Math.abs(h / 60 % 2 - 1));
              const m = l - c / 2;
              let r = 0, g = 0, b = 0;
              if (0 <= h && h < 60) {
                r = c;
                g = x;
                b = 0;
              } else if (60 <= h && h < 120) {
                r = x;
                g = c;
                b = 0;
              } else if (120 <= h && h < 180) {
                r = 0;
                g = c;
                b = x;
              } else if (180 <= h && h < 240) {
                r = 0;
                g = x;
                b = c;
              } else if (240 <= h && h < 300) {
                r = x;
                g = 0;
                b = c;
              } else if (300 <= h && h < 360) {
                r = c;
                g = 0;
                b = x;
              }
              r = Math.round((r + m) * 255);
              g = Math.round((g + m) * 255);
              b = Math.round((b + m) * 255);
              return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
            }
          }
        }
      }
      return colorValue;
    } catch (error) {
      console.warn("Error resolving color:", colorValue, error);
      return colorValue;
    }
  };
  useEffect(() => {
    document.documentElement.style.setProperty("--feature-icon-bg", bgColor);
  }, [bgColor]);
  useEffect(() => {
    document.documentElement.style.setProperty("--feature-icon-radius", `${radius}px`);
  }, [radius]);
  useEffect(() => {
    document.documentElement.style.setProperty("--feature-icon-text", iconColor);
  }, [iconColor]);
  useEffect(() => {
    document.documentElement.style.setProperty("--feature-icon-size", `${iconSize / 16}rem`);
  }, [iconSize]);
  useEffect(() => {
    document.documentElement.style.setProperty("--feature-icon-padding", `${iconPadding}px`);
  }, [iconPadding]);
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-muted/30 p-4 rounded-lg border border-border", children: [
      /* @__PURE__ */ jsx("div", { className: "text-xs font-medium text-muted-foreground mb-3", children: "Current Icon Preview" }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-4", children: [
        /* @__PURE__ */ jsx("div", { className: "icon-container flex items-center justify-center", style: {
          width: `${iconSize}px`,
          height: `${iconSize}px`,
          borderRadius: `${radius}px`,
          backgroundColor: resolveColor(bgColor),
          color: resolveColor(iconColor),
          padding: `${iconPadding}px`
        }, children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: resolveColor(iconColor), strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "w-full h-full", children: [
          /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
          /* @__PURE__ */ jsx("path", { d: "M12 2a10 10 0 0 1 10 10" }),
          /* @__PURE__ */ jsx("path", { d: "M12 12l-3-5" }),
          /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "1", fill: resolveColor(iconColor) })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "icon-container flex items-center justify-center", style: {
          width: `${iconSize}px`,
          height: `${iconSize}px`,
          borderRadius: `${radius}px`,
          backgroundColor: resolveColor(bgColor),
          color: resolveColor(iconColor),
          padding: `${iconPadding}px`
        }, children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: resolveColor(iconColor), strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "w-full h-full", children: [
          /* @__PURE__ */ jsx("path", { d: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" }),
          /* @__PURE__ */ jsx("polyline", { points: "9,22 9,12 15,12 15,22" })
        ] }) }),
        /* @__PURE__ */ jsx("div", { className: "icon-container flex items-center justify-center", style: {
          width: `${iconSize}px`,
          height: `${iconSize}px`,
          borderRadius: `${radius}px`,
          backgroundColor: resolveColor(bgColor),
          color: resolveColor(iconColor),
          padding: `${iconPadding}px`
        }, children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: resolveColor(iconColor), strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "w-full h-full", children: [
          /* @__PURE__ */ jsx("path", { d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" }),
          /* @__PURE__ */ jsx("circle", { cx: "12", cy: "10", r: "3" })
        ] }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block small font-medium mb-2", children: "Background Color" }),
      /* @__PURE__ */ jsx(ThemeColorPicker, { value: bgColor, onChange: setBgColor })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("label", { htmlFor: "icon-size", className: "block small font-medium mb-2", children: [
        "Icon Size: ",
        iconSize,
        "px"
      ] }),
      /* @__PURE__ */ jsx(
        "input",
        {
          id: "icon-size",
          type: "range",
          min: "24",
          max: "80",
          value: iconSize,
          onChange: (e) => setIconSize(parseInt(e.target.value)),
          className: "w-full"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("label", { htmlFor: "icon-radius", className: "block small font-medium mb-2", children: [
        "Corner Radius: ",
        radius,
        "px"
      ] }),
      /* @__PURE__ */ jsx(
        "input",
        {
          id: "icon-radius",
          type: "range",
          min: "0",
          max: "32",
          value: radius,
          onChange: (e) => setRadius(parseInt(e.target.value)),
          className: "w-full"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("label", { htmlFor: "icon-padding", className: "block small font-medium mb-2", children: [
        "Icon Padding: ",
        iconPadding,
        "px"
      ] }),
      /* @__PURE__ */ jsx(
        "input",
        {
          id: "icon-padding",
          type: "range",
          min: "0",
          max: "20",
          value: iconPadding,
          onChange: (e) => setIconPadding(parseInt(e.target.value)),
          className: "w-full"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("label", { className: "block small font-medium mb-2", children: "Icon Color" }),
      /* @__PURE__ */ jsx(ThemeColorPicker, { value: iconColor, onChange: setIconColor })
    ] })
  ] });
}
function IconStyleEditor({ isOpen: externalIsOpen, onOpenChange } = {}) {
  const internalIsOpen = externalIsOpen !== void 0 ? externalIsOpen : false;
  const handleOpenChange = onOpenChange || (() => {
  });
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        onClick: () => handleOpenChange(true),
        className: "w-full flex items-center justify-between p-4 bg-card hover:bg-muted rounded-lg border border-border",
        "aria-label": "Open Icon Styler",
        children: [
          /* @__PURE__ */ jsx("span", { className: "font-medium", children: "Icon Styles" }),
          /* @__PURE__ */ jsx(ChevronRight, { className: "w-5 h-5 text-muted-foreground" })
        ]
      }
    ),
    /* @__PURE__ */ jsx(
      Dialog,
      {
        isOpen: internalIsOpen,
        onClose: () => handleOpenChange(false),
        title: "Icon Styles",
        children: /* @__PURE__ */ jsx(IconStyleEditorContent, {})
      }
    )
  ] });
}
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
  },
  "navbar": {
    bg: "var(--card)",
    transparency: "0.3",
    blur: "8px",
    border: "var(--border)"
  },
  "logo": {
    src: "/assets/golf-by-sunnycasas-logo.svg",
    alt: "Sunny Casas Golf Properties",
    width: "3rem",
    height: "auto"
  },
  "feature-icon": {
    size: "2.5rem",
    radius: "9999px",
    bg: "hsla(var(--primary) / 0.1)",
    text: "var(--primary)"
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
  const [editingIconStyles, setEditingIconStyles] = useState(false);
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
          activeTheme?.elementStyles && Object.keys(activeTheme.elementStyles).filter((key) => key !== "logo").map((styleKey) => /* @__PURE__ */ jsxs(
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
      /* @__PURE__ */ jsxs("div", { className: "space-y-8 pt-4 border-t", children: [
        /* @__PURE__ */ jsx("div", { className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground", children: "Logo Settings" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsx("div", { className: "p-4 bg-card border border-border rounded-xl", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold uppercase text-muted-foreground", children: "Logo Image URL" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                value: activeTheme?.elementStyles?.logo?.src || "/assets/golf-by-sunnycasas-logo.svg",
                onChange: (e) => handleElementStyleChange("logo", "src", e.target.value),
                className: "w-full bg-background border border-border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20",
                placeholder: "Enter logo image URL"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold uppercase text-muted-foreground", children: "Alt Text" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value: activeTheme?.elementStyles?.logo?.alt || "Sunny Casas Golf Properties",
                  onChange: (e) => handleElementStyleChange("logo", "alt", e.target.value),
                  className: "w-full bg-background border border-border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20",
                  placeholder: "Logo alt text"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold uppercase text-muted-foreground", children: "Width" }),
              /* @__PURE__ */ jsxs(
                "select",
                {
                  value: activeTheme?.elementStyles?.logo?.width || "3rem",
                  onChange: (e) => handleElementStyleChange("logo", "width", e.target.value),
                  className: "w-full bg-background border border-border rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20",
                  children: [
                    /* @__PURE__ */ jsx("option", { value: "2rem", children: "Small (2rem)" }),
                    /* @__PURE__ */ jsx("option", { value: "2.5rem", children: "Medium (2.5rem)" }),
                    /* @__PURE__ */ jsx("option", { value: "3rem", children: "Large (3rem)" }),
                    /* @__PURE__ */ jsx("option", { value: "3.5rem", children: "Extra Large (3.5rem)" })
                  ]
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center p-4 bg-muted/30 rounded-lg border border-dashed border-border", children: /* @__PURE__ */ jsx("div", { className: "text-center", children: activeTheme?.elementStyles?.logo?.src ? /* @__PURE__ */ jsx(
            "img",
            {
              src: activeTheme.elementStyles.logo.src,
              alt: activeTheme.elementStyles.logo.alt || "Logo preview",
              className: "max-h-16 max-w-32 object-contain mx-auto"
            }
          ) : /* @__PURE__ */ jsx("div", { className: "text-muted-foreground text-sm", children: "No logo selected" }) }) })
        ] }) }) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsx("div", { className: "text-[10px] font-semibold uppercase tracking-widest text-muted-foreground", children: "Icon Styles" }),
        /* @__PURE__ */ jsx(
          IconStyleEditor,
          {
            isOpen: editingIconStyles,
            onOpenChange: setEditingIconStyles
          }
        )
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
    height: var(--feature-icon-size);
    width: var(--feature-icon-size);
    border-radius: var(--feature-icon-radius);
    background-color: var(--feature-icon-bg);
    display: flex;
    align-items: center;
    justify-content: center;
    color: hsl(var(--feature-icon-text));
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
      /* @__PURE__ */ jsx("div", { className: "relative", children: /* @__PURE__ */ jsx("div", { className: "navbar border-b bg-card/30 backdrop-blur sticky top-0 z-50 rounded-t-2xl", children: /* @__PURE__ */ jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsxs("div", { className: "px-6 py-4 h-16 flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("div", { className: "absolute inset-0 flex items-center justify-center z-40", children: /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: (e) => {
              e.stopPropagation();
              setEditingStyle("navbar");
            },
            className: "bg-green-500 text-white text-xs px-3 py-2 rounded-full shadow-lg hover:bg-green-600 transition-colors flex items-center gap-1",
            title: "Edit header background",
            children: [
              /* @__PURE__ */ jsx(Settings2, { className: "w-3 h-3" }),
              "Edit Header"
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("h1", { className: "site-title cursor-pointer", onClick: () => setEditingStyle("h1"), children: "Golf Properties" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
          /* @__PURE__ */ jsx("a", { href: "#", className: "text-sm font-medium cursor-pointer", onClick: (e) => {
            e.preventDefault();
            setEditingStyle("link-std");
          }, children: "Features" }),
          /* @__PURE__ */ jsx("button", { className: "btn-primary", onClick: () => setEditingStyle("btn-primary"), children: "Get Info" })
        ] })
      ] }) }) }) }),
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
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "space-y-8 border-t pt-8", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[10px] uppercase font-bold text-muted-foreground", children: "Icon Styles Preview" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-6 cursor-pointer", onClick: () => setEditingIconStyles(true), children: [
            /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: "Different Icon Sizes" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-6", children: [
              /* @__PURE__ */ jsx("div", { className: "icon-container flex items-center justify-center", style: { width: "24px", height: "24px", fontSize: "14px", padding: "var(--feature-icon-padding)" }, children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "w-full h-full", children: [
                /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
                /* @__PURE__ */ jsx("path", { d: "M12 2a10 10 0 0 1 10 10" }),
                /* @__PURE__ */ jsx("path", { d: "M12 12l-3-5" }),
                /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "1", fill: "currentColor" })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "icon-container flex items-center justify-center", style: { width: "32px", height: "32px", fontSize: "18px", padding: "var(--feature-icon-padding)" }, children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "w-full h-full", children: [
                /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
                /* @__PURE__ */ jsx("path", { d: "M12 2a10 10 0 0 1 10 10" }),
                /* @__PURE__ */ jsx("path", { d: "M12 12l-3-5" }),
                /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "1", fill: "currentColor" })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "icon-container flex items-center justify-center", style: { width: "40px", height: "40px", fontSize: "22px", padding: "var(--feature-icon-padding)" }, children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "w-full h-full", children: [
                /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
                /* @__PURE__ */ jsx("path", { d: "M12 2a10 10 0 0 1 10 10" }),
                /* @__PURE__ */ jsx("path", { d: "M12 12l-3-5" }),
                /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "1", fill: "currentColor" })
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "icon-container flex items-center justify-center", style: { width: "48px", height: "48px", fontSize: "26px", padding: "var(--feature-icon-padding)" }, children: /* @__PURE__ */ jsxs("svg", { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", className: "w-full h-full", children: [
                /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "10" }),
                /* @__PURE__ */ jsx("path", { d: "M12 2a10 10 0 0 1 10 10" }),
                /* @__PURE__ */ jsx("path", { d: "M12 12l-3-5" }),
                /* @__PURE__ */ jsx("circle", { cx: "12", cy: "12", r: "1", fill: "currentColor" })
              ] }) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-sm font-medium", children: "CSS Variables Applied" }),
            /* @__PURE__ */ jsx("div", { className: "bg-muted/30 p-4 rounded-lg border border-border", children: /* @__PURE__ */ jsxs("div", { className: "text-xs font-mono space-y-1", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-primary", children: "--feature-icon-bg:" }),
                " ",
                getComputedStyle(document.documentElement).getPropertyValue("--feature-icon-bg") || "hsl(var(--primary) / 0.1)"
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-primary", children: "--feature-icon-radius:" }),
                " ",
                getComputedStyle(document.documentElement).getPropertyValue("--feature-icon-radius") || "16px"
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-primary", children: "--feature-icon-text:" }),
                " ",
                getComputedStyle(document.documentElement).getPropertyValue("--feature-icon-text") || "hsl(var(--primary))"
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-primary", children: "--feature-icon-size:" }),
                " ",
                getComputedStyle(document.documentElement).getPropertyValue("--feature-icon-size") || "2.5rem"
              ] })
            ] }) })
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
          editingStyle === "navbar" && /* @__PURE__ */ jsxs("div", { className: "space-y-6 pt-6 border-t border-slate-100", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold uppercase text-green-600", children: "Header/ Navbar Styles" }),
            /* @__PURE__ */ jsx("div", { className: "space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-400", children: "Background Color" }),
                /* @__PURE__ */ jsx("input", { type: "color", value: activeTheme?.elementStyles?.navbar?.bg || "#ffffff", onChange: (e) => handleElementStyleChange("navbar", "bg", e.target.value), className: "w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-400", children: "Transparency" }),
                /* @__PURE__ */ jsx("input", { type: "range", min: "0", max: "1", step: "0.1", value: activeTheme?.elementStyles?.navbar?.transparency || "0.3", onChange: (e) => handleElementStyleChange("navbar", "transparency", e.target.value), className: "w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-400", children: "Blur" }),
                /* @__PURE__ */ jsx("input", { type: "range", min: "0", max: "20", step: "1", value: activeTheme?.elementStyles?.navbar?.blur || "8", onChange: (e) => handleElementStyleChange("navbar", "blur", e.target.value), className: "w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsx("label", { className: "text-[10px] font-bold text-slate-400", children: "Border Color" }),
                /* @__PURE__ */ jsx("input", { type: "color", value: activeTheme?.elementStyles?.navbar?.border || "#e5e7eb", onChange: (e) => handleElementStyleChange("navbar", "border", e.target.value), className: "w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm" })
              ] })
            ] }) })
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
function ThemeProvider({ children, routeTheme }) {
  let location2;
  try {
    location2 = useLocation();
  } catch (e) {
    location2 = { pathname: typeof window !== "undefined" ? window.location.pathname : "/" };
  }
  useEffect(() => {
    const currentPath = location2.pathname;
    console.log(`🎨 [ThemeProvider] Re-evaluating theme for path: "${currentPath}", routeTheme: "${routeTheme}"`);
    let finalThemeKey;
    if (routeTheme) {
      console.log(`🎨 [ThemeProvider] Using explicit route theme: "${routeTheme}"`);
      finalThemeKey = routeTheme;
    } else {
      const savedTheme = getPageTheme(currentPath);
      if (savedTheme) {
        console.log(`🎨 [ThemeProvider] Using saved theme "${savedTheme}" for path "${currentPath}"`);
        finalThemeKey = savedTheme;
      } else {
        const isGolfPage = currentPath === "/" || currentPath.includes("golf") || currentPath.includes("costa-blanca");
        finalThemeKey = isGolfPage ? "cosmetic" : DEFAULT_THEME;
        console.log(`🎨 [ThemeProvider] No saved theme found, using fallback "${finalThemeKey}" for path "${currentPath}"`);
      }
    }
    applyTheme(finalThemeKey);
  }, [routeTheme, location2.pathname]);
  return /* @__PURE__ */ jsx(Fragment, { children });
}
const developments$2 = getAllDevelopments();
const homeData = getDevelopment("new-build-golf-properties-costa-blanca");
const routes = [
  {
    index: true,
    element: homeData ? /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsx(LandingPage, { data: homeData }) }) : /* @__PURE__ */ jsx("div", { className: "p-10 text-center", children: "Home development data not found." })
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
  ...developments$2.map((dev) => ({
    path: `developments/${dev.id}/`,
    element: /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsx(LandingPage, { data: dev }) })
  })),
  {
    path: "*",
    element: /* @__PURE__ */ jsx("div", { className: "p-10 text-center", children: "404 - Not Found" })
  }
];
const seo$1 = { "title": "Modern New Build Golf Properties for Sale in Spain", "description": "Explore exclusive new build golf properties in Costa Blanca. From frontline villas to luxury apartments near top courses. Find your dream golf home in the sun today." };
const hero$3 = { "title_start": "Exclusive New Build", "title_middle": "Golf Properties in", "title_highlight": "Costa Blanca", "description": "A modern 3‑bedroom villa a short drive from several 18‑hole golf courses, the Mediterranean and all everyday services in a big shopping center nearby.", "cta_brochure": "Send me the brochure", "cta_explore": "Explore the villas", "footer_note": "Lock-up-and-leave homes made for golf trips, winter stays & family holidays." };
const villas$1 = { "title": "Villas made for golf days", "description_1": "You get a three‑bedroom, two‑bathroom villa of about 106 m² built, with smart use of space and light. The open‑plan living and kitchen area connects directly to the terrace and garden, so coming home after a round feels easy and relaxed.", "description_2": "One bedroom and one bathroom are on the ground floor; two bedrooms and another bathroom are upstairs with access to a large terrace. There is room for friends or family to join you, without losing privacy or comfort.", "points": { "layout": "3 bedrooms, 2 bathrooms over two levels.", "space": "Approx. 106 m² built, about 85 m² indoors, 56 m² of terraces.", "garden": "Private garden of roughly 150–213 m² with on‑plot space for parking and outdoor living." } };
const gallery$1 = { "title": "Property Details & Layout", "tabs": { "photos": "Development Photos", "plans": "Floor Plans" } };
const golf$1 = { "title": "Your base in the Orihuela Costa golf belt", "description_1": "From Costa Blanca you are only a short drive from several well‑known 18‑hole courses in the Orihuela Costa area. You can vary where you play, adjust difficulty to the group and keep golf fresh week after week.", "description_2": "The climate gives you many sunny days and mild winters, so the villa works for long winter stays, spring and autumn trips – not just a two‑week summer holiday.", "points": { "cluster": "Cluster of golf courses nearby instead of a single option.", "season": "Long playing season with comfortable winter temperatures.", "routine": "Easy to build a routine: golf in the morning, sea or terrace time in the afternoon." } };
const location$1 = { "title": "La Zenia: easy living by the sea", "description": "Costa Blanca sits in a residential part of La Zenia with supermarkets, cafés, restaurants and services close by. A large shopping centre in the area adds more shops, dining and entertainment in one place.", "points": { "services": { "title": "Services & Leisure", "description": "Everyday services and leisure within a short distance." }, "beaches": { "title": "Beaches", "description": "Sandy beaches and coastal walks nearby." }, "year_round": { "title": "Year-round", "description": "Suitable for both short breaks and longer winter stays." } }, "note": "Beaches and small coves are only a short drive away, ideal for rest days or for family members who prefer the sea to the fairways. You do not need to choose between golf, beach and convenience – you get all three." };
const lifestyle$2 = { "title": "Modern, low‑maintenance comfort", "description_1": "These are new build villas with a clean, contemporary design. Fitted wardrobes, a modern kitchen and well‑planned bathrooms keep the house practical and uncluttered.", "description_2": "Private plots are big enough for terraces, planting and, depending on configuration, a pool area – but not so large that they become a burden to maintain. Installations are prepared for year‑round use, not just high summer.", "points": { "construction": "New construction with modern materials and equipment.", "outdoor": "Outdoor space focused on living, dining and relaxing.", "maintenance": "A home that is easy to close, leave and open again several times a year." } };
const contact$3 = { "title": "Price, scarcity and next step", "price_info": "Costa Blanca consists of a small number of villas. Current prices are in the range of <0>449,900 to 479,900 euros</0>, depending on plot and configuration.", "warning": "With limited units, availability can change quickly.", "cta_intro": "If you are looking for a golf‑oriented home in La Zenia, the next step is simple:", "cta_brochure": "Send me the Costa Blanca brochure", "cta_availability": "Check availability & exact prices", "cta_visit": "Help me arrange a visit" };
const enCostaBlancaLegacy = {
  seo: seo$1,
  hero: hero$3,
  villas: villas$1,
  gallery: gallery$1,
  golf: golf$1,
  location: location$1,
  lifestyle: lifestyle$2,
  contact: contact$3
};
const seo = { "title": "Propriétés de golf neuves à vendre en Espagne", "description": "Découvrez des propriétés de golf neuves exclusives sur la Costa Blanca. Des villas en première ligne aux appartements de luxe près des meilleurs parcours. Trouvez votre maison de golf de rêve au soleil dès aujourd'hui." };
const hero$2 = { "title_start": "Propriétés de golf", "title_middle": "neuves exclusives sur la", "title_highlight": "Costa Blanca", "description": "Une villa moderne de 3 chambres à une courte distance en voiture de plusieurs parcours de golf de 18 trous, de la Méditerranée et de tous les services quotidiens dans un grand centre commercial à proximité.", "cta_brochure": "Envoyez-moi la brochure", "cta_explore": "Explorer les villas", "footer_note": "Maisons prêtes à vivre conçues pour les séjours de golf, les hivers et les vacances en famille." };
const villas = { "title": "Des villas conçues pour le golf", "description_1": "Vous bénéficiez d'une villa de trois chambres et deux salles de bains d'environ 106 m² construits, avec une utilisation intelligente de l'espace et de la lumière. Le salon et la cuisine à aire ouverte communiquent directement avec la terrasse et le jardin, pour que rentrer après une partie soit facile et relaxant.", "description_2": "Une chambre et une salle de bain se trouvent au rez-de-chaussée ; deux chambres et une autre salle de bain sont à l'étage avec accès à une grande terrasse. Il y a de la place pour que des amis ou de la famille vous rejoignent, sans perdre en intimité ni en confort.", "points": { "layout": "3 chambres, 2 salles de bains sur deux niveaux.", "space": "Environ 106 m² construits, environ 85 m² intérieurs, 56 m² de terrasses.", "garden": "Jardin privé d'environ 150–213 m² avec espace sur la parcelle pour le parking et la vie en plein air." } };
const gallery = { "title": "Détails et Agencement de la Propriété", "tabs": { "photos": "Photos du Projet", "plans": "Plans" } };
const golf = { "title": "Votre base dans la ceinture de golf d'Orihuela Costa", "description_1": "Depuis Costa Blanca, vous n'êtes qu'à quelques minutes en voiture de plusieurs parcours de 18 trous renommés dans la région d'Orihuela Costa. Vous pouvez varier les endroits où vous jouez, adapter la difficulté au groupe et garder le golf frais semaine après semaine.", "description_2": "Le climat vous offre de nombreux jours ensoleillés et des hivers doux, de sorte que la villa convient aux longs séjours d'hiver, aux escapades de printemps et d'automne – pas seulement pour deux semaines de vacances d'été.", "points": { "cluster": "Groupe de parcours de golf à proximité au lieu d'une seule option.", "season": "Longue saison de jeu avec des températures hivernales confortables.", "routine": "Routine facile à construire : golf le matin, mer ou temps sur la terrasse l'après-midi." } };
const location = { "title": "La Zenia : la vie facile en bord de mer", "description": "Costa Blanca se situe dans une partie résidentielle de La Zenia avec des supermarchés, des cafés, des restaurants et des services à proximité. Un grand centre commercial dans le secteur ajoute plus de boutiques, de restaurants et de divertissements en un seul endroit.", "points": { "services": { "title": "Services et Loisirs", "description": "Services quotidiens et loisirs à courte distance." }, "beaches": { "title": "Plages", "description": "Plages de sable et promenades côtières à proximité." }, "year_round": { "title": "Toute l'année", "description": "Idéal pour les courts séjours et les séjours d'hiver plus longs." } }, "note": "Les plages et les petites criques ne sont qu'à quelques minutes en voiture, idéal pour les jours de repos ou pour les membres de la famille qui préfèrent la mer aux fairways. Vous n'avez pas à choisir entre golf, plage et commodité – vous avez les trois." };
const lifestyle$1 = { "title": "Confort moderne et peu d'entretien", "description_1": "Ce sont des villas de construction neuve avec un design propre et contemporain. Des armoires encastrées, une cuisine moderne et des salles de bains bien conçues rendent la maison pratique et ordonnée.", "description_2": "Les parcelles privées sont assez grandes pour les terrasses, les plantations et, selon la configuration, une piscine – mais pas assez grandes pour devenir un fardeau à entretenir. Les installations sont préparées pour une utilisation toute l'année, pas seulement pour le plein été.", "points": { "construction": "Construction neuve avec des matériaux et équipements modernes.", "outdoor": "Espace extérieur axé sur la vie, les repas et la détente.", "maintenance": "Une maison facile à fermer, à quitter et à rouvrir plusieurs fois par an." } };
const contact$2 = { "title": "Prix, rareté et étape suivante", "price_info": "Costa Blanca se compose d'un petit nombre de villas. Les prix actuels se situent dans la fourchette de <0>449 900 à 479 900 euros</0>, selon la parcelle et la configuration.", "warning": "Avec un nombre limité d'unités, la disponibilité peut changer rapidement.", "cta_intro": "Si vous recherchez une maison orientée golf à La Zenia, l'étape suivante est simple :", "cta_brochure": "Envoyez-moi la brochure Costa Blanca", "cta_availability": "Vérifier la disponibilité et les prix exacts", "cta_visit": "Aidez-moi à organiser une visite" };
const frCostaBlancaLegacy = {
  seo,
  hero: hero$2,
  villas,
  gallery,
  golf,
  location,
  lifestyle: lifestyle$1,
  contact: contact$2
};
const announcement$1 = { "title": "Complimentary Golf Membership | Limited Time Offer" };
const nav$1 = { "contact_agent": "Contact Agent" };
const hero$1 = { "title": "New Build Golf Properties in Costa Blanca", "subtitle": "New-Build Homes Surrounded by Championship Golf & Mediterranean Living", "contact_agent": "Contact Agent" };
const intro = { "title": "Live where golf, sunshine, and modern comfort come together.", "subtitle": "Our hand-picked selection of new-build golf properties in Orihuela Costa offers a rare opportunity to enjoy year-round golfing in one of Spain’s most established golf destinations.", "description": "Whether you are searching for a Mediterranean lifestyle home, a winter golf escape, or a smart lifestyle investment, Orihuela Costa delivers the perfect balance of quality living and long-term appeal." };
const developments$1 = { "title": "Carefully Selected New-Build Golf Developments", "subtitle": "We work with a curated portfolio of new-build developments selected for their proximity to multiple golf courses, modern architecture, and strong lifestyle appeal.", "items": [{ "title": "Vistabella Golf Homes", "description": "Contemporary villas and apartments integrated into the lush landscape of Vistabella Golf.", "image": "assets/golf.jpg", "cta": { "label": "View Project", "href": "/developments/vistabella" } }, { "title": "Las Colinas Residences", "description": "Award-winning luxury residences within a private valley, offering extreme privacy and world-class golf.", "image": "assets/golf.jpg", "cta": { "label": "View Project", "href": "/developments/las-colinas" } }, { "title": "Sunny Hills Residences", "description": "Modern apartments with stunning views of the golf course and the Mediterranean.", "image": "assets/golf.jpg", "cta": { "label": "View Project", "href": "/developments/sunny-hills" } }, { "title": "Lo Romero Park", "description": "New release near Lo Romero Golf with spacious terraces and private pools.", "image": "assets/golf.jpg", "cta": { "label": "View Project", "href": "#" } }, { "title": "Villamartin Gardens", "description": "Beautiful landscaped gardens and modern properties in the heart of Villamartin.", "image": "assets/golf.jpg", "cta": { "label": "View Project", "href": "#" } }] };
const courses$1 = { "title": "Why Orihuela Costa Is One of Costa Blanca’s Top Golf Locations", "subtitle": "Orihuela Costa is widely known for its concentration of high-quality golf courses, excellent infrastructure, and international atmosphere.", "items": [{ "title": "Villamartín Golf", "description": "Established and iconic course with a vibrant community." }, { "title": "Las Ramblas Golf", "description": "Challenging course with dramatic landscapes and views." }, { "title": "Real Club de Golf Campoamor", "description": "Championship course with mature surroundings." }, { "title": "Las Colinas Golf & Country Club", "description": "Private valley setting with world-class facilities." }, { "title": "Lo Romero Golf", "description": "Beautiful 18th hole island green and stunning vistas." }] };
const climate = { "title": "A Climate Made for Golf & Outdoor Living", "subtitle": "One of the strongest reasons buyers choose Orihuela Costa is the Mediterranean climate.", "items": [{ "title": "300+ Sunny Days", "description": "More than 300 sunny days per year for year-round outdoor enjoyment." }, { "title": "Mild Winters", "description": "Comfortable daytime temperatures even in the middle of winter." }, { "title": "Outdoor Lifestyle", "description": "Long seasons ideal for golf, walking, and terrace living." }] };
const benefits = { "title": "Key Benefits of Owning a Golf Property in Orihuela Costa", "subtitle": "Everything you need for a premium lifestyle and smart investment.", "items": [{ "title": "Golf at Your Doorstep", "description": "Live within minutes of several championship courses. Play more often, drive less." }, { "title": "Modern Comfort", "description": "New-build properties offer contemporary design, energy efficiency, and low maintenance." }, { "title": "International Community", "description": "Strong international population with excellent services and healthcare access." }, { "title": "Easy Access", "description": "Alicante and Murcia airports are both within easy reach with frequent flights." }, { "title": "Lifestyle Flexibility", "description": "Enjoy the property yourself, rent it out seasonally, or combine both." }] };
const collection = { "title": "Explore Our Golf Property Collection", "subtitle": "Detailed information about properties, surroundings, and lifestyle opportunities.", "items": [{ "title": "Project overview & location" }, { "title": "Property types and options" }, { "title": "Nearby golf courses" }, { "title": "Lifestyle suitability" }] };
const appeal = { "title": "Lifestyle & Investment Appeal Combined", "subtitle": "Golf properties in Orihuela Costa are popular with long-stay winter golfers, short-term holiday renters, and lifestyle buyers.", "description": "This creates consistent demand without relying on speculative promises. The combination of location and golf infrastructure makes these properties attractive." };
const imagine = { "title": "Imagine Your Life Here", "subtitle": "Morning coffee on the terrace. A short drive to the first tee. Lunch by the sea. Evenings spent outdoors under warm Mediterranean skies." };
const contact$1 = { "title": "Speak directly with a local property specialist", "description": "We’ll help you compare developments, understand the buying process, and arrange viewings or virtual tours. Contact us today and let’s find the golf property in Orihuela Costa that truly fits your lifestyle.", "cta": "Contact Us Today" };
const enCostaBlancaNew = {
  announcement: announcement$1,
  nav: nav$1,
  hero: hero$1,
  intro,
  developments: developments$1,
  courses: courses$1,
  climate,
  benefits,
  collection,
  appeal,
  imagine,
  contact: contact$1
};
const announcement = { "title": "OFFRE EXCLUSIVE | ABONNEMENT DE GOLF OFFERT | DURÉE LIMITÉE" };
const nav = { "contact_agent": "Contacter l'Agent" };
const hero = { "title": "Une vie digne d'être offerte", "subtitle": "Découvrez le style de vie golfique ultime sur la Costa Blanca. Des propriétés neuves haut de gamme conçues pour une vie raffinée.", "contact_agent": "Contacter l'Agent", "explore": "Explorer les Communautés" };
const developments = { "title": "Développements Sélectionnés", "subtitle": "Une sélection des projets neufs les plus prestigieux d'Orihuela Costa.", "items": [{ "title": "Vistabella Golf Homes", "description": "Villas et appartements contemporains intégrés dans le paysage luxuriant de Vistabella Golf.", "image": "assets/golf.jpg", "cta": { "label": "Voir le Projet", "href": "/developments/vistabella" } }, { "title": "Las Colinas Residences", "description": "Résidences de luxe primées dans une vallée privée, offrant une intimité extrême et un golf de classe mondiale.", "image": "assets/golf.jpg", "cta": { "label": "Voir le Projet", "href": "/developments/las-colinas" } }] };
const lifestyle = { "title": "Le Style de Vie Golfique", "subtitle": "Vivez là où vous jouez. Profitez d'équipements de classe mondiale et de vues imprenables.", "items": [{ "title": "Jouer toute l'année", "description": "Avec plus de 300 jours de soleil, vivez votre passion chaque jour de l'année." }, { "title": "Équipements de Luxe", "description": "Accès à des club-houses exclusifs, des spas et une cuisine raffinée à votre porte." }, { "title": "Valeur d'Investissement", "description": "Les propriétés de golf sur la Costa Blanca maintiennent une forte demande et une excellente plus-value." }] };
const courses = { "title": "Parcours de Golf de Premier Plan", "subtitle": "Explorez les cinq parcours légendaires entourant votre nouvelle maison.", "items": [{ "title": "Las Colinas Golf", "description": "Parcours de championnat conçu par Cabell B. Robinson dans une vallée naturelle.", "image": "assets/golf.jpg" }, { "title": "Villamartin Golf", "description": "L'un des parcours les plus établis et emblématiques de la côte.", "image": "assets/golf.jpg" }, { "title": "Las Ramblas Golf", "description": "Un parcours stimulant avec des paysages spectaculaires et des vues sur la Méditerranée.", "image": "assets/golf.jpg" }] };
const contact = { "title": "Prêt pour le Départ ?", "description": "Organisez une visite privée ou demandez notre brochure exclusive dès aujourd'hui.", "cta": { "label": "Contactez nos Experts" } };
const frCostaBlancaNew = {
  announcement,
  nav,
  hero,
  developments,
  lifestyle,
  courses,
  contact
};
const resources = {
  en: {
    "costa-blanca": enCostaBlancaLegacy,
    "new-build-golf-properties-costa-blanca": enCostaBlancaNew
  },
  fr: {
    "costa-blanca": frCostaBlancaLegacy,
    "new-build-golf-properties-costa-blanca": frCostaBlancaNew
  }
};
i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  // default language
  fallbackLng: "en",
  supportedLngs: ["en", "fr"],
  ns: ["costa-blanca", "new-build-golf-properties-costa-blanca"],
  defaultNS: "new-build-golf-properties-costa-blanca",
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
