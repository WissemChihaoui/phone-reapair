import { useFieldArray, useFormContext } from 'react-hook-form';

import Grid from '@mui/material/Unstable_Grid2';
import {
  Stack,
  Button,
  Divider,
  Typography,
  Autocomplete,
  TextField,
  MenuItem,
  Tooltip,
  IconButton,
} from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

import { _etat } from 'src/_mock/_rep';

import { Iconify } from 'src/components/iconify';
import { Field } from 'src/components/hook-form';

import LockPadModal from './lock-pad-modal';
import ModeleAddModal from './model-add-modal';
import MarqueAddModal from './marque-add-modal';
import RapportPanneModal from './rapport-panne-modal';
import DocumentSectionView from './document/document-section-view';

const MATERIAL_TYPES = [
  { value: '', label: 'Choisir ...' },
  { value: 'smartphone', label: 'Smartphone' },
  { value: 'tablet', label: 'Tablet' },
  { value: 'laptop', label: 'Laptop' },
];

const BRANDS = [
  { value: '', label: 'Choisir ...' },
  { value: 'apple', label: 'Apple' },
  { value: 'samsung', label: 'Samsung' },
];

const MODELS = [
  { value: '', label: 'Choisir ...' },
  { value: 'iphone13', label: 'iPhone 13' },
  { value: 'galaxy22', label: 'Galaxy S22' },
];

const TECHNICIANS = [
  { value: '', label: 'Choisir ...' },
  { value: 'tech1', label: 'Jean Dupont' },
  { value: 'tech2', label: 'Marie Martin' },
];

const CONDITIONS = [
  { value: '', label: 'Choisir ...' },
  { value: 'new', label: 'Comme neuf' },
  { value: 'good', label: 'Bon état' },
];

const ACCESSOIRE = [
  { value: '1', label: 'Accessoir 1' },
  { value: '2', label: 'Accessoir 2' },
  { value: '3', label: 'Accessoir 3' },
];

export default function SingleArticleForm({ articleIndex, onTotalChange }) {
  const { control, watch, setValue } = useFormContext();
  const {
    fields: documents,
    append,
    remove,
    update,
  } = useFieldArray({
    control,
    name: `articles[${articleIndex}].documents`,
  });

  const openRapport = useBoolean();
  const openPad = useBoolean();
  const openAddMarque = useBoolean();
  const openAddModele = useBoolean();
  const openAddAccessoire = useBoolean();

  const currentValues = watch(`articles[${articleIndex}]`);

  const handleAddDocument = (newDoc) => {
    append({ ...newDoc, id: Date.now().toString() });
  };

  const handleRemoveDocument = (index) => {
    remove(index);
  };

  const handleUpdateDocument = (index, updatedDoc) => {
    update(index, updatedDoc);
  };

  const handleUpdateTotal = (newTotal) => {
    setValue(`articles[${articleIndex}].total`, newTotal);
    onTotalChange();
  };

  // Get current values for proper Autocomplete handling
  const currentMaterial =
    MATERIAL_TYPES.find((opt) => opt.value === currentValues?.type) || MATERIAL_TYPES[0];
  const currentBrand = BRANDS.find((opt) => opt.value === currentValues?.marque) || BRANDS[0];
  const currentModel = MODELS.find((opt) => opt.value === currentValues?.modele) || MODELS[0];
  const currentCondition =
    CONDITIONS.find((opt) => opt.value === currentValues?.etat) || CONDITIONS[0];
  const currentTechnician =
    TECHNICIANS.find((opt) => opt.value === currentValues?.technicien) || TECHNICIANS[0];

  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Typography>Matériels déjà réparés pour ce client:</Typography>
            <Autocomplete
              sx={{ width: 220 }}
              fullWidth
              options={[]}
              getOptionLabel={(option) => option.title}
              renderInput={(params) => (
                <TextField {...params} label="Sélectionnez le matériel" margin="none" />
              )}
              renderOption={(props, option) => (
                <MenuItem {...props} key={option.title}>
                  {option.title}
                </MenuItem>
              )}
            />
            <Tooltip
              title={`Cette fonctionnalité Affiche les équipements que ce client a déjà fait réparer dans la boutique, pour simplifier le suivi et la création d'une nouvelle intervention. `}
            >
              <IconButton>
                <Iconify icon="material-symbols:info-outline-rounded" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Grid>
        {/* Article Identification Section */}
        <Grid xs={12} md={6} lg={4}>
          <Field.Autocomplete
            control={control}
            name={`articles[${articleIndex}].type`}
            label="Type de matériel"
            options={MATERIAL_TYPES}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.value === value?.value}
            value={currentMaterial}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <Stack spacing={1.5} direction="row">
            <Field.Autocomplete
              control={control}
              sx={{ width: '100%' }}
              name={`articles[${articleIndex}].marque`}
              label="Marque"
              options={BRANDS}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => option.value === value?.value}
              value={currentBrand}
            />
            <Button color="success" variant="contained" onClick={openAddMarque.onTrue}>
              +
            </Button>
          </Stack>
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <Stack spacing={1.5} direction="row">
            <Field.Autocomplete
              control={control}
              sx={{ width: '100%' }}
              name={`articles[${articleIndex}].modele`}
              label="Modèle"
              options={MODELS}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => option.value === value?.value}
              value={currentModel}
            />
            <Button color="success" variant="contained" onClick={openAddModele.onTrue}>
              +
            </Button>
          </Stack>
        </Grid>

        {/* Article Details Section */}
        <Grid xs={12} md={4}>
          <Field.Text
            control={control}
            name={`articles[${articleIndex}].serie`}
            label="N° Série / IMEI"
          />
        </Grid>

        <Grid xs={12} md={4}>
          <Stack spacing={1.5} direction="row">
            <Field.Autocomplete
              control={control}
              sx={{ width: '100%' }}
              name={`articles[${articleIndex}].etat`}
              label="Accessoire"
              options={ACCESSOIRE}
              getOptionLabel={(option) => option.label}
              isOptionEqualToValue={(option, value) => option.value === value?.value}
              value={currentCondition}
            />
            <Button color="success" variant="contained" onClick={openAddAccessoire.onTrue}>
              +
            </Button>
          </Stack>
        </Grid>
        <Grid xs={12} md={4}>
          <Field.Autocomplete
            control={control}
            name={`articles[${articleIndex}].etat`}
            label="État"
            options={CONDITIONS}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.value === value?.value}
            value={currentCondition}
          />
        </Grid>

        <Grid xs={12} lg={8}>
          <Field.Text
            control={control}
            name={`articles[${articleIndex}].accessoire`}
            label="Accessoire"
          />
        </Grid>

        {/* Rapport Section */}
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

        {/* Notes Section */}
        <Grid xs={12} md={4}>
          <Field.Text
            control={control}
            name={`articles[${articleIndex}].noteClient`}
            label="Note Client (Code de déverouillage / Code SIM)"
            multiline
            rows={2}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <Field.Text
            control={control}
            name={`articles[${articleIndex}].noteIntervention`}
            label="Note intervention"
            multiline
            rows={2}
          />
        </Grid>

        <Grid xs={12} md={4}>
          <Field.Text
            control={control}
            name={`articles[${articleIndex}].noteInterne`}
            label="Note interne"
            multiline
            rows={2}
          />
        </Grid>

        {/* Additional Actions */}
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
          <Field.DatePicker
            control={control}
            name={`articles[${articleIndex}].dateRestitution`}
            label="Date de restitution"
          />
        </Grid>

        <Grid xs={12} md={4}>
          <Field.Autocomplete
            control={control}
            name={`articles[${articleIndex}].technicien`}
            label="Technicien"
            options={TECHNICIANS}
            getOptionLabel={(option) => option.label}
            isOptionEqualToValue={(option, value) => option.value === value?.value}
            value={currentTechnician}
          />
        </Grid>

        <Grid xs={12}>
          <Divider sx={{ my: 2 }} />
        </Grid>

        {/* Documents Section */}
        <Grid xs={12}>
          <DocumentSectionView
            articleIndex={articleIndex}
            documents={documents}
            onAddDocument={handleAddDocument}
            onRemoveDocument={handleRemoveDocument}
            onUpdateDocument={handleUpdateDocument}
            onTotalChange={handleUpdateTotal}
          />
        </Grid>
      </Grid>

