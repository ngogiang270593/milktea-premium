import { attrs, classNames } from './utils.js';

export function Divider({ className = '', attributes = {} } = {}) {
  return `<hr class="${classNames('border-0 border-t border-gray-200', className)}" ${attrs(attributes)} />`;
}

