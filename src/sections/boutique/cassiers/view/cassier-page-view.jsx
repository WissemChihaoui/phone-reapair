import { Box, Button, Card, IconButton, Stack, Tooltip } from '@mui/material'
import React, { useState } from 'react'
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs'
import { Iconify } from 'src/components/iconify'
import { useSetState } from 'src/hooks/use-set-state'
import { DashboardContent } from 'src/layouts/dashboard'
import { paths } from 'src/routes/paths'
import { useRouter } from 'src/routes/hooks'
import { useBoolean } from 'src/hooks/use-boolean'
import { getComparator, TableSelectedAction, useTable } from 'src/components/table'
// import ProductCasierToolbar from '../../product-casier-toolbar'
import { ProductCasierFiltersResult } from '../product-casier-filters-result'
import { ProductCasierToolbar } from '../product-casier-toolbar'
import ProductCasierDnd from '../product-casier-dnd'

const casiersData = [
  {
    id:1,
    name:'Casier 1',
    createdAt: '2024-11-25T12:41:34+01:00',
  },
  {
    id:2,
    name:'Casier 2',
    createdAt: '2024-12-25T12:41:34+01:00',
  },
];

const TABLE_HEAD = [
  { id:"id", label:"ID" },
  { id:"name", label: "Nom" },
  { id:"createdAt", label: "Date de création"}
]

export default function CassierPageView() {

  const router = useRouter();
  const table = useTable({ defaultOrderBy: 'createdAt' });
  const confirm = useBoolean();
  const [tableData, setTableData] = useState(casiersData);
  const filters = useSetState({
    name: '',
    createdAt: null
  })
  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
  });

  const canReset =
  !!filters.state.name ||
  !!filters.state.createdAt;

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

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
    setTableData(tableData.filter((data) => data.id !== id))
  }

  const editData = (name, id) =>{
    setTableData(
      tableData.map((data) => data.id === id ? {...data, name} : data)
    )
  }

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Liste des casiers de rangements"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root},
          { name: 'Casiers de rangement', href: paths.dashboard.boutique.cassierRangements},
          { name: 'Page'}
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <ProductCasierToolbar
          filters={filters}
          // dateError={dateError}
          onResetPage={table.onResetPage}
        />

        {canReset && (
          <ProductCasierFiltersResult
            filters={filters}
            onResetPage={table.onResetPage}
            totalResults={dataFiltered.length}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}

        
          
      </Card>
      <Box mt={2}>
        <ProductCasierDnd editData={editData} deleteData={deleteData} addData={addData} data={dataFiltered} /> 
      </Box>
    </DashboardContent>
  )
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
      (casier) =>
        casier.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  return inputData;
}

