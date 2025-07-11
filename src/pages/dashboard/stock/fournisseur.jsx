import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import ProductFournisseursView from 'src/sections/product/view/fournisseurs/product-fournisseurs-view';

const metadata = { title: `Fournisseurs | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <ProductFournisseursView />
    </>
  );
}
