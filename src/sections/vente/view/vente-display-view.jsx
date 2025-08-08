import React, { useState } from 'react';
import { PDFViewer } from '@react-pdf/renderer';

import Grid from '@mui/material/Unstable_Grid2';
import {
  Box,
  Card,
  Stack,
  Button,
  Dialog,
  Divider,
  MenuList,
  MenuItem,
  TextField,
  Typography,
  DialogActions,
} from '@mui/material';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { fDate } from 'src/utils/format-time';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

import FacturePDF from '../vente-facture-pdf';

// Status options & color mapping
const STATUS_OPTIONS = [
  { label: 'Payé', value: 'Payé' },
  { label: 'Impayé', value: 'Impayé' },
  { label: 'En attente', value: 'En attente' },
  { label: 'Annulé', value: 'Annulé' },
];

const STATUS_COLORS = {
  Payé: 'success',
  Impayé: 'error',
  'En attente': 'warning',
  Annulé: 'info',
};

export default function VenteDisplayView({ product }) {
  const mdUp = useResponsive('up', 'md');
  const popover = usePopover();
  const facture = useBoolean();

  const [status, setStatus] = useState(product?.status || 'Payé');

  const handleChangeStatus = (newStatus) => {
    setStatus(newStatus);
    popover.onClose();
  };

  const { client, date, vente, note, items, payement, totalAmount, rest, discount, totalHt } =
    product;

  const renderActions = (
    <Stack flexDirection="row" spacing={2}>
      <Button onClick={facture.onTrue} variant="contained" color="info">
        Générer la facture
      </Button>
      <Button variant="contained" color="primary">
        Envoyer par email
      </Button>
      <Button variant="contained" color="primary">
        Imprimer + email
      </Button>
      <Button
        variant="contained"
        onClick={popover.onOpen}
        color={STATUS_COLORS[status] || 'primary'}
      >
        Statut : {status}
      </Button>
    </Stack>
  );

  return (
    <>
      <DashboardContent>
        <CustomBreadcrumbs
          heading="Détails de vente"
          links={[
            { name: 'Tableau de brd', href: paths.dashboard.root },
            { name: 'Vente', href: paths.dashboard.vente.root },
            { name: 'Suivi des ventes', href: paths.dashboard.vente.suivre },
            { name: 'Détails' },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
          action={renderActions}
        />

        <Card sx={{ p: 3 }}>
          {/* Client & General Info */}
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
              <Typography variant="subtitle1">Client</Typography>
              <Typography variant="subtitle2">{client?.name}</Typography>
              <Typography variant="body2">{client?.company}</Typography>
              <Typography variant="body2">{client?.fullAddress}</Typography>
              <Typography variant="body2">{client?.phoneNumber}</Typography>
              <Typography variant="body2">{client?.email}</Typography>
            </Stack>

            <Stack spacing={2} sx={{ width: 1 }}>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  Date
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {fDate(date)}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  Type
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {product.type}
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  Montant total
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {totalAmount} €
                </Typography>
              </Box>
              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2" color="text.secondary">
                  Restant
                </Typography>
                <Typography variant="body2" fontWeight="medium">
                  {rest} €
                </Typography>
              </Box>
            </Stack>
          </Stack>

          {/* Paiements */}
          <Stack spacing={2} sx={{ px: 3, pb: 2 }}>
            <Typography variant="subtitle1">Paiement(s)</Typography>
            {payement?.map((p, i) => (
              <Box
                key={i}
                display="flex"
                justifyContent="space-between"
                sx={{ typography: 'body2', color: 'text.secondary' }}
              >
                <span>
                  {fDate(p.date)} - {p.via}
                </span>
                <strong>{p.amount} €</strong>
              </Box>
            ))}
          </Stack>

          <Divider sx={{ my: 2 }} />

          {/* Articles / Items */}
          <Stack spacing={2} sx={{ p: 3, bgcolor: 'background.neutral' }}>
            <Typography variant="subtitle1">Articles</Typography>
            {items
              ?.filter((item) => item.type && item.type !== 'divider')
              .map((item, index) => (
                <Box key={index} sx={{ borderBottom: '1px dashed #ccc', pb: 1 }}>
                  <Typography variant="body2" fontWeight="medium">
                    {item.nom} ({item.type})
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.champ}
                  </Typography>
                  <Box display="flex" justifyContent="space-between" mt={1}>
                    <Typography variant="body2">Qté: {item.qte}</Typography>
                    <Typography variant="body2">Prix: {item.price} €</Typography>
                    <Typography variant="body2">Total: {item.total} €</Typography>
                  </Box>
                </Box>
              ))}
          </Stack>

          {/* Infos complémentaires */}
          <Grid container spacing={2} sx={{ px: 3, pt: 3 }}>
            <Grid xs={12} md={6}>
              <TextField fullWidth disabled label="Note" value={note} />
            </Grid>
            <Grid xs={6} md={3}>
              <TextField fullWidth disabled label="Remise globale (%)" value={discount} />
            </Grid>
            <Grid xs={6} md={3}>
              <TextField fullWidth disabled label="Total HT" value={totalHt || ''} />
            </Grid>
          </Grid>
        </Card>

        {/* Status Popover */}
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
      <Dialog fullScreen open={facture.value} onClose={facture.onFalse}>
        <Box sx={{ height: 1, display: 'flex', flexDirection: 'column' }}>
          <DialogActions sx={{ p: 1.5 }}>
            <Button color="inherit" variant="contained" onClick={facture.onFalse}>
              Fermer
            </Button>
          </DialogActions>

          <Box sx={{ flexGrow: 1, height: 1, overflow: 'hidden' }}>
            <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
              <FacturePDF
                facture={{
                  client: {
                    name: 'Passager-e0gYrS',
                    phone: '41787420',
                    ref: '86-00641',
                  },
                  invoiceNumber: 'F2025-0602',
                  date: '2025-07-23T10:43:00',
                  product: 'test regroupement',
                  serialNumber: '',
                  priceHT: 245.83,
                  tva: 20, // or 49.17 / 245.83 * 100
                  priceTTC: 295.0,
                  paymentMethod: 'Espèce',
                }}
              />
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
