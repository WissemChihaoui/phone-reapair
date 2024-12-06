import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { VenteEditView } from 'src/sections/vente/view/vente-edit-view';
// import { useGetProduct } from 'src/actions/product';

// ----------------------------------------------------------------------

const metadata = { title: `Modifier Rachat | TAbleau de bord - ${CONFIG.appName}` };

export default function Page() {
  const { id = '' } = useParams();

  const product = {
    id,
    client: {
      addressType: "Office",
      company: "Nikolaus - Leuschke",
      email: "milo.farrell@hotmail.com",
      fullAddress: "1147 Rohan Drive Suite 819 - Burlington, VT / 82021",
      id: "e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2",
      name: "Lucian Obrien",
      phoneNumber: "+1 416-555-0198",
      primary: false
    },
    date: "2024-12-26T00:00:00+01:00",
    discount: 10,
    items: [
      {
        articleId: "1",
        articleName: "Ecran LCD T44",
        description: "descrption",
        quantity: 1,
        price: 82,
        total: 82
      }
    ],
    note: "note de vente",
    paid: 72,
    payement: [
      {
        amount: 50,
        via: "Virement",
        date: "2024-12-06T00:00:00+01:00"
      },
      {
        id: 1,
        amount: 22,
        date: "2024-12-06T00:00:00+01:00",
        via: "Éspece"
      }
    ],
    rest: 0,
    status: "Payé",
    totalAmount: 72,
    totalHT: null,
    totalHt: 65.6,
    totalSs: 82,
    type: "Vente"
  };
  

  //   const { product } = useGetProduct(id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <VenteEditView product={product}/>
    </>
  );
}
