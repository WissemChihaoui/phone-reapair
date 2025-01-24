import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import IdeeListView from 'src/sections/ADMIN/idee/views/idee-list-view';

const metadata = { title: `Admin | Boite à idée - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <IdeeListView />
    </>
  );
}
