import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import MethodesPageView from 'src/sections/boutique/methodes/view/methodes-page-view';
// ----------------------------------------------------------------------

const metadata = { title: `Les méthodes de paiement - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <MethodesPageView />
    </>
  );
}