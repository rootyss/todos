import { initializeApp } from "firebase/app";
import ReactDOM from 'react-dom';
import app from './init.jsx';
import { firebaseConfig } from './utils/constants.js';

const startApp = async () => {
  const instanceApp = initializeApp(firebaseConfig);

  const virtualDom = await app(instanceApp);

  ReactDOM.render(
    virtualDom,
    document.getElementById('root'),
  );
};

startApp();
