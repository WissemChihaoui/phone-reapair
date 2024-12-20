import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import AbonnementPageView from 'src/sections/abonnement/view/abonnement-page-view';

const metadata = { title: `Mon Abonnement - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <AbonnementPageView />
    </>
  );
}
