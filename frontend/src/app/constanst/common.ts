export const API_URL = '/api';
export const AUTH_TOKEN_NAME = 'token';

export const SERVER_ERROR = 'Internal server error';

export enum Messages {
  ServerError = 'Internal server error',
  UserCreated = 'User successfully created',
  ProductCreated = 'Новый продукт успешно создан',
  ProductUpdated = 'Продукт успешно обновлен',
}

export enum SliceName {
  Auth = 'AUTH',
  Products = 'PRODUCTS',
  Product = 'PRODUCT',
  Filters = 'FILTERS',
}

export enum PageNames {
  ProductList = 'Каталог',
  NewProduct = 'Новый товар',
  EditProduct = 'Редактирование',
}

export const GuitarTypes = {
  electro: 'Электрогитара',
  acoustic: 'Акустическая',
  ukulele: 'Укулеле',
}


export enum ErrorCode {
  unauthorized = 401,
  BadRequest = 400,
  ServerError = 500,
}

