import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import RachatListView from 'src/sections/rachat/view/rachat-list-view';
// ----------------------------------------------------------------------

const metadata = { title: `Liste des rachats - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <RachatListView />
    </>
  );
}
