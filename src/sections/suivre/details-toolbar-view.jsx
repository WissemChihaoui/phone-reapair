import { Button, IconButton, Stack, Typography } from '@mui/material';
import React from 'react';
import { Iconify } from 'src/components/iconify';
import { RouterLink } from 'src/routes/components';
import { paths } from 'src/routes/paths';
import { fDateTime, today } from 'src/utils/format-time';

export default function DetailsToolbarView() {
  return (
    <>
      <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: { xs: 3, md: 5 } }}>
        <Stack spacing={1} direction="row" alignItems="flex-start">
          <IconButton component={RouterLink} href={paths.suivi.root}>
            <Iconify icon="eva:arrow-ios-back-fill" />
          </IconButton>

          <Stack spacing={0.5}>
            <Stack spacing={1} direction="row" alignItems="center">
              <Typography variant="h4"> Suivi #45874</Typography>
            </Stack>

            <Typography variant="body2" sx={{ color: 'text.disabled' }}>
              {fDateTime(today())}
            </Typography>
          </Stack>
        </Stack>

        <Stack
          flexGrow={1}
          flexWrap='wrap'
          spacing={1.5}
          direction="row"
          alignItems="center"

          sx={{ justifyContent:{ xs: 'center', md: 'flex-end'}}}
        >
          <Button
            color="inherit"
            variant="outlined"
            sx={{ textTransform: 'capitalize' }}
          >
            Rapport technique
          </Button>

          <Button
            color="inherit"
            variant="contained"
            startIcon={<Iconify icon="mingcute:arrow-left-line" />}
          >
            Avant
          </Button>

          <Button color="inherit" variant="contained" endIcon={<Iconify icon="mingcute:arrow-right-line" />}>
            Aprés
          </Button>
          <Button color="info" variant="contained" startIcon={<Iconify icon="mdi:file" />}>
            Devis
          </Button>
        </Stack>
      </Stack>
    </>
  );
}
