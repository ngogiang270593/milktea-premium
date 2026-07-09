import { getSiteConfig } from '../config/siteConfig.js';

const config = getSiteConfig();

export const HOME_CATEGORIES = config.content.en.home.categories.items;
export const HOME_TESTIMONIALS = config.content.en.home.testimonials.items;
export const INSTAGRAM_POSTS = config.content.en.home.instagram.items;

export const CATEGORIES = HOME_CATEGORIES;
export const TESTIMONIALS = HOME_TESTIMONIALS;
