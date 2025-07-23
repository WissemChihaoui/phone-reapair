import { toast } from 'sonner';
import React, { useState, useCallback } from 'react';

import { Box, Card, Table, Button, Tooltip, TableBody, IconButton } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import {
  useTable,
  rowInPage,
  emptyRows,
  TableNoData,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
} from 'src/components/table';

import { RegroupementTableRow } from '../../regroupement-table-row';
import RegroupementTableToolbar from '../../regroupement-table-toolbar';
import RegroupementTableFilterResult from '../../regroupement-table-filter-result';

const TABLE_HEAD = [
  { id: '', label: 'Actions' },
  { id: 'groupe', label: 'Regroupement' },
  { id: 'price', label: 'Prix totale' },
  { id: 'products', label: 'Piéce à changer' },
];

const data = [
  {
    id: 1,
    name: 'Groupe 1',
    description: 'lorem ipsuem',
    products: [
      {
        id: 1,
        name: 'Article 1',
        price: 50,
        price_sell: 75,
      },
    ],
  },
];
export default function RegroupementPageView() {
  const table = useTable({ defaultDense: true });

  const router = useRouter();

  const confirm = useBoolean();

  const [tableData, setTableData] = useState(data);

  const filters = useSetState({ name: '' });

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset = !!filters.state.name;

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

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.user.edit(id));
    },
    [router]
  );
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Regroupement"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Stock', href: paths.dashboard.stock.root },
          { name: 'Regroupement' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
        action={
          <Box display="flex" gap={2}>
            <Button
              component={RouterLink}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              href={paths.dashboard.stock.addRegroupement}
              color='primary'
            >
              Ajouter Regroupement
            </Button>
          </Box>
        }
      />

      <Card>
        {/* Toolbar  */}
        <RegroupementTableToolbar filters={filters} onResetPage={table.onResetPage} />
        {/* Filter Result  */}
        {canReset && (
          <RegroupementTableFilterResult
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
              <Tooltip title="Supprimer">
                <IconButton color="primary" onClick={confirm.onTrue}>
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            }
          />

          <Scrollbar>
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
                    <RegroupementTableRow
                      key={row.id}
                      //   quickEdit={quickEdit}
                      row={row}
                      selected={table.selected.includes(row.id)}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      onEditRow={() => handleEditRow(row.id)}
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
  );
}
function applyFilter({ inputData, comparator, filters }) {
  const { name } = filters;

  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (name) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(name.toLowerCase()) !== -1
    );
  }

  return inputData;
}
