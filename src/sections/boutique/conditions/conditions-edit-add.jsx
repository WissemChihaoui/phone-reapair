import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import React, { useState } from 'react';

export default function ConditionsEditAdd({ open, onClose, currentCondition, updateConditionMessage }) {
    const [message, setMessage] = useState(currentCondition.message)
    const handleEdit = () => {
        console.log(message)
        updateConditionMessage(currentCondition.id, message);
        onClose();
    }
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{currentCondition ? 'Modifier' : 'Ajouter'} un condition</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" p={2} gap={2}>
          <TextField name="name" label="Nom de condition" disabled value={currentCondition.name} />
          <TextField
            name="message"
            label="Message"
            multiline
            rows={5}
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="inherit">
          Annuler
        </Button>
        <Button onClick={() =>handleEdit() } variant="contained">
          Modifier
        </Button>
        
      </DialogActions>
    </Dialog>
  );
}
