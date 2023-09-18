import {State} from '../index';
import {SliceName} from '../../constanst/common';

export const selectProducts = (state: State) => state[SliceName.Products].products;
export const selectProductsIsLoading = (state: State) => state[SliceName.Products].isLoading;
export const selectPagination = (state: State) => state[SliceName.Products].pagination;
