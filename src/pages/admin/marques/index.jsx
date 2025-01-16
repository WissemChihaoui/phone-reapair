import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import MarquesListView from 'src/sections/ADMIN/marques/views/marques-list-view';

const metadata = { title: `Admin | Marques - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <MarquesListView />
    </>
  );
}
