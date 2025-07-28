import { toast } from 'sonner';
import React, { useState, useCallback } from 'react';
import { IconButton } from 'yet-another-react-lightbox';

import { Box, Card, Table, Button, Tooltip, TableBody } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { useTranslate } from 'src/locales';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { AddServiceDialog } from 'src/components/form-dialogs/service';
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

import ServiceTableRow from '../service-table-row';
import ServiceTableToolbar from '../service-table-toolbar';
// import ServiceTableRow from '../service-table-row';


const TABLE_HEAD = [
  { id: '', width: 110},
  { id: 'name', label: 'Libellé' },
  { id: 'ref', label: 'Réf Interne' },
  { id: 'ean', label: 'EAN - Code Barre' },
  {
    id: 'pricettc',
    label: 'Prix Vente TTC',
  },
  { id: 'priceht', label: 'Prix Vente HT' },
  { id: 'tva', label: 'TVA', width: 110 },
];

const data = [
  {
    id: '1',
    name: 'Service de Nettoyage',
    ref: 'SRV001',
    ean: '1234567890123',
    pricettc: 180,         // TTC
    priceht: 150,          // HT
    tva: '20%',
  },
  {
    id: '2',
    name: 'Maintenance Serveur',
    ref: 'SRV002',
    ean: '1234567890456',
    pricettc: 1440,
    priceht: 1200,
    tva: '20%',
  },
  {
    id: '3',
    name: 'Consultation IT',
    ref: 'SRV003',
    ean: '1234567890789',
    pricettc: 360,
    priceht: 300,
    tva: '20%',
  },
  {
    id: '4',
    name: 'Audit Financier',
    ref: 'SRV004',
    ean: '1234567890999',
    pricettc: 1080,
    priceht: 900,
    tva: '20%',
  },
  {
    id: '5',
    name: 'Formation Sécurité',
    ref: 'SRV005',
    ean: '1234567890888',
    pricettc: 600,
    priceht: 500,
    tva: '20%',
  },
];

export default function ServicesPageView() {
  const table = useTable();

  const router = useRouter()

  const add = useBoolean()

  const confirm = useBoolean();

  const { t } = useTranslate('common');

  const [tableData, setTableData] = useState(data);

  const filters = useSetState({
    name: '',
    status: 'all',
    frequence: 'all',
  });

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
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

      toast.success('Suppression réussie !');

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
        heading="Les services"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Les services', href: paths.dashboard.services.root },
          { name: 'Liste' },
        ]}
        action={
          <Button variant="contained" color="primary" onClick={add.onTrue}>
            {t('add')}
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <ServiceTableToolbar filters={filters} onResetPage={table.onResetPage} />
        <Box sx={{ position: 'relative' }}>
       

          <Scrollbar sx={{ minHeight: 444 }}>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={dataFiltered.length}
                onSort={table.onSort}
                
              />

              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <ServiceTableRow
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
    <AddServiceDialog open={add.value} onClose={add.onFalse} />
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
        order.name.toLowerCase().indexOf(name.toLowerCase()) !== -1 ||
        order.ean.toLowerCase().indexOf(name.toLowerCase()) !== -1  ||
        order.ref.toLowerCase().indexOf(name.toLowerCase()) !== -1 
    );
  }


  return inputData;
}
