import {SliceName} from "../../constanst/common";
import {State} from "../index";

export const selectProduct = (state: State) => state[SliceName.Product].product;
export const selectProductIsLoading = (state: State) => state[SliceName.Product].isLoading;
