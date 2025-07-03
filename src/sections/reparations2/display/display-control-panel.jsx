import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { orderBy } from 'src/utils/helper';
import { fDate, fDateTime } from 'src/utils/format-time';

import { Iconify } from 'src/components/iconify';
import { Scrollbar } from 'src/components/scrollbar';
import { ColorPicker } from 'src/components/color-utils';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import { Block } from 'src/components/settings/drawer/styles';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

// ----------------------------------------------------------------------

export default function DisplayControlPanel({
  open,
  events,
  onClose,
  filters,
  canReset,
  dateError,
  colorOptions,
  onClickEvent,
}) {
  const handleFilterColors = useCallback(
    (newValue) => {
      filters.setState({ colors: newValue });
    },
    [filters]
  );

  const handleFilterStartDate = useCallback(
    (newValue) => {
      filters.setState({ startDate: newValue });
    },
    [filters]
  );

  const handleFilterEndDate = useCallback(
    (newValue) => {
      filters.setState({ endDate: newValue });
    },
    [filters]
  );

  const renderHead = (
    <>
      <Box display="flex" alignItems="center" sx={{ py: 2, pr: 1, pl: 2.5 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Panneau de contrôle
        </Typography>

        <IconButton onClick={onClose}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      </Box>

      <Divider sx={{ borderStyle: 'dashed' }} />
    </>
  );

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{ backdrop: { invisible: true } }}
      PaperProps={{ sx: { width: 600 } }}
    >
      {renderHead}

      <Scrollbar sx={{ py: 2, pr: 1, pl: 2.5 }}>
        <Block sx={{ mb: 2 }} title="Impression Document">
          <Grid container spacing={2}>
            <Grid xs={6}>
              <Button variant="outlined" disabled sx={{ height: '100%' }} fullWidth>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Iconify width={36} icon="mdi:file" />
                  Devis
                </Box>
              </Button>
            </Grid>
            <Grid xs={6}>
              <Button variant="outlined" disabled sx={{ height: '100%' }} fullWidth>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Iconify width={36} icon="teenyicons:pdf-solid" />
                  Réçu PDF
                </Box>
              </Button>
            </Grid>
            <Grid xs={6}>
              <Button variant="outlined" disabled sx={{ height: '100%' }} fullWidth>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Iconify width={36} icon="mdi:file" />
                  Bon de CMD
                </Box>
              </Button>
            </Grid>
            <Grid xs={6}>
              <Button variant="outlined" disabled sx={{ height: '100%' }} fullWidth>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Iconify width={36} icon="solar:ticket-bold" />
                  Réçu ticket
                </Box>
              </Button>
            </Grid>
          </Grid>
        </Block>
        <Block sx={{ mb: 2 }} title="Gestion de fichier">
          <Grid container spacing={2}>
            <Grid xs={6}>
              <Button variant="outlined" sx={{ height: '100%' }} fullWidth>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Iconify width={36} icon="mdi:invoice-text" />
                  Générer la facture
                </Box>
              </Button>
            </Grid>
            <Grid xs={6}>
              <Button variant="outlined" sx={{ height: '100%' }} fullWidth>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Iconify width={36} icon="mdi:invoice-text-arrow-right" />
                  Générer & Envoyer par mail
                </Box>
              </Button>
            </Grid>
            <Grid xs={6}>
              <Button variant="outlined" sx={{ height: '100%' }} fullWidth>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Iconify width={36} icon="mdi:invoice" />
                  Facture acompte
                </Box>
              </Button>
            </Grid>
            <Grid xs={6}>
              <Button variant="outlined" sx={{ height: '100%' }} fullWidth>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Iconify width={36} icon="mdi:invoice-send" />
                  Facture acompte par email
                </Box>
              </Button>
            </Grid>
          </Grid>
        </Block>
        <Block sx={{ mb: 2 }} title="Paramétres">
          <Grid container spacing={2}>
            <Grid xs={6}>
              <Button variant="outlined" sx={{ height: '100%' }} fullWidth>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Iconify width={36} icon="mdi:file" />
                  Rapport
                </Box>
              </Button>
            </Grid>
            <Grid xs={6}>
              <Button variant="outlined" sx={{ height: '100%' }} fullWidth>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Iconify width={36} icon="material-symbols:share" />
                  Partager
                </Box>
              </Button>
            </Grid>
            <Grid xs={6}>
              <Button href={paths.dashboard.ecosystem.add(1)} LinkComponent={RouterLink} variant="outlined" sx={{ height: '100%' }} fullWidth>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Iconify width={36} icon="nimbus:ecosystem" />
                  EcoSystem
                </Box>
              </Button>
            </Grid>
            <Grid xs={6}>
              <Button href={paths.dashboard.ecologic.add(1)} LinkComponent={RouterLink} variant="outlined" sx={{ height: '100%' }} fullWidth>
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Iconify width={36} icon="nimbus:ecosystem" />
                  EcoLogic
                </Box>
              </Button>
            </Grid>
          </Grid>
        </Block>
      </Scrollbar>
    </Drawer>
  );
}
