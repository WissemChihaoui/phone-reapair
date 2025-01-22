import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Stack,
  } from '@mui/material';
  import React, { useEffect } from 'react';
  import { useFieldArray, useFormContext } from 'react-hook-form';
  import { Field } from 'src/components/hook-form';
  import { Iconify } from 'src/components/iconify';
  import { fCurrency } from 'src/utils/format-number';
  import { today } from 'src/utils/format-time';
  
  const _methodes = ['Virement', 'Éspece'];
  
  export default function PaymentModal({ open, onClose, handleSubmit }) {
    const { control, setValue, watch } = useFormContext();
  
    const { fields, append, remove } = useFieldArray({ control, name: 'payement' });
  
    const values = watch();
  
    const paid = values.payement?.map((item) => item.amount);
    const paidAmount = paid?.reduce((acc, num) => acc + num, 0);
    const rest = values.total - paidAmount;
  
    useEffect(()=> {

          setValue('rest', rest);
          setValue('paid', paidAmount);
       
    }, [setValue,paidAmount, rest,values])
  
  
    const handleAdd = () => {
      if (rest > 0) {
        append({
          id: fields.length,
          amount: null,
          date: today(),
          via: null,
        });
      }
    };
    const handleRemove = (index) => {
      console.log('About to remove i:', index);
      remove(index);
    };
  
    const handleCancel = () => {
      remove();
      onClose();
    }
  
    const handleCreateAndSend = handleSubmit(async (data) => {
      console.log(data);
    });
  
    return (
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <Box>
          <DialogTitle>Paiement</DialogTitle>
          <DialogContent>
            <Box sx={{ p: 3 }}>
              {fields.map((item, index) => (
                <Box
                  mb={1}
                  display="flex"
                  key={item.id}
                  rowGap={3}
                  alignItems="center"
                  columnGap={2}
                  width="100%"
                >
                  <Field.Text
                    type="number"
                    name={`payement[${index}].amount`}
                    label={`Montant à payer ${index + 1}`}
                  />
                  <Field.Autocomplete
                    fullWidth
                    name={`payement[${index}].via`}
                    label={`Méthode de paiement ${index + 1}`}
                    options={_methodes.map((option) => option)}
                    getOptionLabel={(option) => option}
                    renderOption={(props, option) => (
                      <li {...props} key={option}>
                        {option}
                      </li>
                    )}
                  />
                  <Field.DatePicker name={`payement[${index}].date`} label="Date" />
                  <Button
                    size="small"
                    color="error"
                    startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                    onClick={() => handleRemove(index)}
                  />
                </Box>
              ))}
              <Divider sx={{ my: 3, borderStyle: 'dashed' }} />
              <Stack
                spacing={3}
                direction={{ xs: 'column', md: 'row' }}
                alignItems={{ xs: 'flex-end', md: 'center' }}
              >
                <Button
                  size="small"
                  color="primary"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                  onClick={handleAdd}
                  sx={{ flexShrink: 0 }}
                >
                  Ajouter Méthode
                </Button>
              </Stack>
              <Stack
                spacing={2}
                alignItems="flex-end"
                sx={{ mt: 3, textAlign: 'right', typography: 'body2' }}
              >
                <Stack direction="row">
                  <Box sx={{ color: 'text.secondary' }}>Montant Payé</Box>
                  <Box sx={{ width: 160, typography: 'subtitle2' }}>
                    {fCurrency(paidAmount) || '-'}
                  </Box>
                </Stack>
                <Stack direction="row" sx={{ typography: 'subtitle1' }}>
                  <div>Rester :</div>
                  <Box sx={{ width: 160 }}>{fCurrency(rest) || '-'}</Box>
                </Stack>
              </Stack>
            </Box>
          </DialogContent>
  
          <DialogActions>
            <Button variant="outlined" onClick={()=>handleCancel()}>
              Annuler
            </Button>
            <Button onClick={()=>handleCreateAndSend()} variant="contained" color="success">
              Confirmer le paiement
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    );
  }
  