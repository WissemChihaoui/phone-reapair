import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { Iconify } from 'src/components/iconify';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { CardActions, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useBoolean } from 'src/hooks/use-boolean';
import DisplayPayementModal from './display-payement-modal';
import DisplaySendSmsModal from './display-sendSms-modal';
import ReparationDetailsCode from './reparation-details-code';

// ----------------------------------------------------------------------

export function ReparationDetailsInfo({ customer, delivery, payment, shippingAddress }) {
    console.log(customer);
    const openPayment = useBoolean()
    const openSMS = useBoolean()
    
  const renderCustomer = (
    <>
      <CardHeader
        title="Client"
        action={
          <IconButton href={paths.dashboard.client.add} LinkComponent={RouterLink}>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        }
      />
        <Stack spacing={0.5} alignItems="flex-start" sx={{ typography: 'body2',p: 3 }}>
          <Typography variant="subtitle2">{customer?.name}</Typography>

          <Box sx={{ color: 'text.secondary' }}>{customer?.email}</Box>

        <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
            #877-87-877
        </Box>
        </Stack>
    </>
  );

  const renderDelivery = (
    <>
      <CardHeader
        title="Casier de rangement"
      />
      <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
      <FormControl>
        <Select>
            <MenuItem value="casier 1">Casier 1</MenuItem>
        </Select>
      </FormControl>
      </Stack>
      <CardActions sx={{justifyContent:'flex-end', display: 'flex', p:2}}>
        <Button variant='contained'>Enregistrer</Button>
      </CardActions>
    </>
  );

  const renderShipping = (
    <>
      <CardHeader
        title="Contact"
        action={
          <IconButton>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        }
      />
      <Stack spacing={1.5} sx={{ p: 3, typography: 'body2' }}>
        <Stack direction="row">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
            Adresse
          </Box>
          {shippingAddress?.fullAddress}
        </Stack>

        <Stack direction="row">
          <Box component="span" sx={{ color: 'text.secondary', width: 120, flexShrink: 0 }}>
           Numéro de téléphone
          </Box>
          {shippingAddress?.phoneNumber}
        </Stack>
        <Button
            size="small"
            color="primary"
            startIcon={<Iconify icon="material-symbols:sms-outline" />}
            sx={{ mt: 1 }}
            variant='contained'
            onClick={() => openSMS.onTrue()}
          >
            Envoyer SMS
          </Button>
      </Stack>
    </>
  );

  const renderPayment = (
    <>
      <CardHeader
        title="Paiement"
        action={
          <IconButton onClick={()=> openPayment.onTrue()}>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        }
      />
      <Box
        sx={{ p: 3, gap: 0.5, typography: 'body2' }}
      >
        Le client n&apos;a pas payé 15€
      </Box>
    </>
  );

  return (
    <>
    <Card>
      {renderCustomer}
      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderShipping}

      <Divider sx={{ borderStyle: 'dashed' }} />

      <ReparationDetailsCode />


      <Divider sx={{ borderStyle: 'dashed' }} />

      {renderPayment}
    </Card>
    <DisplayPayementModal open={openPayment.value} onClose={openPayment.onFalse} />
    <DisplaySendSmsModal open={openSMS.value} onClose={openSMS.onFalse} />
    </>
  );
}
