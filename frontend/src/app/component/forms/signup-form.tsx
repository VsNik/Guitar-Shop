import {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {FaRegEyeSlash} from "react-icons/fa";
import {toast} from 'react-toastify';
import request from "axios";

import {SignupData} from "../../types/common";
import {createAPI} from '../../services/api';
import {AxiosResponseData} from '../../types/error';
import {signupValidateSchema} from '../../utils/validate-schemas';
import {ApiRouteName, RouteName} from '../../constanst/routes';
import { Messages } from '../../constanst/common';

export const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const api = createAPI();

  const {register, handleSubmit, formState: {errors}} = useForm<SignupData>({
    resolver: yupResolver(signupValidateSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: SignupData) => {
    try {
      setIsLoading(true);
      const response = await api.post(ApiRouteName.Signup, data);
      if (response.data) {
        toast.success(Messages.UserCreated);
        navigate(RouteName.Login);
      }
    } catch (err) {
      if (request.isAxiosError(err) && err.response) {
        toast.error((err.response.data as AxiosResponseData).message)
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="input-login">
        <label htmlFor="name">Введите имя</label>
        <input
          {...register('name')}
          type="text"
          id="name"
          autoComplete="off"
          disabled={isLoading}
        />
        {errors?.name && <p className="input-login__error">{errors.name.message}</p>}

      </div>
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
        <label htmlFor="password">Придумайте пароль</label>
        <span>
          <input
            {...register('password')}
            type={showPassword ? 'text' : 'password'}
            placeholder="• • • • • • • • • • • •"
            id="password"
            name="password"
            autoComplete="off"
            disabled={isLoading}
          />
          <button onClick={() => setShowPassword(!showPassword)} className="input-login__button-eye" type="button">
            <FaRegEyeSlash width="14" height="8" aria-hidden="true"/>
          </button>
        </span>
        {errors?.password && <p className="input-login__error">{errors.password.message}</p>}
      </div>
      <button
        className="button login__button button--medium"
        type="submit"
        disabled={isLoading}
      >
        Зарегистрироваться
      </button>
    </form>
  );
}
