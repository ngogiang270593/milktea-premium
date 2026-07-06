export function Hero() {
  return `
    <section class="relative overflow-hidden hero-gradient">
      <div class="absolute inset-x-0 top-0 h-56 bg-brand-mint/50 blur-3xl"></div>
      <div class="relative mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
        <div class="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div class="space-y-8">
            <span class="inline-flex items-center rounded-full bg-brand-mint/80 px-4 py-1 text-sm font-medium text-brand-green">
              Premium Bubble Tea Crafted Daily
            </span>
            <h1 class="text-4xl font-semibold tracking-tight text-gray-950 sm:text-5xl lg:text-6xl">
              MilkTea Premium - where luxury meets bubble tea.
            </h1>
            <p class="max-w-xl text-lg leading-8 text-gray-600">
              Experience handcrafted tea, velvety milk, and elegant flavors in every sip. Discover seasonal creations, instant favorites, and curated collections designed for the modern tea lover.
            </p>
            <div class="flex flex-wrap gap-4">
              <a href="#featured" class="btn-primary">Explore Collection</a>
              <a href="#newsletter" class="btn-secondary">Join Our Newsletter</a>
            </div>
          </div>
          <div class="relative">
            <div class="glass-panel overflow-hidden rounded-[2rem] p-6 shadow-2xl">
              <div class="grid gap-4 sm:grid-cols-2">
                <div class="rounded-3xl bg-[#f8f3ed] p-6 text-center">
                  <p class="text-sm uppercase tracking-[0.3em] text-brand-green">Signature</p>
                  <h2 class="mt-3 text-2xl font-semibold text-gray-950">Golden Oolong Latte</h2>
                  <p class="mt-4 text-sm text-gray-600">Floral oolong with creamy oat milk and honey pearls.</p>
                </div>
                <div class="rounded-3xl bg-[#fff7f0] p-6 text-center">
                  <p class="text-sm uppercase tracking-[0.3em] text-brand-green">New</p>
                  <h2 class="mt-3 text-2xl font-semibold text-gray-950">Aurora Matcha</h2>
                  <p class="mt-4 text-sm text-gray-600">Bright ceremonial matcha with a citrus finish.</p>
                </div>
              </div>
            </div>
            <div class="pointer-events-none absolute -right-8 -bottom-8 h-52 w-52 rounded-full bg-brand-gold/20 blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  `;
}
