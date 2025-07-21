import React from 'react';

import {
  Box,
  Card,
  Link,
  Stack,
  Switch,
  Divider,
  MenuItem,
  MenuList,
  TextField,
  ListItemText,
  FormControlLabel,
  Button,
} from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { CONFIG } from 'src/config-global';

import { Image } from 'src/components/image';
import { Label } from 'src/components/label';
import { Form } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

const APIS_ITEMS = [
  { icon: `${CONFIG.assetsDir}/assets/icons/ecosystem.png`, name: 'Ecosystem', routing: '' },
  { icon: `${CONFIG.assetsDir}/assets/icons/ecologic.png`, name: 'Ecologic', routing: '' },
];
export default function ApiFormView() {
  const switcher = useBoolean()
  const popover = usePopover();
  return (
    <>
      <FormControlLabel
      sx={{ mb: 2 }}
        control={
          <Switch
            size="small"
            name="disableZoom"
            checked={switcher.value}
            onChange={(e) => switcher.setValue(e.target.checked)}
          />
        }
        label="Éligible au label QualiRépar"
      />
      {switcher.value && (
        <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
      >
        {APIS_ITEMS.map((item) => (
          <Card>
            <Stack sx={{ position: 'absolute', top: 16, right: 16 }}>
              <Label color="success">Connecté</Label>
            </Stack>

            <Stack sx={{ p: 3, pb: 2 }}>
              <Stack width={120} height={120}>
                <Image alt={item.name} src={item.icon} sx={{ width: '100%' }} />
              </Stack>

              <ListItemText
                sx={{ mb: 1 }}
                primary={
                  <Link
                    component={RouterLink}
                    // href={paths.dashboard.job.details(job.id)}
                    color="inherit"
                  >
                    {item.name}
                  </Link>
                }
                primaryTypographyProps={{ typography: 'subtitle1' }}
              />
              <Form>
                <Box display="flex" flexDirection="column" gap={2}>
                  <TextField name="email" label="Email" />
                  <TextField type="password" name="email" label="Mot de passe" />
                </Box>
              </Form>
            </Stack>

            <Divider sx={{ borderStyle: 'dashed' }} />
            <Stack display="flex" width="100%" flexDirection="row" justifyContent="flex-end" p={2}>
              <Button color="primary" variant="contained">
                Authentifier
              </Button>
            </Stack>
          </Card>
        ))}
      </Box>)}
      <CustomPopover
        open={popover.open}
        anchorEl={popover.anchorEl}
        onClose={popover.onClose}
        slotProps={{ arrow: { placement: 'right-top' } }}
      >
        <MenuList>
          <MenuItem
            onClick={() => {
              popover.onClose();
              //   onView();
            }}
          >
            <Iconify icon="solar:eye-bold" />
            View
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose();
              //   onEdit();
            }}
          >
            <Iconify icon="solar:pen-bold" />
            Edit
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose();
              //   onDelete();
            }}
            sx={{ color: 'error.main' }}
          >
            <Iconify icon="solar:trash-bin-trash-bold" />
            Delete
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}
