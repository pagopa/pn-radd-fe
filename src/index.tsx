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
    '#token=eyJraWQiOiJqd3QtZXhjaGFuZ2VfMmI6Y2Y6ZGY6OTM6Nzg6NDE6ODA6OWU6ODI6OGE6YjM6NTE6YjM6MTg6Mzc6YmYiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5pdCIsImZhbWlseV9uYW1lIjoiVGVzdCIsImZpc2NhbF9udW1iZXIiOiJBQUFCQkIwMEEwMEEwMDBBIiwibmFtZSI6IlRlc3QiLCJmcm9tX2FhIjpmYWxzZSwidWlkIjoiMWU5YjI1NjgtMzFlZi00MzY5LWI3NzAtNDNlYmJmMTFlYjFhIiwibGV2ZWwiOiJMMiIsImlhdCI6MTY4MzAzMTAxNSwiYXVkIjoicG9ydGFsZS1wYS5kZXYucG4ucGFnb3BhLml0IiwiaXNzIjoiaHR0cHM6Ly9kZXYuc2VsZmNhcmUucGFnb3BhLml0IiwianRpIjoiZGMyM2YyNzEtMjVjNi00MTU0LWI3NTYtMGZjNmEyNjc3YzIxIiwib3JnYW5pemF0aW9uIjp7ImlkIjoiZDBkMjgzNjctMTY5NS00YzUwLWEyNjAtNmZkYTUyNmU5YWFiIiwibmFtZSI6IkNvbXVuZSBkaSBNaWxhbm8iLCJyb2xlcyI6W3sicGFydHlSb2xlIjoiU1VCX0RFTEVHQVRFIiwicm9sZSI6ImFkbWluIn1dLCJncm91cHMiOlsiNjNlNTM4MmU2ZjUzYWY0OTdhZWYzNDE0Il0sImZpc2NhbF9jb2RlIjoiMDExOTkyNTAxNTgifX0.Ru1_hOINEEfpw1wN1CpM6YHh0fUfDeH2VaaSeA6J3KcT4TcgYvs8JVu-i0pp_7ITtLHoL0UB8nJL19gYvseWlDfbCHObVl29DzvGuK_fOXozqmbUGu7L6wZIRrITqFdz6sXeupRIivqeU0-03O2NPotN-_dxBse8XusTOKl3E7byaiTGA4cW5C3M8kvs21DafJDyXJCpdT3eo14ijaS8qR_0lg3kw3AHmL40Hv_pa43AatCAWYgVQoqLTT7wyxF_Rh21pJd2VthEUc5PIWC2zkXj8Us7PrWswVD8ImcqRehzXNldU5PRjPoqU16N5nqUS0CBQvT1kvSXjtc8tDXAVg';
}

if (MOCK_API || MOCK_AUTH_API) {
  void worker.start();
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
