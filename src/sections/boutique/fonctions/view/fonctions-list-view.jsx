import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import FonctionSideView from './fonction-side-view';
import { PermissionSideView } from './permission-side-view';

export default function FonctionsListView() {
  const [view, setView] = useState('permission');
  const handleChangeView = useCallback((event, newView) => {
    if (newView !== null) {
      setView(newView);
    }
  }, []);
  return (
    <DashboardContent>
        <CustomBreadcrumbs
          heading="Les fonctions employeur"
          links={[
            { name: 'Tableau de bord', href: paths.dashboard.root },
            { name: 'Fonction et permission', href: paths.dashboard.boutique.fonctions },
            { name: 'Liste' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
          action={
            <ToggleButtonGroup size="small" value={view} exclusive onChange={handleChangeView}>
              <ToggleButton value="fonctions" color="primary">
                <Iconify icon="ri:function-line" />
                <Box sx={{ px: 2 }}>Fonctions</Box>
              </ToggleButton>

              <ToggleButton value="permission" color="primary">
                <Iconify icon="material-symbols:lock-outline-sharp" />
                <Box sx={{ px: 2 }}>Permission</Box>
              </ToggleButton>
            </ToggleButtonGroup>
          }
        />

        {view === 'fonctions' ? (
            <FonctionSideView />
        ):(
            <PermissionSideView />
        )}
      </DashboardContent>
  );
}
