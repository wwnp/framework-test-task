import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import './css/SimpleBar.css';
import App from './components/App/App';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename='framework-test-task'>
    <Routes>
      <Route index element={<App />}> </Route>
    </Routes>
  </BrowserRouter >
);
