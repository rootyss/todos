import { configureStore } from '@reduxjs/toolkit';
import _ from 'lodash';
import {
  getDatabase, ref, push, equalTo, query, orderByChild, onValue,
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
import {
  URL_DATABASE,
  FIREBASE_TASKS_ROUTE,
  FIREBASE_LABELS_ROUTE,
} from './utils/constants.js';
import { addTaskToState } from './store/tasksSlice.js';
import { addLabelToState } from './store/labelsSlice.js';

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
    const labelsRef = ref(database, FIREBASE_LABELS_ROUTE);

    const addTaskToFirebase = (task) => push(tasksRef, task);

    const addLabelToFirebase = (label) => push(labelsRef, label);

    const getUserData = (uid) => {
      const userLabelsRef = query(labelsRef, orderByChild("userUid"), equalTo(uid));
      const userTasksRef = query(tasksRef, orderByChild("addedByUid"), equalTo(uid));

      onValue(userTasksRef, (snap) => {
        const tasks = snap.val();
        dispatch(addTaskToState({ tasks }));
      });
      onValue(userLabelsRef, (snap) => {
        const data = snap.val();
        const dataValues = _.values(data);
        const labels = dataValues.map(({ label }) => label);
        dispatch(addLabelToState({ labels }));
      });
    };

    const memoValues = useMemo(() => ({
      addTaskToFirebase, getUserData, addLabelToFirebase,
    }), [addTaskToFirebase, addLabelToFirebase]);

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
