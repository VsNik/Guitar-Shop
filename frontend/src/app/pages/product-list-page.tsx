import {useEffect} from 'react';
import {createQueryString} from '@guitar-shop/lib/utils';
import {Breadcrumbs} from '../component/breadcrumbs';
import {Filter} from '../component/filter';
import {Sorting} from '../component/sorting';
import {Pagination} from '../component/pagination';
import {ProductCard} from '../component/product-card';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {selectPagination, selectProducts} from '../store/products/products-select';
import {fetchProducts} from '../store/products/api-actions';
import {selectDirection, selectSorting, selectStringCount, selectType} from '../store/filters/select';
import {RouteName} from '../constanst/routes';
import {Link} from 'react-router-dom';
import { PageNames } from '../constanst/common';

export const ProductListPage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);

  const sorting = useAppSelector(selectSorting);
  const direction = useAppSelector(selectDirection);
  const type = useAppSelector(selectType);
  const strings = useAppSelector(selectStringCount);
  const pagination = useAppSelector(selectPagination);

  const pages = [{title: PageNames.ProductList, url: RouteName.ProductList}];

  useEffect(() => {
    const query = createQueryString(pagination.page, sorting, direction, type, strings);
    dispatch(fetchProducts(query));
  }, [dispatch, sorting, direction, type, strings, pagination.page]);

  return (
    <section className="product-list">
      <div className="container">
        <h1 className="product-list__title">Список товаров</h1>
        <Breadcrumbs pages={pages}/>
        <div className="catalog">
          <Filter type={type} stringCount={strings}/>
          <Sorting/>
          <div className="catalog-cards">
            <ul className="catalog-cards__list">

              {products?.map((product) => (
                <ProductCard key={product.id} product={product}/>
              ))}

            </ul>
          </div>
        </div>
        <Link to={RouteName.AddProduct} className="button product-list__button button--red button--big">
          Добавить новый товар
        </Link>
        <Pagination pagination={pagination}/>
      </div>
    </section>
  );
}
