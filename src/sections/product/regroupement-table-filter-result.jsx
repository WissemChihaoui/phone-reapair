import { useCallback } from 'react';

import Chip from '@mui/material/Chip';

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

export default function RegroupementTableFilterResult({ filters, onResetPage, totalResults, sx }) {
  const handleRemoveKeyword = useCallback(() => {
    onResetPage();
    filters.setState({ name: '' });
  }, [filters, onResetPage]);

    const handleReset = useCallback(() => {
      onResetPage();
      filters.onResetState();
    }, [filters, onResetPage]);
  return (
    <FiltersResult totalResults={totalResults} onReset={handleReset} sx={sx}>
    

      <FiltersBlock label="Mot clé:" isShow={!!filters.state.name}>
        <Chip {...chipProps} label={filters.state.name} onDelete={handleRemoveKeyword} />
      </FiltersBlock>
    </FiltersResult>
  );
}
