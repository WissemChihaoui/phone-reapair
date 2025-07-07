import React from 'react';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import RegroupementForm from '../../regroupement-form';

export default function RegroupementEditView({ data }) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Modifier un regroupement"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Stock', href: paths.dashboard.stock.root },
          { name: 'Regroupement', href: paths.dashboard.stock.regroupement },
          { name: data?.name },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <RegroupementForm currentData={data}/>
    </DashboardContent>
  );
}
