export function escapeImageAttribute(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

export function resizeImageUrl(src) {
  return src;
}

export function imageSourceSet() {
  return '';
}

export function imageAttributes(src, {
  alt = '',
  width = 800,
  height = 800,
  sizes = '(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw',
  loading,
  fetchPriority,
  className,
  extra = ''
} = {}) {
  const loadingStrategy = loading || (fetchPriority === 'high' ? 'eager' : 'lazy');
  const srcset = imageSourceSet(src, width);
  const attributes = [
    `src="${escapeImageAttribute(resizeImageUrl(src))}"`,
    srcset ? `srcset="${srcset}"` : '',
    `sizes="${escapeImageAttribute(sizes)}"`,
    `alt="${escapeImageAttribute(alt)}"`,
    `loading="${loadingStrategy}"`,
    'decoding="async"',
    `width="${width}"`,
    `height="${height}"`,
    fetchPriority ? `fetchpriority="${fetchPriority}"` : '',
    className ? `class="${escapeImageAttribute(className)}"` : '',
    extra
  ].filter(Boolean);

  return attributes.join(' ');
}
