import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import MenuList from '@mui/material/MenuList';
import Collapse from '@mui/material/Collapse';
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
import { Dialog, DialogActions, DialogContent, DialogTitle, Fab, TextField, Tooltip, Typography } from '@mui/material';
import { useSetState } from 'src/hooks/use-set-state';

// ----------------------------------------------------------------------

export function ProductCategoriesRow({ rowParent, selected, onViewRow, onSelectRow, onDeleteRow }) {
  const confirm = useBoolean();
  const confirm2 = useBoolean();
  const row = useSetState(rowParent)
  const itemSelected = useSetState({});
  const editDialog = useBoolean()
  const editDialog2 = useBoolean()

  const collapse = useBoolean();

  const popover = usePopover();

  console.log(row.state);

  const calculateTotalCountForRow = () => row.state.items.reduce((sum, item) => sum + item.count, 0);

  const totalCount = calculateTotalCountForRow(row.state);

  const handleDeleteRow= (item) => {
    itemSelected.setState(item)
    confirm2.onTrue();
  }
  const handleEditRow= (item) => {
    itemSelected.setState(item)
    editDialog2.onTrue();
    console.log(itemSelected);
    
  }

  const handleDeleteItem = () => {
    // row.setState((prev) => ({
    //     ...prev,
    //     items: prev.items.filter((item)=> item.id !== itemSelected.id)
    // }))
    // Remove the item from the row's items
    // const updatedRow = {
    //   ...row,
    //   items: row.items.filter((item) => item.id !== itemSelected),
    // };
    // console.log(itemSelected);
    // const updatedRow = {...row.state, items: row.state.items.filter((item)=> item.id !== itemSelected.id)}
    // console.log('UPDATED ROW',updatedRow);
    
    // row.setState()
    // confirm2.onFalse()
    // Update the state or data source with the updated row
    // setRow(updatedRow);
  };
  const renderPrimary = (
    <TableRow hover selected={selected}>
      
      <TableCell align="right" sx={{ px: 1, whiteSpace: 'nowrap' }}>
       

        <Stack direction="row" alignItems="center" spacing={1}>
          <Tooltip title="Modifier" placement="top" arrow>
            <Fab size="small" color="warning" onClick={()=>handleEditRow(row.id)}>
              <Iconify icon="solar:pen-bold" />
            </Fab>
          </Tooltip>
          <Tooltip title="Supprimer" placement="top" arrow>
            <Fab color="error" size="small" onClick={confirm.onTrue}>
              <Iconify icon="solar:trash-bin-trash-bold" />
            </Fab>
          </Tooltip>
        </Stack>
      </TableCell>
      <TableCell>
        <Link color="inherit" onClick={onViewRow} underline="always" sx={{ cursor: 'pointer' }}>
          {row.state.name}
        </Link>
      </TableCell>

      <TableCell>
        <ListItemText
          primary={fDate(row.state.createdAt)}
          secondary={fTime(row.state.createdAt)}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>

      <TableCell align="center">   <IconButton
          color='inherit'
          onClick={collapse.onToggle}
          sx={{ ...(collapse.value && { bgcolor: 'action.hover' }) }}
        >
          <Typography variant='body2'>{row.state.items.length}</Typography>
          <Iconify icon={collapse.value ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'} />
        </IconButton></TableCell>

      <TableCell>{totalCount}</TableCell>

      
    </TableRow>
  );

  const renderSecondary = (
    <TableRow>
      <TableCell sx={{ p: 0, border: 'none' }} colSpan={8}>
        <Collapse
          in={collapse.value}
          timeout="auto"
          unmountOnExit
          sx={{ bgcolor: 'background.neutral' }}
        >
          <Paper sx={{ m: 1.5 }}>
            {row.state.items.map((item) => (
              <Stack
                key={item.id}
                direction="row"
                alignItems="center"
                sx={{
                  p: (theme) => theme.spacing(1.5, 2, 1.5, 1.5),
                  '&:not(:last-of-type)': {
                    borderBottom: (theme) => `solid 2px ${theme.vars.palette.background.neutral}`,
                  },
                }}
              >
                <ListItemText
                  primary={item.name}
                  secondary={item.sku}
                  primaryTypographyProps={{ typography: 'body2' }}
                  secondaryTypographyProps={{
                    component: 'span',
                    color: 'text.disabled',
                    mt: 0.5,
                  }}
                />
  
                <div>{item.count} Articles</div>
                <Stack direction="row" alignItems="center" spacing={1} marginLeft={5}>
                  <Tooltip title="Modifier" placement="top" arrow>
                    <Fab
                      size="small"
                      color="warning"
                      onClick={() => handleEditRow(item)}
                    >
                      <Iconify icon="solar:pen-bold" />
                    </Fab>
                  </Tooltip>
                  <Tooltip title="Supprimer" placement="top" arrow>
                    <Fab
                      color="error"
                      size="small"
                      onClick={() => handleDeleteRow(item)}
                    >
                      <Iconify icon="solar:trash-bin-trash-bold" />
                    </Fab>
                  </Tooltip>
                </Stack>
              </Stack>
            ))}
          </Paper>
        </Collapse>
      </TableCell>
    </TableRow>
  );
  

  return (
    <>
      {renderPrimary}

      {renderSecondary}

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              confirm.onTrue();
              popover.onClose();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Supprimer
          </MenuItem>

          <MenuItem
            onClick={() => {
                editDialog.onTrue();
              popover.onClose();
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Modifier
          </MenuItem>
        </MenuList>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Supprimer Catégorie"
        content="Êtes-vous sûr de vouloir effacer ?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Supprimer
          </Button>
        }
      />
      <ConfirmDialog
        open={confirm2.value}
        onClose={confirm2.onFalse}
        title="Supprimer Sous Catégorie"
        content="Êtes-vous sûr de vouloir supprimer sous catégorie ?"
        action={
          <Button variant="contained" color="error" onClick={handleDeleteItem}>
            Supprimer
          </Button>
        }
      />

    <Dialog open={editDialog.value} onClose={editDialog.onFalse}>
        <DialogTitle>Modifier Catégorie</DialogTitle>

        <DialogContent>
          <Typography sx={{ mb: 3 }}>
            Modifier votre catégorie
          </Typography>

          <TextField
          sx={{minWidth:'500px'}}
            autoFocus
            fullWidth
            type="text"
            variant="outlined"
            label="Nom du catégorie"
            value={row.state.name}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={editDialog.onFalse} variant="outlined" color="inherit">
            Annuler
          </Button>
          <Button onClick={editDialog.onFalse} variant="contained">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    <Dialog open={editDialog2.value} onClose={editDialog2.onFalse}>
        <DialogTitle>Modifier Sous Catégorie</DialogTitle>

        <DialogContent>
          <TextField
          sx={{minWidth:'500px'}}
            autoFocus
            fullWidth
            type="text"
            variant="outlined"
            margin="dense"
            label="Nom du catégorie"
            value={itemSelected.state.name}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={editDialog2.onFalse} variant="outlined" color="inherit">
            Annuler
          </Button>
          <Button onClick={editDialog2.onFalse} variant="contained">
            Enregistrer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
