import { useCallback } from 'react';

import Chip from '@mui/material/Chip';

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

// ----------------------------------------------------------------------

export function MaterialFiltersResult({ filters, totalResults, onResetPage, sx }) {
  const handleRemoveKeyword = useCallback(() => {
    onResetPage();
    filters.setState({ name: '' });
  }, [filters, onResetPage]);
  const handleRemoveRole = useCallback(
    (inputValue) => {
      const newValue = filters.state.materiel.filter((item) => item !== inputValue);

      onResetPage();
      filters.setState({ materiel: newValue });
    },
    [filters, onResetPage]
  );
  return (
    <FiltersResult totalResults={totalResults} onReset={filters.onResetState} sx={sx}>
      <FiltersBlock label="Mot clés:" isShow={!!filters.state.name}>
        <Chip {...chipProps} label={filters.state.name} onDelete={handleRemoveKeyword} />
      </FiltersBlock>
      <FiltersBlock label="Matériel:" isShow={!!filters.state.materiel.length}>
        {filters.state.materiel.map((item) => (
          <Chip {...chipProps} key={item} label={item} onDelete={() => handleRemoveRole(item)} />
        ))}
      </FiltersBlock>
    </FiltersResult>
  );
}
