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
    items: [{ title: 'Tableau de bord', path: paths.dashboard.root, icon: ICONS.dashboard }],
  },
  {
    subheader: 'Gestion',
    items: [
      {
        title: 'Réparations',
        path: paths.dashboard.group.root,
        icon: ICONS.repaire,
        children: [
          { title: 'Nouvelle réparations', path: paths.dashboard.reparations.add },
          { title: 'Réparation & Devis', path: paths.dashboard.reparations.root },
        ],
      },
      {
        title: 'Clients',
        path: paths.dashboard.client.root,
        icon: ICONS.users,
        children: [
          { title: 'Nouveau client', path: paths.dashboard.client.add },
          { title: 'Liste des clients', path: paths.dashboard.client.root },
        ],
      },
      {
        title: 'Stock',
        path: paths.dashboard.stock.root,
        icon: ICONS.stock,
        children: [
          { title: 'Articles', path: paths.dashboard.stock.root },
          { title: 'Inventaire', path: paths.dashboard.stock.inventaire },
          { title: 'Alerte stock', path: paths.dashboard.stock.alertStock },
          { title: 'Commandes', path: paths.dashboard.stock.commande },
          { title: 'Déstockage', path: paths.dashboard.stock.destockage },
          {
            title: 'Paramétrage',
            path: paths.dashboard.stock.categories,
            children: [
              { title: 'Catégories articles', path: paths.dashboard.stock.categories },
              { title: "Regroupement d'articles" , path: paths.dashboard.stock.regroupement },
              { title: 'Lieu de stockage', path: paths.dashboard.stock.stockage },
              { title: 'Fournisseurs', path: paths.dashboard.stock.fournisseurs },
              { title: 'Famille comptable', path: paths.dashboard.stock.famille },
            ],
          },
        ],
      },
      {
        title: 'Services',
        path: paths.dashboard.services.root,
        icon: ICONS.label,
      },
      {
        title: 'Ventes',
        path: paths.dashboard.vente.root,
        icon: ICONS.ecommerce,
        children: [
          { title: 'Nouvelle vente', path: paths.dashboard.vente.add },
          { title: 'Liste des ventes', path: paths.dashboard.vente.root },
          { title: 'Caisse virtuelle', path: paths.dashboard.vente.caisse },
        ],
      },
      
      {
        title: 'Rachat',
        path: paths.dashboard.rachat.root,
        icon: ICONS.rachat,
        children: [
          { title: 'Nouveau rachat', path: paths.dashboard.rachat.add },
          { title: 'Liste des rachats', path: paths.dashboard.rachat.root },
        ],
      },
      {
        title: 'Nos factures',
        path: paths.dashboard.invoice.root,
        icon: ICONS.invoice,
      },

      {
        title: "Liste des SAV",
        path: paths.dashboard.sav.root,
        icon: ICONS.invoice,
      },
    ],
  },
  {
    subheader: 'Ma boutique',
    items: [
      {
        title: 'Caisse',
        path: paths.dashboard.caisse.root,
        icon: ICONS.caisse,
        children: [
          { title: 'Caisse', path: paths.dashboard.caisse.root },
          { title: 'Dépôt bancaire', path: paths.dashboard.caisse.depot },
          { title: 'Export comptable', path: paths.dashboard.caisse.exportComptable },
          { title: 'Export comptable marge', path: paths.dashboard.caisse.exportComptableMarge },
          { title: 'Export comptable famille', path: paths.dashboard.caisse.exportComptableFamille },
          { title: 'Statistique', path: paths.dashboard.caisse.statistiques },
        ],
      },
      {
        title: 'Achats/Dépenses',
        path: paths.dashboard.achats.root,
        icon: ICONS.file
      },
      {
        title: 'Ma Boutique',
        path: paths.dashboard.boutique.root,
        icon: ICONS.boutique,
        children: [
          { title: 'Employées', path: paths.dashboard.boutique.root },
          { title: 'Fonction employeur', path: paths.dashboard.boutique.fonctions },
          { title: 'Partenaires', path: paths.dashboard.boutique.partenaires },
          { title: 'Statut', path: paths.dashboard.boutique.status },
          { title: 'Mode paiements', path: paths.dashboard.boutique.methodes },
          { title: 'Type de client', path: paths.dashboard.boutique.types },
          { title: 'Type de matériel', path: paths.dashboard.boutique.materialTypes },
          { title: 'Conditions', path: paths.dashboard.boutique.conditions },
          { title: 'Configurations', path: paths.dashboard.boutique.configurations },
          { title: 'Impression', path: paths.dashboard.boutique.impression },
          { title: 'Casier de rangement', path: paths.dashboard.boutique.cassierRangements },
        ],
      },
      // {
      //   title: 'Abonnement',
      //   icon: ICONS.booking,
      //   path: paths.dashboard.abonnement.root,
      //   children: [
      //     { title: 'Mon abonnement', path: paths.dashboard.abonnement.root },
      //     { title: 'Parrainage', path: paths.dashboard.abonnement.parrainage },
      //   ],
      // },
      {
        title: 'Calendrier',
        icon: ICONS.calendar,
        path: paths.dashboard.calendrier.root,
      },
    ],
  },
  /**
   * Overview
   */
  // {
  //   subheader: 'Sasgestion',
  //   items: [
  //     {
  //       title: 'Boité à idée',
  //       icon: ICONS.idea,
  //       path: paths.dashboard.idee.root,
  //     },
  //     {
  //       title: 'Support technique',
  //       icon: ICONS.support,
  //       path: paths.dashboard.support.root,
  //     },
  //     {
  //       title: 'Nouveautés',
  //       icon: ICONS.news,
  //       path: paths.dashboard.news.root,
  //     },
  //   ],
  // },
  /**
   * Management
   */
];
