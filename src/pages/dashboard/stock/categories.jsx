import { Helmet } from 'react-helmet-async';
import { CONFIG } from 'src/config-global';
import ProductCategoriesView from 'src/sections/product/view/categories/product-categories-view';

const metadata = { title: `Catégories de stock - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>
      <ProductCategoriesView />
    </>
  );
}
