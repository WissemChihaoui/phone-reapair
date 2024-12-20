import { Avatar, Box, Button, Card, Divider, IconButton, Link, ListItemText, MenuItem, MenuList, Stack, TextField } from '@mui/material';
import React from 'react';
import { CustomPopover, usePopover } from 'src/components/custom-popover';
import { Field, Form } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import { Image } from 'src/components/image';
import { Label } from 'src/components/label';
import { CONFIG } from 'src/config-global';
import { RouterLink } from 'src/routes/components';


const APIS_ITEMS = [
    {   icon: `${CONFIG.assetsDir}/assets/icons/ecosystem.png`, name: 'Ecosystem', routing:''}
]
export default function ApiFormView() {
    const popover = usePopover();
  return (
    <>
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{ xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }}
    >
       {
        APIS_ITEMS.map((item) => (
            <Card>
        <Stack sx={{ position: 'absolute', top: 16, right: 16 }}>
          <Label color="success">Connecté</Label>
        </Stack>

        <Stack sx={{ p: 3, pb: 2 }}>
          {/* <Avatar
            alt={item.name}
            src={item.icon}
            variant="rounded"
            sx={{ mb: 2 }}
          /> */}

          <Image
          alt={item.name}
          src={item.icon}
          ratio="3/2"
          sx={{ width: "50%"}}
          />

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
                <TextField name='email' label="Email" />
                <TextField type='password' name='email' label="Mot de passe" />
            </Box>
        </Form>
        </Stack>

       

        <Divider sx={{ borderStyle: 'dashed' }} />
            <Stack display="flex" width="100%" flexDirection="row" justifyContent="flex-end" p={2}>
                <Button color='primary' variant='contained'>Authentifier</Button>
            </Stack>
        
      </Card>
        ))
       }
    </Box>
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
