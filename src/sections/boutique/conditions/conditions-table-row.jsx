import { Button, Fab, TableCell, TableRow, Tooltip, Typography } from '@mui/material'
import React from 'react'
import { Iconify } from 'src/components/iconify'
import { useBoolean } from 'src/hooks/use-boolean'
import ConditionsEditAdd from './conditions-edit-add'

export default function ConditionsTableRow({row, updateConditionMessage}) {
    const addEditModal = useBoolean()
  return (
    <>
    <TableRow>
        <TableCell>
        <Tooltip title="Modifier" placement="top" arrow>
            <Fab size="small" color="warning" onClick={() => addEditModal.onTrue()}>
            <Iconify icon="solar:pen-bold" />
            </Fab>
        </Tooltip>
        </TableCell>
        <TableCell>
        <Typography variant="h6">{row.name}</Typography>
        </TableCell>
        <TableCell>{row.message}

       
        </TableCell>
    </TableRow>
    <ConditionsEditAdd open={addEditModal.value} onClose={addEditModal.onFalse} currentCondition={row} updateConditionMessage={updateConditionMessage}/>
    </>
  )
}
