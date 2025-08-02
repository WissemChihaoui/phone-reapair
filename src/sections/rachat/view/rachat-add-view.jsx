import React from 'react'

import { paths } from 'src/routes/paths'

import { DashboardContent } from 'src/layouts/dashboard'

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs'

import RachatAddEditView from '../rachat-add-edit-view'

export default function RachatAddView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Ajouter un nouveau Rachat"
        
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Rachats', href: paths.dashboard.rachat.root },
          { name: 'Ajouter' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <RachatAddEditView />
    </DashboardContent>
  )
}
