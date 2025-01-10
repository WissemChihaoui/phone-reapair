import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import ImpressionPageView from 'src/sections/boutique/impressions/views/impression-page-view';

// ----------------------------------------------------------------------

const metadata = { title: `Impressions | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <ImpressionPageView />
    </>
  );
}
