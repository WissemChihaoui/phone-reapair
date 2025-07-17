import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ExportMargeListView } from 'src/sections/caisse/export-comptable-marge/view/export-marge-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Export comptable marge - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <ExportMargeListView />
    </>
  );
}