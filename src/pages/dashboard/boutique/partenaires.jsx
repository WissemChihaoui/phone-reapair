import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import PartenaireViewList from 'src/sections/boutique/partenairs/view/partenair-view-list';
// ----------------------------------------------------------------------

const metadata = { title: `Liste de mes partenaires - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <PartenaireViewList />
    </>
  );
}