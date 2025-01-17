import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { AdminDashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

const IndexPage = lazy(() => import('src/pages/admin/index'));
const Boutiques = lazy(() => import('src/pages/admin/boutiques/index'));
const EditBoutiques = lazy(() => import('src/pages/admin/boutiques/edit'));
const Materiels = lazy(() => import('src/pages/admin/materiels/index'));
const Marques = lazy(() => import('src/pages/admin/marques/index'));
const Modeles = lazy(() => import('src/pages/admin/model/index'));

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
      { 
        path: 'boutiques',
        children: [
          { element: <Boutiques />, index: true },
          { element: <EditBoutiques />, path: ':id/edit' },
        ]
       },
      { element: <Materiels />, path: 'materials' },
      { element: <Marques />, path: 'marques' },
      { element: <Modeles />, path: 'modele' },
    ],
  },
];
