import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import SupportListView from 'src/sections/ADMIN/support/view/support-list-view';

const metadata = { title: `Admin | Support technique - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <SupportListView />
    </>
  );
}
