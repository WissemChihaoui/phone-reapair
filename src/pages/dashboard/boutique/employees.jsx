import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';
import { EmployeesListView } from 'src/sections/boutique/employees/view/employees-list-view';
// ----------------------------------------------------------------------

const metadata = { title: `Liste de mes employées - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <EmployeesListView />
    </>
  );
}