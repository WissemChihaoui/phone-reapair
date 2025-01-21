import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Stack,
  Button,
  Fab,
} from '@mui/material';
import { useFormContext, useFieldArray } from 'react-hook-form';
import { Field } from 'src/components/hook-form';
import { Label } from 'src/components/label';
import { IncrementerButton } from 'src/sections/product/components/incrementer-button';
import { TableHeadCustom } from 'src/components/table';
import { EmptyContent } from 'src/components/empty-content';
import { fCurrency } from 'src/utils/format-number';
import { CONFIG } from 'src/config-global';
import { Iconify } from 'src/components/iconify';

const TABLE_HEAD = [
  { id: 'name', label: 'Article' },
  { id: 'qte', label: 'Quantité' },
  { id: 'remise', label: 'Remise' },
  { id: 'total', label: 'Total' },
  { id: 'action', label: '' },
];

export default function PanierView() {
  const { control, setValue, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'items' });
  const values = watch();

  const isEmpty = !fields.length;

  const handleRemove = (index) => {
    remove(index);
  };

  const handleQuantityChange = (index, newQuantity) => {
    const item = fields[index];
    const remise = values.items[index]?.remise || 0;

    setValue(`items.${index}.qte`, newQuantity);
    updateTotal(index, newQuantity, remise, item.price);
  };

  const handleRemiseChange = (index, newRemise) => {
    const item = fields[index];
    const quantity = values.items[index]?.qte || 1;

    setValue(`items.${index}.remise`, newRemise);
    updateTotal(index, quantity, newRemise, item.price);
  };

  const updateTotal = (index, quantity, remise, price) => {
    const total = price * quantity - remise;
    setValue(`items.${index}.total`, total);
  };

  return (
    <>
      {isEmpty ? (
        <EmptyContent
          title="Panier est vide !"
          description="Veuillez choisir des articles!"
          imgUrl={`${CONFIG.assetsDir}/assets/icons/empty/ic-cart.svg`}
          sx={{ pt: 5, pb: 10 }}
        />
      ) : (
        <Table>
          <TableHeadCustom headLabel={TABLE_HEAD} />
          <TableBody>
            {fields.map((item, index) => (
              <TableRow key={item.id}>
                {/* Article Name */}
                <TableCell>
                  <Stack spacing={0.5}>
                    <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
                      {item.name}
                    </Typography>
                    <Stack
                      direction="row"
                      alignItems="center"
                      sx={{ typography: 'body2', color: 'text.secondary' }}
                    >
                      Prix: <Label sx={{ ml: 0.5 }}> {fCurrency(item.price)} </Label>
                    </Stack>
                  </Stack>
                </TableCell>

                {/* Quantity */}
                <TableCell>
                  <Box sx={{ width: 88, textAlign: 'right' }}>
                    <IncrementerButton
                      quantity={values.items[index]?.qte || 1}
                      onDecrease={() => handleQuantityChange(index, (values.items[index]?.qte || 1) - 1)}
                      onIncrease={() => handleQuantityChange(index, (values.items[index]?.qte || 1) + 1)}
                      disabledDecrease={values.items[index]?.qte <= 1}
                      disabledIncrease={values.items[index]?.qte >= item.stock}
                    />
                    <Typography variant="caption" component="div" sx={{ color: 'text.secondary', mt: 1 }}>
                      Stock: {item.stock}
                    </Typography>
                  </Box>
                </TableCell>

                {/* Remise */}
                <TableCell>
                  <Field.Text
                    name={`items.${index}.remise`}
                    size="small"
                    sx={{ width: 140 }}
                    onChange={(e) => handleRemiseChange(index, parseFloat(e.target.value) || 0)}
                    defaultValue={values.items[index]?.remise || 0}
                  />
                </TableCell>

                {/* Total */}
                <TableCell>
                  <Typography sx={{ fontWeight: 'bold' }}>
                    {fCurrency(values.items[index]?.total || item.price * (values.items[index]?.qte || 1))}
                  </Typography>
                </TableCell>

                <TableCell>
                    <Fab onClick={()=> handleRemove(index)} size='small' color='error'>
                        <Iconify icon="solar:trash-bin-trash-bold" />
                    </Fab>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
}
