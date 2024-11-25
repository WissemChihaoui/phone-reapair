import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { useGetProduct } from 'src/actions/product';
import { ProductDuplicateView } from 'src/sections/product/view/articles/product-duplicate-view';

// ----------------------------------------------------------------------

const metadata = { title: `Duplicate Article | Dashboard - ${CONFIG.appName}` };

export default function Page() {
  const { id = '' } = useParams();

  const { product } = useGetProduct(id);

  return (
    <>
      <Helmet>
        <title> {metadata.title}</title>
      </Helmet>

      <ProductDuplicateView product={product} />
    </>
  );
}
