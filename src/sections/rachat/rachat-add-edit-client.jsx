import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Box, TextField, Autocomplete } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { _addressBooks } from 'src/_mock';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

import VenteNewEditAddClient from '../vente/vente-new-edit-add-client';
// import VenteNewEditAddClient from './vente-new-edit-add-client';

// ----------------------------------------------------------------------

export function RachatAddEditClient() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const mdUp = useResponsive('up', 'md');

  const values = watch();

  const [clientTo, setClientTo] = useState();

  const { client } = values;

  const addClient = useBoolean();

  const handleSelectAddress = (option) => {
    setValue('client', { ...option, ...values.client });
  };

  return (
    <>
      <Stack
        spacing={{ xs: 3, md: 5 }}
        direction={{ xs: 'column', md: 'row' }}
        divider={
          <Divider
            flexItem
            orientation={mdUp ? 'vertical' : 'horizontal'}
            sx={{ borderStyle: 'dashed' }}
          />
        }
        sx={{ p: 3 }}
      >
        <Stack sx={{ width: 1 }}>
          <Stack>
            <Autocomplete
              noOptionsText="Pas de données"
              value={clientTo}
              fullWidth
              options={_addressBooks}
              onChange={(event, option) => {
                setClientTo(option);
                handleSelectAddress(option);
              }}
              getOptionLabel={(option) => option.name}
              renderInput={(params) => <TextField {...params} label="Client" margin="none" />}
              renderOption={(props, option) => (
                <li {...props} key={option.name}>
                  <Stack
                    key={option.id}
                    sx={{
                      py: 1,
                      my: 0.5,
                      px: 1.5,
                      gap: 0.5,
                      width: 1,
                      borderRadius: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-start',
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="subtitle2">{option.name}</Typography>
                      {option.primary && <Label color="info">Default</Label>}
                    </Stack>
                    {option.company && (
                      <Box sx={{ color: 'primary.main', typography: 'caption' }}>
                        {option.company}
                      </Box>
                    )}
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {option.fullAddress}
                    </Typography>
                    {option.phoneNumber && (
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {option.phoneNumber}
                      </Typography>
                    )}
                  </Stack>
                </li>
              )}
            />

            <Box display="flex" gap={1} width={1} mt={3}>
              <Button
                startIcon={<Iconify icon="mingcute:add-line" />}
                sx={{ alignSelf: 'flex-end', width: { xs: '100%', md: '50%' } }}
                variant="contained"
                color="primary"
                onClick={() => addClient.onTrue()}
              >
                Ajouter un client
              </Button>
            </Box>
          </Stack>
        </Stack>
        <Stack sx={{ width: 1 }}>
          <Stack spacing={1}>
            <Typography variant="subtitle2">{client?.name}</Typography>
            <Typography variant="caption" sx={{ color: 'primary.main' }}>
              {client?.company}
            </Typography>
            <Typography variant="body2">{client?.fullAddress}</Typography>
            <Typography variant="body2"> {client?.phoneNumber}</Typography>
            <Typography variant="body2"> {client?.email}</Typography>
          </Stack>
        </Stack>
      </Stack>
      <VenteNewEditAddClient open={addClient.value} onClose={addClient.onFalse} />
    </>
  );
}
