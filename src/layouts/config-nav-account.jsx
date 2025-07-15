import SvgIcon from '@mui/material/SvgIcon';

import { paths } from 'src/routes/paths';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export const _account = [
  {
    label: 'Abonnement',
    href: paths.dashboard.abonnement.root,
    icon: <Iconify icon="hugeicons:gift-card-02" />,
  },
  {
    label: 'Boité à idée',
    href: paths.dashboard.idee.root,
    icon: <Iconify icon="iconamoon:like-duotone" />,
  },
  {
    label: 'Support technique',
    href: paths.dashboard.support.root,
    icon: <Iconify icon="stash:headphones-duotone" />,
    info: '3',
  },
  {
    label: 'Nouveautés',
    href: '#',
    icon: <Iconify icon="flowbite:star-solid" />,
  },
  
];
