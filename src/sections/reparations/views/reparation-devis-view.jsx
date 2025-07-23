import React from 'react'

import { Tab, Button } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useTabs } from 'src/hooks/use-tabs';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';
import { CustomTabs } from 'src/components/custom-tabs';
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { DevisListView } from './devis-list-view';
import { ArchiveListView } from './archive-list-view';
import { ReparationListView } from './reparation-list-view';
import { ReparationExtListView } from './reparation-externe-list-view';

const REP_DEVIS = [
    { label: 'Réparation', value: 'rep', icon : <Iconify icon="hugeicons:repair" /> },
    { label: 'Devis', value: 'devis', icon : <Iconify icon="mingcute:bill-line" /> },
    { label: 'Réparation Externe', value: 'rep-e', icon : <Iconify icon="fluent-mdl2:repair" /> },
    { label: 'Archive', value: 'archive', icon : <Iconify icon="material-symbols:archive-outline" /> },
  ];
export default function ReparationDevisView() {
    const tabs = useTabs('rep');
    const selectedTabLabel = REP_DEVIS.find((tab) => tab.value === tabs.value)?.label || '';
    
    const renderTabs = (
        <CustomTabs value={tabs.value} onChange={tabs.onChange} sx={{ mb: { xs: 3, md: 5 } }}>
          {REP_DEVIS.map((tab) => (
            <Tab
              key={tab.value}
              iconPosition="start"
              icon={tab.icon}
              value={tab.value}
              label={tab.label}
            />
          ))}
        </CustomTabs>
      );
    
  return (
    <DashboardContent>
        <CustomBreadcrumbs
          heading="Réparation & Devis"
          links={[
            { name: 'Tableau de bord', href: paths.dashboard.root },
            { name: 'Réparation et devis', href: paths.dashboard.reparations.root },
            { name: selectedTabLabel },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
          action={
            <Button variant='contained' color='primary' href={paths.dashboard.reparations.add} LinkComponent={RouterLink}>Ajouter une réparation</Button>
          }
        />
    {renderTabs}

    {tabs.value === 'rep' && <ReparationListView />}
    {tabs.value === 'devis' && <DevisListView />}
    {tabs.value === 'rep-e' && <ReparationExtListView />}
    {tabs.value === 'archive' && <ArchiveListView />}
    </DashboardContent>
  )
}
