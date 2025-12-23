import type { LandingPageData } from '@/models/landing-page';

/**
 * Centralized configuration for the GolfPropertiesModern page.
 * All content, including text keys for translation, image paths, and section data,
 * is managed from this file for easy updates.
 */
export const golfPropertiesModernContent = {
  /**
   * Page-level data for SEO, navigation, and theming.
   */
  pageData: {
    id: 'costa-blanca-modern',
    name: 'Golf Properties Modern',
    brand: {
      colors: {
        primary: '142.1 76.2% 36.3%', // Green for Golf
        secondary: '30 80% 90%', // Warm/Sun
      },
    },
    // SEO content is sourced from translation files.
    seo: {
      title: 'seo.title', // i18next key
      description: 'seo.description', // i18next key
    },
    // Sections for navigation purposes.
    sections: [
      { id: 'villas', type: 'features', enabled: true, order: 1, title: 'The Villas' },
      { id: 'golf', type: 'features', enabled: true, order: 2, title: 'Golf' },
      { id: 'location', type: 'features', enabled: true, order: 3, title: 'Location' },
      { id: 'lifestyle', type: 'features', enabled: true, order: 4, title: 'Lifestyle' },
      { id: 'contact', type: 'contact', enabled: true, order: 5, title: 'Prices & Visits', cta: { label: 'Get Info', href: '#contact' } },
    ],
  } as LandingPageData,

  /**
   * Hero section content.
   */
  hero: {
    image: {
      src: '/assets/golf.jpg',
      alt: 'Modern new build villa overlooking a golf course in Costa Blanca',
    },
  },

  /**
   * Text marquee items.
   */
  marquee: {
    items: [
      '✨ Luxury Golf Properties in Costa Blanca',
      'Modern Villas with Stunning Views',
      'Year-Round Sunshine',
      'Professional Golf Courses',
    ],
  },

  /**
   * Villas section content.
   */
  villas: {
    id: 'villas',
    image: {
      src: '/assets/lvb/lvb-01-3d.jpg',
      alt: 'Modern villa interior design concept',
    },
  },

  /**
   * Gallery section content.
   */
  gallery: {
    title: 'Gallery',
    subtitle: 'Explore the Villas',
    description: 'Take a visual tour of our stunning properties',
  },

  /**
   * Golf section content.
   */
  golf: {
    id: 'golf',
    image: {
      src: '/assets/lvb/golf-06-s.jpg',
      alt: 'Golf course at Orihuela Costa',
    },
  },

  /**
   * Location section content.
   */
  location: {
    id: 'location',
    cards: [
      {
        icon: 'Home',
        titleKey: 'location.points.services.title',
        descriptionKey: 'location.points.services.description',
      },
      {
        icon: 'MapPin',
        titleKey: 'location.points.beaches.title',
        descriptionKey: 'location.points.beaches.description',
      },
      {
        icon: 'Sun',
        titleKey: 'location.points.year_round.title',
        descriptionKey: 'location.points.year_round.description',
      },
    ],
  },

  /**
   * Lifestyle section content.
   */
  lifestyle: {
    id: 'lifestyle',
    image: {
      src: '/assets/lvb/lvb-13-3d.jpg',
      alt: 'Modern villa design with low-maintenance pool area',
    },
  },

  /**
   * Contact section content.
   */
  contact: {
    id: 'contact',
  },
};

export type GolfPropertiesModernContent = typeof golfPropertiesModernContent;