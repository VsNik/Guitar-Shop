import {Link, Navigate} from 'react-router-dom';
import {LoginForm} from '../component/forms/login-form';
import {RouteName} from '../constanst/routes';
import {useAppSelector} from '../store/hooks';
import {selectIsAuth} from '../store/auth/auth-select';

export const LoginPage = () => {
  const isAuth = useAppSelector(selectIsAuth);

  if (isAuth) {
    return <Navigate to={RouteName.ProductList}/>
  }

  return (
    <div className="container">
      <section className="login">
        <h1 className="login__title">Войти</h1>
        <p className="login__text">
          Hовый пользователь?
          <Link className="login__link" to={RouteName.Signup}>Зарегистрируйтесь</Link>
          прямо сейчас
        </p>
        <LoginForm/>
      </section>
    </div>
  );
};
