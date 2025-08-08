import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import Grid from '@mui/material/Unstable_Grid2';
import {
  Box,
  Stack,
  Button,
  Divider,
  MenuItem,
  MenuList,
  Tooltip,
  IconButton,
} from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import PieceSection from './sections/piece-section';
import ServiceSection from './sections/service-section';
import MainOeuvreSection from './sections/oeuvre-section';
import RegroupementSection from './sections/regroupement-section';

export default function DocumentFormView() {
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'documents',
  });

  const popover = usePopover();

  const handleAddSection = (type) => {
    append({ type, data: {} });
    popover.onClose();
  };

  return (
    <>
      <Grid container spacing={2}>
        {/* Sidebar for adding sections */}
        <Grid xs={12} md={3}>
          <Box p={4}>
            <Stack spacing={2}>
              <Button
                startIcon={<Iconify icon="mdi:plus" />}
                variant="contained"
                color="primary"
                fullWidth
                onClick={() => handleAddSection('piece')}
                sx={{
                  textTransform: 'capitalize',
                  justifyContent: 'flex-start',
                  flexGrow: 1,
                  paddingLeft: 4,
                }}
              >
                Piéce à changer
              </Button>

              <Stack position="relative" sx={{ width: '100%' }}>
                <Button
                  startIcon={<Iconify icon="mdi:plus" />}
                  variant="contained"
                  color="warning"
                  fullWidth
                  onClick={() => handleAddSection('regroupement')}
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
                color="success"
                fullWidth
                onClick={() => handleAddSection('service')}
                sx={{
                  textTransform: 'capitalize',
                  justifyContent: 'flex-start',
                  flexGrow: 1,
                  paddingLeft: 4,
                }}
              >
                Service
              </Button>

              <Button
                startIcon={<Iconify icon="mdi:plus" />}
                variant="contained"
                color="error"
                fullWidth
                onClick={() => handleAddSection('main_oeuvre')}
                sx={{
                  textTransform: 'capitalize',
                  justifyContent: 'flex-start',
                  flexGrow: 1,
                  paddingLeft: 4,
                }}
              >
                Main d’oeuvre
              </Button>

              <Button
                startIcon={<Iconify icon="mdi:plus" />}
                variant="outlined"
                color="secondary"
                onClick={popover.onOpen}
                fullWidth
                sx={{
                  textTransform: 'capitalize',
                  justifyContent: 'flex-start',
                  flexGrow: 1,
                  paddingLeft: 4,
                }}
              >
                Ajouter un élèment
              </Button>
            </Stack>
          </Box>
        </Grid>

        {/* Right section rendering dynamic documents */}
        <Grid xs={12} md={9}>
          <Stack spacing={2} p={2}>
            {fields.map((field, index) => {
              switch (field.type) {
                case 'piece':
                  return (
                    <PieceSection
                      key={field.id}
                      index={index}
                      onRemove={() => remove(index)}
                      fieldName={`documents.${index}.data`}
                    />
                  );
                case 'service':
                  return (
                    <ServiceSection key={field.id} index={index} onRemove={() => remove(index)} />
                  );
                case 'regroupement':
                  return (
                    <RegroupementSection
                      key={field.id}
                      index={index}
                      onRemove={() => remove(index)}
                    />
                  );
                case 'main_oeuvre':
                  return (
                    <MainOeuvreSection
                      key={field.id}
                      index={index}
                      onRemove={() => remove(index)}
                    />
                  );
                case 'separator':
                  return <Divider key={field.id} />;
                case 'total':
                  return <Box key={field.id}>[Total Section]</Box>;
                case 'subtotal':
                  return <Box key={field.id}>[Sous-total Section]</Box>;
                default:
                  return null;
              }
            })}
          </Stack>
        </Grid>
      </Grid>

      {/* Floating popover to add custom sections */}
      <CustomPopover open={popover.open} anchorEl={popover.anchorEl} onClose={popover.onClose}>
        <MenuList>
          <MenuItem onClick={() => handleAddSection('separator')}>
            <Iconify icon="mdi:minus" width={20} sx={{ mr: 1 }} />
            Ligne de séparation
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}
