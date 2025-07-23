import React from 'react';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { Fab, MenuItem, MenuList } from '@mui/material';
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
import { CustomPopover, usePopover } from 'src/components/custom-popover';

import DisplaySendSmsModal from './display-sendSms-modal';
import DisplayPayementModal from './display-payement-modal';

export function ReparationDetailsInfo({ customer, shippingAddress }) {
  const popover = usePopover()
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
          <Stack direction="row" spacing={1}>
            <Fab size='small'>
              <Iconify icon="logos:whatsapp-icon" width={24}/>
            </Fab>
            <Fab size='small'>
              <Iconify icon="material-icon-theme:email" width={24}/>
            </Fab>
            <Fab size='small'>
              <Iconify icon="flat-color-icons:sms" width={24}/>
            </Fab>
            <IconButton href={paths.dashboard.client.add} LinkComponent={RouterLink}>
              <Iconify icon="solar:pen-bold" />
            </IconButton>
          </Stack>
        }
      />
      <Stack spacing={0.5} alignItems="flex-start" sx={{ typography: 'body2', p: 3 }}>
        <Typography variant="subtitle2">{customer?.name}</Typography>
        <Box sx={{ color: 'text.secondary' }}>{customer?.email}</Box>
        <Box component="span" sx={{ color: 'text.secondary', ml: 0.25, mb: 2 }}>
          #877-87-877
        </Box>
        <Button onClick={popover.onOpen} variant='outlined' startIcon={<Iconify icon="material-symbols:star-outline-rounded" />}>
          Avis Client
        </Button>
        <CustomPopover anchorEl={popover.anchorEl} open={popover.open} onClose={popover.onClose}>
          <MenuList>
            <MenuItem><Iconify icon="ic:outline-email" />Email</MenuItem>
            <MenuItem><Iconify icon="material-symbols:sms-outline" />SMS</MenuItem>
            <MenuItem><Iconify icon="ic:round-whatsapp" />Whatsapp</MenuItem>
          </MenuList>
        </CustomPopover>
      </Stack>
    </>
  );

  const renderTickets = (
    <>
      <Tabs value={tabValue} onChange={handleTabChange} centered>
        <Tab label="Réçu" />
        <Tab label="Impr. étiquette" />
        <Tab label="Réçu atelier" />
      </Tabs>
      <Divider sx={{ borderStyle: 'dashed' }} />

      {tabValue === 0 && (
        <Box sx={{ p: 3 }} border={1} m={2}>
          {/* Print Button */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="material-symbols:print" />}
            onClick={() => window.print()}
            sx={{ mb: 2 }}
          >
            Imprimer
          </Button>

          {/* Header: Number and Date */}
          <Typography variant="subtitle2">
            N°: R07-25-627 / emp12032533 date: 22-07-2025 14:13:17
          </Typography>

          {/* Title */}
          <Typography
            variant="h6"
            align="center"
            sx={{ textDecoration: 'underline', fontWeight: 'bold', my: 1 }}
          >
            Réçu de dépôt
          </Typography>

          {/* Client Info */}
          <Typography>
            <strong>Client:</strong> 86-00003-hlel khalifa khalifa
          </Typography>
          {/* Add phone if needed */}
          {/* <Typography><strong>Téléphone:</strong> 0633265523</Typography> */}

          <Divider sx={{ my: 1 }} />

          {/* Product Info */}
          <Typography>
            <strong>Désignation:</strong> alcatel|ALCATEL 3V
          </Typography>
          <Typography>
            <strong>État de dépôt:</strong> Comme neuf
          </Typography>

          <Divider sx={{ my: 1 }} />

          {/* Pannes */}
          <Typography>
            <strong>Panne:</strong> ecran iphone 7 blancfdfdf
          </Typography>
          <Typography>
            <strong>Prix:</strong> 100.00 €
          </Typography>

          <Typography>
            <strong>Panne:</strong> ecran iphone 7 blancfdfdf
          </Typography>
          <Typography>
            <strong>Prix:</strong> 100.00 €
          </Typography>

          <Typography>
            <strong>Panne:</strong> sfsdfdsf
          </Typography>
          <Typography>
            <strong>Prix:</strong> 36.00 €
          </Typography>

          <Typography>
            <strong>Panne:</strong> top top
          </Typography>
          <Typography>
            <strong>Prix:</strong> 59.00 €
          </Typography>

          <Divider sx={{ my: 1 }} />

          {/* Totals */}
          <Typography>
            <strong>Total:</strong> 295.00 €
          </Typography>
          <Typography>
            <strong>Acompte:</strong> 0.00 €
          </Typography>
          <Typography>
            <strong>Reste:</strong> 295.00 €
          </Typography>
        </Box>
      )}

      {tabValue === 1 && (
        <Box sx={{ p: 3 }} border={1} m={2}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="material-symbols:print" />}
            onClick={() => window.print()}
            sx={{ mb: 2 }}
          >
            Imprimer
          </Button>
        <Stack sx={{ p: 3 }} alignItems="center">
          <img
            alt="Barre à code"
            src={`${CONFIG.assetsDir}/assets/images/barCode.png`}
            width={250}
          />
        </Stack>
        </Box>
      )}

      {tabValue === 2 && (
        <Box sx={{ p: 3 }} border={1} m={2}>
          {/* Print Button */}
          <Button
            variant="contained"
            color="primary"
            startIcon={<Iconify icon="material-symbols:print" />}
            onClick={() => window.print()}
            sx={{ mb: 2 }}
          >
            Imprimer
          </Button>

          {/* Header: Number and Date */}
          <Typography variant="subtitle2">
            N°: R07-25-625 / emp12032533 date: 22-07-2025 12:42:45
          </Typography>

          {/* Title */}
          <Typography
            variant="h6"
            align="center"
            sx={{ textDecoration: 'underline', fontWeight: 'bold', my: 1 }}
          >
            Réçu atelier
          </Typography>

          {/* Client Info */}
          <Typography>
            <strong>Client:</strong> 86-00003-hlel khalifa khalifa
          </Typography>
          <Typography>
            <strong>Téléphone:</strong> 0633265523
          </Typography>

          <Divider sx={{ my: 1 }} />

          {/* Product Info */}
          <Typography>
            <strong>Désignation:</strong> asus|7265NGW
          </Typography>
          <Typography>
            <strong>Numéro de série:</strong>
          </Typography>
          <Typography>
            <strong>État de dépôt:</strong> Comme neuf
          </Typography>
          <Typography>
            <strong>Note interne:</strong>
          </Typography>
          <Typography>
            <strong>Code (déver./Sim):</strong>
          </Typography>
          <Typography>
            <strong>Schema déver.:</strong>
          </Typography>

          <Divider sx={{ my: 1 }} />

          {/* Pannes */}
          <Typography>
            <strong>Panne:</strong> ecran iphone 7 blancfdfdf
          </Typography>
          <Typography>
            <strong>Prix:</strong> 100.00 €
          </Typography>

          <Typography>
            <strong>Panne:</strong> ecran iphone 7 blancfdfdf
          </Typography>
          <Typography>
            <strong>Prix:</strong> 100.00 €
          </Typography>

          <Typography>
            <strong>Panne:</strong> sfsdfdsf
          </Typography>
          <Typography>
            <strong>Prix:</strong> 36.00 €
          </Typography>

          <Typography>
            <strong>Panne:</strong> top top
          </Typography>
          <Typography>
            <strong>Prix:</strong> 59.00 €
          </Typography>

          <Divider sx={{ my: 1 }} />

          {/* Totals */}
          <Typography>
            <strong>Total:</strong> 295.00 €
          </Typography>
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
      <Box sx={{ p: 3, gap: 0.5, typography: 'body2' }}>Le client n&apos;a pas payé 15€</Box>
    </>
  );

  return (
    <>
      <Card>
        {renderCustomer}
        <Divider sx={{ borderStyle: 'dashed' }} />

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
