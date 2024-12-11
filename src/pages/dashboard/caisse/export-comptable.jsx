import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { ExportListView } from 'src/sections/caisse/export-comptable/view/export-list-view';
// ----------------------------------------------------------------------

const metadata = { title: `Export comptable - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <ExportListView />
    </>
  );
}