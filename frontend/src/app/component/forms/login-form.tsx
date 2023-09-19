import { useState } from "react";
import {FaRegEyeSlash} from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginData } from "../../types/common";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectAuthIsLoading } from "../../store/auth/auth-select";
import { login } from "../../store/auth/api-actions";
import { loginValidateSchema } from '../../utils/validate-schemas';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(selectAuthIsLoading);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: yupResolver(loginValidateSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: LoginData) => {
    dispatch(login(data));
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} method="post" action="/">
      <div className="input-login">
        <label htmlFor="email">Введите e-mail</label>
        <input
          {...register('email')}
          type="email"
          id="email"
          autoComplete="off"
          disabled={isLoading}
        />
        {errors?.email && <p className="input-login__error">{errors.email.message}</p>}

      </div>
      <div className="input-login">
        <label htmlFor="passwordLogin">Введите пароль</label>
        <span>
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="• • • • • • • • • • • •"
            id="passwordLogin"
            autoComplete="off"
            disabled={isLoading}
          />
          <button onClick={() => setShowPassword(!showPassword)} className="input-login__button-eye" type="button">
            <FaRegEyeSlash width="14" height="8" aria-hidden="true" />
          </button>
        </span>
        {errors?.password && <p className="input-login__error">{errors.password.message}</p>}
      </div>
      <button
        className="button login__button button--medium"
        type="submit"
        disabled={isLoading}
      >
        Войти
      </button>
    </form>
  );
}
