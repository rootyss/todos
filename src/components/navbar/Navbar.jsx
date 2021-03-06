import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  modalTypes,
  INBOX_ROUTE,
  LOGIN_ROUTE,
  REG_ROUTE,
  USER_PROFILE_ROUTE,
} from '../../utils/constants.js';
import { openModal } from '../../store/modalSlice.js';
import useAuth from '../../hooks/useAuth.jsx';
import AddTaskIcon from '../../../add.svg';
import { getUser } from '../../store/userSlice.js';
import NavControl from '../navControl/NavControl.jsx';

const Navbar = () => {
  const user = useSelector(getUser);
  const auth = useAuth();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleFullAddTask = () => dispatch(openModal({
    type: modalTypes.fullAddTask,
  }));

  return (
    <nav className="bg-light shadow-sm navbar navbar-light">
      <div className="container-fluid">
        <NavControl />
        <Link className="navbar-brand" to={INBOX_ROUTE}>{t('logo.text')}</Link>
        <div className="navbar-collapse collapse">
          <ul className="navbar-nav">
            {user
              ? (
                <>
                  <li className="nav-item nav-link--hover">
                    <button onClick={handleFullAddTask} type="button" className="add-task"><img className="add-task-icon" src={AddTaskIcon} alt="Add task" /></button>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link nav-link--hover" to={USER_PROFILE_ROUTE}>{user.displayName ?? t('mainMenu.userAnonim')}</Link>
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
