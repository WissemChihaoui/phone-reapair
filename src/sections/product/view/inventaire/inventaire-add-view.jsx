import React from 'react';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import InventaireForm from '../../inventaire-form';

export default function InventaireAddView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Inventaire"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Stock', href: paths.dashboard.stock.root },
          { name: 'Inventaire', href: paths.dashboard.stock.inventaire },
          { name: 'Ajouter' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <InventaireForm />
    </DashboardContent>
  );
}
