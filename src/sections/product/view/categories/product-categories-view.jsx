import {
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useCallback, useState } from 'react';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import { useSetState } from 'src/hooks/use-set-state';
import {
  emptyRows,
  getComparator,
  rowInPage,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from 'src/components/table';
import { RouterLink } from 'src/routes/components';
import { fIsAfter, fIsBetween } from 'src/utils/format-time';
import { toast } from 'sonner';
import { IconButton } from 'yet-another-react-lightbox';
import { useBoolean } from 'src/hooks/use-boolean';
import { Scrollbar } from 'src/components/scrollbar';
import { Iconify } from 'src/components/iconify';
import { ProductCategoriesToolbar } from '../../product-categories-toolbar';
import { ProductCategoriesFilterResult } from '../../product-categories-filter-result';
import { ProductCategoriesRow } from '../../product-categories-row';

export default function ProductCategoriesView() {
  const addDialog = useBoolean();

  const table = useTable({ defaultOrderBy: 'orderNumber' });
  const [tableData, setTableData] = useState([
    {
      id: '1',
      name: 'Ecran',
      createdAt: '2024-11-25T12:41:34+01:00',
      items: [
        { id: 1, name: 'TV', count: 5 },
        { id: 2, name: 'LCD', count: 2 },
      ],
    },
    {
      id: '2',
      name: 'Phone',
      createdAt: '2024-11-25T12:41:34+01:00',
      items: [{ id: 3, name: 'Smart', count: 1 }],
    },
  ]);
  const confirm = useBoolean();
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

  const TABLE_HEAD = [
    { id: 'name', label: 'Nom' },
    { id: 'createdAt', label: 'Date', width: 200 },
    {
      id: 'items',
      label: 'Sous Catégories',
      width: 120,
      align: 'center',
    },
    { id: '', label: 'Total articles', width: 200 },
    { id: '', width: 88 },
  ];

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);

      toast.success('Delete success!');

      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );
  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));

    toast.success('Delete success!');

    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleViewRow = useCallback((id) => {
    console.log('handle view row');
  }, []);

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
        heading="Liste des catégorie"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Liste des catégories', href: paths.dashboard.stock.categories },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
        action={
          <Button
            onClick={addDialog.onTrue}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Ajouter une catégorie
          </Button>
        }
      />

      <Card>
        <ProductCategoriesToolbar
          filters={filters}
          onResetPage={table.onResetPage}
          dateError={dateError}
        />
        {canReset && (
          <ProductCategoriesFilterResult
            filters={filters}
            totalResults={dataFiltered.length}
            onResetPage={table.onResetPage}
            sx={{ p: 2.5, pt: 0 }}
          />
        )}

        <Box sx={{ position: 'relative' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={dataFiltered.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                dataFiltered.map((row) => row.id)
              )
            }
            action={
              <Tooltip title="Delete">
                <IconButton color="primary" onClick={confirm.onTrue}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            }
          />

          <Scrollbar sx={{ minHeight: 444 }}>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={dataFiltered.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    dataFiltered.map((row) => row.id)
                  )
                }
              />

              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <ProductCategoriesRow
                      key={row.id}
                      rowParent={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
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

        <TablePaginationCustom
          page={table.page}
          dense={table.dense}
          count={dataFiltered.length}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onChangeDense={table.onChangeDense}
          onRowsPerPageChange={table.onChangeRowsPerPage}
        />
      </Card>

      <Dialog open={addDialog.value} onClose={addDialog.onFalse}>
        <DialogTitle>Ajouter Catégorie</DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 3 }}>
            Ajouter une catégorie maintenant, ajouter une sous-catégorie plus tard
          </Typography>

          <TextField autoFocus fullWidth type="text" variant="outlined" label="Nom du catégorie" />
        </DialogContent>

        <DialogActions>
          <Button onClick={addDialog.onFalse} variant="outlined" color="inherit">
            Annuler
          </Button>
          <Button onClick={addDialog.onFalse} variant="contained">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
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
