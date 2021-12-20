import React, { useState, useMemo, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
} from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import {
  TODO_ROUTE,
  LOGIN_ROUTE,
  NOTE_ROUTE,
  REG_ROUTE,
  INBOX_ROUTE,
  TODAY_ROUTE,
  UPCOMING_ROUTE,
} from './utils/constants.js';
import authContext from './context/authContext.js';
import useAuth from './hooks/useAuth.jsx';
import ContentWrapper from './components/contentWrapper/ContentWrapper.jsx';
import NoMatch from './components/noMatch/NoMatch.jsx';
import Login from './components/login/Login.jsx';
import Information from './components/information/Information.jsx';
import Note from './components/note/Note.jsx';
import SignUp from './components/signUp/SignUp.jsx';
import Inbox from './components/inbox/Inbox.jsx';
import ToDo from './components/todo/ToDo.jsx';
import LeftMenu from './components/leftMenu/LeftMenu.jsx';
import Today from './components/today/Today.jsx';
import Upcoming from './components/upcoming/Upcoming.jsx';
import useApi from './hooks/useApi.jsx';

const AuthProvider = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(userData);
  const authFirebase = getAuth();

  const logIn = (userIn) => {
    setUser(userIn);
    localStorage.setItem('user', JSON.stringify(userIn));
  };
  const logOut = () => {
    signOut(authFirebase);
    localStorage.removeItem('user');
    setUser(null);
  };

  const memoValues = useMemo(() => ({
    user, logIn, logOut, authFirebase,
  }), [user, logIn, logOut]);

  return (
    <authContext.Provider value={memoValues}>
      {children}
    </authContext.Provider>
  );
};

const RequireAuth = () => {
  const auth = useAuth();
  const location = useLocation();
  if (!auth.user) {
    return <Navigate to={LOGIN_ROUTE} state={{ from: location }} />;
  }
  return (
    <>
      <LeftMenu />
      <Outlet />
    </>
  );
};

const App = () => {
  const api = useApi();
  useEffect(() => {
    api.getTasks();
  }, []);
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<ContentWrapper />}>
            <Route path="/" element={<Information />} />
            <Route path={REG_ROUTE} element={<SignUp />} />
            <Route path={LOGIN_ROUTE} element={<Login />} />
            <Route element={<RequireAuth />}>
              <Route path={TODO_ROUTE} element={<ToDo />} />
              <Route path={INBOX_ROUTE} element={<Inbox />} />
              <Route path={TODAY_ROUTE} element={<Today />} />
              <Route path={UPCOMING_ROUTE} element={<Upcoming />} />
              <Route path={NOTE_ROUTE} element={<Note />} />
            </Route>
            <Route path="*" element={<NoMatch />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
