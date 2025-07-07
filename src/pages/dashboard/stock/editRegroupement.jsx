import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import RegroupementEditView from 'src/sections/product/view/regroupement/regroupement-edit-view';

const metadata = { title: `Modifier Regroupement | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
    const { id } = useParams()

    const data = {
        id,
        name: "Groupe 2",
        description : "Lorem ipsuem",
        products: [1, 3]
    }
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <RegroupementEditView data={data}/>
    </>
  );
}
