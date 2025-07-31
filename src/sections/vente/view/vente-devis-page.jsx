import { toast } from 'sonner';
import React, { useState, useCallback } from 'react';

import { Box, Card, Table, Stack, Button, TableBody, TextField } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useSetState } from 'src/hooks/use-set-state';

import { fIsAfter, fIsBetween } from 'src/utils/format-time';

import { DashboardContent } from 'src/layouts/dashboard';

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
} from 'src/components/table';

import VenteDevisRow from '../vente-devis-row';

// HEADERS
const TABLE_HEAD = [
  { id: '', width: 88 },
  { id: 'id', label: '#ID', width: 140 },
  { id: 'ref', label: 'Réf', width: 180 },
  { id: 'client', label: 'Client' },
  { id: 'date', label: 'Date' },
];

// SAMPLE DATA
const data = [
  {
    id: '1',
    ref: 'VNT-001',
    client: 'Jon Doe',
    date: '2025-07-30T12:00:00Z',
  },
  {
    id: '2',
    ref: 'VNT-002',
    client: 'Alice Smith',
    date: '2025-07-28T15:30:00Z',
  },
];

export default function VenteDevisView() {
  const table = useTable();
  const router = useRouter();
  const [tableData, setTableData] = useState(data);

  const filters = useSetState({
    ref: '',
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
  const canReset = !!filters.state.ref || filters.state.status !== 'all';

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

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Liste de devis"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Ventes', href: paths.dashboard.vente.root },
          { name: 'Devis' },
        ]}
        action={
          <Button
            color="primary"
            component={RouterLink}
            href={paths.dashboard.vente.add}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Nouvelle Vente / devis
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <Card sx={{ p: 2 }}>
        <Stack direction="row" spacing={2} mb={2}>
          <TextField
            label="Recherche par Réf"
            value={filters.state.ref}
            onChange={(e) => filters.setState({ ref: e.target.value })}
            sx={{ width: 300 }}
          />
        </Stack>

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
                    <VenteDevisRow row={row} onDeleteRow={() => handleDeleteRow(row.id)} />
                  ))}

                <TableEmptyRows
                  height={56}
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
  const { ref, startDate, endDate } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  inputData = stabilizedThis.map((el) => el[0]);

  // Filter by Réf
  if (ref) {
    inputData = inputData.filter((row) => row.ref.toLowerCase().includes(ref.toLowerCase()));
  }

  // Date filter
  if (!dateError && startDate && endDate) {
    inputData = inputData.filter((row) => fIsBetween(row.date, startDate, endDate));
  }

  return inputData;
}
