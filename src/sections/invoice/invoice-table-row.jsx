import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { useBoolean } from 'src/hooks/use-boolean';

import { fCurrency } from 'src/utils/format-number';
import { fDate, fTime } from 'src/utils/format-time';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { Autocomplete, Box, Dialog, DialogActions, DialogContent, DialogTitle, Fab, InputAdornment, OutlinedInput, Select, TextField, Tooltip } from '@mui/material';
import { Field } from 'src/components/hook-form';
import { Scrollbar } from 'src/components/scrollbar';

// ----------------------------------------------------------------------

export function InvoiceTableRow({ row, selected, onSelectRow, onViewRow, onEditRow, onDeleteRow }) {
  const open = useBoolean();
  const router = useRouter();

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
                {row.status !== "Avoir" && 
                  <Tooltip title="Avoir" placement="top" arrow>
                    <Fab size="small" color="success" onClick={()=>open.onTrue()}>
                        <Iconify icon="solar:wad-of-money-bold" />
                    </Fab>
                  </Tooltip>
                }
            </Stack>
        </TableCell>

        <TableCell>
          #{row.id}
        </TableCell>

        <TableCell>
          <Stack spacing={2} direction="row" alignItems="center">
            <Avatar alt={row.client.name}>{row.client.name.charAt(0).toUpperCase()}</Avatar>

            <ListItemText
              disableTypography
              primary={
                <Typography variant="body2" noWrap>
                  {row.client.name}
                </Typography>
              }
              secondary={
                <Link
                  noWrap
                  variant="body2"
                  onClick={onViewRow}
                  sx={{ color: 'text.disabled', cursor: 'pointer' }}
                >
                  {row.commande_id}
                </Link>
              }
            />
          </Stack>
        </TableCell>

        <TableCell>
          <ListItemText
            primary={fDate(row.date)}
            secondary={fTime(row.date)}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{ mt: 0.5, component: 'span', typography: 'caption' }}
          />
        </TableCell>

        <TableCell>{fCurrency(row.amount)}</TableCell>

        <TableCell align="center">{row.product[0].name}</TableCell>

        <TableCell>
          <Label
            variant="soft"
            color={
              (row.status === 'Payé' && 'success') ||
              (row.status === 'Accomptes' && 'warning') ||
              (row.status === 'Avoir' && 'error') ||
              'default'
            }
          >
            {row.status}
          </Label>
        </TableCell>

      </TableRow>

      <Dialog maxWidth="sm" fullWidth open={open.value} onClose={open.onFalse}>
        
          <DialogTitle>Avoir #{row.id}</DialogTitle>
          <Scrollbar sx={{ p: 3, bgcolor: 'background.neutral' }}>
            <Stack spacing={3}>
              <Typography variant='h6'>{row.client.name}</Typography>
              <Autocomplete
                fullWidth
                options={row.product}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => <TextField {...params} label="Produit" margin="none" />}
              />
              <TextField 
                label='Total Facture' 
                value={row.amount} 
                disabled 
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <Box component="span" sx={{ color: 'text.disabled' }}>
                        €
                      </Box>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField 
                label='Total Payé' 
                value={row.amount} 
                disabled 
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <Box component="span" sx={{ color: 'text.disabled' }}>
                        €
                      </Box>
                    </InputAdornment>
                  ),
                }}
              />
              <TextField 
                label='Montant' 
                value={row.amount}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <Box component="span" sx={{ color: 'text.disabled' }}>
                        €
                      </Box>
                    </InputAdornment>
                  ),
                }}
              />
              <Autocomplete
                fullWidth
                options={['Virement', 'Espece']}
                getOptionLabel={(option) => option}
                renderInput={(params) => <TextField {...params} label="Type de paiement" margin="none" />}
              />

        <TextField
          rows={4}
          fullWidth
          multiline
          label="Notation interne"
        
        />
            </Stack>
          </Scrollbar>
          <DialogActions>
            <Button variant='outlined' onClick={()=> open.onFalse()}>Annuler</Button>
            <Button variant='contained' color='primary'>Valider</Button>
          </DialogActions>
        
      </Dialog>
    </>
  );
}
