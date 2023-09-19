import {IProduct} from "@guitar-shop/lib/types";
import {createSlice} from "@reduxjs/toolkit";
import {deleteProduct, fetchProducts} from "./api-actions";
import {SliceName} from '../../constanst/common';

export interface PaginateData {
  page :number;
  limit: number;
  total: number;
}

export interface ProductsState {
  isLoading: boolean;
  products: IProduct[];
  pagination: PaginateData;
  isLoadError: boolean;
}

const initialState: ProductsState = {
  isLoading: false,
  products: [],
  pagination: {
    page: 1,
    limit: 0,
    total: 0,
  },
  isLoadError: false,
}

export const productsSlice = createSlice({
  name: SliceName.Products,
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.pagination.page = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.isLoadError = false;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload.data;
        state.pagination = {
          page: action.payload.page,
          limit: action.payload.limit,
          total: action.payload.total,
        }
        state.isLoading = false;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoadError = true;
        state.isLoading = false;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.isLoadError = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((item) => item.id !== action.payload);
        state.isLoading = false;
      })
      .addCase(deleteProduct.rejected, (state) => {
        state.isLoadError = true;
        state.isLoading = false;
      })
  },
});

export const {setCurrentPage} = productsSlice.actions;
export default productsSlice.reducer;
