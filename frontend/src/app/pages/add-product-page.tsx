import {ProductForm} from "../component/forms/product-form";
import {Breadcrumbs} from "../component/breadcrumbs";
import {RouteName} from "../constanst/routes";
import { PageNames } from "../constanst/common";

export const AddProductPage = () => {

  const pages = [
    {title: PageNames.ProductList, url: RouteName.ProductList},
    {title: PageNames.NewProduct, url: RouteName.AddProduct}
  ];

  return (
    <section className="add-item">
      <div className="container">
        <h1 className="add-item__title">Новый товар</h1>
        <Breadcrumbs pages={pages}/>
        <ProductForm/>
      </div>
    </section>
  );
}
