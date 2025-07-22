import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import SavAddPage from 'src/sections/sav/views/sav-add-page';

// ----------------------------------------------------------------------

const metadata = { title: `Ajouter SAV - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <SavAddPage />
    </>
  );
}
