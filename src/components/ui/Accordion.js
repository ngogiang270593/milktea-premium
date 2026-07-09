import { escapeHtml } from '../../utils/html.js';
import { attrs, classNames } from './utils.js';

export function Accordion({ title = '', children = '', open = false, className = '', attributes = {} } = {}) {
  return `
    <details class="${classNames('product-accordion', className)}" ${open ? 'open' : ''} ${attrs(attributes)}>
      <summary>${escapeHtml(title)}</summary>
      <p>${children}</p>
    </details>
  `;
}

