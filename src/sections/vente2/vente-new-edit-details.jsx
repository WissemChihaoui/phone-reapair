import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import Grid from '@mui/material/Unstable_Grid2';
import { Box, Stack, Button, Tooltip, IconButton } from '@mui/material';

import { Iconify } from 'src/components/iconify';



export default function VenteNewEditDetails() {
   const { control } = useFormContext();
  
    const { fields, append, remove } = useFieldArray({
      control,
      name: 'documents',
    });
  
    const handleAddSection = (type) => {
      append({ type, data: {} });
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
              onClick={() => handleAddSection('piece')}
              fullWidth
              sx={{
                textTransform: 'capitalize',
                justifyContent: 'flex-start',
                flexGrow: 1,
                paddingLeft: 4,
              }}
            >
              Article / Accessoire
            </Button>
            <Stack position="relative" sx={{ width: '100%' }}>
              <Button
                startIcon={<Iconify icon="mdi:plus" />}
                variant="contained"
                color="warning"
                onClick={() => handleAddSection('regroupement')}
                fullWidth
                sx={{
                  textTransform: 'capitalize',
                  justifyContent: 'flex-start',
                  flexGrow: 1,
                  paddingLeft: 4,
                }}
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
              onClick={() => handleAddSection('abonnement')}
              fullWidth
              sx={{
                textTransform: 'capitalize',
                justifyContent: 'flex-start',
                flexGrow: 1,
                paddingLeft: 4,
              }}
            >
              Abonnement
            </Button>

            <Button
              startIcon={<Iconify icon="mdi:minus" />}
              variant="outlined"
              color="secondary"
              onClick={() => handleAddSection('separator')}
              fullWidth
              sx={{
                textTransform: 'capitalize',
                justifyContent: 'flex-start',
                flexGrow: 1,
                paddingLeft: 4,
              }}
            >
              Ligne de séparation
            </Button>
          </Stack>
        </Box>
      </Grid>

      {/* RIGHT MAIN CONTENT */}
     
    </Grid>
  );
}
