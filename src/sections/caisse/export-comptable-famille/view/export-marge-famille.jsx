import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import { TableRow, TableCell, TableFooter } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { today, fIsAfter, fIsBetween } from 'src/utils/format-time';

import { varAlpha } from 'src/theme/styles';
import { DashboardContent } from 'src/layouts/dashboard';

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
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import { ExportFamilleTableRow } from '../export-famille-table-row';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  { value: 'all', label: 'Tous' },
  { value: 'facture', label: 'Facture' },
  { value: 'accompte', label: 'Facture Accompte' },
  { value: 'avoir', label: 'Avoir' },
];

const TABLE_HEAD = [
  { id: 'orderNumber', label: 'N°Facture', width: 120 },
  { id: 'famille', label: 'Famille', width: 120 },
  { id: 'ref', label: 'Référence', width: 120 },
  { id: 'articles', label: 'Articles' },
  { id: 'totalTva', label: 'Total TVA', width: 120, align: 'center' },
  { id: 'totalHt', label: 'Total HT', width: 120, align: 'center' },
  { id: 'totalTtc', label: 'Total TTC', width: 120, align: 'center' },
];

// Example TABLE_DATA with articles array containing required fields
const TABLE_DATA = [
  {
    id: 5488,
    orderNumber: 'F111220241',
    famille: 'Famille A',
    ref: 'v258446',
    type: 'vente',
    status: 'avoir',
    date: today(),
    articles: [
      {
        name: 'Article 1',
        ht: 16.67,
        taux: 20,
        tva: 3.33,
        ttc: 20,
        date: today(),
        type: 'typeA',
      },
      {
        name: 'Article 2',
        ht: 20,
        taux: 10,
        tva: 2,
        ttc: 22,
        date: today(),
        type: 'typeB',
      },
    ],
  },
  {
    id: 5489,
    orderNumber: 'F111220242',
    famille: 'Famille B',
    ref: 'v258447',
    type: 'achat',
    status: 'facture',
    date: today(),
    articles: [
      {
        name: 'Article 3',
        ht: 10,
        taux: 5,
        tva: 0.5,
        ttc: 10.5,
        date: today(),
        type: 'typeA',
      },
    ],
  },
];

// Calculate totals for each row
function calculateRowTotals(articles) {
  return articles.reduce(
    (totals, art) => {
      totals.totalHT += art.ht;
      totals.totalTVA += art.tva;
      totals.totalTTC += art.ttc;
      return totals;
    },
    { totalHT: 0, totalTVA: 0, totalTTC: 0 }
  );
}

export function ExportMargeFamille() {
  const table = useTable({ defaultOrderBy: 'orderNumber' });

  const router = useRouter();

  const confirm = useBoolean();

  const [tableData, setTableData] = useState(TABLE_DATA);

  console.log(tableData);

  const [filters, setFilters] = useState({
    type: '',
    articleType: '',
    startDate: null,
    endDate: null,
  });

  const dateError = fIsAfter(filters.startDate, filters.endDate);

  // Filtering logic
  const dataFiltered = tableData.filter((row) => {
    // Filter by type
    if (filters.type && row.type !== filters.type) return false;
    // Filter by date
    if (filters.startDate && filters.endDate) {
      if (!fIsBetween(row.date, filters.startDate, filters.endDate)) return false;
    }
    // Filter by article type
    if (filters.articleType) {
      if (!row.articles.some((a) => a.type === filters.articleType)) return false;
    }
    return true;
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset =
    !!filters.type || filters.status !== 'all' || (!!filters.startDate && !!filters.endDate);

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

  const totals = calculateRowTotals(dataFiltered);

  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Liste des exports comptable marge"
          links={[
            { name: 'Tableau de bord', href: paths.dashboard.root },
            { name: 'Export Comptable', href: paths.dashboard.caisse.exportComptable },
            { name: 'Liste' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <Tabs
            value={filters.status}
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
                      ((tab.value === 'all' || tab.value === filters.status) && 'filled') || 'soft'
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

          {/* <ExportMargeTableToolbar
            filters={filters}
            onResetPage={table.onResetPage}
            dateError={dateError}
          /> */}

          {/* {canReset && (
            <ExportMargeTableFiltersResult
              filters={filters}
              totalResults={dataFiltered.length}
              onResetPage={table.onResetPage}
              sx={{ p: 2.5, pt: 0 }}
            />
          )} */}

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
                      <ExportFamilleTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onViewRow={() => handleViewRow(row.id)}
                      />
                    ))}
                  <TableEmptyRows
                    height={table.dense ? 56 : 76}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, dataFiltered.length)}
                  />

                  <TableNoData notFound={notFound} />
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={4} align="right" sx={{ fontWeight: 'bold' }}>
                      Totals
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

  if (type) {
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
