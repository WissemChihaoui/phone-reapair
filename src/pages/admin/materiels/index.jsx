import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import MaterielListView from 'src/sections/ADMIN/materiel/views/materiel-list-view';

const metadata = { title: `Admin | Matériels - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <MaterielListView />
    </>
  );
}
