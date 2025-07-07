import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config-global';

import RegroupementPageView from 'src/sections/product/view/regroupement/regroupement-page-view';


const metadata = { title: `Regroupement - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <RegroupementPageView />
    </>
  );
}
