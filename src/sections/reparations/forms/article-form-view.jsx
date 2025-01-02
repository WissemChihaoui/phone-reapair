import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Iconify } from 'src/components/iconify';

export default function ArticleFormView() {
  const { control, setValue, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({ control, name: 'products' });
  const values = watch();
  const handleAdd = () => {
    append({});
  };
  const handleRemove = (index) => {
    remove(index);
  };
  return (
    <Box sx={{ p: 3, bgcolor: 'background.neutral' }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        Article à réparer
      </Typography>
      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((item, index) => (
          <Accordion>
            <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
              <Stack
                display="flex"
                flexDirection="row"
                width={1}
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle1">Produit {index + 1}</Typography>
                <Button
                  size="small"
                  color="error"
                  startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                  onClick={() => handleRemove(index)}
                >
                  Supprimer
                </Button>
              </Stack>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>Formulair produit {index + 1}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
        <Stack
          spacing={3}
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'flex-end', md: 'center' }}
        >
          <Button
            size="small"
            color="primary"
            variant="outlined"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={handleAdd}
            sx={{ flexShrink: 0 }}
          >
            Ajouter Article
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
