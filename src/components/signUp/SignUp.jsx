import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Navigate } from 'react-router-dom';
import cn from 'classnames';
import * as _ from 'lodash';
import useAuth from '../../hooks/useAuth.jsx';
import {
  LOGIN_ROUTE, TODO_ROUTE,
} from '../../utils/constants.js';
import getAuthErrorText from '../../utils/utils.js';
import Spinner from '../spinner/Spinner.jsx';

const SignUpForm = ({ auth }) => {
  const [authFailed, setAuthFailed] = useState(false);
  const [authError, setAuthError] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const SigninSchema = yup.object({
    email: yup.string().email('Некорректно введён адрес электронной почты').required('Почта - обязательное поле'),
    password: yup.string().required('Пароль - обязательное поле').min(6, 'Минимум 6 символов'),
    chekpassword: yup.string().oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      chekpassword: '',
    },
    validateOnChange: false,
    validationSchema: SigninSchema,
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const { email, password } = values;
        const { user } = await createUserWithEmailAndPassword(auth.authFirebase, email, password);
        auth.logIn(user);
        return null;
      } catch (err) {
        setAuthFailed(true);
        setAuthError(err.code);
        return err;
      }
    },
  });

  const getClasses = (type) => {
    const mapType = {
      email: _.has(formik.errors, 'email'),
      password: _.has(formik.errors, 'password') || _.has(formik.errors, 'chekpassword'),
      chekpassword: _.has(formik.errors, 'chekpassword'),
    };
    return cn('form-control', {
      'is-invalid': mapType[type],
    });
  };

  const getErrors = () => _.toPairs(formik.errors).map(([name, message]) => (<div key={name} className="invalid-feedback">{message}</div>));
  return (
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <form className={`w-100${(!_.isEmpty(formik.errors) || authFailed) ? ' is-invalid-form' : ''}`} onSubmit={formik.handleSubmit}>
              <h1 className="text-center mb-4">Регистрация</h1>
              <div className="form-floating mb-3">
                <input
                  className={getClasses('email')}
                  type="email"
                  id="email"
                  name="email"
                  autoComplete="email"
                  required
                  placeholder="Почта"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  ref={inputRef}
                />
                <label className="form-label" htmlFor="email">Почта</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  className={getClasses('password')}
                  type="password"
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  required
                  placeholder="Пароль"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                />
                <label className="form-label" htmlFor="password">Пароль</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  className={getClasses('chekpassword')}
                  type="password"
                  id="chekpassword"
                  name="chekpassword"
                  autoComplete="current-password"
                  required
                  placeholder="Подтверждение пароля"
                  onChange={formik.handleChange}
                  value={formik.values.chekpassword}
                />
                <label className="form-label" htmlFor="chekpassword">Подтверждение пароля</label>
              </div>
              {!_.isEmpty(formik.errors)
                ? getErrors()
                : null}
              {authFailed ? <div className="invalid-feedback">{getAuthErrorText(authError)}</div> : null}
              <button
                className="btn btn-primary"
                type="submit"
                variant="primary"
                onClick={formik.handleSubmit}
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? <Spinner /> : "Зарегистрироваться и войти"}
              </button>
            </form>
          </div>
          <div className="card-footer">
            <div className="d-flex flex-column align-items-center">
              <span className="small mb-2">Уже зарегистрированы? </span>
              <a href={LOGIN_ROUTE}>Войти</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SignUp = () => {
  const auth = useAuth();

  return (
    auth.user
      ? <Navigate to={TODO_ROUTE} />
      : <SignUpForm auth={auth} />
  );
};

export default SignUp;
