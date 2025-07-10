import { z as zod } from 'zod';
import { toast } from 'sonner';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoadingButton } from '@mui/lab';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Stack, Button, Dialog, MenuItem, DialogTitle, DialogActions, DialogContent } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

export default function ServiceForm({ index: formIndex, formId, onRemove }) {
  const open = useBoolean()
  return (
    <>
    <Stack spacing={2}>
      {/* <Typography variant="subtitle1">Service</Typography> */}

      <Grid container spacing={2} key={formId}>
        <Grid xs={12} md={8}>
          <Stack spacing={1.5} direction="row">
            <Field.Text
              size="small"
              name={`products[${formIndex}].oeuvre[${formId}].nom`}
              label="Service"
            />
            <Button variant="contained" onClick={()=>open.onTrue()}>+</Button>
          </Stack>
        </Grid>
        <Grid xs={12} md={4}>
          <Field.Text
            size="small"
            name={`products[${formIndex}].oeuvre[${formId}].price`}
            label="Prix"
            type="number"
          />
        </Grid>
        <Grid xs={12} md={8}>
          <Field.Text
            size="small"
            name={`products[${formIndex}].oeuvre[${formId}].champ`}
            label="Champ libre"
          />
        </Grid>

        <Grid xs={12} md={4}>
          <Button
            variant="outlined"
            color="error"
            onClick={() => onRemove(formId)}
            startIcon={<Iconify icon="mdi:delete" />}
          >
            Supprimer
          </Button>
        </Grid>
      </Grid>
    </Stack>
    <AddServiceDialog open={open.value} onClose={open.onTrue} />
    </>
  );
}

const AddServiceSchema = zod.object({
  title: zod.string().min(1, 'Le titre est requis'),
  refInterne: zod.string().optional(),
  ean: zod.string().optional(),
  tva: zod.string().min(1, 'TVA est requise'),
  priceVenteTtc: zod.coerce.number({ invalid_type_error: 'Doit être un nombre' }),
  priceVenteHt: zod.coerce.number({ invalid_type_error: 'Doit être un nombre' }),
  valeurTva: zod.coerce.number({ invalid_type_error: 'Doit être un nombre' }),
});

function AddServiceDialog({ open, onClose }) {
  const defaultValues = useMemo(
    () => ({
      title: "",
      refInterne :"",
      ean :"",
      tva :"1",
      priceVenteTtc :"",
      priceVenteHt :"",
      valeurTva :"",
    }),
    []
  );
  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(AddServiceSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = handleSubmit(async (data) => {
    const promise = new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      reset();
      onClose();

      toast.promise(promise, {
        loading: 'Chargement...',
        success: 'Ajout avec succées!',
        error: 'Erreur lors ajouter!',
      });

      await promise;

      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <Dialog fullWidth PaperProps={{ sx: { maxWidth: 720 } }} open={open} onClose={onClose}>
      <Form methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Ajouter Service</DialogTitle>
        <DialogContent>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
          >
            <Stack spacing={2} py={2}>
              <Field.Text label="Libellé" name="title" />
              
              <Field.Text label="Réf Interne" name="refInterne" />
              <Field.Text label="EAN - Code Barre" name="ean" />
              <Field.Select name="tva" label="TVA">
                
  <MenuItem value="1">20.00</MenuItem>
  <MenuItem value="2">10.00</MenuItem>
  <MenuItem value="3">5.00</MenuItem>
  <MenuItem value="4">2.00</MenuItem>
  <MenuItem value="5">8.50</MenuItem>
  <MenuItem value="6">TVA non applicable</MenuItem>
  <MenuItem value="9">TVA sur marge</MenuItem>
  <MenuItem value="10">16.00</MenuItem>
  <MenuItem value="11">21.00</MenuItem>
  <MenuItem value="12">7.70</MenuItem>
  <MenuItem value="13">7.0</MenuItem>
  <MenuItem value="14">5.50</MenuItem>
              </Field.Select>
            </Stack>
            <Stack spacing={2} py={2}>
              <Field.Text label="Prix Vente TTC" name="priceVenteTtc" />
              <Field.Text label="Prix Vente HT" name="priceVenteHt" />
              <Field.Text label="Valeur du TVA" name="valeurTva" />
            </Stack>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Annuler
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Ajouter
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
