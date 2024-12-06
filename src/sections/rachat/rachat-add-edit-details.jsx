import { Box, Divider, MenuItem, Stack, Typography } from '@mui/material';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { Field } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';


const _ETAT_OPTIONS = [
    { value: 'excellent', label: 'Excellent' },
    { value: 'bien', label: 'Bien' },
    { value: 'moyen', label: 'Moyen' },
    { value: 'mauvais', label: 'Mauvais' },
  ];


export default function RachatAddEditDetails() {

  const {
    watch,
    setValue,
    control,
    formState: { errors },
  } = useFormContext();

  const values = watch()

  return (
    <Box sx={{ p: 3, bgcolor: 'background.neutral' }}>
      <Typography variant="h6" sx={{ color: 'text', mb: 3 }}>
        Produit
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        <Stack alignItems="flex-end" spacing={1.5}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
            <Field.Text
            label="Nom Produit"
            name="product.name"
            size="small"
            InputLabelProps={{ shrink: true }}
            />
            <Field.Text
            label="Accessoire"
            name="product.accessoire"
            size="small"
            InputLabelProps={{ shrink: true }}
            />
            
            <Field.Select size='small' name='product.etat' label="État">
                {_ETAT_OPTIONS.map((row) => (
                    <MenuItem key={row.value} value={row.value}>
                        {row.label}
                    </MenuItem>
                ))}
            </Field.Select>
          </Stack>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
            
            <Field.Text
                label="Numéro CNI"
                name="cni"
                size="small"
                InputLabelProps={{ shrink: true }}
            />
           <Field.Text
            label="N° Série"
            name="product.serie"
            size="small"
            InputLabelProps={{ shrink: true }}
            />
          </Stack>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
            <Field.UploadBox
                name="imageCni"
                placeholder={
                <Stack spacing={0.5} alignItems="center">
                    <Iconify icon="eva:cloud-upload-fill" width={40} />
                    <Typography variant="body2">Image de CNI</Typography>
                </Stack>
                }
                sx={{ mb: 3, py: 2.5, flexGrow: 1, height: 'auto' }}
            />
            <Field.UploadBox
                name="imageFacture"
                placeholder={
                <Stack spacing={0.5} alignItems="center">
                    <Iconify icon="eva:cloud-upload-fill" width={40} />
                    <Typography variant="body2">Facture</Typography>
                </Stack>
                }
                sx={{ mb: 3, py: 2.5, flexGrow: 1, height: 'auto' }}
            />
           
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
