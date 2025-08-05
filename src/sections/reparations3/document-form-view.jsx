import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import Grid from '@mui/material/Unstable_Grid2';
import { Box, Stack, Button, Divider, MenuItem, MenuList } from '@mui/material';

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
              >
                Piéce à changer
              </Button>

              <Button
                startIcon={<Iconify icon="mdi:plus" />}
                variant="contained"
                color="warning"
                fullWidth
                onClick={() => handleAddSection('regroupement')}
              >
                Regroupement
              </Button>

              <Button
                startIcon={<Iconify icon="mdi:plus" />}
                variant="contained"
                color="success"
                fullWidth
                onClick={() => handleAddSection('service')}
              >
                Service
              </Button>

              <Button
                startIcon={<Iconify icon="mdi:plus" />}
                variant="contained"
                color="error"
                fullWidth
                onClick={() => handleAddSection('main_oeuvre')}
              >
                Main d’oeuvre
              </Button>

              <Button
                startIcon={<Iconify icon="mdi:plus" />}
                variant="outlined"
                color="secondary"
                onClick={popover.onOpen}
                fullWidth
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
                  return <RegroupementSection key={field.id} index={index} onRemove={() => remove(index)} />;
                case 'main_oeuvre':
                  return (
                    <MainOeuvreSection key={field.id} index={index} onRemove={() => remove(index)} />
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
          <MenuItem onClick={() => handleAddSection('subtotal')}>
            <Iconify icon="mdi:calculator" width={20} sx={{ mr: 1 }} />
            Sous-total
          </MenuItem>
          <MenuItem onClick={() => handleAddSection('total')}>
            <Iconify icon="mdi:calculator-variant" width={20} sx={{ mr: 1 }} />
            Total
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => handleAddSection('separator')}>
            <Iconify icon="mdi:minus" width={20} sx={{ mr: 1 }} />
            Ligne de séparation
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}
