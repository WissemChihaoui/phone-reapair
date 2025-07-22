import { PDFViewer } from '@react-pdf/renderer';
import React, { useState, forwardRef, useCallback } from 'react';

import { Box, Tab, Card, Tabs, Table, Stack, Slide, Button, Dialog, MenuItem, TableBody, DialogActions } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { fIsAfter, fIsBetween } from 'src/utils/format-time';

import { CONFIG } from 'src/config-global';
import { varAlpha } from 'src/theme/styles';
import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
import {
  useTable,
  emptyRows,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
} from 'src/components/table';

import RachatAllPDF from '../rachat-all-pdf';
import { RachatTableRow } from '../rachat-table-row';
import { RachatTableToolbar } from '../rachat-table-toolbar';
import { RachatTableFiltersResult } from '../rachat-table-filters-result';

const _ETAT_OPTIONS = [
  { value: 'all', label: 'Touts' },
  { value: 'excellent', label: 'Excellent' },
  { value: 'bien', label: 'Bien' },
  { value: 'moyen', label: 'Moyen' },
  { value: 'mauvais', label: 'Mauvais' },
];

const _orders = [
  {
    id: 0,
    cab: `${CONFIG.assetsDir}/assets/images/mock/sas/cab/cab.png`,
    name: 'Tv',
    client: 'Wissem Chihaoui',
    cin: `${CONFIG.assetsDir}/assets/images/about/vision.webp`,
    facture: '',
    price: 500,
    status: 'excellent',
    recu: '',
    date: '2024-12-05T00:00:00+01:00',
  },
];

const TABLE_HEAD = [
  { id: '', width: 88 },
  { id: 'id', label: '#ID', width: 88 },
  { id: 'cab', label: 'Code à barre' },
  { id: 'name', label: 'Article' },
  { id: 'client', label: 'Client' },
  { id: 'date', label: 'Date' },
  { id: 'cin', label: 'CIN' },
  { id: 'facture', label: 'Facture' },
  { id: 'price', label: 'Prix HT' },
  { id: 'status', label: 'État' },
  { id: 'recu', label: 'Réçu' },
];

const rachats = [
  {
    id: 1,
    product: { title: 'dfqsdf qsdfsqdf' },
    reference: '00',
    client: { name: 'test dsfsdf' },
    price: 22,
    state: 'excellent',
  },
  {
    id: 2,
    product: { title: 'produit test' },
    reference: '',
    client: { name: 'test' },
    price: 500,
    state: 'excellent',
  },
  // ...more items
];

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function RachatListView() {
  const table = useTable({ defaultOrderBy: 'date' });

  const popover = usePopover();

  const showFacture = useBoolean();

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

  const canReset =
    !!filters.state.name ||
    filters.state.status !== 'all' ||
    (!!filters.state.startDate && !!filters.state.endDate);

  const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

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
          heading="Liste des rachats"
          links={[
            { name: 'Tableau de bord', href: paths.dashboard.root },
            { name: 'Rachats', href: paths.dashboard.rachat.root },
            { name: 'Liste' },
          ]}
          action={
            <Stack direction="row" spacing={1} alignItems="center">
              <Button
                onClick={popover.onOpen}
                variant="outlined"
                startIcon={<Iconify icon="solar:export-bold" />}
              >
                Exporter
              </Button>
              <Button
                component={RouterLink}
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                href={paths.dashboard.rachat.add}
              >
                Ajouter Rachat
              </Button>

              <CustomPopover
                open={popover.open}
                onClose={popover.onClose}
                anchorEl={popover.anchorEl}
                title="Exporter"
              >
                <Stack spacing={1}>
                  <MenuItem  startIcon={<Iconify icon="solar:csv" />}>Exporter en CSV</MenuItem>
                  <MenuItem onClick={showFacture.onTrue} startIcon={<Iconify icon="solar:xlsx" />}>Exporter en PDF</MenuItem>
                </Stack>
              </CustomPopover>
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
                      (tab.value === 'excellent' && 'success') ||
                      (tab.value === 'bien' && 'info') ||
                      (tab.value === 'moyen' && 'warning') ||
                      (tab.value === 'mauvais' && 'error') ||
                      'default'
                    }
                  >
                    {['excellent', 'bien', 'moyen', 'mauvais'].includes(tab.value)
                      ? tableData.filter((row) => row.status === tab.value).length
                      : tableData.length}
                  </Label>
                }
              />
            ))}
          </Tabs>
          <RachatTableToolbar
            filters={filters}
            onResetPage={table.onResetPage}
            dateError={dateError}
          />

          {canReset && (
            <RachatTableFiltersResult
              filters={filters}
              totalResults={dataFiltered.length}
              onResetPage={table.onResetPage}
              sx={{ p: 2.5, pt: 0 }}
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
                      <RachatTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        // onSelectRow={() => table.onSelectRow(row.id)}
                        // onDeleteRow={() => handleDeleteRow(row.id)}
                        // onViewRow={() => handleViewRow(row.id)}
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
      <Dialog
        fullScreen
        keepMounted
        open={showFacture.value}
        TransitionComponent={Transition}
        onClose={showFacture.onFalse}
      >
        <Box sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
          <DialogActions sx={{ p: 1.5 }}>
            <Button color="inherit" variant="contained" onClick={showFacture.onFalse}>
              Fermer
            </Button>
          </DialogActions>
          <Box sx={{ flexGrow: 1, height: 1, overflow: 'hidden' }}>
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              {rachats && <RachatAllPDF rachats={rachats} />}
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
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
        order.client.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  if (status !== 'all') {
    inputData = inputData.filter((order) => order.status === status);
  }

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter((order) => fIsBetween(order.date, startDate, endDate));
    }
  }

  return inputData;
}
