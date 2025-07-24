import React from 'react';

import { Button } from '@mui/material';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { useTranslate } from 'src/locales';

export default function ServicesPageView() {
    const {t} = useTranslate('common')
  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Les services"
        links={[
          { name: 'Tableau de bord', href: paths.dashboard.root },
          { name: 'Les services', href: paths.dashboard.services.root },
          { name: 'Liste' },
        ]}
        action={
            <Button variant='contained' color='primary'>{t('add')}</Button>
        }
      />


    </DashboardContent>
  );
}
