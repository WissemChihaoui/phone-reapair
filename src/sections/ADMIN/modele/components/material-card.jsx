import React, { useCallback, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { Iconify } from 'src/components/iconify';
import { Image } from 'src/components/image';
import { useBoolean } from 'src/hooks/use-boolean';
import { UploadBox } from 'src/components/upload';

export default function MaterialCard({ item, add, openAdd, deleteData, editData }) {
  const openDelete = useBoolean();
  const openEdit = useBoolean();

  const [nameField, setNameField] = useState(item?.name || '');
  const [files, setFiles] = useState(item?.image ? [{ path: item.image }] : []);
  const [selectedMaterial, setSelectedMaterial] = useState(
    item?.materiel ? { title: item.materiel } : null
  );
  const [selectedMarque, setSelectedMarque] = useState(null);
  const [error, setError] = useState('');

  const handleDrop = useCallback((acceptedFiles) => {
    setFiles(acceptedFiles);
  }, []);

  const editCassier = () => {
    if (!nameField.trim() || !selectedMaterial || !files || !files[0]) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    const updatedItem = {
      id: item.id,
      name: nameField.trim(),
      picture: files[0].path,
      materiel: selectedMaterial.title,
    };

    editData(updatedItem);
    openEdit.onFalse();
  };

  return (
    <>
      {item && (
        <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column' }}>
          <Box sx={{ position: 'relative', p: 1 }}>
            <Tooltip title={item.name} placement="bottom-end">
              <Image alt={item.name} src={item.image} ratio="1/1" sx={{ borderRadius: 1.5 }} />
            </Tooltip>
          </Box>
          <Stack sx={{ p: 2, pb: 0, textAlign: 'center', flex: 1, justifyContent: 'center' }}>
            <Typography variant="h6">{item.name}</Typography>
          </Stack>
          <Stack sx={{ p: 2, pb: 1, textAlign: 'center', flex: 1, justifyContent: 'center' }}>
            <Typography variant="span">{item.materiel}</Typography>
          </Stack>
          <Divider sx={{ borderStyle: 'dashed' }} />
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
            }}
          >
            <Button color="error" sx={{ borderRadius: '0' }} onClick={openDelete.onTrue}>
              Supprimer
            </Button>
            <Button variant="contained" onClick={openEdit.onTrue} sx={{ borderRadius: '0' }}>
              Modifier
            </Button>
          </Box>
        </Card>
      )}
      {add && (
        <Button variant="outlined" onClick={openAdd.onTrue}>
          <Stack
            sx={{
              textAlign: 'center',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '80px',
            }}
          >
            <Typography variant="h6">Ajouter</Typography>
          </Stack>
        </Button>
      )}

      <ConfirmDialog
        open={openDelete.value}
        onClose={openDelete.onFalse}
        title="Supprimer"
        content={`Êtes-vous sûr de vouloir supprimer le type ${item?.name} ?`}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              deleteData(item.id);
              openDelete.onFalse();
            }}
          >
            Supprimer
          </Button>
        }
      />

      <Dialog open={openEdit.value} onClose={openEdit.onFalse}>
        <DialogTitle>Modifier cette modèle</DialogTitle>
        <DialogContent>
          {error && (
            <Alert sx={{ mb: 2 }} severity="error">
              {error}
            </Alert>
          )}
          <Autocomplete
            noOptionsText="Pas de données"
            fullWidth
            options={top100Films}
            getOptionLabel={(option) => option.title}
            value={selectedMaterial}
            onChange={(event, value) => setSelectedMaterial(value)}
            sx={{ my: 2 }}
            renderInput={(params) => (
              <TextField {...params} label="Matériel" placeholder="Type de matériel" />
            )}
          />
          <Autocomplete
            noOptionsText="Pas de données"
            fullWidth
            options={top100Films}
            getOptionLabel={(option) => option.title}
            value={selectedMarque}
            onChange={(event, value) => setSelectedMarque(value)}
            sx={{ mb: 2 }}
            renderInput={(params) => <TextField {...params} label="Marque" placeholder="Marque" />}
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
            sx={{ py: 2.5, width: 'auto', height: 'auto', borderRadius: 1.5, mb: 2 }}
          />
          <TextField
            value={nameField}
            onChange={(e) => setNameField(e.target.value)}
            autoFocus
            fullWidth
            type="text"
            variant="outlined"
            label="Nom du type"
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={openEdit.onFalse} variant="outlined" color="inherit">
            Annuler
          </Button>
          <Button onClick={editCassier} variant="contained">
            Modifier
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
