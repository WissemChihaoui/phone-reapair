import React from 'react';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import RegroupementForm from '../../regroupement-form';

export default function RegroupementAddView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Ajouter un regroupement"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Stock', href: paths.dashboard.stock.root },
          { name: 'Regroupement', href: paths.dashboard.stock.regroupement },
          { name: 'Ajouter' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <RegroupementForm />
    </DashboardContent>
  );
}
