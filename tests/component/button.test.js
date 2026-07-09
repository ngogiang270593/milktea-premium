import { describe, expect, it } from 'vitest';
import { Button } from '../../src/components/ui/index.js';

describe('Button component', () => {
  it('renders an accessible button by default', () => {
    document.body.innerHTML = Button({
      children: 'Add to cart',
      ariaLabel: 'Add Classic Milk Tea to cart'
    });

    const button = document.querySelector('button');

    expect(button).toBeTruthy();
    expect(button.type).toBe('button');
    expect(button.getAttribute('aria-label')).toBe('Add Classic Milk Tea to cart');
    expect(button.className).toContain('ripple-button');
  });

  it('renders a link when href is provided', () => {
    document.body.innerHTML = Button({
      href: '/menu',
      children: 'View menu'
    });

    const link = document.querySelector('a');

    expect(link).toBeTruthy();
    expect(link.getAttribute('href')).toBe('/menu');
  });
});

