import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import TypesPageView from 'src/sections/boutique/types/view/type-page-view';

// ----------------------------------------------------------------------

const metadata = { title: `Liste des statuts - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <TypesPageView />
    </>
  );
}