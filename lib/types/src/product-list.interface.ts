import { IProduct } from "./product.interface";

export interface IProductList {
    data: IProduct[];
    page: number;
    limit: number;
    total: number;
}