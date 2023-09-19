import {AnyAction, createSlice} from '@reduxjs/toolkit';
import {IUser} from "@guitar-shop/lib/types";
import {checkAuth, login} from './api-actions';

export interface AuthState {
  isAuth: boolean;
  isLoading: boolean;
  user: IUser;
  error: string;
}

const initialState: AuthState = {
  isAuth: false,
  isLoading: false,
  user: {} as IUser,
  error: '',
}

export const authSlice = createSlice({
  name: "auth/slice",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuth = false;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuth = true;
        state.isLoading = false;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = '';
      })
      .addCase(login.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action: AnyAction) => {
        state.error = action.payload;
        state.isLoading = false;
      })
  }
});

export default authSlice.reducer;
export const {logout} = authSlice.actions;
