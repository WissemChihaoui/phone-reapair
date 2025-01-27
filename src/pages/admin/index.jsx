import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import AdminDashboardView from 'src/sections/ADMIN/dashboard/views/admin-dashboard-view';

const metadata = { title: `Admin - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <AdminDashboardView />
    </>
  );
}
