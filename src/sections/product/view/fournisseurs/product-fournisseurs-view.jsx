import { Box, Button, Card, IconButton, Table, TableBody, Tooltip } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { toast } from 'sonner';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import {
  emptyRows,
  getComparator,
  rowInPage,
  TableEmptyRows,
  TableHeadCustom,
  TableNoData,
  TablePaginationCustom,
  TableSelectedAction,
  useTable,
} from 'src/components/table';
import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';
import { DashboardContent } from 'src/layouts/dashboard';
import { RouterLink } from 'src/routes/components';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { UserTableFiltersResult } from 'src/sections/user/user-table-filters-result';
import { UserTableRow } from 'src/sections/user/user-table-row';
import { UserTableToolbar } from 'src/sections/user/user-table-toolbar';
import { FournisseurTableRow } from '../../fournisseur-table-row';
import { FournisseurTableToolbar } from '../../fournisseur-table-toolbar';
import FournisseurAddEditForm from '../../FournisseurAddEditForm';

const TABLE_HEAD = [
  { id: 'actions', label: '' },
  { id: 'name', label: 'Nom' },
  { id: 'phone', label: 'Téléphone' },
  { id: 'email', label: 'E-mail' },
  { id: 'adress', label: 'Addresse' },
];

const FournisseursList = [
  {
    id: '1',
    name: 'Wissem Chihaoui',
    company: 'Company 1',
    phone: '+216 202-555-0143',
    fixNumber: '+216 202-555-0143',
    email: 'wissem@gmail.com',
    adress: 'Some Ville, 123 Country',
    city: 'Some Ville',
    zipCode: '13546',
  },
  {
    id: '2',
    name: '2Wissem Chihaoui',
    company: 'Company 2',
    phone: '+1 202-555-0143',
    fixNumber: '+1 202-555-0143',
    email: 'awissem@gmail.com',
    adress: 'A Some Ville, 123 Country',
    city: 'Some Ville',
    zipCode: '13546',
  },
];
export default function ProductFournisseursView() {
  const table = useTable({ defaultDense: true });

  const router = useRouter();

  const confirm = useBoolean();

  const quickEdit = useBoolean();

  const [tableData, setTableData] = useState(FournisseursList);

  const filters = useSetState({ name: '', type: [], status: 'all' });

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
    filters: filters.state,
  });

  const dataInPage = rowInPage(dataFiltered, table.page, table.rowsPerPage);

  const canReset =
    !!filters.state.name || filters.state.type.length > 0 || filters.state.status !== 'all';

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
          heading="Liste des fournisseurs"
          links={[
            { name: 'Tableau de bord', href: paths.dashboard.root },
            { name: 'Stock', href: paths.dashboard.stock.root },
            { name: 'Liste des fournisseurs' },
          ]}
          action={
            <Box display="flex" gap={2}>
              <Button
                component={RouterLink}
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={quickEdit.onTrue}
                color='primary'
              >
                Ajouter fournisseur
              </Button>
              <Button
                component={RouterLink}
                variant="outlined"
                startIcon={<Iconify icon="mingcute:add-line" />}
                href={paths.dashboard.stock.addCommande}
                color='primary'
              >
                Ajouter commande
              </Button>
            </Box>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card>
          <FournisseurTableToolbar
            filters={filters}
            onResetPage={table.onResetPage}
            options={{ roles: [] }}
          />

          {canReset && (
            <UserTableFiltersResult
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
                      <FournisseurTableRow
                        key={row.id}
                        quickEdit={quickEdit}
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
      <FournisseurAddEditForm
        currentFournisseur={null}
        open={quickEdit.value}
        onClose={quickEdit.onFalse}
      />
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Supprimer"
        content={
          <>
            Êtes-vous sûr de vouloir supprimer <strong> {table.selected.length} </strong> clients?
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
            Supprimer
          </Button>
        }
      />
    </>
  );
}

function applyFilter({ inputData, comparator, filters }) {
  const { name, status, type } = filters;

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

  if (type.length) {
    inputData = inputData.filter((user) => type.includes(user.type));
  }

  return inputData;
}
