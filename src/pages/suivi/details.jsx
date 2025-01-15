import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import SuiviDetailsView from 'src/sections/suivre/views/suivi-details-view';
import SuiviPageView from 'src/sections/suivre/views/suivi-page-view';

const metadata = { title: `Details - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <SuiviDetailsView />
    </>
  );
}
