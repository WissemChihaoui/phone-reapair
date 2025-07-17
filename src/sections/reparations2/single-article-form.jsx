import { useFieldArray, useFormContext } from 'react-hook-form';

import Grid from '@mui/material/Unstable_Grid2';
import { Stack, Button, Divider } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';

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
  { value: 'laptop', label: 'Laptop' }
];

const BRANDS = [
  { value: '', label: 'Choisir ...' },
  { value: 'apple', label: 'Apple' },
  { value: 'samsung', label: 'Samsung' }
];

const MODELS = [
  { value: '', label: 'Choisir ...' },
  { value: 'iphone13', label: 'iPhone 13' },
  { value: 'galaxy22', label: 'Galaxy S22' }
];

const TECHNICIANS = [
  { value: '', label: 'Choisir ...' },
  { value: 'tech1', label: 'Jean Dupont' },
  { value: 'tech2', label: 'Marie Martin' }
];

const CONDITIONS = [
  { value: '', label: 'Choisir ...' },
  { value: 'new', label: 'Comme neuf' },
  { value: 'good', label: 'Bon état' }
];

export default function SingleArticleForm({ articleIndex, onTotalChange }) {
  const { control, watch, setValue } = useFormContext();
  const { fields: documents, append, remove, update } = useFieldArray({
    control,
    name: `articles[${articleIndex}].documents`
  });

  const openRapport = useBoolean();
  const openPad = useBoolean();
  const openAddMarque = useBoolean();
  const openAddModele = useBoolean();

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
  const currentMaterial = MATERIAL_TYPES.find(opt => opt.value === currentValues?.type) || MATERIAL_TYPES[0];
  const currentBrand = BRANDS.find(opt => opt.value === currentValues?.marque) || BRANDS[0];
  const currentModel = MODELS.find(opt => opt.value === currentValues?.modele) || MODELS[0];
  const currentCondition = CONDITIONS.find(opt => opt.value === currentValues?.etat) || CONDITIONS[0];
  const currentTechnician = TECHNICIANS.find(opt => opt.value === currentValues?.technicien) || TECHNICIANS[0];

  return (
    <>
      <Grid container spacing={2}>
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
            <Button color='success' variant="contained" onClick={openAddMarque.onTrue}>+</Button>
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
            <Button color='success' variant="contained" onClick={openAddModele.onTrue}>+</Button>
          </Stack>
        </Grid>

        {/* Article Details Section */}
        <Grid xs={12} lg={8}>
          <Field.Text 
            control={control}
            name={`articles[${articleIndex}].serie`} 
            label="N° Série / IMEI" 
          />
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
            color='warning'
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
            label="Note Client" 
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
            color='warning'
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

      {/* Modals */}
      <RapportPanneModal 
        index={articleIndex} 
        open={openRapport.value} 
        onClose={openRapport.onFalse} 
      />
      <LockPadModal 
        index={articleIndex} 
        open={openPad.value} 
        onClose={openPad.onFalse} 
      />
      <MarqueAddModal 
        open={openAddMarque.value} 
        onClose={openAddMarque.onFalse} 
      />
      <ModeleAddModal 
        open={openAddModele.value} 
        onClose={openAddModele.onFalse} 
      />
    </>
  );
}