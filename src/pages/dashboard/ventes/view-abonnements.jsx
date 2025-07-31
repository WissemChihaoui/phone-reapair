import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import VenteAbonDetails from 'src/sections/vente2/view/vente-abon-details';

// ----------------------------------------------------------------------

const metadata = { title: `Les abonnements - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <VenteAbonDetails />
    </>
  );
}
