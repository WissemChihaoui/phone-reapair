import React, { useState } from 'react';

import Grid from '@mui/material/Unstable_Grid2';
import {
  Box,
  Card,
  Stack,
  Divider,
  TextField,
  Typography,
  Button,
  MenuList,
  MenuItem,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import { useResponsive } from 'src/hooks/use-responsive';
import { fDate, today } from 'src/utils/format-time';

import { DashboardContent } from 'src/layouts/dashboard';
import { CustomPopover, usePopover } from 'src/components/custom-popover';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

// ✅ Status options
const STATUS_OPTIONS = [
  { label: 'Actif', value: 'active' },
  { label: 'Suspendu', value: 'suspended' },
  { label: 'Annulé', value: 'cancelled' },
  { label: 'En attente de paiement', value: 'pending' },
  { label: 'Expiré', value: 'expired' },
];

// ✅ Status color mapping
const STATUS_COLORS = {
  active: 'success',
  suspended: 'warning',
  cancelled: 'error',
  pending: 'info',
  expired: 'warning',
};

export default function VenteAbonDetails() {
  const mdUp = useResponsive('up', 'md');
  const popover = usePopover();

  const [status, setStatus] = useState('active');

  const handleChangeStatus = (newStatus) => {
    setStatus(newStatus);
    popover.onClose();
  };

  const data = {
    client: {
      name: 'Jon Doe',
      fullAddress: '1147 Rohan Drive Suite 819 - Burlington, VT / 82021',
      phoneNumber: '+1 416-555-0198',
      email: 'milo.farrell@hotmail.com',
    },
    details: [
      { label: 'Périodicité', value: 'Hebdomadaire' },
      { label: 'Prochaine Facture', value: fDate(today()) },
      { label: 'Date Fin', value: fDate(today()) },
      { label: 'Date échéance', value: fDate(today()) },
      { label: 'Mode de paiement', value: 'Prélèvement automatique' },
    ],
    vente: {
      ref: '12345',
      type: 'Abonnement',
      dateCreation: fDate(today()),
      note: '',
    },
    produit: {
      label: 'Abonnement',
      duree: '12 jours',
      prix: '80',
      champLibre: '80',
      remise: '10',
    },
  };

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Suivre des abonnements"
        links={[
          { name: 'Tableau de brd', href: paths.dashboard.root },
          { name: 'Vente', href: paths.dashboard.vente.root },
          { name: 'Suivre des abonnements', href: paths.dashboard.vente.suivre },
          { name: 'Détails' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
        action={
          <Button
            variant="contained"
            onClick={popover.onOpen}
            color={STATUS_COLORS[status] || 'primary'}
          >
            {STATUS_OPTIONS.find((s) => s.value === status)?.label}
          </Button>
        }
      />

      <Card sx={{ p: 3 }}>
        {/* Client & Details Section */}
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
          <Stack spacing={1} sx={{ width: 1 }}>
            <Typography variant="subtitle2">{data.client.name}</Typography>
            <Typography variant="body2">{data.client.fullAddress}</Typography>
            <Typography variant="body2">{data.client.phoneNumber}</Typography>
            <Typography variant="body2">{data.client.email}</Typography>
          </Stack>

          <Stack spacing={2} sx={{ width: 1 }}>
            {data.details.map((item, index) => (
              <Box key={index} display="flex" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  {item.label}
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {item.value || '-'}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Stack>

        <Stack
          spacing={2}
          direction={{ xs: 'column', sm: 'row' }}
          sx={{ p: 3, bgcolor: 'background.neutral' }}
        >
          <TextField disabled label="Vente Numéro" value={data.vente.ref} />
          <TextField disabled label="Type de Vente" value={data.vente.type} />
          <TextField disabled label="Date Création" value={data.vente.dateCreation} />
          <TextField disabled label="Dernière Facture" value={data.vente.dateCreation} />
          <TextField disabled label="Note" value={data.vente.note} />
        </Stack>

        <Stack spacing={2} py={2}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField label="Libellé" value={data.produit.label} fullWidth disabled />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField label="Durée" value={data.produit.duree} fullWidth disabled />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField label="Prix (€)" value={data.produit.prix} fullWidth disabled />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Champ libre" value={data.produit.champLibre} fullWidth disabled />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField label="Remise (€ TTC)" value={data.produit.remise} fullWidth disabled />
            </Grid>
          </Grid>
        </Stack>
      </Card>

      <CustomPopover open={popover.open} onClose={popover.onClose} anchorEl={popover.anchorEl}>
        <MenuList>
          {STATUS_OPTIONS.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === status}
              onClick={() => handleChangeStatus(option.value)}
            >
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </CustomPopover>
    </DashboardContent>
  );
}
