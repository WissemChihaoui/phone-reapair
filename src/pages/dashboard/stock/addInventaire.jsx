import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import InventaireAddView from 'src/sections/product/view/inventaire/inventaire-add-view';

// ----------------------------------------------------------------------

const metadata = { title: `Ajouter Inventaire - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <InventaireAddView />
    </>
  );
}
