import { useState, useEffect, useCallback } from 'react';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import AvatarGroup, { avatarGroupClasses } from '@mui/material/AvatarGroup';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fShortenNumber } from 'src/utils/format-number';

import { POST_PUBLISH_OPTIONS } from 'src/_mock';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { Markdown } from 'src/components/markdown';
import { EmptyContent } from 'src/components/empty-content';

import { PostDetailsHero } from '../post-details-hero';
import { PostCommentList } from '../post-comment-list';
import { PostCommentForm } from '../post-comment-form';
import { PostDetailsSkeleton } from '../post-skeleton';
import { PostDetailsToolbar } from '../post-details-toolbar';

// ----------------------------------------------------------------------

export function NewsViewPage({ post, loading, error }) {
  const [publish, setPublish] = useState('');

  const handleChangePublish = useCallback((newValue) => {
    setPublish(newValue);
  }, []);

  useEffect(() => {
    if (post) {
      setPublish(post?.publish);
    }
  }, [post]);

  if (loading) {
    return (
      <DashboardContent maxWidth={false} disablePadding>
        <PostDetailsSkeleton />
      </DashboardContent>
    );
  }

  if (error) {
    return (
      <DashboardContent maxWidth={false}>
        <EmptyContent
          filled
          title="Post not found!"
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.news.root}
              startIcon={<Iconify width={16} icon="eva:arrow-ios-back-fill" />}
              sx={{ mt: 3 }}
            >
              Back to list
            </Button>
          }
          sx={{ py: 10, height: 'auto', flexGrow: 'unset' }}
        />
      </DashboardContent>
    );
  }

  return (
    <DashboardContent maxWidth={false} disablePadding>
      <PostDetailsHero title={`${post?.title}`} coverUrl={`${post?.coverUrl}`} />

      <Stack
        sx={{
          pb: 5,
          mx: 'auto',
          maxWidth: 720,
          mt: { xs: 5, md: 10 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <Typography variant="subtitle1">{post?.description}</Typography>

        <Markdown children={post?.content} />

      </Stack>
    </DashboardContent>
  );
}
