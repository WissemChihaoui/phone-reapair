import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useMemo } from 'react'
import { toast } from 'sonner';
import { Field, Form } from 'src/components/hook-form'
import { CONFIG } from 'src/config-global'
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

export const UserQuickEditSchema = zod.object({
  code: zod.string().min(1, { message: 'Code parteanire est requis'})
})

export default function PartenaireInternForm({ open, onClose }) {

  const defaultValues = useMemo(
    () => ({
      code: '',
    }),
    []
  )

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(UserQuickEditSchema),
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
        success: 'Modification effectué!',
        error: 'Erreur lors de modification!',
      });

      await promise;

      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
});
  return (
    <Dialog
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Ajouter Partenaire {CONFIG.appName}</DialogTitle>
      <DialogContent>
        <Box p={2}>
          <Form methods={methods} onSubmit={onSubmit}>
            <Field.Text name="code" label="Entrer le code de partenaire" />
          </Form>
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
    </Dialog>
  )
}
