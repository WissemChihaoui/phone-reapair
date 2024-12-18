import { Box, Button, Card, Divider, Stack, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Field, Form } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

export default function ReparationFormView() {
  const defaultValues = {
    articles: [{ delaisReparation: '' }], // Card 1 initial field
    validations: [{ validationDevis: '' }], // Card 2 initial field
  };

  const methods = useForm({
    mode: 'all',
    defaultValues,
  });

  const { control, handleSubmit, watch, formState: { isSubmitting } } = methods;

  // First repeater: Délais réparation
  const { fields: articles, append: addArticle, remove: removeArticle } = useFieldArray({
    control,
    name: 'articles',
  });

  // Second repeater: Validation Devis
  const { fields: validations, append: addValidation, remove: removeValidation } = useFieldArray({
    control,
    name: 'validations',
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      toast.success('Update success!');
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  // Watch the values for validation
  const articleValues = watch('articles');
  const validationValues = watch('validations');

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        {/* First Card: Délais réparation */}
        <Grid xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Box mb={2}>
              <h3>Délais Réparation</h3>
            </Box>
            {articles.map((item, index) => (
              <Box key={item.id} sx={{ mb: 2 }}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Field.Text
                    name={`articles.${index}.delaisReparation`}
                    label={`Délais réparation ${index + 1}`}
                    fullWidth
                  />
                  <Button
                    color="error"
                    startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                    onClick={() => removeArticle(index)}
                  >
                    Supprimer
                  </Button>
                </Box>
                <Divider sx={{ my: 2, borderStyle: 'dashed' }} />
              </Box>
            ))}

            {/* Add Button for Délais réparation */}
            <Stack spacing={3} direction="row" alignItems="center">
              <Button
                size="small"
                color="primary"
                variant="outlined"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={() => addArticle({ delaisReparation: '' })}
                disabled={
                  articles.length > 0 &&
                  !articleValues[articles.length - 1]?.delaisReparation
                }
              >
                Ajouter Article
              </Button>
            </Stack>
          </Card>
        </Grid>

        {/* Second Card: Validation Devis */}
        <Grid xs={12} md={6}>
          <Card sx={{ p: 3 }}>
            <Box mb={2}>
              <h3>Validation Devis</h3>
            </Box>
            {validations.map((item, index) => (
              <Box key={item.id} sx={{ mb: 2 }}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Field.Text
                    name={`validations.${index}.validationDevis`}
                    label={`Validation devis ${index + 1}`}
                    fullWidth
                  />
                  <Button
                    color="error"
                    startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                    onClick={() => removeValidation(index)}
                  >
                    Supprimer
                  </Button>
                </Box>
                <Divider sx={{ my: 2, borderStyle: 'dashed' }} />
              </Box>
            ))}

            {/* Add Button for Validation Devis */}
            <Stack spacing={3} direction="row" alignItems="center">
              <Button
                size="small"
                color="primary"
                variant="outlined"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={() => addValidation({ validationDevis: '' })}
                disabled={
                  validations.length > 0 &&
                  !validationValues[validations.length - 1]?.validationDevis
                }
              >
                Ajouter Validation
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>

      {/* Submit Button */}
      <Stack direction="row" justifyContent="flex-end" spacing={2} mt={3}>
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          Enregistrer
        </Button>
      </Stack>
    </Form>
  );
}
