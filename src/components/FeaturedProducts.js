import { FEATURED_PRODUCTS } from '../data/products.js';

function featuredCard({ title, description, label }) {
  return `
    <article class="group overflow-hidden rounded-[2rem] bg-brand-green text-white shadow-2xl transition hover:-translate-y-1">
      <div class="relative overflow-hidden p-8">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.22),_transparent_40%)]"></div>
        <div class="relative space-y-5">
          <span class="inline-flex rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/90">${label}</span>
          <h3 class="text-3xl font-semibold">${title}</h3>
          <p class="max-w-md text-sm text-white/80">${description}</p>
        </div>
      </div>
      <div class="border-t border-white/10 px-8 py-6">
        <a href="#order" class="inline-flex items-center gap-2 text-sm font-semibold text-white transition group-hover:text-brand-mint">Order now <span aria-hidden="true">-&gt;</span></a>
      </div>
    </article>
  `;
}

export function FeaturedProducts() {
  return `
    <section id="order" class="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div id="featured" class="lg:flex lg:items-end lg:justify-between lg:gap-10">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-green">Featured products</p>
          <h2 class="section-heading mt-4">Curated favorites for every mood.</h2>
        </div>
        <p class="section-copy mt-6 max-w-xl text-gray-600 lg:mt-0">Choose from our artisanal picks, including limited-time specials and crowd-pleasing bestsellers with stylish presentation.</p>
      </div>
      <div class="mt-12 grid gap-6 lg:grid-cols-3">
        ${FEATURED_PRODUCTS.map(featuredCard).join('')}
      </div>
    </section>
  `;
}
