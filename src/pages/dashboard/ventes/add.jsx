import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { VenteCreateView } from 'src/sections/vente2/view/vente-add-view';
// ----------------------------------------------------------------------

const metadata = { title: `Ajouter Vente - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <VenteCreateView />
    </>
  );
}
