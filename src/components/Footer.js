import { BRAND_NAME } from '../utils/constants.js';

export function Footer() {
  return `
    <footer class="border-t border-gray-200 bg-white py-14" aria-label="Site footer">
      <div class="mx-auto max-w-7xl px-6 lg:px-8">
        <div class="grid gap-10 md:grid-cols-3">
          <div>
            <p class="text-lg font-semibold text-brand-green">${BRAND_NAME}</p>
            <p class="mt-4 max-w-sm text-sm text-gray-600">Crafted tea experiences for curious palates, inspired by clean design and premium flavors.</p>
          </div>
          <div>
            <p class="font-semibold text-gray-900">Explore</p>
            <nav class="mt-4" aria-label="Footer navigation">
            <ul class="space-y-3 text-sm text-gray-600">
              <li><a href="#categories" class="hover:text-brand-green">Categories</a></li>
              <li><a href="#featured" class="hover:text-brand-green">Featured</a></li>
              <li><a href="#testimonials" class="hover:text-brand-green">Testimonials</a></li>
            </ul>
            </nav>
          </div>
          <div>
            <p class="font-semibold text-gray-900">Contact</p>
            <ul class="mt-4 space-y-3 text-sm text-gray-600">
              <li>New York, NY</li>
              <li>support@milkteapremium.com</li>
              <li>+1 (800) 555-0199</li>
            </ul>
          </div>
        </div>
        <div class="mt-10 border-t border-gray-200 pt-6 text-sm text-gray-500">&copy; 2026 ${BRAND_NAME}. Designed for premium bubble tea lovers.</div>
      </div>
    </footer>
  `;
}
