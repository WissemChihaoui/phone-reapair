import { Card } from '@mui/material';
import React from 'react';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import { useSetState } from 'src/hooks/use-set-state';
import { useTable } from 'src/components/table';
import {BoutiquesTableToolbar} from '../boutiques-table-toolbar';

export default function BoutiquesListView() {
  const table = useTable();
  const filters = useSetState({ name: '', role: [], status: 'all' });
  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
  });
  const canReset =
    !!filters.state.name || filters.state.role.length > 0 || filters.state.status !== 'all';
  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Les Boutiques"
          links={[
            { name: 'Tableau de bord', href: paths.admin.root },
            { name: 'Configuration', href: paths.admin.boutiques },
            { name: 'Liste' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
            <BoutiquesTableToolbar
              filters={filters}
              onResetPage={table.onResetPage}
            />
            {canReset && (
            <UserTableFiltersResult
              filters={filters}
              totalResults={dataFiltered.length}
              onResetPage={table.onResetPage}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}
        </Card>

      </DashboardContent>
    </>
  );
}
