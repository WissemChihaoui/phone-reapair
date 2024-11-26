import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';

const metadata = { title: `Fournisseurs | Dashboard - ${CONFIG.appName}` };

export default function Page() {
    return(
        <>
            <Helmet>
                <title> {metadata.title}</title>
            </Helmet>
            <p>Hello</p>
        </>
        
    )
}