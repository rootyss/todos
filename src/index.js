import { initializeApp } from "firebase/app";
import ReactDOM from 'react-dom';
import app from './init.jsx';

const startApp = async () => {
  const firebaseConfig = {
    apiKey: "AIzaSyD-qPr-mmCbzc6chebJwfXRchyVYeUUg_4",
    authDomain: "todos-c6f25.firebaseapp.com",
    projectId: "todos-c6f25",
    storageBucket: "todos-c6f25.appspot.com",
    messagingSenderId: "222266062244",
    appId: "1:222266062244:web:0a5d68bdbd75e4043d3d31",
  };

  initializeApp(firebaseConfig);

  const virtualDom = await app();

  ReactDOM.render(
    virtualDom,
    document.getElementById('root'),
  );
};

startApp();
