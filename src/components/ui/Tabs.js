import { escapeAttribute, escapeHtml } from '../../utils/html.js';
import { attrs, classNames } from './utils.js';

export function Tabs({ tabs = [], active = tabs[0]?.id, className = '', attributes = {} } = {}) {
  return `
    <div class="${classNames('grid gap-4', className)}" ${attrs(attributes)}>
      <div class="inline-flex w-fit rounded-full bg-brand-green/10 p-1" role="tablist">
        ${tabs.map((tab) => {
          const selected = tab.id === active;
          return `<button type="button" id="${escapeAttribute(tab.id)}-tab" class="${classNames('rounded-full px-4 py-2 text-sm font-bold transition focus-visible:ring-2 focus-visible:ring-brand-gold/70', selected ? 'bg-brand-green text-white' : 'text-[#4d4035] hover:text-brand-green')}" role="tab" aria-selected="${selected}" aria-controls="${escapeAttribute(tab.id)}">${escapeHtml(tab.label)}</button>`;
        }).join('')}
      </div>
      ${tabs.map((tab) => `<section id="${escapeAttribute(tab.id)}" role="tabpanel" aria-labelledby="${escapeAttribute(tab.id)}-tab" ${tab.id === active ? '' : 'hidden'}>${tab.children || ''}</section>`).join('')}
    </div>
  `;
}

