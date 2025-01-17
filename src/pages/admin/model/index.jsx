import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import ModeleListView from 'src/sections/ADMIN/modele/views/modele-list-view';

const metadata = { title: `Admin | Les Modéles - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <ModeleListView />
    </>
  );
}
