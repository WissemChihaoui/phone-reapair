import { useState, useEffect, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/dashboard';

import { MenuItem, MenuList } from '@mui/material';
import { CustomPopover, usePopover } from 'src/components/custom-popover';
import { LoadingButton } from '@mui/lab';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';
import { EmptyContent } from 'src/components/empty-content';
import { PostCommentForm } from '../post-comment-form';
import { PostCommentList } from '../post-comment-list';


// ----------------------------------------------------------------------

export function SupportItemView({ post, loading, error }) {
  const [publish, setPublish] = useState('');
  const popover = usePopover();
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
        {/* <PostDetailsSkeleton /> */}
      </DashboardContent>
    );
  }

  if (error) {
    return (
      <DashboardContent maxWidth={false}>
        <EmptyContent
          filled
          title="Ticket Introuvable"
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.support.root}
              startIcon={<Iconify width={16} icon="eva:arrow-ios-back-fill" />}
              sx={{ mt: 3 }}
            >
              Retour
            </Button>
          }
          sx={{ py: 10, height: 'auto', flexGrow: 'unset' }}
        />
      </DashboardContent>
    );
  }

  return (
    <>
    <DashboardContent>
        <CustomBreadcrumbs
                heading="Support Technique"
                links={[
                  { name: 'Tableau de bord', href: paths.dashboard.root },
                  { name: 'Support Technique', href: paths.dashboard.support.root },
                  { name: post.title },
                ]}
                action={
                    <LoadingButton
          color="inherit"
          variant="contained"
          loading={!publish}
          loadingIndicator="Loading…"
          endIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
          onClick={popover.onOpen}
          sx={{ textTransform: 'capitalize' }}
        >
          {publish}
        </LoadingButton>
                }
                sx={{ mb: { xs: 3, md: 5 } }}
              />

      <Stack
        sx={{
          pb: 5,
          mx: 'auto',
          maxWidth: 720,
          mt: { xs: 5, md: 10 },
          px: { xs: 2, sm: 3 },
        }}
      >
        <Typography variant="h4">{post?.title}</Typography>
        <Typography variant="subtitle1">{post?.description}</Typography>

       


        <Stack direction="row" sx={{ mb: 3, mt: 5 }}>
          <Typography variant="h4">Commentaires</Typography>

          <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
            ({post?.comments.length})
          </Typography>
        </Stack>

        <PostCommentForm />

        <Divider sx={{ mt: 5, mb: 2 }} />

        <PostCommentList comments={post?.comments ?? []} />
      </Stack>
    </DashboardContent>
    <CustomPopover
    open={popover.open}
    anchorEl={popover.anchorEl}
    onClose={popover.onClose}
    slotProps={{ arrow: { placement: 'top-right' } }}
  >
    <MenuList>
      {[
        { value: 'draft', label: 'Cloturer' },
        { value: 'published', label: 'En Cours' },
       ]
      .map((option) => (
        <MenuItem
          key={option.value}
          selected={option.value === publish}
          onClick={() => {
            popover.onClose();
            handleChangePublish(option.value);
          }}
        >
          {option.value === 'published' && <Iconify icon="eva:cloud-upload-fill" />}
          {option.value === 'draft' && <Iconify icon="solar:file-text-bold" />}
          {option.label}
        </MenuItem>
      ))}
    </MenuList>
  </CustomPopover>
    </>
  );
}
