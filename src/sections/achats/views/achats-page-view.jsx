import { toast } from 'sonner';
import React, { useCallback, useState } from 'react';

import {
  Stack,
  Button,
  Box,
  Tooltip,
  IconButton,
  Table,
  TableBody,
  Card,
  TableCell,
  TableRow,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
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
  TableSelectedAction,
} from 'src/components/table';

import AchatsTableRow from '../achats-table-row';

const TABLE_HEAD = [
  { id: 'organisme', label: 'Organisme' },
  { id: 'ht', label: 'HT', width: 88 },
  { id: 'ttc', label: 'TTC', width: 88 },
  { id: 'facture', label: 'Facture', width: 120 },
  { id: 'date', label: 'Date' },
  { id: 'fix', label: 'Charge Fix' },
  { id: '', label: 'Actions' },
];

const data = [
  {
    id: '1',
    organisme: 'STEG',
    ht: 65.0,
    ttc: 78.0,
    facture: 'F-0254',
    date: '2020-04-30',
    fix: false,
  },
  {
    id: '2',
    organisme: 'STEG',
    ht: 12.5,
    ttc: 15.0,
    facture: 'd5f65f6d',
    date: '2025-05-01',
    fix: false,
  },
  {
    id: '3',
    organisme: 'STEG',
    ht: 65.0,
    ttc: 89.0,
    facture: 'sdfsdf5',
    date: '2025-04-23',
    fix: true,
  },
  {
    id: '4',
    organisme: 'STEG',
    ht: 25.0,
    ttc: 30.0,
    facture: 'F-6955',
    date: '2025-04-10',
    fix: false,
  },
];

export default function AchatsPageView() {
  const table = useTable({ defaultOrderBy: 'orderNumber' });
  const router = useRouter();

  const confirm = useBoolean();

  const [tableData, setTableData] = useState(data);

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
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Ma Boutique"
        links={[
          { name: 'Tableau du bord', href: paths.dashboard.root },
          { name: 'Achats & Dépenses', href: paths.dashboard.achats.root },
          { name: 'Liste' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
        action={
          <Stack gap={1} display="flex" flexDirection="row">
            <Button variant="outlined" color="primary">
              Mes organismes
            </Button>
            <Button variant="contained" color="primary">
              Ajouter une dépense
            </Button>
          </Stack>
        }
      />
      <Card>
        {/* toolbar  */}

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
                    <AchatsTableRow
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
            </Table>
          </Scrollbar>
        </Box>
        {/* filterResult */}
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

  if (!dateError) {
    if (startDate && endDate) {
      inputData = inputData.filter((order) => fIsBetween(order.createdAt, startDate, endDate));
    }
  }

  return inputData;
}