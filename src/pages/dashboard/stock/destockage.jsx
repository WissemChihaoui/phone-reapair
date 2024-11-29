import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import ProductDestockageList from 'src/sections/product/view/destockage/product-destockage-list';

const metadata = { title: `Déstockage | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
    return(
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>
            <ProductDestockageList />
        </>
        
    )
}