import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';

import { _invoices } from 'src/_mock';
import { CONFIG } from 'src/config-global';

import InvoicePrintView from 'src/sections/invoice/view/invoice-print-view';
// ----------------------------------------------------------------------

const metadata = { title: `Facture - ${CONFIG.appName}` };

export default function Page() {
    const { id = '' } = useParams();

  const currentInvoice = _invoices.find((invoice) => invoice.id === id);
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <InvoicePrintView invoice={currentInvoice}/>
    </>
  );
}
