import React from 'react';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import AchatsAddEditView from '../achats-add-edit-view';

export default function AchatsEditView({ depense }) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Modifier la Dépense"
        links={[
          { name: 'Tableau du bord', href: paths.dashboard.root },
          { name: 'Achats & Dépenses', href: paths.dashboard.achats.root },
          { name: 'Modifier' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <AchatsAddEditView currentDepense={depense} />
    </DashboardContent>
  );
}
