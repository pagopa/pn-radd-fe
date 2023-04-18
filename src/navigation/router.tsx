import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ErrorBoundary from '../error/ErrorBoundary';
import Layout from '../layout/Layout';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';
import { DocumentInquiryActPage } from '../pages/DocumentInquiryActPage';
import { DOCUMENT_INQUIRY_ACT } from './routes.const';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    element: <Layout showSideMenu />,
    errorElement: <ErrorBoundary><></></ErrorBoundary>,
    children: [
      {
        path: DOCUMENT_INQUIRY_ACT,
        element: <DocumentInquiryActPage />,
      },
    ],
  },
  { path: '*', element: <NotFoundPage /> },
]);
