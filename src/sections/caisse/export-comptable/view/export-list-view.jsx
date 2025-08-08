import { useState, useCallback } from 'react';
import { PDFViewer } from '@react-pdf/renderer';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import {
  Stack,
  MenuItem,
  TableRow,
  TableCell,
  TableFooter,
  Dialog,
  DialogActions,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { today, fIsAfter, fIsBetween } from 'src/utils/format-time';

import { varAlpha } from 'src/theme/styles';
import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
import {
  useTable,
  emptyRows,
  rowInPage,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import { ExportTableRow } from '../export-table-row';
import { ExportTableToolbar } from '../export-table-toolbar';
import { ExportTableFiltersResult } from '../export-table-filters-result';
import { ExportComptablePDF } from '../export-comptable-pdf';

// import { OrderTableRow } from '../order-table-row';
// import { OrderTableToolbar } from '../order-table-toolbar';
// import { OrderTableFiltersResult } from '../order-table-filters-result';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  { value: 'all', label: 'Tous' },
  { value: 'facture', label: 'Facture' },
  { value: 'accompte', label: 'Facture Accompte' },
  { value: 'avoir', label: 'Avoir' },
];

const TABLE_HEAD = [
  { id: 'orderNumber', label: '#Facture', width: 88 },
  { id: 'ref', label: 'Réfèrence' },
  { id: 'payment', label: 'Paiement' },
  { id: 'products', label: 'Articles' },
  { id: 'createdAt', label: 'Date', width: 140 },
  {
    id: 'tva',
    label: 'Total TVA',
    width: 120,
    align: 'center',
  },
  {
    id: 'tva',
    label: 'Total HT',
    width: 120,
    align: 'center',
  },
  {
    id: 'tva',
    label: 'Total TTC',
    width: 120,
    align: 'center',
  },
];

const TABLE_DATA = [
  {
    id: 5488,
    orderNumber: 'F111220241',
    ref: 'v258446',
    type: 'vente',
    date: today(),
    status: 'avoir',
    items: [
      {
        id: 1,
        article: 'article with quarantie',
        priceHt: 16.67,
        tvaPercent: 20,
      },
      {
        id: 2,
        article: 'article with quarantie',
        priceHt: 20,
        tvaPercent: 10,
      },
    ],
    payement: [
      { amount: 10, methode: 'Paypal' },
      { amount: 10, methode: 'Virement' },
    ],
  },
];

const invoice = {
   invoiceFrom: {
    name: 'demo reparateur',
    fullAddress: 'Rue Général Delacroix - Bazin\n97139 Les Abymes',
    phoneNumber: '0690751575',
  },
   period: {
    start: '2025-07-01',
    end: '2025-07-21',
  },
  items: [
    {
      id: '1',
      numero: 'F2025-0595',
      paiements: [
        { amount: 45.0, method: 'Espèce' },
        { amount: 10.0, method: 'Espèce' },
      ],
      priceHT: 45.83,
      tauxTVA: 20,
      totalTVA: 9.17,
      totalTTC: 55.0,
      date: '2025-07-04T09:19:00',
    },
  ],
}

// ----------------------------------------------------------------------
function calculateTotals(data) {
  return data.reduce(
    (totals, row) => {
      row.items.forEach((item) => {
        const tvaValue = (item.priceHt * item.tvaPercent) / 100; // TVA value
        totals.totalHT += item.priceHt;
        totals.totalTVA += tvaValue;
        totals.totalTTC += item.priceHt + tvaValue;
      });
      return totals;
    },
    { totalHT: 0, totalTVA: 0, totalTTC: 0 }
  );
}

export function ExportListView() {
  const table = useTable({ defaultOrderBy: 'orderNumber' });

  const view = useBoolean();

  const router = useRouter();

  const popover = usePopover();

  const confirm = useBoolean();

  const [tableData, setTableData] = useState(TABLE_DATA);

  console.log(tableData);

  const filters = useSetState({
    type: 'all',
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
    filters.state.type !== 'all' ||
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

  const handleDeleteRows = useCallback(() => {
    const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));

    toast.success('Suppression du succès !');

    setTableData(deleteRows);

    table.onUpdatePageDeleteRows({
      totalRowsInPage: dataInPage.length,
      totalRowsFiltered: dataFiltered.length,
    });
  }, [dataFiltered.length, dataInPage.length, table, tableData]);

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

  const totals = calculateTotals(dataFiltered);

  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Liste des export comptable"
          links={[
            { name: 'Tableau de bord', href: paths.dashboard.root },
            { name: 'Export Comptable', href: paths.dashboard.caisse.exportComptable },
            { name: 'Liste' },
          ]}
          action={
            <>
              <Button
                onClick={popover.onOpen}
                variant="outlined"
                startIcon={<Iconify icon="solar:export-bold" />}
              >
                Exporter
              </Button>
              <CustomPopover
                open={popover.open}
                onClose={popover.onClose}
                anchorEl={popover.anchorEl}
                title="Exporter"
              >
                <Stack spacing={1}>
                  <MenuItem onClick={popover.onClose} startIcon={<Iconify icon="solar:csv" />}>
                    Exporter en CSV
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      view.onTrue();
                      popover.onClose();
                    }}
                    startIcon={<Iconify icon="solar:xlsx" />}
                  >
                    Exporter en PDF
                  </MenuItem>
                </Stack>
              </CustomPopover>
            </>
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
            {STATUS_OPTIONS.map((tab) => (
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
                      (tab.value === 'avoir' && 'success') ||
                      (tab.value === 'facture' && 'warning') ||
                      (tab.value === 'accompte' && 'error') ||
                      'default'
                    }
                  >
                    {['facture', 'facture', 'accompte'].includes(tab.value)
                      ? tableData.filter((row) => row.status === tab.value).length
                      : tableData.length}
                  </Label>
                }
              />
            ))}
          </Tabs>

          <ExportTableToolbar
            filters={filters}
            onResetPage={table.onResetPage}
            dateError={dateError}
          />

          {canReset && (
            <ExportTableFiltersResult
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
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row) => (
                      <ExportTableRow
                        key={row.id}
                        row={row}
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
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={5} align="right" sx={{ fontWeight: 'bold' }}>
                      Total
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                      {totals.totalTVA.toFixed(2)} €
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                      {totals.totalHT.toFixed(2)} €
                    </TableCell>
                    <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                      {totals.totalTTC.toFixed(2)} €
                    </TableCell>
                  </TableRow>
                </TableFooter>
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

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {table.selected.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirm.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />

      <Dialog fullScreen open={view.value}>
        <Box sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
          <DialogActions sx={{ p: 1.5 }}>
            <Button color="inherit" variant="contained" onClick={view.onFalse}>
              Fermer
            </Button>
          </DialogActions>

          <Box sx={{ flexGrow: 1, height: 1, overflow: 'hidden' }}>
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              {invoice && <ExportComptablePDF invoice={invoice} />}
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}

function applyFilter({ inputData, comparator, filters, dateError }) {
  const { status, type, startDate, endDate } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (type !== 'all ') {
    inputData = inputData.filter((order) => order.type.toLowerCase === type.toLowerCase);
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
