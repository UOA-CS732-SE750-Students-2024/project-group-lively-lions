import React from 'react';
//const { React } = require('react');
import ReactDOM from 'react-dom/client';
//const { ReactDOM } = require('react-dom/client');
import App from './App.tsx';
import './global.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
