import React from 'react';
import { useTranslation } from 'react-i18next';

const User = () => {
  const { t } = useTranslation();

  return (
    <div className="main-content-wrapper">
      <div className="content">
        <div className="page">
          <header className="view-header">
            <div className="view-header__content">
              <h1>{t('userSetting.header')}</h1>
            </div>
          </header>

        </div>
      </div>
    </div>
  );
};

export default User;
