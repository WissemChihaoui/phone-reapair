import { Autocomplete, Box, Button, Divider, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form';
import { _addressBooks } from 'src/_mock';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';
import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
import VenteNewEditAddClient from 'src/sections/vente/vente-new-edit-add-client';

export default function ClientCart() {
    const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();

  const mdUp = useResponsive('up', 'md');

  const values = watch();

  const [clientTo, setClientTo] = useState();

  const { client } = values;

  const addClient = useBoolean()

  const handlePassager = () => {
    setValue('client', {
      id: '0',
      name: 'Client Passager',
      fullAddress: '123, Passager',
      phoneNumber: '',
    });
    setClientTo(null);
  };

  const handleSelectAddress = (option) => {
    setValue('client', { ...option });
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
          <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="h6" sx={{ color: 'text.disabled', flexGrow: 1 }}>
              Choisir Client
            </Typography>
          </Stack>

          <Stack>
            <Autocomplete
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
                sx={{ alignSelf: 'flex-end', width: '100%' }}
                variant="contained"
                color='primary'
                onClick={()=>addClient.onTrue()}
              >
                Creér client
              </Button>
              <Button
                startIcon={<Iconify icon="mingcute:user-1-line" />}
                sx={{ alignSelf: 'flex-end', width: '100%' }}
                onClick={() => handlePassager()}
                variant='outlined'
              >
                Client Passager
              </Button>
            </Box>
          </Stack>
        </Stack>
        <Stack sx={{ width: 1 }}>
          <Stack direction="row" alignItems="center" sx={{ mb: 1 }}>
            <Typography variant="h6" sx={{ color: 'text.disabled', flexGrow: 1 }}>
              Client:
            </Typography>
          </Stack>

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
      <VenteNewEditAddClient open={addClient.value} onClose={addClient.onFalse}/>
   </>
  )
}
