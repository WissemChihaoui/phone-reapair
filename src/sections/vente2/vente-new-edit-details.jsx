import React, { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import Grid from '@mui/material/Unstable_Grid2';
import { Box, Stack, Button, Tooltip, IconButton } from '@mui/material';

import { Iconify } from 'src/components/iconify';

import PieceForm from './piece-form';
import AbonnementForm from './abonnement-form';
import DividerItem from './devider-item';
import RegroupementForm from './regroupement-form';

export default function VenteNewEditDetails() {
  const { control, watch } = useFormContext();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'items',
  });

  const items = watch('items');
  const [showRegroupementForm, setShowRegroupementForm] = useState(false);

  const handleAddAbonnement = () => {
    append({
      type: 'abonnement',
      nom: '',
      qte: 1,
      price: 0,
      champ: '',
      remise: 0,
      total: 0,
    });
  };

  const handleAddPiece = () => {
    append({
      type: 'piece',
      nom: '',
      qte: 1,
      price: 0,
      champ: '',
      remise: 0,
      total: 0,
    });
  };

  const handleAddDivider = () => {
    append({ type: 'divider' });
  };

  const handleSubmitRegroupement = (groupItems) => {
    append(groupItems); // Add all selected regroupement items
    setShowRegroupementForm(false);
  };

  return (
    <Grid container spacing={2} py={2}>
      {/* LEFT CONTROLS */}
      <Grid xs={12} md={3}>
        <Box p={4}>
          <Stack spacing={2}>
            <Button
              startIcon={<Iconify icon="mdi:plus" />}
              variant="contained"
              color="primary"
              onClick={handleAddPiece}
              fullWidth
            >
              Article / Accessoire
            </Button>
            <Stack position="relative" sx={{ width: '100%' }}>
              <Button
                startIcon={<Iconify icon="mdi:plus" />}
                variant="contained"
                color="warning"
                onClick={() => setShowRegroupementForm(true)}
                fullWidth
              >
                Regroupement
              </Button>
              <Tooltip
                title={`Cette fonctionnalité permet à la boutique de regrouper plusieurs articles sous un seul nom, afin de :
                - Créer des offres commerciales ou des packs (ex. : "Pack protection téléphone" incluant coque + verre trempé + écouteur),
                - Simplifier la facture pour le client final, en n’affichant que le nom du regroupement au lieu de la liste détaillée des articles.`}
                placement="top"
              >
                <IconButton
                  size="small"
                  sx={{
                    position: 'absolute',
                    right: -40, // pushes it outside the button
                    top: '50%',
                    transform: 'translateY(-50%)',
                    backgroundColor: 'white', // optional to make it stand out
                    boxShadow: 1, // optional subtle shadow
                  }}
                >
                  <Iconify icon="material-symbols:info-outline-rounded" />
                </IconButton>
              </Tooltip>
            </Stack>
            <Button
              startIcon={<Iconify icon="mdi:plus" />}
              variant="contained"
              color="info"
              onClick={handleAddAbonnement}
              fullWidth
            >
              Abonnement
            </Button>

            <Button
              startIcon={<Iconify icon="mdi:minus" />}
              variant="outlined"
              color="secondary"
              onClick={handleAddDivider}
              fullWidth
            >
              Ligne de séparation
            </Button>
          </Stack>
        </Box>
      </Grid>

      {/* RIGHT MAIN CONTENT */}
      <Grid xs={12} md={9}>
        <Stack spacing={3}>
          {fields.map((field, index) => {
            const data = items?.[index];
            if (!data) return null;

            if (data.type === 'abonnement') {
              return <AbonnementForm key={field.id} index={index} onRemove={() => remove(index)} />;
            }

            if (data.type === 'piece') {
              return <PieceForm key={field.id} index={index} onRemove={() => remove(index)} />;
            }

            if (data.type === 'divider') {
              return <DividerItem key={field.id} onRemove={() => remove(index)} />;
            }

            return null;
          })}

          {/* Show RegroupementForm in MAIN AREA */}
          {showRegroupementForm && (
            <RegroupementForm
              onSubmit={handleSubmitRegroupement}
              onCancel={() => setShowRegroupementForm(false)}
            />
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}
