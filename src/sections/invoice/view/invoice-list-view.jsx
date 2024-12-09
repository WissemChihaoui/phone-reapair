import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { sumBy } from 'src/utils/helper';
import { fIsAfter, fIsBetween } from 'src/utils/format-time';

import { varAlpha } from 'src/theme/styles';
import { DashboardContent } from 'src/layouts/dashboard';
import { _invoices, INVOICE_SERVICE_OPTIONS } from 'src/_mock';

import { Label } from 'src/components/label';
import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
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

import { InvoiceAnalytic } from '../invoice-analytic';
import { InvoiceTableRow } from '../invoice-table-row';
import { InvoiceTableToolbar } from '../invoice-table-toolbar';
import { InvoiceTableFiltersResult } from '../invoice-table-filters-result';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: '' },
  { id: 'id', label: '#ID'},
  { id: 'invoiceNumber', label: 'Client' },
  { id: 'createDate', label: 'Date' },
  { id: 'price', label: 'Prix' },
  { id: 'sent', label: 'Produits', align: 'center' },
  { id: 'status', label: 'Statut' },
  
];

const PAIEMENT_METHODS = [
  { id: 1, label: "Virement" },
  { id: 2, label: "Espèces" },
  { id: 3, label: "Carte Bancaire" },
  { id: 4, label: "Chèque" },
  { id: 5, label: "PayPal" },
  { id: 6, label: "Autre" }
];

const FACTURE_TYPE = [
  { id: 0, label: 'Réparations'},
  { id: 1, label: 'Ventes'},
]

const TABLE_DATA = [
  {
    id: 1,
    commande_id: '1',
    client: {
      addressType: 'Home',
      company: 'Gleichner, Mueller and Tromp',
      email: 'ashlynn.ohara62@gmail.com',
      fullAddress: '19034 Verna Unions Apt. 164 - Honolulu, RI / 87535',
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
      name: 'Jayvion Simon',
      phoneNumber: '+1 202-555-0143',
      primary: true,
    },
    amount: 250,
    product:[ 
      {
        id:1,
        name : 'PC LENEVO V14',
      },
      {
        id:2,
        name : 'PC LENEVO V15',
      },
    ],
    date : "2024-12-26T00:00:00+01:00",
    payement: "Virement",
    type: 'Réparations',
    status : 'Avoir'
  },
  {
    id: 2,
    commande_id: '2',
    client: {
      addressType: 'Home',
      company: 'Gleichner, Mueller and Tromp',
      email: 'ashlynn.ohara62@gmail.com',
      fullAddress: '19034 Verna Unions Apt. 164 - Honolulu, RI / 87535',
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
      name: 'Havier Simon',
      phoneNumber: '+1 202-555-0143',
      primary: true,
    },
    amount: 250,
    product:[ 
      {
        id:1,
        name : 'PC LENEVO V14',
      },
      {
        id:2,
        name : 'PC LENEVO V15',
      },
    ],
    date : "2024-12-26T00:00:00+01:00",
    payement: "Virement",
    type: 'Réparations',
    status : 'Payé'
  },
]


// ----------------------------------------------------------------------

export function InvoiceListView() {
  const theme = useTheme();

  const router = useRouter();

  const table = useTable({ defaultOrderBy: 'date' });

  const confirm = useBoolean();

  const [tableData, setTableData] = useState(TABLE_DATA);

  const filters = useSetState({
    name: '',
    payement: [],
    type:[],
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
    filters.state.payement.length > 0 ||
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
      label: 'Tous',
      color: 'default',
      count: tableData.length,
    },
    {
      value: 'Payé',
      label: 'Payé',
      color: 'success',
      count: getInvoiceLength('Payé'),
    },
    {
      value: 'Accomptes',
      label: 'Accomptes',
      color: 'warning',
      count: getInvoiceLength('Accomptes'),
    },
    {
      value: 'Avoir',
      label: 'Avoir',
      color: 'error',
      count: getInvoiceLength('Avoir'),
    },
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
          heading="Liste des factures"
          links={[
            { name: 'Tableau de bord', href: paths.dashboard.root },
            { name: 'Les factures', href: paths.dashboard.invoice.root },
            { name: 'Liste' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card sx={{ mb: { xs: 3, md: 5 } }}>
          <Scrollbar sx={{ minHeight: 108 }}>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              <InvoiceAnalytic
                title="Totale"
                total={tableData.length}
                percent={100}
                price={sumBy(tableData, (invoice) => invoice.totalAmount)}
                icon="solar:bill-list-bold-duotone"
                color={theme.vars.palette.info.main}
              />

              <InvoiceAnalytic
                title="Payé"
                total={getInvoiceLength('Payé')}
                percent={getPercentByStatus('Payé')}
                price={getTotalAmount('Payé')}
                icon="solar:file-check-bold-duotone"
                color={theme.vars.palette.success.main}
              />

              <InvoiceAnalytic
                title="Accomptes"
                total={getInvoiceLength('Accomptes')}
                percent={getPercentByStatus('Accomptes')}
                price={getTotalAmount('Accomptes')}
                icon="solar:sort-by-time-bold-duotone"
                color={theme.vars.palette.warning.main}
              />

              <InvoiceAnalytic
                title="Avoir"
                total={getInvoiceLength('Avoir')}
                percent={getPercentByStatus('Avoir')}
                price={getTotalAmount('Avoir')}
                icon="solar:bell-bing-bold-duotone"
                color={theme.vars.palette.error.main}
              />

            </Stack>
          </Scrollbar>
        </Card>

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

          <InvoiceTableToolbar
            filters={filters}
            dateError={dateError}
            onResetPage={table.onResetPage}
            options={{ payement: PAIEMENT_METHODS.map((option) => option.label), type: FACTURE_TYPE.map((option) => option.label) }}
          />

          {canReset && (
            <InvoiceTableFiltersResult
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
                      <InvoiceTableRow
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
    </>
  );
}

function applyFilter({ inputData, comparator, filters, dateError }) {
  const { name, status, payement, type, startDate, endDate } = filters;

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
        invoice.commande_id.indexOf(name.toLowerCase()) !== -1 ||
        invoice.client.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((invoice) => invoice.status === status);
  }

  console.log(inputData)

  if (payement.length > 0) {
    inputData = inputData.filter((item) => payement.includes(item.payement));
  }
  if (type.length > 0) {
    inputData = inputData.filter((item) => type.includes(item.type));
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter((invoice) => fIsBetween(invoice.date, startDate, endDate));
    }
  }

  return inputData;
}
