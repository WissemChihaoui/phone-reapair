import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { fDateTime } from 'src/utils/format-time';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';
import { useBoolean } from 'src/hooks/use-boolean';
import DisplayControlPanel from './display-control-panel';

// ----------------------------------------------------------------------

export function DisplayDetailsToolbar({
  status,
  backLink,
  createdAt,
  orderNumber,
  statusOptions,
  onChangeStatus,
}) {
  const popover = usePopover();
  const printPopover = usePopover();
  const openPanel = useBoolean();

  return (
    <>
      <Stack spacing={3} direction={{ xs: 'column', md: 'row' }} sx={{ mb: { xs: 3, md: 5 } }}>
        <Stack spacing={1} direction="row" alignItems="flex-start">
          <IconButton component={RouterLink} href={backLink}>
            <Iconify icon="eva:arrow-ios-back-fill" />
          </IconButton>

          <Stack spacing={0.5}>
            <Stack spacing={1} direction="row" alignItems="center">
              <Typography variant="h4"> Réparation {orderNumber} </Typography>
              <Label
                variant="soft"
                color={
                  (status === 'completed' && 'success') ||
                  (status === 'pending' && 'warning') ||
                  (status === 'cancelled' && 'error') ||
                  'default'
                }
              >
                {status}
              </Label>
            </Stack>

            <Typography variant="body2" sx={{ color: 'text.disabled' }}>
              {fDateTime(createdAt)}
            </Typography>
          </Stack>
        </Stack>

        <Stack
          flexGrow={1}
          spacing={1.5}
          direction="row"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Button
            color="primary"
            variant="outlined"
            endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            onClick={popover.onOpen}
            sx={{ textTransform: 'capitalize' }}
          >
            {status}
          </Button>

          <Button
            color="primary"
            variant="outlined"
            startIcon={<Iconify icon="solar:printer-minimalistic-bold" />}
            endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
            onClick={printPopover.onOpen}
          >
            Imprimer
          </Button>

          <Button color="primary" variant="contained" startIcon={<Iconify icon="solar:pen-bold" />}>
            Modifier
          </Button>
          <Button onClick={()=>openPanel.onTrue()} color="primary" variant="contained" startIcon={<Iconify icon="tdesign:setting-filled" />}>
          panneau de contrôle
          </Button>
        </Stack>
      </Stack>

      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'top-right' } }}
      >
        <MenuList>
          {statusOptions.map((option) => (
            <MenuItem
              key={option.value}
              selected={option.value === status}
              onClick={() => {
                popover.onClose();
                onChangeStatus(option.value);
              }}
            >
              {option.label}
            </MenuItem>
          ))}
        </MenuList>
      </CustomPopover>

      <CustomPopover 
        open={printPopover.open}
        anchorEl={printPopover.anchorEl}
        onClose={printPopover.onClose}
        slotProps={{ arrow: { placement: 'top-right' } }}
      >
        <MenuItem
              onClick={() => {
                console.log('lien 1');
              }}
            >
              Réçu
            </MenuItem>
        <MenuItem
              onClick={() => {
                console.log('lien 2');
              }}
            >
              Étiquette
            </MenuItem>
        <MenuItem
              onClick={() => {
                console.log('lien 3');
              }}
            >
              Réçu atelier
            </MenuItem>
      </CustomPopover>

      <DisplayControlPanel open={openPanel.value} onClose={openPanel.onFalse} />
    </>
  );
}
