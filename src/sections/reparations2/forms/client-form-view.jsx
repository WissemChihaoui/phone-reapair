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

import VenteNewEditAddClient from 'src/sections/vente/vente-new-edit-add-client';

export default function ClientFormView() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const mdUp = useResponsive('up', 'md');
  const addClient = useBoolean();
  const [clientTo, setClientTo] = useState(null);

  const values = watch();
  const { client } = values;

  const handlePassager = () => {
    setValue('client', {
      id: '0',
      name: 'Client Passager',
      fullAddress: '123, Passager',
      phoneNumber: '',
      email: '',
      company: ''
    });
    setClientTo(null);
  };

  const handleSelectAddress = (option) => {
    if (option) {
      setValue('client', { 
        id: option.id,
        name: option.name,
        fullAddress: option.fullAddress,
        phoneNumber: option.phoneNumber,
        email: option.email,
        company: option.company
      });
    } else {
      setValue('client', {
        id: '',
        name: '',
        fullAddress: '',
        phoneNumber: '',
        email: '',
        company: ''
      });
    }
  };

  const handleAddClientSuccess = (newClient) => {
    setValue('client', newClient);
    addClient.onFalse();
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
          <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ color: 'text.disabled', flexGrow: 1 }}>
              Choisir Client
            </Typography>
          </Stack>

          <Stack spacing={2}>
            <Autocomplete
              value={clientTo}
              fullWidth
              options={_addressBooks}
              onChange={(event, option) => {
                setClientTo(option);
                handleSelectAddress(option);
              }}
              getOptionLabel={(option) => option?.name || ''}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              renderInput={(params) => (
                <TextField 
                  {...params} 
                  label="Client" 
                  margin="none" 
                  error={!!errors.client}
                  helperText={errors.client?.message}
                />
              )}
              renderOption={(props, option) => (
                <li {...props} key={option.id}>
                  <Stack
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

            <Box display="flex" gap={2} width={1}>
              <Button
                fullWidth
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
                onClick={addClient.onTrue}
              >
                Créer client
              </Button>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Iconify icon="mingcute:user-1-line" />}
                onClick={handlePassager}
              >
                Client Passager
              </Button>
            </Box>
          </Stack>
        </Stack>

        <Stack sx={{ width: 1 }}>
          <Stack direction="row" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ color: 'text.disabled', flexGrow: 1 }}>
              Informations Client
            </Typography>
          </Stack>

          {client?.name ? (
            <Stack spacing={1.5}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                {client.name}
              </Typography>
              {client.company && (
                <Typography variant="body2" sx={{ color: 'primary.main' }}>
                  {client.company}
                </Typography>
              )}
              {client.fullAddress && (
                <Typography variant="body2">
                  <Iconify icon="mingcute:location-line" width={16} sx={{ mr: 1 }} />
                  {client.fullAddress}
                </Typography>
              )}
              {client.phoneNumber && (
                <Typography variant="body2">
                  <Iconify icon="mingcute:phone-line" width={16} sx={{ mr: 1 }} />
                  {client.phoneNumber}
                </Typography>
              )}
              {client.email && (
                <Typography variant="body2">
                  <Iconify icon="mingcute:mail-line" width={16} sx={{ mr: 1 }} />
                  {client.email}
                </Typography>
              )}
            </Stack>
          ) : (
            <Typography variant="body2" sx={{ color: 'text.disabled' }}>
              Aucun client sélectionné
            </Typography>
          )}
        </Stack>
      </Stack>

      <VenteNewEditAddClient 
        open={addClient.value} 
        onClose={addClient.onFalse}
        onSuccess={handleAddClientSuccess}
      />
    </>
  );
}