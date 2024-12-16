import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import StatusViewList from 'src/sections/boutique/status/view/status-view-list';
// ----------------------------------------------------------------------

const metadata = { title: `Liste des statuts - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <StatusViewList />
    </>
  );
}