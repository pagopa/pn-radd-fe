import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { theme } from '@pagopa/mui-italia';
import store from './redux/store';
import { worker } from './mocks/browser';
import App from './App';
import { DEV } from './utils/const';

if (DEV) {
  void worker.start();
  if (window.location.pathname === '/') {
    window.location.hash = '#token=token-test';
  }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
