import {IProduct} from "@guitar-shop/lib/types";
import {createSlice} from "@reduxjs/toolkit";
import {SliceName} from "../../constanst/common";
import {createProduct, fetchProduct, updateProduct} from "./api-actions";

export interface ProductState {
  product: IProduct;
  isLoading: boolean;
  isError: boolean;
}

const initialState: ProductState = {
  product: {} as IProduct,
  isLoading: false,
  isError: false,
}

export const productSlice = createSlice({
  name: SliceName.Product,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProduct.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isLoading = false;
      })
      .addCase(createProduct.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(updateProduct.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.product = action.payload;
        state.isLoading = false;
      })
      .addCase(updateProduct.rejected, (state) => {
        state.isError = true;
        state.isLoading = false;
      })
  },
});

export default productSlice.reducer;
