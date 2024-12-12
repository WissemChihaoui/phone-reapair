import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import StatisticsPageView from 'src/sections/caisse/statistics/view/statistics-page-view';

// ----------------------------------------------------------------------

const metadata = { title: `Statistiques - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <StatisticsPageView />
    </>
  );
}