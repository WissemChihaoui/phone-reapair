import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import IdeePageView from 'src/sections/idee/views/idee-page-view';

// ----------------------------------------------------------------------

const metadata = { title: `Boite à idée | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <IdeePageView />
    </>
  );
}
