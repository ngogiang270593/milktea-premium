import { attrs, classNames } from './utils.js';

export function Badge({ children = '', tone = 'brand', className = '', attributes = {} } = {}) {
  const tones = {
    brand: 'bg-brand-mint/60 text-brand-green',
    gold: 'bg-brand-gold/20 text-[#6f4329]',
    peach: 'bg-brand-peach/35 text-[#b25449]',
    dark: 'bg-[#0d3b2e] text-white',
    neutral: 'bg-white/70 text-[#4d4035] ring-1 ring-[#d8c8b8]/70'
  };

  return `<span class="${classNames('inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]', tones[tone] || tones.brand, className)}" ${attrs(attributes)}>${children}</span>`;
}

