import { describe, expect, it } from 'vitest';
import { APP_ROUTES } from '../../src/constants/routes.js';
import { isPlainLeftClick, routeToString, shouldHandleLink } from '../../src/utils/router.js';

describe('SPA router helpers', () => {
  const appRoutes = new Set(APP_ROUTES);

  it('detects plain primary-button clicks', () => {
    const event = new MouseEvent('click', { button: 0 });

    expect(isPlainLeftClick(event)).toBe(true);
  });

  it('ignores modified clicks', () => {
    const event = new MouseEvent('click', { button: 0, ctrlKey: true });

    expect(isPlainLeftClick(event)).toBe(false);
  });

  it('handles internal app links only', () => {
    const link = document.createElement('a');
    link.href = '/menu';

    expect(shouldHandleLink(link, new URL(link.href), appRoutes)).toBe(true);

    link.href = 'https://example.com/menu';
    expect(shouldHandleLink(link, new URL(link.href), appRoutes)).toBe(false);
  });

  it('normalizes route strings', () => {
    const url = new URL('/product?id=classic#reviews', window.location.origin);

    expect(routeToString(url)).toBe('/product?id=classic#reviews');
  });
});

