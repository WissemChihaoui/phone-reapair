import { Avatar, Box, Button, Card, Divider, IconButton, Link, ListItemText, MenuItem, MenuList, Stack, TextField } from '@mui/material';
import React from 'react';
import { CustomPopover, usePopover } from 'src/components/custom-popover';
import { Field, Form } from 'src/components/hook-form';
import { Iconify } from 'src/components/iconify';
import { CONFIG } from 'src/config-global';
import { RouterLink } from 'src/routes/components';

const APIS_ITEMS = [
    {   icon: `${CONFIG.assetsDir}/assets/images/mock/cover/cover-1.webp`, name: 'Ecosystem', routing:''}
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
        <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>

        <Stack sx={{ p: 3, pb: 2 }}>
          <Avatar
            alt={item.name}
            src={item.icon}
            variant="rounded"
            sx={{ mb: 2 }}
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
            <Stack display="flex" p={2}>
                <Button>Authentifier</Button>
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
