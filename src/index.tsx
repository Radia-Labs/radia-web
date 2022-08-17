import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './Main';
import {GlobalStyle} from "./styles";
import { ModalProvider } from 'styled-react-modal'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <ModalProvider>
      <Main />
    </ModalProvider>
  
  </React.StrictMode>
);
