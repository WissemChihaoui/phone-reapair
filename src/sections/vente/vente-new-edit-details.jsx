import { useEffect, useCallback } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { inputBaseClasses } from '@mui/material/InputBase';

import { fCurrency } from 'src/utils/format-number';

import { Field } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const _roles = ['article 1', 'article 2'];

const articles = [
    { id: '1', name: 'Ecran LCD T44', price: 82, tva: 20, stock: 30 },
    { id: '2', name: 'Ecran LED T55', price: 100, tva: 18, stock: 10 },
  ];

export function VenteNewEditDetails() {
  const { control, setValue, watch } = useFormContext();

  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  const values = watch();

  const selectedArticles = useWatch({
    control,
    name: fields.map((_, index) => `items[${index}].articleName`),
  });
  const updateFieldValues = (index, field, value) => {
    const item = values.items[index];
    const quantity = field === 'quantity' ? value : item.quantity || 1;
    const price = field === 'price' ? value : item.price || 0;
    const remise = field === 'remise' ? value : item.remise || 0;
    const tva = item.tva || 0;
  
    const priceHT = price * quantity - (price * quantity * tva) / 100;
    const priceTTC = price * quantity - remise;
  
    setValue(`items[${index}].${field}`, value);
    setValue(`items[${index}].priceht`, priceHT.toFixed(2));
    setValue(`items[${index}].pricettc`, priceTTC.toFixed(2));
  };
  useEffect(() => {
    fields.forEach((field, index) => {
      const selectedArticle = articles.find(
        (article) => article.name === selectedArticles[index]
      );
  
      if (selectedArticle) {
        const quantity = values.items[index]?.quantity || 1;
        const price = selectedArticle.price;
        const tva = selectedArticle.tva;
        const remise = values.items[index]?.remise || 0;
  
        const priceHT = price * quantity - (price * quantity * tva) / 100;
        const priceTTC = price * quantity - remise;
        
        setValue(`items[${index}].articleId`, selectedArticle.id)
        setValue(`items[${index}].price`, price);
        setValue(`items[${index}].tva`, tva);
        setValue(`items[${index}].quantity`, quantity);
        setValue(`items[${index}].remise`, remise);
        setValue(`items[${index}].priceht`, priceHT.toFixed(2));
        setValue(`items[${index}].pricettc`, priceTTC.toFixed(2));
      }
    });
  }, [selectedArticles, fields, setValue, values.items]);

  const totalOnRow = values.items.map((item) => item.quantity * item.price);

  const totalDiscounted = values.items.map((item) => (item.quantity * item.price)-item.remise);

  const totalHt = values.items.map((item)=> Number(item.priceht))

  const totalHtAmount = totalHt.reduce((acc, num) => acc + num, 0)
  
  const totalDiscount = values.items.map((item) => item.remise);
  
  const subtotal = totalOnRow.reduce((acc, num) => acc + num, 0);

  const totalAmount = totalDiscounted.reduce((acc, num) => acc + num, 0);
  
  const discountAmount = totalDiscount.reduce((acc, num) => acc + num, 0);



  useEffect(() => {
    setValue('totalAmount', totalAmount);
    setValue('discount', discountAmount);
    setValue('totalSs', subtotal);
    setValue('totalHt', totalHtAmount);
  }, [setValue, totalAmount,discountAmount,subtotal,totalHtAmount]);


  const handleAdd = () => {
    append({
      articleId:null,
      articleName: '',
      description: '',
      quantity: 1,
      price: 0,
      priceht: 0,
      remise: 0,
      pricettc:0,
      total: 0,
    });
  };

  const handleRemove = (index) => {
    remove(index);
  };


  const handleChangeQuantity = (event, index) => {
    updateFieldValues(index, 'quantity', Number(event.target.value));
  };

  const handleChangePrice = (event, index) => {
    updateFieldValues(index, 'price', Number(event.target.value));
  };

  const handleChangeRemise = (event, index) => {
    updateFieldValues(index, 'remise', Number(event.target.value));
  };

  const renderTotal = (
    <Stack
      spacing={2}
      alignItems="flex-end"
      sx={{ mt: 3, textAlign: 'right', typography: 'body2' }}
    >
      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Total HT</Box>
        <Box sx={{ width: 160, typography: 'subtitle2' }}>{fCurrency(totalHtAmount) || '-'}</Box>
      </Stack>
      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Ss Total</Box>
        <Box sx={{ width: 160, typography: 'subtitle2' }}>{fCurrency(subtotal) || '-'}</Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Remise totale</Box>
        <Box sx={{ width: 160, ...(discountAmount && { color: 'error.main' }) }}>
          {discountAmount ? `- ${fCurrency(discountAmount)}` : '-'}
        </Box>
      </Stack>

      <Stack direction="row" sx={{ typography: 'subtitle1' }}>
        <div>Total</div>
        <Box sx={{ width: 160 }}>{fCurrency(totalAmount) || '-'}</Box>
      </Stack>
    </Stack>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        Détails:
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((item, index) => (
          <Stack key={item.id} alignItems="flex-end" spacing={1.5}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
              <Stack direction="column" spacing={2} sx={{ width: 1 }}>
                <Field.Autocomplete
                  size="small"
                  label="Article"
                  name={`items[${index}].articleName`}
                  InputLabelProps={{ shrink: true }}
                  options={articles.map((option) => option.name)}
                  getOptionLabel={(option) => option}
                  renderOption={(props, option) => (
                    <li {...props} key={option}>
                      {option}
                    </li>
                  )}
                />

                <Field.Text
                  size="small"
                  name={`items[${index}].description`}
                  label="Description"
                  InputLabelProps={{ shrink: true }}
                />
              </Stack>
              <Stack direction="column" spacing={2} sx={{ width: 1 }}>
                <Stack direction="row" spacing={2}>
                  <Field.Text
                    size="small"
                    type="number"
                    name={`items[${index}].quantity`}
                    label="Qté"
                    placeholder="0"
                    onChange={(event) => handleChangeQuantity(event, index)}
                    InputLabelProps={{ shrink: true }}
                  />

                  <Field.Text
                    size="small"
                    type="number"
                    name={`items[${index}].price`}
                    label="Prix"
                    placeholder="0.00"
                    onChange={(event) => handleChangePrice(event, index)}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>€</Box>
                        </InputAdornment>
                      ),
                    }}
                    sx={{ maxWidth: { md: 150 } }}
                  />

                  <Field.Text
                    disabled
                    size="small"
                    type="number"
                    name={`items[${index}].tva`}
                    label="TVA"
                    placeholder="0"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>%</Box>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      [`& .${inputBaseClasses.input}`]: {
                        textAlign: { md: 'right' },
                      },
                    }}
                  />

                  <Field.Text
                    disabled
                    size="small"
                    type="number"
                    name={`items[${index}].priceht`}
                    label="Prix HT"
                    placeholder="0.00"
                   
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>€</Box>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      [`& .${inputBaseClasses.input}`]: {
                        textAlign: { md: 'right' },
                      },
                    }}
                  />
                </Stack>
                <Stack direction="row" spacing={2}>
                  <Field.Text
                    size="small"
                    type="number"
                    name={`items[${index}].remise`}
                    label="Remise"
                    onChange={(event) => handleChangeRemise(event, index)}
                    placeholder="0.00"
                    InputLabelProps={{ shrink: true }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>€</Box>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      maxWidth: { md: 180 },
                      [`& .${inputBaseClasses.input}`]: {
                        textAlign: { md: 'right' },
                      },
                    }}
                  />

                  <Field.Text
                    disabled
                    size="small"
                    type="number"
                    name={`items[${index}].pricettc`}
                    label="Prix TTC"
                    placeholder="0.00"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>€</Box>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      [`& .${inputBaseClasses.input}`]: {
                        textAlign: { md: 'right' },
                      },
                    }}
                  />
                </Stack>
              </Stack>
            </Stack>

            <Button
              size="small"
              color="error"
              startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
              onClick={() => handleRemove(index)}
            >
              Supprimer
            </Button>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

      <Stack
        spacing={3}
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-end', md: 'center' }}
      >
        <Button
          size="small"
          color="primary"
          variant='outlined'
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleAdd}
          sx={{ flexShrink: 0 }}
        >
          Ajouter Article
        </Button>
      </Stack>

      {renderTotal}
    </Box>
  );
}
