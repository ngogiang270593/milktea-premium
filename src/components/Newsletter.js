export function Newsletter() {
  return `
    <section id="newsletter" class="mx-auto max-w-7xl px-6 py-20 lg:px-8">
      <div class="glass-panel rounded-[2rem] border border-brand-green/15 p-10 sm:p-14">
        <div class="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
          <div>
            <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-green">Newsletter</p>
            <h2 class="section-heading mt-4">Stay in the loop with premium tea updates.</h2>
            <p class="section-copy mt-4 text-gray-600">Receive new menu drops, seasonal offers, and exclusive tasting events direct to your inbox.</p>
          </div>
          <form class="space-y-4 rounded-3xl bg-white p-6 shadow-sm">
            <label class="block text-sm font-semibold text-gray-700">Email address</label>
            <input type="email" placeholder="you@example.com" class="w-full rounded-3xl border border-gray-200 bg-gray-50 px-5 py-4 text-sm text-gray-800 outline-none transition focus:border-brand-green focus:ring-2 focus:ring-brand-mint/50" />
            <button type="submit" class="btn-primary w-full">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  `;
}
