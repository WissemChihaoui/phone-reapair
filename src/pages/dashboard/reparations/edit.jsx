import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import EditReparationView from 'src/sections/reparations2/views/edit-reparation-view';

// ----------------------------------------------------------------------

const metadata = { title: `Modifier Réparation - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <EditReparationView />
    </>
  );
}
