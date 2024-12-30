import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import SupportListView from 'src/sections/support/view/support-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Support technique | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <SupportListView />
    </>
  );
}
