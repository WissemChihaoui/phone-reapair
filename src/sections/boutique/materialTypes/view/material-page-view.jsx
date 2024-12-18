import { Box, Card } from '@mui/material';
import React, { useState } from 'react';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { useSetState } from 'src/hooks/use-set-state';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import { getComparator, useTable } from 'src/components/table';
import { MaterialToolbar } from '../material-toolbar';
import { MaterialFiltersResult } from '../material-filters-result';
import MaterialDnd from '../material-dnd';

const materialsData = [
  {
    id: 1,
    name: 'Smartphone',
    createdAt: '2024-11-25T12:41:34+01:00',
  },
  {
    id: 2,
    name: 'Ordinateur Portable',
    createdAt: '2024-12-25T12:41:34+01:00',
  },
];

export default function MaterialPageView() {
  const table = useTable({ defaultOrderBy: 'createdAt' });
  const [tableData, setTableData] = useState(materialsData);
  const filters = useSetState({
    name: '',
    createdAt: null,
  });
  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
  });

  const canReset = !!filters.state.name || !!filters.state.createdAt;

  console.log(dataFiltered);

  const addData = (name) => {
    setTableData((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name,
        createdAt: '2024-12-25T12:41:34+01:00',
      },
    ]);
  };

  const deleteData = (id) => {
    setTableData(tableData.filter((data) => data.id !== id));
  };

  const editData = (name, id) => {
    setTableData(tableData.map((data) => (data.id === id ? { ...data, name } : data)));
  };

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Les types de matériels"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Types de matériel', href: paths.dashboard.boutique.types },
          { name: 'Liste' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <MaterialToolbar filters={filters} onResetPage={table.onResetPage} />

        {canReset && (
          <MaterialFiltersResult
            filters={filters}
            onResetPage={table.onResetPage}
            totalResults={dataFiltered.length}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}
      </Card>
      <Box mt={2}>
        <MaterialDnd
          editData={editData}
          deleteData={deleteData}
          addData={addData}
          data={dataFiltered}
        />
      </Box>
    </DashboardContent>
  );
}

function applyFilter({ inputData, comparator, filters }) {
  const { name } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (casier) => casier.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  return inputData;
}