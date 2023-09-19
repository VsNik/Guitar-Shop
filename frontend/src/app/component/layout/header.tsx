import {BiUserCircle} from 'react-icons/bi';

import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../store/hooks';
import {selectIsAuth, selectUser} from '../../store/auth/auth-select';
import {logout} from '../../store/auth/auth-slice';
import {dropToken} from '../../services/token';
import {RouteName} from '../../constanst/routes';

export const Header = () => {
  const isAuth = useAppSelector(selectIsAuth);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dropToken();
    navigation(RouteName.ProductList);
  }

  return (
    <header className="header--admin header" id="header">
      <div className="container">
        <div className="header__wrapper">
          <Link className="header__logo logo" to={RouteName.ProductList}>
            <img className="logo__img" width="70" height="70" src="/assets/img/svg/logo.svg" alt="Логотип"/>
          </Link>

          {!isAuth &&
          <nav className="main-nav">
            <ul className="main-nav__list">
              <li className="main-nav__item">
                <Link className="link main-nav__link" to={RouteName.ProductList}>Каталог</Link>
              </li>
              <li className="main-nav__item">
                <Link className="link main-nav__link" to={RouteName.ProductList}>Где купить?</Link>
              </li>
              <li className="main-nav__item">
                <Link className="link main-nav__link" to="#">О компании</Link>
              </li>
            </ul>
          </nav>
          }

          {isAuth &&
          <>
            <nav className="main-nav">
              <ul className="main-nav__list">
                <li className="main-nav__item">
                  <Link className="link main-nav__link" to={RouteName.ProductList}>Каталог</Link>
                </li>
                <li className="main-nav__item">
                  <Link className="link main-nav__link" to={RouteName.ProductList}>Список товаров</Link>
                </li>
              </ul>
            </nav>
            <div className="header__container">
              <span className="header__user-name">{user?.name}</span>
              <span onClick={handleLogout} className="header__link" aria-label="Перейти в личный кабинет">
                <BiUserCircle width="15" height="17" className="header__user-icon"/>
              </span>
            </div>
          </>
          }

        </div>
      </div>
    </header>
  );
}
