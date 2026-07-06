export function Promotion() {
  return `
    <section class="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <div class="glass-panel grid gap-8 rounded-[2rem] border border-brand-green/15 p-10 text-center sm:grid-cols-[1fr_auto] sm:text-left">
        <div>
          <p class="text-sm font-semibold uppercase tracking-[0.3em] text-brand-green">Limited Time</p>
          <h2 class="mt-4 text-3xl font-semibold text-gray-950 md:text-4xl">Summer Sip Pass: 2 for 1 on select drinks.</h2>
          <p class="mt-4 max-w-2xl text-gray-600">Refresh your routine with two premium teas for the price of one. Available in-store and pickup for a limited season.</p>
        </div>
        <div class="flex items-center justify-center">
          <a href="#order" class="btn-primary">Claim your pass</a>
        </div>
      </div>
    </section>
  `;
}
