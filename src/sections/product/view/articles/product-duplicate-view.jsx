import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ProductDuplicateForm } from '../../product-duplicate-form';

// ----------------------------------------------------------------------

export function ProductDuplicateView({ product }) {
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Duplicate"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Stock', href: paths.dashboard.stock.root },
          { name: 'Duplicate', href: paths.dashboard.stock.root },
          { name: product?.name },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ProductDuplicateForm currentProduct={product} />
    </DashboardContent>
  );
}
