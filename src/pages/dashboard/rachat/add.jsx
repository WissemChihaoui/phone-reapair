import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import RachatAddView from 'src/sections/rachat/view/rachat-add-view';

// ----------------------------------------------------------------------

const metadata = { title: `Ajouter un rachat - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <RachatAddView />
    </>
  );
}
