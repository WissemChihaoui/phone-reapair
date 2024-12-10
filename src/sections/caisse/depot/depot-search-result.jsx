import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Scrollbar } from 'src/components/scrollbar'
import { emptyRows, TableEmptyRows, TableHeadCustom, TablePaginationCustom, useTable } from 'src/components/table'
import { fCurrency } from 'src/utils/format-number'
import { fDate, today } from 'src/utils/format-time'


const TABLE_DATA = [
    {
        id: 0,
        facture: 'F2022-0527',
        amount: 50,
        date: today(),
    },
    {
        id: 1,
        facture: 'F2022-0527',
        amount: 50,
        date: today(),
    },
    {
        id: 2,
        facture: 'F2022-0527',
        amount: 50,
        date: today(),
    },
    {
        id: 3,
        facture: 'F2022-0527',
        amount: 50,
        date: today(),
    },
    {
        id: 4,
        facture: 'F2022-0527',
        amount: 50,
        date: today(),
    },
    {
        id: 5,
        facture: 'F2022-0527',
        amount: 50,
        date: today(),
    },
]

const TABLE_HEAD = [
    { id: 'facture', label: 'Facture'},
    { id: 'amount', label: 'Montant'},
    { id: 'date', label: 'Date'},
]

export default function DepotSearchResult({query, open, onClose}) {

    const table = useTable({ defaultOrderBy: 'calories' });
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        setTableData(TABLE_DATA);
      }, []);
  return (
    <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth='md'
    >
        <DialogTitle>Liste de paiement</DialogTitle>
        <DialogContent>
            <Scrollbar>
                <Table>
                    <TableHeadCustom
                        headLabel={TABLE_HEAD}
                        rowCount={tableData.length}
                        numSelected={table.selected.length}
                        onSort={table.onSort}
                        onSelectAllRows={(checked) =>
                            table.onSelectAllRows(
                            checked,
                            tableData.map((row) => row.id)
                        )
                        }
                    />
                    <TableBody>
                        {TABLE_DATA
                        .slice(
                            table.page * table.rowsPerPage,
                            table.page * table.rowsPerPage + table.rowsPerPage
                          )
                        .map((row) => (
                            <SingleRow key={row.id} row={row} table={table}/>
                        ))}
                        <TableEmptyRows
                            height={table.dense ? 34 : 34 + 20}
                            emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                        />
                    </TableBody>
                </Table>
            </Scrollbar>
            <TablePaginationCustom
        page={table.page}
        dense={table.dense}
        count={tableData.length}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onChangeDense={table.onChangeDense}
        onRowsPerPageChange={table.onChangeRowsPerPage}
      />
        </DialogContent>
        <DialogActions>
            <Button size='large' variant='outlined' onClick={()=>onClose()}>Annuler</Button>
            <Button size='large' variant='contained' color='primary'>Valider</Button>
        </DialogActions>
    </Dialog>
  )
}

function SingleRow({ row, table }) {
    return(
        <>
            <TableRow 
                hover
                onClick={() => table.onSelectRow(row.id)}
                selected={table.selected.includes(row.id)}
            >
                <TableCell padding="checkbox">
                    <Checkbox checked={table.selected.includes(row.id)} />
                </TableCell>
                <TableCell>
                    {row.facture}
                </TableCell>
                <TableCell>
                    {fCurrency(row.amount)}
                </TableCell>
                <TableCell>
                    {fDate(row.date)}
                </TableCell>
            </TableRow>
        </>
    )
}
