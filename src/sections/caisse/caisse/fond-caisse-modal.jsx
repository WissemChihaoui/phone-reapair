import { toast } from 'sonner';
import React, { useState } from 'react';

import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogActions,
  DialogContent,
} from '@mui/material';

export default function FondCaisseModal({ open, onClose }) {
  const [fondField, setFondField] = useState(null);

  const save = () => {
    if(fondField){
        toast.success('Fond de caisse ajouté');
        onClose();
    }else{
        toast.error('Ajouter Fond de caisse svp!')
    }
  }
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Ajouter fond de caisse</DialogTitle>
      <DialogContent>
        <TextField
          sx={{ mt: 2 }}
          label="Fond de caisse"
          helperText="Merci d'entrer votre fond de la caisse"
          name="fond"
          value={fondField}
          onChange={(e)=>setFondField(e.target.value)}
          type='number'
        />
      </DialogContent>
      <DialogActions>
        <Button color='primary' variant="contained" onClick={()=> save()}>Enregistrer</Button>
      </DialogActions>
    </Dialog>
  );
}
