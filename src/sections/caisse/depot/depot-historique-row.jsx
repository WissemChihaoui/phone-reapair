import { TableCell, TableRow, TextField } from '@mui/material'
import React, { useState } from 'react'
import { Label } from 'src/components/label'
import { fCurrency } from 'src/utils/format-number'
import { fDate } from 'src/utils/format-time'

export function DepotHistoriqueRow({row}) {
    const [bankValue, setBankValue] = useState(row.bank);
  return (
    <>
        <TableRow hover>
            <TableCell>
                {fDate(row.date)}
            </TableCell>
            <TableCell>
                {fCurrency(row.amount)}
            </TableCell>
            <TableCell>
                <Label>
                    {row.type ==='depot_bancaire' ? 'Dépot Bancaire' : "Dépot Éspece" }
                </Label>
            </TableCell>
            <TableCell>
            <TextField
            value={bankValue}
            onChange={(e) => setBankValue(e.target.value)}
            variant="outlined"
            size="small"
            sx={{ width: 1 }}
          />    
            </TableCell>
        </TableRow>
    </>
  )
}
