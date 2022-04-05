import React from 'react'
import { Navigate, useRoutes } from 'react-router-dom';

// layouts
import {
    MainLayout,
    FullLayout,
} from './layouts'

// pages
import Dashboard from './pages/dashboard';
import Nfts from './pages/nfts';
import NotFound from './pages/notFound';

export default function Router() {

    return useRoutes([
        {
            path: '/dashboard',
            element: <MainLayout />,
            children: [
                { path: 'app', element: <Dashboard /> },
                { path: 'nfts', element: <Nfts /> },
            ]
        },
        {
            path: '/',
            element: <FullLayout />,
            children: [
                { path: '/', element: <Navigate to='/dashboard/app' /> },
                { path: '/', element: <Navigate to='/dashboard/nfts' /> },
                { path: '404', element: <NotFound /> },
                { path: '*', element: <Navigate to='/404' /> }
            ]
        },
        { path: '*', element: <Navigate to='/404' replace /> }
    ])
}
