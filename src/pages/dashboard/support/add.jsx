import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { PostNewEditForm } from 'src/sections/support/view/support-item-create';

// ----------------------------------------------------------------------

const metadata = { title: `Créer Ticket | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <PostNewEditForm />
    </>
  );
}
