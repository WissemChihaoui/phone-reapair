import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import ProductCommandeEdit from 'src/sections/product/view/commandes/product-commande-edit';

// ----------------------------------------------------------------------

const metadata = { title: `Modifier Commande | Dashboard - ${CONFIG.appName}` };


export default function Page() {
    const { id = '' } = useParams();

    return (
        <>
          <Helmet>
            <title> {metadata.title}</title>
          </Helmet>

          <ProductCommandeEdit />
        </>
      );
}
