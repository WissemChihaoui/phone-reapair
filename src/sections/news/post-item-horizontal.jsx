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
import { Image } from 'src/components/image';
import { Iconify } from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export function PostItemHorizontal({ post, sx, ...other }) {
  const popover = usePopover();

  const router = useRouter();

  return (
    <>
      <Card sx={{ display: 'flex', ...sx }} {...other}>
        <Stack spacing={1} flexGrow={1} sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Label variant="soft" color={(post.publish === 'published' && 'info') || 'default'}>
              {post.publish}
            </Label>

            <Box component="span" sx={{ typography: 'caption', color: 'text.disabled' }}>
              {fDate(post.createdAt)}
            </Box>
          </Box>

          <Stack spacing={1} flexGrow={1}>
            <Link
              component={RouterLink}
              href={paths.dashboard.news.view("exploring-the-impact-of-artificial-intelligence-on-modern-healthcare")}
              color="inherit"
              variant="subtitle2"
              sx={{ ...maxLine({ line: 2 }) }}
            >
              {post.title}
            </Link>

            <Typography variant="body2" sx={{ ...maxLine({ line: 5 }), color: 'text.secondary' }}>
              {post.description}
            </Typography>
          </Stack>
        </Stack>

        <Box
          sx={{
            p: 1,
            width: 180,
            height: 240,
            flexShrink: 0,
            position: 'relative',
            display: { xs: 'none', sm: 'block' },
          }}
        >
          <Image alt={post.title} src={post.coverUrl} sx={{ height: 1, borderRadius: 1.5 }} />
        </Box>
      </Card>
    </>
  );
}
