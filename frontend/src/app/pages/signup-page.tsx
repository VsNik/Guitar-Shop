import {Link} from 'react-router-dom';
import {SignupForm} from '../component/forms/signup-form';
import {RouteName} from '../constanst/routes';

export const SignupPage = () => {
  return (
    <div className="container">
      <section className="login">
        <h1 className="login__title">Войти</h1>

        <p className="login__text">
          Уже зарегистрированны ?
          <Link className="login__link" to={RouteName.Login}>Войти</Link>
        </p>

        <SignupForm/>

      </section>
    </div>
  );
}
