import React, { useCallback, useState } from 'react';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import { Card, Tab, Table, TableBody, Tabs } from '@mui/material';
import { Label } from 'src/components/label';
import { useSetState } from 'src/hooks/use-set-state';
import { emptyRows, getComparator, TableEmptyRows, TableHeadCustom, TableNoData, useTable } from 'src/components/table';
import { varAlpha } from 'src/theme/styles';
import { useTheme } from '@emotion/react';
import { Scrollbar } from 'src/components/scrollbar';
import { fIsBetween, today } from 'src/utils/format-time';

import { DepotSearchToolbar } from '../depot-search-toolbar';
import { DepotHistoriqueRow } from '../depot-historique-row';

const DepotTypes = [
    { value: "depot_bancaire", label: "Dépot Bancaire" },
    { value: "depot_espece", label: "Dépot Éspece" }
  ]
const TabsHeader = [
  { value: "all", label: "Tous"},
  ...DepotTypes
]

const TABLE_HEAD = [
  { id: 'date', label: 'Date de dépot' },
  { id: 'amount', label: 'Montant' },
  { id: 'type', label: 'Type' },
  { id: 'bank', label: 'Banque' },
]

export default function DepotViewList() {

  const theme = useTheme();

  const table = useTable({ defaultOrderBy: 'createDate' });

  const [tableData, setTableData] = useState([
    {
      id:0,
      date: today(),
      amount: 120.5,
      type: 'depot_bancaire',
      bank: ''
    }
  ]);

  const filters = useSetState({
    status: 'all',
  });

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
  });

  const canReset =filters.state.status !== 'all';

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      table.onResetPage();
      filters.setState({ status: newValue });
    },
    [filters, table]
  );

  const tabCounts = getTabCounts(tableData);
  
  return (
    <>
      <DashboardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <CustomBreadcrumbs
          heading="Dépôt bancaire"
          links={[
            { name: 'Tableau de bord', href: paths.dashboard.root },
            { name: 'Dépot bancaire', href: paths.dashboard.caisse.depot },
            { name: 'Liste' },
          ]}
        />
        <DepotSearchToolbar />

        <Card>
          <Tabs
            value={filters.state.status}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
            }}
          >
            {TabsHeader.map((tab) => (
              <Tab 
                key={tab.value}
                value={tab.value}
                label={tab.label}
                iconPosition="end"
                icon={
                  <Label
                    variant={
                      ((tab.value === 'all' || tab.value === filters.state.status) && 'filled') ||
                      'soft'
                    }
                  >
                    {tabCounts[tab.value] || 0}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <Scrollbar sx={{ minHeight: 444 }}>
            <Table size='small' sx={{ minWidth: 800}}>
              <TableHeadCustom 
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                onSort={table.onSort}
              />

              <TableBody>
                {
                  dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <DepotHistoriqueRow
                      key={row.id}
                      row={row}
                    />
                  ))
                }
                  <TableEmptyRows
                    height={table.dense ? 56 : 56 + 20}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                  />
                  <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </Card>


      </DashboardContent>
      
    </>
  );
}

function applyFilter({ inputData, comparator, filters }) {
  const { status, startDate, endDate } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);


  if (status !== 'all') {
    inputData = inputData.filter((invoice) => invoice.type === status);
  }

  return inputData;
}

const getTabCounts = (data) => {
  const counts = { all: data.length };

  DepotTypes.forEach((type) => {
    counts[type.value] = data.filter((item) => item.type === type.value).length;
  });

  return counts;
};