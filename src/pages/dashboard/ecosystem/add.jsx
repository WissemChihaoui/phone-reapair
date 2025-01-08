import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';

import { CONFIG } from 'src/config-global';
import EcosystemPageView from 'src/sections/ecosystem/views/ecosystem-page-view';

// ----------------------------------------------------------------------

const metadata = { title: `Ecosystem | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
    const { id = '' } = useParams();
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <EcosystemPageView />
    </>
  );
}
