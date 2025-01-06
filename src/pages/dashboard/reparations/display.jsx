import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import DisplayReparationView from 'src/sections/reparations/views/display-reparation-view';

// ----------------------------------------------------------------------

const metadata = { title: `Affichage - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <DisplayReparationView />
    </>
  );
}
