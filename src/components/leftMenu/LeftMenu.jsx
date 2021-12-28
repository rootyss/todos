import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  INBOX_ROUTE,
  TODAY_ROUTE,
  UPCOMING_ROUTE,
  NOTE_ROUTE,
  LABELS_ROUTE,
  ARCHIVE_ROUTE,
} from '../../utils/constants.js';

const LeftMenu = () => {
  const { t } = useTranslation();
  return (
    <div className="left-menu left-menu-light">
      <div className="left-menu-list">
        <ul className="left-menu-top">
          <li><Link className="left-menu-nav-link" to={INBOX_ROUTE}>{t('leftMenuTop.inbox')}</Link></li>
          <li><Link className="left-menu-nav-link" to={TODAY_ROUTE}>{t('leftMenuTop.today')}</Link></li>
          <li><Link className="left-menu-nav-link" to={UPCOMING_ROUTE}>{t('leftMenuTop.upcoming')}</Link></li>
          <li><Link className="left-menu-nav-link" to={NOTE_ROUTE}>{t('leftMenuTop.notes')}</Link></li>
          <li><Link className="left-menu-nav-link" to={LABELS_ROUTE}>{t('leftMenuTop.labels')}</Link></li>
          <li><Link className="left-menu-nav-link" to={ARCHIVE_ROUTE}>{t('leftMenuTop.archive')}</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default LeftMenu;
