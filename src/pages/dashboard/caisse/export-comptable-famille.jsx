import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import { ExportMargeFamille } from 'src/sections/caisse/export-comptable-famille/view/export-marge-famille';

// ----------------------------------------------------------------------

const metadata = { title: `Export comptable/famille - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <ExportMargeFamille />
    </>
  );
}