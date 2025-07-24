import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Divider from '@mui/material/Divider';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import FormControlLabel from '@mui/material/FormControlLabel';
import {
  Grid,
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  CardContent,
  IconButton,
  Tooltip,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fDate, today } from 'src/utils/format-time';

import { _tags, JOB_WORKING_SCHEDULE_OPTIONS, PRODUCT_CATEGORY_GROUP_OPTIONS } from 'src/_mock';

import { toast } from 'src/components/snackbar';
import { TableHeadCustom } from 'src/components/table';
import { Form, Field, schemaHelper } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';

export const telephonicArticles = [
  { id: 1, title: 'iPhone 14 Pro Max' },
  { id: 2, title: 'Samsung Galaxy S23 Ultra' },
  { id: 3, title: 'Xiaomi Redmi Note 12' },
  { id: 4, title: 'OnePlus 11' },
  { id: 5, title: 'Huawei P60 Pro' },
  { id: 6, title: 'Oppo Find X6' },
  { id: 7, title: 'Google Pixel 8 Pro' },
  { id: 8, title: 'Realme GT Neo 5' },
  { id: 9, title: 'Sony Xperia 1 V' },
  { id: 10, title: 'Motorola Edge 40 Pro' },
];

// ----------------------------------------------------------------------

export const NewProductSchema = zod.object({
  name: zod.string().min(1, { message: "Nom d'article est requis!" }),
  description: schemaHelper.editor({ message: { required_error: 'Description is required!' } }),
  images: schemaHelper.files({ message: { required_error: 'Images is required!' } }),
  code: zod.string().min(1, { message: 'Product code is required!' }),
  sku: zod.string().min(1, { message: 'Product sku is required!' }),
  quantity: zod.number().min(1, { message: 'Quantity is required!' }),
  colors: zod.string().array().nonempty({ message: 'Choose at least one option!' }),
  sizes: zod.string().array().nonempty({ message: 'Choose at least one option!' }),
  tags: zod.string().array().min(2, { message: 'Must have at least 2 items!' }),
  gender: zod.string().array().nonempty({ message: 'Choose at least one option!' }),
  price: zod.number().min(1, { message: 'Price should not be $0.00' }),
  // Not required
  category: zod.string(),
  priceSale: zod.number(),
  subDescription: zod.string(),
  taxes: zod.number(),
  saleLabel: zod.object({ enabled: zod.boolean(), content: zod.string() }),
  newLabel: zod.object({ enabled: zod.boolean(), content: zod.string() }),
  suggested: zod
    .array(
      zod.object({
        title: zod.string(),
      })
    )
    .optional(),
});

// ----------------------------------------------------------------------

