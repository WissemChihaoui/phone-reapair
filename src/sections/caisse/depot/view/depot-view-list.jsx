import React from 'react'
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs'
import { DashboardContent } from 'src/layouts/dashboard'
import { paths } from 'src/routes/paths'

export default function DepotViewList() {
  return (
    <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <CustomBreadcrumbs 
            heading="Dépôt bancaire"
            links={[
                { name: 'Tableau de bord', href: paths.dashboard.root },
                { name: 'Dépot bancaire', href: paths.dashboard.caisse.depot },
                { name: 'Liste' },
            ]}
        />
    </DashboardContent>
  )
}
