export interface CTA {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export interface Section {
  id: string;
  type: 'hero' | 'features' | 'location' | 'gallery' | 'floor_plans' | 'testimonials' | 'faq' | 'contact' | 'banner';
  enabled: boolean;
  order: number;
  title?: string;
  subtitle?: string;
  content?: string;
  items?: any[]; // Flexible for different section types
  cta?: CTA;
  media?: string | string[];
  layout?: 'grid' | 'carousel' | 'split' | 'banner' | 'left-aligned' | 'centered';
  variant?: 'light' | 'dark' | 'muted';
  columns?: number;
}

export interface SEO {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
}

export interface LandingPageData {
  id: string;
  name: string;
  brand: {
    colors?: {
        primary: string;
        secondary: string;
    };
  };
  seo: SEO;
  sections: Section[];
}
