import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './config/tron';
import { ToastContainer } from 'react-toastify';
import Routes from './routes';

import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <Router>
      <Routes />
    </Router>
    <ToastContainer />
  </>
);

export default App;
