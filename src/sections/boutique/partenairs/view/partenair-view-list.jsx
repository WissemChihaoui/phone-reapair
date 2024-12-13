import { Box, Button, Grid, Tab } from '@mui/material';
import React from 'react';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { CustomTabs } from 'src/components/custom-tabs';
import { Iconify } from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { useTabs } from 'src/hooks/use-tabs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import PartenaireExternList from '../partenair-extern-view';
import PartenaireInternView from '../partenair-intern-view';

const PARTENAIRES_TYPE =[
    {value: 0, label: 'SASgestion'},
    {value: 1, label: 'Externe'},
]

export default function PartenaireViewList() {
  const addDialog = useBoolean();
  const customTabs = useTabs(0);
  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Liste des partenaires"
          links={[
            { name: 'Tableau de bord', href: paths.dashboard.root },
            { name: 'Partenaires', href: paths.dashboard.boutique.partenaires },
            { name: 'Liste' },
          ]}
          action={
            <Grid display="flex" gap={2}>
              <Button
                onClick={() => addDialog.onTrue()}
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
              >
                Ajouter un partenaire externe
              </Button>
              <Button
                onClick={() => addDialog.onTrue()}
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
              >
                Ajouter un partenaire SASgestion
              </Button>
            </Grid>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Box>
          <CustomTabs
            value={customTabs.value}
            onChange={customTabs.onChange}
            variant="scrollable"
            sx={{ mx: 'auto', maxWidth: 320, borderRadius: 1 }}
          >
            {PARTENAIRES_TYPE.map((tab) => (
              <Tab key={tab.value} value={tab.value} label={tab.label} />
            ))}
          </CustomTabs>
            {customTabs.value ? (
                <PartenaireExternList />
            ):(
                <PartenaireInternView />
            )}
        </Box>
      </DashboardContent>
    </>
  );
}
