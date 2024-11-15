import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { ProductListView } from 'src/sections/product/view';
import { UserListView } from 'src/sections/user/view';

// import { UserListView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

const metadata = { title: `Liste des articles - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      {/* <UserListView /> */}
      <ProductListView />
    </>
  );
}
