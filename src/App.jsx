import React, { useMemo, useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
} from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import {
  LOGIN_ROUTE,
  NOTE_ROUTE,
  REG_ROUTE,
  INBOX_ROUTE,
  OUTBOX_ROUTE,
  TODAY_ROUTE,
  LABELS_ROUTE,
  ARCHIVE_ROUTE,
  USER_PROFILE_ROUTE,
} from './utils/constants.js';
import authContext from './context/authContext.js';
import ContentWrapper from './components/contentWrapper/ContentWrapper.jsx';
import NoMatch from './components/noMatch/NoMatch.jsx';
import Login from './components/login/Login.jsx';
import Information from './components/information/Information.jsx';
import Note from './components/note/Note.jsx';
import Labels from './components/labels/Labels.jsx';
import SignUp from './components/signUp/SignUp.jsx';
import Inbox from './components/inbox/Inbox.jsx';
import Outbox from './components/outbox/Outbox.jsx';
import LeftMenu from './components/leftMenu/LeftMenu.jsx';
import Today from './components/today/Today.jsx';
import useApi from './hooks/useApi.jsx';
import ModalWindow from './components/modals/index.jsx';
import LabelSearch from './components/labelSearch/LabelSearch.jsx';
import Archive from './components/archive/Archive.jsx';
import TaskPage from './components/taskPage/TaskPage.jsx';
import User from './components/user/User.jsx';
import {
  setUser, clearUser, getUser, updateUser,
} from './store/userSlice.js';
import { getMenuStatus, toggleStatus } from './store/leftMenuSlice.js';

const AuthProvider = ({ children }) => {
  const api = useApi();
  const dispatch = useDispatch();
  const userObj = JSON.parse(localStorage.getItem('user'));
  if (userObj) {
    dispatch(setUser(userObj));
  }
  const authFirebase = getAuth();

  const logIn = (userIn) => {
    const userData = JSON.parse(userIn);
    dispatch(setUser(userData));
    dispatch(updateUser({ userData, db: api.database }));
  };
  const logOut = () => {
    dispatch(clearUser());
    signOut(authFirebase);
  };

  const memoValues = useMemo(() => ({
    logIn, logOut, authFirebase,
  }), [logIn, logOut, authFirebase]);

  return (
    <authContext.Provider value={memoValues}>
      {children}
    </authContext.Provider>
  );
};

const RequireAuth = () => {
  const user = useSelector(getUser);
  const location = useLocation();
  const api = useApi();
  const isOpen = useSelector(getMenuStatus);
  const dispatch = useDispatch();

  const handleToggleStatus = () => {
    dispatch(toggleStatus(!isOpen));
  };

  useEffect(() => {
    if (!user) return;
    api.getUserTasks(user.uid);
    api.getUserLabels(user.uid);
    api.getUsers();
  }, []);

  if (!user) {
    return <Navigate to={LOGIN_ROUTE} state={{ from: location }} />;
  }
  return (
    <>
      <div
        className={isOpen ? "left-menu-overlay-open" : "left-menu-overlay-close"}
        onClick={handleToggleStatus}
      />
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
          <Route path={INBOX_ROUTE} element={<Inbox />} />
          <Route path={OUTBOX_ROUTE} element={<Outbox />} />
          <Route path={TODAY_ROUTE} element={<Today />} />
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
