import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import ProductStockageView from 'src/sections/product/view/stockage/product-stockage-view';

const metadata = { title: `Casiers de stockage - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <ProductStockageView />
    </>
  );
}
