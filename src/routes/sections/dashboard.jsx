import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { CONFIG } from 'src/config-global';
import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

// ----------------------------------------------------------------------

const IndexPage = lazy(() => import('src/pages/dashboard/Dashboard'));
const PageTwo = lazy(() => import('src/pages/dashboard/two'));
const PageThree = lazy(() => import('src/pages/dashboard/three'));
const PageFour = lazy(() => import('src/pages/dashboard/four'));
const PageFive = lazy(() => import('src/pages/dashboard/five'));
const PageSix = lazy(() => import('src/pages/dashboard/six'));

const UserList = lazy(() => import('src/pages/dashboard/client'));
const AddUser = lazy(() => import('src/pages/dashboard/client/add'));

const Articles = lazy(() => import('src/pages/dashboard/stock'));
const AddArticle = lazy(() => import ('src/pages/dashboard/stock/addArticle'));
const EditArticle = lazy(() => import ('src/pages/dashboard/stock/editArticle'));
const DuplicateArticle = lazy(() => import ('src/pages/dashboard/stock/duplicateArticle'));
const AlertStock = lazy(() => import ('src/pages/dashboard/stock/alertStock'));
const Categories = lazy(() => import ('src/pages/dashboard/stock/categories'));
const Stockage = lazy(() => import ('src/pages/dashboard/stock/stockage'));
const Fournisseurs = lazy(() => import ('src/pages/dashboard/stock/fournisseur'));
const AddCommande = lazy(() => import ('src/pages/dashboard/stock/addCommande'));
const Commandes = lazy(() => import ('src/pages/dashboard/stock/commandes'));
const EditCommande = lazy(() => import ('src/pages/dashboard/stock/editCommande'));

// ----------------------------------------------------------------------

const layoutContent = (
  <DashboardLayout>
    <Suspense fallback={<LoadingScreen />}>
      <Outlet />
    </Suspense>
  </DashboardLayout>
);

export const dashboardRoutes = [
  {
    path: 'dashboard',
    element: CONFIG.auth.skip ? <>{layoutContent}</> : <AuthGuard>{layoutContent}</AuthGuard>,
    children: [
      { element: <IndexPage />, index: true },
      { path: 'two', element: <PageTwo /> },
      { path: 'three', element: <PageThree /> },
      {
        path: 'group',
        children: [
          { element: <PageFour />, index: true },
          { path: 'five', element: <PageFive /> },
          { path: 'six', element: <PageSix /> },
        ],
      },
      {
        path: 'client',
        children: [
          {element:<UserList />, index: true},
          {element:<AddUser />, path: 'add'},
        ]
      },
      {
        path: 'stock',
        children: [
          {element: <Articles />, index:true},
          {element: <AddArticle />, path:'add'},
          {element: <EditArticle />, path:':id/edit'},
          {element: <DuplicateArticle />, path:':id/duplicate'},
          {element: <AlertStock />, path:'alert-stock'},
          {element: <Categories />, path:'categories'},
          {element: <Stockage />, path:'stockage'},
          {element: <Fournisseurs />, path:'fournisseurs'},
          {element: <AddCommande />, path:'commande/add'},
          {element: <Commandes />, path:'commande'},
          {element: <EditCommande />, path:'commande/:id/edit'},
        ]
      }
    ],
  },
];
