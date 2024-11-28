import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';

// ----------------------------------------------------------------------

const metadata = { title: `Modifier Commande | Dashboard - ${CONFIG.appName}` };


export default function Page() {
    const { id = '' } = useParams();

    return (
        <>
          <Helmet>
            <title> {metadata.title}</title>
          </Helmet>
          <p>hello</p>
        
          {/* <ProductEditView product={product} /> */}
        </>
      );
}
