import { useEffect, useCallback } from 'react';
import { useFieldArray, useFormContext, useWatch } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { inputBaseClasses } from '@mui/material/InputBase';

import { fCurrency } from 'src/utils/format-number';

import { INVOICE_SERVICE_OPTIONS } from 'src/_mock';

import { Field } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

const _roles = ['article 1', 'article 2'];

const articles = [
    { id: '1', name: 'Ecran LCD T44', price: 82, tva: 20 },
    { id: '2', name: 'Ecran LED T55', price: 100, tva: 18 },
  ];

export function VenteNewEditDetails() {
  const { control, setValue, watch } = useFormContext();

  const { fields, append, remove } = useFieldArray({ control, name: 'items' });

  const values = watch();

  const selectedArticles = useWatch({
    control,
    name: fields.map((_, index) => `items[${index}].title`),
  });

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

  const subtotal = totalOnRow.reduce((acc, num) => acc + num, 0);

  const totalAmount = subtotal - values.discount - values.shipping + values.taxes;


  useEffect(() => {
    setValue('totalAmount', totalAmount);
  }, [setValue, totalAmount]);

  const calculateFields = useCallback(
    (index) => {
      const item = values[index];
      const priceHT = ((item.price * (100 - item.tva)) / 100) * item.quantity;
      const priceTTC = item.quantity * item.price - (item.remise || 0);

      setValue(`items[${index}].priceHT`, priceHT.toFixed(2));
      setValue(`items[${index}].priceTTC`, priceTTC.toFixed(2));
    },
    [setValue, values]
  );

  //   const handleSelectArticle = useCallback(
  //     (index, article) => {
  //       if (article) {
  //         setValue(`items[${index}].title`, article);
  //         setValue(`items[${index}].price`, article.price);
  //         setValue(`items[${index}].tva`, article.tva);
  //         setValue(`items[${index}].quantity`, 1); // Default quantity
  //         calculateFields(index);
  //       }
  //     },
  //     [setValue, calculateFields]
  //   );

  const handleAdd = () => {
    console.log(values);

    append({
      title: '',
      description: '',
      service: '',
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

  const handleClearService = useCallback(
    (index) => {
      setValue(`items[${index}].quantity`, 1);
      setValue(`items[${index}].price`, 0);
      setValue(`items[${index}].total`, 0);
    },
    [setValue]
  );

  const handleSelectService = useCallback(
    (index, option) => {
      setValue(`items[${index}].price`, articles.find((service) => service.name === option)?.price);
      setValue(
        `items[${index}].total`,
        values.items.map((item) => item.quantity * item.price)[index]
      );
    },
    [setValue, values.items]
  );

  const handleChangeQuantity = useCallback(
    (event, index) => {
      const quantity = Number(event.target.value);
      const price = values.items[index]?.price || 0;
      const tva = values.items[index]?.tva || 0;
      const remise = values.items[index]?.remise || 0;
  
      const priceHT = price * quantity - (price * quantity * tva) / 100;
      const priceTTC = price * quantity - remise;
  
      setValue(`items[${index}].quantity`, quantity);
      setValue(`items[${index}].priceht`, priceHT.toFixed(2));
      setValue(`items[${index}].pricettc`, priceTTC.toFixed(2));
    },
    [setValue, values.items]
  );

  const handleChangePrice = useCallback(
    (event, index) => {
      const price = Number(event.target.value);
      const quantity = values.items[index]?.quantity || 1;
      const tva = values.items[index]?.tva || 0;
      const remise = values.items[index]?.remise || 0;
  
      const priceHT = price * quantity - (price * quantity * tva) / 100;
      const priceTTC = price * quantity - remise;
  
      setValue(`items[${index}].price`, price);
      setValue(`items[${index}].priceht`, priceHT.toFixed(2));
      setValue(`items[${index}].pricettc`, priceTTC.toFixed(2));
    },
    [setValue, values.items]
  );

  const handleChangeRemise = useCallback(
    (event, index) => {
      const remise = Number(event.target.value);
      const price = values.items[index]?.price || 0;
      const quantity = values.items[index]?.quantity || 1;
  
      const priceTTC = price * quantity - remise;
  
      setValue(`items[${index}].remise`, remise);
      setValue(`items[${index}].pricettc`, priceTTC.toFixed(2));
    },
    [setValue, values.items]
  );

  const renderTotal = (
    <Stack
      spacing={2}
      alignItems="flex-end"
      sx={{ mt: 3, textAlign: 'right', typography: 'body2' }}
    >
      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Subtotal</Box>
        <Box sx={{ width: 160, typography: 'subtitle2' }}>{fCurrency(subtotal) || '-'}</Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Shipping</Box>
        <Box sx={{ width: 160, ...(values.shipping && { color: 'error.main' }) }}>
          {values.shipping ? `- ${fCurrency(values.shipping)}` : '-'}
        </Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Discount</Box>
        <Box sx={{ width: 160, ...(values.discount && { color: 'error.main' }) }}>
          {values.discount ? `- ${fCurrency(values.discount)}` : '-'}
        </Box>
      </Stack>

      <Stack direction="row">
        <Box sx={{ color: 'text.secondary' }}>Taxes</Box>
        <Box sx={{ width: 160 }}>{values.taxes ? fCurrency(values.taxes) : '-'}</Box>
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
                  name={`items[${index}].title`}
                  InputLabelProps={{ shrink: true }}
                  options={articles.map((option) => option.name)}
                  getOptionLabel={(option) => option}
                  renderOption={(props, option) => (
                    <li {...props} key={option}>
                      {option}
                    </li>
                  )}
                  // onChange={(event, value) => handleSelectArticle(index, value)}
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
