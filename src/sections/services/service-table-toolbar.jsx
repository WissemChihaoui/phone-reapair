import { useCallback } from 'react';

import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { Select, InputLabel, FormControl, OutlinedInput } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

export default function ServiceTableToolbar({ filters, onResetPage }) {
  const popover = usePopover();

  const handleFilterName = useCallback(
    (event) => {
      onResetPage();
      filters.setState({ name: event.target.value });
    },
    [filters, onResetPage]
  );

  const handleFilterStatus = useCallback(
    (event) => {
        onResetPage();
        filters.setState({ status: event.target.value })
    },
    [filters, onResetPage]
  )

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{ xs: 'column', md: 'row' }}
        sx={{ p: 2.5, pr: { xs: 2.5, md: 1 } }}
      >
        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          <FormControl sx={{ flexShrink: 0, width: { xs: 1, md: 200 } }}>
              <InputLabel htmlFor="user-filter-role-select-label">Statut</InputLabel>
              <Select
              onChange={handleFilterStatus}
                label="Statut"
                value={filters.state.statut}
                input={
                  <OutlinedInput
                    label="Statut"
                    renderValue={(selected) => selected.map((value) => value).join(', ')}
                    inputProps={{ id: 'user-filter-role-select-label' }}
                    MenuProps={{ PaperProps: { sx: { maxHeight: 240 } } }}
                  />
                }
              >
                <MenuItem value="all">Touts</MenuItem>
                <MenuItem value="actif">Actif</MenuItem>
                <MenuItem value="inactif">Inactif</MenuItem>
              </Select>
          </FormControl>
          <TextField
            fullWidth
            value={filters.state.name}
            onChange={handleFilterName}
            placeholder="Search customer or order number..."
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
            }}
          >
            <Iconify icon="solar:printer-minimalistic-bold" />
            Print
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose();
            }}
          >
            <Iconify icon="solar:import-bold" />
            Import
          </MenuItem>

          <MenuItem
            onClick={() => {
              popover.onClose();
            }}
          >
            <Iconify icon="solar:export-bold" />
            Export
          </MenuItem>
        </MenuList>
      </CustomPopover>
    </>
  );
}
