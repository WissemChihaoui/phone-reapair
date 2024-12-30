import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import {ReparationListView} from 'src/sections/reparations/views/reparation-list-view';
// ----------------------------------------------------------------------

const metadata = { title: `Liste des réparations - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <ReparationListView />
    </>
  );
}
