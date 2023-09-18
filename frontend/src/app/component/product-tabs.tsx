import {IProduct} from '@guitar-shop/lib/types';
import {useState} from 'react';
import {GuitarTypes} from '../constanst/common';

interface ProductTabsProps {
  product: IProduct;
}

export const ProductTabs: React.FC<ProductTabsProps> = ({product}) => {
  const [tab, setTab] = useState<'characteristics' | 'description'>('characteristics');

  return (
    <div className="tabs">
            <span
              className={`button button--medium tabs__button ${tab === 'characteristics' ? 'button--black-border' : ''}`}
              onClick={() => setTab('characteristics')}
            >
              Характеристики
            </span>
      <span className={`button button--medium tabs__button ${tab === 'description' ? 'button--black-border' : ''}`}
            onClick={() => setTab('description')}
      >
              Описание
            </span>

      <div className="tabs__content" id="characteristics">
        {tab === 'characteristics' && (
          <table className="tabs__table">
            <tbody>
            <tr className="tabs__table-row">
              <td className="tabs__title">Артикул:</td>
              <td className="tabs__value">{product.ean}</td>
            </tr>
            <tr className="tabs__table-row">
              <td className="tabs__title">Тип:</td>
              <td className="tabs__value">{GuitarTypes[product.type]}</td>
            </tr>
            <tr className="tabs__table-row">
              <td className="tabs__title">Количество струн:</td>
              <td className="tabs__value">{product.stringCount} струнная</td>
            </tr>
            </tbody>
          </table>
        )}
        {tab === 'description' && (
          <p className="tabs__product-description">
            {product.description}
          </p>)}
      </div>
    </div>
  );
}
