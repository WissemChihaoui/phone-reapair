import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { AdminDashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

const IndexPage = lazy(() => import('src/pages/admin/index'));
const Boutiques = lazy(() => import('src/pages/admin/boutiques/index'));

const layoutContent = (
  <AdminDashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </AdminDashboardLayout>
);

export const adminRoutes = [
  {
    path: 'admin',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <IndexPage />, index: true },
      { element: <Boutiques />, path: 'boutiques' },
    ],
  },
];
