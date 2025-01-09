
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';

import EcoCardContent from './eco-card-content';

export default function EcologicPageView() {
  

  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Ajouter Ecologic"
          links={[
            { name: 'Tableau de bord', href: paths.dashboard.root },
            { name: 'Boutique', href: paths.dashboard.boutique.configurations },
            { name: 'Ecologic' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <EcoCardContent />
      </DashboardContent>
    </>
  );
}