<Grid container spacing={2}>
          <Grid xs={12} md={4}>
            <Typography>Notifications :</Typography>
            <Field.Checkbox label="Email" name="settings.notifications.email" />
            <Field.Checkbox label="SMS" name="settings.notifications.sms" />
          </Grid>
          <Grid xs={12} md={4}>
            <Typography>Etat :</Typography>
            <Field.Select name="settings.etat">
              <MenuItem value="none">No Value</MenuItem>
              <MenuItem value="none">No Value</MenuItem>
              {_etat.map((etat) => (
                <MenuItem key={etat.value} value={etat.value}>
                  {etat.label}
                </MenuItem>
              ))}
            </Field.Select>
          </Grid>
          <Grid xs={12} md={4}>
            <Typography>Casier de rangement :</Typography>
            <Field.Select name="settings.casier">
              <MenuItem value="none">No Value</MenuItem>
            </Field.Select>
          </Grid>
          <Grid xs={12} md={4}>
            <Field.Checkbox name="settings.isMateriel" label="Matériel de prêt" />
            <Field.Text name="settings.materiel" label="Matériel" />
          </Grid>
          <Grid xs={12} md={4}>
            <Typography>Délai de reparation :</Typography>
            <Field.Select name="settings.delai">
              <MenuItem value="none">No Value</MenuItem>
              <Divider/>
              <MenuItem value="24">24 h</MenuItem>
              <MenuItem value="48">48 h</MenuItem>
              <MenuItem value="72">72 h</MenuItem>
              <MenuItem value="24">96 h</MenuItem>
            </Field.Select>
          </Grid>
          <Grid xs={12} md={4}>
            <Typography>Validité du devis :</Typography>
            <Field.Select name="settings.validity">
              <MenuItem value="none">No Value</MenuItem>
              <Divider />
              <MenuItem value="1">1 mois</MenuItem>
              <MenuItem value="2">2 mois</MenuItem>
              <MenuItem value="3">3 mois</MenuItem>
            </Field.Select>
          </Grid>
        </Grid>
      {/* Modals */}
      <RapportPanneModal
        index={articleIndex}
        open={openRapport.value}
        onClose={openRapport.onFalse}
      />
      <LockPadModal index={articleIndex} open={openPad.value} onClose={openPad.onFalse} />
      <MarqueAddModal open={openAddMarque.value} onClose={openAddMarque.onFalse} />
      <ModeleAddModal open={openAddModele.value} onClose={openAddModele.onFalse} />
    </>
  );
}
