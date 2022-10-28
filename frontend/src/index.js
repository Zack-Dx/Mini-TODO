import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import KeepState from "./context/KeepState"
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <KeepState>
      <App />
    </KeepState>
  </React.StrictMode>
);
reportWebVitals();