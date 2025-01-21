import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import CaisseVirtuelleView from 'src/sections/caisse/virtuelle/views/caisse-virtuelle-view';
// ----------------------------------------------------------------------

const metadata = { title: `Caisse Virtuelle - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <CaisseVirtuelleView />
    </>
  );
}
