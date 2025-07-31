import React from 'react';

import { Box, Card, Stack, Divider, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

import { fDate, today } from 'src/utils/format-time';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

export default function VenteAbonDetails() {
  const details = [
    { label: 'Date création', value: '25-07-2025 15:35' },
    { label: 'Périodicité', value: 'Hebdomadaire' },
    { label: 'Dernière Facture', value: fDate(today()) },
    { label: 'Prochaine Facture', value: fDate(today()) },
    { label: 'Date Fin', value: fDate(today()) },
    { label: 'Date échéance', value: fDate(today()) },
    { label: 'Mode de paiement', value: '' },
  ];

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Suivre des abonnements"
        links={[
          { name: 'Tableau de brd', href: paths.dashboard.root },
          { name: 'Vente', href: paths.dashboard.vente.root },
          { name: 'Suivre des abonnements', href: paths.dashboard.vente.suivre },
          { name: 'Détails'}
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Détails de l&apos;abonnement
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <Stack spacing={2}>
          {details.map((item, index) => (
            <Box key={index} display="flex" justifyContent="space-between">
              <Typography variant="body2" color="text.secondary">
                {item.label}
              </Typography>
              <Typography variant="body2" fontWeight="medium">
                {item.value || '-'}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Card>
    </DashboardContent>
  );
}
