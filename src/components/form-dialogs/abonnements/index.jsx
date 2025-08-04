import { z as zod } from 'zod';
import { toast } from 'sonner';
import React, { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Stack,
  Dialog,
  Button,
  MenuItem,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material';

import { Form, Field } from 'src/components/hook-form';

export const AddAbonnementSchema = zod.object({
  name: zod.string().min(1, { message: 'Le nom est requis' }),
  duration: zod.string().min(1, { message: 'Durée est requis' }),
  price: zod.string().min(1, { message: 'Prix est requis' }),
  frequence: zod.string().min(1, { message: 'Fréquence est requis' }),
  conditions: zod.string().min(1, { message: 'Conditions est requis' }),
  description: zod.string().min(1, { message: 'Description est requis' }),
});

export default function AddAbonnementDialog({ open, onClose, currentRow }) {
  const defaultValues = useMemo(
    () => ({
      name: currentRow?.name || '',
      duration: currentRow?.duration || '',
      price: currentRow?.price || '',
      marge: currentRow?.marge || '',
      frequence: currentRow?.frequence || '',
      frequence_remuneration: currentRow?.frequence_remuneration || '',
      conditions: currentRow?.conditions || '',
      description: currentRow?.description || '',
      rappel: currentRow?.rappel || '',
    }),
    [currentRow]
  );

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(AddAbonnementSchema),
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
        <DialogTitle>{currentRow ? 'Modifier Abonnement' : 'Ajouter Abonnement'}</DialogTitle>
        <DialogContent>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' }}
          >
            <Stack spacing={2} py={2}>
              <Field.Text label="Libellé" name="name" />

              <Field.Text type="number" label="Prix" name="price" />
              <Field.Text type="number" label="Rémunération / Marge arrière" name="marge" />

              <Field.Text name="description" label="Description" multiline rows={3} />
            </Stack>
            <Stack spacing={2} py={2}>
              <Field.Select label="Durée" name="duration">
                <MenuItem value="1 mois">1 mois</MenuItem>
                <MenuItem value="3 mois">3 mois</MenuItem>
                <MenuItem value="6 mois">6 mois</MenuItem>
                <MenuItem value="12 mois">12 mois</MenuItem>
                <MenuItem value="24 mois">24 mois</MenuItem>
                <MenuItem value="36 mois">36 mois</MenuItem>
              </Field.Select>
              <Field.Select label="Fréquene de paiement" name="frequence">
                <MenuItem value="ponctuel">Ponctuel</MenuItem>
                <MenuItem value="mensuel">Mensuel</MenuItem>
                <MenuItem value="trimestriel">Trimestriel</MenuItem>
                <MenuItem value="annuel">Annuel</MenuItem>
              </Field.Select>
              <Field.Select label="Fréquence de paiement de la Rémunération" name="frequence_remuneration">
                <MenuItem value="ponctuel">Ponctuel</MenuItem>
                <MenuItem value="mensuel">Mensuel</MenuItem>
                <MenuItem value="trimestriel">Trimestriel</MenuItem>
                <MenuItem value="annuel">Annuel</MenuItem>
              </Field.Select>
              <Field.Text name="conditions" label="Conditions / Notes" multiline rows={3} />
            </Stack>
          </Box>
          <Stack spacing={2}>
            <Typography variant='caption'>Rappel moi avant la fin de l’abonnement</Typography>
            <Field.Select label="Rappel" name="rappel">
                <MenuItem value="1 jour">1 jour</MenuItem>
                <MenuItem value="7 jours">7 jours</MenuItem>
                <MenuItem value="15 jours ">15 jours </MenuItem>
                <MenuItem value="30 jours">30 jours</MenuItem>
              </Field.Select>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Annuler
          </Button>

          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {currentRow ? 'Modifier' : 'Ajouter'}
          </LoadingButton>
        </DialogActions>
      </Form>
    </Dialog>
  );
}
