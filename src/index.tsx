import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { theme } from '@pagopa/mui-italia';
import store from './redux/store';
import { worker } from './mocks/browser';
import App from './App';
import { MOCK_API, MOCK_AUTH_API } from './utils/const';

if (MOCK_API || MOCK_AUTH_API) {
  void worker.start();
  if (MOCK_AUTH_API && window.location.pathname === '/') {
    window.location.hash =
      '#token=eyJraWQiOiJqd3QtZXhjaGFuZ2VfYjM6MjI6OTI6ODk6MDY6OTc6NzM6ODI6YTc6OWM6ZWU6ZTA6OTc6YzM6ZDc6ZjUiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5pdCIsImZhbWlseV9uYW1lIjoiVGVzdCIsImZpc2NhbF9udW1iZXIiOiJBQUFCQkIwMEEwMEEwMDBBIiwibmFtZSI6IlRlc3QiLCJmcm9tX2FhIjpmYWxzZSwidWlkIjoiMWU5YjI1NjgtMzFlZi00MzY5LWI3NzAtNDNlYmJmMTFlYjFhIiwibGV2ZWwiOiJMMiIsImlhdCI6MTY4MzAzMTAxNSwiYXVkIjoicG9ydGFsZS1wYS5kZXYucG4ucGFnb3BhLml0IiwiaXNzIjoiaHR0cHM6Ly9kZXYuc2VsZmNhcmUucGFnb3BhLml0IiwianRpIjoiZGMyM2YyNzEtMjVjNi00MTU0LWI3NTYtMGZjNmEyNjc3YzIxIiwib3JnYW5pemF0aW9uIjp7ImlkIjoiZDBkMjgzNjctMTY5NS00YzUwLWEyNjAtNmZkYTUyNmU5YWFiIiwibmFtZSI6IkNvbXVuZSBkaSBNaWxhbm8iLCJyb2xlcyI6W3sicGFydHlSb2xlIjoiU1VCX0RFTEVHQVRFIiwicm9sZSI6ImFkbWluIn1dLCJncm91cHMiOlsiNjNlNTM4MmU2ZjUzYWY0OTdhZWYzNDE0Il0sImZpc2NhbF9jb2RlIjoiMDExOTkyNTAxNTgifSwiZGVzaXJlZF9leHAiOjE2ODMwNjMyMDN9.mOTbwIFfNmXaa16lKC2oEGdnUY_ZW14kF5nhjovXDzj5hoV7vJdSnWoz1DcvhUQf-I_fdltPjpPfLsGtEFVkvoQ148oqqa7yiwQ3peKeRCBo_gAvalXYMVY-75H58cr8VtMw0AfRJS_Kce9ck5UpJMjUIGRVaXOZMxEqT7FWQqbn_0c98pwGGyzub-CaHLXN-BpZIU8ck4W7QZNMyH5azsPf5uHe2S2fYJDxW1LHQ46M9Aa7T_BDQxiZ29rjJRI_9EHQvY0D2AbRE2IVw3OflpRwFkDmpgPs_0hINLb-ic90GFW9MBtE4MJuO4mayAIT7zJXGdfHQmX048MtM22hCA';
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
