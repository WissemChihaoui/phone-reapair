import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import SavListView from 'src/sections/sav/views/sav-list-view';


// ----------------------------------------------------------------------

const metadata = { title: `Liste des SAV - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <SavListView />
    </>
  );
}
