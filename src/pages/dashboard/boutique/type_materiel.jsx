import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import MaterialPageView from 'src/sections/boutique/materialTypes/view/material-page-view';

// ----------------------------------------------------------------------

const metadata = { title: `Les types de matériel - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <MaterialPageView />
    </>
  );
}