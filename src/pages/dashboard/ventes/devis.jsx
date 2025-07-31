import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import VenteDevisView from 'src/sections/vente/view/vente-devis-page';
// ----------------------------------------------------------------------

const metadata = { title: `Liste de devis - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <VenteDevisView />
    </>
  );
}
