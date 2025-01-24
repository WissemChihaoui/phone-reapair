import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';
import { fShortenNumber } from 'src/utils/format-number';

import { maxLine } from 'src/theme/styles';

import { Label } from 'src/components/label';
import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function PostItemHorizontal({ post, sx, ...other }) {

  return (
    <>
      <Card sx={{ display: 'flex', ...sx }} {...other}>
        <Stack spacing={1} flexGrow={1} sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
          <Label
  variant={(post.publish === 'Tous' && 'filled') || 'soft'}
  color={
    (post.publish === 'Faible' && 'success') ||
    (post.publish === 'Moyen' && 'warning') ||
    (post.publish === 'Urgent' && 'error') ||
    'default'
  }
>
  {post.publish}
</Label>


            <Box component="span" sx={{ typography: 'caption', color: 'text.disabled' }}>
              {fDate(post.createdAt)}
            </Box>
          </Box>

          <Stack spacing={1} flexGrow={1}>
            <Link
              component={RouterLink}
              href={paths.admin.editSupport('climate-change-and-its-effects-on-global-food-security')}
              color="inherit"
              variant="subtitle2"
              sx={{ ...maxLine({ line: 2 }) }}
            >
              {post.title}
            </Link>

            <Typography variant="body2" sx={{ ...maxLine({ line: 2 }), color: 'text.secondary' }}>
              {post.description}
            </Typography>
          </Stack>

          <Box display="flex" alignItems="center">
            <IconButton color='error'>
              <Iconify icon="solar:trash-bin-trash-bold" />
            </IconButton>
            <IconButton component={RouterLink} color='info' href={paths.dashboard.support.edit('climate-change-and-its-effects-on-global-food-security')}>
              <Iconify icon="mdi:eye" />
            </IconButton>
            <IconButton color='warning'>
              <Iconify icon="mdi:bell" />
            </IconButton>

            <Box
              gap={1.5}
              flexGrow={1}
              display="flex"
              flexWrap="wrap"
              justifyContent="flex-end"
              sx={{ typography: 'caption', color: 'text.disabled' }}
            >
              <Box display="flex" alignItems="center" gap={0.5}>
                <Iconify icon="eva:message-circle-fill" width={16} />
                {fShortenNumber(post.totalComments)}
              </Box>
            </Box>
          </Box>
        </Stack>
      </Card>
    </>
  );
}
