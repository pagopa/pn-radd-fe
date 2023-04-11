import * as React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorBoundary from "../error/ErrorBoundary";
import Layout from "../layout/Layout";
import HomePage from "../pages/HomePage";
import NotFoundPage from "../pages/NotFoundPage";
import { DocumentInquiryActPage } from "../pages/DocumentInquiryActPage";
import { DOCUMENT_INQUIRY_ACT } from "./routes.const";


export const router = createBrowserRouter([
    {
        element: <Layout />,
        errorElement: <ErrorBoundary children={undefined} />,
        children: [
            {
                path: "/",
                element: <HomePage />
            },
            {
                path: DOCUMENT_INQUIRY_ACT,
                element: <DocumentInquiryActPage />
            },
            { path: "*", element: <NotFoundPage /> },
        ]
        
    }
    
]);