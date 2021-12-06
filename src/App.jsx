import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import {
  TODO_ROUTE,
  LOGIN_ROUTE,
  NOTE_ROUTE,
  REG_ROUTE,
} from './utils/constants.js';
import authContext from './context/authContext.js';
import useAuth from './hooks/useAuth.jsx';
import {
  MainLayout,
  NoMatch,
  Login,
  ToDo,
  Information,
  Note,
  SignUp,
} from './components/index.js';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null/* {name: 'Admin'} */);

  return (
    <authContext.Provider value={{ user }}>
      {children}
    </authContext.Provider>
  );
};

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  return auth.user ? children : <Navigate to={LOGIN_ROUTE} />;
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path={LOGIN_ROUTE} element={<Login />} />
          <Route
            path={TODO_ROUTE}
            element={(
              <PrivateRoute>
                <ToDo />
              </PrivateRoute>
        )}
          />
          <Route path={REG_ROUTE} element={<SignUp />} />
          <Route path={NOTE_ROUTE} element={<Note />} />
          <Route index element={<Information />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
