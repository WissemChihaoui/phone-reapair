import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import CassierPageView from 'src/sections/boutique/cassiers/view/cassier-page-view';

const metadata = { title: `Casiers de rangement - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <CassierPageView />
    </>
  );
}
