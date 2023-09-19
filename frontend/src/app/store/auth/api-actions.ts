import {IUser} from "@guitar-shop/lib/types";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {AxiosError, AxiosInstance} from "axios";
import {LoginData} from "../../types/common";
import {saveToken} from '../../services/token';
import {AppDispatch} from "..";
import {ApiRouteName} from "../../constanst/routes";

export const checkAuth = createAsyncThunk<IUser, undefined, { extra: AxiosInstance }>(
  'auth/check',
  async (_args, {extra: api}) => {
    const {data} = await api.get(ApiRouteName.CheckUser);
    return data;
  }
);

export const login = createAsyncThunk<undefined, LoginData, { extra: AxiosInstance, dispatch: AppDispatch }>(
  'auth/login',
  async (authData, {extra: api, dispatch, rejectWithValue}) => {
    try {
      const {data} = await api.post<{ token: string }>(ApiRouteName.Login, authData);
      saveToken(data.token);
      dispatch(checkAuth());
    } catch (err) {
      const error = err as AxiosError<{ error: string }>;
      return rejectWithValue(error.response?.data.error);
    }
  }
);
