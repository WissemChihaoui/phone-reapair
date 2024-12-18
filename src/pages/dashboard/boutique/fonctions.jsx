import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import FonctionsListView from 'src/sections/boutique/fonctions/view/fonctions-list-view';
// ----------------------------------------------------------------------

const metadata = { title: `Fonctions et permissions - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <FonctionsListView /> 
    </>
  );
}