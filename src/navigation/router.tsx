import { RouteObject, createBrowserRouter } from 'react-router-dom';
import React, { Suspense } from 'react';
import NotFound from '../pages/NotFound.page';
import LoadingPage from '../components/LoadingPage/LoadingPage';
import { DOCUMENT_INQUIRY_ACT, DOCUMENT_INQUIRY_AOR } from './routes.const';
import { SessionGuard } from './SessionGuard';
import RouteGuard from './RouteGuard';

const Layout = React.lazy(() => import('../components/Layout/Layout'));
const Home = React.lazy(() => import('../pages/Home.page'));
const DocumentInquiryAct = React.lazy(() => import('../pages/DocumentInquiryAct.page'));
const DocumentInquiryAor = React.lazy(() => import('../pages/DocumentInquiryAor.page'));

const protectedRoutes = (children: Array<RouteObject>) => ({
    element: <SessionGuard />,
    children: [
      {
        element: <RouteGuard />,
        children,
      },
    ],
  });

const basicLayout = (children: Array<RouteObject>) => ({
    element: (
      <Suspense fallback={<LoadingPage />}>
        <Layout />
      </Suspense>
    ),
    children,
  });

const layoutWithSideMenu = (children: Array<RouteObject>) => ({
    element: (
      <Suspense fallback={<LoadingPage renderType="whole" />}>
        <Layout showSideMenu />
      </Suspense>
    ),
    children,
  });

export const router = createBrowserRouter([
  basicLayout([
    protectedRoutes([
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ]),
  ]),
  layoutWithSideMenu([
    protectedRoutes([
      {
        path: DOCUMENT_INQUIRY_ACT,
        element: <DocumentInquiryAct />,
      },
      {
        path: DOCUMENT_INQUIRY_AOR,
        element: <DocumentInquiryAor />,
      },
    ]),
  ]),
]);
