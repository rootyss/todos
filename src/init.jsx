import { configureStore } from '@reduxjs/toolkit';
import {
  getDatabase, ref, onValue, push,
} from "firebase/database";
import { Provider, useDispatch } from 'react-redux';
import "./style.scss";
import React, { useMemo } from 'react';
import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import apiContext from './context/apiContext.js';
import App from './App.jsx';
import resources from './locales/index.js';
import reducer from './store';
import { URL_DATABASE, FIREBASE_TASKS_ROUTE } from './utils/constants.js';
import { addTaskToState } from './store/tasksSlice.js';

export default async (instanceApp) => {
  const i18n = i18next.createInstance();
  await i18n
    .use(initReactI18next)
    .init({ resources, fallbackLng: 'ru' });

  const store = configureStore({
    reducer,
  });

  const ApiProvider = ({ children }) => {
    const dispatch = useDispatch();
    const database = getDatabase(instanceApp, URL_DATABASE);
    const tasksRef = ref(database, FIREBASE_TASKS_ROUTE);

    const addTaskToFirebase = (task) => push(tasksRef, task);

    const getTasks = () => {
      onValue(tasksRef, (snap) => {
        const tasks = snap.val();
        dispatch(addTaskToState({ tasks }));
      });
    };

    const memoValues = useMemo(() => ({
      addTaskToFirebase, getTasks,
    }), []);

    return (
      <apiContext.Provider value={memoValues}>
        {children}
      </apiContext.Provider>
    );
  };

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <ApiProvider>
          <App />
        </ApiProvider>
      </I18nextProvider>
    </Provider>
  );
};
