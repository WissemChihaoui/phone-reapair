import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import InventaireListView from 'src/sections/product/view/inventaire/inventaire-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Inventaire - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <InventaireListView />
    </>
  );
}
