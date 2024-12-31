import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import { useGetPost } from 'src/actions/blog';

import { CONFIG } from 'src/config-global';
import {NewsViewPage} from 'src/sections/news/views/news-view-page';

// ----------------------------------------------------------------------

const metadata = { title: `Nouveautés | Tableau de bord - ${CONFIG.appName}` };

export default function Page() {

  const { title = '' } = useParams();
  
  const { post, postLoading, postError } = useGetPost(title);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>
      <NewsViewPage post={post} loading={postLoading} error={postError}/>
    </>
  );
}
