import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import React, { useState } from 'react';
import { useBoolean } from 'src/hooks/use-boolean';
import FonctionCardView from '../fonction-card-view';

const FONCTIONS_LIST = [{ id: 0, label: 'Admin' }];

export default function FonctionSideView() {
  const openAdd = useBoolean();

  const [addField, setAddField] = useState('');

  console.log(openAdd);
  const [tableData, setTableData] = useState(FONCTIONS_LIST);
  const addData = (label) => {
    setTableData((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        label,
        createdAt: '2024-12-25T12:41:34+01:00',
      },
    ]);
  };

  const addCasier = () => {
    if (addField) {
      addData(addField);
      openAdd.onFalse();
      setAddField('');
    }
  };

  const deleteData = (id) => {
    setTableData(tableData.filter((data) => data.id !== id));
  };

  const editData = (name, id) => {
    setTableData(tableData.map((data) => (data.id === id ? { ...data, name } : data)));
  };
  return (
    <>
      <Box mt={2}>
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)', md: 'repeat(6, 1fr)' }}
        >
          {tableData.map((item) => (
            <FonctionCardView deleteData={deleteData} item={item} editData={editData} />
          ))}
          <FonctionCardView add openAdd={openAdd} />
        </Box>
      </Box>
      <Dialog open={openAdd.value} onClose={openAdd.onFalse}>
        <DialogTitle>Ajouter un type de matériel</DialogTitle>

        <DialogContent>
          <Alert sx={{ mb: 2 }} severity="warning">
            Une nouvelle fonction na aucun permission
          </Alert>

          <TextField
            value={addField}
            onChange={(e) => setAddField(e.target.value)}
            autoFocus
            fullWidth
            type="text"
            variant="outlined"
            label="Nom du type"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={openAdd.onFalse} variant="outlined" color="inherit">
            Annuler
          </Button>
          <Button onClick={() => addCasier()} variant="contained">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
