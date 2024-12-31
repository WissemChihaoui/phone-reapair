import { useState, useCallback } from 'react';

import { paths } from 'src/routes/paths';

import { useDebounce } from 'src/hooks/use-debounce';
import { useSetState } from 'src/hooks/use-set-state';

import { orderBy } from 'src/utils/helper';

import { DashboardContent } from 'src/layouts/dashboard';
import { useGetPosts, useSearchPosts } from 'src/actions/blog';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { PostListHorizontal } from '../post-list-horizontal';

// ----------------------------------------------------------------------

export function NewsListView() {
  const [sortBy, setSortBy] = useState('latest');

  const { posts, postsLoading } = useGetPosts();

  const filters = useSetState({ publish: 'all' });

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Nouveautés"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Nouveautés', href: paths.dashboard.news.root },
          { name: 'Liste' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <PostListHorizontal posts={posts} loading={postsLoading} />
    </DashboardContent>
  );
}

