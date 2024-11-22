import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React, { useCallback } from 'react';
import { useSetState } from 'src/hooks/use-set-state';

export default function ProductAlertToolbar({ filters, options }) {
  const local = useSetState({
    category: filters.state.category || '',
    sousCategory: '',
  });

  const handleChangeCategory = useCallback(
    (event) => {
      const {
        target: { value },
      } = event;

      // Find the selected category to populate children
      const selectedCategory = options.category.find((p) => p.value === value);
      const children = selectedCategory?.childrens || [];

      // Update states
      local.setState({
        category: value,
        sousCategory: '', // Reset the sous category on category change
      });
      filters.setState({ category: value, sousCategory: '' });

      // Log the states for debugging
      console.log('Selected Category:', selectedCategory);
      console.log('Children:', children);
    },
    [local, filters, options]
  );

  const handleChangeSousCategory = useCallback(
    (event) => {
      const {
        target: { value },
      } = event;

      // Update sous category
      local.setState({ sousCategory: value });
      filters.setState({ sousCategory: value });

      console.log('Selected Sous Category:', value);
    },
    [local, filters]
  );

  // Find children for the currently selected category
  const currentCategory = options.category.find(
    (p) => p.value === local.state.category
  );
  const sousCategories = currentCategory?.childrens || [];

  return (
    <>
      <FormControl>
        <InputLabel htmlFor="max-width-label">Catégorie</InputLabel>
        <Select
          sx={{ minWidth: 180 }}
          name="category"
          label="Category"
          value={local.state.category}
          inputProps={{ id: 'max-width-label' }}
          onChange={handleChangeCategory}
        >
          {options.category.map((x) => (
            <MenuItem key={x.value} value={x.value}>
              {x.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="max-width-label-2">Sous catégorie</InputLabel>
        <Select
          sx={{ minWidth: 180 }}
          name="sousCategory"
          label="Sous Catégorie"
          value={local.state.sousCategory}
          inputProps={{ id: 'max-width-label-2' }}
          onChange={handleChangeSousCategory}
          disabled={sousCategories.length === 0} // Disable if no sous categories
        >
          {sousCategories.map((x) => (
            <MenuItem key={x.value} value={x.value}>
              {x.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}
