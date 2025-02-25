import { Box, Card } from '@mui/material';
import React, { useState } from 'react';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { useSetState } from 'src/hooks/use-set-state';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import { today } from 'src/utils/format-time';
import { getComparator, useTable } from 'src/components/table';
import { MaterialToolbar } from '../material-toolbar';
import { MaterialFiltersResult } from '../material-filters-result';
import MaterialDnd from '../material-dnd';

const materialsData = [
  {
    id: 1,
    name: 'Modéle 1',
    marque:'Marque 1',
    materiel: 'Smartphone',
    createdAt: '2024-11-25T12:41:34+01:00',
    image: 'https://images.unsplash.com/photo-1600087626014-e652e18bbff2?q=80&w=1664&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
  {
    id: 2,
    marque:'Marque 1',
    name: 'Modéle 2',
    materiel: 'Ordinateur',
    createdAt: '2024-12-25T12:41:34+01:00',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
  },
];

export default function ModeleListView() {
  const table = useTable({ defaultOrderBy: 'createdAt' });
  const [tableData, setTableData] = useState(materialsData);
  const filters = useSetState({
    name: '',
    materiel: [],
    marque: [],
  });
  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
  });

  const canReset = !!filters.state.name || filters.state.materiel.length > 0 || filters.state.marque.length > 0

  console.log(dataFiltered);

  const addData = (data) => {
    setTableData((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        name: data.name,
        createdAt: today(),
        image: data.picture,
        materiel: data.materiel,
        marque: data.marque
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
        heading="Les modéles"
        links={[
          { name: 'Tableau de bord', href: paths.admin.root },
          { name: 'Les modéles', href: paths.admin.materials },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <MaterialToolbar filters={filters} onResetPage={table.onResetPage} options={['Smartphone', 'Ordinateur']} marques={['Marque 1', 'Marque2']}/>

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
  const { name, materiel, marque } = filters;

  // Sort data
  const stabilizedThis = inputData.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  inputData = stabilizedThis.map((el) => el[0]);

  // Filter by name
  if (name) {
    inputData = inputData.filter(
      (casier) => casier.name?.toLowerCase().includes(name.toLowerCase())
    );
  }

  // Filter by materiel
  if (materiel.length > 0) {
    inputData = inputData.filter((casier) =>
      materiel.some((item) => casier.materiel?.toLowerCase().includes(item.toLowerCase()))
    );
  }
  // Filter by materiel
  if (marque.length > 0) {
    inputData = inputData.filter((casier) =>
      marque.some((item) => casier.marque?.toLowerCase().includes(item.toLowerCase()))
    );
  }

  return inputData;
}

