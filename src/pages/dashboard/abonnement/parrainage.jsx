import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import ParrainagePageView from 'src/sections/abonnement/view/parrainage-page-view';

const metadata = { title: `Parrainage - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <ParrainagePageView />
    </>
  );
}
