import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { SimpleLayout } from 'src/layouts/simple';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

const IndexPage = lazy(() => import('src/pages/suivi/index'));

const layoutContent = (
  <SimpleLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </SimpleLayout>
);

export const suiviRoutes = [
  {
    path: 'suivi',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [{ element: <IndexPage />, index: true }],
  },
];
