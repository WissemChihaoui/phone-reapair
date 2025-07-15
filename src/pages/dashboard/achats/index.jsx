import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import AchatsPageView from 'src/sections/achats/views/achats-page-view';

import { BlankView } from 'src/sections/blank/view';

// ----------------------------------------------------------------------

const metadata = { title: `Dépenses - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <AchatsPageView />
    </>
  );
}