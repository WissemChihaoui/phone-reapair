import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import BoutiquesListView from 'src/sections/ADMIN/boutiques/views/boutiques-list-view';

const metadata = { title: `Admin | Boutiques - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <BoutiquesListView />
    </>
  );
}
