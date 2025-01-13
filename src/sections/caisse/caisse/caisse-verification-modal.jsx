import React, { useState } from 'react';
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  Button,
  DialogActions,
  TextField,
} from '@mui/material';
import { fCurrency } from 'src/utils/format-number';
import MoneyCard from './money-card';

const moneyCoins = [500, 200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01];

export default function CaisseVerificationModal({ open, onClose }) {
  // State to track quantities for each coin
  const [quantities, setQuantities] = useState(moneyCoins.map(() => 0));

  // Handler to update quantity for a specific coin
  const handleQuantityChange = (index, newQuantity) => {
    setQuantities((prev) => {
      const updated = [...prev];
      updated[index] = newQuantity;
      return updated;
    });
  };

  // Calculate the total amount of money
  const totalMoney = quantities.reduce(
    (total, quantity, index) => total + quantity * moneyCoins[index],
    0
  );

  return (
    <Dialog maxWidth open={open} onClose={onClose}>
      <DialogTitle>Vérification de la caisse</DialogTitle>
      <DialogContent sx={{ bgcolor: 'background.neutral' }}>
        <Box
          gridTemplateColumns={{
            xs: 'repeat(2, 1fr)',
            sm: 'repeat(3, 1fr)',
            md: 'repeat(4, 1fr)',
            lg: 'repeat(5, 1fr)',
          }}
          p={4}
          gap={3}
          display="grid"
        >
          {moneyCoins.map((money, index) => (
            <MoneyCard
              key={money}
              money={money}
              quantity={quantities[index]}
              onQuantityChange={(newQuantity) => handleQuantityChange(index, newQuantity)}
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h6" mt={3}>
          Total: {fCurrency(totalMoney)}
        </Typography>
        <Typography variant="h6" mt={3}>
          Ecart: {fCurrency(totalMoney)}
        </Typography>
        <TextField name="commentaire" label="Commentaire" />
        <Button size="large" variant="contained">
          Clôturer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
