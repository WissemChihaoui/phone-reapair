import React from 'react';

import { Stack, Button, Divider } from '@mui/material';

import { Iconify } from 'src/components/iconify';


export default function DividerItem({ onRemove }) {
  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      sx={{ px: 2, py: 1 }}
    >
      <Divider sx={{ flexGrow: 1, borderStyle: 'dashed' }} />
      <Button
        size="small"
        color="error"
        variant="contained"
        onClick={onRemove}
        startIcon={<Iconify icon="mdi:delete" />}
      >
        Supprimer
      </Button>
    </Stack>
  );
}
