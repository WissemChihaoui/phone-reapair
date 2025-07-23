import { Box, Button, Card, Tab, Table, TableBody, Tabs } from '@mui/material';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useCallback, useState } from 'react';
import { useSetState } from 'src/hooks/use-set-state';
import { Iconify } from 'src/components/iconify';
import {
  emptyRows,
  getComparator,
  rowInPage,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  useTable,
} from 'src/components/table';
import { fIsAfter, fIsBetween } from 'src/utils/format-time';
import { toast } from 'src/components/snackbar';
import { RouterLink } from 'src/routes/components';
import { _orders } from 'src/_mock';
import { Scrollbar } from 'src/components/scrollbar';
import { Label } from 'src/components/label';
import { varAlpha } from 'src/theme/styles';
import { VenteTableToolbar } from '../VenteTableToolbar';
import { VenteTableFiltersResult } from '../vente-table-filters-result';
import { VenteTableRow } from '../vente-table-row';

const _ventes = [
  {
    id: 1,
    venteNumber: 4556,
    customer: {
      name : 'Wissem Chihaoui',
      email: 'mail@mail.com',
    },
    createdAt: '2024-11-25T12:41:34+01:00',
    subtotal: 255.2,
    status: 2,
  },
  {
    id: 2,
    venteNumber: 4556,
    customer: {
      name : 'Wissem Chihaoui',
      email: 'mail@mail.com',
    },
    createdAt: '2024-11-25T11:41:34+01:00',
    subtotal: 255.2,
    status: 1,
  },
]

const STATUS_OPTIONS = [
  { value: 'all', label: 'Tous' },
  { value: '0', label: 'Facturé' },
  { value: '1', label: 'Devis' },
  { value: '2', label: 'Paiement Partiel' },
];

const TABLE_HEAD = [
  { id: '', width: 88 },
  { id: 'id', label: '#Id', width: 140 },
  { id: 'venteNumber', label: 'Réf', width: 140 },
  { id: 'name', label: 'Client' },
  { id: 'status', label: 'Statut' },
  { id: 'createdAt', label: 'Date', width: 200 },
  {
    id: 'totalQuantity',
    label: 'Prix',
    width: 200,
  },
];

export function VenteListView() {
  const table = useTable({ defaultOrderBy: 'createdAt' });
  const router = useRouter();
  const [tableData, setTableData] = useState(_ventes);
  const filters = useSetState({
    name: '',
    status: 'all',
    startDate: null,
    endDate: null,
  });

  const dateError = fIsAfter(filters.state.startDate, filters.state.endDate);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
    dateError,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset =
    !!filters.state.name ||
    filters.state.status !== 'all' ||
    (!!filters.state.startDate && !!filters.state.endDate);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);

      toast.success('Suppression du succès !');

      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.order.details(id));
    },
    [router]
  );

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
          heading="Liste des ventes"
          links={[
            { name: 'Tableau de bord', href: paths.dashboard.root },
            { name: 'Ventes', href: paths.dashboard.vente.root },
            { name: 'Liste' },
          ]}
          action={
            <Button
            color='primary'
              component={RouterLink}
              href={paths.dashboard.vente.add}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Nouvelle Vente
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
  {STATUS_OPTIONS.map((tab) => {
    const statusCount =
      tab.value === 'all'
        ? tableData.length
        : tableData.filter((order) => String(order.status) === tab.value).length;

    return (
      <Tab
        key={tab.value}
        value={tab.value}
        label={
          <>
            {tab.label}
            <Label
               variant={
                ((tab.value === 'all' || tab.value === filters.state.status) && 'filled') ||
                'soft'
              }
              color={
                (tab.value === '0' && 'success') ||
                (tab.value === '1' && 'warning') ||
                (tab.value === '2' && 'error') ||
                'default'
              }
              sx={{ ml: 1 }}
            >
              {statusCount}
            </Label>
          </>
        }
      />
    );
  })}
</Tabs>

          <VenteTableToolbar
            filters={filters}
            onResetPage={table.onResetPage}
            dateError={dateError}
          />

          {canReset && (
            <VenteTableFiltersResult
              filters={filters}
              totalResults={dataFiltered.length}
              onResetPage={table.onResetPage}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <Box sx={{ position: 'relative' }}>
            <Scrollbar sx={{ minHeight: 444 }}>
              <Table size="small" sx={{ minWidth: 960 }}>
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
                      <VenteTableRow
                        key={row.id}
                        row={row}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onViewRow={() => handleViewRow(row.id)}
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
  const { status, name, startDate, endDate } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (order) =>
        order.orderNumber.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        order.customer.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        order.customer.email.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (filters.status !== 'all') {
    inputData = inputData.filter((order) => String(order.status) === filters.status);
  }
  

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter((order) => fIsBetween(order.createdAt, startDate, endDate));
    }
  }

  return inputData;
}
