import React, { useState } from 'react';
import { IconButton } from 'yet-another-react-lightbox';

import { Box, Tab, Card, Tabs, Table, Button, Tooltip, TableBody } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { useTranslate } from 'src/locales';
import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { useTable, emptyRows, TableNoData, getComparator, TableEmptyRows, TableHeadCustom, TableSelectedAction, TablePaginationCustom, rowInPage } from 'src/components/table';

import AbonnementTableToolbar from '../../abonnement-table-toolbar';
import AbonnementTableRow from '../../abonnement-table-row';

const frequence_list = [
  { value: 'all', label: 'Tous' },
  { value: 'ponctuel', label: 'Ponctuel' },
  { value: 'mensuel', label: 'Mensuel' },
  { value: 'trimestriel', label: 'Trimestriel' },
  { value: 'annuel', label: 'Annuel' },
];

const TABLE_HEAD = [
  { id: 'name', label: 'Nom' },
  { id: 'description', label: 'Description' },
  { id: 'duration', label: 'Durée', width: 140 },
  {
    id: 'price',
    label: 'Prix',
    width: 120,
  },
  { id: 'frequence', label: 'Fréquence de paiement' },
  { id: 'conditions', label: 'Conditions / Notes' },
  { id: 'actif', label: 'Actif', width: 110 },
  { id: '', width: 88 },
];

const data= [
  {
    id: '1',
    name: 'Service de Nettoyage',
    description: 'Nettoyage mensuel des bureaux',
    duration: '3 mois',
    price: 150,
    frequence: 'mensuel',
    conditions: 'Résiliation avec un préavis de 15 jours',
    actif: true,
  },
  {
    id: '2',
    name: 'Maintenance Serveur',
    description: 'Assistance et mise à jour serveur',
    duration: '12 mois',
    price: 1200,
    frequence: 'annuel',
    conditions: 'Paiement anticipé requis',
    actif: true,
  },
  {
    id: '3',
    name: 'Consultation IT',
    description: 'Consultation ponctuelle sur site',
    duration: '1 jour',
    price: 300,
    frequence: 'ponctuel',
    conditions: 'Sur rendez-vous',
    actif: false,
  },
  {
    id: '4',
    name: 'Audit Financier',
    description: 'Audit complet trimestriel',
    duration: '2 semaines',
    price: 900,
    frequence: 'trimestriel',
    conditions: 'Contrat de 6 mois minimum',
    actif: true,
  },
  {
    id: '5',
    name: 'Formation Sécurité',
    description: 'Formation des employés aux règles de sécurité',
    duration: '2 jours',
    price: 500,
    frequence: 'annuel',
    conditions: 'Certification incluse',
    actif: false,
  },
]
export default function AbonnementPageView() {
  const table = useTable();

  const confirm = useBoolean()

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

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Les abonnements"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Les abonnements', href: paths.dashboard.services.root },
          { name: 'Liste' },
        ]}
        action={
          <Button variant="contained" color="primary">
            {t('add')}
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card>
        <Tabs
          value={filters.state.frequence}
          onChange={(e, val) => filters.setState({ frequence: val })}
        >
          {frequence_list.map((tab) => (
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
                      (tab.value === 'ponctuel' && 'success') ||
                      (tab.value === 'mensuel' && 'warning') ||
                      (tab.value === 'trimestriel' && 'error') ||
                      (tab.value === 'annuel' && 'info') ||
                      'default'
                    }
                  >
                    {['completed', 'pending', 'cancelled', 'refunded'].includes(tab.value)
                      ? tableData.filter((user) => user.status === tab.value).length
                      : tableData.length}
                  </Label>
                }
              />
          ))}
        </Tabs>

        <AbonnementTableToolbar
          filters={filters}
            onResetPage={table.onResetPage}
        />

        {/* filterResult  */}

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
                    //   <AbonnementTableRow />
                    <></>
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

  return inputData;
}
