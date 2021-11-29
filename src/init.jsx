import "./style.scss";
import ReactDOM from 'react-dom';
import React from 'react';
import Test from './components/Test.jsx';

export default () => {
  ReactDOM.render(
    <Test />,
    document.getElementById('root'),
  );
};
