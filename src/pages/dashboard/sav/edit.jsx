import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';

import { today } from 'src/utils/format-time';

import { CONFIG } from 'src/config-global';

import SavEditPage from 'src/sections/sav/views/sav-edit-page';

// ----------------------------------------------------------------------

const metadata = { title: `Modifier SAV - ${CONFIG.appName}` };

export default function Page() {
    const { id } = useParams();

    const currentSav = {
        id: id ? parseInt(id, 10) : null,
        createdAt: today(),
        product: "Produit 1",
        qte: 3,
        imei: "876-5432-1098",
        comment: "Ceci est un commentaire",
        type: 1,
        client: {
            id: 1,
            name: "Client Test",
            email: "client@test.com",
            phone: "0123456789",
        },
        status: "en_attente",
        checked: true,
    };
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <SavEditPage currentSav={currentSav} />
    </>
  );
}
