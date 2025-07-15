import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';

import InventaireEditView from 'src/sections/product/view/inventaire/inventaire-edit-view';

// ----------------------------------------------------------------------

const metadata = { title: `Modifier Inventaire - ${CONFIG.appName}` };

export default function Page() {
  const { id } = useParams()
  const inventaire = {
    inventaireId: id,
    note: 'Inventory check - July 2023',
    items: [
      {
        title: 'Engine Oil',
        crmQty: 5,
        realQty: 4,
      },
      {
        title: 'Air Filter',
        crmQty: 10,
        realQty: 9,
      },
      {
        title: 'Brake Pads',
        crmQty: 8,
        realQty: 8,
      },
    ],
  };
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <InventaireEditView data={inventaire} />
    </>
  );
}
