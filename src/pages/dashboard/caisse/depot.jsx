import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import DepotViewList from 'src/sections/caisse/depot/view/depot-view-list';
// ----------------------------------------------------------------------

const metadata = { title: `Dépôt bancaire - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <DepotViewList />
    </>
  );
}