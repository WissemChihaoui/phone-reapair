import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { VenteNewEditForm } from '../vente-new-edit-form';

// ----------------------------------------------------------------------

export function VenteCreateView() {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Créer une nouvelle vente"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Ventes', href: paths.dashboard.vente.root },
          { name: 'Ajouter' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <VenteNewEditForm />
    </DashboardContent>
  );
}
