import { toast } from 'sonner';
import { useTheme } from '@emotion/react';
import { PDFViewer } from '@react-pdf/renderer';
import React, { useState, useCallback } from 'react';

import {
  Box,
  Tab,
  Card,
  Tabs,
  Table,
  Button,
  Dialog,
  TableBody,
  DialogActions,
  Stack,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { sumBy } from 'src/utils/helper';
import { fIsAfter, fIsBetween } from 'src/utils/format-time';

import { varAlpha } from 'src/theme/styles';
import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import {
  useTable,
  emptyRows,
  rowInPage,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/table';

import DestockagePDF from '../../destockage-pdf';
import { DestockageTableRow } from '../../destockage-table-row';
import { DestockageTableToolbar } from '../../destockage-table-toolbar';
import { DestockageTableFiltersResult } from '../../destockage-table-filter-result';

const TABLE_HEAD = [
  { id: 'destockage', label: '#ID' },
  { id: 'article', label: 'Article' },
  { id: 'createdAt', label: 'Date' },
  { id: 'type', label: 'Type' },
  { id: 'status', label: 'Statut' },
  { id: 'admin', label: 'Boutique' },
];

const INVOICE_SERVICE_OPTIONS = ['Vente', 'Prise en charge'];

export default function ProductDestockageList() {
  const theme = useTheme();

  const view = useBoolean();

  const router = useRouter();

  const table = useTable({ defaultOrderBy: 'createdAt' });

  const confirm = useBoolean();

  const [tableData, setTableData] = useState([
    {
      id: '1',
      destockage: '21258',
      name: 'Ecran TV LCD',
      createdAt: '2024-11-25T12:41:34+01:00',
      type: 'Vente',
      status: 'pending',
      admin: 'Wissem',
    },
  ]);

  const filters = useSetState({
    name: '',
    type: [],
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
    filters.state.type.length > 0 ||
    filters.state.status !== 'all' ||
    (!!filters.state.startDate && !!filters.state.endDate);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

  const getInvoiceLength = (status) => tableData.filter((item) => item.status === status).length;

  const getTotalAmount = (status) =>
    sumBy(
      tableData.filter((item) => item.status === status),
      (invoice) => invoice.totalAmount
    );

  const getPercentByStatus = (status) => (getInvoiceLength(status) / tableData.length) * 100;

  const TABS = [
    {
      value: 'all',
      label: 'Touts',
      color: 'default',
      count: tableData.length,
    },
    {
      value: 'paid',
      label: 'Payé',
      color: 'success',
      count: getInvoiceLength('paid'),
    },
    {
      value: 'pending',
      label: 'En Cours',
      color: 'warning',
      count: getInvoiceLength('pending'),
    },
    {
      value: 'overdue',
      label: 'Facturé',
      color: 'error',
      count: getInvoiceLength('overdue'),
    },
    {
      value: 'draft',
      label: 'Annulée',
      color: 'default',
      count: getInvoiceLength('draft'),
    },
  ];

  const handleDeleteRow = useCallback(
    (id) => {
      const deleteRow = tableData.filter((row) => row.id !== id);

      toast.success('Suppression du succès !');

      setTableData(deleteRow);

      table.onUpdatePageDeleteRow(dataInPage.length);
    },
    [dataInPage.length, table, tableData]
  );

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));

    toast.success('Suppression du succès !');

    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.invoice.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.invoice.details(id));
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
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Liste des déstockage"
          links={[
            { name: 'Tableau de bord', href: paths.dashboard.root },
            { name: 'Déstockage' },
            { name: 'Liste' },
          ]}
          action={
            <Stack direction="row" spacing={1}>
            <Button
              variant="outlined"
              startIcon={<Iconify icon="" />}
              color='primary'
            >
              CSV
            </Button>
            <Button
              variant="outlined"
              startIcon={<Iconify icon="" />}
              color='primary'
            >
              Excel
            </Button>
            <Button
              variant="outlined"
              startIcon={<Iconify icon="" />}
              onClick={view.onTrue}
              color='primary'
            >
              PDF
            </Button>
            </Stack>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <Tabs
            value={filters.state.status}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: `inset 0 -2px 0 0 ${varAlpha(theme.vars.palette.grey['500Channel'], 0.08)}`,
            }}
          >
            {TABS.map((tab) => (
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
                    color={tab.color}
                  >
                    {tab.count}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <DestockageTableToolbar
            filters={filters}
            dateError={dateError}
            onResetPage={table.onResetPage}
            options={{ services: INVOICE_SERVICE_OPTIONS }}
          />

          {canReset && (
            <DestockageTableFiltersResult
              filters={filters}
              onResetPage={table.onResetPage}
              totalResults={dataFiltered.length}
              sx={{ p: 2.5, pt: 0 }}
            />
          )}

          <Box sx={{ position: 'relative' }}>
            <Scrollbar sx={{ minHeight: 444 }}>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
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
                      <DestockageTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onViewRow={() => handleViewRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
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
      </DashboardContent>
      <Dialog fullScreen open={view.value}>
        <Box sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
          <DialogActions sx={{ p: 1.5 }}>
            <Button color="inherit" variant="contained" onClick={view.onFalse}>
              Close
            </Button>
          </DialogActions>
          <Box sx={{ flexGrow: 1, height: 1, overflow: 'hidden' }}>
            <PDFViewer width="100%" height="100%">
              <DestockagePDF rows={tableData} />
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
function applyFilter({ inputData, comparator, filters, dateError }) {
  const { name, status, type, startDate, endDate } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (invoice) =>
        invoice.destockage.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        invoice.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((invoice) => invoice.status === status);
  }

  if (type.length) {
    inputData = inputData.filter((user) => type.includes(user.type));
  }

  // if (type.length) {
  //   inputData = inputData.filter((invoice) =>
  //     invoice.items.some((filterItem) => type.includes(filterItem.type))
  //   );
  // }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter((invoice) => fIsBetween(invoice.createdAt, startDate, endDate));
    }
  }

  return inputData;
}
