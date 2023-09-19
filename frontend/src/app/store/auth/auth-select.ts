import {State} from "..";
import {SliceName} from "../../constanst/common";

export const selectUser = (state: State) => state[SliceName.Auth].user;
export const selectIsAuth = (state: State) => state[SliceName.Auth].isAuth;
export const selectAuthIsLoading = (state: State) => state[SliceName.Auth].isLoading;
