import { useCallback } from 'react';

import Stack from '@mui/material/Stack';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { formHelperTextClasses } from '@mui/material/FormHelperText';
import { Button, FormControl, InputLabel, OutlinedInput, Select } from '@mui/material';

import { Iconify } from 'src/components/iconify';
import { usePopover, CustomPopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

const listStatus = [
  { value: 'all', label: 'Tous' },
  { value: 'Réparation', label: 'Réparation' },
  { value: 'Vente', label: 'Vente' },
];
export function ExportTableToolbar({ filters, onResetPage, dateError }) {
  const popover = usePopover();

  const handleFilterRole = useCallback(
    (event) => {
      const newValue = event.target.value;
      onResetPage();
      filters.setState({ type: newValue });
    },
    [filters, onResetPage]
  );

  const handleFilterStartDate = useCallback(
    (newValue) => {
      onResetPage();
      filters.setState({ startDate: newValue });
    },
    [filters, onResetPage]
  );

  const handleFilterEndDate = useCallback(
    (newValue) => {
      onResetPage();
      filters.setState({ endDate: newValue });
    },
    [filters, onResetPage]
  );

  return (
    <>
      <Stack
        spacing={2}
        alignItems={{ xs: 'flex-end', md: 'center' }}
        direction={{ xs: 'column', md: 'row' }}
        sx={{ p: 2.5 }}
      >
        <DatePicker
          label="Date de début"
          value={filters.state.startDate}
          onChange={handleFilterStartDate}
          slotProps={{ textField: { fullWidth: true } }}
          sx={{ maxWidth: { md: 200 } }}
        />

        <DatePicker
          label="Date de fin"
          value={filters.state.endDate}
          onChange={handleFilterEndDate}
          slotProps={{
            textField: {
              fullWidth: true,
              error: dateError,
              helperText: dateError
                ? 'La date de fin doit être postérieure à la date de début'
                : null,
            },
          }}
          sx={{
            maxWidth: { md: 200 },
            [`& .${formHelperTextClasses.root}`]: {
              position: { md: 'absolute' },
              bottom: { md: -40 },
            },
          }}
        />

        <Stack direction="row" alignItems="center" spacing={2} flexGrow={1} sx={{ width: 1 }}>
          <FormControl sx={{width: { xs: 1 } }}>
            <InputLabel htmlFor="user-filter-role-select-label">Type</InputLabel>
            <Select
              fullWidth
              value={filters.state.type}
              onChange={handleFilterRole}
              input={<OutlinedInput label="Type" />}
              renderValue={(selected) => {
                const selectedOption = listStatus.find((option) => option.value === selected);
                return selectedOption ? selectedOption.label : '';
              }}
              inputProps={{ id: 'user-filter-role-select-label' }}
              MenuProps={{ PaperProps: { sx: { maxHeight: 240 } } }}
            >
              {listStatus.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
