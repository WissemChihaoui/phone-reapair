import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
// ----------------------------------------------------------------------

const metadata = { title: `Ajouter Vente - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <p>Ajouter une vente</p>
    </>
  );
}
