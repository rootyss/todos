import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  TODO_ROUTE,
  LOGIN_ROUTE,
  REG_ROUTE,
  USER_PROFILE_ROUTE,
} from '../../utils/constants.js';
import useAuth from '../../hooks/useAuth.jsx';

const Navbar = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return (
    <nav className="bg-light shadow-sm navbar navbar-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to={TODO_ROUTE}>{t('logo.text')}</Link>
        <div className="navbar-collapse collapse">
          <div className="container-fluid" />
          <ul className="navbar-nav">
            {auth.user
              ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to={USER_PROFILE_ROUTE}>{auth.user.displayName ?? t('mainMenu.userAnonim')}</Link>
                  </li>
                  <li className="nav-item">
                    <button type="button" className="btn btn-primary" onClick={() => auth.logOut()}>{t('buttons.logOut')}</button>
                  </li>
                </>
              )
              : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to={LOGIN_ROUTE}>{t('mainMenu.login')}</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={REG_ROUTE}>{t('mainMenu.signup')}</Link>
                  </li>
                </>
              )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
