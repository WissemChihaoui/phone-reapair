import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import FamillePageView from 'src/sections/product/view/famille/famille-page-view';

// ----------------------------------------------------------------------

const metadata = { title: `Etat de stock - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <FamillePageView />
    </>
  );
}
