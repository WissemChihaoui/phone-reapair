import { useCallback } from 'react';

import Chip from '@mui/material/Chip';

import { sentenceCase } from 'src/utils/change-case';

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

// ----------------------------------------------------------------------

export function ProductTableFiltersResult({ filters, totalResults, sx }) {
  const handleRemoveStock = useCallback(
    (inputValue) => {
      const newValue = filters.state.stock.filter((item) => item !== inputValue);

      filters.setState({ stock: newValue });
    },
    [filters]
  );

  const handleRemovePublish = useCallback(
    (inputValue) => {
      const newValue = filters.state.publish.filter((item) => item !== inputValue);

      filters.setState({ publish: newValue });
    },
    [filters]
  );
  const handleRemoveCategory = useCallback(
    (inputValue) => {
      const newValue = "";

      filters.setState({ category: newValue });
    },
    [filters]
  );
  const handleRemoveSousCategory = useCallback(
    (inputValue) => {
      const newValue = "";

      filters.setState({ sousCategory: newValue });
    },
    [filters]
  );

  return (
    <FiltersResult totalResults={totalResults} onReset={filters.onResetState} sx={sx}>
      <FiltersBlock label="Stock:" isShow={!!filters.state.stock?.length}>
        {filters.state.stock?.map((item) => (
          <Chip
            {...chipProps}
            key={item}
            label={sentenceCase(item)}
            onDelete={() => handleRemoveStock(item)}
          />
        ))}
      </FiltersBlock>

      <FiltersBlock label="Publish:" isShow={!!filters.state.publish?.length}>
        {filters.state.publish?.map((item) => (
          <Chip
            {...chipProps}
            key={item}
            label={sentenceCase(item)}
            onDelete={() => handleRemovePublish(item)}
          />
        ))}
      </FiltersBlock>
      <FiltersBlock label="Catégories:" isShow={!!filters.state.category?.length}>
      <Chip
            {...chipProps}
            key={filters.state.category}
            label={sentenceCase(filters.state.category)}
            onDelete={() => handleRemoveCategory(filters.state.category)}
          />
      </FiltersBlock>
      <FiltersBlock label="Sous Catégorie:" isShow={!!filters.state.sousCategory?.length}>
      <Chip
            {...chipProps}
            key={filters.state.sousCategory}
            label={sentenceCase(filters.state.sousCategory)}
            onDelete={() => handleRemoveSousCategory(filters.state.sousCategory)}
          />
      </FiltersBlock>
    </FiltersResult>
  );
}
