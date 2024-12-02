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
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fab,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Field, Form } from 'src/components/hook-form';
import { LoadingButton } from '@mui/lab';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { name } from 'dayjs/locale/en';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = {
  pending: { label: 'En Cours' },
  cancelled: { label: 'Incomplete' },
  completed: { label: 'Réçu' },
};

export function VenteTableRow({ row, selected, onViewRow, onSelectRow, onDeleteRow }) {
  
 
  const defaultValues = useMemo (
    () => ({
      name:"",
      sellPriceHt:0,
      imei:null,
      multiple:false,
      quantity: 0
    }),
    []
  )

  const methods = useForm({
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const confirm = useBoolean();

  const collapse = useBoolean();

  const valid = useBoolean();

  const router = useRouter();

  const openValid = (item) => {
    console.log(item);
  
    // Reset the form with the new values
    reset({
      name: item.name,
      quantity: item.quantity,
      sellPriceHt: item.price,
      imei: null,
      multiple: false,
    });
  
    valid.onTrue(); // Open the validation dialog
  };
  

  const onSubmit = (e) => {
    e.preventDefault();   
  }

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.stock.editCommande(id));
    },
    [router]
  );

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
          {row.orderNumber}
        </Link>
      </TableCell>
      <TableCell>
        <Link color="inherit" onClick={onViewRow} underline="always" sx={{ cursor: 'pointer' }}>
          {row.orderNumber}
        </Link>
      </TableCell>

      <TableCell>
        <Stack spacing={2} direction="row" alignItems="center">
          <Avatar alt={row.customer.name} src={row.customer.avatarUrl} />

          <Stack
            sx={{
              typography: 'body2',
              flex: '1 1 auto',
              alignItems: 'flex-start',
            }}
          >
            <Box component="span">{row.customer.name}</Box>
            <Box component="span" sx={{ color: 'text.disabled' }}>
              {row.customer.email}
            </Box>
          </Stack>
        </Stack>
      </TableCell>

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

    

      <TableCell> {fCurrency(row.subtotal)} </TableCell>
    </TableRow>
  );


  return (
    <>
      {renderPrimary}

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Supprimer"
        content="Êtes-vous sûr de vouloir supprimer ?"
        action={
          <Button variant="contained" color="error" onClick={onDeleteRow}>
            Supprimer
          </Button>
        }
      />

      <Dialog
        maxWidth={false}
        open={valid.value}
        onClose={valid.onFalse}
      >
        <Box>
          <Form methods={methods} onSubmit={onSubmit}>
            <DialogTitle>Valider l&apos;article {watch('name')}</DialogTitle>
            <DialogContent>
              <Box
                marginTop={3}
                rowGap={3}
                columnGap={2}
                display="grid"
                width="100%"
                gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
              >
                <Field.Text type="number" name="sellPriceHt" label="Prix d'achat"/>
                <Field.Text type="number" name="quantity" label="Quantité"/>
                <Stack direction="row" alignItems="center" spacing={3}>
                  <Field.Switch 
                    name="multiple" 
                    label={null} 
                    sx={{ m: 0 }} 
                  />
                  <Typography variant="body">Multiple ?</Typography>
                </Stack>
                {watch("multiple") ? (
          // Render multiple IMEI fields based on the quantity
          Array.from({ length: watch("quantity") }).map((_, index) => (
            <Field.Text
              key={index}
              name={`imei[${index}]`}  // Dynamically name each IMEI field
              label={`IMEI/N° Série ${index + 1}`}  // Label the IMEI field based on index
            />
          ))
        ) : (
          // Single IMEI field if multiple is false
          <Field.Text name="imei" label="IMEI/N° Série" />
        )}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" onClick={valid.onFalse}>Annuler</Button>

              <LoadingButton type="submit" variant="contained">
                Valider
              </LoadingButton>
            </DialogActions>
          </Form>
        </Box>
      </Dialog>
    </>
  );
}
