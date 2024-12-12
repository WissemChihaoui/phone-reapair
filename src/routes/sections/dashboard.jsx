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
const Destockage = lazy(() => import ('src/pages/dashboard/stock/destockage'));

const Ventes = lazy(() => import('src/pages/dashboard/ventes/index'))
const AddVente = lazy(() => import('src/pages/dashboard/ventes/add'))
const EditVente = lazy(() => import('src/pages/dashboard/ventes/edit'))

const Rachats = lazy(() => import('src/pages/dashboard/rachat/index'))
const AddRachats = lazy(() => import('src/pages/dashboard/rachat/add'))
const EditRachats = lazy(() => import('src/pages/dashboard/rachat/edit'))

const Invoice = lazy(() => import('src/pages/dashboard/invoice/index'))

const Depot = lazy(() => import('src/pages/dashboard/caisse/depot'))
const ExportComptable = lazy(() => import('src/pages/dashboard/caisse/export-comptable'))
const ExportComptableMarge = lazy(() => import('src/pages/dashboard/caisse/export-comptable-marge'))
const Statistics = lazy(() => import('src/pages/dashboard/caisse/statistics'))

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
          {element: <Destockage />, path:'destockage'},
          {element: <EditCommande />, path:'commande/:id/edit'},
        ]
      },
      {
        path: 'vente',
        children: [
          {element: <Ventes />, index: true},
          {element: <AddVente />, path: 'add'},
          {element: <EditVente />, path: ':id/edit'},
        ]
      },
      {
        path: 'rachat',
        children: [
          {element: <Rachats />, index: true},
          {element: <AddRachats />, path:'add'},
          {element: <EditRachats />, path:':id/edit'},
        ]
      },
      {
        path: 'invoice',
        children: [
          {element: <Invoice />, index: true}
        ]
      },
      {
        path: 'caisse',
        children: [
          {element: <Depot />, path: 'depot'},
          {element: <ExportComptable />, path: 'export-comptable'},
          {element: <ExportComptableMarge />, path: 'export-comptable-marge'},
          {element: <Statistics />, path: 'statistics'},
        ]
      }
    ],
  },
];
