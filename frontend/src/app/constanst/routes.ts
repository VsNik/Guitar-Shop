export enum RouteName {
  ProductList = '/',
  Product = '/product/:id',
  AddProduct = '/add-product',
  EditProduct = '/edit-product/:id',
  Login = '/login',
  Signup = '/signup',
  NotFound = '/404'
}

export enum ApiRouteName {
  Login = '/users/login',
  Signup = '/users/signup',
  CheckUser = '/users/check',
  Products = '/products',
}
