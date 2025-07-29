import React from 'react';

import { Fab, Stack, Tooltip } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { Iconify } from 'src/components/iconify';

export default function Shortcuts() {
  return (
    <Stack direction="row" spacing={1}>
      <Tooltip title="Créer une réparation" arrow>
        <Fab
          href={paths.dashboard.reparations.add}
          LinkComponent={RouterLink}
          size="small"
          color="primary"
        >
          <Iconify icon="hugeicons:repair" />
        </Fab>
      </Tooltip>
      <Tooltip title="Nouvelle vente" arrow>
        <Fab href={paths.dashboard.vente.add} LinkComponent={RouterLink} size="small" color="info">
          <Iconify icon="weui:shop-outlined" />
        </Fab>
      </Tooltip>
      <Tooltip href={paths.dashboard.caisse.root} LinkComponent={RouterLink} title="Caisse" arrow>
        <Fab size="small" color="warning">
          <Iconify icon="ph:cash-register" />
        </Fab>
      </Tooltip>
      <Tooltip
        href={paths.dashboard.calendrier.root}
        LinkComponent={RouterLink}
        title="Calendrier"
        arrow
      >
        <Fab size="small" color="success">
          <Iconify icon="majesticons:calendar-line" />
        </Fab>
      </Tooltip>
      <Tooltip title="Fond de caisse" arrow>
        <Fab
          href={paths.dashboard.caisse.depot}
          LinkComponent={RouterLink}
          size="small"
          color="inherit"
        >
          <Iconify icon="solar:cash-out-linear" />
        </Fab>
      </Tooltip>
    </Stack>
  );
}
