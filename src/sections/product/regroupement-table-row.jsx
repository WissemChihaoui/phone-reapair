import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Box, Fab, ListItemText } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { fCurrency } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';

import RegroupementDialogTable from './regroupement-dialog-table';

// ----------------------------------------------------------------------

export function RegroupementTableRow({ row, selected, onEditRow, onSelectRow, onDeleteRow }) {
  const confirm = useBoolean();

  const popover = usePopover();

  const router = useRouter();

  const show = useBoolean();

  return (
    <>
      <TableRow hover selected={selected} aria-checked={selected} tabIndex={-1}>
        <TableCell>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Tooltip title="Modifier" placement="top" arrow>
              <Fab size="small" color="warning" onClick={() => router.push(paths.dashboard.stock.editRegroupement(row.id))}>
                <Iconify icon="solar:pen-bold" />
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
          <ListItemText
            disableTypography
            primary={
              <Link
                noWrap
                color="inherit"
                variant="subtitle2"
                // onClick={onViewRow}
                sx={{ cursor: 'pointer' }}
              >
                {row.name}
              </Link>
            }
            secondary={
              <Box component="div" sx={{ typography: 'body2', color: 'text.disabled' }}>
                {row.description}
              </Box>
            }
            sx={{ display: 'flex', flexDirection: 'column' }}
          />
        </TableCell>

        <TableCell sx={{ whiteSpace: 'nowrap' }}>{fCurrency(300)}</TableCell>

        <TableCell>
          <Button onClick={show.onTrue} color="primary" variant="contained">
            {row.products.length}
          </Button>
        </TableCell>
      </TableRow>

      <RegroupementDialogTable open={show.value} onClose={show.onFalse} TableData={row.products} />
      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Supprimer"
        content="Êtes-vous sûr de vouloir effacer ?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Supprimer
          </Button>
        }
      />
    </>
  );
}
