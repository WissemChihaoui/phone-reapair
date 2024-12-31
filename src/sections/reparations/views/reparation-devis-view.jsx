import { Tab, Tabs } from '@mui/material';
import React from 'react'
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { useTabs } from 'src/hooks/use-tabs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import { ReparationListView } from './reparation-list-view';
import { DevisListView } from './devis-list-view';
import { ReparationExtListView } from './reparation-externe-list-view';
import { ArchiveListView } from './archive-list-view';

const REP_DEVIS = [
    { label: 'Réparation', value: 'rep' },
    { label: 'Devis', value: 'devis' },
    { label: 'Réparation Externe', value: 'rep-e' },
    { label: 'Archive', value: 'archive' },
  ];
export default function ReparationDevisView() {
    const tabs = useTabs('rep');
    const selectedTabLabel = REP_DEVIS.find((tab) => tab.value === tabs.value)?.label || '';
    
    const renderTabs = (
        <Tabs value={tabs.value} onChange={tabs.onChange} sx={{ mb: { xs: 3, md: 5 } }}>
          {REP_DEVIS.map((tab) => (
            <Tab
              key={tab.value}
              iconPosition="end"
              value={tab.value}
              label={tab.label}
            />
          ))}
        </Tabs>
      );
    
  return (
    <>
    <DashboardContent>
        <CustomBreadcrumbs
          heading="Réparation & Devis"
          links={[
            { name: 'Tableau de bord', href: paths.dashboard.root },
            { name: 'Réparation et devis', href: paths.dashboard.reparations.root },
            { name: selectedTabLabel },
          ]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
    {renderTabs}

    {tabs.value === 'rep' && <ReparationListView />}
    {tabs.value === 'devis' && <DevisListView />}
    {tabs.value === 'rep-e' && <ReparationExtListView />}
    {tabs.value === 'archive' && <ArchiveListView />}
    </DashboardContent>
    </>
  )
}
