import { Box, Card, IconButton, Table, TableBody, Tooltip } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import { useSetState } from 'src/hooks/use-set-state';
import { Scrollbar } from 'src/components/scrollbar';
import { Iconify } from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { today } from 'src/utils/format-time';
import { toast } from 'sonner';
import { emptyRows, getComparator, rowInPage, TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedAction, useTable } from 'src/components/table';
import {BoutiquesTableToolbar} from '../boutiques-table-toolbar';
import { BoutiquesTableFiltersResult } from '../boutiques-table-filters-result';
import { BoutiquesTableRow } from '../boutiques-table-row';


const TABLE_HEAD = [
  { id: 'id', label: 'ID', width: 50 },
  { id: 'boutiqueName', label: 'Nom de la boutique' },
  { id: 'phone', label: 'Téléphone', width: 180 },
  { id: 'note', label: 'Note', width: 180 },
  { id: 'dateInscrit', label: 'Date inscrit', width: 100 },
  { id: 'dateFin', label: 'Date fin', width: 100 },
  { id: 'lastLogin', label: 'Dernière connexion ', width: 100 },
  { id: '', width: 88 },
];

const TABLE_DATA = [
  {id: 255, boutiqueName: 'Triosweb', email: 'triosweb@mail.com', phone: '+216 99 999 999', note: 'note de boutique', dateInscrit: today(), dateFin: today(), lastLogin: today() }
]

export default function BoutiquesListView() {
  const table = useTable();
  const confirm = useBoolean()
  const [tableData, setTableData] = useState(TABLE_DATA);
  const filters = useSetState({ name: '', role: [], status: 'all' });
  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset =
    !!filters.state.name || filters.state.role.length > 0 || filters.state.status !== 'all';

    const notFound = (!dataFiltered.length && canReset) || !dataFiltered.length;

    const handleDeleteRow = useCallback(
      (id) => {
        const deleteRow = tableData.filter((row) => row.id !== id);
  
        toast.success('Suppression succès !');
  
        setTableData(deleteRow);
  
        table.onUpdatePageDeleteRow(dataInPage.length);
      },
      [dataInPage.length, table, tableData]
    );
  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Les Boutiques"
          links={[
            { name: 'Tableau de bord', href: paths.admin.root },
            { name: 'Configuration', href: paths.admin.boutiques },
            { name: 'Liste' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
            <BoutiquesTableToolbar
              filters={filters}
              onResetPage={table.onResetPage}
            />
            {canReset && (
            <BoutiquesTableFiltersResult
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

            <Scrollbar>
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
                      <BoutiquesTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        // onSelectRow={() => table.onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        // onEditRow={() => handleEditRow(row.id)}
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
    </>
  );
}

function applyFilter({ inputData, comparator, filters }) {
  const { name, status, role } = filters;

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

  if (status !== 'all') {
    inputData = inputData.filter((user) => user.status === status);
  }

  if (role.length) {
    inputData = inputData.filter((user) => role.includes(user.role));
  }

  return inputData;
}
