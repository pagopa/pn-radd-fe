import { render, RenderOptions } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { PreloadedState, EnhancedStore, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { store as realStore, RootState } from './redux/store';
import appReducer from './redux/app/slice';
import userReducer from './redux/user/slice';
import documentInquiryReducer from './redux/document-inquiry/slice';

// const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
//   render(ui, { wrapper: AllTheProviders, ...options });
interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper' | 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: EnhancedStore;
}

const customRender = (
  ui: ReactElement,
  {
    preloadedState,
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        app: appReducer,
        user: userReducer,
        documentInquiry: documentInquiryReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const AllTheProviders = ({ children }: { children: ReactNode }) => {
    const theme = createTheme({});
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </BrowserRouter>
      </Provider>
    );
  };
  return { store, ...render(ui, { wrapper: AllTheProviders, ...renderOptions }) };
};

export const defaultPreloadedState = realStore.getState();

export * from '@testing-library/react';
export { customRender as render };
