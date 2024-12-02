import { Box, Button, Card, Table, TableBody } from '@mui/material';
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
import { VenteTableToolbar } from '../VenteTableToolbar';
import { VenteTableFiltersResult } from '../vente-table-filters-result';
import { VenteTableRow } from '../vente-table-row';

const TABLE_HEAD = [
  { id: '', width: 88 },
  { id: 'id', label: '#Id', width: 140 },
  { id: 'venteNumber', label: 'Réf', width: 140 },
  { id: 'name', label: 'Client' },
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
  const [tableData, setTableData] = useState(_orders);
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

  return (
    <>
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
                        // selected={table.selected.includes(row.id)}
                        // onSelectRow={() => table.onSelectRow(row.id)}
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
    </>
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

  if (status !== 'all') {
    inputData = inputData.filter((order) => order.status === status);
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter((order) => fIsBetween(order.createdAt, startDate, endDate));
    }
  }

  return inputData;
}
