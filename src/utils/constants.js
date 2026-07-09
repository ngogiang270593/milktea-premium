import { getSiteConfig } from '../config/siteConfig.js';

const config = getSiteConfig();

export const BRAND_NAME = config.brand.name;

export const NAV_LINKS = [
  { label: 'Menu', labelKey: 'navbar.menu', href: '/menu' },
  { label: 'Categories', labelKey: 'navbar.categories', href: '#categories' },
  { label: 'Featured', labelKey: 'navbar.featured', href: '#featured' },
  { label: 'Testimonials', labelKey: 'navbar.testimonials', href: '#testimonials' },
  { label: 'Instagram', labelKey: 'navbar.instagram', href: '#instagram' },
  { label: 'Newsletter', labelKey: 'navbar.newsletter', href: '#newsletter' }
];

export const CATEGORIES = config.content.en.home.categories.items;
export const TESTIMONIALS = config.content.en.home.testimonials.items;
export const INSTAGRAM_POSTS = config.content.en.home.instagram.items;