export function ProductNewEditForm({ currentProduct }) {
  const router = useRouter();

  const [includeTaxes, setIncludeTaxes] = useState(false);

  const defaultValues = useMemo(
    () => ({
      //  details

      name: currentProduct?.name || '',
      description: currentProduct?.description || '',
      coverUrl: currentProduct?.coverUrl || '',
      category: currentProduct?.category || PRODUCT_CATEGORY_GROUP_OPTIONS[0].classify[1],
      sousCategory: currentProduct?.sousCategory || PRODUCT_CATEGORY_GROUP_OPTIONS[0].classify[1],

      //  properties

      casier: currentProduct?.casier || 0,
      fournisseur: currentProduct?.fournisseur || 0,
      refInterne: currentProduct?.refInterne || '',
      refFournisseur: currentProduct?.refFournisseur || '',
      ean: currentProduct?.ean || '',
      link: currentProduct?.link || '',
      quantity: currentProduct?.quantity || 0,
      garantie: currentProduct?.garantie || 0,
      isGarantieVisible: currentProduct?.isGarantieVisible || false,
      dateAchat: currentProduct?.dateAchat || null,
      facture: currentProduct?.facture || '',
      multiple: currentProduct?.multiple || false,
      imei: currentProduct?.imei || '',
      tauxTva: currentProduct?.tauxTva || 0,
      sellPriceHt: currentProduct?.sellPriceHt || 0,
      buyPriceHt: currentProduct?.buyPriceHt || 0,
      buyPriceTtc: currentProduct?.buyPriceTtc || 0,
      margeBrutPercent: currentProduct?.margeBrutPercent || 0,
      tauxDeMarquePercent: currentProduct?.tauxDeMarquePercent || 0,
      tva: currentProduct?.tva || 0,
      margeBrute: currentProduct?.margeBrute || 0,
      tauxDeMarque: currentProduct?.tauxDeMarque || 0,
      suggested: currentProduct?.suggested || [],
    }),
    [currentProduct]
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

  const quantityWatch = watch('quantity');
  const multipleWatch = watch('multiple');

  useEffect(() => {
    console.log(multipleWatch);
  }, [multipleWatch]);

  useEffect(() => {
    if (currentProduct) {
      reset(defaultValues);
    }
  }, [currentProduct, defaultValues, reset]);

  useEffect(() => {
    if (includeTaxes) {
      setValue('taxes', 0);
    } else {
      setValue('taxes', currentProduct?.taxes || 0);
    }
  }, [currentProduct?.taxes, includeTaxes, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      toast.success(currentProduct ? 'Update success!' : 'Create success!');
      router.push(paths.dashboard.product.root);
      console.info('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const handleRemoveFile = useCallback(() => {
    setValue('coverUrl', null);
  }, [setValue]);
  const [imageExist, setImageExist] = useState(!!watch('coverUrl'));

  const renderDetails = (
    <Card>
      <CardHeader title="Détails" subheader="Libellé, Description, Image de base " sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Text name="name" label="Libellé" />

        <Field.Text name="description" label="Description" multiline rows={4} />

        <Stack spacing={1.5}>
          <Stack
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="subtitle2">Image Couverture</Typography>
            <FormControlLabel
              control={
                <Switch checked={imageExist} onChange={() => setImageExist((prev) => !prev)} />
              }
              label="Contient l'image"
            />
          </Stack>
          {imageExist && (
            <Field.Upload name="coverUrl" maxSize={3145728} onDelete={handleRemoveFile} />
          )}
        </Stack>
        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          <Field.Select native name="category" label="Catégorie" InputLabelProps={{ shrink: true }}>
            {PRODUCT_CATEGORY_GROUP_OPTIONS.map((category) => (
              <optgroup key={category.group} label={category.group}>
                {category.classify.map((classify) => (
                  <option key={classify} value={classify}>
                    {classify}
                  </option>
                ))}
              </optgroup>
            ))}
          </Field.Select>
          <Field.Select
            native
            name="sousCategory"
            label="Sous Catégorie"
            InputLabelProps={{ shrink: true }}
          >
            {PRODUCT_CATEGORY_GROUP_OPTIONS.map((category) => (
              <optgroup key={category.group} label={category.group}>
                {category.classify.map((classify) => (
                  <option key={classify} value={classify}>
                    {classify}
                  </option>
                ))}
              </optgroup>
            ))}
          </Field.Select>
        </Box>
      </Stack>
    </Card>
  );

  const renderProperties = (
    <Card>
      <CardHeader title="Propriétés" subheader="Stockage, Fournisseur, Réferences" sx={{ mb: 3 }} />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Box
          columnGap={2}
          rowGap={3}
          display="grid"
          gridTemplateColumns={{ xs: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)' }}
        >
          <Field.Select
            native
            name="casier"
            label="Casier de stockage"
            InputLabelProps={{ shrink: true }}
          >
            {['casier 1', 'casier 2', 'casier 3'].map((caiser, index) => (
              <option key={index} value={index}>
                {caiser}
              </option>
            ))}
          </Field.Select>
          <Field.Select
            native
            name="fournisseur"
            label="Fournisseur"
            InputLabelProps={{ shrink: true }}
          >
            {['Fournisseur 1', 'Fournisseur 2', 'Fournisseur 3'].map((caiser, index) => (
              <option key={index} value={index}>
                {caiser}
              </option>
            ))}
          </Field.Select>
          <Field.Text name="refInterne" label="Réf Interne" />
          <Field.Text name="refFournisseur" label="Réf Fournisseur" />

          <Field.Text name="ean" label="EAN - Cade Barre" />

          <Field.Text
            name="quantity"
            label="Qté"
            placeholder="0"
            type="number"
            InputLabelProps={{ shrink: true }}
          />
          <Field.Select native name="garantie" label="Garantie" InputLabelProps={{ shrink: true }}>
            {[
              'Pas de garantie',
              '1 Mois',
              '3 Mois',
              '6 Mois',
              '12 Mois',
              '24 Mois',
              'Garantie à vie',
              'Autre',
            ].map((caiser, index) => (
              <option key={index} value={index}>
                {caiser}
              </option>
            ))}
          </Field.Select>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Field.Switch name="isGarantieVisible" label={null} sx={{ m: 0 }} />
            <Typography variant="body">Visible sur la facture</Typography>
          </Stack>

          <Field.DatePicker name="dateAchat" label="Date d'achat" />

          <Field.Text name="facture" label="N° Facture" />
        </Box>
        <Box>
          <Field.Text name="link" label="Lien d'article" helperText="Sur le site du fournisseur" />
        </Box>
      </Stack>
    </Card>
  );

  const renderImei = (
    <Card>
      <CardHeader title="IMEI/ N° Série" subheader="IMEI de produits" sx={{ mb: 3 }} />
      <Divider />
      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack direction="row" alignItems="center" spacing={3}>
          <Field.Switch name="multiple" label={null} sx={{ m: 0 }} />
          <Typography variant="body">Multiple</Typography>
        </Stack>

        {multipleWatch ? (
          // Render multiple IMEI fields based on the quantity
          Array.from({ length: quantityWatch }).map((_, index) => (
            <Field.Text
              key={index}
              name={`imei[${index}]`} // Dynamically name each IMEI field
              label={`IMEI/N° Série ${index + 1}`} // Label the IMEI field based on index
            />
          ))
        ) : (
          // Single IMEI field if multiple is false
          <Field.Text name="imei" label="IMEI/N° Série" />
        )}
      </Stack>
    </Card>
  );

  const renderPricing = (
    <Card>
      <CardHeader
        title="Tarification"
        subheader="TVA, Marge brut, Prix, Taux de marque,..."
        sx={{ mb: 3 }}
      />

      <Divider />

      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Select native name="tauxTva" label="Taux TVA">
          {[
            '20',
            '10',
            '5',
            '2',
            '8.5',
            'TVA non applicable',
            'TVA sur marge',
            '16',
            '21',
            '7.70',
            '7',
          ].map((tva, index) => (
            <option value={tva} key={index}>
              {tva}
            </option>
          ))}
        </Field.Select>
        <Divider />
        <Grid container>
          <Grid xs={12} padding={1}>
            <Field.Text
              name="sellPriceHt"
              label="Prix d'achat (HT)"
              placeholder="0.00"
              type="number"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Box component="span" sx={{ color: 'text.disabled' }}>
                      €
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid xs={12} md={6} padding={1}>
            <Field.Text
              name="buyPriceHt"
              label="Prix de vente (HT)"
              placeholder="0.00"
              type="number"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Box component="span" sx={{ color: 'text.disabled' }}>
                      €
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid xs={12} md={6} padding={1}>
            <Field.Text
              name="buyPriceTtc"
              label="Prix de vente (TTC)"
              placeholder="0.00"
              type="number"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <Box component="span" sx={{ color: 'text.disabled' }}>
                      €
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid xs={12} md={6} padding={1}>
            <Field.Text
              name="margeBrutPercent"
              label="Marge brut %"
              placeholder="0.00"
              type="number"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Box component="span" sx={{ color: 'text.disabled' }}>
                      %
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid xs={12} md={6} padding={1}>
            <Field.Text
              name="tauxDeMarquePercent"
              label="Taux de marque en %"
              placeholder="0.00"
              type="number"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Box component="span" sx={{ color: 'text.disabled' }}>
                      %
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
        <Divider />
        <Field.Text
          name="tva"
          label="TVA"
          placeholder="0.00"
          type="number"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Box component="span" sx={{ color: 'text.disabled' }}>
                  €
                </Box>
              </InputAdornment>
            ),
          }}
        />

        <Field.Text
          name="margeBrute"
          label="Marge brute €"
          placeholder="0.00"
          type="number"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Box component="span" sx={{ color: 'text.disabled' }}>
                  €
                </Box>
              </InputAdornment>
            ),
          }}
        />

        <Field.Text
          name="tauxDeMarque"
          label="Taux de marque €"
          placeholder="0.00"
          type="number"
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Box component="span" sx={{ color: 'text.disabled' }}>
                  €
                </Box>
              </InputAdornment>
            ),
          }}
        />
      </Stack>
    </Card>
  );

  const renderSuggestions = (
    <Card>
      <CardHeader
        title="Produits suggérés"
        subheader="Ajouter des articles similaires ou associés"
        action={
          <Tooltip title="Hello, this is an explanation sections, you should expect a long text inside this tooltip.">
            <IconButton>
              <Iconify icon="material-symbols:info-outline" />
            </IconButton>
          </Tooltip>
        }
      />
      <Divider /> 
      <Stack spacing={3} sx={{ p: 3 }}>
        <Field.Autocomplete
            name="workingSchedule"
            placeholder="Produits suggérés"
            multiple
            disableCloseOnSelect
            options={telephonicArticles.map((option) => option.title)}
            getOptionLabel={(option) => option}
            renderOption={(props, option) => (
              <li {...props} key={option}>
                {option}
              </li>
            )}
            renderTags={(selected, getTagProps) =>
              selected.map((option, index) => (
                <Chip
                  {...getTagProps({ index })}
                  key={option}
                  label={option}
                  size="small"
                  color="info"
                  variant="soft"
                />
              ))
            }
          />
      </Stack>
    </Card>
  );

  const renderActions = (
    <Stack
      mt={3}
      spacing={3}
      direction="row"
      width="100%"
      display="flex"
      justifyContent="flex-end"
      alignItems="center"
      flexWrap="wrap"
    >
      <Button
        variant="outlined"
        size="large"
        onClick={() => router.push(paths.dashboard.stock.root)}
      >
        Annuler
      </Button>
      <LoadingButton
        type="submit"
        variant="contained"
        size="large"
        color="primary"
        loading={isSubmitting}
      >
        {!currentProduct ? 'Créer Article' : 'Modifier'}
      </LoadingButton>
    </Stack>
  );

  const TABLE_HEAD = [
    { id: 'raison', label: 'Raison' },
    { id: 'adjust', label: 'Ajustement' },
    { id: 'prevQte', label: 'Ancienne Quantité' },
    { id: 'newQte', label: 'Nouvelle Quantité' },
    { id: 'date', label: 'Date' },
    { id: 'note', label: 'Note' },
    { id: 'fournisseur', label: 'Fournisseur' },
  ];

  const TABLE_DATA = [
    {
      id: 1,
      raison: 'Entreé',
      adjust: 'Rachat',
      prevQte: 80,
      newQte: 90,
      date: today(),
      note: 'Dis qc',
      fournisseur: 'Wissem Chihaoui',
    },
  ];

  const renderAdjustTable = (
    <Card sx={{ my: { xs: 3, md: 5 } }}>
      <CardHeader
        title="Les entrées/sorties"
        subheader="Historique ajustement des entrées et des sorties"
        sx={{ mb: 3 }}
      />
      <CardContent>
        <Table>
          <TableHeadCustom headLabel={TABLE_HEAD} />
          <TableBody>
            {TABLE_DATA.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.raison}</TableCell>
                <TableCell>{row.adjust}</TableCell>
                <TableCell>{row.prevQte}</TableCell>
                <TableCell>{row.newQte}</TableCell>
                <TableCell>{fDate(row.date)}</TableCell>
                <TableCell>{row.note}</TableCell>
                <TableCell>{row.fournisseur}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Stack
        display="grid"
        gridTemplateColumns={{
          sm: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
        spacing={{ xs: 3, md: 5 }}
        sx={{ mx: 'auto' }}
      >
        {renderDetails}

        {renderProperties}

        {renderImei}

        {renderPricing}

        {renderSuggestions}
      </Stack>
      {currentProduct && renderAdjustTable}
      {renderActions}
    </Form>
  );
}
