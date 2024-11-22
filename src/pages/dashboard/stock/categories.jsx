import { Helmet } from 'react-helmet-async'
import { CONFIG } from 'src/config-global';

const metadata = { title: `Catégories de stock - ${CONFIG.appName}` };

export default function categories() {
  return (
    <>
        <Helmet>
            <title>{metadata.title}</title>
        </Helmet>
    </>
  )
}
