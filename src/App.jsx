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
  LABELS_ROUTE,
  ARCHIVE_ROUTE,
  USER_PROFILE_ROUTE,
} from './utils/constants.js';
import authContext from './context/authContext.js';
import useAuth from './hooks/useAuth.jsx';
import ContentWrapper from './components/contentWrapper/ContentWrapper.jsx';
import NoMatch from './components/noMatch/NoMatch.jsx';
import Login from './components/login/Login.jsx';
import Information from './components/information/Information.jsx';
import Note from './components/note/Note.jsx';
import Labels from './components/labels/Labels.jsx';
import SignUp from './components/signUp/SignUp.jsx';
import Inbox from './components/inbox/Inbox.jsx';
import ToDo from './components/todo/ToDo.jsx';
import LeftMenu from './components/leftMenu/LeftMenu.jsx';
import Today from './components/today/Today.jsx';
import Upcoming from './components/upcoming/Upcoming.jsx';
import useApi from './hooks/useApi.jsx';
import ModalWindow from './components/modals/index.jsx';
import LabelSearch from './components/labelSearch/LabelSearch.jsx';
import Archive from './components/archive/Archive.jsx';
import TaskPage from './components/taskPage/TaskPage.jsx';
import User from './components/user/User.jsx';

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

  const getUserUid = () => user.uid;

  const memoValues = useMemo(() => ({
    user, logIn, logOut, authFirebase, getUserUid,
  }), [user, logIn, logOut, authFirebase, getUserUid]);

  return (
    <authContext.Provider value={memoValues}>
      {children}
    </authContext.Provider>
  );
};

const RequireAuth = () => {
  const auth = useAuth();
  const location = useLocation();
  const api = useApi();

  useEffect(() => {
    if (!auth.user) return;
    api.getUserTasks(auth.getUserUid());
    api.getUserLabels(auth.getUserUid());
  }, []);

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

const RoutesApp = () => {
  const location = useLocation();
  const { state } = location;
  return (
    <Routes location={state?.backgroundLocation || location}>
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
          <Route path={LABELS_ROUTE} element={<Labels />}>
            <Route path=":labelId" element={<LabelSearch />} />
          </Route>
          <Route path={USER_PROFILE_ROUTE} element={<User />} />
          <Route path={ARCHIVE_ROUTE} element={<Archive />} />
          <Route path="/task/:id" element={<TaskPage />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Route>
      {state?.backgroundLocation && (
      <Route path="/task/:id" />
      )}
    </Routes>
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <RoutesApp />
      <ModalWindow />
    </BrowserRouter>
  </AuthProvider>
);

export default App;
