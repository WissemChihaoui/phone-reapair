import { Tab, Tabs } from '@mui/material';
import React from 'react'
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';
import { useTabs } from 'src/hooks/use-tabs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import { GeneralFormView } from '../forms/general-form-view';

const TABS = [
    { value: 'general', label: 'Générale', icon: <Iconify icon="solar:user-id-bold" width={24} /> },
    { value: 'billing', label: 'Rappel Mail', icon: <Iconify icon="solar:bill-list-bold" width={24} /> },
    {
      value: 'notifications',
      label: 'Délais de reparation',
      icon: <Iconify icon="solar:bell-bing-bold" width={24} />,
    },
    { value: 'social', label: 'Réseaux Socieaux', icon: <Iconify icon="solar:share-bold" width={24} /> },
    { value: 'security', label: 'Sécurité', icon: <Iconify icon="ic:round-vpn-key" width={24} /> },
    { value: 'qrcode', label: 'Sécurité', icon: <Iconify icon="mingcute:qrcode-fill" width={24} /> },
  ];

export default function ConfigurationsPageView() {
    const tabs = useTabs('general');
  return (
    <DashboardContent>
       <CustomBreadcrumbs
        heading="Ma Boutique"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Configuration', href: paths.dashboard.boutique.configurations },
          { name: 'Page' },
        ]}
        sx={{ mb: { xs: 3, md: 5 } }}
      />
      <Tabs value={tabs.value} onChange={tabs.onChange} sx={{ mb: { xs: 3, md: 5 } }}>
        {TABS.map((tab) => (
          <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
        ))}
      </Tabs>

      {tabs.value === 'general' && <GeneralFormView />}
    </DashboardContent>
  )
}
