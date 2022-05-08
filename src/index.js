import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import './css/SimpleBar.css';
import './css/style.loader.css';
import App from './components/App/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
