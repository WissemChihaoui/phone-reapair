import React, { useState, useCallback } from 'react';

import { Tab, Box, Card, Tabs, Table, Button, TableBody } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useSetState } from 'src/hooks/use-set-state';

import { fIsAfter } from 'src/utils/format-time';

import { varAlpha } from 'src/theme/styles';
import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
} from 'src/components/table';

import SavTableRow from '../sav-table-row';
import SavTableFiltersResult from '../sav-table-filter-result';

const _ETAT_OPTIONS = [
  { value: 'all', label: 'Tous' },
  { value: 'en_attente', label: 'SAV en cours' },
  { value: 'en_cours', label: 'SAV cloturés' },
  { value: 'defectueux', label: 'Article défectueux' },
];

const TABLE_HEAD = [
  { id: '', width: 88 },
  { id: 'sav', label: 'SAV', width: 150 },
  { id: 'status', label: 'Status', width: 120 },
  { id: 'client', label: 'Client' },
  { id: 'product', label: 'Produit' },
  { id: 'type', label: 'Type' },
  { id: 'fournisseur', label: 'Fournisseur' },
  { id: 'date', label: 'Date' },
  { id: 'recu', label: 'Réçu' },
];

const data = [
  {
    id: 1,
    sav: 'SAV-001',
    status: 'en_cours',
    client: 'John Doe',
    product: 'Smartphone XYZ',
    type: 'Réparation écran',
    fournisseur: 'Fournisseur ABC',
    date: '2024-12-05T00:00:00+01:00',
    recu: 'Reçu-001',
    note: 'Note de test pour le SAV 001',
  },
  {
    id: 2,
    sav: 'SAV-002',
    status: 'en_attente',
    client: 'Jane Smith',
    product: 'Tablette ABC',
    type: 'Échange',
    fournisseur: 'Fournisseur XYZ',
    date: '2024-12-06T00:00:00+01:00',
    recu: 'Reçu-002',
    note: 'Note de test pour le SAV 002',
  },
];
export default function SavListView() {
  const table = useTable({ defaultOrderBy: 'date' });

  const [tableData, setTableData] = useState(data);

  const filters = useSetState({
    status: 'all',
  });

  const dateError = fIsAfter(filters.state.startDate, filters.state.endDate);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
    dateError,
  });
  const canReset = filters.state.status !== 'all';

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleFilterStatus = useCallback(
    (event, newValue) => {
      table.onResetPage();
      filters.setState({ status: newValue });
    },
    [filters, table]
  );
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Liste des SAV"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'SAV', href: paths.dashboard.sav.root },
          { name: 'Liste' },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
            href={paths.dashboard.sav.add}
            LinkComponent={RouterLink}
            color='primary'
          >
            Ajouter un SAV
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Card>
        <Tabs
          value={filters.state.status}
          onChange={handleFilterStatus}
          sx={{
            px: 2.5,
            boxShadow: (theme) =>
              `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
          }}
        >
          {_ETAT_OPTIONS.map((tab) => (
            <Tab
              key={tab.value}
              iconPosition="end"
              value={tab.value}
              label={tab.label}
              icon={
                <Label
                  variant={
                    ((tab.value === 'all' || tab.value === filters.state.status) && 'filled') ||
                    'soft'
                  }
                  color={
                    (tab.value === 'en_cours' && 'info') ||
                    (tab.value === 'en_attente' && 'warning') ||
                    (tab.value === 'defectueux' && 'error') ||
                    'default'
                  }
                >
                  {['en_cours', 'en_attente', 'defectueux'].includes(tab.value)
                    ? tableData.filter((row) => row.status === tab.value).length
                    : tableData.length}
                </Label>
              }
            />
          ))}
        </Tabs>

        {canReset && (
          <SavTableFiltersResult
            filters={filters}
            onResetPage={table.onResetPage}
            dateError={dateError}
            sx={{ p: 2.5, pt: 0 }}
            totalResults={dataFiltered.length}
            statusOptions={_ETAT_OPTIONS}
          />
        )}
        <Box sx={{ position: 'relative' }}>
          <Scrollbar sx={{ minHeight: 444 }}>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={dataFiltered.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
              />
              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <SavTableRow
                      key={row.id}
                      row={row}
                      STATUS_OPTIONS={_ETAT_OPTIONS}
                      selected={table.selected.includes(row.id)}
                    />
                  ))}
                <TableEmptyRows
                  height={table.dense ? 56 : 56 + 20}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                />
                <TableNoData notFound={notFound} />
              </TableBody>
            </Table>
          </Scrollbar>
        </Box>
      </Card>
    </DashboardContent>
  );
}
function applyFilter({ inputData, comparator, filters, dateError }) {
  const { status } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  inputData = stabilizedThis.map((el) => el[0]);

  if (status !== 'all') {
    inputData = inputData.filter((order) => order.status === status);
  }

  if (dateError) {
    inputData = [];
  }

  return inputData;
}
