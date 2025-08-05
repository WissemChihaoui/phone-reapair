import PatternLock from 'react-pattern-lock';
import { useFormContext } from 'react-hook-form';
import React, { useState, useEffect } from 'react';

import { Stack, Dialog, Button, DialogTitle, DialogContent, DialogActions } from '@mui/material';

export default function LockPadModal({ open, onClose }) {
  const { setValue, watch } = useFormContext();
  const { article } = watch();
  const [path, setPath] = useState([]);

  useEffect(() => {
    setPath(article.schemaVer);
  }, [article.schemaVer]);

  const handleFinish = () => {
    setValue(`article.schemaVer`, path);
    onClose();
  };

  const handleReset = () => {
    setValue(`article.schemaVer`, []);
    setPath([]);
  };

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
          <div>Résultat: {path.join(', ')}</div>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleReset} disabled={path.length === 0}>
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
