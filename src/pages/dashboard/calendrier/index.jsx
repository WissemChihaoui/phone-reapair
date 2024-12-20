import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import { CalendarView } from 'src/sections/calendrier/view';

const metadata = { title: `Calendrier - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <CalendarView />
    </>
  );
}
