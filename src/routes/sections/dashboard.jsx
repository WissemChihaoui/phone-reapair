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
const Regroupement = lazy(() => import ('src/pages/dashboard/stock/regroupement'));
const AddRegroupement = lazy(() => import ('src/pages/dashboard/stock/addRegroupement'));
const EditRegroupement = lazy(() => import ('src/pages/dashboard/stock/editRegroupement'));

const Ventes = lazy(() => import('src/pages/dashboard/ventes/index'))
const AddVente = lazy(() => import('src/pages/dashboard/ventes/add'))
const EditVente = lazy(() => import('src/pages/dashboard/ventes/edit'))
const CaisseVirtuelle = lazy(() => import('src/pages/dashboard/ventes/caisse'))

const Rachats = lazy(() => import('src/pages/dashboard/rachat/index'))
const AddRachats = lazy(() => import('src/pages/dashboard/rachat/add'))
const EditRachats = lazy(() => import('src/pages/dashboard/rachat/edit'))

const Invoice = lazy(() => import('src/pages/dashboard/invoice/index'))

const Caisse = lazy(() => import('src/pages/dashboard/caisse/index'))
const Depot = lazy(() => import('src/pages/dashboard/caisse/depot'))
const ExportComptable = lazy(() => import('src/pages/dashboard/caisse/export-comptable'))
const ExportComptableMarge = lazy(() => import('src/pages/dashboard/caisse/export-comptable-marge'))
const Statistics = lazy(() => import('src/pages/dashboard/caisse/statistics'))

const Employees = lazy(() => import('src/pages/dashboard/boutique/employees'))
const Partenaires = lazy(() => import('src/pages/dashboard/boutique/partenaires'))
const Status = lazy(() => import('src/pages/dashboard/boutique/status'))
const Methodes = lazy(() => import('src/pages/dashboard/boutique/methodes'))
const TypeClient = lazy(() => import('src/pages/dashboard/boutique/type_client'))
const TypeMateriel = lazy(() => import('src/pages/dashboard/boutique/type_materiel'))
const Conditions = lazy(() => import('src/pages/dashboard/boutique/conditions'))
const Configurations = lazy(() => import('src/pages/dashboard/boutique/configurations'))
const Rangements = lazy(() => import('src/pages/dashboard/boutique/cassiers_rangements'))
const Fonctions = lazy(() => import('src/pages/dashboard/boutique/fonctions'))
const Impression = lazy(() => import('src/pages/dashboard/boutique/impression'))

const Abonnement = lazy(() => import('src/pages/dashboard/abonnement/index'))
const Parrainage = lazy(() => import('src/pages/dashboard/abonnement/parrainage'))

const Calendar = lazy(() => import('src/pages/dashboard/calendrier/index'))

const Idee = lazy(() => import('src/pages/dashboard/idee/index'))

const Support = lazy(() => import('src/pages/dashboard/support/index'))
const ViewSupport = lazy(() => import('src/pages/dashboard/support/view'))
const AddSupport = lazy(() => import('src/pages/dashboard/support/add'))

const Reparations = lazy(() => import('src/pages/dashboard/reparations/index'))
const AddReparations = lazy(() => import('src/pages/dashboard/reparations/add'))
const AddReparations2 = lazy(() => import('src/pages/dashboard/reparations/add2'))
const DisplayReparations = lazy(() => import('src/pages/dashboard/reparations/display'))

const News = lazy(() => import('src/pages/dashboard/news/index'))
const ViewNews = lazy(() => import('src/pages/dashboard/news/view'))


const Ecosystem = lazy(() => import('src/pages/dashboard/ecosystem/add'))
const Ecologic = lazy(() => import('src/pages/dashboard/ecologic/add'))

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
        path: 'reparations',
        children: [
          {element:<Reparations />, index: true},
          {element:<AddReparations />, path: 'add'},
          {element:<AddReparations2 />, path: 'add2'},
          {element:<DisplayReparations />, path: ':id/display'},
        ]
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
          {element: <Regroupement />, path:'regroupement'},
          {element: <AddRegroupement />, path:'regroupement/add'},
          {element: <EditRegroupement />, path:'regroupement/:id/edit'},
          {element: <EditCommande />, path:'commande/:id/edit'},
        ]
      },
      {
        path: 'vente',
        children: [
          {element: <Ventes />, index: true},
          {element: <AddVente />, path: 'add'},
          {element: <CaisseVirtuelle />, path: 'caisse'},
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
          {element: <Caisse />, index: true},
          {element: <Depot />, path: 'depot'},
          {element: <ExportComptable />, path: 'export-comptable'},
          {element: <ExportComptableMarge />, path: 'export-comptable-marge'},
          {element: <Statistics />, path: 'statistics'},
        ]
      },
      {
        path: 'boutique',
        children: [
          {element: <Employees />, index:true},
          {element: <Partenaires />, path:'partenaires'},
          {element: <Status />, path:'status'},
          {element: <Methodes />, path:'methodes'},
          {element: <TypeClient />, path:'client-types'},
          {element: <TypeMateriel />, path:'material-types'},
          {element: <Conditions />, path:'conditions'},
          {element: <Configurations />, path:'configurations'},
          {element: <Rangements />, path:'cassier-rangements'},
          {element: <Fonctions />, path:'fonctions'},
          {element: <Impression />, path:'impression'},
        ]
      }, 
      {
        path:'abonnement',
        children: [
          {element: <Abonnement />, index:true},
          {element: <Parrainage />, path: 'parrainage'},
        ]
      },
      {
        path:'calendrier',
        children: [
          {element: <Calendar />, index: true}
        ]
      },
      {
        path:'idee',
        children: [
          {element: <Idee />, index: true}
        ]
      },
      {
        path:'support',
        children: [
          {element: <Support />, index: true},
          {element: <ViewSupport />, path:':title/edit'},
          {element: <AddSupport />, path:'add'},
        ]
      },
      {
        path: 'news', 
        children: [
          {element: <News /> , index: true},
          {element: <ViewNews />, path:':title/view'},
        ]
      },
      {
        path: 'ecosystem',
        children: [
          { element: <Ecosystem />, path: ':id/add'}
        ]
      },
      {
        path: 'ecologic',
        children: [
          { element: <Ecologic />, path: ':id/add'}
        ]
      }
    ],
  },
];
