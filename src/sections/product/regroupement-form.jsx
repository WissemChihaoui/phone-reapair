import { z as zod } from 'zod';
import { toast } from 'sonner';
import React, { useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import { Card, Chip, Stack, TextField, Autocomplete } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { Form, Field } from 'src/components/hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export const NewProductSchema = zod.object({
    name: zod.string().min(1, { message: "Nom de regroupement est requis!" }),
    description: zod.string().min(1, { message: "Description de regroupement est requis!" }),
})

export default function RegroupementForm({ currentData }) {
  const router = useRouter();

  const productsData = [
    { value: 1, label: 'Article 1' },
    { value: 2, label: 'Article 2' },
    { value: 3, label: 'Article 3' },
    { value: 4, label: 'Article 4' },
  ];

  const defaultValues = useMemo(
    () => ({
      name: currentData?.name || '',
      description: currentData?.description || '',
      products: currentData?.products || [],
    }),
    [currentData]
  );
  const methods = useForm({
    resolver: zodResolver(NewProductSchema),
    defaultValues,
  });
  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(currentData ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.stock.regroupement);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });
  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Card>
        <Stack spacing={3} sx={{ p: 3 }}>
          <Field.Text name="name" label="Libellé" />

          <Field.Text name="description" label="Description" multiline rows={4} />
          <Controller
            name="products"
            control={methods.control}
            render={({ field }) => (
              <Autocomplete
                multiple
                fullWidth
                options={productsData}
                getOptionLabel={(option) => option.label}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                value={field.value}
                onChange={(_, newValue) => field.onChange(newValue)}
                renderInput={(params) => (
                  <TextField {...params} label="Articles" placeholder="Articles" />
                )}
                renderOption={(props, option) => (
                  <li {...props} key={option.value}>
                    {option.label}
                  </li>
                )}
                renderTags={(selected, getTagProps) =>
                  selected.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={option.value}
                      label={option.label}
                      size="small"
                      variant="soft"
                    />
                  ))
                }
              />
            )}
          />
        </Stack>
        <Stack
          p={3}
          spacing={3}
          direction="row"
          justifyContent="right"
          alignItems="center"
          flexWrap="wrap"
        >
          <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
            {!currentData ? 'Créer un regroupement' : 'Modifier un regroupement'}
          </LoadingButton>
        </Stack>
      </Card>
    </Form>
  );
}
