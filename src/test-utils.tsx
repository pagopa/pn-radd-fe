import { fireEvent, render, RenderOptions, waitFor } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import {
  BrowserRouter,
  createBrowserRouter,
  createMemoryRouter,
  RouterProvider,
} from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { PreloadedState, EnhancedStore, configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { store as realStore, RootState } from './redux/store';
import appReducer from './redux/app/slice';
import userReducer from './redux/user/slice';
import documentInquiryReducer from './redux/document-inquiry/slice';
import inquiryHistoryReducer from './redux/inquiry-history/slice';
import { router } from './navigation/router';

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
        inquiryHistory: inquiryHistoryReducer,
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

export const renderWithRouter = (
  ui: ReactElement,
  {
    preloadedState,
    // Automatically create a store instance if no store was passed in
    store = configureStore({
      reducer: {
        app: appReducer,
        user: userReducer,
        documentInquiry: documentInquiryReducer,
        inquiryHistory: inquiryHistoryReducer,
      },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const routes = [
    {
      element: ui,
      path: '/',
    },
  ];
  const mockedRouterWithInitialRoute = createBrowserRouter(routes);
  window.history.pushState({}, 'Test page', '/');

  const AllTheProviders = ({ children }: { children: ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
  };

  return {
    store,
    ...render(<RouterProvider router={mockedRouterWithInitialRoute} />, {
      wrapper: AllTheProviders,
      ...renderOptions,
    }),
  };
};

export const defaultPreloadedState = realStore.getState();

// utility functions
export function checkFormElements(form: HTMLFormElement, elementName: string, label: string) {
  const formElement = form.querySelector(`input[name="${elementName}"]`);
  expect(formElement).toBeInTheDocument();
  const formElementLabel = form.querySelector(`label[for="${elementName}"]`);
  expect(formElementLabel).toBeInTheDocument();
  expect(formElementLabel).toHaveTextContent(label);
}

export async function changeInputValue(
  form: HTMLFormElement,
  elementName: string,
  value: string | number
) {
  const input = form.querySelector(`input[name="${elementName}"]`);
  fireEvent.change(input!, { target: { value } });
  await waitFor(() => {
    expect(input).toHaveValue(value);
  });
}

export function checkRadioElements(
  form: HTMLFormElement,
  dataTestId: string,
  labels: Array<string>
) {
  const radioButtons = form?.querySelectorAll(`[data-testid="${dataTestId}"]`);
  expect(radioButtons).toHaveLength(labels.length);
  labels.forEach((label, index) => {
    expect(radioButtons[index]).toHaveTextContent(label);
  });
}

export async function changeRadioValue(form: HTMLFormElement, dataTestId: string, index: number) {
  const radioButtons = form?.querySelectorAll(`[data-testid="${dataTestId}"]`);
  fireEvent.click(radioButtons[index]);
  await waitFor(() => {
    const radioInput = radioButtons[index].querySelector('input');
    expect(radioInput!).toBeChecked();
  });
}

export * from '@testing-library/react';
export { customRender as render };
