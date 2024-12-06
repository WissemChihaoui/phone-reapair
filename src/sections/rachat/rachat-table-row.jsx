import { Box, Button, Dialog, DialogContent, Fab, Link, Slide, Stack, TableCell, TableRow, Tooltip } from '@mui/material'
import React, { forwardRef } from 'react'
import { Iconify } from 'src/components/iconify'
import { Image } from 'src/components/image'
import { Label } from 'src/components/label'
import { useBoolean } from 'src/hooks/use-boolean'
import { useRouter } from 'src/routes/hooks'
import { paths } from 'src/routes/paths'
import { fCurrency } from 'src/utils/format-number'
import { fDate } from 'src/utils/format-time'


const STATUS_OPTIONS = {
    excellent: { label: 'Excellent' },
    bien: { label: 'Bien' },
    moyen: { label: 'Moyen' },
    mauvais: { label: 'Mauvais' },
  };
  const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);
export function RachatTableRow({ row, selected, onViewRow, onSelectRow, onDeleteRow }) {
    const router = useRouter();
    const showCin = useBoolean()
    const showFacture = useBoolean()
    return (
    <>
    <TableRow hover selected={selected}>
        <TableCell align='right' sx={{ px: 1, whiteSpace: 'nowrap' }}>
            <Stack direction="row" alignItems="center" spacing={1}>
                <Tooltip title="Modifier" placement="top" arrow>
                    <Fab size="small" color="warning" onClick={()=>router.push(paths.dashboard.rachat.edit(row.id))}>
                        <Iconify icon="solar:pen-bold" />
                    </Fab>
                </Tooltip>
            </Stack>
        </TableCell>

        <TableCell>
            <Link color="inherit" onClick={onViewRow} underline="none" sx={{ cursor: 'pointer' }}>
                #{row.id}
            </Link>
        </TableCell> 

        <TableCell>
            <Image alt={row.id} src={row.cab} ratio='21/9' sx={{ width: 120 }}/>
        </TableCell>

        <TableCell>
            <Link variant="subtitle1" color="inherit" onClick={onViewRow} underline="none" sx={{ cursor: 'pointer' }}>
                {row.name}
            </Link>
        </TableCell>

        <TableCell>
            <Button variant='text'>
                {row.client}
            </Button>
        </TableCell>

        <TableCell>
            {fDate(row.date)}
        </TableCell>

        <TableCell>
            <Fab size='small' color='primary' variant='outlined' onClick={()=>showCin.onTrue()}>
                <Iconify icon='mdi:eye'/>
            </Fab>
        </TableCell>

        <TableCell>
            <Fab size='small' color='primary' variant='outlined' onClick={()=>showFacture.onTrue()}>
                <Iconify icon='mdi:eye'/>
            </Fab>
        </TableCell>

        <TableCell>
            {fCurrency(row.price)}
        </TableCell>

        <TableCell>
            <Label 
                variant='soft'
                color={
                    (row.status === 'excellent' && 'success') ||
                    (row.status === 'bien' && 'info') ||
                    (row.status === 'moyen' && 'warning') ||
                    (row.status === 'mauvais' && 'error') ||
                    'default'
                }
            >
                {STATUS_OPTIONS[row.status]?.label || 'Unknown'}
            </Label>
        </TableCell>

        <TableCell>
        <Button
            sx={{ px: 1 }}
            size="small"
            color="success"
            variant="outlined"
            startIcon={<Iconify icon="foundation:page-export-pdf" />}
          >
            Imprimer
          </Button>
        </TableCell>
    </TableRow>
    <Dialog
        keepMounted
        open={showCin.value}
        TransitionComponent={Transition}
        onClose={showCin.onFalse}
    >
        <DialogContent>
            <Box p={2}>
                <Image src={row.cin} alt={row.cin}/>
            </Box>
        </DialogContent>
    </Dialog>
    <Dialog
        keepMounted
        open={showFacture.value}
        TransitionComponent={Transition}
        onClose={showFacture.onFalse}
    >
        <DialogContent>
            <Box p={2}>
                <Image src={row.facture} alt={row.facture}/>
            </Box>
        </DialogContent>
    </Dialog>
    </>
  )
}
