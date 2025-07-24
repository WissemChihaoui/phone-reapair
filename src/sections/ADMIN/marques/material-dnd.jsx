import React, { useCallback, useState } from 'react';
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import { useBoolean } from 'src/hooks/use-boolean';
import { UploadBox } from 'src/components/upload';
import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import MaterialCard from './components/material-card';

export default function MaterialDnd({ deleteData, data, addData, editData }) {
  const openAdd = useBoolean();
  const [files, setFiles] = useState(null);
  const [addField, setAddField] = useState('');
  const [selectedMaterial, setSelectedMaterial] = useState(null);

  const addCasier = () => {
    if (addField.trim() && selectedMaterial && files && files[0]) {
      const result = {
        name: addField.trim(),
        picture: files[0].path, // Assuming `path` contains the file URL
        materiel: selectedMaterial.title, // Assuming `title` is the desired property
      };

      addData(result); // Add the result object
      openAdd.onFalse(); // Close the dialog
      setAddField('');
      setFiles(null);
      setSelectedMaterial(null);
    }
  };

  const handleDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(4, 1fr)', md: 'repeat(6, 1fr)' }}
      >
        {data.map((item) => (
          <MaterialCard
            key={item.id} // Added key prop
            deleteData={deleteData}
            item={item}
            editData={editData}
          />
        ))}
        <MaterialCard key="add-card" add openAdd={openAdd} />
      </Box>

      <Dialog open={openAdd.value} onClose={openAdd.onFalse}>
        <DialogTitle>Ajouter une marque</DialogTitle>

        <DialogContent>
          <Alert sx={{ mb: 2 }} severity="warning">
            Veuillez vérifier que le nom de type n&apos;existe pas
          </Alert>
          <Autocomplete
            noOptionsText="Pas de données"
            fullWidth
            options={top100Films}
            getOptionLabel={(option) => option.title}
            value={selectedMaterial}
            onChange={(event, value) => setSelectedMaterial(value)}
            sx={{ mb: 2 }}
            renderInput={(params) => (
              <TextField {...params} label="Matériel" placeholder="Type de matériel" />
            )}
            renderOption={(props, option) => (
              <li {...props} key={option.id}>
                {option.title}
              </li>
            )}
          />
          <UploadBox
            onDrop={handleDrop}
            placeholder={
              files && files[0] ? (
                <Image src={files[0].path} />
              ) : (
                <Box
                  sx={{
                    gap: 0.5,
                    display: 'flex',
                    alignItems: 'center',
                    color: 'text.disabled',
                    flexDirection: 'column',
                  }}
                >
                  <Iconify icon="eva:cloud-upload-fill" width={40} />
                  <Typography variant="body2">Image de marque</Typography>
                </Box>
              )
            }
            sx={{
              py: 2.5,
              width: 'auto',
              height: 'auto',
              borderRadius: 1.5,
              mb: 2,
            }}
          />
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
          <Button onClick={addCasier} variant="contained">
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const top100Films = [
  { title: 'Smartphone', id: 1 },
  { title: 'Ordinateur', id: 2 },
];
