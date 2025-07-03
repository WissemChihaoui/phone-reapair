import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Checkbox,
    FormControlLabel,
    TextField,
  } from '@mui/material';
  import Grid from '@mui/material/Unstable_Grid2';
  import React, { useState } from 'react';
  
  const Screen_Issues = [
    'Vitre à casée tactile fonctionnel',
    'Vitre tactil et LCD fonctionnel',
  ];
  
  export default function DisplayRapportAvant({ open, onClose }) {
    const [formData, setFormData] = useState({
      ecran: '',
      arrier: '',
      items: {
        allumage: false,
        charge: false,
        cameraAvant: false,
        cameraArriere: false,
        reseau: false,
        wifi: false,
        micro: false,
        vibreur: false,
        ecouteur: false,
        hautParleur: false,
        capteurProximite: false,
        priseJack: false,
        tactile: false,
        lecteur: false,
        choc: false,
        teste: false,
      },
      observation: '',
    });
  
    const handleChange = (field, value) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    };
  
    const handleCheckboxChange = (field) => {
      setFormData((prev) => ({
        ...prev,
        items: {
          ...prev.items,
          [field]: !prev.items[field],
        },
      }));
    };
  
    const handleClose = () => {
      onClose();
    };
  
    return (
      <Dialog maxWidth="md" fullWidth open={open} onClose={onClose}>
        <DialogTitle>RAPPORT DE PRISE EN CHARGE DU MATERIEL VISIBLE PAR LE CLIENT</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} p={1}>
            <Grid xs={6}>
              <FormControl fullWidth>
                <InputLabel>Écran</InputLabel>
                <Select
                  value={formData.ecran}
                  onChange={(e) => handleChange('ecran', e.target.value)}
                >
                  <MenuItem value="">Rien à signaler</MenuItem>
                  {Screen_Issues.map((option, i) => (
                    <MenuItem key={i} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={6}>
              <FormControl fullWidth>
                <InputLabel>Arrière</InputLabel>
                <Select
                  value={formData.arrier}
                  onChange={(e) => handleChange('arrier', e.target.value)}
                >
                  <MenuItem value="">Rien à signaler</MenuItem>
                  {Screen_Issues.map((option, i) => (
                    <MenuItem key={i} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
  
            {Object.keys(formData.items).map((item) => (
              <Grid key={item} xs={6}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.items[item]}
                      onChange={() => handleCheckboxChange(item)}
                    />
                  }
                  label={item.replace(/([A-Z])/g, ' $1').trim()} // Convert camelCase to readable text
                />
              </Grid>
            ))}
  
            <Grid xs={12}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Observation"
                value={formData.observation}
                onChange={(e) => handleChange('observation', e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fermer</Button>
          <Button variant="contained" color="primary" onClick={handleClose}>
            Rapport
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
  