import { useNavigate } from "react-router-dom";
import { RouteName } from "../constanst/routes";

export const NotFound = () => {
  const navigation = useNavigate();

  return (
    <div className="container">
      <section className="error">
        <h1 className="error__title">404</h1>
        <span className="error__subtitle">Страница не найдена.</span>
        <p className="error__text"> Возможно, страница была удалена или<br/>её вовсе не существовало.</p>
        <button onClick={() => navigation(RouteName.ProductList)} className="button button__error button--small button--black-border">Продолжить покупки</button>
      </section>
    </div>
  );
}
