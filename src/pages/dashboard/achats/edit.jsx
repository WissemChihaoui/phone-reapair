import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { today } from 'src/utils/format-time';

import { CONFIG } from 'src/config-global';

import AchatsEditView from 'src/sections/achats/views/achats-edit-view';


// ----------------------------------------------------------------------

const metadata = { title: `Modifier Dépense - ${CONFIG.appName}` };

export default function Page() {
    const { id } = useParams();

    const depense = {
        id,
        organisme: "Organisme 1",
        ht: 100,
        ttc: 20,
        facture: "Facture 123",
        date: today(),
        fix: true
    }
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <AchatsEditView depense={depense} />
    </>
  );
}