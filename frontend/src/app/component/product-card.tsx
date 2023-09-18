import React from "react";
import {IProduct} from "@guitar-shop/lib/types";
import {Link} from 'react-router-dom';
import {getEditProductUrl, getProductUrl} from "../utils/route";
import {useAppDispatch} from "../store/hooks";
import {deleteProduct} from "../store/products/api-actions";
import {formatDate, formatPrice} from "../utils/common";

interface ProductCardProps {
  product: IProduct;
}

export const ProductCard: React.FC<ProductCardProps> = ({product}) => {
  const dispatch = useAppDispatch();
  const createdAt = formatDate(product.createdAt);
  const price = formatPrice(product.price);

  const onDelete = (id: string) => {
    dispatch(deleteProduct(id));
  }

  return (
    <li className="catalog-item">
      <div className="catalog-item__data">
        <img
          src={product.image}
          srcSet="/assets/img/content/catalog-product-1@2x.png 2x"
          width={36}
          height={93}
          alt="Картинка гитары"
        />
        <div className="catalog-item__data-wrapper">
          <Link className="link" to={getProductUrl(product.id)}>
            <p className="catalog-item__data-title">{product.title}</p>
          </Link>
          <br/>
          <p className="catalog-item__data-date">Дата добавления {createdAt}</p>
          <p className="catalog-item__data-price">{price}</p>
        </div>
      </div>
      <div className="catalog-item__buttons">
        <Link
          className="button button--small button--black-border"
          to={getEditProductUrl(product.id)}
          aria-label="Редактировать товар"
        >
          Редактировать
        </Link>
        <button
          onClick={() => onDelete(product.id)}
          className="button button--small button--black-border"
          type="submit"
          aria-label="Удалить товар"
        >
          Удалить
        </button>
      </div>
    </li>
  );
}
