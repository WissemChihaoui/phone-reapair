import { Button, Stack, Tab, Tabs } from '@mui/material';
import React, { useCallback, useState } from 'react';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import { useDebounce } from 'src/hooks/use-debounce';
import { orderBy } from 'src/utils/helper';
import { useSetState } from 'src/hooks/use-set-state';
import { useGetPosts, useSearchPosts } from 'src/actions/blog';
import { RouterLink } from 'src/routes/components';
import { Label } from 'src/components/label';
import { SupportSearch } from '../support-search';
import { SupportList } from '../support-list';

export default function SupportListView() {
    const [sortBy, setSortBy] = useState('latest');

  const [searchQuery, setSearchQuery] = useState('');

  const debouncedQuery = useDebounce(searchQuery);

  const { posts, postsLoading } = useGetPosts();

  const { searchResults, searchLoading } = useSearchPosts(debouncedQuery);

  const filters = useSetState({ publish: 'Tous' });

  const dataFiltered = applyFilter({ inputData: posts, filters: filters.state, sortBy });

  const handleSortBy = useCallback((newValue) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback((inputValue) => {
    setSearchQuery(inputValue);
  }, []);

  const handleFilterPublish = useCallback(
    (event, newValue) => {
      filters.setState({ publish: newValue });
    },
    [filters]
  );
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Support Technique"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Support Technique', href: paths.dashboard.support.root },
          { name: 'Liste' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.support.add}
            variant='contained'
          >
            Ajouter Ticket
          </Button>
        }
      />

<Stack
        spacing={3}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-end', sm: 'center' }}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{ mb: { xs: 3, md: 5 } }}
      >
        <SupportSearch
          query={debouncedQuery}
          results={searchResults}
          onSearch={handleSearch}
          loading={searchLoading}
          hrefItem={(title) => paths.dashboard.post.details(title)}
        />

      </Stack>

      <Tabs
  value={filters.state.publish}
  onChange={handleFilterPublish}
  sx={{ mb: { xs: 3, md: 5 } }}
>
  {['Tous', 'Faible', 'Moyen', 'Hauteur', 'Urgent'].map((tab) => (
    <Tab
      key={tab}
      iconPosition="end"
      value={tab}
      label={tab}
      icon={
        <Label
          variant={((tab === 'Tous' || tab === filters.state.publish) && 'filled') || 'soft'}
          color={
            (tab === 'Faible' && 'success') ||
            (tab === 'Moyen' && 'warning') ||
            (tab === 'Hauteur' && 'info') || // Adjust color as needed
            (tab === 'Urgent' && 'error') || // Adjust color as needed
            'default'
          }
        >
          {tab === 'Tous' && posts.length}

          {tab === 'Faible' && posts.filter((post) => post.publish === 'Faible').length}

          {tab === 'Moyen' && posts.filter((post) => post.publish === 'Moyen').length}

          {tab === 'Hauteur' && posts.filter((post) => post.publish === 'Hauteur').length}

          {tab === 'Urgent' && posts.filter((post) => post.publish === 'Urgent').length}
        </Label>
      }
      sx={{ textTransform: 'capitalize' }}
    />
  ))}
</Tabs>
<SupportList posts={dataFiltered} loading={postsLoading} />

    </DashboardContent>
  );
}

const applyFilter = ({ inputData, filters, sortBy }) => {
    const { publish } = filters;
  
    if (sortBy === 'latest') {
      inputData = orderBy(inputData, ['createdAt'], ['desc']);
    }
  
    if (sortBy === 'oldest') {
      inputData = orderBy(inputData, ['createdAt'], ['asc']);
    }
  
    if (sortBy === 'popular') {
      inputData = orderBy(inputData, ['totalViews'], ['desc']);
    }
  
    if (publish !== 'Tous') {
      inputData = inputData.filter((post) => post.publish === publish);
    }
  
    return inputData;
  };
  