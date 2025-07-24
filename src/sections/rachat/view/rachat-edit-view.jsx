import React from 'react'

import { paths } from 'src/routes/paths'

import { DashboardContent } from 'src/layouts/dashboard'

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs'

import RachatAddEditView from '../rachat-add-edit-view'

export default function RachatEditView({product}) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Modifier rachat"
        
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Rachats', href: paths.dashboard.rachat.root },
          { name: 'Modifier' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <RachatAddEditView currentInvoice={product}/>
    </DashboardContent>
  )
}
