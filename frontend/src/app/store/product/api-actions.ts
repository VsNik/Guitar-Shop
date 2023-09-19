import {IProduct} from "@guitar-shop/lib/types";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosInstance} from "axios";
import {ApiRouteName} from '../../constanst/routes';
import {toast} from "react-toastify";
import { Messages } from "../../constanst/common";

export const fetchProduct = createAsyncThunk<IProduct, string, { extra: AxiosInstance }>(
  'product/fetchProduct',
  async (id: string, {extra: api}) => {
    const {data} = await api.get<IProduct>(`${ApiRouteName.Products}/${id}`);
    return data;
  }
);

export const createProduct = createAsyncThunk<IProduct, FormData, { extra: AxiosInstance }>(
  'product/create',
  async (formData, {extra: api}) => {
    const {data} = await api.post<IProduct>(ApiRouteName.Products, formData);
    return data;
  }
)

export const updateProduct = createAsyncThunk<IProduct, { id: string, formData: FormData }, { extra: AxiosInstance }>(
  'product/update',
  async ({id, formData}, {extra: api}) => {
    const response = await api.put<IProduct>(`${ApiRouteName.Products}/${id}`, formData);
    toast.success(Messages.ProductUpdated);
    return response.data;
  }
)
