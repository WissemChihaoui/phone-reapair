import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import AchatsAddView from 'src/sections/achats/views/achats-add-view';


// ----------------------------------------------------------------------

const metadata = { title: `Ajouter une nouvelle Dépense - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <AchatsAddView />
    </>
  );
}