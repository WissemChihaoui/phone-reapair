import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';

import { CONFIG } from 'src/config-global';
import EcologicPageView from 'src/sections/ecosystem/views/ecologic-page-view';

// ----------------------------------------------------------------------

const metadata = { title: `Ecologic | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
    const { id = '' } = useParams();
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <EcologicPageView />
    </>
  );
}
