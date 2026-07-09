import { attrs, classNames } from './utils.js';

export function Skeleton({ className = '', attributes = {} } = {}) {
  return `<span class="${classNames('block animate-pulse rounded-2xl bg-gray-200/80', className)}" aria-hidden="true" ${attrs(attributes)}></span>`;
}

