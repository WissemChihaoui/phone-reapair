import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import AbonnementPageView from 'src/sections/product/view/abonnement/abonnement-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Liste des abonnements - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <AbonnementPageView />
    </>
  );
}
