import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { VenteListView } from 'src/sections/vente/view/vente-list-view';
// ----------------------------------------------------------------------

const metadata = { title: `Liste des ventes - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <VenteListView />
    </>
  );
}
