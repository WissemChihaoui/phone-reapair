import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableBody from '@mui/material/TableBody';
import { Input, InputLabel, MenuItem, Stack } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';
import { useSetState } from 'src/hooks/use-set-state';

import { DashboardContent } from 'src/layouts/dashboard';
import { _clientList, _clientTypes, USER_STATUS_OPTIONS } from 'src/_mock';

import { toast } from 'src/components/snackbar';
import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
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

import { UserTableRow } from '../user-table-row';
import { UserTableToolbar } from '../user-table-toolbar';
import { UserTableFiltersResult } from '../user-table-filters-result';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [{ value: 'all', label: 'All' }, ...USER_STATUS_OPTIONS];

const TABLE_HEAD = [
  { id: '', width: 120 },
  { id: 'name', label: 'Nom' },
  { id: 'company', label: 'Société', width: 220 },
  { id: 'type', label: 'Type du client', width: 220 },
  { id: 'phoneNumber', label: 'Téléphone', width: 180 },
  { id: 'role', label: 'Adresse', width: 180 },
];

// ----------------------------------------------------------------------

export function UserListView() {
  const table = useTable({ defaultDense: true });

  const popover = usePopover();

  const router = useRouter();

  const confirm = useBoolean();

  const [tableData, setTableData] = useState(_clientList);

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

  const handleDownloadFormat = () => {
    const link = document.createElement('a');
    link.href = '/assets/files/format_client.csv';
    link.setAttribute('download', 'format_client.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    popover.onClose();
  };

  const handleTriggerFileInput = () => {
    const fileInput = document.getElementById('csv-upload-input');
    if (fileInput) {
      fileInput.value = ''; // reset in case same file selected again
      fileInput.click();
    }
    popover.onClose();
  };

  // const handleFileUpload = (event) => {
  //   const file = event.target.files?.[0];
  //   console.log(file)
  //   if (!file) return;

  //   const fileName = file.name.toLowerCase();
  //   const isCSV = fileName.endsWith('.csv');

  //   if (!isCSV) {
  //     toast.error('Veuillez sélectionner un fichier CSV valide.');
  //     return;
  //   }

  //   // Optional: parse or send to backend
  //   toast.success(`Fichier "${file.name}" importé avec succès.`);

  //   // Example: Just reading content
  //   const reader = new FileReader();
  //   reader.onload = (e) => {
  //     const text = e.target.result;
  //     console.log('Contenu du fichier CSV :', text);
  //     // You can parse the CSV here using PapaParse or manual parsing
  //   };
  //   reader.readAsText(file);
  // };

  const handleCsvImport = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'text/csv') {
      toast.success(`Fichier CSV "${file.name}" prêt à être importé.`);
    } else {
      toast.error('Veuillez sélectionner un fichier CSV valide.');
    }
  };
  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Liste des clients"
          links={[
            { name: 'Tableau de bord', href: paths.dashboard.root },
            { name: 'Clients' },
            { name: 'Liste' },
          ]}
          action={
            <Stack direction="row" spacing={2} alignItems="center">
              <Button
                onClick={popover.onOpen}
                variant="outlined"
                startIcon={<Iconify icon="material-symbols:upload-rounded" />}
              >
                Importer
              </Button>
              <Button
                component={RouterLink}
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                href={paths.dashboard.client.add}
              >
                Ajouter Client
              </Button>

              <CustomPopover
                open={popover.open}
                onClose={popover.onClose}
                anchorEl={popover.anchorEl}
              >
                <Box sx={{ p: 1 }}>
                  <MenuItem onClick={handleDownloadFormat}>Format</MenuItem>

                  <MenuItem>
                    <InputLabel htmlFor="csv-import" style={{ cursor: 'pointer', width: '100%' }}>
                      Importer le fichier CSV
                    </InputLabel>
                    <Input
                      id="csv-import"
                      type="file"
                      inputProps={{ accept: '.csv' }}
                      sx={{ display: 'none' }}
                      onChange={handleCsvImport}
                    />
                  </MenuItem>
                </Box>
              </CustomPopover>
            </Stack>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Card>
          <UserTableToolbar
            filters={filters}
            onResetPage={table.onResetPage}
            options={{ roles: _clientTypes }}
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
                      <UserTableRow
                        key={row.id}
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
