import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';

import { _orders } from 'src/_mock';
import { CONFIG } from 'src/config-global';

import DisplayReparationView from 'src/sections/reparations/views/display-reparation-view';

// ----------------------------------------------------------------------

const metadata = { title: `Affichage - ${CONFIG.appName}` };

export default function Page() {
  const { id = '' } = useParams();

  const currentOrder = _orders.find((order) => order.id === id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <DisplayReparationView order={currentOrder} />
    </>
  );
}
