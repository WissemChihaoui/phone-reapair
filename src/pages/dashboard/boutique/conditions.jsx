import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import ConditionsTableList from 'src/sections/boutique/conditions/view/conditions-table-list';

// ----------------------------------------------------------------------

const metadata = { title: `Les conditions - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <ConditionsTableList />
    </>
  );
}