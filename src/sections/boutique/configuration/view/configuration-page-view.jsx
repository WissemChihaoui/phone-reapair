import { Tab, Tabs } from '@mui/material';
import React from 'react'
import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';
import { Iconify } from 'src/components/iconify';
import { useTabs } from 'src/hooks/use-tabs';
import { DashboardContent } from 'src/layouts/dashboard';
import { paths } from 'src/routes/paths';
import { _userAbout } from 'src/_mock';
import { GeneralFormView } from '../forms/general-form-view';
import RappelFormView from '../forms/rappel-form-view';
import ReparationFormView from '../forms/reparation-form-view';
import { SocialFormView } from '../forms/social-form-view';
import { SecurityFormView } from '../forms/security-form-view';
import QrcodeFormView from '../forms/qrcode-form-view';
import ApiFormView from '../forms/api-form-view';

const TABS = [
    { value: 'general', label: 'Générale', icon: <Iconify icon="solar:user-id-bold" width={24} /> },
    { value: 'rappel', label: 'Rappel Mail', icon: <Iconify icon="solar:bill-list-bold" width={24} /> },
    {
      value: 'reparation',
      label: 'Délais de reparation',
      icon: <Iconify icon="solar:bell-bing-bold" width={24} />,
    },
    { value: 'social', label: 'Réseaux Socieaux', icon: <Iconify icon="solar:share-bold" width={24} /> },
    { value: 'security', label: 'Sécurité', icon: <Iconify icon="ic:round-vpn-key" width={24} /> },
    { value: 'qrcode', label: 'Qr Code', icon: <Iconify icon="mingcute:qrcode-fill" width={24} /> },
    { value: 'api', label: 'Quali Répar', icon: <Iconify icon="mynaui:api-solid" width={24} /> },
  ];

export default function ConfigurationsPageView() {
  console.log(paths.dashboard);
  
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
      {tabs.value === 'rappel' && <RappelFormView />}
      {tabs.value === 'reparation' && <ReparationFormView />}
      {tabs.value === 'security' && <SecurityFormView />}
      {tabs.value === 'qrcode' && <QrcodeFormView />}
      {tabs.value === 'api' && <ApiFormView />}
      {tabs.value === 'social' && <SocialFormView socialLinks={_userAbout.socialLinks}/>}
    </DashboardContent>
  )
}
