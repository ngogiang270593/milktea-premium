const DEFAULT_WIDTHS = [320, 480, 640, 800, 1000, 1200];

export function escapeImageAttribute(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

export function resizeImageUrl(src, width) {
  if (!src || !src.includes('images.unsplash.com')) {
    return src;
  }

  const url = new URL(src);
  url.searchParams.set('auto', 'format');
  url.searchParams.set('fit', 'crop');
  url.searchParams.set('w', String(width));
  url.searchParams.set('q', '78');

  return url.toString();
}

export function imageSourceSet(src, maxWidth = 1200) {
  return DEFAULT_WIDTHS
    .filter((candidate) => candidate <= Math.max(maxWidth, 640))
    .map((candidate) => `${escapeImageAttribute(resizeImageUrl(src, candidate))} ${candidate}w`)
    .join(', ');
}

export function imageAttributes(src, {
  alt = '',
  width = 800,
  height = 800,
  sizes = '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw',
  loading = 'lazy',
  fetchPriority,
  className,
  extra = ''
} = {}) {
  const srcset = imageSourceSet(src, width);
  const attributes = [
    `src="${escapeImageAttribute(resizeImageUrl(src, Math.min(width, 1000)))}"`,
    srcset ? `srcset="${srcset}"` : '',
    `sizes="${escapeImageAttribute(sizes)}"`,
    `alt="${escapeImageAttribute(alt)}"`,
    `loading="${loading}"`,
    'decoding="async"',
    `width="${width}"`,
    `height="${height}"`,
    fetchPriority ? `fetchpriority="${fetchPriority}"` : '',
    className ? `class="${escapeImageAttribute(className)}"` : '',
    extra
  ].filter(Boolean);

  return attributes.join(' ');
}
