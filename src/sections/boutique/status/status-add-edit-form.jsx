import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputAdornment, Table, TableBody, TableCell, TableRow } from '@mui/material'
import { z as zod } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useMemo } from 'react'
import { toast } from 'sonner';

import { Field, Form } from 'src/components/hook-form'
import { useForm } from 'react-hook-form';
import { Label } from 'src/components/label';
import { borderGradient } from 'src/theme/styles';
import { Iconify } from 'src/components/iconify';


export const StatusSchema = zod
  .object({
    name: zod.string().min(1, { message: 'Nom de statut est requis!' }),
    isSms: zod.boolean().optional(),
    sms: zod.string().optional(),
    isMail: zod.boolean().optional(),
    objectMail: zod.string().optional(),
    messageMail: zod.string().optional(),
  })
  // SMS validation: require `sms` when `isSms` is true
  .refine((data) => {
    if (data.isSms) {
      return !!data.sms && data.sms.trim().length > 0;
    }
    return true;
  }, {
    message: 'Le message SMS est requis lorsque la notification SMS est activée.',
    path: ['sms'], // Targets the 'sms' field
  })
  // Email validation: require `objectMail` when `isMail` is true
  .refine((data) => {
    if (data.isMail) {
      return !!data.objectMail && data.objectMail.trim().length > 0;
    }
    return true;
  }, {
    message: 'L\'objet de l\'email est requis lorsque la notification email est activée.',
    path: ['objectMail'], // Targets the 'objectMail' field
  })
  .refine((data) => {
    if (data.isMail) {
      return !!data.messageMail && data.messageMail.trim().length > 0;
    }
    return true;
  }, {
    message: 'Le message email est requis lorsque la notification email est activée.',
    path: ['messageMail'], // Targets the 'messageMail' field
  });
export default function StatusAddEditForm({ open, onClose, currentStatus }) {
  
    const defaultValues = useMemo(
        () => ({
          name: currentStatus?.name || '',
          isSms: currentStatus?.isSms || false,
          sms: currentStatus?.sms || '',
          isMail: currentStatus?.isMail || false,
          objectMail: currentStatus?.objectMail || '',
          messageMail: currentStatus?.messageMail || '',
          validation: currentStatus?.validation || false,
          file: currentStatus?.file || false,
          color: currentStatus?.color || '#ffffff',
        }),
        [currentStatus]
      );

    const methods = useForm({
        mode: 'all',
        resolver: zodResolver(StatusSchema),
        defaultValues,
      });
    
      const {
        reset,
        watch,
        handleSubmit,
        formState: { isSubmitting },
      } = methods;

      const colorWatch = watch('color')
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
    fullWidth
    maxWidth='lg'
    >
        <Form methods={methods} onSubmit={onSubmit}>
        <DialogTitle>{currentStatus ? 'Modifier':'Ajouter'} Statut</DialogTitle>
            <DialogContent>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                <Iconify icon="tabler:pencil" />
                            </TableCell>
                            <TableCell colSpan={3}>
                                <Field.Text name='name' label='Nom'/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Iconify icon="tabler:device-mobile-message" />
                            </TableCell>
                            <TableCell>
                                <Field.Checkbox name='isSms' label="Notification SMS"/>
                            </TableCell>
                            <TableCell colSpan={2}>
                                <Field.Text name='sms' label='Message SMS'/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Iconify icon="tabler:mail" />
                            </TableCell>
                            <TableCell>
                                <Field.Checkbox name='isMail' label="Notification Email"/>
                            </TableCell>
                            <TableCell>
                                <Field.Text name='objectMail' label='Objet Email'/>
                            </TableCell>
                            <TableCell>
                                <Field.Text name='messageMail' label='Message Email'/>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <Iconify icon="tabler:user" />
                            </TableCell>
                            <TableCell>
                                <Field.Checkbox name='validation' label="Validation Client"/>
                            </TableCell>
                            <TableCell>
                                <Field.Checkbox name='file' label="Pièce jointe"/>
                            </TableCell>
                            <TableCell>
                                <Field.Text 
                                name='color' 
                                label='Couleur' 
                                InputProps={{
                                    endAdornment: (
                                      <InputAdornment position="end">
                                        <Label style={{ background: colorWatch, borderGradient}}/>
                                      </InputAdornment>
                                    ),
                                  }}
                                />                           
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </DialogContent>
            <DialogActions>
            <Button variant="outlined" color="inherit" onClick={onClose}>
          Annuler
        </Button>
        <Button variant="contained" onClick={onSubmit}>
          {currentStatus ? 'Modifier' : 'Ajouter'}
        </Button>
            </DialogActions>
        </Form>
    </Dialog>
  )
}
