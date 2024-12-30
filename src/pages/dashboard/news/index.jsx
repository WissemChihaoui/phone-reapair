import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import {NewsListView} from 'src/sections/news/views/news-list-view';

// ----------------------------------------------------------------------

const metadata = { title: `Nouveautés | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <NewsListView />
    </>
  );
}
