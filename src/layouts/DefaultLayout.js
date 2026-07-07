import { Footer } from '../components/Footer.js';
import { Navbar } from '../components/Navbar.js';

export function DefaultLayout(content, { mainClass = '' } = {}) {
  return `
    ${Navbar()}
    <main id="main-content" class="${mainClass}">
      ${content}
    </main>
    ${Footer()}
  `;
}
