import React from 'react';
import { CompactContent } from 'src/layouts/simple';
import Grid from '@mui/material/Unstable_Grid2';
import DetailsToolbarView from '../details-toolbar-view';
import HistoryTimelineView from '../history-timeline-view';
import CommentsSectionView from '../comments-section-view';
import { ContactForm } from '../contact-form';

const comments = [
  {
    avatarUrl: 'https://api-dev-minimal-v610.pages.dev/assets/images/avatar/avatar-1.webp',
    id: 'f86b9157-af1e-431d-bfde-f921cef9fd9d',
    message: 'She eagerly opened the gift, her eyes sparkling with excitement.',
    name: 'SaaSGestion',
    postedAt: '2025-01-14T11:37:34+00:00',
  },
  {
    avatarUrl: 'https://api-dev-minimal-v610.pages.dev/assets/images/avatar/avatar-5.webp',
    id: 'ab4b7ca8-790f-4a4c-81e7-7590d7bea3c2',
    message:
      'He carefully crafted a beautiful sculpture out of clay, his hands skillfully shaping the intricate details.',
    name: 'SaaSGestion',
    postedAt: '2025-01-14T11:37:34+00:00',
  },
];
export default function SuiviDetailsView() {
  return (
    <>
      <CompactContent sx={{ maxWidth: '75%', textAlign: '' }}>
        <DetailsToolbarView />
        <Grid container spacing={3} sx={{ flexDirection: {xs: 'column-reverse', md: 'row'}}}>
          <Grid xs={12} md={8} container spacing={3}>
            <Grid xs={12}>
              <CommentsSectionView comments={comments} />
            </Grid>
            <Grid xs={12}>
              <ContactForm />
            </Grid>
          </Grid>

          <Grid xs={12} md={4}>
            <HistoryTimelineView />
          </Grid>
        </Grid>
      </CompactContent>
    </>
  );
}
