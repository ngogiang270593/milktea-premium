import { getSiteConfig } from '../config/siteConfig.js';

const config = getSiteConfig();

export const BRAND_NAME = config.brand.name;
