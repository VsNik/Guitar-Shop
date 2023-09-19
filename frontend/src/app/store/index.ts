import {configureStore} from "@reduxjs/toolkit";
import {createAPI} from "../services/api";
import {SliceName} from "../constanst/common";
import productReducer from './product/product-slice';
import authReducer from './auth/auth-slice';
import productsReducer from './products/products-slice';
import filtersReducer from "./filters/filters-slice";

const api = createAPI();

export const store = configureStore({
  reducer: {
    [SliceName.Auth]: authReducer,
    [SliceName.Product]: productReducer,
    [SliceName.Products]: productsReducer,
    [SliceName.Filters]: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: api,
      }
    })
});

export type State = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
