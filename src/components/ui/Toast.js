import { escapeHtml } from '../../utils/html.js';
import { attrs, classNames } from './utils.js';

export function Toast({ message = '', visible = false, className = '', attributes = {} } = {}) {
  return `<div class="${classNames('toast', visible ? 'is-visible' : '', className)}" role="status" aria-live="polite" data-toast ${attrs(attributes)}>${escapeHtml(message)}</div>`;
}

