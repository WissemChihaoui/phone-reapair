import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { UserListView } from 'src/sections/user/view';

// import { UserListView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

const metadata = { title: `Liste des clients | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <UserListView />
    </>
  );
}
