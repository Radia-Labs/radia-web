import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './Main';
import {GlobalStyle} from "./styles";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <Main />
  </React.StrictMode>
);
