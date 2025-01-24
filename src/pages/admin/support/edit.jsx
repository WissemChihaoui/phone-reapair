import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router';
import { useGetPost } from 'src/actions/blog';
import { CONFIG } from 'src/config-global';
import { SupportItemView } from 'src/sections/ADMIN/support/view/support-item-view';

const metadata = { title: `Admin | Support technique - ${CONFIG.appName}` };

export default function Page() {
    const { title = '' } = useParams();
    
      const { post, postLoading, postError } = useGetPost(title);
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <SupportItemView post={post} loading={postLoading} error={postError}/>
    </>
  );
}
