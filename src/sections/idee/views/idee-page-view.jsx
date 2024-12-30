import { LoadingButton } from '@mui/lab';
import { Button, Card, CardActions, CardContent, CardHeader, Stack, TextField, Typography } from '@mui/material';
import React from 'react';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';
import { UploadBox } from 'src/components/upload';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';

export default function IdeePageView() {
  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Boite d'idée"
          links={[
            { name: 'Tableau de bord', href: paths.dashboard.root },
            { name: "Boite d'idée", href: paths.dashboard.idee.root },
            { name: 'Page' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Card>
          <CardHeader title="Boite idée" />
          <CardContent>
            <Stack display="flex" gap={2}>
              <TextField label="Sujet" />
              <TextField multiline rows={4} label="description" />
              <UploadBox
                placeholder={
                  <Stack spacing={0.5} alignItems="center">
                    <Iconify icon="eva:cloud-upload-fill" width={40} />
                    <Typography variant="body2">Piéce jointe</Typography>
                  </Stack>
                }
                sx={{ mb: 3, py: 2.5, height: 'auto', width: 1 }}
              />
            </Stack>
          </CardContent>
          <Stack justifyContent="flex-end" direction="row" spacing={2} sx={{ p:4 }}>
        <LoadingButton
          color="inherit"
          size="large"
          variant="outlined"
        >
          Annuler
        </LoadingButton>

             
          <LoadingButton
          size="large"
          variant="contained"
          color='primary'
        >
          Enregistrer
        </LoadingButton>
          
      </Stack>
        </Card>
      </DashboardContent>
    </>
  );
}
