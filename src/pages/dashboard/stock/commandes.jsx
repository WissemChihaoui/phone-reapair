import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import { OrderListView } from 'src/sections/orders/view';

const metadata = { title: `Liste des commandes - ${CONFIG.appName}` };

export default function Page() {
    return (
      <>
        <Helmet>
          <title>{metadata.title}</title>
        </Helmet>
        <OrderListView />
      </>
    );
  }
  