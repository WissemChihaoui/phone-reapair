import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
// import { useGetProduct } from 'src/actions/product';
import RachatEditView from 'src/sections/rachat/view/rachat-edit-view';

// ----------------------------------------------------------------------

const metadata = { title: `Modifier Rachat | TAbleau de bord - ${CONFIG.appName}` };

export default function Page() {
  const { id = '' } = useParams();

  console.log(id);

  const product = {
    id,
    amount: 250,
    client: {
      addressType: 'Home',
      company: 'Gleichner, Mueller and Tromp',
      email: 'ashlynn.ohara62@gmail.com',
      fullAddress: '19034 Verna Unions Apt. 164 - Honolulu, RI / 87535',
      id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
      name: 'Jayvion Simon',
      phoneNumber: '+1 202-555-0143',
      primary: true,
    },
    cni: '12334555',
    imageCni: '',
    imageFacture: '',
    payementMethode: 1,
    product: {
      accessoire: 'Chargeur',
      etat: 'bien',
      name: 'Téléphone',
      serie: '877759965520258',
    },
  };

  //   const { product } = useGetProduct(id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <RachatEditView product={product} />
    </>
  );
}
