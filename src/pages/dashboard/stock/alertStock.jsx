import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { ProductAlertStockView } from 'src/sections/product/view/product-alert-stock-view';


// ----------------------------------------------------------------------

const metadata = { title: `Alerte de stock - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      {/* <UserListView /> */}
      <ProductAlertStockView />
    </>
  );
}
