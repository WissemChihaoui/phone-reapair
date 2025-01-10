import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import CaissePageView from 'src/sections/caisse/caisse/view/caisse-page-view';
// ----------------------------------------------------------------------

const metadata = { title: `Caisse - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <CaissePageView />
    </>
  );
}