import React from 'react'
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs'
import { DashboardContent } from 'src/layouts/dashboard'
import { paths } from 'src/routes/paths'
import RachatAddEditView from '../rachat-add-edit-view'

export default function RachatAddView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Créer un nouveau rachat"
        
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
