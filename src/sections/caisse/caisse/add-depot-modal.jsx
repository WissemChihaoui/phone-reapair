import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, Select, Stack } from '@mui/material'
import React from 'react'
import { Field, Form } from 'src/components/hook-form'
import { toast } from 'sonner';


const ACTIONS = [
    {value: 'Send', label: 'Prélèvement Caisse'},
    {value: 'Receive', label: 'Dépot caisse'},
]

export const depotSchema = zod.object({
    email: zod
      .string()
      .min(1, { message: 'Email is required!' })
      .email({ message: 'Email must be a valid email address!' }),
  });
export default function AddDepotModal({ open, onClose }) {
    const defaultValues = {
        action: '',
        type: '',
        comment: '',
        amount:0,
      };
      const methods = useForm({
        resolver: zodResolver(depotSchema),
        defaultValues,
      });

      const {
        handleSubmit,
        formState: { isSubmitting },
      } = methods;

      const onSubmit = handleSubmit(async (data) => {
        try {
         console.log(data);
         toast.success('Dépot Ajouté!')
         onClose();
        } catch (error) {
          console.error(error);
        }
      });
  return (
    
    <Dialog fullWidth open={open} onClose={onClose}>
        <Form methods={methods} onSubmit={onSubmit}>
        <DialogTitle>Ajouter Dépot / Retrait</DialogTitle>
        <DialogContent>
            <Stack p={1} spacing={2}>
                
                    <Field.Select name='action' label="Action">
                        {ACTIONS.map((action) => (
                            <MenuItem value={action.value} key={action.value}>{action.label}</MenuItem>
                        ))}
                    </Field.Select>
                    <Field.Select name='type' label="Type">
                        {['Espèce', 'Chéque'].map((type) => (
                            <MenuItem value={type} key={type}>{type}</MenuItem>
                        ))}
                    </Field.Select>
                    <Field.Text name="amount" type="number" label="Montant" />
                    <Field.Text name="comment" label="Commentaire" />

            </Stack>
        </DialogContent>
        <DialogActions>
            <Button variant='contained'>Enregistrer</Button>
        </DialogActions>
        </Form>
    </Dialog>
  )
}
