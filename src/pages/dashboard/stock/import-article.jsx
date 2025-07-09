import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import ProductImportView from 'src/sections/product/view/articles/product-import-view';

const metadata = { title: `Importer Article | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <ProductImportView />
    </>
  );
}
