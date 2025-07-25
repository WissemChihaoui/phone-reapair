import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import ReparationDevisView from 'src/sections/reparations/views/reparation-devis-view';

// ----------------------------------------------------------------------

const metadata = { title: `Liste des réparations - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <ReparationDevisView />
    </>
  );
}
