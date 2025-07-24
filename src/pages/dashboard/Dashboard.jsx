import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import DashboardView from 'src/sections/dashboard/dashboardView';

// ----------------------------------------------------------------------

const metadata = { title: `Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      {/* <BlankView title="Tableau du bord" /> */}
      <DashboardView />
    </>
  );
}
