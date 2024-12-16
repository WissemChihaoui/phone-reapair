import { InputAdornment, Stack, TextField } from '@mui/material';
import React, { useCallback } from 'react'
import { Iconify } from 'src/components/iconify';
import { IconButton } from 'yet-another-react-lightbox';

export default function StatusTableToolbar({
    filters,
    onResetPage
}) {
    const handleFilterName = useCallback(
        (event) => {
            onResetPage();
            filters.setState({ name: event.target.value });
            },
        [filters, onResetPage]
    )
  return (
    <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{ xs: 'column', md: 'row' }}
        sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
      >
        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          <TextField
            fullWidth
            value={filters.state.name}
            onChange={handleFilterName}
            placeholder="Rechercher..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              ),
            }}
          />
        </Stack>
      </Stack>
  )
}
