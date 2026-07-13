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
  const lazyMarker = loadingStrategy === 'lazy' ? 'data-lazy-image' : '';
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
    lazyMarker,
    extra
  ].filter(Boolean);

  return attributes.join(' ');
}

/**
 * Decodes lazy images shortly before they enter the viewport.
 *
 * Native lazy loading still controls network priority; the observer keeps
 * decode work off the initial route render and reduces image paint jank.
 */
export function initLazyImageObserver(root = document) {
  const images = [...root.querySelectorAll('img[data-lazy-image]:not([data-lazy-observed])')];

  if (!images.length) {
    return;
  }

  const markLoaded = (image) => {
    const done = () => {
      image.dataset.imageLoaded = 'true';
    };

    if (typeof image.decode === 'function') {
      image.decode().then(done).catch(done);
    } else if (image.complete) {
      done();
    } else {
      image.addEventListener('load', done, { once: true });
      image.addEventListener('error', done, { once: true });
    }
  };

  images.forEach((image) => {
    image.dataset.lazyObserved = 'true';

    if (!image.getAttribute('fetchpriority')) {
      image.setAttribute('fetchpriority', 'low');
    }
  });

  if (!('IntersectionObserver' in window)) {
    images.forEach(markLoaded);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      observer.unobserve(entry.target);
      markLoaded(entry.target);
    });
  }, {
    rootMargin: '320px 0px',
    threshold: 0.01
  });

  images.forEach((image) => observer.observe(image));
}
