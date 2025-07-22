import React from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Card from '@mui/material/Card';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { CONFIG } from 'src/config-global';

import { Iconify } from 'src/components/iconify';

import DisplaySendSmsModal from './display-sendSms-modal';
import DisplayPayementModal from './display-payement-modal';

export function ReparationDetailsInfo({ customer, shippingAddress }) {
  const openPayment = useBoolean();
  const openSMS = useBoolean();
  const [tabValue, setTabValue] = React.useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const renderCustomer = (
    <>
      <CardHeader
        title="Client"
        action={
          <Stack direction="row">
            <IconButton>
              <Iconify icon="logos:whatsapp-icon" />
            </IconButton>
            <IconButton>
              <Iconify icon="material-icon-theme:email" />
            </IconButton>
            <IconButton>
              <Iconify icon="flat-color-icons:sms" />
            </IconButton>
            <IconButton href={paths.dashboard.client.add} LinkComponent={RouterLink}>
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Stack>
        }
      />
      <Stack spacing={0.5} alignItems="flex-start" sx={{ typography: 'body2', p: 3 }}>
        <Typography variant="subtitle2">{customer?.name}</Typography>
        <Box sx={{ color: 'text.secondary' }}>{customer?.email}</Box>
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.25 }}>
          #877-87-877
        </Box>
      </Stack>
    </>
  );

  const renderTickets = (
    <>
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="Réçu" />
        <Tab label="Réçu atelier" />
      </Tabs>
      <Divider sx={{ borderStyle: 'dashed' }} />

      {tabValue === 0 && (
        <Box sx={{ p: 3 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="material-symbols:print" />}
            onClick={() => window.print()}
            sx={{ mb: 2 }}
          >
            Imprimer
          </Button>

          <Typography variant="h6" align="center">
            Réçu de dépôt
          </Typography>

          <Typography>N°: R07-25-627 / emp12032533</Typography>
          <Typography>Date: 22-07-2025 14:13:17</Typography>
          <Typography>Client: 86-00003-hlel khalifa khalifa</Typography>

          <Divider sx={{ my: 1 }} />

          <Typography><strong>Désignation:</strong> alcatel|ALCATEL 3V</Typography>
          <Typography><strong>État de dépôt:</strong> Comme neuf</Typography>

          <Divider sx={{ my: 1 }} />

          <Typography><strong>Panne:</strong> ecran iphone 7 blancfdfdf | <strong>Prix:</strong> 100.00 €</Typography>
          <Typography><strong>Panne:</strong> ecran iphone 7 blancfdfdf | <strong>Prix:</strong> 100.00 €</Typography>
          <Typography><strong>Panne:</strong> sfsdfdsf | <strong>Prix:</strong> 36.00 €</Typography>
          <Typography><strong>Panne:</strong> top top | <strong>Prix:</strong> 59.00 €</Typography>

          <Divider sx={{ my: 1 }} />

          <Typography><strong>Total:</strong> 295.00 €</Typography>
          <Typography><strong>Acompte:</strong> 0.00 €</Typography>
          <Typography><strong>Reste:</strong> 295.00 €</Typography>
        </Box>
      )}

      {tabValue === 1 && (
        <Box sx={{ p: 3 }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="material-symbols:print" />}
            onClick={() => window.print()}
            sx={{ mb: 2 }}
          >
            Imprimer
          </Button>

          <Typography variant="h6" align="center">
            Réçu Atelier
          </Typography>

          <Typography>Contenu de l&apos;atelier à compléter...</Typography>
        </Box>
      )}
    </>
  );

  const renderPayment = (
    <>
      <CardHeader
        title="Paiement"
        action={
          <IconButton onClick={() => openPayment.onTrue()}>
            <Iconify icon="solar:pen-bold" />
          </IconButton>
        }
      />
      <Box sx={{ p: 3, gap: 0.5, typography: 'body2' }}>
        Le client n&apos;a pas payé 15€
      </Box>
    </>
  );

  return (
    <>
      <Card>
        {renderCustomer}
        <Divider sx={{ borderStyle: 'dashed' }} />

        <CardHeader
          title="Code à barre "
          action={
            <IconButton>
              <Iconify icon="material-symbols:print" />
            </IconButton>
          }
        />
        <Stack sx={{ p: 3 }} alignItems="center">
          <img alt="Barre à code" src={`${CONFIG.assetsDir}/assets/images/barCode.png`} width={250} />
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        {renderTickets}

        <Divider sx={{ borderStyle: 'dashed' }} />

        {renderPayment}
      </Card>
      <DisplayPayementModal open={openPayment.value} onClose={openPayment.onFalse} />
      <DisplaySendSmsModal open={openSMS.value} onClose={openSMS.onFalse} />
    </>
  );
}
