import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import ReparationAddView from 'src/sections/reparations3/views/reparation-add-view';

// ----------------------------------------------------------------------

const metadata = { title: `Liste des réparations - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <ReparationAddView />
    </>
  );
}
