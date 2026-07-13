import { t } from '../utils/i18n.js';

export function PwaInstallPrompt() {
  return `
    <section class="pwa-install-prompt" data-pwa-install hidden aria-hidden="true" aria-labelledby="pwa-install-title">
      <div class="pwa-install-icon" aria-hidden="true">MP</div>
      <div>
        <h2 id="pwa-install-title">${t('pwa.installTitle')}</h2>
        <p>${t('pwa.installCopy')}</p>
      </div>
      <div class="pwa-install-actions">
        <button type="button" class="btn-primary ripple-button" data-pwa-install-accept>${t('pwa.installAction')}</button>
        <button type="button" class="pwa-install-dismiss ripple-button" data-pwa-install-dismiss aria-label="${t('pwa.dismissAria')}">${t('buttons.close')}</button>
      </div>
    </section>
  `;
}
