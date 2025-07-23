import { toast } from 'sonner';
import React, { useState } from 'react';

import { Stack, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import FamilleCard from '../../famille-card';

export default function FamillePageView() {
  const [familles, setFamilles] = useState([]);

  const handleAddFamille = () => {
    setFamilles([
      ...familles,
      {
        id: Date.now(),
        name: '',
        denomination: '',
      },
    ]);
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

  const handleSubmit = () => {
    const hasEmpty = familles.some((f) => !f.name || !f.denomination);

    if (hasEmpty) {
      toast.error('Veuillez remplir tous les champs avant de soumettre.');
      return;
    }

    // Simulate save
    console.log('Saving familles:', familles);

    toast.success('Familles sauvegardées avec succès');
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
          <Stack direction="row" spacing={2}>
            <Button color='primary' variant="contained" onClick={handleAddFamille}>
              Ajouter une Famille Comptable
            </Button>

            <Button
              variant="outlined"
              color="success"
              onClick={handleSubmit}
              disabled={familles.length === 0}
            >
              Sauvegarder
            </Button>
          </Stack>
        }
      />

      <Stack spacing={3}>
        <Grid container>
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
