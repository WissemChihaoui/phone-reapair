import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { _tags } from 'src/_mock';

import { toast } from 'src/components/snackbar';
import { Form, Field, schemaHelper } from 'src/components/hook-form';
import { MenuItem } from '@mui/material';

// import { PostDetailsPreview } from './post-details-preview';

// ----------------------------------------------------------------------

export const NewPostSchema = zod.object({
  title: zod.string().min(1, { message: 'Titre est requis:' }),
  description: zod.string().min(1, { message: 'Description est requis!' }),
  content: schemaHelper.editor().min(100, { message: 'Content must be at least 100 characters' }),
  coverUrl: schemaHelper.file({ message: { required_error: 'Cover is required!' } }),
  tags: zod.string().array().min(2, { message: 'Must have at least 2 items!' }),
  metaKeywords: zod.string().array().nonempty({ message: 'Meta keywords is required!' }),
  // Not required
  metaTitle: zod.string(),
  metaDescription: zod.string(),
});

// ----------------------------------------------------------------------

export function PostNewEditForm() {
  const router = useRouter();

  const preview = useBoolean();

  const defaultValues = useMemo(
    () => ({
      title: '',
      description: '',
      content: '',
      coverUrl: null,
      tags: [],
      metaKeywords: [],
      metaTitle: '',
      metaDescription: '',
    }),
    []
  );

  const methods = useForm({
    mode: 'all',
    resolver: zodResolver(NewPostSchema),
    defaultValues,
  });
  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      preview.onFalse();
      toast.success('Create success!');
      router.push(paths.dashboard.post.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleRemoveFile = useCallback(() => {
    setValue('coverUrl', null);
  }, [setValue]);

  const renderDetails = (
    <Card>
      <CardHeader
        title="Ajouter Ticket"
        subheader="Ajouter ticket de support technique"
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="title" label="Titre" />
        <Field.Select name="priority" label="Priorité">
          {[
            { value: 'Faible', label: 'Faible' },
            { value: 'Moyen', label: 'Moyen' },
            { value: 'Hauteur', label: 'Hauteur' },
            { value: 'Urgent', label: 'Urgent' },
          ].map((option) => (
            <MenuItem key={option.value} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </Field.Select>
        <Field.Select name="category" label="Catégorie">
          {[
            { value: '0', label: 'Erreur PHP' },
            { value: '1', label: 'Erreur Fonctionnalité' },
            { value: '2', label: 'Autre' },
          ].map((option) => (
            <MenuItem key={option.value} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </Field.Select>
        <Field.Text name="description" label="Description" multiline rows={3} />

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Fichier</Typography>
          <Field.UploadBox
            sx={{ width: 1 }}
            name="coverUrl"
            maxSize={3145728}
            onDelete={handleRemoveFile}
          />
        </Stack>
      </Stack>
    </Card>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack spacing={5} sx={{ mx: 'auto', maxWidth: { xs: 720, xl: 880 } }}>
        {renderDetails}
      </Stack>
    </Form>
  );
}
