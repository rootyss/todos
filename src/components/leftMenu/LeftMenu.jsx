import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import {
  INBOX_ROUTE,
  OUTBOX_ROUTE,
  TODAY_ROUTE,
  NOTE_ROUTE,
  LABELS_ROUTE,
  ARCHIVE_ROUTE,
} from '../../utils/constants.js';
import { getMenuStatus, toggleStatus } from '../../store/leftMenuSlice.js';

const LeftMenu = () => {
  const isOpen = useSelector(getMenuStatus);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const classNames = cn("left-menu left-menu-light", {
    "d-block": isOpen,
  });

  const handleCloseMenu = () => {
    dispatch(toggleStatus(!isOpen));
  };

  return (
    <div className={classNames}>
      <div className="left-menu-list">
        <ul className="left-menu-top">
          <li><Link onClick={isOpen ? handleCloseMenu : null} className="left-menu-nav-link" to={INBOX_ROUTE}>{t('leftMenuTop.inbox')}</Link></li>
          <li><Link onClick={isOpen ? handleCloseMenu : null} className="left-menu-nav-link" to={OUTBOX_ROUTE}>{t('leftMenuTop.outbox')}</Link></li>
          <li><Link onClick={isOpen ? handleCloseMenu : null} className="left-menu-nav-link" to={TODAY_ROUTE}>{t('leftMenuTop.today')}</Link></li>
          {/*<li><Link onClick={isOpen ? handleCloseMenu : null} className="left-menu-nav-link" to={NOTE_ROUTE}>{t('leftMenuTop.notes')}</Link></li>*/}
          <li><Link onClick={isOpen ? handleCloseMenu : null} className="left-menu-nav-link" to={LABELS_ROUTE}>{t('leftMenuTop.labels')}</Link></li>
          <li><Link onClick={isOpen ? handleCloseMenu : null} className="left-menu-nav-link" to={ARCHIVE_ROUTE}>{t('leftMenuTop.archive')}</Link></li>
        </ul>
      </div>
    </div>
  );
};

export default LeftMenu;
