import { useCallback } from 'react';

import Chip from '@mui/material/Chip';

import { fDateRangeShortLabel } from 'src/utils/format-time';

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

// ----------------------------------------------------------------------

export function ExportFamilleFiltersResult({ filters, setFilters, totalResults, onResetPage, sx }) {
  const handleRemoveFamille = useCallback(() => {
    onResetPage();
    filters.setState(prev => ({ ...prev, type: '' }));
  }, [onResetPage, filters]);

  const handleRemoveStatus = useCallback(() => {
    onResetPage();
    filters.setState(prev => ({ ...prev, status: 'all' }));
  }, [onResetPage, filters]);

  const handleRemoveDate = useCallback(() => {
    onResetPage();
    filters.setState(prev => ({ ...prev, startDate: null, endDate: null }));
  }, [onResetPage, filters]);

  const handleReset = useCallback(() => {
    onResetPage();
    filters.setState({ type: '', status: 'all', startDate: null, endDate: null });
  }, [onResetPage, filters]);

  return (
    <FiltersResult totalResults={totalResults} onReset={handleReset} sx={sx}>
      <FiltersBlock label="Famille:" isShow={!!filters.state.type}>
        <Chip {...chipProps} label={filters.state.type} onDelete={handleRemoveFamille} />
      </FiltersBlock>

      <FiltersBlock label="Status:" isShow={filters.state.status !== 'all'}>
        <Chip
          {...chipProps}
          label={filters.state.status}
          onDelete={handleRemoveStatus}
          sx={{ textTransform: 'capitalize' }}
        />
      </FiltersBlock>

      <FiltersBlock label="Date:" isShow={Boolean(filters.state.startDate && filters.state.endDate)}>
        <Chip
          {...chipProps}
          label={fDateRangeShortLabel(filters.state.startDate, filters.state.endDate)}
          onDelete={handleRemoveDate}
        />
      </FiltersBlock>
    </FiltersResult>
  );
}
