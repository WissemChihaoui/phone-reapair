import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Grid from '@mui/material/Unstable_Grid2';
import {
  Box,
  Stack,
  Button,
  Tooltip,
  MenuItem,
  TextField,
  Typography,
  IconButton,
  Autocomplete,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import {
  BRANDS,
  MODELS,
  ACCESSOIRE,
  CONDITIONS,
  TECHNICIANS,
  MATERIAL_TYPES,
  PREVIOUS_ARTICLE,
} from 'src/_mock/_reparations';

import { Iconify } from 'src/components/iconify';
import { Field } from 'src/components/hook-form';

import LockPadModal from './lock-pad-modal';
import RapportPanneModal from './rapport-panne-modal';
import ModeleAddModal from '../reparations/model-add-modal';
import MarqueAddModal from '../reparations/marque-add-modal';

export default function ArticleFormView() {
  const openAddMarque = useBoolean();
  const openAddModele = useBoolean();
  const openRapport = useBoolean();
  const openPad = useBoolean();

  const { setValue } = useFormContext();
  const [selectedPrevious, setSelectedPrevious] = useState(null);

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Grid container spacing={2}>
            {/* Previously Repaired Material */}
            <Grid xs={12}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <Typography>Matériels déjà réparés pour ce client:</Typography>

                <Autocomplete
                  sx={{ width: 300 }}
                  fullWidth
                  value={selectedPrevious}
                  onChange={(event, newValue) => {
                    setSelectedPrevious(newValue);
                    if (newValue?.article) {
                      const fields = newValue.article;

                      setValue('article.materiel', fields.materiel || '');
                      setValue('article.marque', fields.marque || '');
                      setValue('article.modele', fields.modele || '');
                      setValue('article.imei', fields.imei || '');
                      setValue('article.accessoire', fields.accessoire || []);
                      setValue('article.etat', fields.etat || '');
                      setValue('article.rapport', fields.rapport || { items: [], observation: '' });
                      setValue('article.noteClient', fields.noteClient || '');
                      setValue('article.noteIntervention', fields.noteIntervention || '');
                      setValue('article.noteInterne', fields.noteInterne || '');
                      setValue('article.schemaVer', fields.schemaVer || []);
                      setValue('article.dateRestitution', fields.dateRestitution || null);
                      setValue('article.technicien', fields.technicien || '');
                    }
                  }}
                  options={PREVIOUS_ARTICLE}
                  getOptionLabel={(option) => option.label || ''}
                  renderInput={(params) => (
                    <TextField {...params} label="Sélectionnez le matériel" margin="none" />
                  )}
                  renderOption={(props, option) => (
                    <MenuItem {...props} key={option.label}>
                      {option.label}
                    </MenuItem>
                  )}
                />

                <Tooltip title="Affiche les équipements déjà réparés pour simplifier le suivi.">
                  <IconButton>
                    <Iconify icon="material-symbols:info-outline-rounded" />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Grid>

            {/* Type de matériel */}
            <Grid xs={12} md={6} lg={4}>
              <Field.Autocomplete
                name="article.materiel"
                label="Type de matériel"
                options={MATERIAL_TYPES}
                getOptionLabel={(opt) =>
                  typeof opt === 'string'
                    ? MATERIAL_TYPES.find((o) => o.value === opt)?.label || ''
                    : opt?.label || ''
                }
                isOptionEqualToValue={(a, b) => a.value === (b?.value || b)}
              />
            </Grid>

            {/* Marque */}
            <Grid xs={12} md={6} lg={4}>
              <Stack spacing={1.5} direction="row">
                <Field.Autocomplete
                  name="article.marque"
                  sx={{ width: '100%' }}
                  label="Marque"
                  options={BRANDS}
                  getOptionLabel={(opt) =>
                    typeof opt === 'string'
                      ? BRANDS.find((o) => o.value === opt)?.label || ''
                      : opt?.label || ''
                  }
                  isOptionEqualToValue={(a, b) => a.value === (b?.value || b)}
                />
                <Button color="success" variant="contained" onClick={openAddMarque.onTrue}>
                  +
                </Button>
              </Stack>
            </Grid>

            {/* Modèle */}
            <Grid xs={12} md={6} lg={4}>
              <Stack spacing={1.5} direction="row">
                <Field.Autocomplete
                  name="article.modele"
                  sx={{ width: '100%' }}
                  label="Modèle"
                  options={MODELS}
                  getOptionLabel={(opt) =>
                    typeof opt === 'string'
                      ? MODELS.find((o) => o.value === opt)?.label || ''
                      : opt?.label || ''
                  }
                  isOptionEqualToValue={(a, b) => a.value === (b?.value || b)}
                />
                <Button color="success" variant="contained" onClick={openAddModele.onTrue}>
                  +
                </Button>
              </Stack>
            </Grid>

            {/* IMEI */}
            <Grid xs={12} md={8}>
              <Field.Text name="article.imei" label="N° Série / IMEI" />
            </Grid>
            {/* ETAT */}
            <Grid xs={12} md={6} lg={4}>
              <Stack spacing={1.5} direction="row">
                <Field.Autocomplete
                  name="article.etat"
                  sx={{ width: '100%' }}
                  label="Etat"
                  options={CONDITIONS}
                  getOptionLabel={(opt) =>
                    typeof opt === 'string'
                      ? CONDITIONS.find((o) => o.value === opt)?.label || ''
                      : opt?.label || ''
                  }
                  isOptionEqualToValue={(a, b) => a.value === (b?.value || b)}
                />
              </Stack>
            </Grid>

            {/* Accessoires */}
            <Grid xs={12} md={8}>
              <Stack spacing={1.5} direction="row">
                <Field.Autocomplete
                  name="article.accessoire"
                  sx={{ width: '100%' }}
                  label="Accessoire"
                  multiple
                  disableCloseOnSelect
                  options={ACCESSOIRE}
                  getOptionLabel={(opt) =>
                    typeof opt === 'string'
                      ? ACCESSOIRE.find((o) => o.value === opt)?.label || ''
                      : opt?.label || ''
                  }
                  isOptionEqualToValue={(a, b) => a.value === (b?.value || b)}
                />
                <Button color="success" variant="contained" onClick={openAddMarque.onTrue}>
                  +
                </Button>
              </Stack>
            </Grid>

            {/* Rapport Pannes */}

            <Grid xs={12} md={4}>
              <Button
                sx={{ height: '100%' }}
                color="warning"
                fullWidth
                variant="contained"
                onClick={openRapport.onTrue}
                startIcon={<Iconify icon="mingcute:settings-3-fill" />}
              >
                Rapport des pannes
              </Button>
            </Grid>

            <Grid xs={12} md={4}>
              <Field.Text
                name="article.noteClient"
                label="Note Client (Code de déverouillage / Code SIM)"
                multiline
                rows={2}
              />
            </Grid>

            <Grid xs={12} md={4}>
              <Field.Text
                name="article.noteIntervention"
                label="Note intervention"
                multiline
                rows={2}
              />
            </Grid>

            <Grid xs={12} md={4}>
              <Field.Text name="article.noteInterne" label="Note interne" multiline rows={2} />
            </Grid>

            <Grid xs={12} md={4}>
              <Button
                sx={{ height: '100%' }}
                color="warning"
                fullWidth
                variant="contained"
                onClick={openPad.onTrue}
                startIcon={<Iconify icon="mdi:lock-pattern" />}
              >
                Schéma de verrouillage
              </Button>
            </Grid>
            <Grid xs={12} md={4}>
              <Field.DatePicker name="article.dateRestitution" label="Date de restitution" />
            </Grid>
            <Grid xs={12} md={4}>
              <Field.Autocomplete
                name="article.technicien"
                sx={{ width: '100%' }}
                label="Technicien"
                options={TECHNICIANS}
                getOptionLabel={(opt) =>
                  typeof opt === 'string'
                    ? TECHNICIANS.find((o) => o.value === opt)?.label || ''
                    : opt?.label || ''
                }
                isOptionEqualToValue={(a, b) => a.value === (b?.value || b)}
              />
            </Grid>
          </Grid>
        </Stack>
      </Box>

      {/* Modals */}
      <RapportPanneModal open={openRapport.value} onClose={openRapport.onFalse} />
      <MarqueAddModal open={openAddMarque.value} onClose={openAddMarque.onFalse} />
      <ModeleAddModal open={openAddModele.value} onClose={openAddModele.onFalse} />
      <LockPadModal open={openPad.value} onClose={openPad.onFalse} />
    </>
  );
}
