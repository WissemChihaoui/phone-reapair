import React from 'react';

import {
  Box,
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

export default function MarqueAddModal({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ajouter Marque</DialogTitle>
      <DialogContent>
        <Box p={1}>
          <TextField name="marqueName" />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button color="primary" variant="contained">
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
}
