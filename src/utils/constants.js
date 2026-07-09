import { siteConfig } from '../config/siteConfig.js';

export const BRAND_NAME = siteConfig.brand.name;

export const NAV_LINKS = [
  { label: 'Menu', labelKey: 'navbar.menu', href: '/menu' },
  { label: 'Categories', labelKey: 'navbar.categories', href: '#categories' },
  { label: 'Featured', labelKey: 'navbar.featured', href: '#featured' },
  { label: 'Testimonials', labelKey: 'navbar.testimonials', href: '#testimonials' },
  { label: 'Instagram', labelKey: 'navbar.instagram', href: '#instagram' },
  { label: 'Newsletter', labelKey: 'navbar.newsletter', href: '#newsletter' }
];

export const CATEGORIES = siteConfig.content.en.home.categories.items;
export const TESTIMONIALS = siteConfig.content.en.home.testimonials.items;
export const INSTAGRAM_POSTS = siteConfig.content.en.home.instagram.items;
