import React, { useMemo } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';

import { Card, Stack, Button, IconButton, Chip } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { Form, Field } from 'src/components/hook-form';

// Mock data for autocomplete options
const _inventoryItems = [
  'Engine Oil',
  'Air Filter',
  'Oil Filter',
  'Brake Pads',
  'Spark Plugs',
  'Battery',
  'Tires',
  'Windshield Wipers',
];

export default function InventaireForm({ currentInventaire, onSubmit }) {
  const defaultValues = useMemo(
    () => ({
      note: currentInventaire?.note || '',
      items: currentInventaire?.items?.length
        ? [...currentInventaire.items]
        : [{ title: '', crmQty: 0, realQty: 0 }],
    }),
    [currentInventaire]
  );

  const methods = useForm({
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  return (
    <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Card sx={{ p: 3 }}>
        <Stack spacing={3}>
          <Field.Text name="note" label="Note" />
          <ItemsRepeater control={methods.control} />
          <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
            Enregistrer
          </Button>
        </Stack>
      </Card>
    </Form>
  );
}

function ItemsRepeater({ control }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const handleAddItem = () => append({ title: '', crmQty: 0, realQty: 0 });

  return (
    <>
      <Stack spacing={2}>
        {fields.map((item, index) => (
          <Stack key={item.id} direction="row" spacing={2} alignItems="center">
            <Field.Autocomplete
              name={`items.${index}.title`}
              label="Pièce à changer / Article"
              sx={{ flex: 2 }}
              options={_inventoryItems}
              getOptionLabel={(option) => option}
              renderOption={(props, option) => (
                <li {...props} key={option}>
                  {option}
                </li>
              )}
              renderTags={(selected, getTagProps) =>
                selected.map((option, idx) => (
                  <Chip
                    {...getTagProps({ idx })}
                    key={option}
                    label={option}
                    size="small"
                    color="info"
                    variant="soft"
                  />
                ))
              }
            />

            <Field.Text
              name={`items.${index}.crmQty`}
              label="Qte CRM"
              type="number"
              sx={{ flex: 1 }}
            />

            <Field.Text
              name={`items.${index}.realQty`}
              label="Qte Réel"
              type="number"
              sx={{ flex: 1 }}
            />

            <IconButton color="error" onClick={() => remove(index)} sx={{ mt: 2 }}>
              <Iconify icon="mingcute:delete-line" />
            </IconButton>
          </Stack>
        ))}
      </Stack>

      <Button
        variant="outlined"
        onClick={handleAddItem}
        startIcon={<Iconify icon="mingcute:add-line" />}
        sx={{ alignSelf: 'flex-start' }}
      >
        Ajouter une pièce
      </Button>
    </>
  );
}
