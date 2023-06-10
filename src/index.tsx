import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { theme } from '@pagopa/mui-italia';
import store from './redux/store';
import { worker } from './mocks/browser';
import App from './App';
import { MOCK_TOKEN, MOCK_API, MOCK_AUTH_API } from './utils/const';

if (MOCK_TOKEN && window.location.pathname === '/') {
  window.location.hash =
    '#token=eyJraWQiOiJqd3QtZXhjaGFuZ2VfMmI6Y2Y6ZGY6OTM6Nzg6NDE6ODA6OWU6ODI6OGE6YjM6NTE6YjM6MTg6Mzc6YmYiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5pdCIsImZhbWlseV9uYW1lIjoiVGVzdCIsImZpc2NhbF9udW1iZXIiOiJBQUFCQkIwMEEwMEEwMDBBIiwibmFtZSI6IlRlc3QiLCJmcm9tX2FhIjpmYWxzZSwidWlkIjoiMWU5YjI1NjgtMzFlZi00MzY5LWI3NzAtNDNlYmJmMTFlYjFhIiwibGV2ZWwiOiJMMiIsImlhdCI6MTY4MzAzMTAxNSwiYXVkIjoic2VsZmNhcmUuZGV2Lm5vdGlmaWNoZWRpZ2l0YWxpLml0IiwiaXNzIjoiaHR0cHM6Ly9kZXYuc2VsZmNhcmUucGFnb3BhLml0IiwianRpIjoiZGMyM2YyNzEtMjVjNi00MTU0LWI3NTYtMGZjNmEyNjc3YzIxIiwib3JnYW5pemF0aW9uIjp7ImlkIjoiZDBkMjgzNjctMTY5NS00YzUwLWEyNjAtNmZkYTUyNmU5YWFiIiwibmFtZSI6IkNvbXVuZSBkaSBNaWxhbm8iLCJyb2xlcyI6W3sicGFydHlSb2xlIjoiU1VCX0RFTEVHQVRFIiwicm9sZSI6ImFkbWluIn1dLCJncm91cHMiOlsiNjNlNTM4MmU2ZjUzYWY0OTdhZWYzNDE0Il0sImZpc2NhbF9jb2RlIjoiMDExOTkyNTAxNTgifX0.i0SUHNC8UfbLcPbi-l588hn0AsskArlWzEJP7yN6jvWn4FpeqoA9MvP-SxDhYn7hmnd3fEV7HeEpsSeFvC8eob3u7ekcp02R0MFMnFBT1fjGOPs_Uj_aQzBonXB0nYkkl1fxduDFQ5_qPzB6O4-zej6ghJLI0askU6AQ0moahQ0Vo8KFZJVVcUFAP6uGSTfb7e-WsY1sO0p3nnUm7c0akxhAS2qVph31sTI6ekX_BtcBNchBW0jv97fyDLZqD7bre7Dcis20iEgqIR5VbCJUAt_Gpmv8mCt6JId14q8bHm6dqUj-o8dM9afrPZIfXwzpqsojNPTtiGzFv_nphSVEig';
}

if (MOCK_API || MOCK_AUTH_API) {
  void worker.start();
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </Provider>
  // </React.StrictMode>
);
