import React, { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import {
  Box,
  Card,
  Stack,
  Button,
  Typography,
  CardContent,
  MenuList,
  MenuItem,
  Divider,
  IconButton,
  TextField,
} from '@mui/material';

import { CustomPopover, usePopover } from 'src/components/custom-popover';
import { Iconify } from 'src/components/iconify';
import { useFormContext, Controller } from 'react-hook-form';
import PieceForm from './forms/piece-form';
import OeuvreForm from './forms/oeuvre-form';
import ServiceForm from './forms/service-form';
import GroupeForm from './forms/groupe-form';

// --- F1 Form: Pieces ---
// Example fields: piece name, quantity, price
// function F1Form({ index, formId, onRemove, formIndex }) {
//   const { control } = useFormContext();

//   return (
//     <Box position="relative">
//       <IconButton
//         size="small"
//         color="error"
//         onClick={() => onRemove(formId)}
//         sx={{ position: 'absolute', top: 8, right: 8 }}
//       >
//         <Iconify icon="solar:trash-bin-trash-bold" />
//       </IconButton>

//       <Card>
//         <CardContent>
//           <Typography variant="h6" gutterBottom>
//             Pièces (F1) - Article #{formIndex + 1}
//           </Typography>

//           <Stack spacing={2}>
//             <Controller
//               name={`products[${formIndex}].pieces[${index}].name`}
//               control={control}
//               defaultValue=""
//               render={({ field }) => (
//                 <TextField {...field} label="Nom de la pièce" fullWidth />
//               )}
//             />

//             <Controller
//               name={`products[${formIndex}].pieces[${index}].quantity`}
//               control={control}
//               defaultValue={1}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Quantité"
//                   type="number"
//                   inputProps={{ min: 1 }}
//                   fullWidth
//                 />
//               )}
//             />

//             <Controller
//               name={`products[${formIndex}].pieces[${index}].price`}
//               control={control}
//               defaultValue=""
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Prix unitaire (€)"
//                   type="number"
//                   inputProps={{ step: 0.01, min: 0 }}
//                   fullWidth
//                 />
//               )}
//             />
//           </Stack>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }

// --- F2 Form: Oeuvre ---
// Example fields: description, hours worked
// function F2Form({ index, formId, onRemove, formIndex }) {
//   const { control } = useFormContext();

//   return (
//     <Box position="relative">
//       <IconButton
//         size="small"
//         color="error"
//         onClick={() => onRemove(formId)}
//         sx={{ position: 'absolute', top: 8, right: 8 }}
//       >
//         <Iconify icon="solar:trash-bin-trash-bold" />
//       </IconButton>

//       <Card>
//         <CardContent>
//           <Typography variant="h6" gutterBottom>
//             Oeuvre (F2) - Article #{formIndex + 1}
//           </Typography>

//           <Stack spacing={2}>
//             <Controller
//               name={`products[${formIndex}].oeuvres[${index}].description`}
//               control={control}
//               defaultValue=""
//               render={({ field }) => (
//                 <TextField {...field} label="Description" multiline rows={3} fullWidth />
//               )}
//             />

//             <Controller
//               name={`products[${formIndex}].oeuvres[${index}].hours`}
//               control={control}
//               defaultValue={0}
//               render={({ field }) => (
//                 <TextField
//                   {...field}
//                   label="Heures travaillées"
//                   type="number"
//                   inputProps={{ min: 0, step: 0.1 }}
//                   fullWidth
//                 />
//               )}
//             />
//           </Stack>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }

// --- F3 Form: Additional notes or diagnostics ---
// function F3Form({ index, formId, onRemove, formIndex }) {
//   const { control } = useFormContext();

//   return (
//     <Box position="relative">
//       <IconButton
//         size="small"
//         color="error"
//         onClick={() => onRemove(formId)}
//         sx={{ position: 'absolute', top: 8, right: 8 }}
//       >
//         <Iconify icon="solar:trash-bin-trash-bold" />
//       </IconButton>

//       <Card>
//         <CardContent>
//           <Typography variant="h6" gutterBottom>
//             Notes / Diagnostic (F3) - Article #{formIndex + 1}
//           </Typography>

//           <Controller
//             name={`products[${formIndex}].notes[${index}].content`}
//             control={control}
//             defaultValue=""
//             render={({ field }) => (
//               <TextField {...field} label="Contenu" multiline rows={4} fullWidth />
//             )}
//           />
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }

// --- F4 Form: Pricing summary or other info ---
// function F4Form({ index, formId, onRemove, formIndex }) {
//   const { control } = useFormContext();

//   return (
//     <Box position="relative">
//       <IconButton
//         size="small"
//         color="error"
//         onClick={() => onRemove(formId)}
//         sx={{ position: 'absolute', top: 8, right: 8 }}
//       >
//         <Iconify icon="solar:trash-bin-trash-bold" />
//       </IconButton>

//       <Card>
//         <CardContent>
//           <Typography variant="h6" gutterBottom>
//             Résumé de prix (F4) - Article #{formIndex + 1}
//           </Typography>

