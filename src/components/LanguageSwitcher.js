import { getLanguage } from '../store/languageStore.js';
import { t } from '../utils/i18n.js';

export function LanguageSwitcher({ mobile = false } = {}) {
  const currentLanguage = getLanguage();
  const className = mobile
    ? 'ripple-button rounded-full border border-[#d8c8b8] bg-white px-5 py-3 text-center text-sm font-semibold text-[#4d4035] outline-none transition hover:border-brand-green hover:text-brand-green focus-visible:ring-2 focus-visible:ring-brand-gold/70'
    : 'nav-icon-button ripple-button text-xs font-bold uppercase';
  const currentLabel = t(currentLanguage === 'vi' ? 'common.vietnamese' : 'common.english');
  const nextLanguage = currentLanguage === 'vi' ? 'en' : 'vi';
  const shortLabel = currentLanguage === 'vi' ? '🇻🇳 VI' : '🇺🇸 EN';

  if (mobile) {
    return `
      <button
        type="button"
        class="${className}"
        data-language-switcher
        data-language-mobile="true"
        data-language-next="${nextLanguage}"
        aria-label="${t('language.current', { label: currentLabel })}"
      >
        ${shortLabel} · ${t('common.language')}: ${currentLabel}
      </button>
    `;
  }

  return `
    <button
      type="button"
      class="${className}"
      data-language-switcher
      data-language-mobile="false"
      data-language-next="${nextLanguage}"
      aria-label="${t('language.current', { label: currentLabel })}"
    >
      <span aria-hidden="true">${shortLabel}</span>
    </button>
  `;
}

export function updateLanguageSwitchers(scope = document) {
  const currentLanguage = getLanguage();
  const currentLabel = t(currentLanguage === 'vi' ? 'common.vietnamese' : 'common.english');
  const nextLanguage = currentLanguage === 'vi' ? 'en' : 'vi';
  const shortLabel = currentLanguage === 'vi' ? '🇻🇳 VI' : '🇺🇸 EN';

  scope.querySelectorAll('[data-language-switcher]').forEach((button) => {
    button.dataset.languageNext = nextLanguage;
    button.setAttribute('aria-label', t('language.current', { label: currentLabel }));
    button.innerHTML = button.dataset.languageMobile === 'true'
      ? `${shortLabel} · ${t('common.language')}: ${currentLabel}`
      : `<span aria-hidden="true">${shortLabel}</span>`;
  });
}
