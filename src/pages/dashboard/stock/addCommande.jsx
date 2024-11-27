import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import ProductCommandeAdd from 'src/sections/product/view/commandes/product-commande-add';

const metadata = { title: `Ajouter Commande | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
    return(
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>
            <ProductCommandeAdd />
        </>
        
    )
}