import { Divider, MenuItem, Stack, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import { Field } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';


const OPTIONS = [
  { value: 'option 1', label: 'Option 1' },
  { value: 'option 2', label: 'Option 2' },
  { value: 'option 3', label: 'Option 3' },
  { value: 'option 4', label: 'Option 4' },
  { value: 'option 5', label: 'Option 5' },
  { value: 'option 6', label: 'Option 6' },
  { value: 'option 7', label: 'Option 7' },
  { value: 'option 8', label: 'Option 8' },
];


export default function ProduitStepForm() {
  return (
    <>
      <Grid container spacing={4}>
        <Grid xs={12} md={8} p={3}>
          <Stack mb={3}> 
            <Field.Select name="stepTwo.produit" label="Choisir Produit">
              <MenuItem value="">Choisir Produit</MenuItem>
              <Divider sx={{ borderStyle: 'dashed' }} />
              {OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </Field.Select>
          </Stack>
          <Stack mb={3}> 
          <Field.Select name="stepTwo.marque" label="Choisir Marque">
              <MenuItem value="">Choisir Marque</MenuItem>
              <Divider sx={{ borderStyle: 'dashed' }} />
              {OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </Field.Select>
          </Stack>
          <Stack mb={3}> 
            <Field.Text name="stepTwo.refCommerciale" label="Référence commerciale" />
          </Stack>
          <Stack mb={3}> 
            <Field.Text name="stepTwo.serie" label="Numéro de série" />
          </Stack>
          
          <Stack mb={3}> 
          <Field.Select name="stepTwo.naturePanne" label="Nature de la panne">
              <MenuItem value="">Nature de la panne</MenuItem>
              <Divider sx={{ borderStyle: 'dashed' }} />
              {OPTIONS.map((option) => (
                <MenuItem key={option.value} value={option.label}>
                  {option.label}
                </MenuItem>
              ))}
            </Field.Select>
          </Stack>
          <Stack mb={3}> 
            <Field.Text name="stepTwo.iris" label="Code IRIS" />
          </Stack>
        </Grid>
        <Grid xs={12} md={4}>
          <Stack width="100%" mb={3}>
            <Typography>Photo</Typography>
            <Field.UploadBox sx={{ width: "100%", p:2}} name="stepTwo.photo" placeholder={
              <Stack spacing={0.5} alignItems="center">
                <Iconify icon="eva:cloud-upload-fill" width={40} />
                <Typography variant="body2">Photo</Typography>
              </Stack>
            }/>
          </Stack>
          <Stack width="100%" mb={3}>
            <Typography>Photo de la plaque</Typography>
            <Field.UploadBox sx={{ width: "100%", p:2}} name="stepTwo.photoPlaque" placeholder={
              <Stack spacing={0.5} alignItems="center">
                <Iconify icon="eva:cloud-upload-fill" width={40} />
                <Typography variant="body2">Photo de la plaque</Typography>
              </Stack>
            }/>
          </Stack>
          <Stack width="100%" mb={3}>
            <Typography>Bon de dépose</Typography>
            <Field.UploadBox sx={{ width: "100%", p:2}} name="stepTwo.bonDepose" placeholder={
              <Stack spacing={0.5} alignItems="center">
                <Iconify icon="eva:cloud-upload-fill" width={40} />
                <Typography variant="body2">Bon de dépose</Typography>
              </Stack>
            }/>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
