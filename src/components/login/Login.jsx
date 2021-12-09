import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { signInWithEmailAndPassword } from "firebase/auth";
import { Navigate } from 'react-router-dom';
import cn from 'classnames';
import * as _ from 'lodash';
import useAuth from '../../hooks/useAuth.jsx';
import {
  REG_ROUTE, TODO_ROUTE,
} from '../../utils/constants.js';
import getAuthErrorText from '../../utils/utils.js';
import Spinner from '../spinner/Spinner.jsx';

const LogInForm = ({ auth }) => {
  const [authFailed, setAuthFailed] = useState(false);
  const [authError, setAuthError] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef]);

  const SigninSchema = yup.object({
    email: yup.string().email('Некорректно введён адрес электронной почты').required('Почта - обязательное поле'),
    password: yup.string().required('Пароль - обязательное поле'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validateOnChange: false,
    validationSchema: SigninSchema,
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const { email, password } = values;
        const { user } = await signInWithEmailAndPassword(auth.authFirebase, email, password);
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
      email: _.has(formik.errors, 'email') || authFailed,
      password: _.has(formik.errors, 'password') || authFailed,
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
              <h1 className="text-center mb-4">Войти</h1>
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
                {formik.isSubmitting ? <Spinner /> : "Вход"}
              </button>
            </form>
          </div>
          <div className="card-footer">
            <div className="d-flex flex-column align-items-center">
              <span className="small mb-2">Не зарегистрированы? </span>
              <a href={REG_ROUTE}>Регистрация</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Login = () => {
  const auth = useAuth();

  return (
    auth.user
      ? <Navigate to={TODO_ROUTE} />
      : <LogInForm auth={auth} />
  );
};

export default Login;
