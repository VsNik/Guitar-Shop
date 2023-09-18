import {IProductList} from '@guitar-shop/lib/types';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';
import {ApiRouteName} from '../../constanst/routes';

export const fetchProducts = createAsyncThunk<IProductList, string, { extra: AxiosInstance }>(
  'products/fetchProducts',
  async (query, {extra: api}) => {
    const {data} = await api.get<IProductList>(`${ApiRouteName.Products}${query}`);
    return data;
  }
)

export const deleteProduct = createAsyncThunk<string, string, { extra: AxiosInstance }>(
  'product/delete',
  async (id, {extra: api}) => {
    await api.delete(`${ApiRouteName.Products}/${id}`);
    return id;
  }
)
