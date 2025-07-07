import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import RegroupementAddView from 'src/sections/product/view/regroupement/regroupement-add-view';

const metadata = { title: `Ajouter Regroupement | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <RegroupementAddView />
    </>
  );
}
