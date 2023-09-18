import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Breadcrumbs} from '../component/breadcrumbs';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {selectProductIsLoading, selectProduct} from '../store/product/product-select';
import {fetchProduct} from '../store/product/api-actions';
import {ProductTabs} from '../component/product-tabs';
import {RouteName} from '../constanst/routes';
import { PageNames } from '../constanst/common';

export const ProductDetailPage = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectProduct);
  const isLoading = useAppSelector(selectProductIsLoading);

  const pages = [
    {title: PageNames.ProductList, url: RouteName.ProductList},
    {title: product.title, url: RouteName.Product}
  ];

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [id, dispatch]);

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  return (
    <div className="container">
      <h1 className="page-content__title title title--bigger">Товар</h1>

      <Breadcrumbs pages={pages}/>

      <div className="product-container">
        <img
          className="product-container__img"
          src={product.image}
          srcSet="/assets/img/content/catalog-product-1@2x.png 2x"
          width={90}
          height={235}
          alt=""
        />
        <div className="product-container__info-wrapper">
          <h2 className="product-container__title title title--big title--uppercase">
            {product.title}
          </h2>
          <br/>
          <br/>

          <ProductTabs product={product}/>

        </div>
      </div>
    </div>
  );
}
