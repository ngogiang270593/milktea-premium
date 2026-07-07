export function Hero() {
  return `
    <section id="home" class="premium-hero relative isolate overflow-hidden hero-gradient" aria-labelledby="hero-title">
      <div class="hero-orb hero-orb-mint" aria-hidden="true"></div>
      <div class="hero-orb hero-orb-gold" aria-hidden="true"></div>
      <div class="hero-orb hero-orb-peach" aria-hidden="true"></div>

      <div class="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-14 px-6 pb-20 pt-24 sm:pt-28 lg:grid-cols-[1.02fr_0.98fr] lg:px-8 lg:pb-24 lg:pt-24">
        <div class="hero-copy max-w-2xl">
          <p class="fade-up inline-flex items-center rounded-full border border-white/70 bg-white/55 px-4 py-2 text-sm font-semibold text-brand-green shadow-[0_16px_38px_rgba(48,35,24,0.08)] backdrop-blur-xl">
            Premium Bubble Tea
          </p>

          <h1 id="hero-title" class="fade-up mt-7 text-5xl font-semibold leading-[0.96] tracking-tight text-[#1f1710] sm:text-6xl lg:text-7xl">
            Enjoy Every Sip.
          </h1>

          <p class="fade-up mt-6 max-w-xl text-base leading-8 text-[#625346] sm:text-lg">
            Handcrafted milk tea, slow-brewed leaves, silky cream, and jewel-like pearls made for a calmer, richer daily ritual.
          </p>

          <div class="fade-up mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#featured" class="ripple-button btn-primary shadow-[0_18px_44px_rgba(13,59,46,0.26)]">Explore Menu</a>
            <a href="#order" class="ripple-button btn-secondary bg-white/50 backdrop-blur-xl">Order Signature</a>
          </div>

          <div class="fade-up mt-10 grid gap-3 sm:grid-cols-3" aria-label="Store highlights">
            <article class="hero-stat-card">
              <strong>42k+</strong>
              <span>Cups served</span>
            </article>
            <article class="hero-stat-card">
              <strong>18</strong>
              <span>Tea blends</span>
            </article>
            <article class="hero-stat-card">
              <strong>12h</strong>
              <span>Cold brew</span>
            </article>
          </div>

          <div class="fade-up mt-6 flex flex-wrap items-center gap-4 rounded-full border border-white/70 bg-white/55 px-4 py-3 shadow-[0_18px_42px_rgba(48,35,24,0.08)] backdrop-blur-xl sm:inline-flex" aria-label="Customer rating 4.9 out of 5 from 2,400 reviews">
            <div class="flex -space-x-2" aria-hidden="true">
              <span class="hero-avatar bg-[#0d3b2e]">A</span>
              <span class="hero-avatar bg-[#d3a86a]">M</span>
              <span class="hero-avatar bg-[#f8c3b6] text-[#4d4035]">J</span>
            </div>
            <div>
              <div class="text-sm font-semibold text-[#1f1710]">4.9/5 customer love</div>
              <div class="text-xs text-[#7b6a5a]">2,400+ verified tea moments</div>
            </div>
            <div class="text-brand-gold" aria-hidden="true">*****</div>
          </div>
        </div>

        <div class="hero-visual relative mx-auto h-[34rem] w-full max-w-[34rem] sm:h-[40rem]" data-parallax-scene aria-label="Illustration of a premium bubble tea drink">
          <div class="hero-bubble hero-bubble-one" data-parallax-item data-depth="18" aria-hidden="true"></div>
          <div class="hero-bubble hero-bubble-two" data-parallax-item data-depth="-14" aria-hidden="true"></div>
          <div class="hero-bubble hero-bubble-three" data-parallax-item data-depth="10" aria-hidden="true"></div>

          <div class="floating-card topping-card topping-card-left" data-parallax-item data-depth="-10">
            <span class="topping-dot bg-[#0d3b2e]"></span>
            <div>
              <p>Brown Sugar Pearls</p>
              <small>Slow simmered daily</small>
            </div>
          </div>

          <div class="floating-card topping-card topping-card-right" data-parallax-item data-depth="12">
            <span class="topping-dot bg-brand-gold"></span>
            <div>
              <p>Cloud Cream</p>
              <small>Velvet finish</small>
            </div>
          </div>

          <div class="glass-panel hero-quality-card" data-parallax-item data-depth="8">
            <span>Fresh batch</span>
            <strong>11:30 AM</strong>
          </div>

          <div class="tea-illustration" data-parallax-item data-depth="5" aria-hidden="true">
            <div class="tea-straw"></div>
            <div class="tea-cup">
              <div class="tea-lid"></div>
              <div class="tea-cream"></div>
              <div class="tea-liquid"></div>
              <span class="pearl pearl-one"></span>
              <span class="pearl pearl-two"></span>
              <span class="pearl pearl-three"></span>
              <span class="pearl pearl-four"></span>
              <span class="pearl pearl-five"></span>
            </div>
            <div class="tea-shadow"></div>
          </div>
        </div>
      </div>
    </section>
  `;
}
