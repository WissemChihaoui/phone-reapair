import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import ServicesPageView from 'src/sections/services/views/services-page-view';

// ----------------------------------------------------------------------

const metadata = { title: `Les services - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <ServicesPageView />
    </>
  );
}
