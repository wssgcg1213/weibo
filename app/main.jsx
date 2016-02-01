/**
 * the file bootstrap the whole app
 */
import React from 'react';
import ReactDOM from 'react-dom';
import Weibo from './components/Weibo.jsx';

ReactDOM.render(
  <Weibo />,
  document.body.appendChild(document.createElement('div'))
);