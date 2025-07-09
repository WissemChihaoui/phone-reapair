import { z as zod } from 'zod';

import React, { useMemo } from 'react';
import { useFieldArray, useForm, useFormContext } from 'react-hook-form';

import Grid from '@mui/material/Unstable_Grid2';
import {
  Stack,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  MenuItem,
  DialogActions,
} from '@mui/material';

import { Field, Form } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import { useBoolean } from 'src/hooks/use-boolean';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { LoadingButton } from '@mui/lab';

export default function PieceForm({ index: formIndex, formId, onRemove }) {
  const { control } = useFormContext();

  const open = useBoolean();

  return (
    <>
      <Stack spacing={2}>
        <Typography variant="subtitle1">Piéce à changer</Typography>

        <Grid container spacing={2}>
          <Grid xs={12} md={4}>
            <Stack spacing={1.5} direction="row">
              <Field.Text
                size="small"
                name={`products[${formIndex}].piece[${formIndex}].nom`}
                label="Pièce à changer / Article:"
              />
              <Button variant="contained" onClick={() => open.onTrue()}>
                +
              </Button>
            </Stack>
          </Grid>
          <Grid xs={12} md={4}>
            <Field.Text
              size="small"
              name={`products[${formIndex}].piece[${formIndex}].qte`}
              label="Quantité"
              type="number"
            />
          </Grid>
          <Grid xs={12} md={4}>
            <Field.Text
              size="small"
              name={`products[${formIndex}].piece[${formIndex}].price`}
              label="Prix"
              type="number"
            />
          </Grid>
          <Grid xs={12} md={6}>
            <Field.Text
              size="small"
              name={`products[${formIndex}].piece[${formIndex}].champ`}
              label="Champ libre"
            />
          </Grid>
          <Grid xs={12} md={4}>
            <Field.Text
              size="small"
              name={`products[${formIndex}].piece[${formIndex}].remise`}
              label="Remise en euro TTC"
              type="number"
            />
          </Grid>
          <Grid xs={12} md={2}>
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
      <AddArticleDialog open={open.value} onClose={open.onFalse} />
    </>
  );
}

export const AddArticleSchema = zod.object({
  title: zod.string().min(1, 'Le titre est requis'),
  category: zod.string().min(1, 'La catégorie est requise'),
  sousCategory: zod.string().min(1, 'La sous-catégorie est requise'),
  fournisseur: zod.string().min(1, 'Le fournisseur est requis'),
  refInterne: zod.string().optional(),
  refFournisseur: zod.string().optional(),
  ean: zod.string().optional(),
  tva: zod.string().min(1, 'TVA est requise'),
  priceHtTtc: zod.coerce.number({ invalid_type_error: 'Doit être un nombre' }),
  priceVenteTtc: zod.coerce.number({ invalid_type_error: 'Doit être un nombre' }),
  priceVenteHt: zod.coerce.number({ invalid_type_error: 'Doit être un nombre' }),
  valeurTva: zod.coerce.number({ invalid_type_error: 'Doit être un nombre' }),
  margeNet: zod.coerce.number({ invalid_type_error: 'Doit être un nombre' }),
  qte: zod.coerce.number({ invalid_type_error: 'Doit être un nombre' }),
  date: zod.coerce.date({ invalid_type_error: 'Date invalide' }),
  facture: zod.string().optional(),
});

function AddArticleDialog({ open, onClose }) {
  const defaultValues = useMemo(
    () => ({
      title: "",
      category: "",
      sousCategory :"",
      fournisseur :"",
      refInterne :"",
      refFournisseur :"",
      ean :"",
      tva :"1",
      priceHtTtc :"",
      priceVenteTtc :"",
      priceVenteHt :"",
      valeurTva :"",
      margeNet :"",
      qte :"",
      date :"",
      facture :"",
    }),
    []
  );
  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(AddArticleSchema),
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
        loading: 'Loading...',
        success: 'Update success!',
        error: 'Update error!',
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
        <DialogTitle>Ajouter Article</DialogTitle>
        <DialogContent>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
          >
            <Stack spacing={2} py={2}>
              <Field.Text label="Libellé" name="title" />
              <Field.Select name="category" label="Catégorie">
                <MenuItem value="1">Catégorie 1</MenuItem>
              </Field.Select>
              <Field.Select name="sousCategory" label="Sous Catégorie">
                <MenuItem value="1">Sous Catégorie 1</MenuItem>
              </Field.Select>
              <Field.Select name="fournisseur" label="Fournisseur">
                <MenuItem value="1">Fournisseur 1</MenuItem>
              </Field.Select>
              <Field.Text label="Réf Interne" name="refInterne" />
              <Field.Text label="Réf Fournisseur" name="refFournisseur" />
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
              <Field.Text label="Prix Achat HT" name="priceHtTtc" />
              <Field.Text label="Prix Vente TTC" name="priceVenteTtc" />
              <Field.Text label="Prix Vente HT" name="priceVenteHt" />
              <Field.Text label="Valeur du TVA" name="valeurTva" />
              <Field.Text label="Marge Net" name="margeNet" />
              <Field.Text label="Quantité" name="qte" />
              <Field.DatePicker label="Date d'achat" name="date" />
              <Field.Text label="N° facture" name="facture" />
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
