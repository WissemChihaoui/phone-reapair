import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { useBoolean } from 'src/hooks/use-boolean';

import { fCurrency } from 'src/utils/format-number';
import { fDate, fTime } from 'src/utils/format-time';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
import { Fab, Stack, Tooltip, Typography } from '@mui/material';
import { Path } from '@react-pdf/renderer';
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

// ----------------------------------------------------------------------

export function ReparationTableRow({ row, selected, onViewRow, onSelectRow, onDeleteRow }) {
  const confirm = useBoolean();

  const popover = usePopover();

  const router = useRouter();

  const display = () => {
    router.replace(paths.dashboard.reparations.display(row.id))
  }

  const renderPrimary = (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox
          checked={selected}
          onClick={onSelectRow}
          inputProps={{ id: `row-checkbox-${row.id}`, 'aria-label': `Row checkbox` }}
        />
      </TableCell>

      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <Stack spacing={1} display="flex" flexDirection="row">
          <Tooltip title="Modifier" placement="top" arrow>
            <Fab size="small" color="warning">
              <Iconify icon="solar:pen-bold" />
            </Fab>
          </Tooltip>
          <Tooltip title="Voir" placement="top" arrow>
            <Fab onClick={()=> display()} size="small" color="info">
              <Iconify icon="solar:eye-bold" />
            </Fab>
          </Tooltip>
          <Tooltip title="Supprimer" placement="top" arrow>
            <Fab
              color="error"
              size="small"
              onClick={() => {
                confirm.onTrue();
                popover.onClose();
              }}
            >
              <Iconify icon="solar:trash-bin-trash-bold" />
            </Fab>
          </Tooltip>
        </Stack>
      </TableCell>

      <TableCell>
        <Link color="inherit" onClick={onViewRow} underline="always" sx={{ cursor: 'pointer' }}>
          <Label>{row.orderNumber}</Label>
        </Link>
      </TableCell>

      <TableCell>
        <Typography variant="Subtitle1">{row.name}</Typography>
      </TableCell>
      <TableCell>{row.rep}</TableCell>
      <TableCell>{row.piece}</TableCell>
      <TableCell>{row.client}</TableCell>
      <TableCell>{row.product}</TableCell>
      {row.fournisseur && <TableCell>{row.fournisseur}</TableCell>}

      <TableCell>
        <ListItemText
          primary={fDate(row.createdAt)}
          secondary={fTime(row.createdAt)}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>

      <TableCell> {fCurrency(row.totalAmount)} </TableCell>

      <TableCell>
        <Label
          variant="soft"
          color={
            (row.status === 'completed' && 'success') ||
            (row.status === 'pending' && 'warning') ||
            (row.status === 'cancelled' && 'error') ||
            'default'
          }
        >
          {row.status}
        </Label>
      </TableCell>
    </TableRow>
  );

  return (
    <>
      {renderPrimary}

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Supprimer"
        content={`Êtes-vous sûr de vouloir supprimer ${row.orderNumber} ?`}
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Supprimer
          </Button>
        }
      />
    </>
  );
}
