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
      { title: 'Tableau de bord', path: paths.admin.root, icon: ICONS.dashboard },
    ]
  },
  {
    subheader: 'Gestion',
    items: [
      {
        title: 'Boutiques',
        path: paths.admin.boutiques,
        icon: ICONS.boutique,
      },
      {
        title: 'Configurations',
        path: paths.admin.draft,
        icon: ICONS.repaire,
      },
    ],
  },
  {
    subheader: 'Sasgestion',
    items: [
      {
        title: 'Boite à idée',
        path: paths.admin.draft,
        icon: ICONS.repaire,
      },
      {
        title: 'Materiel',
        path: paths.admin.materials,
        icon: ICONS.repaire,
      },
      {
        title: 'Marque',
        path: paths.admin.marques,
        icon: ICONS.repaire,
      },
      {
        title: 'Model',
        path: paths.admin.modele,
        icon: ICONS.repaire,
      },
      {
        title: 'Support technique',
        path: paths.admin.draft,
        icon: ICONS.repaire,
      },
    ],
  },
  
];