//           <Controller
//             name={`products[${formIndex}].pricing[${index}].subtotal`}
//             control={control}
//             defaultValue=""
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Sous-total (€)"
//                 type="number"
//                 inputProps={{ step: 0.01, min: 0 }}
//                 fullWidth
//               />
//             )}
//           />

//           <Controller
//             name={`products[${formIndex}].pricing[${index}].tax`}
//             control={control}
//             defaultValue=""
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="TVA (%)"
//                 type="number"
//                 inputProps={{ step: 0.01, min: 0 }}
//                 fullWidth
//               />
//             )}
//           />

//           <Controller
//             name={`products[${formIndex}].pricing[${index}].total`}
//             control={control}
//             defaultValue=""
//             render={({ field }) => (
//               <TextField
//                 {...field}
//                 label="Total (€)"
//                 type="number"
//                 inputProps={{ step: 0.01, min: 0 }}
//                 fullWidth
//                 disabled
//               />
//             )}
//           />
//         </CardContent>
//       </Card>
//     </Box>
//   );
// }

// Ligne horizontal divider
function LigneH() {
  return <Divider sx={{ my: 2 }} />;
}

// Subtotal card (display only)
function SubtotalCard({ formId, onRemove }) {
  return (
    <Box position="relative">
      <IconButton
        size="small"
        color="error"
        onClick={() => onRemove(formId)}
        sx={{ position: 'absolute', top: 0, left: 8 }}
      >
        <Iconify icon="solar:trash-bin-trash-bold" />
      </IconButton>

      <Stack alignItems="flex-end">
        <Typography variant="subtitle2">Sous-total HT : 123,00 €</Typography>
      </Stack>
    </Box>
  );
}

// Total card (display only)
function TotalCard({ formId, onRemove }) {
  return (
    <Box position="relative">
      <IconButton
        size="small"
        color="error"
        onClick={() => onRemove(formId)}
        sx={{ position: 'absolute', top: 0, left: 8 }}
      >
        <Iconify icon="solar:trash-bin-trash-bold" />
      </IconButton>
      <Stack alignItems="flex-end">
        <Typography variant="subtitle1">TOTAL : 456,00 €</Typography>
      </Stack>
    </Box>
  );
}

const formComponents = {
  F1: PieceForm,
  F2: OeuvreForm,
  F3: ServiceForm,
  F4: GroupeForm,
  L: LigneH,
  Subtotal: SubtotalCard,
  Total: TotalCard,
};

export default function DocumentSectionView({ formIndex }) {
  const popover = usePopover();
  const [forms, setForms] = useState([]);

  const handleAddForm = (formKey) => {
    setForms((prev) => [...prev, { id: Date.now() + Math.random(), type: formKey }]);
  };

  const handleRemoveForm = (id) => {
    setForms((prev) => prev.filter((form) => form.id !== id));
  };

  return (
    <>
      <Grid container spacing={2} sx={{ position: 'relative' }}>
        <Grid xs={12} md={2}>
          <Box
            sx={{
              position: 'sticky',
              top: 100,
              zIndex: 10,
              bgcolor: 'background.paper',
              borderRadius: 1,
              p: 1,
              boxShadow: (theme) => theme.shadows[1],
            }}
          >
            <Stack spacing={2}>
              <Stack spacing={1} width="100%">
                {[
                  { label: 'Piéce à changer', value: 'F1' },
                  { label: "Main d'oeuvre", value: 'F2' },
                  { label: 'Service', value: 'F3' },
                  { label: 'Regroupement', value: 'F4' },
                ].map((key) => (
                  <Button
                    key={key.value}
                    onClick={() => handleAddForm(key.value)}
                    color="primary"
                    variant="contained"
                    fullWidth
                  >
                    {key.label}
                  </Button>
                ))}
              </Stack>
              <Button
                onClick={popover.onOpen}
                color="warning"
                variant="outlined"
                startIcon={<Iconify icon="mdi:plus" />}
              >
                Ajouter
              </Button>
            </Stack>
          </Box>
        </Grid>

        <Grid xs={12} md={10}>
          <Stack spacing={3}>
            {forms.map((form, idx) => {
              const FormComponent = formComponents[form.type];
              if (!FormComponent) return null;

              // LigneH has no props or remove button
              if (form.type === 'L') return <FormComponent key={form.id} />;

              return (
                <FormComponent
                  key={form.id}
                  index={idx}
                  formId={form.id}
                  onRemove={handleRemoveForm}
                  formIndex={formIndex}
                />
              );
            })}
          </Stack>
        </Grid>
      </Grid>

      <CustomPopover open={popover.open} anchorEl={popover.anchorEl} onClose={popover.onClose}>
        <MenuList>
          <MenuItem
            onClick={() => {
              handleAddForm('Subtotal');
              popover.onClose();
            }}
          >
            Sous-total (Total HT)
          </MenuItem>
          <MenuItem
            onClick={() => {
              handleAddForm('Total');
              popover.onClose();
            }}
          >
            Total général
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              handleAddForm('L');
              popover.onClose();
            }}
          >
            Ligne horizontale
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}
