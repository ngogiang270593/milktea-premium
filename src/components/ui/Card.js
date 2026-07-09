import { attrs, classNames } from './utils.js';

export function Card({ children = '', as = 'div', className = '', attributes = {} } = {}) {
  return `<${as} class="${classNames('rounded-[2rem] border border-white/80 bg-white/70 shadow-[0_18px_50px_rgba(48,35,24,0.08)] backdrop-blur-xl', className)}" ${attrs(attributes)}>${children}</${as}>`;
}

