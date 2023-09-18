import {RouteName} from '../constanst/routes';

export interface BreadcrumbPage {
  title: string;
  url: RouteName;
}

export type LoginData = {
  email: string;
  password: string;
};

export type SignupData = {
  name: string;
  email: string;
  password: string;
}

export interface ProductData {
  title: string
  description: string;
  image: FileList;
  type: string;
  stringCount: string;
  price: string;
  ean: string;
}

export enum SortingType {
  Date = 'createdAt',
  Price = 'price',
}

export enum SortDirection {
  Desc = 'desc',
  Asc = 'asc',
}

export enum FilterName {
  Type = 'type',
  StringCount = 'string_count',
}

export type StringCount = '4' | '6' | '7' | '12';
