import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config-global';

import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`${CONFIG.assetsDir}/assets/icons/navbar/${name}.svg`} />;

const ICONS = {
  repaire: icon('ic-repaire'),
  users: icon('ic-users'),
  stock: icon('ic-stock'),
  rachat: icon('ic-rachat'),
  caisse: icon('ic-caisse'),
  boutique: icon('ic-boutique'),
  icosystem: icon('ic-icosystem'),
  news: icon('ic-news'),
  support: icon('ic-support'),
  idea: icon('ic-idea'),
  job: icon('ic-job'),
  blog: icon('ic-blog'),
  chat: icon('ic-chat'),
  mail: icon('ic-mail'),
  user: icon('ic-user'),
  file: icon('ic-file'),
  lock: icon('ic-lock'),
  tour: icon('ic-tour'),
  order: icon('ic-order'),
  label: icon('ic-label'),
  blank: icon('ic-blank'),
  kanban: icon('ic-kanban'),
  folder: icon('ic-folder'),
  course: icon('ic-course'),
  banking: icon('ic-banking'),
  booking: icon('ic-booking'),
  invoice: icon('ic-invoice'),
  product: icon('ic-product'),
  calendar: icon('ic-calendar'),
  disabled: icon('ic-disabled'),
  external: icon('ic-external'),
  menuItem: icon('ic-menu-item'),
  ecommerce: icon('ic-ecommerce'),
  analytics: icon('ic-analytics'),
  dashboard: icon('ic-dashboard'),
  parameter: icon('ic-parameter'),
};

// ----------------------------------------------------------------------

export const navData = [
  {
    items:[
      { title: 'Tableau de bord', path: paths.dashboard.root, icon: ICONS.dashboard },
    ]
  },
  {
    subheader: 'Gestion',
    items: [
      {
        title: 'Réparations',
        path: paths.dashboard.group.root,
        icon: ICONS.repaire,
        children: [
          { title: 'Nouvelle réparations', path: paths.dashboard.group.root },
          { title: 'Liste des réparations', path: paths.dashboard.group.six },
          { title: 'Liste des devis', path: paths.dashboard.group.five },
          { title: 'Réparations externes', path: paths.dashboard.group.five },
          { title: 'Archives', path: paths.dashboard.group.five },
        ],
      },
      { 
        title: 'Clients',
        path: paths.dashboard.client.root,
        icon: ICONS.users,
        children: [
          { title: 'Nouveau client', path: paths.dashboard.client.add},
          { title: 'Liste des clients', path: paths.dashboard.client.root},
        ]
      },
      {
        title: 'Stock',
        path: paths.dashboard.stock.root,
        icon: ICONS.stock,
        children: [
          { title: 'Articles', path: paths.dashboard.stock.root},
          { title: 'Alerte stock', path: paths.dashboard.stock.alertStock},
          { title: 'Catégories articles', path: paths.dashboard.stock.categories},
          { title: 'Lieu de stockage', path: paths.dashboard.stock.stockage},
          { title: 'Fournisseurs', path: paths.dashboard.stock.fournisseurs},
          { title: 'Commandes', path: paths.dashboard.stock.commande},
          { title: 'Déstockage', path: paths.dashboard.stock.destockage},
        ]
      },
      {
        title: 'Ventes',
        path: paths.dashboard.vente.root,
        icon: ICONS.ecommerce,
        children: [
          {title:'Nouvelle vente', path: paths.dashboard.vente.add},
          {title:'Liste des ventes', path: paths.dashboard.vente.root},
          {title:'Caisse virtuelle', path: paths.dashboard.three},
          {title:'Vente devis', path: paths.dashboard.three},
        ]
      },
      {
        title: 'Rachat',
        path: paths.dashboard.rachat.root,
        icon: ICONS.rachat,
        children: [
          {title:'Nouveau rachat', path: paths.dashboard.rachat.add},
          {title:'Liste des rachats', path: paths.dashboard.rachat.root},
        ]
      },
      {
        title: 'Nos factures',
        path: paths.dashboard.invoice.root,
        icon: ICONS.invoice,
      },
    ],
  },
  {
    subheader: 'Ma boutique',
    items:[
      {
        title: 'Caisse',
        path: paths.dashboard.three,
        icon: ICONS.caisse,
        children: [
          {title:'Caisse', path: paths.dashboard.three},
          {title:'Dépôt bancaire', path: paths.dashboard.caisse.depot},
          {title:'Export comptable', path: paths.dashboard.caisse.exportComptable},
          {title:'Export comptable marge', path: paths.dashboard.caisse.exportComptableMarge},
          {title:'Statistique', path: paths.dashboard.caisse.statistiques},
        ]
      },
      {
        title: 'Ma Boutique',
        path: paths.dashboard.three,
        icon: ICONS.boutique,
        children: [
          {title:'Employées', path: paths.dashboard.three},
          {title:'Partenaires', path: paths.dashboard.three},
          {title:'Statut', path: paths.dashboard.three},
          {title:'Mode paiements', path: paths.dashboard.three},
          {title:'Type de client', path: paths.dashboard.three},
          {title:'Type de matériel', path: paths.dashboard.three},
          {title:'Conditions', path: paths.dashboard.three},
          {title:'Configurations', path: paths.dashboard.three},
          {title:'Impression', path: paths.dashboard.three},
          {title:'Casier de rangement', path: paths.dashboard.three},
          {title:'Fonction employeur', path: paths.dashboard.three},
        ]
      },
      {
        title: 'Ecosystem',
        path: paths.dashboard.three,
        icon: ICONS.icosystem
      },
      {
        title: 'Abonnement',
        icon: ICONS.booking,
        path: paths.dashboard.three,
        children: [
          {title:'Mon abonnement', path: paths.dashboard.three},
          {title: 'Parrainage', path: paths.dashboard.three}
        ]
      },
      {
        title: 'Calendrier',
        icon: ICONS.calendar,
        path: paths.dashboard.three,
      }
    ]
  },
  /**
   * Overview
   */
  {
    subheader: 'Sasgestion',
    items: [
      {
        title: 'Boité à idée',
        icon: ICONS.idea,
        path: paths.dashboard.three,
      },
      {
        title: 'Support technique',
        icon: ICONS.support,
        path: paths.dashboard.three,
      },
      {
        title: 'Nouveautés',
        icon: ICONS.news,
        path: paths.dashboard.three,
      },
    ],
  },
  /**
   * Management
   */
  
];
