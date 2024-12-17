import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import ConfigurationsPageView from 'src/sections/boutique/configuration/view/configuration-page-view';

// ----------------------------------------------------------------------

const metadata = { title: `Configurations - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <ConfigurationsPageView />
    </>
  );
}