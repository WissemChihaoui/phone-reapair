import {
    Autocomplete,
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Stack,
    TextField,
  } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
  import React, { useState } from 'react';
  import { Field } from 'src/components/hook-form';
  import { Iconify } from 'src/components/iconify';
  import { fCurrency } from 'src/utils/format-number';
  import { today } from 'src/utils/format-time';
  
  const _methodes = ['Virement', 'Éspece'];
  
  const data = {
    payement: [
      {
        date: today(),
        via: 'Virement',
        amount: 200,
      },
      {
        date: today(),
        via: 'Éspece',
        amount: 150,
      },
    ],
    totalAmount: 500,
  };
  
  export default function DisplayPayementModal({ open, onClose }) {
    // Initialize fields with the data.payement array
    const [fields, setFields] = useState(data.payement);
  
    
  
    const handleRemove = (index) => {
      setFields((prevFields) => prevFields.filter((_, i) => i !== index));
    };
  
    const handleChange = (index, field, value) => {
      setFields((prevFields) =>
        prevFields.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
        )
      );
    };
  
    const paidAmount = fields.reduce((acc, item) => acc + Number(item.amount || 0), 0);
    const rest = data.totalAmount - paidAmount;
    const handleAdd = () => {
        if (rest > 0) {
          setFields((prevFields) => [
            ...prevFields,
            {
              date: today(),
              via: '',
              amount: '',
            },
          ]);
        }
      };
    const handleCancel = () => {
      onClose();
    };
  
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
                  key={index}
                  rowGap={3}
                  alignItems="center"
                  columnGap={2}
                  width="100%"
                >
                  <TextField
                    type="number"
                    label={`Montant à payer ${index + 1}`}
                    value={item.amount}
                    onChange={(e) =>
                      handleChange(index, 'amount', e.target.value)
                    }
                  />
                  
                  <Autocomplete
            fullWidth
            options={_methodes}
            getOptionLabel={(option) => option}
            renderInput={(params) => <TextField {...params} label={`Méthode de paiement ${index + 1}`} margin="none" />}
            renderOption={(props, option) => (
              <li {...props} key={option}>
                {option}
              </li>
            )}
          />
                
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
            <Button variant="outlined" onClick={handleCancel}>
              Annuler
            </Button>
            <Button variant="contained" color="success">
              Confirmer le paiement
            </Button>
          </DialogActions>
        </Box>
      </Dialog>
    );
  }
  