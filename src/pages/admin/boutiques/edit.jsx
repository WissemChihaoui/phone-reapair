import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import BoutiquesEditView from 'src/sections/ADMIN/boutiques/views/boutiques-edit-view';

const metadata = { title: `Admin | Modifier Boutique - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <BoutiquesEditView />
    </>
  );
}
