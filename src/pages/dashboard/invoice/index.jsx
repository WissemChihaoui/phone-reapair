import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import {InvoiceListView} from 'src/sections/invoice/view/invoice-list-view';
// ----------------------------------------------------------------------

const metadata = { title: `Liste des factures - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <InvoiceListView />
    </>
  );
}
