import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, Stack, Button, DialogActions } from '@mui/material';
import PatternLock from 'react-pattern-lock';
import { useFieldArray, useFormContext } from 'react-hook-form';

export default function LockPadModal({ open, onClose, index, onSubmit }) {
    const [path, setPath] = useState([]);
    const { setValue } = useFormContext();

  const handleFinish = () => {
    setValue(`articles[${index}].schemaVer`, path)
    onClose();
  };

  const handleReset = () => {
    setValue(`articles[${index}].schemaVer`, [])
    setPath([])
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Schéma de verrouillage</DialogTitle>
      <DialogContent>
        <Stack spacing={2} alignItems="center">
          <PatternLock
            size={3} // Fixed 3x3 grid
            onChange={(newPath) => setPath([...newPath])}
            path={path}
            connectorThickness={5}
            success
          />
          <div>
            Résultat: {path.join(', ')}
          </div>
          
        </Stack>
      </DialogContent>
      <DialogActions>
      <Button
            variant="outlined"
            onClick={handleReset}
            disabled={path.length === 0}
          >
            Réinitialisation
          </Button>
      <Button
            variant="contained"
            color="primary"
            onClick={handleFinish}
            disabled={path.length === 0}
          >
            Soumettre
          </Button>
     
          
      </DialogActions>
    </Dialog>
  );
}
