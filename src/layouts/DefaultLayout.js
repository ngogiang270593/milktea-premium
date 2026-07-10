import { Footer } from '../components/Footer.js';
import { Navbar } from '../components/Navbar.js';
import { QuickViewModal } from '../components/QuickViewModal.js';
import { SearchOverlay } from '../components/SearchOverlay.js';

export function DefaultLayout(content, { mainClass = '' } = {}) {
  return `
    ${Navbar()}
    <main id="main-content" class="${mainClass}">
      ${content}
    </main>
    ${Footer()}
    ${SearchOverlay()}
    ${QuickViewModal()}
  `;
}
