import {Routes, Route, Navigate} from 'react-router-dom';

import {Layout} from "./component/layout/layout";
import {ProtectedRoute} from "./component/private-route";
import {
  AddProductPage,
  EditProductPage,
  LoginPage,
  NotFound,
  ProductDetailPage,
  ProductListPage,
  SignupPage
} from "./pages";
import {RouteName} from './constanst/routes';

export const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path={RouteName.Login} element={<LoginPage/>}/>
        <Route path={RouteName.Signup} element={<SignupPage/>}/>
        <Route element={<ProtectedRoute redirectPath={RouteName.Login}/>}>
          <Route path={RouteName.ProductList} element={<ProductListPage/>}/>
          <Route path={RouteName.Product} element={<ProductDetailPage/>}/>
          <Route path={RouteName.AddProduct} element={<AddProductPage/>}/>
          <Route path={RouteName.EditProduct} element={<EditProductPage/>}/>
        </Route>
        <Route path={RouteName.NotFound} element={<NotFound/>}/>
        <Route path="*" element={<Navigate to={RouteName.NotFound} replace/>}/>
      </Routes>
    </Layout>
  );
};
