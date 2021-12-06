import React from 'react';
import { Link } from 'react-router-dom';
import {
  TODO_ROUTE,
  LOGIN_ROUTE,
  NOTE_ROUTE,
  REG_ROUTE,
  USER_PROFILE_ROUTE,
} from '../../utils/constants.js';
import useAuth from '../../hooks/useAuth.jsx';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="bg-white shadow-sm navbar navbar-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to={TODO_ROUTE}>Менеджер задач</Link>
        <div className="navbar-collapse collapse">
          <div className="container-fluid">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item"><Link className="nav-link" to={NOTE_ROUTE}>Заметки</Link></li>
            </ul>
          </div>
          <ul className="navbar-nav">
            <li className="nav-item">
              {user ? null : <Link className="nav-link" to={LOGIN_ROUTE}>Вход</Link>}
            </li>
            <li className="nav-item">
              {user ? null : <Link className="nav-link" to={REG_ROUTE}>Зарегистрироваться</Link>}
            </li>
            <li className="nav-item">
              {user ? <Link className="nav-link" to={USER_PROFILE_ROUTE}>{user.name}</Link> : null}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
