import React from 'react';
import ReactDOM from 'react-dom';
import Routers from './Router';
import GlobalStyles from './styles';

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <Routers />
  </React.StrictMode>,
  document.getElementById('root')
);
