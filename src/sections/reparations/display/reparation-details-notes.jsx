import {
  Button,
  Card,
  CardActions,
  CardHeader,
  FormControl,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import React from 'react';
import { Iconify } from 'src/components/iconify';
import { UploadBox } from 'src/components/upload';

export default function ReparationDetailsNotes() {
  return (
    <>
      <Card>
        <CardHeader
          title="Information technique sur l'intervention"
          action={
            <Tooltip title="Text Affiché">
              <IconButton>
                <Iconify icon="material-symbols:info-outline" />
              </IconButton>
            </Tooltip>
          }
        />
        <Stack sx={{ p: 3 }}>
          <UploadBox
            placeholder={
              <Stack spacing={0.5} alignItems="center">
                <Iconify icon="eva:cloud-upload-fill" width={40} />
                <Typography variant="body2">Télécharger un fichier</Typography>
              </Stack>
            }
            sx={{ mb: 3, py: 2.5, width: 100 % '', height: 'auto' }}
          />
          <FormControl sx={{ mb: 3 }}>
            <TextField label="Information technique sur l'intervention" multiline rows={5} />
          </FormControl>
        </Stack>
        <CardActions sx={{ justifyContent: 'flex-end', display: 'flex', p: 2 }}>
          <Button variant="contained" color="primary">
            Enrgistrer
          </Button>
        </CardActions>
      </Card>
      <Card>
        <CardHeader
          title="Observations (interne)"
          action={
            <Tooltip title="Text Affiché">
              <IconButton>
                <Iconify icon="material-symbols:info-outline" />
              </IconButton>
            </Tooltip>
          }
        />
        <Stack sx={{ p: 3 }}>
          <FormControl>
            <TextField label="Observations (interne)" multiline rows={5} />
          </FormControl>
        </Stack>
        <CardActions sx={{ justifyContent: 'flex-end', display: 'flex', p: 2 }}>
          <Button color="primary" variant="contained">
            Enrgistrer
          </Button>
        </CardActions>
      </Card>
    </>
  );
}
