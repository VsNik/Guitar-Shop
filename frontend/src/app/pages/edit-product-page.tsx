import {useParams} from "react-router-dom";
import {RouteName} from "../constanst/routes";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {selectProduct, selectProductIsLoading} from "../store/product/product-select";
import {useEffect} from "react";
import {fetchProduct} from "../store/product/api-actions";
import {Breadcrumbs} from "../component/breadcrumbs";
import {EditProductForm} from "../component/forms/edit-product-form";
import { PageNames } from "../constanst/common";

export const EditProductPage = () => {
  const {id} = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector(selectProduct);
  const isLoading = useAppSelector(selectProductIsLoading);

  const pages = [
    {title: PageNames.ProductList, url: RouteName.ProductList},
    {title: `${PageNames.EditProduct}: ${product.title}`, url: RouteName.EditProduct}
  ];

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id));
    }
  }, [id, dispatch]);

  if (isLoading) {
    return <b>Loading...</b>;
  }

  return (
    <section className="add-item">
      <div className="container">
        <h1 className="add-item__title">Редактирование: {product.title}</h1>
        <Breadcrumbs pages={pages}/>
        {product && <EditProductForm product={product} isLoading={isLoading}/>}
      </div>
    </section>
  );
};
