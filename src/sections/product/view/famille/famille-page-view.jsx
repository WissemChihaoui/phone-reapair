import React, { useState } from 'react';

import { Stack, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { EmptyContent } from 'src/components/empty-content';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import FamilleCard from '../../famille-card';

export default function FamillePageView() {
  const [familles, setFamilles] = useState([]);

  const handleAddFamille = () => {
    setFamilles([...familles, { id: Date.now(), name: '', denominations: [] }]);
  };

  const handleUpdateFamille = (index, updated) => {
    const copy = [...familles];
    copy[index] = updated;
    setFamilles(copy);
  };

  const handleRemoveFamille = (index) => {
    const copy = [...familles];
    copy.splice(index, 1);
    setFamilles(copy);
  };


  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Famille comptable"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Stock', href: paths.dashboard.stock.root },
          { name: 'Famille comptable' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
        action={
          <Button sx={{ height: 'min-content' }} variant="contained" onClick={handleAddFamille}>
            Ajouter une Famille Comptable
          </Button>
        }
      />

      <Stack spacing={3}>
        <Grid container spacing={2}>
          <Grid xs={12}>{!familles?.length ? <EmptyContent /> : ""}</Grid>

          {familles.map((famille, index) => (
            <Grid xs={6} md={4}>
              <FamilleCard
                key={famille.id}
                data={famille}
                onChange={(updated) => handleUpdateFamille(index, updated)}
                onDelete={() => handleRemoveFamille(index)}
              />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </DashboardContent>
  );
}
