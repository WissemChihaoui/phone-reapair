import { Box, Button, Card, IconButton, Table, TableBody, Tooltip } from '@mui/material'
import React, { useCallback, useState } from 'react'
import { _userList } from 'src/_mock'
import { Iconify } from 'src/components/iconify'
import { Scrollbar } from 'src/components/scrollbar'
import { emptyRows, getComparator, rowInPage, TableEmptyRows, TableHeadCustom, TableNoData, TablePaginationCustom, TableSelectedAction, useTable } from 'src/components/table'
import { useBoolean } from 'src/hooks/use-boolean'
import { useSetState } from 'src/hooks/use-set-state'
import { ConfirmDialog } from 'src/components/custom-dialog'
import { toast } from 'sonner'
import { PartenairTableToolbar } from './partenair-table-toolbar'
import { PartenaireTableFiltersResult } from './partenair-table-filters-result'
import { PartenaireExterneTableRow } from './partenair-extern-row'

const TABLE_HEAD=[
    {id:'', width: 88},
    { id: 'name', label: 'Nom' },
    { id: 'phoneNumber', label: 'Téléphone', width: 180 },
    { id: 'address', label: 'Adresse' },
]

export default function PartenaireExternList() {
    const table = useTable();
      const confirm = useBoolean();
    

const [tableData, setTableData] = useState(_userList);
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
    
          toast.success('Suppression effectué !');
    
          setTableData(deleteRow);
    
          table.onUpdatePageDeleteRow(dataInPage.length);
        },
        [dataInPage.length, table, tableData]
      );


      const handleDeleteRows = useCallback(() => {
        const deleteRows = tableData.filter((row) => !table.selected.includes(row.id));
    
        toast.success('Suppression effectué !');
    
        setTableData(deleteRows);
    
        table.onUpdatePageDeleteRows({
          totalRowsInPage: dataInPage.length,
          totalRowsFiltered: dataFiltered.length,
        });
      }, [dataFiltered.length, dataInPage.length, table, tableData]);
    
    return (
    <>
    <Card>
          <PartenairTableToolbar
            filters={filters}
            onResetPage={table.onResetPage}
            options={{ roles: [] }}
          />

          {canReset && (
            <PartenaireTableFiltersResult
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
              <Table size='medium' sx={{ minWidth: 960 }}>
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
                      <PartenaireExterneTableRow
                        key={row.id}
                        row={row}
                        selected={table.selected.includes(row.id)}
                        onSelectRow={() => table.onSelectRow(row.id)}
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

        <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Suppression"
        content={
          <>
            Êtes-vous sûr de vouloir supprimer <strong> {table.selected.length} </strong> employées?
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
  )
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
  