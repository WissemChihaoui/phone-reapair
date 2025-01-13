import { Card, Typography } from '@mui/material';
import React from 'react';
import { IncrementerButton } from 'src/sections/product/components/incrementer-button';
import { fCurrency } from 'src/utils/format-number';

export default function MoneyCard({ money, quantity, onQuantityChange }) {
  return (
    <Card sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', p: 2 }}>
      <Typography>{fCurrency(money)}</Typography>
      <IncrementerButton
        name="quantity"
        onIncrease={() => onQuantityChange(quantity + 1)}
        onDecrease={() => onQuantityChange(quantity - 1)}
        disabledDecrease={quantity <= 0}
        quantity={quantity}
      />
    </Card>
  );
}
