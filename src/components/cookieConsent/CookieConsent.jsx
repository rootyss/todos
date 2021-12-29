import React from 'react';
import { useTranslation } from 'react-i18next';

const CookieConsent = ({ handlerCookieConsent }) => {
  const { t } = useTranslation();

  return (
    <div className="cookie-consent">
      <p>{t('cookie.consent')}</p>
      <button type="button" onClick={handlerCookieConsent}>{t('cookie.apply')}</button>
    </div>
  );
};

export default CookieConsent;
