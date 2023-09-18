import request from 'axios';
import {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import {yupResolver} from '@hookform/resolvers/yup';
import {useForm,} from 'react-hook-form';
import {Link, useNavigate} from 'react-router-dom';
import {GuitarType, IProduct} from '@guitar-shop/lib/types';
import {ApiRouteName, RouteName} from '../../constanst/routes';
import {createAPI} from '../../services/api';
import {AxiosResponseData} from '../../types/error';
import {ProductData} from '../../types/common';
import {productValidateSchema} from '../../utils/validate-schemas';
import useFilePreview from '../../hooks/use-file-preview';
import {formatDate} from "../../utils/common";
import { Messages } from '../../constanst/common';

const DEFAULT_STRING_COUNT = '4';

export const ProductForm = () => {
  const api = createAPI();
  const [isLoading, setIsLoading] = useState(false);
  const createdAt = formatDate(new Date().toISOString());
  const navigate = useNavigate();

  const {register, handleSubmit, reset, resetField, watch, formState: {errors}} = useForm<ProductData>({
    defaultValues: {type: GuitarType.Acoustic, stringCount: DEFAULT_STRING_COUNT},
    resolver: yupResolver(productValidateSchema)
  });

  const fileImage = watch('image');
  const {previewImage, resetImage} = useFilePreview(fileImage);

  useEffect(() => {
    resetField('image');
  }, [resetField]);

  const onSubmit = async (data: ProductData) => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('type', data.type);
    formData.append('stringCount', data.stringCount);
    formData.append('ean', data.ean);
    formData.append('image', data.image[0]);

    try {
      setIsLoading(true);
      await api.post<IProduct>(ApiRouteName.Products, formData);
      toast.success(Messages.ProductCreated);
      reset();
      navigate(RouteName.ProductList);
    } catch (err) {
      if (request.isAxiosError(err) && err.response) {
        toast.error((err.response.data as AxiosResponseData).message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  const onResetPreview = () => {
    resetImage();
    resetField('image');
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="add-item__form">
      <div className="add-item__form-left">

        <div className="edit-item-image add-item__form-image">
          <div className="edit-item-image__image-wrap">
            {previewImage &&
            <img
              className="edit-item-image__image"
              src={String(previewImage)}
              width="133"
              height="332"
              alt=""
            />
            }
          </div>
          {errors?.image && <p>{errors.image.message}</p>}

          <div className="edit-item-image__btn-wrap">
            <label className="button button--small button--black-border edit-item-image__btn"
                   htmlFor="image">Добавить</label>
            <input
              {...register('image')}
              type="file"
              id="image"
              style={{display: 'none'}}
              disabled={isLoading}
            />
            <button onClick={onResetPreview} className="button button--small button--black-border edit-item-image__btn">
              Удалить
            </button>
          </div>
        </div>

        <div className="input-radio add-item__form-radio">
          <span>Выберите тип товара</span>
          <input
            {...register('type')}
            type="radio"
            id="guitar"
            value={GuitarType.Acoustic}
            disabled={isLoading}
          />
          <label htmlFor="guitar">Акустическая гитара</label>
          <input
            {...register('type')}
            type="radio"
            id="el-guitar"
            value={GuitarType.Electro}
            disabled={isLoading}
          />
          <label htmlFor="el-guitar">Электрогитара</label>
          <input
            {...register('type')}
            type="radio"
            id="ukulele"
            value={GuitarType.Ukulele}
            disabled={isLoading}
          />
          <label htmlFor="ukulele">Укулеле</label>
        </div>

        <div className="input-radio add-item__form-radio">
          <span>Количество струн</span>
          <input
            {...register('stringCount')}
            type="radio"
            id="string-qty-4"
            value={4}
            disabled={isLoading}
          />
          <label htmlFor="string-qty-4">4</label>
          <input
            {...register('stringCount')}
            type="radio"
            id="string-qty-6"
            value={6}
            disabled={isLoading}
          />
          <label htmlFor="string-qty-6">6</label>
          <input
            {...register('stringCount')}
            type="radio"
            id="string-qty-7"
            value={7}
            disabled={isLoading}
          />
          <label htmlFor="string-qty-7">7</label>
          <input
            {...register('stringCount')}
            type="radio"
            id="string-qty-12"
            value={12}
            disabled={isLoading}
          />
          <label htmlFor="string-qty-12">12</label>
        </div>
      </div>

      <div className="add-item__form-right">
        <div className="custom-input add-item__form-input">
          <label><span>Дата добавления товара</span>
            <input
              type="text"
              value={createdAt}
              placeholder="Дата в формате 00.00.0000"
              readOnly
            />
          </label>
          <p></p>
        </div>
        <div className="custom-input add-item__form-input">
          <label><span>Введите наименование товара</span>
            <input
              {...register('title')}
              type="text"
              placeholder="Наименование"
              disabled={isLoading}
            />
          </label>
          <p>{errors?.title?.message}</p>
        </div>
        <div className="custom-input add-item__form-input add-item__form-input--price is-placeholder">
          <label><span>Введите цену товара</span>
            <input
              {...register('price')}
              type="text"
              name="price"
              placeholder="Цена в формате 00 000"
              disabled={isLoading}
              prefix={"P"}
            />
          </label>
          <p>{errors?.price?.message}</p>
        </div>
        <div className="custom-input add-item__form-input">
          <label><span>Введите артикул товара</span>
            <input
              {...register('ean')}
              type="text"
              placeholder="Артикул товара"
              disabled={isLoading}
            />
          </label>
          <p>{errors?.ean?.message}</p>
        </div>
        <div className="custom-textarea add-item__form-textarea">
          <label><span>Введите описание товара</span>
            <textarea
              {...register('description')}
              name="description"
              placeholder=""
              disabled={isLoading}
            />
          </label>
          <p>{errors?.description?.message}</p>
        </div>
      </div>
      <div className="add-item__form-buttons-wrap">
        <button disabled={isLoading} className="button button--small add-item__form-button" type="submit">
          Сохранить изменения
        </button>
        <Link className="button button--small add-item__form-button" to={RouteName.ProductList}>
          Вернуться к списку товаров
        </Link>
      </div>
    </form>
  );
}
