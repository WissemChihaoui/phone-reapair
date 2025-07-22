import React, { useCallback } from 'react';

import { Chip } from '@mui/material';

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

export default function SavTableFiltersResult({ filters, onResetPage, totalResults, sx, statusOptions }) {
  const handleRemoveStatus = useCallback(() => {
    onResetPage();
    filters.setState({ status: 'all' });
  }, [filters, onResetPage]);
  const handleReset = useCallback(() => {
    onResetPage();
    filters.onResetState();
  }, [filters, onResetPage]);

  return (
    <FiltersResult totalResults={totalResults} onReset={handleReset} sx={sx}>
      <FiltersBlock label="Statut:" isShow={filters.state.status !== 'all'}>
        <Chip
          {...chipProps}
          label={statusOptions.find((option) => option.value === filters.state.status)?.label}
          onDelete={handleRemoveStatus}
          sx={{ textTransform: 'capitalize' }}
        />
      </FiltersBlock>
    </FiltersResult>
  );
}
